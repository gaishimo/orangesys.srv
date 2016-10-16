import assert from 'power-assert'
import moment from 'moment'

import {
  calculatDiscountOfProRatedCharge,
  trialEndTimestamp,
} from '../../src/core/customer'

describe('calculatDiscountOfProRatedCharge', () => {
  it('works', () => {
    [
      { price: 1000, date: '2016-10-01', expected: 0 },
      { price: 1000, date: '2016-10-11', expected: 300 },
      { price: 1000, date: '2016-10-30', expected: 933 },
      { price: 1000, date: '2016-10-31', expected: 967 },
      { price: 50000, date: '2016-10-01', expected: 0 },
      { price: 50000, date: '2016-10-11', expected: 15000 },
      { price: 50000, date: '2016-10-30', expected: 46667 },
      { price: 50000, date: '2016-10-31', expected: 48333 },
    ].forEach(({ price, date, expected }) => {
      const time = moment(date).utcOffset('+09:00')
      assert(calculatDiscountOfProRatedCharge(price, time) === expected)
    })
  })
})

describe('trialEndTimestamp', () => {
  it('works', () => {
    [
      {
        current: moment('2016-10-01+09:00'),
        expected: moment('2016-11-01T11:00:00+09:00').unix(),
      },
      {
        current: moment('2016-10-10+09:00'),
        expected: moment('2016-11-01T11:00:00+09:00').unix(),
      },
      {
        current: moment('2016-10-31T23:59:59+09:00'),
        expected: moment('2016-11-01T11:00:00+09:00').unix(),
      },
    ].forEach(({ current, expected }) => {
      assert(trialEndTimestamp(current) === expected)
    })
  })
})
