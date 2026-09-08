import { Minus, Plus, Trash2 } from "lucide-react";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const price = item.price || 0;
  const quantity = item.quantity || 1;

  return (
    <div className="group flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/3 p-4 transition-all duration-300 hover:border-white/20 sm:flex-row sm:items-center">


      {/* Pizza Image */}
      <div className="h-28 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
        <img
          src={
            item.image ||
            "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=85"
          }
          alt={item.name || "Custom Pizza"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Pizza Information */}
      <div className="min-w-0 flex-1">

        <div className="flex items-start justify-between gap-4">

          <div>
            <h3 className="text-lg font-bold text-white">
              {item.name || "Custom Pizza"}
            </h3>

            <p className="mt-1 text-sm text-white/45">
              {item.base?.name || item.base || "Base"} •{" "}
              {item.sauce?.name || item.sauce || "Sauce"} •{" "}
              {item.cheese?.name || item.cheese || "Cheese"}
            </p>

            {item.vegetables?.length > 0 && (
              <p className="mt-2 text-xs text-white/30">
                {item.vegetables
                  .map((vegetable) =>
                    typeof vegetable === "object"
                      ? vegetable.name
                      : vegetable
                  )
                  .join(", ")}
              </p>
            )}
          </div>

          {/* Remove */}
          <button
            onClick={() => onRemove(item.id)}
            className="rounded-lg p-2 text-white/30 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>

        </div>

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between gap-4">

          {/* Quantity */}
          <div className="flex items-center rounded-xl border border-white/10 bg-black/20">

            <button
              onClick={() => onDecrease(item.id)}
              className="flex h-9 w-9 items-center justify-center text-white/50 transition hover:text-white"
            >
              <Minus size={15} />
            </button>

            <span className="w-8 text-center text-sm font-bold text-white">
              {quantity}
            </span>

            <button
              onClick={() => onIncrease(item.id)}
              className="flex h-9 w-9 items-center justify-center text-white/50 transition hover:text-white"
            >
              <Plus size={15} />
            </button>

          </div>

          {/* Price */}
          <p className="text-lg font-black text-pizza-cream">
            Rs. {price.toLocaleString()}
          </p>

        </div>

      </div>
    </div>
  );
}

export default CartItem;