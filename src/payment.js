/* eslint-disable no-console */

import initStripe from 'stripe';

module.exports = ({ body, secrets }, req, res) => {
  if (!body) {
    res.writeHead(400);
    res.end('body is empty.');
    return;
  }
  const { token, planId, uid } = body;
  if (!token || !planId || !uid) {
    res.writeHead(400);
    res.end('params are missing (token, planId, or uid).');
    return;
  }
  const { stripeSecretKey } = secrets;
  if (!stripeSecretKey) {
    res.writeHead(400);
    res.end('secret key is not prepared.');
  }
  const stripe = initStripe(stripeSecretKey);
  stripe.customers.create({
    source: token,
    plan: planId,
    metadata: {
      uid,
    },
  }, (err, customer) => {
    if (err) {
      res.writeHead(400, { 'Content-Type': 'text/json' });
      const errorData = err.raw;
      console.error('error:', errorData, 'body:', body);
      res.end(JSON.stringify(errorData));
      return;
    }
    console.log('A customer has been created.', customer);
    res.end(JSON.stringify(customer));
  });
};
