import {
  PackagePlus,
  Trash2,
} from "lucide-react";

function InventoryTable({
  items,
  onUpdate,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-dark-800">

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">

        <table className="w-full text-left">

          <thead className="border-b border-white/10 bg-white/3">

            <tr>

              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/30">
                Ingredient
              </th>

              {/* NEW: Price */}
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/30">
                Price
              </th>

              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/30">
                Stock
              </th>

              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/30">
                Threshold
              </th>

              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/30">
                Status
              </th>

              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/30">
                Action
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-white/5">

            {items.map((item) => {

              const lowStock =
                item.quantity <= item.threshold;

              const outOfStock =
                item.quantity === 0;

              return (
                <tr
                  key={item._id}
                  className="transition hover:bg-white/3"
                >

                  {/* Ingredient */}
                  <td className="px-6 py-5">

                    <p className="text-sm font-bold text-white">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                      {item.category}
                    </p>

                  </td>

                  {/* NEW: Price */}
                  <td className="px-6 py-5">

                    {Number(item.price) > 0 ? (
                      <span className="text-sm font-bold text-pizza-orange">
                        Rs. {Number(item.price).toLocaleString()}
                      </span>
                    ) : (
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-400">
                        Free
                      </span>
                    )}

                  </td>

                  {/* Stock */}
                  <td className="px-6 py-5">

                    <span
                      className={`text-sm font-black ${
                        outOfStock
                          ? "text-red-400"
                          : "text-white"
                      }`}
                    >
                      {item.quantity}
                    </span>

                    <span className="ml-1 text-xs text-white/30">
                      {item.unit}
                    </span>

                  </td>

                  {/* Threshold */}
                  <td className="px-6 py-5 text-sm text-white/50">
                    {item.threshold} {item.unit}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                        outOfStock
                          ? "border-red-400/20 bg-red-400/10 text-red-400"
                          : lowStock
                            ? "border-orange-400/20 bg-orange-400/10 text-orange-400"
                            : "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                      }`}
                    >
                      {outOfStock
                        ? "Out of Stock"
                        : lowStock
                          ? "Low Stock"
                          : "In Stock"}
                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                      {/* Update */}
                      <button
                        onClick={() => onUpdate(item)}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white/60 transition-all duration-300 hover:border-pizza-red/30 hover:bg-pizza-red/10 hover:text-white"
                      >
                        <PackagePlus size={15} />

                        Update
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDelete(item)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/10 bg-red-400/5 text-red-400/60 transition-all duration-300 hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400"
                        title="Delete ingredient"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* Mobile */}
      <div className="divide-y divide-white/5 md:hidden">

        {items.map((item) => {

          const lowStock =
            item.quantity <= item.threshold;

          const outOfStock =
            item.quantity === 0;

          return (
            <div
              key={item._id}
              className="space-y-5 p-5"
            >

              {/* Header */}
              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="font-bold">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    {item.category}
                  </p>

                </div>

                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${
                    outOfStock
                      ? "border-red-400/20 bg-red-400/10 text-red-400"
                      : lowStock
                        ? "border-orange-400/20 bg-orange-400/10 text-orange-400"
                        : "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                  }`}
                >
                  {outOfStock
                    ? "Out of Stock"
                    : lowStock
                      ? "Low Stock"
                      : "In Stock"}
                </span>

              </div>

              {/* NEW: Price */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">

                <p className="text-xs text-white/30">
                  Price
                </p>

                <p className="mt-1 text-lg font-black text-pizza-orange">
                  {Number(item.price) > 0
                    ? `Rs. ${Number(item.price).toLocaleString()}`
                    : "Free"}
                </p>

              </div>

              {/* Stock Info */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs text-white/30">
                      Current Stock
                    </p>

                    <div className="mt-1">

                      <span
                        className={`text-xl font-black ${
                          outOfStock
                            ? "text-red-400"
                            : "text-white"
                        }`}
                      >
                        {item.quantity}
                      </span>

                      <span className="ml-1 text-xs text-white/30">
                        {item.unit}
                      </span>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-xs text-white/30">
                      Threshold
                    </p>

                    <p className="mt-1 text-sm font-bold text-white/60">
                      {item.threshold} {item.unit}
                    </p>

                  </div>

                </div>

              </div>

              {/* Actions */}
              <div className="flex gap-2">

                <button
                  onClick={() => onUpdate(item)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-white/60 transition hover:border-pizza-red/30 hover:bg-pizza-red/10 hover:text-white"
                >
                  <PackagePlus size={15} />

                  Update Stock
                </button>

                <button
                  onClick={() => onDelete(item)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-400/10 bg-red-400/5 text-red-400/60 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400"
                  title="Delete ingredient"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default InventoryTable;