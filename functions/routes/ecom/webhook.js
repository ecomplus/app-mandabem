const getAppData = require('./../../lib/store-api/get-app-data')
const createMandaBemTag = require('./../../lib/mandabem/create-tag')

const SKIP_TRIGGER_NAME = 'SkipTrigger'
const ECHO_SUCCESS = 'SUCCESS'
const ECHO_SKIP = 'SKIP'
const ECHO_API_ERROR = 'STORE_API_ERR'

const parseStatus = (status) => {
  switch (status?.toLowerCase()) {
    case 'pago':
      return 'paid'
    case 'em produção':
      return 'in_production'
    case 'em separação':
      return 'in_separation'
    case 'pronto para envio':
      return 'ready_for_shipping'
    case 'nf emitida':
      return 'invoice_issued'
    case 'enviado':
      return 'shipped'
    default:
      return 'ready_for_shipping'
  }
}

exports.post = ({ appSdk }, req, res) => {
  // receiving notification from Store API
  const { storeId } = req

  /**
   * Treat E-Com Plus trigger body here
   * Ref.: https://developers.e-com.plus/docs/api/#/store/triggers/
   */
  const trigger = req.body
  if (trigger.resource !== 'orders') {
    res.send(ECHO_SKIP)
    return
  }

  let auth, mandaBemId, mandaBemKey, warehouses
  appSdk.getAuth(storeId)
    .then(_auth => {
      auth = _auth
      return getAppData({ appSdk, storeId, auth })
    })

    .then(appData => {
      mandaBemId = appData.mandabem_id
      mandaBemKey = appData.mandabem_token
      warehouses = appData.warehouses || []
      const sendStatus = parseStatus(appData.send_tag_status)
      if (mandaBemId && mandaBemKey && !appData.disable_auto_tag) {
        const order = trigger.body
        if (
          order &&
          (order.fulfillment_status?.current === sendStatus ||
            order.financial_status?.current === sendStatus)
        ) {
          return appSdk.apiRequest(storeId, `/orders/${trigger.resource_id}.json`, 'GET', null, auth)
        }
      }
      const err = new Error()
      err.name = SKIP_TRIGGER_NAME
      throw err
    })

    .then(({ response }) => {
      const order = response.data
      console.log(`Shipping tag for #${storeId} ${order._id}`)
      return createMandaBemTag({ appSdk, storeId, auth }, {
        mandaBemId,
        mandaBemKey,
        warehouses,
        order
      })
    })

    .then(() => {
      // all done
      res.send(ECHO_SUCCESS)
    })

    .catch(err => {
      console.log('didnt workout at any point', err)
      if (err.name === SKIP_TRIGGER_NAME) {
        // trigger ignored by app configuration
        res.send(ECHO_SKIP)
      } else {
        // console.error(err)
        // request to Store API with error response
        // return error status code
        res.status(500)
        const { message } = err
        res.send({
          error: ECHO_API_ERROR,
          message
        })
      }
    })
}
