import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";

import { adminLogin } from "../../services/authService";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await adminLogin({
        email,
        password,
      });

      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-950 px-5 py-10 text-white sm:px-8">

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">

        <div className="w-full">

          {/* Back */}
          <Link
            to="/"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/40 transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to website
          </Link>

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-dark-800 p-6 shadow-2xl shadow-black/30 sm:p-8">

            {/* Icon */}
            <div className="mb-7 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pizza-red/10 text-pizza-red">
                <ShieldCheck size={30} />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center">

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-pizza-orange">
                Admin Portal
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-pizza-cream">
                Welcome back
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/40">
                Sign in to manage orders, inventory, and your Pizzaro
                administration panel.
              </p>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="admin-email"
                  className="mb-2 block text-sm font-semibold text-white/70"
                >
                  Admin Email
                </label>

                <input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition-all duration-300 focus:border-pizza-red/50 focus:bg-white/5 focus:ring-2 focus:ring-pizza-red/10"
                />

              </div>

              {/* Password */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="admin-password"
                    className="text-sm font-semibold text-white/70"
                  >
                    Password
                  </label>

                  <Link
                    to="/admin/forgot-password"
                    className="text-xs font-semibold text-pizza-orange transition-colors hover:text-pizza-red"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="relative">

                  <LockKeyhole
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                  />

                  <input
                    id="admin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/20 transition-all duration-300 focus:border-pizza-red/50 focus:bg-white/5 focus:ring-2 focus:ring-pizza-red/10"
                  />

                </div>

              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-pizza-red px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-pizza-orange hover:shadow-lg hover:shadow-pizza-red/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Signing in..."
                  : "Sign in to Admin Panel"}
              </button>

            </form>

            {/* Security Notice */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">

              <ShieldCheck
                size={17}
                className="mt-0.5 shrink-0 text-emerald-400"
              />

              <p className="text-xs leading-5 text-white/35">
                This area is restricted to authorized Pizzaro
                administrators.
              </p>

            </div>

          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-white/25">
            Pizzaro Admin Portal
          </p>

        </div>

      </div>

    </main>
  );
}

export default AdminLogin;