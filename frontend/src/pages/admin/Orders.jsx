import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ClipboardList,
  Clock3,
  CheckCircle2,
  Truck,
  X,
  Package,
  User,
  Mail,
  CalendarDays,
  CreditCard,
  Receipt,
  CircleDollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

import OrderTable from "../../components/admin/OrderTable";
import {
  getOrders,
  updateOrderStatus,
} from "../../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Selected order for details popup
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrders();

        setOrders(data);
      } catch (error) {
        setError(error.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (id, status) => {
    try {
      const data = await updateOrderStatus(id, status);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === id ? data.order : order
        )
      );

      // Also update currently opened popup
      setSelectedOrder((currentOrder) =>
        currentOrder?._id === id
          ? data.order
          : currentOrder
      );
    } catch (error) {
      alert(error.message || "Failed to update order status");
    }
  };

  // Open order details
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  // Close order details
  const handleCloseOrder = () => {
    setSelectedOrder(null);
  };

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: ClipboardList,
    },
    {
      label: "Pending",
      value: orders.filter(
        (order) => order.status === "Pending"
      ).length,
      icon: Clock3,
    },
    {
      label: "Preparing",
      value: orders.filter(
        (order) => order.status === "Preparing"
      ).length,
      icon: ClipboardList,
    },
    {
      label: "Delivered",
      value: orders.filter(
        (order) => order.status === "Delivered"
      ).length,
      icon: CheckCircle2,
    },
  ];

  // Payment status helper
  const getPaymentStatus = (order) => {
    return order?.paymentStatus || "Pending";
  };

  // Payment status styling
  const getPaymentStatusStyle = (status) => {
    if (status === "Paid") {
      return "bg-emerald-400/10 text-emerald-400 border-emerald-400/20";
    }

    if (status === "Failed") {
      return "bg-red-400/10 text-red-400 border-red-400/20";
    }

    return "bg-pizza-orange/10 text-pizza-orange border-pizza-orange/20";
  };

  return (
    <main className="min-h-screen bg-dark-950 px-5 pb-20 pt-28 text-white sm:px-8 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">

          <Link
            to="/admin/dashboard"
            className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/40 transition hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Dashboard
          </Link>

          <div className="flex items-end justify-between gap-5">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pizza-orange">
                Administration
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight text-pizza-cream sm:text-5xl">
                Orders
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                Manage customer orders and update their delivery status.
              </p>
            </div>

            <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-pizza-red/10 text-pizza-red sm:flex">
              <Truck size={25} />
            </div>

          </div>

        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-dark-800 p-5"
              >

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-3xl font-black">
                      {stat.value}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-pizza-orange">
                    <Icon size={20} />
                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-white/10 bg-dark-800 p-8 text-center text-sm text-white/40">
            Loading orders...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && orders.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-dark-800 p-8 text-center text-sm text-white/40">
            No orders found.
          </div>
        )}

        {/* Real Orders */}
        {!loading && !error && orders.length > 0 && (
          <OrderTable
            orders={orders.map((order) => ({
              id: order._id,
              customer: order.customerName,
              email: order.customerEmail,

              items: order.items
                ?.map(
                  (item) =>
                    `${item.name} × ${item.quantity}`
                )
                .join(", "),

              total: order.total,

              date: new Date(
                order.createdAt
              ).toLocaleString(),

              status: order.status,

              // Keep complete original order
              // for the details popup.
              originalOrder: order,
            }))}
            onStatusChange={handleStatusChange}
            onViewOrder={handleViewOrder}
          />
        )}

      </div>

      {/* =====================================================
          ORDER DETAILS MODAL
      ===================================================== */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={handleCloseOrder}
        >

          <div
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-dark-900 shadow-2xl shadow-black/50"
          >

            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-dark-900/95 px-5 py-5 backdrop-blur-xl sm:px-7">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pizza-red/10 text-pizza-red">
                  <Receipt size={22} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-pizza-orange">
                    Order Details
                  </p>

                  <h2 className="mt-1 text-lg font-black text-white sm:text-xl">
                    #
                    {selectedOrder._id}
                  </h2>
                </div>

              </div>

              <button
                onClick={handleCloseOrder}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                title="Close"
              >
                <X size={19} />
              </button>

            </div>

            {/* Modal Body */}
            <div className="space-y-6 p-5 sm:p-7">

              {/* Status + Payment */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-white/10 bg-white/3 p-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-orange/10 text-pizza-orange">
                      <Package size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-white/30">
                        Order Status
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {selectedOrder.status || "Pending"}
                      </p>
                    </div>

                  </div>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/3 p-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                      <CreditCard size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-white/30">
                        Payment Status
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${getPaymentStatusStyle(
                          getPaymentStatus(selectedOrder)
                        )}`}
                      >
                        {getPaymentStatus(selectedOrder)}
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              {/* Customer Information */}
              <section>

                <div className="mb-3 flex items-center gap-2">
                  <User
                    size={17}
                    className="text-pizza-orange"
                  />

                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">
                    Customer Information
                  </h3>
                </div>

                <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/3 p-5 sm:grid-cols-2">

                  <div>
                    <p className="text-xs text-white/30">
                      Customer Name
                    </p>

                    <p className="mt-1 font-bold">
                      {selectedOrder.customerName ||
                        "Customer"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-white/30">
                      Email Address
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                      <Mail
                        size={14}
                        className="text-white/30"
                      />

                      <p className="break-all text-sm font-semibold">
                        {selectedOrder.customerEmail ||
                          "Not available"}
                      </p>

                    </div>
                  </div>

                </div>

              </section>

              {/* Order Information */}
              <section>

                <div className="mb-3 flex items-center gap-2">

                  <ClipboardList
                    size={17}
                    className="text-pizza-orange"
                  />

                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">
                    Order Information
                  </h3>

                </div>

                <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/3 p-5 sm:grid-cols-2">

                  <div>
                    <p className="text-xs text-white/30">
                      Order Date
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                      <CalendarDays
                        size={14}
                        className="text-white/30"
                      />

                      <p className="text-sm font-semibold">
                        {selectedOrder.createdAt
                          ? new Date(
                              selectedOrder.createdAt
                            ).toLocaleString()
                          : "Unknown date"}
                      </p>

                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-white/30">
                      Payment Method
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {selectedOrder.paymentMethod ||
                        "Not specified"}
                    </p>
                  </div>

                </div>

              </section>

              {/* Items */}
              <section>

                <div className="mb-3 flex items-center gap-2">

                  <Package
                    size={17}
                    className="text-pizza-orange"
                  />

                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">
                    Ordered Items
                  </h3>

                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10">

                  {selectedOrder.items?.length > 0 ? (
                    <div className="divide-y divide-white/10">

                      {selectedOrder.items.map(
                        (item, index) => (
                          <div
                            key={`${item.name}-${index}`}
                            className="flex items-center justify-between gap-4 bg-white/3 p-4 transition hover:bg-white/5"
                          >

                            <div className="flex min-w-0 items-center gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pizza-red/10 text-lg">
                                🍕
                              </div>

                              <div className="min-w-0">

                                <p className="truncate text-sm font-bold">
                                  {item.name ||
                                    "Pizza"}
                                </p>

                                <p className="mt-1 text-xs text-white/30">
                                  Quantity:{" "}
                                  {item.quantity ||
                                    1}
                                </p>

                              </div>

                            </div>

                            <p className="shrink-0 text-sm font-bold text-pizza-cream">
                              Rs.{" "}
                              {Number(
                                item.price || 0
                              ).toLocaleString()}
                            </p>

                          </div>
                        )
                      )}

                    </div>
                  ) : (
                    <div className="p-5 text-center text-sm text-white/40">
                      No item information available.
                    </div>
                  )}

                </div>

              </section>

              {/* Price Summary */}
              <section>

                <div className="mb-3 flex items-center gap-2">

                  <CircleDollarSign
                    size={17}
                    className="text-pizza-orange"
                  />

                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">
                    Payment Summary
                  </h3>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/3 p-5">

                  <div className="space-y-3">

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/40">
                        Subtotal
                      </span>

                      <span className="font-semibold">
                        Rs.{" "}
                        {Number(
                          selectedOrder.subtotal || 0
                        ).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/40">
                        Delivery Fee
                      </span>

                      <span className="font-semibold">
                        Rs.{" "}
                        {Number(
                          selectedOrder.deliveryFee || 0
                        ).toLocaleString()}
                      </span>
                    </div>

                    <div className="border-t border-white/10 pt-4">

                      <div className="flex items-center justify-between">

                        <span className="font-bold">
                          Total
                        </span>

                        <span className="text-xl font-black text-pizza-cream">
                          Rs.{" "}
                          {Number(
                            selectedOrder.total || 0
                          ).toLocaleString()}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </section>

            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/10 bg-white/2.5 px-5 py-4 sm:px-7">

              <button
                onClick={handleCloseOrder}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/60 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                Close Order Details
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

export default Orders;