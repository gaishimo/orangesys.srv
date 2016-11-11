import Express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { customer, webhook } from './handlers'

const PORT = process.env.PORT || 5001

const app = new Express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello'))
app.post('/customers', customer.create)
app.post('/webhooks', webhook.handle)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}!`) // eslint-disable-line no-console
})
