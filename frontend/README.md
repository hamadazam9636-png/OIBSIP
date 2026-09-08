# Pizzaro Frontend

React and Vite client for the Pizzaro pizza ordering platform. The client supports browsing pizzas, building a custom pizza, customer authentication, cart management, checkout, order tracking, and an admin workspace.

## Stack

- React 19 with React Router 7
- Vite 8
- Tailwind CSS 4
- Framer Motion for route transitions and interaction animation
- Lucide React for icons
- Fetch-based service modules for API communication

## Requirements

- Node.js 18 or newer
- The backend running locally or at a reachable URL

## Installation

```bash
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

`VITE_API_URL` must include the `/api` prefix because service modules append paths such as `/auth`, `/pizzas`, and `/orders`.

## Run And Build

```bash
npm run dev       # Start the Vite development server
npm run build     # Create the production build
npm run preview   # Serve the production build locally
npm run lint      # Run ESLint
```

The Vite development URL is normally `http://localhost:5173`.

## Application Structure

```text
src/
  App.jsx                 Route registry and page transitions
  main.jsx                React root, BrowserRouter, and CartProvider
  components/             Reusable UI and feature components
  pages/                  Route-level customer and admin screens
  context/                Cart state and authentication-related state
  services/               API boundary modules
  assets/                 Static frontend assets
```

The service modules are the frontend's API boundary. Components and pages should call a service rather than constructing endpoint URLs inline. Customer and admin tokens are intentionally stored separately in `localStorage` as `customerToken` and `adminToken`.

## Routes And Screens

### Public customer routes

| Route                    | Screen                    |
| ------------------------ | ------------------------- |
| `/`                      | Home                      |
| `/menu`                  | Pizza menu                |
| `/menu/:id`              | Pizza details             |
| `/pizza-builder`         | Custom pizza builder      |
| `/order-summary`         | Order summary             |
| `/login`                 | Customer login            |
| `/register`              | Customer registration     |
| `/verify-email/:token`   | Email verification result |
| `/forgot-password`       | Password recovery request |
| `/reset-password/:token` | Password reset            |

### Protected customer routes

| Route         | Screen                     | Access                 |
| ------------- | -------------------------- | ---------------------- |
| `/dashboard`  | Customer dashboard         | Authenticated customer |
| `/cart`       | Cart and checkout          | Authenticated customer |
| `/orders`     | Customer order history     | Authenticated customer |
| `/orders/:id` | Order details and tracking | Authenticated customer |

### Admin routes

| Route                    | Screen                   |
| ------------------------ | ------------------------ |
| `/admin/login`           | Admin login              |
| `/admin/forgot-password` | Admin password recovery  |
| `/admin/dashboard`       | Admin overview           |
| `/admin/orders`          | Order operations         |
| `/admin/inventory`       | Ingredient inventory     |
| `/admin/pizzas`          | Pizza catalog management |
| `/admin/customers`       | Customer list            |
| `/admin/settings`        | Admin settings           |

`ProtectedRoute` guards customer routes. `AdminProtectedRoute` guards admin routes. `App.jsx` also hides the customer navbar on authentication and admin screens and applies animated route transitions.

## Core User Flows

### Customer ordering

```text
Home/Menu -> Pizza details or Custom builder -> Cart -> Order summary
        -> COD order or Safepay checkout -> Order details -> Tracking
```

`CartContext` owns the in-memory cart. It merges matching items by `id`, manages quantity changes, and clears items after checkout logic completes. The backend remains the authority for the authenticated customer's email, order ownership, payment state, and order status.

### Authentication

```text
Register -> verification email -> verify-email/:token -> Login
Login -> JWT in localStorage -> protected customer screens
Forgot password -> email token -> reset password -> Login
```

The API returns a JWT containing the user id, email, and role. API service modules attach it as `Authorization: Bearer <token>`.

### Admin operations

```text
Admin login -> admin JWT -> dashboard/orders/inventory/pizzas/customers/settings
```

Admin screens use `adminToken`. The backend checks the token and role before admin-only order status changes and customer listing operations.

### Safepay checkout

```text
Cart -> POST /payment/create -> Safepay checkout URL
     -> customer completes payment -> POST /payment/verify
     -> order paymentStatus becomes Paid or Failed
```

Payment creation creates a pending order before starting the external checkout. Keep Safepay secret credentials in the backend only; `VITE_API_URL` is the only payment-related value required by the client.

## API Services Used By The Client

| Service               | Responsibility                               |
| --------------------- | -------------------------------------------- |
| `authService.js`      | Register, login, admin login, logout         |
| `pizzaService.js`     | Read and manage pizza catalog data           |
| `orderService.js`     | Read, create, update, and delete orders      |
| `paymentService.js`   | Create and verify Safepay payments           |
| `inventoryService.js` | Inventory reads and stock mutations          |
| `adminService.js`     | Admin dashboard and administrative API calls |

## Screenshot Documentation Plan

Add screenshots later under `frontend/docs/screenshots/` using the filenames below. Stable names make README updates and future visual regression checks predictable.

| Screen                 | Suggested file           |
| ---------------------- | ------------------------ |
| Home                   | `home.png`               |
| Menu                   | `menu.png`               |
| Pizza details          | `pizza-details.png`      |
| Custom pizza builder   | `pizza-builder.png`      |
| Customer login         | `login.png`              |
| Registration           | `register.png`           |
| Email verification     | `email-verification.png` |
| Forgot password        | `forgot-password.png`    |
| Reset password         | `reset-password.png`     |
| Customer dashboard     | `dashboard.png`          |
| Cart                   | `cart.png`               |
| Order summary          | `order-summary.png`      |
| Orders                 | `orders.png`             |
| Order details/tracking | `order-details.png`      |
| Admin login            | `admin-login.png`        |
| Admin dashboard        | `admin-dashboard.png`    |
| Admin orders           | `admin-orders.png`       |
| Admin inventory        | `admin-inventory.png`    |
| Admin pizzas           | `admin-pizzas.png`       |
| Admin customers        | `admin-customers.png`    |
| Admin settings         | `admin-settings.png`     |

Once the files exist, add them to this section with Markdown image references, for example:

```md
![Customer login](docs/screenshots/login.png)
```

Capture both a normal desktop viewport and a narrow mobile viewport for layout-sensitive screens such as the menu, builder, cart, orders, and admin tables.

## Engineering Notes

- Do not put MongoDB, JWT, email, or Safepay secrets in the frontend environment.
- `localStorage` token storage is convenient for this application but should be reviewed against an httpOnly-cookie strategy before production hardening.
- API failures are surfaced by service modules as `Error` objects so screens can render a consistent error state.
- Run `npm run lint` and `npm run build` before submitting frontend changes.
