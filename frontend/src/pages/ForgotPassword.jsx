import { Link } from "react-router-dom";
import { ArrowLeft, Pizza, Sparkles } from "lucide-react";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <main className="min-h-screen bg-dark-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Visual Side */}
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=90"
            alt="Fresh pizza"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/40 to-pizza-red/30" />

          <div className="relative flex h-full flex-col justify-between p-12">

            <Link
              to="/"
              className="flex items-center gap-3 text-xl font-black"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-red">
                <Pizza size={21} />
              </span>

              PIZZARO
            </Link>

            <div className="max-w-lg">
              <div className="mb-5 flex items-center gap-2 text-pizza-orange">
                <Sparkles size={17} />

                <span className="text-sm font-semibold">
                  We've got you covered
                </span>
              </div>

              <h1 className="text-5xl font-black leading-tight">
                Get back to your
                <span className="text-pizza-orange">
                  {" "}pizza journey.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-white/60">
                Enter your email and we'll help you get back
                into your Pizzaro account.
              </p>
            </div>

            <p className="text-xs text-white/30">
              © 2026 Pizzaro. Crafted with passion.
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              to="/"
              className="mb-12 flex items-center justify-center gap-3 text-xl font-black lg:hidden"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-red">
                <Pizza size={21} />
              </span>

              PIZZARO
            </Link>

            <Link
              to="/login"
              className="mb-8 inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to login
            </Link>

            <div className="mb-8">
              <p className="text-sm font-semibold text-pizza-orange">
                Password recovery
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Forgot your password?
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/40">
                No worries. Enter your email and we'll send
                you instructions to reset your password.
              </p>
            </div>

            <ForgotPasswordForm />

            <p className="mt-7 text-center text-sm text-white/40">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-semibold text-pizza-orange transition hover:text-pizza-red"
              >
                Sign in
              </Link>
            </p>

          </div>
        </div>

      </div>
    </main>
  );
}

export default ForgotPassword;