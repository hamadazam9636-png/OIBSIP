# Pizzaro Backend

Express and MongoDB API for the Pizzaro pizza ordering platform. The backend owns authentication, authorization, catalog data, order persistence, inventory, email workflows, and Safepay integration.

## Stack

- Node.js and Express 5
- MongoDB with Mongoose 9
- JWT authentication with role-based admin authorization
- bcryptjs password hashing
- Nodemailer verification and password-reset email delivery
- Safepay payment sessions and verification
- CORS and dotenv configuration

## Requirements

- Node.js 18 or newer
- MongoDB connection string
- SMTP credentials for verification and password-reset email
- Safepay merchant credentials for online payments

## Installation And Configuration

```bash
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pizzaro
JWT_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=http://localhost:5173

EMAIL_USER=your-smtp-user
EMAIL_PASS=your-smtp-password

SAFE_PAY_BASE_URL=https://sandbox.api.getsafepay.com
SAFE_PAY_PUBLIC_KEY=your-safepay-public-key
SAFE_PAY_SECRET_KEY=your-safepay-secret-key
SAFEPAY_ENV=sandbox
SAFEPAY_INTENT=CYBERSOURCE
```

Use the Safepay production base URL and production credentials only in a production deployment. Never commit `.env` files or expose `SAFE_PAY_SECRET_KEY`, `JWT_SECRET`, or SMTP credentials to the frontend.

## Run

```bash
npm start       # Start the API
npm run dev     # Start with nodemon
```

The API listens on `http://localhost:5000` by default. `GET /` is a lightweight health response.

## Architecture

```text
server.js
  -> routes
    -> middleware (JWT and admin role checks)
      -> controllers (request validation and orchestration)
        -> models (Mongoose schemas)
          -> MongoDB
        -> services (email, payment, stock)
```

`server.js` loads environment variables, connects to MongoDB, enables CORS and JSON parsing, and mounts the route modules. Controllers translate HTTP requests into domain operations; services isolate external integrations.

## API Reference

All paths below are prefixed with `/api`.

### Authentication

| Method | Path                          | Auth   | Purpose                                                   |
| ------ | ----------------------------- | ------ | --------------------------------------------------------- |
| `POST` | `/auth/register`              | Public | Create an unverified customer and send verification email |
| `GET`  | `/auth/verify-email/:token`   | Public | Verify customer email                                     |
| `POST` | `/auth/login`                 | Public | Validate credentials and return customer JWT              |
| `POST` | `/auth/forgot-password`       | Public | Send password reset email                                 |
| `POST` | `/auth/reset-password/:token` | Public | Set a new password                                        |
| `POST` | `/admin/login`                | Public | Validate an admin account and return admin JWT            |

### Catalog and orders

| Method   | Path                 | Auth          | Purpose                                         |
| -------- | -------------------- | ------------- | ----------------------------------------------- |
| `GET`    | `/pizzas`            | Public        | List pizzas                                     |
| `GET`    | `/pizzas/:id`        | Public        | Read one pizza                                  |
| `POST`   | `/pizzas`            | Current route | Create pizza                                    |
| `PUT`    | `/pizzas/:id`        | Current route | Update pizza                                    |
| `DELETE` | `/pizzas/:id`        | Current route | Delete pizza                                    |
| `GET`    | `/orders`            | JWT           | Admin sees all orders; customer sees own orders |
| `GET`    | `/orders/:id`        | JWT           | Admin sees any order; customer sees own order   |
| `POST`   | `/orders`            | JWT           | Create an order for the authenticated customer  |
| `PATCH`  | `/orders/:id/status` | JWT + admin   | Update order status                             |
| `DELETE` | `/orders/:id`        | JWT           | Admin deletes any; customer deletes own         |

### Inventory, customers, and payments

| Method   | Path                   | Auth          | Purpose                                   |
| -------- | ---------------------- | ------------- | ----------------------------------------- |
| `GET`    | `/inventory`           | Current route | List inventory                            |
| `GET`    | `/inventory/:id`       | Current route | Read inventory item                       |
| `POST`   | `/inventory`           | Current route | Create inventory item                     |
| `PUT`    | `/inventory/:id`       | Current route | Update inventory item                     |
| `PATCH`  | `/inventory/:id/stock` | Current route | Update quantity, price, and availability  |
| `DELETE` | `/inventory/:id`       | Current route | Delete inventory item                     |
| `GET`    | `/admin/customers`     | JWT + admin   | List customers                            |
| `POST`   | `/payment/create`      | JWT           | Create pending order and Safepay checkout |
| `POST`   | `/payment/verify`      | JWT           | Verify Safepay payment and update order   |
| `GET`    | `/payment/test`        | Public        | Confirm payment route registration        |

The `Current route` entries reflect the implementation as it exists today. They should be protected with `protect` and, where appropriate, `admin` before production deployment; frontend route guards do not protect API endpoints by themselves.

## Domain Models

- **User**: name, unique email, hashed password, role, verification state, and password reset tokens.
- **Pizza**: catalog item data used by menu and pizza management screens.
- **Order**: customer identity, line items, totals, order status, payment status, payment method, and Safepay references.
- **Inventory**: ingredient category, quantity, unit, threshold, price, image, and availability.

Order ownership is evaluated using the authenticated JWT email. The create-order controller deliberately takes `customerEmail` from the token rather than trusting the request body.

## Request Flows

### Authentication

```text
Register -> hash password -> save verification token -> send email
Verify token -> mark user verified
Login -> compare password -> issue 7-day JWT with id/email/role
```

`authMiddleware` requires `Authorization: Bearer <token>`. `adminMiddleware` then requires `req.user.role === "admin"`.

### Customer order

```text
Authenticated client -> POST /orders -> Order document (Pending)
Customer -> GET /orders -> own orders only
Admin -> GET /orders -> all orders
Admin -> PATCH /orders/:id/status -> lifecycle update
```

### Safepay order

```text
POST /payment/create
  -> validate cart and total
  -> load authenticated user
  -> create pending Order
  -> create Safepay session and tracker
  -> return checkout data

POST /payment/verify
  -> verify tracker with Safepay
  -> update paymentStatus and paymentReference
```

## Security And Production Checklist

- Protect pizza and inventory write endpoints with JWT and admin authorization.
- Restrict CORS to the deployed frontend origin instead of allowing every origin.
- Add request validation and rate limiting to authentication and payment endpoints.
- Use a secrets manager or deployment secret store for all credentials.
- Add centralized error handling and structured logging; avoid returning raw `error.message` values in production.
- Use an idempotency strategy for payment verification and order creation.
- Add indexes for frequent order queries, especially `customerEmail` and `createdAt`.
- Add automated API tests for authorization boundaries, payment failure, and order ownership.

## Operational Checks

```bash
curl http://localhost:5000/
curl http://localhost:5000/api/payment/test
```

These checks confirm that the process is listening and that the payment router is mounted. They do not verify MongoDB, email, or Safepay credentials.
