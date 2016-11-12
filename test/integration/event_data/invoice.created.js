/* eslint-disable */
export default {
  "created": 1326853478,
  "livemode": false,
  "id": "evt_00000000000000",
  "type": "invoice.created",
  "object": "event",
  "request": null,
  "pending_webhooks": 1,
  "api_version": "2016-07-06",
  "data": {
    "object": {
      "id": "in_00000000000000",
      "object": "invoice",
      "amount_due": 0,
      "application_fee": null,
      "attempt_count": 0,
      "attempted": false,
      "charge": null,
      "closed": true,
      "currency": "jpy",
      "customer": "cus_00000000000000",
      "date": 1478828946,
      "description": null,
      "discount": null,
      "ending_balance": 0,
      "forgiven": false,
      "lines": {
        "data": [
          {
            "id": "sub_9XZIlkarbelEdx",
            "object": "line_item",
            "amount": 50000,
            "currency": "jpy",
            "description": null,
            "discountable": true,
            "livemode": true,
            "metadata": {},
            "period": {
              "start": 1478828946,
              "end": 1480557600
            },
            "plan": {
              "id": "large",
              "object": "plan",
              "amount": 500000,
              "created": 1475826830,
              "currency": "jpy",
              "interval": "month",
              "interval_count": 1,
              "livemode": false,
              "metadata": {},
              "name": "Largeプラン",
              "statement_descriptor": "Large",
              "trial_period_days": null
            },
            "proration": false,
            "quantity": 1,
            "subscription": null,
            "type": "subscription"
          }
        ],
        "total_count": 1,
        "object": "list",
        "url": "/v1/invoices/in_19EUAAHowLuEoDuBZhCVIkHC/lines"
      },
      "livemode": false,
      "metadata": {},
      "next_payment_attempt": null,
      "paid": false,
      "period_end": 1478828946,
      "period_start": 1478828946,
      "receipt_number": null,
      "starting_balance": 0,
      "statement_descriptor": null,
      "subscription": "sub_00000000000000",
      "subtotal": 0,
      "tax": null,
      "tax_percent": null,
      "total": 0,
      "webhooks_delivered_at": null
    }
  }
}
