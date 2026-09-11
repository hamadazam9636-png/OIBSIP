# 🍕 Pizzaro — Backend API

The backend API powering **Pizzaro**, a full-stack pizza ordering platform.

Built with **Node.js, Express, MongoDB, and Mongoose**, the API handles authentication, authorization, pizza catalog management, orders, inventory, email workflows, and Safepay payment processing.

---

## ✨ Features

### 🔐 Authentication & Authorization

* Customer registration
* Email verification
* JWT authentication
* Password hashing with bcrypt
* Forgot password
* Password reset
* Role-based admin authorization
* Protected API routes

### 🍕 Pizza & Catalog

* Pizza catalog API
* Pizza creation and management
* Pizza details
* Admin catalog operations

### 🛒 Orders

* Customer order creation
* Customer order history
* Order ownership protection
* Admin order management
* Order status updates
* Order deletion

### 📦 Inventory

* Ingredient inventory management
* Stock quantity tracking
* Stock threshold monitoring
* Availability management
* Inventory price management
* Stock updates

### 💳 Payments

* Safepay sandbox integration
* Payment session creation
* Payment verification
* Payment status tracking
* Payment references
* Pending order creation before checkout

### 📧 Email

* Email verification
* Password reset emails
* SMTP/Nodemailer integration

---

## 🧰 Tech Stack

| Technology     | Purpose                   |
| -------------- | ------------------------- |
| **Node.js**    | Runtime                   |
| **Express 5**  | REST API framework        |
| **MongoDB**    | Database                  |
| **Mongoose 9** | MongoDB ODM               |
| **JWT**        | Authentication            |
| **bcryptjs**   | Password hashing          |
| **Nodemailer** | Email delivery            |
| **Safepay**    | Online payments           |
| **dotenv**     | Environment configuration |
| **CORS**       | Cross-origin API access   |

---

## 📁 Project Structure

```text id="m1d5ez"
backend/
├── config/
│   ├── cloudinary.js
│   ├── db.js
│   └── safepay.js
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── customerController.js
│   ├── imageController.js
│   ├── inventoryController.js
│   ├── orderController.js
│   ├── paymentController.js
│   └── pizzaController.js
├── jobs/
│   └── stockChecker.js
├── middleware/
│   ├── adminMiddleware.js
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── Inventory.js
│   ├── Order.js
│   ├── Pizza.js
│   └── User.js
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── customerRoutes.js
│   ├── imageRoute.js
│   ├── inventoryRoutes.js
│   ├── orderRoutes.js
│   ├── paymentRoutes.js
│   └── pizzaRoutes.js
├── services/
│   ├── emailService.js
│   ├── paymentService.js
│   └── stockService.js
├── server.js
├── package.json
└── README.md
```

The backend follows a layered structure where:

* **Routes** define API endpoints
* **Middleware** handles authentication and authorization
* **Controllers** process requests and coordinate operations
* **Services** isolate external integrations and business operations
* **Models** define MongoDB schemas
* **MongoDB** stores application data

---

## 🚀 Getting Started

### Requirements

Before running the API, make sure you have:

* **Node.js 18+**
* MongoDB
* SMTP credentials
* Safepay merchant credentials

### 1. Install dependencies
npm install
```

### Production Recommendations

Before production deployment:

* Restrict CORS to the deployed frontend domain
* Protect all pizza and inventory write endpoints
* Add request validation
* Add rate limiting to authentication and payment endpoints
* Use deployment secret storage
* Add centralized error handling
* Avoid exposing raw internal errors
* Add payment idempotency protection
* Add database indexes for frequent queries
* Add automated authorization and payment tests

---

# 🧪 API Health Checks

Check whether the server is running:

```bash id="z2v5k9"
curl http://localhost:5000/
```

Check whether the payment router is mounted:

```bash id="r4g7p1"
curl http://localhost:5000/api/payment/test
```

These endpoints confirm that the server and payment route are reachable.

They **do not** verify MongoDB, email, or Safepay credentials.

---

## 👨‍💻 Author

**Hamad Azam**

Built as part of the **OIBSIP Web Development — Level 3 Task 1** project.

---

## ⭐ Pizzaro

A full-stack pizza ordering platform combining a modern React frontend with a structured Express + MongoDB backend.

**🍕 Build your pizza. Place your order. Track it.**
