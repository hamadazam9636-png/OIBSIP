import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  Mail,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getCustomers } from "../../services/adminService";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);

 useEffect(() => {
  let cancelled = false;

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();

      if (cancelled) return;

      setCustomers(data.customers || data || []);
      setError("");
    } catch (err) {
      if (cancelled) return;

      console.error(err);
      setError("Unable to load customers.");
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  loadCustomers();

  return () => {
    cancelled = true;
  };
}, []);

  const filteredCustomers = useMemo(() => {
    const query = search.toLowerCase();

    return customers.filter(
      (customer) =>
        customer.name?.toLowerCase().includes(query) ||
        customer.email?.toLowerCase().includes(query)
    );
  }, [customers, search]);

  const verifiedCount = customers.filter(
    (customer) => customer.isVerified
  ).length;

  return (
    <main className="min-h-screen bg-dark-950 text-white">
      <div className="p-5 sm:p-8">

        {/* Header */}
        <div className="mb-8">
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

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pizza-orange">
            Customer Management
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Customers
        </h1>

        <p className="mt-2 text-sm text-white/40">
            View and manage customers registered with Pizzaro.
        </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-white/2.5 p-5">
            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-red/10 text-pizza-red">
                <Users size={20} />
              </div>

              <span className="text-xs font-semibold text-emerald-400">
                Registered
              </span>

            </div>

            <p className="mt-5 text-xs text-white/30">
              Total Customers
            </p>

            <p className="mt-1 text-2xl font-black">
              {customers.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/2.5 p-5">
            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <CheckCircle2 size={20} />
              </div>

              <span className="text-xs font-semibold text-emerald-400">
                Verified
              </span>

            </div>

            <p className="mt-5 text-xs text-white/30">
              Verified Customers
            </p>

            <p className="mt-1 text-2xl font-black">
              {verifiedCount}
            </p>
          </div>

        </div>

        {/* Search */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/2.5 p-4">

          <div className="relative max-w-md">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer name or email..."
              className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-pizza-red/40"
            />

          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-60 items-center justify-center rounded-3xl border border-white/10 bg-white/2.5">
            <p className="text-sm text-white/40">
              Loading customers...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm font-semibold text-red-400">
            {error}
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/2.5">

            <div className="overflow-x-auto">

              <table className="w-full min-w-200">

                <thead>
                  <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/30">

                    <th className="px-6 py-4">
                      Customer
                    </th>

                    <th className="px-6 py-4">
                      Email
                    </th>

                    <th className="px-6 py-4">
                      Joined
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

                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="border-b border-white/5 transition hover:bg-white/2.5"
                    >

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pizza-red/10 font-bold text-pizza-red">
                            {customer.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-bold">
                              {customer.name}
                            </p>

                            <p className="text-xs text-white/30">
                              Customer
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-white/50">
                        {customer.email}
                      </td>

                      <td className="px-6 py-5 text-sm text-white/50">
                        {customer.createdAt
                          ? new Date(
                              customer.createdAt
                            ).toLocaleDateString()
                          : "—"}
                      </td>

                      <td className="px-6 py-5">

                        {customer.isVerified ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-400">
                            <CheckCircle2 size={13} />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1.5 text-xs font-bold text-yellow-400">
                            <XCircle size={13} />
                            Unverified
                          </span>
                        )}

                      </td>

                      <td className="px-6 py-5">

                        <div className="flex justify-end">

                          <button
                            onClick={() =>
                              setSelectedCustomer(customer)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-white"
                          >
                            <Eye size={16} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            {filteredCustomers.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-sm text-white/35">
                  No customers found.
                </p>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Customer Details */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl">

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pizza-red/10 text-xl font-black text-pizza-red">
                  {selectedCustomer.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h2 className="text-lg font-black">
                    {selectedCustomer.name}
                  </h2>

                  <p className="text-xs text-white/30">
                    Customer Profile
                  </p>
                </div>

              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/40 hover:text-white"
              >
                <X size={17} />
              </button>

            </div>

            <div className="mt-7 space-y-3">

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <Mail
                  size={17}
                  className="text-pizza-orange"
                />

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/25">
                    Email
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {selectedCustomer.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <CalendarDays
                  size={17}
                  className="text-pizza-orange"
                />

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/25">
                    Joined
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {selectedCustomer.createdAt
                      ? new Date(
                          selectedCustomer.createdAt
                        ).toLocaleDateString()
                      : "—"}
                  </p>
                </div>
              </div>

            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
              className="mt-6 w-full rounded-xl bg-pizza-red px-5 py-3 text-sm font-bold"
            >
              Close
            </button>

          </div>

        </div>
      )}
    </main>
  );
}

export default Customers;