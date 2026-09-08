import { useEffect, useState } from "react";
import { PackageX, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { getInventory } from "../../services/inventoryService";

const baseImages = {
  Classic:
    "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=85",

  "Thin Crust":
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85",

  "Cheese Burst":
    "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=85",

  Italian:
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85",

  Stuffed:
    "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=85",
};

function BaseSelector({ selected, onSelect }) {
  const [bases, setBases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [outOfStockItem, setOutOfStockItem] = useState(null);

  useEffect(() => {
    const loadBases = async () => {
      try {
        const data = await getInventory();

        const baseItems = data
          .filter((item) => item.category === "Base")
          .map((item) => ({
            id: item._id,
            name: item.name,
            description: `Fresh ${item.name.toLowerCase()} pizza base`,
            price: item.price ?? 0,
            quantity: item.quantity,
            unit: item.unit,
            available: item.available !== false,
            image:
              item.image ||
              baseImages[item.name] ||
              "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=85",
          }));

        setBases(baseItems);
      } catch (error) {
        setError("Unable to load pizza bases.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBases();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-white/40">
        Loading pizza bases...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-5 text-sm text-red-400">
        {error}
      </div>
    );
  }

  if (bases.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center">
        <PackageX size={30} className="mx-auto text-white/30" />

        <p className="mt-4 font-semibold">
          No pizza bases available
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
        {bases.map((base, index) => {
          const isSelected = selected?.id === base.id;
          const outOfStock =
            base.quantity <= 0 || base.available === false;

          return (
            <motion.button
              key={base.id}
              type="button"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              whileHover={
                !outOfStock
                  ? {
                      y: -5,
                      scale: 1.01,
                    }
                  : undefined
              }
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => {
                if (outOfStock) {
                  setOutOfStockItem(base);
                  return;
                }

                onSelect(base);
              }}
              className={`group overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                outOfStock
                  ? "cursor-pointer border-white/10 bg-white/2 opacity-65"
                  : isSelected
                    ? "border-pizza-red bg-pizza-red/10 shadow-xl shadow-pizza-red/10"
                    : "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/6"
              }`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={base.image}
                  alt={base.name}
                  className={`h-full w-full object-cover transition-transform duration-500 ${
                    !outOfStock
                      ? "group-hover:scale-105"
                      : "grayscale"
                  }`}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

                {outOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                    <span className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-xs font-bold text-red-400">
                      Out of Stock
                    </span>
                  </div>
                )}

                <AnimatePresence>
                  {!outOfStock && isSelected && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="absolute right-3 top-3 rounded-full bg-pizza-red px-3 py-1 text-xs font-bold text-white"
                    >
                      Selected
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white">
                      {base.name}
                    </h3>

                    <p className="mt-1 text-sm text-white/45">
                      {base.description}
                    </p>
                  </div>

                  <span className="shrink-0 text-sm font-bold text-pizza-orange">
                    {base.price === 0
                      ? "Free"
                      : `Rs. ${base.price}`}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Out of Stock Popup */}
      {outOfStockItem && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-dark-800 p-7 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setOutOfStockItem(null)}
              className="absolute right-4 top-4 rounded-xl p-2 text-white/30 transition hover:bg-white/5 hover:text-white"
            >
              <X size={19} />
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-400/10 text-red-400">
              <PackageX size={27} />
            </div>

            <h2 className="mt-5 text-2xl font-black text-white">
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
              className="mt-6 w-full rounded-xl bg-pizza-red px-5 py-3.5 text-sm font-bold text-white transition hover:bg-pizza-orange"
            >
              Choose Another Base
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BaseSelector;