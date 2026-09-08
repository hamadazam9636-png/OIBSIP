import { Link } from "react-router-dom";
import { Pizza, Sparkles } from "lucide-react";
import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  return (
    <main className="min-h-screen bg-dark-950 text-white">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Form Side */}
        <div className="order-2 flex items-center justify-center px-6 py-12 sm:px-10 lg:order-1">
          <div className="w-full max-w-md">

            <Link
              to="/"
              className="mb-10 flex items-center gap-3 text-xl font-black"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-red">
                <Pizza size={21} />
              </span>

              PIZZARO
            </Link>

            <div className="mb-8">
              <p className="text-sm font-semibold text-pizza-orange">
                Join Pizzaro
              </p>

              <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                Create your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/40">
                Create an account and start building your
                perfect pizza.
              </p>
            </div>

            <RegisterForm />

            <p className="mt-7 text-center text-sm text-white/40">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-pizza-orange transition hover:text-pizza-red"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Visual Side */}
        <div className="relative order-1 hidden overflow-hidden lg:block lg:order-2">

          <img
            src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=90"
            alt="Fresh pizza"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-br from-pizza-red/30 via-black/40 to-black/80" />

          <div className="relative flex h-full flex-col justify-end p-12">

            <div className="mb-10 flex items-center gap-2 text-pizza-orange">
              <Sparkles size={17} />

              <span className="text-sm font-semibold">
                Made your way
              </span>
            </div>

            <h2 className="max-w-xl text-5xl font-black leading-tight">
              One account.
              <br />
              Endless pizza possibilities.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-white/60">
              Save your preferences, track your orders and
              create something delicious every time.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}

export default Register;