const { logger } = require('firebase-functions')
const axios = require('axios')
const qs = require('querystring')
const { debugAxiosError } = require('../util')

module.exports = ({ appSdk, storeId, auth }, {
  mandaBemId,
  mandaBemKey,
  warehouses,
  order
}) => {
  // create new shipping tag with Manda Bem WS
  // https://mandabem.com.br/documentacao
  const _data = {
    plataforma_id: mandaBemId,
    plataforma_chave: mandaBemKey,
    ref_id: order.number || order._id
  }
  if (order.items) {
    _data.produtos = order.items.map(item => ({
      nome: item.name,
      quantidade: item.quantity,
      preco: item.final_price || item.price
    }))
  }
  const buyer = order.buyers && order.buyers[0]
  if (buyer && buyer.registry_type === 'p' && buyer.doc_number) {
    _data.cpf_destinatario = buyer.doc_number.replace(/\D/g, '')
  }

  const requests = []
  if (order.shipping_lines) {
    order.shipping_lines.forEach(shippingLine => {
      if (shippingLine.app?.carrier?.includes('Manda Bem')) {
        const data = { ..._data }
        const warehouseCode = shippingLine.warehouse_code
        if (warehouseCode) {
          const warehouse = warehouses?.find(({ code }) => code === warehouseCode)
          if (warehouse?.mandabem_id && warehouse?.mandabem_token) {
            data.plataforma_id = warehouse.mandabem_id
            data.plataforma_chave = warehouse.mandabem_token
          }
        }
        data.forma_envio = shippingLine.app.service_name
        switch (data.forma_envio) {
          case 'PAC':
          case 'SEDEX':
          case 'PACMINI':
            data.destinatario = shippingLine.to.name
            data.cep = shippingLine.to.zip.replace(/\D/g, '')
            data.logradouro = shippingLine.to.street
            data.bairro = shippingLine.to.borough
            data.numero = shippingLine.to.number || 'SN'
            if (shippingLine.to.complement) {
              data.complemento = shippingLine.to.complement
            }
            data.cidade = shippingLine.to.city
            data.estado = shippingLine.to.province_code
            if (shippingLine.package && shippingLine.package.weight) {
              const { value, unit } = shippingLine.package.weight
              data.peso = !unit || unit === 'kg'
                ? value
                : unit === 'g'
                  ? value * 1000
                  : value * 1000000
              data.altura = 2
              data.largura = 11
              data.comprimento = 16
              const { dimensions } = shippingLine.package
              if (dimensions) {
                Object.keys(dimensions).forEach((side) => {
                  const { unit, value } = dimensions[side]
                  let cmValue
                  switch (unit) {
                    case 'm':
                      cmValue = value * 100
                      break
                    case 'mm':
                      cmValue = value / 10
                      break
                    default:
                      cmValue = value
                  }
                  if (cmValue >= 1) {
                    const dataField = side === 'width'
                      ? 'largura'
                      : side === 'height'
                        ? 'altura'
                        : 'comprimento'
                    data[dataField] = cmValue
                  }
                })
              }
            }
            if (shippingLine.declared_value >= 26) {
              data.valor_seguro = shippingLine.declared_value
            }
            data.cep_origem = shippingLine.from.zip.replace(/\D/g, '')
            requests.push(axios.post(
              'https://mandabem.com.br/ws/gerar_envio',
              qs.stringify(data),
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }
            )
              .then(({ data }) => {
                if (String(data?.resultado?.sucesso) === 'true') {
                  logger.info(`Tag created with success ${order._id}`)
                  const tagId = String(data.resultado.envio_id)
                  const customFields = shippingLine.custom_fields || []
                  customFields.push({
                    field: 'mandabem_id',
                    value: tagId
                  })
                  return appSdk.apiRequest(
                    storeId,
                    `/orders/${order._id}/shipping_lines/${shippingLine._id}.json`,
                    'PATCH',
                    { custom_fields: customFields },
                    auth
                  )
                }
                logger.info(`Unexpected response for ${order._id} tag`, {
                  order,
                  data
                })
                return null
              })
              .catch(debugAxiosError)
            )
        }
      }
    })
  }
  return Promise.all(requests)
}
