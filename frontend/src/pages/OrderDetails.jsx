import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock3,
  CreditCard,
  Package,
  Pizza,
  User,
} from "lucide-react";

import { getOrderById } from "../services/orderService";
import OrderTracker from "../components/orders/OrderTracker";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrderById(id);

        setOrder(data);
      } catch (err) {
        console.error("Order details error:", err);
        setError("Unable to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-dark-950 px-5 pb-20 pt-32 text-white">
        <div className="flex min-h-75 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-pizza-red" />

            <p className="mt-4 text-sm text-white/40">
              Loading order details...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-dark-950 px-5 pb-20 pt-32 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-400/10 text-red-400">
            <Package size={28} />
          </div>

          <h1 className="mt-6 text-3xl font-black">
            Order not found
          </h1>

          <p className="mt-3 text-sm text-white/40">
            {error || "This order could not be found."}
          </p>

          <Link
            to="/orders"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-pizza-red px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-pizza-orange"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-950 px-5 pb-20 pt-28 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <section className="mb-8">
          <Link
            to="/orders"
            className="group mb-7 inline-flex items-center gap-2 text-sm font-semibold text-white/40 transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Orders
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pizza-orange">
                Order Details
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight text-pizza-cream sm:text-5xl">
                #{order._id.slice(-6).toUpperCase()}
              </h1>

              <p className="mt-3 flex items-center gap-2 text-sm text-white/40">
                <Clock3 size={14} />
                {formatDate(order.createdAt)}
              </p>
            </div>

            <div
              className={`w-fit rounded-full px-4 py-2 text-xs font-bold ${
                order.status === "Delivered"
                  ? "bg-emerald-400/10 text-emerald-400"
                  : order.status === "Cancelled"
                  ? "bg-red-400/10 text-red-400"
                  : "bg-pizza-orange/10 text-pizza-orange"
              }`}
            >
              {order.status}
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Left */}
          <div className="space-y-6">

            {/* Tracker */}
            <section className="rounded-3xl border border-white/10 bg-white/3 p-5 sm:p-7">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                  Delivery status
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Track your order
                </h2>
              </div>

              <OrderTracker status={order.status} />
            </section>

            {/* Items */}
            <section className="rounded-3xl border border-white/10 bg-white/3 p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pizza-red/10 text-pizza-red">
                  <Pizza size={20} />
                </div>

                <div>
                  <p className="text-xs text-white/30">
                    Your order
                  </p>

                  <h2 className="text-xl font-black">
                    Order Items
                  </h2>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex min-w-0 items-center gap-4">

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 shrink-0 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/5 text-pizza-orange">
                          <Pizza size={22} />
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="truncate font-bold">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-white/40">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="shrink-0 font-bold">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Customer */}
            <section className="rounded-3xl border border-white/10 bg-white/3 p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pizza-orange/10 text-pizza-orange">
                  <User size={20} />
                </div>

                <div>
                  <p className="text-xs text-white/30">
                    Customer
                  </p>

                  <h2 className="text-xl font-black">
                    Customer Information
                  </h2>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs text-white/30">
                    Name
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {order.customerName}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs text-white/30">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm font-bold">
                    {order.customerEmail}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right */}
          <aside className="h-fit space-y-6">

            {/* Summary */}
            <section className="rounded-3xl border border-white/10 bg-white/3 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pizza-red/10 text-pizza-red">
                  <Package size={19} />
                </div>

                <div>
                  <p className="text-xs text-white/30">
                    Payment summary
                  </p>

                  <h2 className="text-lg font-black">
                    Order Total
                  </h2>
                </div>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <div className="space-y-4 text-sm">

                <div className="flex justify-between">
                  <span className="text-white/40">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    Rs. {order.subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40">
                    Delivery fee
                  </span>

                  <span className="font-semibold">
                    Rs. {order.deliveryFee.toLocaleString()}
                  </span>
                </div>

                <div className="my-4 h-px bg-white/10" />

                <div className="flex justify-between">
                  <span className="font-bold">
                    Total
                  </span>

                  <span className="text-xl font-black text-pizza-cream">
                    Rs. {order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-3xl border border-white/10 bg-white/3 p-6">
              <div className="flex items-center gap-3">
                <CreditCard
                  size={19}
                  className="text-pizza-orange"
                />

                <h2 className="font-black">
                  Payment
                </h2>
              </div>

              <div className="mt-5 space-y-4">

                <div className="flex justify-between text-sm">
                  <span className="text-white/40">
                    Method
                  </span>

                  <span className="font-semibold">
                    {order.paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/40">
                    Status
                  </span>

                  <span
                    className={`font-semibold ${
                      order.paymentStatus === "Paid"
                        ? "text-emerald-400"
                        : order.paymentStatus === "Failed"
                        ? "text-red-400"
                        : "text-pizza-orange"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>

              </div>
            </section>

          </aside>
        </div>
      </div>
    </main>
  );
}

export default OrderDetails;