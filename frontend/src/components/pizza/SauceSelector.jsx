import { useEffect, useState } from "react";
import { PackageX, X } from "lucide-react";

import { getInventory } from "../../services/inventoryService";

const sauceImages = {
  "Classic Tomato":
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85",

  "Spicy Marinara":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85",

  BBQ:
    "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=700&q=85",

  "Garlic Cream":
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=85",

  "Peri Peri":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85",
};

function SauceSelector({ selected, onSelect }) {
  const [sauces, setSauces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [outOfStockItem, setOutOfStockItem] = useState(null);

  useEffect(() => {
    const loadSauces = async () => {
      try {
        const data = await getInventory();

        const sauceItems = data
          .filter((item) => item.category === "Sauce")
          .map((item) => ({
            id: item._id,
            name: item.name,
            description: `Fresh ${item.name.toLowerCase()}`,
            price: item.price ?? 0,
            quantity: item.quantity,
            unit: item.unit,
            available: item.available !== false,
            image:
              item.image ||
              sauceImages[item.name] ||
              "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85",
          }));

        setSauces(sauceItems);
      } catch (error) {
        setError("Unable to load sauces.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadSauces();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-white/40 animate-pulse">
        Loading sauces...
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

  if (sauces.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center animate-in fade-in zoom-in-95 duration-500">
        <PackageX
          size={30}
          className="mx-auto text-white/30"
        />

        <p className="mt-4 font-semibold">
          No sauces available
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
        {sauces.map((sauce) => {
          const isSelected = selected?.id === sauce.id;

          const outOfStock =
            sauce.quantity <= 0 ||
            sauce.available === false;

          return (
            <button
              key={sauce.id}
              type="button"
              onClick={() => {
                if (outOfStock) {
                  setOutOfStockItem(sauce);
                  return;
                }

                onSelect(sauce);
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
                  src={sauce.image}
                  alt={sauce.name}
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
                  <div className="absolute right-3 top-3 rounded-full bg-pizza-red px-3 py-1 text-xs font-bold text-white animate-in fade-in zoom-in-90 duration-300">
                    Selected
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white transition-transform duration-300 group-hover:translate-x-1">
                      {sauce.name}
                    </h3>

                    <p className="mt-1 text-sm text-white/45 transition-colors duration-300 group-hover:text-white/60">
                      {sauce.description}
                    </p>
                  </div>

                  <span className="shrink-0 text-sm font-bold text-pizza-orange transition-transform duration-300 group-hover:scale-105">
                    {sauce.price === 0
                      ? "Free"
                      : `Rs. ${sauce.price}`}
                  </span>
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
              Choose Another Sauce
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SauceSelector;