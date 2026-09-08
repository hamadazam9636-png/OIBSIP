import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  ArrowRight,
  LogOut,
} from "lucide-react";

import useCart from "../context/useCart";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Build Pizza", path: "/pizza-builder" },
  { name: "Orders", path: "/orders" },
  { name: "Dashboard", path: "/dashboard" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const { cart } = useCart();

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const isLoggedIn = Boolean(localStorage.getItem("customerToken"));

  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerUser");

    setMobileOpen(false);
    navigate("/login");
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 md:px-6">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/70 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl md:px-6">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-red text-xl shadow-lg shadow-red-500/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              🍕
            </div>

            <span className="text-xl font-black tracking-tight text-pizza-cream">
              PIZZARO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="group relative py-2 text-sm font-medium text-white/65 transition-colors duration-300 hover:text-white"
              >
                {link.name}

                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-pizza-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden items-center gap-3 md:flex">

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-pizza-red/40 hover:bg-pizza-red/10 hover:text-white"
            >
              <ShoppingCart size={19} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pizza-red px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login / Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="group flex items-center gap-2 rounded-xl bg-pizza-red px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-pizza-orange hover:shadow-lg hover:shadow-red-500/20"
              >
                Logout

                <LogOut
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            ) : (
              <Link
                to="/login"
                className="group flex items-center gap-2 rounded-xl bg-pizza-red px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-pizza-orange hover:shadow-lg hover:shadow-red-500/20"
              >
                Login

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mt-4 border-t border-white/10 pt-4 md:hidden">

            <div className="flex flex-col gap-1">

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors duration-300 hover:bg-white/5 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Cart */}
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart size={18} />
                  Cart
                </div>

                {cartCount > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-pizza-red px-1.5 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Login / Logout */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-pizza-red px-4 py-3 text-sm font-bold text-white"
                >
                  Logout
                  <LogOut size={16} />
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 rounded-xl bg-pizza-red px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Login
                </Link>
              )}

            </div>
          </div>
        )}

      </nav>
    </header>
  );
}

export default Navbar;