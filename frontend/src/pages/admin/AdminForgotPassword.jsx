import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, KeyRound, ShieldCheck } from "lucide-react";

function AdminForgotPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend/email reset Phase 3 mein connect hoga
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-dark-950 px-5 py-10 text-white">

      {/* Background Glow */}
      <div className="pointer-events-none fixed left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pizza-red/10 blur-[120px]" />

      <div className="relative w-full max-w-md">

        {/* Back */}
        <Link
          to="/admin/login"
          className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/40 transition-colors duration-300 hover:text-white"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          Back to Admin Login
        </Link>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-dark-800 p-6 shadow-2xl shadow-black/30 sm:p-8">

          {/* Icon */}
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-pizza-red/10 text-pizza-red">
            <KeyRound size={23} />
          </div>

          {/* Heading */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-pizza-orange">
              Admin Security
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight">
              Forgot password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/40">
              Enter your admin email address and we'll send you
              instructions to reset your password.
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
                required
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-pizza-red/50 focus:bg-black/30"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-pizza-red px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-pizza-orange hover:shadow-lg hover:shadow-pizza-red/20"
            >
              Send Reset Instructions

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

          </form>

          {/* Security Note */}
          <div className="mt-6 flex gap-3 rounded-xl border border-white/5 bg-white/5 p-4">

            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-pizza-orange"
            />

            <p className="text-xs leading-5 text-white/30">
              For security, password reset will only be available
              for verified administrator accounts.
            </p>

          </div>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/20">
          PIZZARO Admin Panel
        </p>

      </div>
    </main>
  );
}

export default AdminForgotPassword;