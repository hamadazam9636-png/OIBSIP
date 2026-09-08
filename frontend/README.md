# 🍕 Pizzaro — Frontend

A modern **React + Vite pizza ordering platform** built for a smooth customer ordering experience and a powerful admin workspace.

Pizzaro lets customers explore pizzas, create custom pizzas, manage their cart, place orders, make secure online payments, and track their orders in real time. Administrators can manage pizzas, inventory, customers, and orders from a dedicated dashboard.

---

## ✨ Features

### 🛒 Customer Experience

* Browse the complete pizza menu
* View detailed pizza information
* Build a custom pizza
* Select base, sauce, cheese, and vegetables
* Add and manage cart items
* Quantity management
* Order summary and checkout
* Cash on Delivery support
* Safepay online payments
* Order history
* Order details and tracking

### 🔐 Authentication

* Customer registration
* Email verification
* Secure login with JWT
* Forgot password
* Password reset
* Protected customer routes

### 🛠️ Admin Workspace

* Admin authentication
* Dashboard overview
* Pizza catalog management
* Order management
* Order status updates
* Inventory management
* Customer management
* Admin settings

### 🎨 UI & Experience

* Responsive design
* Modern dark-themed interface
* Smooth page transitions
* Interactive animations
* Framer Motion interactions
* Lucide icons
* Mobile-friendly layouts

---

## 🧰 Tech Stack

| Technology         | Purpose                          |
| ------------------ | -------------------------------- |
| **React 19**       | Frontend UI                      |
| **Vite 8**         | Development & production tooling |
| **React Router 7** | Client-side routing              |
| **Tailwind CSS 4** | Styling                          |
| **Framer Motion**  | Animations & transitions         |
| **Lucide React**   | Icons                            |
| **Fetch API**      | Backend communication            |

---

## 📁 Project Structure

```text
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── orders/
│   │   └── pizza/
│   ├── context/
│   ├── pages/
│   │   └── admin/
│   ├── services/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

### Architecture

* **Components** — reusable UI and feature components
* **Pages** — customer and admin screens
* **Context** — authentication and cart state
* **Services** — API communication layer
* **Assets** — images and static frontend resources

API requests are handled through service modules instead of constructing endpoint URLs directly inside components.

---

## 📸 Screenshots

> Screenshots can be added here to showcase the application.

### 🏠 Home


<img width="100%" height="100%" alt="image" src="https://github.com/user-attachments/assets/ff1ee767-5f4c-4edb-895d-1546296c5ed5" />


### 🍕 Menu

<img width="1920" height="3030" alt="image" src="https://github.com/user-attachments/assets/e5a7f5ce-6df5-43bd-9fbf-09a14f3848c7" />


### 🧑‍🍳 Pizza Builder

<img width="1920" height="2265" alt="image" src="https://github.com/user-attachments/assets/5c4c1d22-d8ba-41b1-90c1-14810b72e482" />


### 🛒 Cart

<img width="1920" height="1356" alt="image" src="https://github.com/user-attachments/assets/bf2012e7-11d2-43bc-9067-03ab496c127c" />


### 📦 Orders

<img width="100%" height="100%" alt="image" src="https://github.com/user-attachments/assets/6468ec95-4f2f-4792-83be-be0b353ec4d9" />


## 🚀 Getting Started

### Requirements

* **Node.js 18+**
* Running Pizzaro backend
* MongoDB configured through the backend

### 1. Clone the repository

```bash
git clone https://github.com/hamadazam9636-png/OIBSIP.git
cd OIBSIP
```

Then enter the frontend directory:

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```


## 👨‍💻 Author

**Hamad Azam**

Built as part of the **OIBSIP Web Development — Level 3 Task 1** project.

---

## ⭐ Support

If you like the project, consider giving the repository a ⭐ on GitHub.
