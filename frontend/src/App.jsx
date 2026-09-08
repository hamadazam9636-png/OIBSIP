import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminInventory from "./pages/admin/Inventory";
import AdminPizzas from "./pages/admin/Pizzas";
import AdminCustomers from "./pages/admin/Customers";
import AdminSettings from "./pages/admin/Settings";
import AdminForgotPassword from "./pages/admin/AdminForgotPassword";

import EmailVerification from "./components/auth/EmailVerification";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";

import PizzaBuilder from "./components/pizza/PizzaBuilder";
import OrderSummary from "./pages/OrderSummary";
import OrderDetails from "./pages/OrderDetails";
import PizzaDetails from "./pages/PizzaDetails";

function App() {
  const location = useLocation();

  const authPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/admin/login",
    "/admin/forgot-password",
  ];

  const isAdminPage =
    location.pathname.startsWith("/admin");

  const showNavbar =
    !authPages.includes(location.pathname) &&
    !isAdminPage;

  return (
    <>
      {/* ==================================================
          USER NAVBAR
      ================================================== */}
      {showNavbar && <Navbar />}

      {/* ==================================================
          PAGE TRANSITIONS
      ================================================== */}
      <AnimatePresence mode="wait">

        <motion.div
          key={`${location.pathname}${location.search}`}
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -8,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="min-h-screen"
        >

          <Routes>

            {/* ================= PUBLIC ROUTES ================= */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/verify-email/:token"
              element={<EmailVerification />}
            />

            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />

            <Route
              path="/menu"
              element={<Menu />}
            />

            <Route
              path="/menu/:id"
              element={<PizzaDetails />}
            />

            <Route
              path="/pizza-builder"
              element={<PizzaBuilder />}
            />

            <Route
              path="/order-summary"
              element={<OrderSummary />}
            />

            {/* ================= USER PROTECTED ROUTES ================= */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* ================= ADMIN ROUTES ================= */}

            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />

            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <AdminProtectedRoute>
                  <AdminOrders />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/inventory"
              element={
                <AdminProtectedRoute>
                  <AdminInventory />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/pizzas"
              element={
                <AdminProtectedRoute>
                  <AdminPizzas />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/customers"
              element={
                <AdminProtectedRoute>
                  <AdminCustomers />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/settings"
              element={
                <AdminProtectedRoute>
                  <AdminSettings />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/forgot-password"
              element={<AdminForgotPassword />}
            />

          </Routes>

        </motion.div>

      </AnimatePresence>
    </>
  );
}

export default App;