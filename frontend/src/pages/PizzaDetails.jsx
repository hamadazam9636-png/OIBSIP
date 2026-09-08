import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Plus,
  Star,
  ShoppingCart,
} from "lucide-react";

import { getPizzaById } from "../services/pizzaService";
import useCart from "../context/useCart";

function PizzaDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const loadPizza = async () => {
      try {
        setLoading(true);

        const data = await getPizzaById(id);

        setPizza(data.pizza || data);
      } catch (err) {
        console.error(err);
        setError("Unable to load this pizza.");
      } finally {
        setLoading(false);
      }
    };

    loadPizza();
  }, [id]);

  const handleAddToCart = () => {
    if (!pizza) return;

    addToCart({
      ...pizza,
      id: pizza._id || pizza.id,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2200);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dark-950 px-6 pt-24">
        <p className="text-sm font-medium text-white/40">
          Loading pizza...
        </p>
      </main>
    );
  }

  if (error || !pizza) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dark-950 px-6 pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-black text-white">
            Pizza not found
          </h1>

          <p className="mt-2 text-sm text-white/40">
            This pizza may no longer be available.
          </p>

          <Link
            to="/menu"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-pizza-red px-5 py-3 text-sm font-bold text-white"
          >
            <ArrowLeft size={16} />
            Back to Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-950 px-5 pb-20 pt-28 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          to="/menu"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/45 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Menu
        </Link>

        {/* Main */}
        <section className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/2.5 lg:grid-cols-2">

          {/* Image */}
          <div className="relative min-h-100 overflow-hidden bg-black/20 lg:min-h-150">

            <img
              src={pizza.image}
              alt={pizza.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

            {pizza.popular && (
              <span className="absolute left-5 top-5 rounded-full bg-pizza-red px-4 py-2 text-xs font-bold">
                Popular Choice
              </span>
            )}

          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">

            <div className="flex items-center gap-3">

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/45">
                {pizza.category}
              </span>

              <span className="flex items-center gap-1 text-sm font-bold">
                <Star
                  size={15}
                  className="fill-pizza-orange text-pizza-orange"
                />
                {pizza.rating}
              </span>

            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
              {pizza.name}
            </h1>

            <p className="mt-5 text-base leading-7 text-white/45">
              {pizza.description}
            </p>

            <div className="my-8 border-t border-white/10" />

            <div className="flex items-end justify-between gap-5">

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
                  Price
                </p>

                <p className="mt-1 text-3xl font-black text-pizza-cream">
                  Rs. {pizza.price?.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Check size={15} />
                Freshly baked
              </div>

            </div>

            <button
              onClick={handleAddToCart}
              disabled={pizza.available === false}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-pizza-red px-6 py-4 text-sm font-black text-white transition-all duration-300 hover:bg-pizza-orange disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
            >
              {pizza.available === false ? (
                "Currently Unavailable"
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Add to Cart
                  <Plus size={16} />
                </>
              )}
            </button>

          </div>

        </section>

      </div>

      {/* Success */}
      {added && (
        <div className="fixed bottom-6 left-1/2 z-100 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-emerald-400/20 bg-dark-800 px-5 py-4 shadow-2xl">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
            <Check size={18} />
          </div>

          <div>
            <p className="text-sm font-bold">
              Added to cart
            </p>

            <p className="text-xs text-white/35">
              {pizza.name} is ready in your cart.
            </p>
          </div>

        </div>
      )}
    </main>
  );
}

export default PizzaDetails;