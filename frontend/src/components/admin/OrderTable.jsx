import { Eye } from "lucide-react";
import OrderStatus from "./OrderStatus";

function OrderTable({
  orders,
  onStatusChange,
  onViewOrder,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-dark-800">

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">

        <table className="w-full text-left">

          <thead className="border-b border-white/10 bg-white/3">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/30">
                Order
              </th>

              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/30">
                Customer
              </th>

              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/30">
                Items
              </th>

              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/30">
                Total
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

            {orders.map((order) => (

              <tr
                key={order.id}
                className="transition-colors duration-300 hover:bg-white/3"
              >

                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-white">
                    #{order.id}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    {order.date}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <p className="text-sm font-semibold text-white">
                    {order.customer}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    {order.email}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <p className="text-sm text-white/70">
                    {order.items}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <p className="text-sm font-black text-pizza-cream">
                    Rs. {order.total.toLocaleString()}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <OrderStatus
                    status={order.status}
                    onChange={(status) =>
                      onStatusChange(
                        order.id,
                        status
                      )
                    }
                  />
                </td>

                <td className="px-6 py-5">

                  <button
                    onClick={() =>
                      onViewOrder(
                        order.originalOrder
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/40 transition-all duration-300 hover:border-pizza-red/30 hover:bg-pizza-red/10 hover:text-white"
                    title="View order"
                  >
                    <Eye size={16} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-white/5 md:hidden">

        {orders.map((order) => (

          <div
            key={order.id}
            className="space-y-4 p-5"
          >

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-bold">
                  #{order.id}
                </p>

                <p className="mt-1 text-xs text-white/30">
                  {order.date}
                </p>
              </div>

              <OrderStatus
                status={order.status}
                onChange={(status) =>
                  onStatusChange(
                    order.id,
                    status
                  )
                }
              />

            </div>

            <div>
              <p className="text-sm font-semibold">
                {order.customer}
              </p>

              <p className="mt-1 text-xs text-white/30">
                {order.email}
              </p>
            </div>

            <div className="flex items-center justify-between">

              <span className="text-sm text-white/50">
                {order.items}
              </span>

              <span className="text-sm font-black text-pizza-cream">
                Rs. {order.total.toLocaleString()}
              </span>

            </div>

            {/* Mobile View Button */}
            <button
              onClick={() =>
                onViewOrder(
                  order.originalOrder
                )
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-white/50 transition-all duration-300 hover:border-pizza-red/30 hover:bg-pizza-red/10 hover:text-white"
            >
              <Eye size={15} />

              View Order Details
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default OrderTable;