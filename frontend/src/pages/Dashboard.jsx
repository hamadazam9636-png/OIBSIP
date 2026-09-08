import {
  ArrowRight,
  ChefHat,
  Package,
  Sparkles,
} from "lucide-react";

import PizzaCard from "../components/pizza/PizzaCard";
import OrderTracker from "../components/orders/OrderTracker";

function Dashboard() {
  const pizzas = [
    {
      id: 1,
      name: "Pepperoni Classic",
      description:
        "Loaded with premium pepperoni, mozzarella and our signature tomato sauce.",
      price: 1499,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=85",
    },
    {
      id: 2,
      name: "Smoky BBQ",
      description:
        "Smoky BBQ sauce, tender chicken, mozzarella and fresh vegetables.",
      price: 1699,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=85",
    },
    {
      id: 3,
      name: "Garden Supreme",
      description:
        "A fresh combination of vegetables, mozzarella and our house sauce.",
      price: 1799,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=800&q=85",
    },
  ];

  return (
    <main className="min-h-screen bg-dark-950 px-5 pb-20 pt-28 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Welcome */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 px-6 py-10 sm:px-10 lg:px-14 lg:py-14">

          {/* Background glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-pizza-red/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-pizza-orange/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">

            <div className="animate-[fadeIn_0.7s_ease-out]">

              <div className="mb-5 flex items-center gap-2 text-pizza-orange">
                <Sparkles size={16} />

                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Your pizza dashboard
                </span>
              </div>

              <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Good evening,
                <span className="block text-pizza-orange">
                  Hamad. 👋
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
                Your next favorite pizza is waiting. Create your
                perfect combination or choose one of our favorites.
              </p>

              <a
                href="/pizza-builder"
                className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-pizza-red px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-pizza-red/20 transition-all duration-300 hover:-translate-y-1 hover:bg-pizza-orange hover:shadow-pizza-orange/20"
              >
                Build Your Pizza

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

            </div>

            {/* Hero Pizza */}
            <div className="relative hidden lg:block">

              <div className="absolute inset-8 rounded-full bg-pizza-red/20 blur-3xl" />

              <img
                src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=90"
                alt="Fresh pizza"
                className="relative mx-auto w-full max-w-md rounded-full object-cover shadow-2xl transition-transform duration-700 hover:scale-105"
              />

            </div>

          </div>
        </section>

        {/* Current Order */}
        <section className="mt-14">

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-pizza-orange">
              Your order
            </p>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Track your pizza
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/3 p-5 transition-all duration-500 hover:border-white/15 sm:p-8">

            {/* Order heading */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pizza-red/10 text-pizza-red">
                  <Package size={20} />
                </div>

                <div>
                  <p className="text-xs text-white/30">
                    Order number
                  </p>

                  <p className="mt-1 font-bold">
                    #PZ1024
                  </p>
                </div>

              </div>

              <div className="flex w-fit items-center gap-2 rounded-full border border-pizza-orange/10 bg-pizza-orange/10 px-3 py-1.5 text-xs font-bold text-pizza-orange">

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pizza-orange" />

                In Kitchen

              </div>

            </div>

            <OrderTracker status="In Kitchen" />

          </div>
        </section>

        {/* Available Pizzas */}
        <section className="mt-16">

          <div className="mb-7 flex items-end justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pizza-orange">
                Discover
              </p>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Available pizzas
              </h2>

              <p className="mt-2 text-sm text-white/35">
                Fresh favorites made for every craving.
              </p>
            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {pizzas.map((pizza) => (
              <PizzaCard
                key={pizza.id}
                pizza={pizza}
              />
            ))}

          </div>

        </section>

        {/* Small bottom CTA */}
        <section className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pizza-orange/10 text-pizza-orange">
                <ChefHat size={21} />
              </div>

              <div>
                <h3 className="font-bold">
                  Want something completely yours?
                </h3>

                <p className="mt-1 text-sm text-white/35">
                  Build a pizza exactly the way you like it.
                </p>
              </div>

            </div>

            <a
              href="/pizza-builder"
              className="group flex w-fit items-center gap-2 text-sm font-bold text-pizza-orange transition-colors hover:text-pizza-cream"
            >
              Start building

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

          </div>

        </section>

      </div>
    </main>
  );
}

export default Dashboard;