import { useState } from "react";
import { ArrowUpRight, Plus, Star, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCart from "../../context/useCart";

function PizzaCard({ pizza }) {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleAddToCart = () => {
    const cartPizza = {
      ...pizza,
      id: pizza._id || pizza.id,
    };

    addToCart(cartPizza);

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const handleView = () => {
    navigate(`/menu/${pizza._id || pizza.id}`);
  };

  return (
    <>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-dark-800 transition-all duration-500 hover:-translate-y-2 hover:border-pizza-red/30 hover:shadow-2xl hover:shadow-pizza-red/10">

        {/* Image */}
        <div className="relative aspect-square shrink-0 overflow-hidden">

          <img
            src={pizza.image}
            alt={pizza.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-70" />

          {/* Rating */}
          <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">

            <Star
              size={13}
              className="fill-pizza-orange text-pizza-orange"
            />

            {pizza.rating}

          </div>

          {/* Popular */}
          {pizza.popular && (
            <div className="absolute right-4 top-4 rounded-full bg-pizza-red px-3 py-1.5 text-xs font-bold text-white">
              Popular
            </div>
          )}

          {/* Add To Cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white text-black shadow-xl transition-all duration-300 hover:scale-110 hover:bg-pizza-orange hover:text-white"
            aria-label={`Add ${pizza.name} to cart`}
          >
            <Plus size={20} />
          </button>

        </div>

        {/* Content */}
        <div className="flex min-h-52.5 flex-1 flex-col p-5">

          <div className="flex items-start justify-between gap-4">

            <div className="min-w-0">
              <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-pizza-orange">
                {pizza.name}
              </h3>


              <p className="mt-1 min-h-18 text-sm leading-6 text-white/45">
                {pizza.description}
              </p>
            </div>

            <span className="shrink-0 text-lg font-black text-pizza-cream">
              Rs. {pizza.price.toLocaleString()}
            </span>

          </div>

          {/* Bottom */}
          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">

            <span className="text-xs font-medium uppercase tracking-wider text-white/35">
              Freshly baked
            </span>

            <button
              onClick={handleView}
              className="flex items-center gap-1 text-xs font-bold text-white/60 transition-colors duration-300 hover:text-pizza-orange"
            >
              View

              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

          </div>

        </div>

      </article>

      {/* Toast */}
      {showToast && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-5">

          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <div className="relative w-full max-w-sm animate-in zoom-in-95 fade-in duration-300 rounded-3xl border border-white/10 bg-dark-800 p-7 text-center shadow-2xl shadow-black/50">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pizza-red/10 text-pizza-red">
              <Check size={30} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-pizza-orange">
              Added to cart
            </p>

            <h3 className="mt-2 text-2xl font-black text-white">
              {pizza.name}
            </h3>

            <p className="mt-2 text-sm text-white/40">
              Your pizza has been added to your cart.
            </p>

            <button
              onClick={() => setShowToast(false)}
              className="mt-6 w-full rounded-xl bg-pizza-red px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-pizza-orange"
            >
              Continue Shopping
            </button>

          </div>
        </div>
      )}

    </>
  );
}

export default PizzaCard;