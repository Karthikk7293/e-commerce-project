# e commerce project

MERN e-commerce project with product management, carts, orders, offers, image uploads, and payment integrations.

## Configuration

Connected features require MongoDB, Cloudinary configuration, Razorpay test configuration. Review the corresponding configuration and integration modules before running the app.

## Run locally

Configure MongoDB and the external integrations used by the backend. Install both packages before starting the combined development script:

```sh
npm install
npm install --prefix frontend
npm run dev
```

## Source guide

- [backend/server.js](backend/server.js)
- [backend/controllers/AddressController.js](backend/controllers/AddressController.js)
- [backend/controllers/categoryController.js](backend/controllers/categoryController.js)
- [backend/controllers/offerController.js](backend/controllers/offerController.js)
- [backend/controllers/orderController.js](backend/controllers/orderController.js)
- [backend/controllers/otpController.js](backend/controllers/otpController.js)
