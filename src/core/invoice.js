import stripe from 'stripe'
import moment from 'moment'
import { round } from 'lodash/math'

export const calculateDiscountOfProRatedCharge = (monthlyPrice, subscriptionStartedAt) => {
  const subscriptionStartedDate = subscriptionStartedAt.date()
  const endOfMonth = subscriptionStartedAt.endOf('month').date()
  const serviceUsingDays = (endOfMonth - subscriptionStartedDate) + 1
  const actualAmount = round((monthlyPrice / 30) * serviceUsingDays)
  if (actualAmount > monthlyPrice) {
    return 0
  }
  return monthlyPrice - actualAmount
}

export class Invoice {
  constructor(stripeSecretKey, data) {
    this.stripe = stripe(stripeSecretKey)
    this.data = data
  }
  created() {
    if (this.isFirstSubscription()) {
      return this.addInvoiceItemForProRatedChargeDiscount()
    }
    return Promise.resolve({})
  }
  stripeInvoiceItems() {
    return this.stripe.invoiceItems
  }
  addInvoiceItemForProRatedChargeDiscount() {
    const { plan } = this.data.lines.data[0]
    const monthlyPrice = plan.amount
    const customerId = this.data.customer
    const invoiceId = this.data.id
    const subsriptionStartedAt = moment(this.data.period_start, 'X')
    const invoiceData = {
      customer: customerId,
      invoice: invoiceId,
      amount: -calculateDiscountOfProRatedCharge(monthlyPrice, subsriptionStartedAt),
      currency: 'jpy',
      description: '初月日割分除外',
    }
    return new Promise((resolve, reject) => (
      this.stripeInvoiceItems().create(invoiceData, (err, invoiceItem) => {
        if (err) { reject(err); return }
        console.log('An invoice item has been added. invoice: %j', invoiceData)
        resolve(invoiceItem)
      })
    ))
  }
  isFirstSubscription() {
    const { date, period_start } = this.data
    const invoiceMonth = moment(date, 'X').get('month')
    const subscriptionStartedMonth = moment(period_start, 'X').get('month')
    return (invoiceMonth - subscriptionStartedMonth) === 1
  }
}
