import {
  ArrowUpRight,
  Heart,
} from "lucide-react";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark-950">

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="group inline-flex items-center gap-2"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pizza-red text-xl shadow-lg shadow-pizza-red/20 transition-transform duration-300 group-hover:rotate-6">
                🍕
              </div>

              <span className="text-xl font-black tracking-tight text-pizza-cream">
                PIZZARO
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/40">
              Craft your perfect pizza with fresh ingredients,
              delicious flavors, and a pizza experience made your way.
            </p>

            {/* GitHub */}
            <a
              href="https://github.com/hamadazam9636-png"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
              className="group mt-6 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
             
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.466-1.11-1.466-.908-.621.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.529 2.341 1.087 2.91.831.091-.646.35-1.087.636-1.338-2.221-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.58 9.58 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .269.18.58.688.482A10.001 10.001 0 0 0 22 12C22 6.477 17.523 2 12 2Z" />
              </svg>

              <span>View my GitHub</span>

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold text-white">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/"
                className="group relative w-fit py-1 text-sm text-white/40 transition-colors duration-300 hover:text-white"
              >
                Home
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-pizza-red transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                to="/menu"
                className="group relative w-fit py-1 text-sm text-white/40 transition-colors duration-300 hover:text-white"
              >
                Menu
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-pizza-red transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                to="/pizza-builder"
                className="group relative w-fit py-1 text-sm text-white/40 transition-colors duration-300 hover:text-white"
              >
                Build Pizza
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-pizza-red transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                to="/cart"
                className="group relative w-fit py-1 text-sm text-white/40 transition-colors duration-300 hover:text-white"
              >
                Cart
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-pizza-red transition-all duration-300 group-hover:w-full" />
              </Link>

            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-bold text-white">
              Account
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/login"
                className="group relative w-fit py-1 text-sm text-white/40 transition-colors duration-300 hover:text-white"
              >
                Login
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-pizza-red transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                to="/register"
                className="group relative w-fit py-1 text-sm text-white/40 transition-colors duration-300 hover:text-white"
              >
                Create Account
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-pizza-red transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                to="/dashboard"
                className="group relative w-fit py-1 text-sm text-white/40 transition-colors duration-300 hover:text-white"
              >
                Dashboard
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-pizza-red transition-all duration-300 group-hover:w-full" />
              </Link>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Pizzaro. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-white/30">
            Made with

            <Heart
              size={13}
              className="fill-pizza-red text-pizza-red"
            />

            by Hadi
          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;