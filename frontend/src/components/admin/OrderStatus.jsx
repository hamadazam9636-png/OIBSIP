import { ChevronDown } from "lucide-react";

const statusStyles = {
  Pending: "border-yellow-400/20 bg-yellow-400/10 text-yellow-400",
  Preparing: "border-blue-400/20 bg-blue-400/10 text-blue-400",
  "Out for Delivery":
    "border-purple-400/20 bg-purple-400/10 text-purple-400",
  Delivered: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
  Cancelled: "border-red-400/20 bg-red-400/10 text-red-400",
};

function OrderStatus({ status, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none rounded-lg border px-3 py-2 pr-8 text-xs font-bold outline-none transition-all duration-300 ${
          statusStyles[status] ||
          "border-white/10 bg-white/5 text-white"
        }`}
      >
        <option value="Pending">Pending</option>
        <option value="Preparing">Preparing</option>
        <option value="Out for Delivery">
          Out for Delivery
        </option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-2.5 text-white/40"
      />
    </div>
  );
}

export default OrderStatus;