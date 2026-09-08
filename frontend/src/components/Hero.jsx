import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-dark-950 pt-32">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-pizza-red/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 top-20 h-87.5 w-87.5 animate-pulse rounded-full bg-pizza-orange/10 blur-[100px] [animation-delay:1s]" />

      {/* Decorative Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-12 px-6 pb-20 lg:grid-cols-2 lg:px-8">

        {/* LEFT CONTENT */}
        <div className="relative z-10">

          {/* Small Badge */}
          <div className="mb-7 inline-flex animate-[fadeInUp_0.8s_ease-out_both] items-center gap-2 rounded-full border border-pizza-red/20 bg-pizza-red/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-pizza-orange">
            <Sparkles
              size={14}
              className="animate-[spin_4s_linear_infinite]"
            />
            Crafted with passion
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl animate-[fadeInUp_1s_ease-out_0.15s_both] text-6xl font-black leading-[0.95] tracking-tighter text-pizza-cream sm:text-7xl lg:text-8xl">
            The Art of

            <span className="mt-2 block bg-linear-to-r from-pizza-red via-pizza-orange to-pizza-red bg-clip-text text-transparent animate-[shimmer_4s_linear_infinite] bg-size-[200%_auto]">
              Perfect Pizza.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl animate-[fadeInUp_0.9s_ease-out_0.3s_both] text-base leading-7 text-white/55 sm:text-lg">
            Handcrafted with premium ingredients, baked with passion,
            and built exactly the way you crave it.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex animate-[fadeInUp_0.9s_ease-out_0.45s_both] flex-col gap-3 sm:flex-row">

            {/* Build Pizza */}
            <Link
              to="/pizza-builder"
              className="group flex items-center justify-center gap-3 rounded-full bg-pizza-red px-7 py-4 text-sm font-bold text-white shadow-xl shadow-red-500/10 transition-all duration-300 hover:-translate-y-1 hover:bg-pizza-orange hover:shadow-2xl hover:shadow-orange-500/20"
            >
              Build Your Pizza

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Explore Menu */}
            <Link
              to="/menu"
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-bold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              Explore Menu
            </Link>

          </div>

          {/* Mini Stats */}
          <div className="mt-12 flex animate-[fadeInUp_0.9s_ease-out_0.6s_both] gap-8 border-t border-white/10 pt-7">

            <div className="transition-transform duration-300 hover:-translate-y-1">
              <p className="text-2xl font-black text-white">5+</p>
              <p className="mt-1 text-xs text-white/40">
                Pizza Bases
              </p>
            </div>

            <div className="h-10 w-px bg-white/10" />

            <div className="transition-transform duration-300 hover:-translate-y-1">
              <p className="text-2xl font-black text-white">5+</p>
              <p className="mt-1 text-xs text-white/40">
                Sauces
              </p>
            </div>

            <div className="h-10 w-px bg-white/10" />

            <div className="transition-transform duration-300 hover:-translate-y-1">
              <p className="text-2xl font-black text-white">∞</p>
              <p className="mt-1 text-xs text-white/40">
                Combinations
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex animate-[fadeInRight_1.2s_ease-out_0.25s_both] items-center justify-center">

          {/* Outer Glow */}
          <div className="absolute h-82.5 w-82.5 animate-pulse rounded-full bg-pizza-red/20 blur-[80px] sm:h-107.5 sm:w-107.5" />

          {/* Image Ring */}
          <div className="relative flex h-85 w-85 animate-[float_6s_ease-in-out_infinite] items-center justify-center rounded-full border border-white/10 bg-white/3 shadow-2xl shadow-black/50 backdrop-blur-sm transition-transform duration-700 hover:scale-[1.03] sm:h-117.5 sm:w-117.5">

            <div className="absolute inset-5 animate-[spin_25s_linear_infinite] rounded-full border border-pizza-red/10" />

            <img
              src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85"
              alt="Fresh pizza"
              className="h-67.5 w-67.5 rounded-full object-cover shadow-2xl transition-transform duration-700 hover:scale-105 sm:h-95 sm:w-95"
            />

          </div>

          {/* Floating ingredient cards */}
          <div className="absolute left-0 top-16 hidden animate-[floatCard_5s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-black/60 px-4 py-3 shadow-xl backdrop-blur-xl sm:block">

            <p className="text-xs font-semibold text-white/40">
              FRESH
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              Ingredients
            </p>

          </div>

          <div className="absolute bottom-14 right-0 hidden animate-[floatCardReverse_5s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-black/60 px-4 py-3 shadow-xl backdrop-blur-xl sm:block">

            <p className="text-xs font-semibold text-white/40">
              MADE
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              Your Way 🍕
            </p>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-[fadeIn_1s_ease-out_1.2s_both] flex-col items-center gap-2 text-white/30 sm:flex">

        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          Scroll to explore
        </span>

        <ArrowDown
          size={15}
          className="animate-bounce"
        />

      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(35px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(60px) scale(0.92);
            }
            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }

            50% {
              transform: translateY(-14px) rotate(1deg);
            }
          }

          @keyframes floatCard {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }

            50% {
              transform: translateY(-10px) rotate(-2deg);
            }
          }

          @keyframes floatCardReverse {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }

            50% {
              transform: translateY(10px) rotate(2deg);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: 0% center;
            }

            100% {
              background-position: 200% center;
            }
          }
        `}
      </style>

    </section>
  );
}

export default Hero;