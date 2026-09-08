import {
  ShoppingBag,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import useCart from "../context/useCart";
import { useNavigate } from "react-router-dom";
import { createPayment } from "../services/paymentService";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) =>
      total + (item.price || 0) * (item.quantity || 1),
    0
  );

  // Delivery
  const delivery = cart.length > 0 ? 150 : 0;

  // Increase quantity
  const handleIncrease = (id) => {
    increaseQuantity(id);
  };

  // Decrease quantity
  const handleDecrease = (id) => {
    decreaseQuantity(id);
  };

  // Remove item
  const handleRemove = (id) => {
    removeFromCart(id);
  };

  // Checkout
 const handleCheckout = async () => {
  try {
    if (cart.length === 0) {
      return;
    }

    const payment = await createPayment({
      items: cart,
      subtotal,
      deliveryFee: delivery,
      total: subtotal + delivery,
    });

    if (!payment.checkoutUrl) {
      throw new Error(
        "Payment checkout URL was not created"
      );
    }

    window.location.href = payment.checkoutUrl;
  } catch (error) {
    console.error("Checkout error:", error);

    alert(
      error.message ||
        "Unable to start payment. Please try again."
    );
  }
};

  return (
    <main className="min-h-screen bg-dark-950 px-5 pb-20 pt-28 text-white sm:px-8 lg:px-10">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">

          <button
            onClick={() => navigate("/")}
            className="group mb-6 flex items-center gap-2 text-sm font-semibold text-white/40 transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Continue Shopping
          </button>

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pizza-red/10 text-pizza-red">
              <ShoppingBag size={23} />
            </div>

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pizza-orange">
                Your Cart
              </p>

              <h1 className="mt-1 text-3xl font-black text-pizza-cream sm:text-4xl">
                Ready to order?
              </h1>

            </div>

          </div>

        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (

          <div className="rounded-3xl border border-white/10 bg-white/3 px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-white/30">
              <ShoppingCart size={28} />
            </div>

            <h2 className="mt-6 text-2xl font-black">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/40">
              Looks like you haven't added a pizza yet.
              Create your perfect pizza and add it to your cart.
            </p>

            <button
              onClick={() => navigate("/pizza-builder")}
              className="mt-7 rounded-xl bg-pizza-red px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-pizza-orange"
            >
              Build Your Pizza
            </button>

          </div>

        ) : (

          /* Cart */
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

            {/* Items */}
            <div className="space-y-4">

              {cart.map((item) => (

                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={handleRemove}
                />

              ))}

            </div>

            {/* Summary */}
            <div>

              <CartSummary
                subtotal={subtotal}
                delivery={delivery}
                onCheckout={handleCheckout}
              />

            </div>

          </div>

        )}

      </div>

    </main>
  );
}

export default Cart;