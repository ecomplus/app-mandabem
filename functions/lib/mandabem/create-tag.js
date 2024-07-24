const axios = require('axios')
const qs = require('querystring')

module.exports = ({ appSdk, storeId, auth }, { mandaBemId, mandaBemKey, order }) => {
  // create new shipping tag with Manda Bem WS
  // https://mandabem.com.br/documentacao
  const data = {
    plataforma_id: mandaBemId,
    plataforma_chave: mandaBemKey,
    ref_id: order.number || order._id
  }

  if (order.items) {
    data.produtos = order.items.map(item => ({
      nome: item.name,
      quantidade: item.quantity,
      preco: item.final_price || item.price
    }))
  }
  const buyer = order.buyers && order.buyers[0]
  if (buyer && buyer.registry_type === 'p' && buyer.doc_number) {
    data.cpf_destinatario = buyer.doc_number.replace(/\D/g, '')
  }

  const requests = []
  if (order.shipping_lines) {
    order.shipping_lines.forEach(shippingLine => {
      if (shippingLine.app?.carrier?.includes('Manda Bem')) {
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
            }
            if (shippingLine.declared_value) {
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
            ).then(({ data }) => {
              if (String(data?.resultado?.sucesso) === 'true') {
                const customFields = shippingLine.custom_fields || []
                customFields.push({
                  field: 'rastreio',
                  value: data.resultado.envio_id
                })
                return appSdk.apiRequest(
                  storeId,
                  `/orders/${order._id}/shipping_lines/${shippingLine._id}.json`,
                  'PATCH',
                  { custom_fields: customFields },
                  auth
                )
              }
              return data
            }).catch(console.error))
        }
      }
    })
  }
  return Promise.all(requests)
}
