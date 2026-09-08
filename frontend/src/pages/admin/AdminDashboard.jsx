import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Pizza,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  MoreHorizontal,
} from "lucide-react";

import { getAdminOrders } from "../../services/orderService";

const statusOptions = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

/* ================= HELPERS ================= */

const getOrderId = (order) => {
  return order?._id || order?.id || order?.orderId;
};

const getCustomerName = (order) => {
  return (
    order?.customerName ||
    order?.customer?.name ||
    order?.user?.name ||
    order?.name ||
    order?.customerEmail ||
    order?.customer?.email ||
    order?.user?.email ||
    "Customer"
  );
};

const getCustomerKey = (order) => {
  return (
    order?.customerEmail ||
    order?.customer?.email ||
    order?.user?.email ||
    order?.customerId ||
    order?.userId ||
    getCustomerName(order)
  );
};

const getOrderItems = (order) => {
  const items = order?.items || order?.orderItems || [];

  if (!Array.isArray(items)) {
    return String(items || "0 Items");
  }

  return `${items.length} ${
    items.length === 1 ? "Item" : "Items"
  }`;
};

const getOrderTotal = (order) => {
  return Number(
    order?.total ??
      order?.totalAmount ??
      order?.amount ??
      order?.grandTotal ??
      0
  );
};

const getOrderStatus = (order) => {
  return order?.status || "Pending";
};

const getOrderDate = (order) => {
  return (
    order?.createdAt ||
    order?.created_at ||
    order?.date ||
    order?.orderDate
  );
};

const getStatusStyle = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-emerald-400/10 text-emerald-400 border-emerald-400/20";

    case "Preparing":
      return "bg-pizza-orange/10 text-pizza-orange border-pizza-orange/20";

    case "Confirmed":
      return "bg-blue-400/10 text-blue-400 border-blue-400/20";

    case "Out for Delivery":
      return "bg-purple-400/10 text-purple-400 border-purple-400/20";

    case "Cancelled":
      return "bg-red-400/10 text-red-400 border-red-400/20";

    default:
      return "bg-yellow-400/10 text-yellow-400 border-yellow-400/20";
  }
};

