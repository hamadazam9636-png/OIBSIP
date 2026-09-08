import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Pizza,
  ShoppingCart,
} from "lucide-react";

import useCart from "../context/useCart";

function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const pizza = location.state?.pizza;

  // --------------------------------
  // No pizza
  // --------------------------------
  if (!pizza) {
    return (
      <main className="min-h-screen bg-dark-950 px-5 pb-20 pt-32 text-white">
        <div className="mx-auto max-w-3xl text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pizza-red/10 text-pizza-red">
            <Pizza size={28} />
          </div>

          <h1 className="mt-6 text-3xl font-black">
            No pizza found
          </h1>

          <p className="mt-3 text-sm text-white/40">
            Start building your pizza first.
          </p>

          <Link
            to="/pizza-builder"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-pizza-red px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-pizza-orange"
          >
            Build Your Pizza
            <ArrowRight size={16} />
          </Link>

        </div>
      </main>
    );
  }

  // --------------------------------
  // Safe vegetables
  // --------------------------------
  const vegetables = Array.isArray(
    pizza.vegetables
  )
    ? pizza.vegetables
    : [];

  // --------------------------------
  // Get ingredient price
  // --------------------------------
  const getIngredientPrice = (ingredient) => {
    if (!ingredient) {
      return 0;
    }

    if (typeof ingredient === "object") {
      return Number(
        ingredient.price ??
        ingredient.cost ??
        0
      );
    }

    return 0;
  };

  // --------------------------------
  // Calculate custom pizza price
  // --------------------------------
  const BASE_CUSTOM_PIZZA_PRICE = 500;

  const pizzaPrice =
    BASE_CUSTOM_PIZZA_PRICE +
    getIngredientPrice(pizza.base) +
    getIngredientPrice(pizza.sauce) +
    getIngredientPrice(pizza.cheese) +
    vegetables.reduce(
      (total, vegetable) =>
        total +
        getIngredientPrice(vegetable),
      0
    );

  // --------------------------------
  // Ingredients
  // --------------------------------
  const ingredients = [
    {
      label: "Base",
      value: pizza.base,
    },
    {
      label: "Sauce",
      value: pizza.sauce,
    },
    {
      label: "Cheese",
      value: pizza.cheese,
    },
  ];

  // --------------------------------
  // Add to cart
  // --------------------------------
  const handleAddToCart = () => {
  const customPizza = {
    ...pizza,

    id: `custom-${Date.now()}`,

    name: "Custom Pizza",

    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=85",

    price: 1200,

    quantity: 1,
    };

    addToCart(customPizza);

    navigate("/cart");
  };

  return (
    <main className="min-h-screen bg-dark-950 px-5 pb-20 pt-28 text-white sm:px-8 lg:px-10">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <section className="mb-10">

          <Link
            to="/pizza-builder"
            className="group mb-7 inline-flex items-center gap-2 text-sm font-semibold text-white/40 transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to builder
          </Link>

          <div className="flex items-end justify-between gap-5">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pizza-orange">
                Almost ready
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                Review your pizza.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                Make sure everything looks perfect before adding your
                custom pizza to the cart.
              </p>

            </div>

            <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-pizza-red/10 text-pizza-red sm:flex">
              <Pizza size={25} />
            </div>

          </div>

        </section>

        {/* Main */}
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Ingredients */}
          <section className="rounded-3xl border border-white/10 bg-white/3 p-5 sm:p-7">

            <div className="mb-7 flex items-center justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                  Your creation
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Custom Pizza
                </h2>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-orange/10 text-pizza-orange">
                <Pizza size={18} />
              </div>

            </div>

            <div className="space-y-3">

              {ingredients.map(
                (ingredient) => (
                  <div
                    key={ingredient.label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-white/20"
                  >

                    <div>

                      <p className="text-xs text-white/30">
                        {ingredient.label}
                      </p>

                      <p className="mt-1 text-sm font-bold text-white">
                        {ingredient.value?.name ||
                          "Not selected"}
                      </p>

                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                      <Check size={15} />
                    </div>

                  </div>
                )
              )}

              {/* Vegetables */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs text-white/30">
                      Vegetables
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {vegetables.length > 0
                        ? `${vegetables.length} selected`
                        : "No vegetables"}
                    </p>

                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                    <Check size={15} />
                  </div>

                </div>

                {vegetables.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">

                    {vegetables.map(
                      (vegetable) => (
                        <span
                          key={vegetable.id}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60"
                        >
                          {vegetable.name}
                        </span>
                      )
                    )}

                  </div>
                )}

              </div>

            </div>

          </section>

          {/* Order Card */}
          <aside className="h-fit rounded-3xl border border-white/10 bg-white/3 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pizza-red/10 text-pizza-red">
                <ShoppingCart size={19} />
              </div>

              <div>

                <p className="text-xs text-white/30">
                  Order summary
                </p>

                <h2 className="text-lg font-black">
                  Custom Pizza
                </h2>

              </div>

            </div>

            <div className="my-6 h-px bg-white/10" />

            <div className="space-y-4 text-sm">

              <div className="flex justify-between">

                <span className="text-white/40">
                  Pizza
                </span>

                <span className="font-semibold">
                  1 × Custom
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-white/40">
                  Ingredients
                </span>

                <span className="font-semibold">
                  {3 + vegetables.length}
                </span>

              </div>

            </div>

            <div className="my-6 h-px bg-white/10" />

            <div className="flex items-end justify-between">

              <div>

                <p className="text-xs text-white/30">
                  Total
                </p>

                <p className="mt-1 text-3xl font-black">
                  Rs.{" "}
                  {pizzaPrice.toLocaleString()}
                </p>

              </div>

              <span className="text-xs text-white/30">
                PKR
              </span>

            </div>

            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-pizza-red px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-pizza-orange hover:shadow-lg hover:shadow-pizza-red/20"
            >
              Add to Cart

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </button>

            <p className="mt-3 text-center text-xs leading-5 text-white/25">
              Your custom pizza will be added to your cart.
            </p>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default OrderSummary;