[![CircleCI](https://circleci.com/gh/orangesys/orangesys.srv.svg?style=svg)](https://circleci.com/gh/orangesys/orangesys.srv)
[![dependencies Status](https://david-dm.org/orangesys/orangesys.srv/status.svg)](https://david-dm.org/orangesys/orangesys.srv)
[![](https://images.microbadger.com/badges/image/orangesys/orangesys-srv.svg)](https://microbadger.com/images/orangesys/orangesys-srv "Get your own image badge on microbadger.com")
[![](https://images.microbadger.com/badges/version/orangesys/orangesys-srv.svg)](https://microbadger.com/images/orangesys/orangesys-srv "Get your own version badge on microbadger.com")

Backend API for Stripe payment.

### Start server

```
npm install
npm run build
PORT=5001 STRIPE_SECRET_KEY=xxxxxxxxxxx npm start
```

### Test

```
npm test
```
