import assert from 'power-assert'
import moment from 'moment'

import {
  trialEndTimestamp,
} from '../../src/core/customer'

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
