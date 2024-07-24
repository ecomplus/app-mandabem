const axios = require('axios')
const qs = require('querystring')

exports.post = ({ appSdk }, req, res) => {
  /**
   * Treat `params` and (optionally) `application` from request body to properly mount the `response`.
   * JSON Schema reference for Calculate Shipping module objects:
   * `params`: https://apx-mods.e-com.plus/api/v1/calculate_shipping/schema.json?store_id=100
   * `response`: https://apx-mods.e-com.plus/api/v1/calculate_shipping/response_schema.json?store_id=100
   */

  const { params, application } = req.body
  // setup basic required response object
  const response = {
    shipping_services: []
  }
  // merge all app options configured by merchant
  const appData = Object.assign({}, application.data, application.hidden_data)

  let mandabemId = appData.mandabem_id
  let mandabemToken = appData.mandabem_token
  if (!mandabemId || !mandabemToken) {
    // must have configured Manda Bem ID and key
    return res.status(409).send({
      error: 'CALCULATE_AUTH_ERR',
      message: 'ID or key unset on app hidden data (merchant must configure the app)'
    })
  }

  if (appData.free_shipping_from_value >= 0) {
    response.free_shipping_from_value = appData.free_shipping_from_value
  }

  const destinationZip = params.to ? params.to.zip.replace(/\D/g, '') : ''
  const checkZipCode = rule => {
    // validate rule zip range
    if (destinationZip && rule.zip_range) {
      const { min, max } = rule.zip_range
      return Boolean((!min || destinationZip >= min) && (!max || destinationZip <= max))
    }
    return true
  }

  let originZip, warehouseCode
  let postingDeadline = appData.posting_deadline
  if (params.from) {
    originZip = params.from.zip
  } else if (Array.isArray(appData.warehouses) && appData.warehouses.length) {
    for (let i = 0; i < appData.warehouses.length; i++) {
      const warehouse = appData.warehouses[i]
      if (warehouse?.zip && checkZipCode(warehouse)) {
        const { code } = warehouse
        if (!code) continue
        if (params.items) {
          const itemNotOnWarehouse = params.items.find(({ quantity, inventory }) => {
            return inventory && Object.keys(inventory).length && !(inventory[code] >= quantity)
          })
          if (itemNotOnWarehouse) continue
        }
        originZip = warehouse.zip
        if (warehouse.posting_deadline?.days) {
          postingDeadline = warehouse.posting_deadline
        }
        if (warehouse.mandabem_id && warehouse.mandabem_token) {
          mandabemId = warehouse.mandabem_id
          mandabemToken = warehouse.mandabem_token
        }
        warehouseCode = code
      }
    }
  }

  if (!originZip) {
    originZip = appData.zip
  }
  originZip = typeof originZip === 'string' ? originZip.replace(/\D/g, '') : ''

  // search for configured free shipping rule
  if (Array.isArray(appData.shipping_rules)) {
    for (let i = 0; i < appData.shipping_rules.length; i++) {
      const rule = appData.shipping_rules[i]
      if (rule.free_shipping && checkZipCode(rule)) {
        if (!rule.min_amount) {
          response.free_shipping_from_value = 0
          break
        } else if (!(response.free_shipping_from_value <= rule.min_amount)) {
          response.free_shipping_from_value = rule.min_amount
        }
      }
    }
  }

  if (!params.to) {
    // just a free shipping preview with no shipping address received
    // respond only with free shipping option
    res.send(response)
    return
  }

  /* DO THE STUFF HERE TO FILL RESPONSE OBJECT WITH SHIPPING SERVICES */

  if (!originZip) {
    // must have configured origin zip code to continue
    return res.status(409).send({
      error: 'CALCULATE_ERR',
      message: 'Zip code is unset on app hidden data (merchant must configure the app)'
    })
  }

  if (params.items) {
    // optinal predefined or configured service codes
    let serviceNames = Array.isArray(appData.services) && appData.services[0]
      ? appData.services.map(service => service.service_name)
      : ['PAC', 'SEDEX']
    if (Array.isArray(appData.disable_services) && appData.disable_services.length) {
      serviceNames = serviceNames.filter(serviceName => {
        return !appData.disable_services.find(rule => {
          return rule && rule.service_name === serviceName && checkZipCode(rule)
        })
      })
    }

    // optional params to Correios services
    let secureValue = 0
    if (params.subtotal) {
      secureValue = params.subtotal
    }

    // calculate weight and pkg value from items list
    let finalWeight = 0
    params.items.forEach(({ price, quantity, dimensions, weight }) => {
      let physicalWeight = 0
      let cubicWeight = 1
      if (!params.subtotal) {
        secureValue += price * quantity
      }

      // sum physical weight
      if (weight && weight.value) {
        switch (weight.unit) {
          case 'kg':
            physicalWeight = weight.value
            break
          case 'g':
            physicalWeight = weight.value / 1000
            break
          case 'mg':
            physicalWeight = weight.value / 1000000
        }
      }

      // sum total items dimensions to calculate cubic weight
      if (dimensions) {
        const sumDimensions = {}
        for (const side in dimensions) {
          const dimension = dimensions[side]
          if (dimension && dimension.value) {
            let dimensionValue
            switch (dimension.unit) {
              case 'cm':
                dimensionValue = dimension.value
                break
              case 'm':
                dimensionValue = dimension.value * 100
                break
              case 'mm':
                dimensionValue = dimension.value / 10
            }
            // add/sum current side to final dimensions object
            if (dimensionValue) {
              sumDimensions[side] = sumDimensions[side]
                ? sumDimensions[side] + dimensionValue
                : dimensionValue
            }
          }
        }

        // calculate cubic weight
        // https://suporte.boxloja.pro/article/82-correios-calculo-frete
        // (C x L x A) / 6.000
        for (const side in sumDimensions) {
          if (sumDimensions[side]) {
            cubicWeight *= sumDimensions[side]
          }
        }
        if (cubicWeight > 1) {
          cubicWeight /= 6000
        }
      }
      finalWeight += (quantity * (physicalWeight > cubicWeight ? physicalWeight : cubicWeight))
    })

    // pre check for maximum allowed declared value
    if (secureValue < 20.5) {
      secureValue = 20.5
    } else if (secureValue > 3000) {
      secureValue = 3000
    }

    // https://mandabem.com.br/documentacao
    const mandabemParams = {
      plataforma_id: mandabemId,
      plataforma_chave: mandabemToken,
      cep_origem: originZip,
      cep_destino: destinationZip,
      valor_seguro: secureValue.toFixed(2),
      peso: finalWeight,
      altura: 2,
      largura: 11,
      comprimento: 16
    }

    // send onde request to Manda Bem WS per Correios service
    let countRequests = 0
    let errorMsg
    serviceNames.forEach(servico => {
      axios.post(
        'https://mandabem.com.br/ws/valor_envio',
        qs.stringify({ ...mandabemParams, servico }),
        {
          timeout: (params.is_checkout_confirmation ? 8000 : 4500),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )

        .then(({ data, status }) => {
          let result
          if (typeof data === 'string') {
            try {
              result = JSON.parse(data)
            } catch (e) {
              errorMsg = data
              return
            }
          } else {
            result = data
          }
          if (result && result.resultado && result.resultado[servico]) {
            const { valor, prazo } = result.resultado[servico]
            const price = parseFloat(valor)

            // parse to E-Com Plus shipping line object
            const shippingLine = {
              from: {
                ...params.from,
                zip: originZip
              },
              to: params.to,
              price,
              total_price: price,
              declared_value: secureValue,
              discount: 0,
              delivery_time: {
                days: prazo,
                working_days: true
              },
              posting_deadline: {
                days: 3,
                ...postingDeadline
              },
              package: {
                weight: {
                  value: finalWeight,
                  unit: 'kg'
                }
              },
              warehouse_code: warehouseCode,
              flags: ['mandabem-ws']
            }

            // check for default configured additional/discount price
            if (appData.additional_price) {
              if (appData.additional_price > 0) {
                shippingLine.other_additionals = [{
                  tag: 'additional_price',
                  label: 'Adicional padrão',
                  price: appData.additional_price
                }]
              } else {
                // negative additional price to apply discount
                shippingLine.discount -= appData.additional_price
              }
              // update total price
              shippingLine.total_price += appData.additional_price
            }

            // search for discount by shipping rule
            if (Array.isArray(appData.shipping_rules)) {
              for (let i = 0; i < appData.shipping_rules.length; i++) {
                const rule = appData.shipping_rules[i]
                if (
                  rule &&
                  (!rule.service || rule.service === servico) &&
                  checkZipCode(rule) &&
                  !(rule.min_amount > secureValue)
                ) {
                  // valid shipping rule
                  if (rule.free_shipping) {
                    shippingLine.discount += shippingLine.total_price
                    shippingLine.total_price = 0
                    break
                  } else if (rule.discount) {
                    let discountValue = rule.discount.value
                    if (rule.discount.percentage) {
                      discountValue *= (shippingLine.total_price / 100)
                    }
                    if (discountValue) {
                      shippingLine.discount += discountValue
                      shippingLine.total_price -= discountValue
                      if (shippingLine.total_price < 0) {
                        shippingLine.total_price = 0
                      }
                    }
                    break
                  }
                }
              }
            }

            // push shipping service object to response
            let label = servico
            if (Array.isArray(appData.services)) {
              for (let i = 0; i < appData.services.length; i++) {
                const service = appData.services[i]
                if (service && service.service_name === servico && service.label) {
                  label = service.label
                }
              }
            }
            response.shipping_services.push({
              label,
              carrier: 'Correios (Manda Bem)',
              service_name: servico,
              shipping_line: shippingLine
            })
          } else {
            // console.log(data)
            const err = new Error('Invalid Mandabem calculate response')
            err.response = { data, status }
            throw err
          }
        })

        .catch(err => {
          if (err.response && err.response.data) {
            // try to handle Manda Bem error response
            const { data } = err.response
            let result
            if (typeof data === 'string') {
              try {
                result = JSON.parse(data)
              } catch (e) {
                errorMsg = data
                return
              }
            } else {
              result = data
            }
            if (result && result.resultado) {
              // Manda Bem error message
              const { error, erro } = result.resultado
              errorMsg = erro || error
              if (errorMsg) {
                return
              }
            }
            errorMsg = `${err.message} (${err.response.status})`
          }
          errorMsg = err.message
        })

        .finally(() => {
          countRequests++
          if (countRequests === serviceNames.length) {
            // all done
            if (!response.shipping_services.length && errorMsg) {
              // any successfull calculate request
              return res.status(409).send({
                error: 'CALCULATE_FAILED',
                message: errorMsg
              })
            }
            res.send(response)
          }
        })
    })
    return
  } else {
    res.status(400).send({
      error: 'CALCULATE_EMPTY_CART',
      message: 'Cannot calculate shipping without cart items'
    })
  }

  res.send(response)
}
