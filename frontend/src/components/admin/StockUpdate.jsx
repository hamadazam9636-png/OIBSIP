import { useState } from "react";
import {
  X,
  PackagePlus,
  Plus,
  Minus,
  DollarSign,
} from "lucide-react";

function StockUpdate({
  item,
  onClose,
  onUpdate,
}) {
  const [mode, setMode] = useState("add");
  const [amount, setAmount] = useState("");

  const [priceType, setPriceType] = useState(
    Number(item.price) > 0 ? "paid" : "free"
  );

  const [price, setPrice] = useState(
    Number(item.price) > 0 ? item.price : ""
  );

  const value = Number(amount) || 0;

  const newQuantity =
    mode === "add"
      ? item.quantity + value
      : Math.max(0, item.quantity - value);

  // --------------------------------
  // Check whether price changed
  // --------------------------------

  const currentPrice = Number(item.price) || 0;

  const finalPrice =
    priceType === "free"
      ? 0
      : Number(price);

  const priceChanged =
    finalPrice !== currentPrice;

  // --------------------------------
  // Validation
  // --------------------------------

  const isInvalidRemove =
    mode === "remove" &&
    value > item.quantity;

  const isInvalidPrice =
    priceType === "paid" &&
    (price === "" || Number(price) < 0);

  /*
    Submit allowed when:
    - stock amount is entered
    OR
    - price has changed

    This means user can update only price
    without adding/removing stock.
  */

  const canSubmit =
    !isInvalidRemove &&
    !isInvalidPrice &&
    (value > 0 || priceChanged);

  // --------------------------------
  // Submit
  // --------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    onUpdate(
      item._id,
      newQuantity,
      finalPrice
    );
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        overflow-y-auto
        bg-black/70
        px-5 py-8
        backdrop-blur-sm
      "
    >
      {/* Center modal without affecting page scroll */}
      <div className="flex min-h-full items-center justify-center">
        <div
          className="
            my-auto
            flex w-full max-w-md
            max-h-[calc(100vh-4rem)]
            flex-col
            overflow-hidden
            rounded-3xl
            border border-white/10
            bg-dark-800
            shadow-2xl
          "
        >
          {/* Header */}
          <div
            className="
              shrink-0
              flex items-start justify-between
              border-b border-white/10
              p-6
            "
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pizza-red/10 text-pizza-red">
                <PackagePlus size={20} />
              </div>

              <h2 className="mt-5 text-2xl font-black">
                Manage Stock
              </h2>

              <p className="mt-2 text-sm text-white/40">
                Manage inventory for {item.name}.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg p-2
                text-white/30
                transition
                hover:bg-white/5
                hover:text-white
              "
            >
              <X size={19} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div
            className="
              min-h-0
              overflow-y-auto
              overscroll-contain
              p-6
              sm:p-7
            "
          >
            {/* Current Stock */}
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                    Current Stock
                  </p>

                  <p className="mt-1 text-2xl font-black">
                    {item.quantity}

                    <span className="ml-1 text-sm font-medium text-white/30">
                      {item.unit}
                    </span>
                  </p>
                </div>

                <div
                  className={`rounded-xl px-3 py-2 text-xs font-bold ${
                    item.quantity === 0
                      ? "bg-red-400/10 text-red-400"
                      : item.quantity <= item.threshold
                        ? "bg-orange-400/10 text-orange-400"
                        : "bg-emerald-400/10 text-emerald-400"
                  }`}
                >
                  {item.quantity === 0
                    ? "Out of Stock"
                    : item.quantity <= item.threshold
                      ? "Low Stock"
                      : "Healthy"}
                </div>
              </div>
            </div>

            {/* Current Price */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                    Current Price
                  </p>

                  <p className="mt-1 text-xl font-black text-pizza-orange">
                    {Number(item.price) > 0
                      ? `Rs. ${Number(
                          item.price
                        ).toLocaleString()}`
                      : "Free"}
                  </p>
                </div>

                <DollarSign
                  size={20}
                  className="text-pizza-orange"
                />
              </div>
            </div>

            {/* Mode */}
            <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/20 p-1.5">
              <button
                type="button"
                onClick={() => {
                  setMode("add");
                  setAmount("");
                }}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                  mode === "add"
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                <Plus size={16} />
                Add Stock
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("remove");
                  setAmount("");
                }}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                  mode === "remove"
                    ? "bg-red-400/10 text-red-400"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                <Minus size={16} />
                Remove Stock
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-5"
            >
              {/* Amount */}
              <label
                htmlFor="stock-amount"
                className="mb-2 block text-sm font-semibold text-white/70"
              >
                {mode === "add"
                  ? "Amount to Add"
                  : "Amount to Remove"}
              </label>

              <div className="relative">
                <input
                  id="stock-amount"
                  type="number"
                  min="1"
                  max={
                    mode === "remove"
                      ? item.quantity
                      : undefined
                  }
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  placeholder={`Enter ${item.unit}`}
                  className="
                    w-full
                    rounded-xl
                    border border-white/10
                    bg-black/20
                    px-4 py-3.5 pr-20
                    text-sm text-white
                    outline-none
                    placeholder:text-white/20
                    transition
                    focus:border-pizza-red/50
                  "
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/30">
                  {item.unit}
                </span>
              </div>

              {/* Invalid Remove */}
              {isInvalidRemove && (
                <p className="mt-2 text-xs font-medium text-red-400">
                  You cannot remove more than the current stock.
                </p>
              )}

              {/* Ingredient Price */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-white/70">
                  Ingredient Price
                </label>

                <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/20 p-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setPriceType("free");
                      setPrice("");
                    }}
                    className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                      priceType === "free"
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    Free
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPriceType("paid");

                      // Keep current price when switching
                      // from Free to Paid.
                      if (currentPrice > 0) {
                        setPrice(currentPrice);
                      }
                    }}
                    className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                      priceType === "paid"
                        ? "bg-pizza-red/10 text-pizza-red"
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    Paid
                  </button>
                </div>

                {priceType === "paid" && (
                  <div className="relative mt-3">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white/30">
                      Rs.
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value)
                      }
                      placeholder="Enter price"
                      className="
                        w-full
                        rounded-xl
                        border border-white/10
                        bg-black/20
                        px-4 py-3.5 pl-12
                        text-sm text-white
                        outline-none
                        placeholder:text-white/20
                        transition
                        focus:border-pizza-red/50
                      "
                    />
                  </div>
                )}

                {isInvalidPrice && (
                  <p className="mt-2 text-xs font-medium text-red-400">
                    Please enter a valid price.
                  </p>
                )}
              </div>

              {/* Preview */}
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/40">
                    New Stock
                  </span>

                  <span
                    className={`text-lg font-black ${
                      newQuantity === 0
                        ? "text-red-400"
                        : newQuantity <= item.threshold
                          ? "text-orange-400"
                          : "text-emerald-400"
                    }`}
                  >
                    {newQuantity} {item.unit}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="text-sm text-white/40">
                    New Price
                  </span>

                  <span className="text-lg font-black text-pizza-orange">
                    {priceType === "free"
                      ? "Free"
                      : `Rs. ${Number(
                          price || 0
                        ).toLocaleString()}`}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 disabled:pointer-events-none disabled:opacity-30 ${
                  mode === "add"
                    ? "bg-emerald-500 hover:bg-emerald-400"
                    : "bg-red-500 hover:bg-red-400"
                }`}
              >
                {value > 0 ? (
                  mode === "add" ? (
                    <Plus size={17} />
                  ) : (
                    <Minus size={17} />
                  )
                ) : (
                  <DollarSign size={17} />
                )}

                {value > 0
                  ? mode === "add"
                    ? "Add Stock"
                    : "Remove Stock"
                  : "Update Price"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockUpdate;