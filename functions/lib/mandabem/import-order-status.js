const logger = require('firebase-functions/logger')
const axios = require('axios')
const qs = require('querystring')

const parseMandabemStatus = (status) => {
  if (/entregue/i.test(status)) return 'delivered'
  if (/encaminhado/i.test(status)) return 'shipped'
  if (/enviado/i.test(status)) return 'shipped'
  if (/postagem/i.test(status)) return ''
  return null
}

module.exports = async (
  { appSdk, storeId, auth },
  { order, mandaBemId, mandaBemKey }
) => {
  const { number } = order
  logger.info(`Tracking #${storeId} ${number}`)
  const { data } = await axios.post(
    'https://mandabem.com.br/ws/envio',
    qs.stringify({
      ref_id: number,
      plataforma_id: mandaBemId,
      plataforma_chave: mandaBemKey
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 7000
    }
  )
  const trackingResult = typeof data === 'string'
    ? JSON.parse(data)
    : (data || {})
  const status = parseMandabemStatus(trackingResult?.resultado?.dados?.status)
  if (status === null) {
    logger.warn(`No parsed fulfillment status for #${storeId} ${number}`, {
      trackingResult,
      data
    })
    return
  }
  const shippingLine = order.shipping_lines?.find(({ flags }) => {
    return flags?.find((flag) => flag.startsWith('mandabem-'))
  })
  if (status && status !== order.fulfillment_status?.current) {
    await appSdk.apiRequest(
      storeId,
      `/orders/${order._id}/fulfillments.json`,
      'POST',
      {
        shipping_line_id: shippingLine?._id,
        date_time: new Date().toISOString(),
        status,
        flags: ['mandabem']
      },
      auth
    )
    logger.info(`#${storeId} ${number} updated to ${status}`)
  }
  const trackingId = trackingResult.resultado.dados.etiqueta
  if (trackingId && !trackingId.includes(' ')) {
    const trackingCodes = shippingLine.tracking_codes?.filter(({ code }) => {
      return code.toLowerCase() !== 'aguardando postagem'
    }) || []
    const savedTrackingCode = trackingCodes.find(({ code }) => {
      return code === trackingId
    })
    if (!savedTrackingCode) {
      trackingCodes.push({
        tag: 'mandabem',
        code: trackingId,
        link: 'https://rastreamento.correios.com.br/app/index.php'
      })
      await appSdk.apiRequest(
        storeId,
        `/orders/${order._id}/shipping_lines/${shippingLine._id}.json`,
        'PATCH',
        { tracking_codes: trackingCodes },
        auth
      )
      logger.info(`#${storeId} ${number} tracking code ${trackingId}`)
    }
  }
}
