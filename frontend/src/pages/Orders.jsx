import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  Package,
  Pizza,
  ShoppingBag,
  X,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import OrderTracker from "../components/orders/OrderTracker";

import {
  getCustomerOrders,
  getOrderById,
} from "../services/orderService";

import { verifyPayment } from "../services/paymentService";

function Orders() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // SELECTED ORDER
  // ======================================================
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailsLoading, setOrderDetailsLoading] =
    useState(false);

  // ======================================================
  // FETCH ORDERS
  // ======================================================
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCustomerOrders();

      const orderList = Array.isArray(data)
        ? data
        : data?.orders || [];

      setOrders(orderList);

      return orderList;
    } catch (err) {
      console.error("Orders fetch error:", err);

      setError("Unable to load your orders.");

      return [];
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // PAYMENT VERIFICATION
  // ======================================================
  useEffect(() => {
    const handlePaymentVerification = async () => {
      const payment = searchParams.get("payment");

      // ==================================================
      // Normal Orders Page
      // ==================================================
      if (payment !== "success") {
        await fetchOrders();
        return;
      }

      const orderId = searchParams.get("orderId");
      const tracker = searchParams.get("tracker");

      console.log("Payment:", payment);
      console.log("Order ID:", orderId);
      console.log("Tracker:", tracker);

      // ==================================================
      // Validate Order ID
      // ==================================================
      if (!orderId) {
        setError(
          "Payment completed, but order ID was not returned."
        );

        await fetchOrders();

        return;
      }

      // ==================================================
      // Validate Tracker
      // ==================================================
      if (!tracker) {
        setError(
          "Payment completed, but Safepay tracker was not returned."
        );

        await fetchOrders();

        return;
      }

      // ==================================================
      // Verify Payment
      // ==================================================
      try {
        setLoading(true);
        setError("");

        console.log("Verifying Safepay payment...");
        const cleanTracker = String(tracker || "")
        .split("?")[0]
        .split("&")[0]
        .trim();

      await verifyPayment(cleanTracker, orderId);
        const response = await verifyPayment(
          tracker,
          orderId
        );

        console.log(
          "Safepay verification response:",
          response
        );

        if (response?.paymentStatus === "Paid") {
          console.log("PAYMENT VERIFIED");
        } else {
          console.warn(
            "Payment is still pending:",
            response
          );
        }

        // ==================================================
        // Remove Payment Params
        // ==================================================
        window.history.replaceState(
          {},
          document.title,
          "/orders"
        );

        // ==================================================
        // Reload Orders
        // ==================================================
        await fetchOrders();
      } catch (err) {
        console.error(
          "Safepay payment verification error:",
          err
        );

        setError(
          err.message ||
            "Payment verification failed."
        );

        await fetchOrders();
      } finally {
        setLoading(false);
      }
    };

    handlePaymentVerification();
  }, [searchParams]);

  // ======================================================
  // ACTIVE ORDER
  // ======================================================
  const activeStatuses = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Out for Delivery",
  ];

  const activeOrder = orders.find((order) =>
    activeStatuses.includes(order.status)
  );

  const previousOrders = orders.filter(
    (order) =>
      order._id !== activeOrder?._id
  );

  // ======================================================
  // FORMAT DATE
  // ======================================================
  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    return new Date(date).toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  // ======================================================
  // ITEMS TEXT
  // ======================================================
  const getItemsText = (order) => {
    if (!order.items?.length) {
      return "No items";
    }

    return order.items
      .map(
        (item) =>
          `${item.name} × ${item.quantity}`
      )
      .join(", ");
  };

  // ======================================================
  // OPEN ORDER DETAILS
  // ======================================================
  const handleViewOrder = async (order) => {
    try {
      setOrderDetailsLoading(true);

      // Open immediately using existing order data
      setSelectedOrder(order);

      // Fetch latest order information from backend
      if (order?._id) {
        const latestOrder =
          await getOrderById(order._id);

        const detailedOrder =
          latestOrder?.order ||
          latestOrder?.data ||
          latestOrder;

        if (detailedOrder) {
          setSelectedOrder(detailedOrder);
        }
      }
    } catch (err) {
      console.error(
        "Failed to fetch order details:",
        err
      );

      // Existing order data will still remain open
    } finally {
      setOrderDetailsLoading(false);
    }
  };

  // ======================================================
  // CLOSE ORDER DETAILS
  // ======================================================
  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  // ======================================================
  // UI
  // ======================================================
  return (
    <main className="min-h-screen bg-dark-950 px-5 pb-20 pt-28 text-white sm:px-8 lg:px-10">

      <div className="mx-auto max-w-6xl">

        {/* ==================================================
            HEADER
        ================================================== */}
        <section className="mb-10">

          <button
            onClick={() => navigate("/")}
            className="group mb-7 flex items-center gap-2 text-sm font-semibold text-white/40 transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Home
          </button>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2 text-pizza-orange">

                <ShoppingBag size={16} />

                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Your Orders
                </span>

              </div>

              <h1 className="text-4xl font-black tracking-tight text-pizza-cream sm:text-5xl">
                Order history.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                Keep track of your recent pizzas and see the status of
                your current orders.
              </p>

            </div>

            <Link
              to="/pizza-builder"
              className="group inline-flex w-fit items-center gap-2 rounded-xl bg-pizza-red px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-pizza-orange hover:shadow-lg hover:shadow-pizza-red/20"
            >

              <Pizza size={17} />

              Build New Pizza

              <ChevronRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </Link>

          </div>

        </section>


        {/* ==================================================
            LOADING
        ================================================== */}
        {loading && (
          <div className="flex min-h-75 items-center justify-center">

            <div className="text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-pizza-red" />

              <p className="mt-4 text-sm text-white/40">
                Loading your orders...
              </p>

            </div>

          </div>
        )}


        {/* ==================================================
            ERROR
        ================================================== */}
        {!loading && error && (
          <div className="mb-6 rounded-3xl border border-red-400/20 bg-red-400/5 p-8 text-center">

            <Package
              size={35}
              className="mx-auto text-red-400"
            />

            <h2 className="mt-4 text-xl font-bold text-white">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-white/40">
              {error}
            </p>

            <button
              onClick={fetchOrders}
              className="mt-5 rounded-xl bg-pizza-red px-5 py-3 text-sm font-bold text-white transition hover:bg-pizza-orange"
            >
              Try Again
            </button>

          </div>
        )}


        {/* ==================================================
            EMPTY
        ================================================== */}
        {!loading &&
          !error &&
          orders.length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-white/3 p-12 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-pizza-orange">

                <ShoppingBag size={28} />

              </div>

              <h2 className="mt-5 text-2xl font-black text-white">
                No orders yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/40">
                You haven't placed any orders yet. Build your perfect
                pizza and place your first order.
              </p>

              <Link
                to="/pizza-builder"
                className="mt-6 inline-flex rounded-xl bg-pizza-red px-5 py-3 text-sm font-bold text-white transition hover:bg-pizza-orange"
              >
                Build Your Pizza
              </Link>

            </div>
          )}


        {/* ==================================================
            CONTENT
        ================================================== */}
        {!loading &&
          !error &&
          orders.length > 0 && (
            <>

              {/* ==================================================
                  ACTIVE ORDER
              ================================================== */}
              {activeOrder && (
                <section className="mb-10">

                  <div className="mb-5">

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-pizza-orange">
                      Live order
                    </p>

                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                      Currently on the way
                    </h2>

                  </div>

                  <div className="rounded-3xl border border-pizza-orange/20 bg-pizza-orange/5 p-5 sm:p-7">

                    {/* Order Header */}
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pizza-red/10 text-pizza-red">

                          <Package size={22} />

                        </div>

                        <div>

                          <p className="text-xs text-white/30">
                            Order number
                          </p>

                          <p className="mt-1 font-bold">
                            #
                            {activeOrder._id
                              ?.slice(-6)
                              .toUpperCase()}
                          </p>

                        </div>

                      </div>

                      <div className="flex w-fit items-center gap-2 rounded-full bg-pizza-orange/10 px-3 py-1.5 text-xs font-semibold text-pizza-orange">

                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pizza-orange" />

                        {activeOrder.status}

                      </div>

                    </div>


                    {/* Order Details */}
                    <div className="my-6 grid gap-4 border-y border-white/10 py-5 sm:grid-cols-3">

                      <div>

                        <p className="text-xs text-white/30">
                          Items
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {getItemsText(
                            activeOrder
                          )}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-white/30">
                          Ordered
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {formatDate(
                            activeOrder.createdAt
                          )}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-white/30">
                          Total
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          Rs.{" "}
                          {activeOrder.total?.toLocaleString()}
                        </p>

                      </div>

                    </div>

                    <OrderTracker
                      status={
                        activeOrder.status
                      }
                    />

                  </div>

                </section>
              )}


              {/* ==================================================
                  ORDER HISTORY
              ================================================== */}
              <section>

                <div className="mb-5">

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                    History
                  </p>

                  <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                    Previous orders
                  </h2>

                </div>


                {previousOrders.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/3 p-8 text-center">

                    <p className="text-sm text-white/40">
                      No previous orders yet.
                    </p>

                  </div>
                ) : (
                  <div className="space-y-4">

                    {previousOrders.map(
                      (order) => (

                        <div
                          key={order._id}
                          className="group rounded-2xl border border-white/10 bg-white/3 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/5 sm:p-6"
                        >

                          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            {/* Left */}
                            <div className="flex items-center gap-4">

                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-pizza-cream transition-all duration-300 group-hover:bg-pizza-red/10 group-hover:text-pizza-red">

                                <Pizza size={20} />

                              </div>

                              <div>

                                <div className="flex flex-wrap items-center gap-2">

                                  <h3 className="font-bold">
                                    #
                                    {order._id
                                      ?.slice(-6)
                                      .toUpperCase()}
                                  </h3>

                                  <span
                                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                      order.status ===
                                      "Delivered"
                                        ? "bg-emerald-400/10 text-emerald-400"
                                        : order.status ===
                                          "Cancelled"
                                        ? "bg-red-400/10 text-red-400"
                                        : "bg-pizza-orange/10 text-pizza-orange"
                                    }`}
                                  >
                                    {order.status}
                                  </span>

                                </div>

                                <p className="mt-1 text-sm text-white/40">
                                  {getItemsText(
                                    order
                                  )}
                                </p>

                                <div className="mt-2 flex items-center gap-1.5 text-xs text-white/25">

                                  <Clock3 size={13} />

                                  {formatDate(
                                    order.createdAt
                                  )}

                                </div>

                              </div>

                            </div>


                            {/* Right */}
                            <div className="flex items-center justify-between gap-5 sm:justify-end">

                              <div className="text-left sm:text-right">

                                <p className="text-xs text-white/30">
                                  Total
                                </p>

                                <p className="mt-1 text-lg font-black text-pizza-cream">
                                  Rs.{" "}
                                  {order.total?.toLocaleString()}
                                </p>

                                <p
                                  className={`mt-1 text-xs font-semibold ${
                                    order.paymentStatus ===
                                    "Paid"
                                      ? "text-emerald-400"
                                      : "text-pizza-orange"
                                  }`}
                                >
                                  {order.paymentStatus ===
                                  "Paid"
                                    ? "Paid"
                                    : "Payment Pending"}
                                </p>

                              </div>


                              {/* WORKING ARROW */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleViewOrder(
                                    order
                                  )
                                }
                                disabled={
                                  orderDetailsLoading
                                }
                                aria-label="View order details"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40 transition-all duration-300 hover:border-pizza-red/40 hover:bg-pizza-red/10 hover:text-white disabled:cursor-wait disabled:opacity-50"
                              >

                                {orderDetailsLoading &&
                                selectedOrder?._id ===
                                  order._id ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-pizza-red" />
                                ) : (
                                  <ChevronRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                                  />
                                )}

                              </button>

                            </div>

                          </div>

                        </div>

                      )
                    )}

                  </div>
                )}

              </section>

            </>
          )}

      </div>


      {/* ======================================================
          ORDER DETAILS MODAL
      ====================================================== */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-md"
          onClick={closeOrderDetails}
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-dark-900 shadow-2xl"
          >

            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-dark-900/95 px-5 py-5 backdrop-blur-xl sm:px-7">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pizza-red/10 text-pizza-red">
                  <Package size={21} />
                </div>

                <div>

                  <p className="text-xs uppercase tracking-widest text-white/30">
                    Order details
                  </p>

                  <h2 className="mt-1 text-lg font-black">
                    #
                    {selectedOrder._id
                      ?.slice(-6)
                      .toUpperCase()}
                  </h2>

                </div>

              </div>

              <button
                type="button"
                onClick={closeOrderDetails}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-white"
              >
                <X size={19} />
              </button>

            </div>


            {/* Modal Content */}
            <div className="space-y-6 p-5 sm:p-7">

              {/* Status */}
              <div className="rounded-2xl border border-pizza-orange/20 bg-pizza-orange/5 p-5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-xs text-white/30">
                      Current status
                    </p>

                    <div className="mt-2 flex items-center gap-2">

                      <span className="h-2 w-2 animate-pulse rounded-full bg-pizza-orange" />

                      <span className="font-bold text-pizza-orange">
                        {selectedOrder.status}
                      </span>

                    </div>

                  </div>

                  <div className="text-left sm:text-right">

                    <p className="text-xs text-white/30">
                      Ordered
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {formatDate(
                        selectedOrder.createdAt
                      )}
                    </p>

                  </div>

                </div>

              </div>


              {/* Pizza Items */}
              <div>

                <div className="mb-4 flex items-center gap-2">

                  <Pizza
                    size={18}
                    className="text-pizza-orange"
                  />

                  <h3 className="font-bold">
                    Your pizza
                  </h3>

                </div>

                <div className="space-y-3">

                  {selectedOrder.items?.length ? (
                    selectedOrder.items.map(
                      (item, index) => (
                        <div
                          key={
                            item._id ||
                            item.id ||
                            index
                          }
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/3 p-4"
                        >

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-red/10 text-pizza-red">
                              <Pizza size={17} />
                            </div>

                            <div>

                              <p className="font-bold">
                                {item.name ||
                                  "Pizza"}
                              </p>

                              <p className="mt-1 text-xs text-white/40">
                                Quantity:{" "}
                                {item.quantity ||
                                  1}
                              </p>

                            </div>

                          </div>

                          <p className="font-bold text-pizza-cream">
                            Rs.{" "}
                            {Number(
                              item.price || 0
                            ).toLocaleString()}
                          </p>

                        </div>
                      )
                    )
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/3 p-5 text-sm text-white/40">
                      No item information available.
                    </div>
                  )}

                </div>

              </div>


              {/* Order Summary */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                <h3 className="mb-4 font-bold">
                  Order summary
                </h3>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between text-white/40">

                    <span>
                      Subtotal
                    </span>

                    <span className="text-white">
                      Rs.{" "}
                      {Number(
                        selectedOrder.subtotal || 0
                      ).toLocaleString()}
                    </span>

                  </div>

                  <div className="flex justify-between text-white/40">

                    <span>
                      Delivery fee
                    </span>

                    <span className="text-white">
                      Rs.{" "}
                      {Number(
                        selectedOrder.deliveryFee || 0
                      ).toLocaleString()}
                    </span>

                  </div>

                  <div className="border-t border-white/10 pt-3">

                    <div className="flex justify-between">

                      <span className="font-bold">
                        Total
                      </span>

                      <span className="text-lg font-black text-pizza-cream">
                        Rs.{" "}
                        {Number(
                          selectedOrder.total || 0
                        ).toLocaleString()}
                      </span>

                    </div>

                  </div>

                </div>

              </div>


              {/* Payment */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/3 p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60">
                    <CreditCard size={18} />
                  </div>

                  <div>

                    <p className="text-sm font-bold">
                      Payment
                    </p>

                    <p className="mt-1 text-xs text-white/40">
                      {selectedOrder.paymentMethod ||
                        "Online Payment"}
                    </p>

                  </div>

                </div>

                <div
                  className={`flex items-center gap-1.5 text-xs font-bold ${
                    selectedOrder.paymentStatus ===
                    "Paid"
                      ? "text-emerald-400"
                      : "text-pizza-orange"
                  }`}
                >

                  {selectedOrder.paymentStatus ===
                  "Paid" ? (
                    <>
                      <CheckCircle2
                        size={15}
                      />
                      Paid
                    </>
                  ) : (
                    "Payment Pending"
                  )}

                </div>

              </div>


              {/* Order Tracker */}
              <div>

                <div className="mb-4">

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                    Delivery progress
                  </p>

                  <h3 className="mt-2 text-lg font-black">
                    Track your order
                  </h3>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/3 p-4 sm:p-6">

                  <OrderTracker
                    status={
                      selectedOrder.status
                    }
                  />

                </div>

              </div>

            </div>


            {/* Modal Footer */}
            <div className="border-t border-white/10 px-5 py-5 sm:px-7">

              <button
                type="button"
                onClick={closeOrderDetails}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/60 transition hover:bg-white/10 hover:text-white"
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