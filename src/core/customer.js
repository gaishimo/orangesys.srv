import stripe from 'stripe'
import moment from 'moment'
import { round } from 'lodash/math'
import plans from '../plans'

const getCurrentTime = () => moment().utcOffset('+09:00')

export const calculatDiscountOfProRatedCharge = (monthlyPrice, currentTime = getCurrentTime()) => {
  const currentDate = currentTime.date()
  const endOfMonth = currentTime.endOf('month').date()
  const serviceUsingDays = (endOfMonth - currentDate) + 1
  const actualAmount = round((monthlyPrice / 30) * serviceUsingDays)
  if (actualAmount > monthlyPrice) {
    return 0
  }
  return monthlyPrice - actualAmount
}

export const trialEndTimestamp = (currentTime = getCurrentTime()) => (
  currentTime.utcOffset('+09:00')
    .add('month', 1)
    .set('date', 1)
    .set('hour', 11)
    .set('minute', 0)
    .set('second', 0)
    .unix()
)

export default class Customer {
  constructor(stripeSecretKey, token) {
    this.stripe = stripe(stripeSecretKey)
    this.token = token
  }
  create({ email, uid }) {
    return new Promise((resolve, reject) => {
      this.stripe.customers.create({
        source: this.token,
        email,
        metadata: {
          uid,
        },
      }, (err, customer) => {
        if (err) { reject(err); return }
        resolve(customer)
      })
    })
  }

  addInvoiceItemsForFirstSubsription(customer, planId) {
    return new Promise((resolve, reject) => {
      const monthlyPrice = plans[planId].price
      this.stripe.invoiceItems.create({
        customer: customer.id,
        amount: -calculatDiscountOfProRatedCharge(monthlyPrice),
        currency: 'jpy',
        description: '初月日割分除外',
      }, (err, invoiceItem) => {
        if (err) { reject(err); return }
        resolve(invoiceItem)
      })
    })
  }

  subscribe(customer, planId) {
    return new Promise((resolve, reject) => {
      this.stripe.subscriptions.create({
        customer: customer.id,
        plan: planId,
        trial_end: trialEndTimestamp(),
      }, (err, subscription) => {
        if (err) { reject(err); return }
        resolve(subscription)
      })
    })
  }
}
