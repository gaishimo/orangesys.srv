import Invoice from '../core/invoice'

export const invoiceCreated = (req, res) => {
  const { body: { data } } = req
  const invoice = new Invoice(process.env.STRIPE_SECRET_KEY, data.object)
  invoice.created()
    .then((result) => {
      res.end(JSON.stringify(result))
    })
}

const mappings = {
  'invoice.created': invoiceCreated,
}

export const handle = (req, res) => {
  const { body } = req
  console.log('webhook: ', body)
  if (!body) {
    res.writeHead(400)
    res.end('body is empty.')
    console.error('body is empty')
    return
  }
  const eventType = body.type
  const handleEvent = mappings[eventType]
  if (!handleEvent) {
    console.log(`we don't handle event ${eventType}`)
    res.end()
    return
  }
  handleEvent(req, res)
}
