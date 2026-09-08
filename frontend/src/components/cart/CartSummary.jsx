import { ArrowRight, ShieldCheck } from "lucide-react";

function CartSummary({ subtotal, delivery, onCheckout }) {
  const total = subtotal + delivery;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 p-6 shadow-2xl shadow-black/20">
      
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pizza-orange">
          Order Summary
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          Your total
        </h2>
      </div>

      {/* Prices */}
      <div className="space-y-4 border-b border-white/10 pb-6">
        <div className="flex justify-between text-sm">
          <span className="text-white/45">
            Subtotal
          </span>

          <span className="font-semibold text-white">
            Rs. {subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-white/45">
            Delivery
          </span>

          <span className="font-semibold text-white">
            Rs. {delivery.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between py-6">
        <span className="text-base font-semibold text-white/60">
          Total
        </span>

        <span className="text-2xl font-black text-pizza-cream">
          Rs. {total.toLocaleString()}
        </span>
      </div>

      {/* Checkout */}
      <button
        onClick={onCheckout}
        className="group flex w-full items-center justify-center gap-3 rounded-xl bg-pizza-red px-5 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-pizza-orange hover:shadow-xl hover:shadow-pizza-red/20"
      >
        Proceed to Checkout

        <ArrowRight
          size={17}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      {/* Secure */}
      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/30">
        <ShieldCheck size={15} />

        Secure checkout
      </div>
    </div>
  );
}

export default CartSummary;