const formatOrderId = (order) => {
  const id = getOrderId(order);

  if (!id) {
    return "Order";
  }

  const idString = String(id);

  if (idString.startsWith("#")) {
    return idString;
  }

  return `#${idString.slice(-8).toUpperCase()}`;
};

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [orders, setOrders] = useState(
    /** @type {any[]} */ ([])
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* ================= FETCH REAL ORDERS ================= */

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminOrders();

        const ordersData = Array.isArray(data)
          ? data
          : data?.orders || data?.data || [];

        setOrders(ordersData);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ================= DASHBOARD STATS ================= */

  const totalOrders = orders.length;

  const totalRevenue = useMemo(() => {
    return orders.reduce((total, order) => {
      return total + getOrderTotal(order);
    }, 0);
  }, [orders]);

  const totalCustomers = useMemo(() => {
    const customers = new Set();

    orders.forEach((order) => {
      customers.add(getCustomerKey(order));
    });

    return customers.size;
  }, [orders]);

  const pendingOrders = useMemo(() => {
    return orders.filter(
      (order) => getOrderStatus(order) === "Pending"
    ).length;
  }, [orders]);

  /* ================= RECENT ORDERS ================= */

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => {
        const dateA = new Date(getOrderDate(a) || 0).getTime();
        const dateB = new Date(getOrderDate(b) || 0).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [orders]);

  /* ================= STATUS COUNTS ================= */

  const statusCounts = useMemo(() => {
    const counts = {
      Delivered: 0,
      Preparing: 0,
      Pending: 0,
    };

    orders.forEach((order) => {
      const status = getOrderStatus(order);

      if (status === "Delivered") {
        counts.Delivered += 1;
      }

      if (status === "Preparing") {
        counts.Preparing += 1;
      }

      if (status === "Pending") {
        counts.Pending += 1;
      }
    });

    return counts;
  }, [orders]);

  const getStatusPercentage = (count) => {
    if (!totalOrders) {
      return 0;
    }

    return Math.round((count / totalOrders) * 100);
  };

  /* ================= REVENUE CHART ================= */

  const revenueChart = useMemo(() => {
    const days = [];

    for (let index = 7; index >= 0; index -= 1) {
      const date = new Date();

      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - index);

      days.push({
        date,
        revenue: 0,
      });
    }

    orders.forEach((order) => {
      const orderDateValue = getOrderDate(order);

      if (!orderDateValue) {
        return;
      }

      const orderDate = new Date(orderDateValue);

      if (Number.isNaN(orderDate.getTime())) {
        return;
      }

      orderDate.setHours(0, 0, 0, 0);

      const matchingDay = days.find(
        (day) => day.date.getTime() === orderDate.getTime()
      );

      if (matchingDay) {
        matchingDay.revenue += getOrderTotal(order);
      }
    });

    return days;
  }, [orders]);

  const maxRevenue = Math.max(
    ...revenueChart.map((day) => day.revenue),
    1
  );

  /* ================= TODAY PERFORMANCE ================= */

  const todayRevenue = useMemo(() => {
    const today = new Date();

    return orders.reduce((total, order) => {
      const orderDateValue = getOrderDate(order);

      if (!orderDateValue) {
        return total;
      }

      const orderDate = new Date(orderDateValue);

      if (Number.isNaN(orderDate.getTime())) {
        return total;
      }

      const sameDay =
        orderDate.getFullYear() === today.getFullYear() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getDate() === today.getDate();

      return sameDay ? total + getOrderTotal(order) : total;
    }, 0);
  }, [orders]);

  /* ================= STATUS UPDATE ================= */

  const updateStatus = async (orderId, newStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        getOrderId(order) === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
  // Clear only admin session
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");

  // Make sure old admin session keys are also removed
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");

  navigate("/admin/login", { replace: true });
};

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <main className="min-h-screen bg-dark-950 text-white">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-dark-900 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link
            to="/admin/dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-red text-xl shadow-lg shadow-pizza-red/20">
              🍕
            </div>

            <div>
              <p className="font-black tracking-tight text-pizza-cream">
                PIZZARO
              </p>

              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                Admin Panel
              </p>
            </div>
          </Link>

          <button
            onClick={closeSidebar}
            className="text-white/40 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <SidebarLink
            to="/admin/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Overview"
            onClick={closeSidebar}
            active
          />

          <SidebarLink
            to="/admin/orders"
            icon={<ShoppingBag size={18} />}
            label="Orders"
            onClick={closeSidebar}
          />

          <SidebarLink
            to="/admin/inventory"
            icon={<Pizza size={18} />}
            label="Inventory"
            onClick={closeSidebar}
          />

          <SidebarLink
            to="/admin/pizzas"
            icon={<Pizza size={18} />}
            label="Pizzas"
            onClick={closeSidebar}
          />

          <SidebarLink
            to="/admin/customers"
            icon={<Users size={18} />}
            label="Customers"
            onClick={closeSidebar}
          />

          <SidebarLink
            to="/admin/settings"
            icon={<Settings size={18} />}
            label="Settings"
            onClick={closeSidebar}
          />
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/40 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-dark-950/80 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-pizza-orange">
                Administration
              </p>

              <h1 className="mt-1 text-xl font-black">
                Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">
                Admin
              </p>

              <p className="text-xs text-white/30">
                Administrator
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pizza-red font-bold">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-5 sm:p-8">
          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Good evening, Admin 👋
            </h2>

            <p className="mt-2 text-sm text-white/40">
              Here's what's happening with your pizza business today.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/2.5 p-5 text-sm text-white/50">
              Loading dashboard data...
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Orders"
              value={totalOrders.toLocaleString()}
              change={totalOrders ? "Live data" : "No orders"}
              icon={<ShoppingBag size={20} />}
            />

            <StatCard
              title="Total Revenue"
              value={`Rs. ${totalRevenue.toLocaleString()}`}
              change={totalRevenue ? "Live data" : "No revenue"}
              icon={<DollarSign size={20} />}
            />

            <StatCard
              title="Customers"
              value={totalCustomers.toLocaleString()}
              change={totalCustomers ? "Unique customers" : "No customers"}
              icon={<Users size={20} />}
            />

            <StatCard
              title="Pending Orders"
              value={pendingOrders.toLocaleString()}
              change={
                pendingOrders
                  ? "Needs attention"
                  : "All caught up"
              }
              icon={<Clock size={20} />}
            />
          </div>

          {/* Orders */}
          <section className="mt-8 rounded-3xl border border-white/10 bg-white/2.5">
            <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
                  Order Management
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Recent Orders
                </h2>
              </div>

              <Link
                to="/admin/orders"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-center text-xs font-bold text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                View All Orders
              </Link>
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/30">
                    <th className="px-6 py-4">
                      Order
                    </th>

                    <th className="px-6 py-4">
                      Customer
                    </th>

                    <th className="px-6 py-4">
                      Items
                    </th>

                    <th className="px-6 py-4">
                      Total
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading && recentOrders.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-10 text-center text-sm text-white/30"
                      >
                        No orders found.
                      </td>
                    </tr>
                  )}

                  {recentOrders.map((order) => {
                    const orderId = getOrderId(order);
                    const status = getOrderStatus(order);
                    const total = getOrderTotal(order);

                    return (
                      <tr
                        key={orderId}
                        className="border-b border-white/5 transition hover:bg-white/2.5"
                      >
                        <td className="px-6 py-5 text-sm font-bold">
                          {formatOrderId(order)}
                        </td>

                        <td className="px-6 py-5 text-sm text-white/60">
                          {getCustomerName(order)}
                        </td>

                        <td className="px-6 py-5 text-sm text-white/50">
                          {getOrderItems(order)}
                        </td>

                        <td className="px-6 py-5 text-sm font-bold">
                          Rs. {total.toLocaleString()}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-end">
                            <select
                              value={status}
                              onChange={(e) =>
                                updateStatus(
                                  orderId,
                                  e.target.value
                                )
                              }
                              className="cursor-pointer appearance-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 pr-8 text-xs font-semibold text-white outline-none transition hover:border-white/20"
                            >
                              {statusOptions.map((statusOption) => (
                                <option
                                  key={statusOption}
                                  value={statusOption}
                                  className="bg-dark-900"
                                >
                                  {statusOption}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Orders */}
            <div className="space-y-3 p-4 md:hidden">
              {!loading && recentOrders.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-center text-sm text-white/30">
                  No orders found.
                </div>
              )}

              {recentOrders.map((order) => {
                const orderId = getOrderId(order);
                const status = getOrderStatus(order);
                const total = getOrderTotal(order);

                return (
                  <div
                    key={orderId}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold">
                          {formatOrderId(order)}
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                          {getCustomerName(order)}
                        </p>
                      </div>

                      <MoreHorizontal
                        size={18}
                        className="text-white/30"
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/30">
                          Total
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          Rs. {total.toLocaleString()}
                        </p>
                      </div>

                      <span
                        className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </div>

                    <select
                      value={status}
                      onChange={(e) =>
                        updateStatus(
                          orderId,
                          e.target.value
                        )
                      }
                      className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-semibold text-white outline-none"
                    >
                      {statusOptions.map((statusOption) => (
                        <option
                          key={statusOption}
                          value={statusOption}
                          className="bg-dark-900"
                        >
                          {statusOption}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Bottom Cards */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Today's Performance */}
            <div className="rounded-3xl border border-white/10 bg-white/2.5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                  <TrendingUp size={19} />
                </div>

                <div>
                  <p className="text-xs text-white/30">
                    Today's Performance
                  </p>

                  <h3 className="mt-1 text-lg font-black">
                    Rs. {todayRevenue.toLocaleString()} revenue today
                  </h3>
                </div>
              </div>

              <div className="mt-6 h-32 rounded-2xl border border-white/5 bg-black/20 p-4">
                <div className="flex h-full items-end gap-2">
                  {revenueChart.map((day) => {
                    const height =
                      day.revenue > 0
                        ? Math.max(
                            (day.revenue / maxRevenue) * 100,
                            5
                          )
                        : 2;

                    return (
                      <div
                        key={day.date.toISOString()}
                        className="group flex h-full flex-1 items-end"
                        title={`${day.date.toLocaleDateString()} - Rs. ${day.revenue.toLocaleString()}`}
                      >
                        <div
                          className="w-full rounded-t-lg bg-pizza-red/70 transition-all duration-300 group-hover:bg-pizza-orange"
                          style={{
                            height: `${height}%`,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="rounded-3xl border border-white/10 bg-white/2.5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-red/10 text-pizza-red">
                  <CheckCircle2 size={19} />
                </div>

                <div>
                  <p className="text-xs text-white/30">
                    Order Status
                  </p>

                  <h3 className="mt-1 text-lg font-black">
                    Live order distribution
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <StatusProgress
                  label="Delivered"
                  value={getStatusPercentage(
                    statusCounts.Delivered
                  )}
                  color="bg-emerald-400"
                />

                <StatusProgress
                  label="Preparing"
                  value={getStatusPercentage(
                    statusCounts.Preparing
                  )}
                  color="bg-pizza-orange"
                />

                <StatusProgress
                  label="Pending"
                  value={getStatusPercentage(
                    statusCounts.Pending
                  )}
                  color="bg-yellow-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ================= SIDEBAR LINK ================= */

function SidebarLink({
  to,
  icon,
  label,
  active = false,
  onClick,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
        active
          ? "bg-pizza-red text-white shadow-lg shadow-pizza-red/10"
          : "text-white/40 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value, change, icon }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/2.5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-pizza-red/20">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-red/10 text-pizza-red">
          {icon}
        </div>

        <span className="text-xs font-semibold text-emerald-400">
          {change}
        </span>
      </div>

      <p className="mt-5 text-xs font-medium text-white/35">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>
    </div>
  );
}

/* ================= STATUS PROGRESS ================= */

function StatusProgress({ label, value, color }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs">
        <span className="font-semibold text-white/50">
          {label}
        </span>

        <span className="font-bold text-white/60">
          {value}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;