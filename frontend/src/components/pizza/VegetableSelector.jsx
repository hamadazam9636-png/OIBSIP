import { useEffect, useState } from "react";
import { PackageX, X } from "lucide-react";

import { getInventory } from "../../services/inventoryService";

const vegetableImages = {
  Mushrooms:
    "https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=500&q=85",

  Olives:
    "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=500&q=85",

  Onions:
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=85",

  Capsicum:
    "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=500&q=85",

  Jalapeños:
    "https://images.unsplash.com/photo-1559253664-ca249d4608c6?auto=format&fit=crop&w=500&q=85",

  "Sweet Corn":
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=500&q=85",
};

function VegetableSelector({ selected, onToggle }) {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [outOfStockItem, setOutOfStockItem] = useState(null);

  useEffect(() => {
    const loadVegetables = async () => {
      try {
        const data = await getInventory();

        const vegetableItems = data
          .filter((item) => item.category === "Vegetable")
          .map((item) => ({
            id: item._id,
            name: item.name,
            price: item.price ?? 0,
            quantity: item.quantity,
            unit: item.unit,
            available: item.available !== false,
            image:
              item.image ||
              vegetableImages[item.name] ||
              "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=500&q=85",
          }));

        setVegetables(vegetableItems);
      } catch (error) {
        setError("Unable to load vegetables.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadVegetables();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-white/40 animate-pulse">
        Loading vegetables...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-5 text-sm text-red-400 animate-in fade-in duration-500">
        {error}
      </div>
    );
  }

  if (vegetables.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center animate-in fade-in zoom-in-95 duration-500">
        <PackageX
          size={30}
          className="mx-auto text-white/30"
        />

        <p className="mt-4 font-semibold">
          No vegetables available
        </p>

        <p className="mt-2 text-sm text-white/35">
          Please check back later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {vegetables.map((vegetable) => {
          const isSelected = selected.some(
            (item) => item.id === vegetable.id
          );

          const outOfStock =
            vegetable.quantity <= 0 ||
            vegetable.available === false;

          return (
            <button
              key={vegetable.id}
              type="button"
              onClick={() => {
                if (outOfStock) {
                  setOutOfStockItem(vegetable);
                  return;
                }

                onToggle(vegetable);
              }}
              className={`group overflow-hidden rounded-2xl border text-left transition-all duration-500 ease-out ${
                outOfStock
                  ? "cursor-pointer border-white/10 bg-white/2 opacity-65"
                  : isSelected
                    ? "border-pizza-red bg-pizza-red/10 shadow-xl shadow-pizza-red/10 scale-[1.02]"
                    : "border-white/10 bg-white/3 hover:-translate-y-2 hover:scale-[1.01] hover:border-white/20 hover:bg-white/6 hover:shadow-xl hover:shadow-black/20"
              }`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={vegetable.image}
                  alt={vegetable.name}
                  className={`h-full w-full object-cover transition-all duration-700 ease-out ${
                    !outOfStock
                      ? "group-hover:scale-110 group-hover:rotate-1"
                      : "grayscale"
                  }`}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                {outOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 animate-in fade-in duration-500">
                    <span className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-xs font-bold text-red-400 animate-pulse">
                      Out of Stock
                    </span>
                  </div>
                )}

                {!outOfStock && isSelected && (
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-pizza-red px-3 py-1 text-xs font-bold text-white animate-in fade-in zoom-in-90 duration-300">
                    ✓ Selected
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white transition-transform duration-300 group-hover:translate-x-1">
                      {vegetable.name}
                    </h3>

                    <p className="mt-1 text-sm text-pizza-orange transition-transform duration-300 group-hover:translate-x-1">
                      {vegetable.price === 0
                        ? "Free"
                        : `+Rs. ${vegetable.price}`}
                    </p>
                  </div>

                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-all duration-300 ${
                      isSelected
                        ? "border-pizza-red bg-pizza-red scale-110"
                        : "border-white/20 bg-white/5 group-hover:scale-105"
                    }`}
                  >
                    {isSelected && (
                      <span className="text-xs font-bold text-white animate-in zoom-in duration-200">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Out of Stock Popup */}
      {outOfStockItem && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-dark-800 p-7 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <button
              type="button"
              onClick={() => setOutOfStockItem(null)}
              className="absolute right-4 top-4 rounded-xl p-2 text-white/30 transition-all duration-300 hover:rotate-90 hover:bg-white/5 hover:text-white"
            >
              <X size={19} />
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-400/10 text-red-400 animate-in zoom-in duration-500">
              <PackageX size={27} />
            </div>

            <h2 className="mt-5 text-2xl font-black">
              Out of Stock
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/45">
              Sorry,{" "}
              <span className="font-semibold text-white/70">
                {outOfStockItem.name}
              </span>{" "}
              is currently unavailable.
            </p>

            <button
              type="button"
              onClick={() => setOutOfStockItem(null)}
              className="mt-6 w-full rounded-xl bg-pizza-red px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-pizza-orange hover:shadow-lg hover:shadow-pizza-red/20"
            >
              Choose Another Vegetable
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default VegetableSelector;