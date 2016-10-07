
Backend API for Stripe payment.

### Deployment (Webtask)

```
npm install -g wt
npm install
npm run build
wt create ./build/payment.js --name $TASK_NAME --prod --secret stripeSecretKey=$STRIPE_SECRET_KEY
```
