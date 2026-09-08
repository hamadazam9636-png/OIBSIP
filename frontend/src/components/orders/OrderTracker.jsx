
import {
  Check,
  Clock3,
  ChefHat,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";

function OrderTracker({ status = "Pending" }) {
  const steps = [
    {
      name: "Pending",
      label: "Order Received",
      icon: Clock3,
    },
    {
      name: "Confirmed",
      label: "Confirmed",
      icon: Check,
    },
    {
      name: "Preparing",
      label: "Preparing",
      icon: ChefHat,
    },
    {
      name: "Out for Delivery",
      label: "Out for Delivery",
      icon: Truck,
    },
    {
      name: "Delivered",
      label: "Delivered",
      icon: PackageCheck,
    },
  ];

  // Cancelled order
  if (status === "Cancelled") {
    return (
      <div className="mt-7 rounded-2xl border border-red-400/20 bg-red-400/5 p-5">

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-400/10 text-red-400">
            <XCircle size={22} />
          </div>

          <div>
            <p className="text-sm font-bold text-red-400">
              Order Cancelled
            </p>

            <p className="mt-1 text-xs text-white/35">
              This order has been cancelled and will not be delivered.
            </p>
          </div>

        </div>
      </div>
    );
  }

  const currentIndex = steps.findIndex(
    (step) => step.name === status
  );

  return (
    <div className="mt-7 overflow-x-auto pb-2">

      <div className="min-w-150">

        <div className="flex items-start justify-between">

          {steps.map((step, index) => {
            const Icon = step.icon;

            const completed =
              currentIndex >= 0 && index <= currentIndex;

            const active = index === currentIndex;

            return (
              <div
                key={step.name}
                className="relative flex flex-1 flex-col items-center"
              >

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-5 h-px w-full bg-white/10">

                    <div
                      className={`h-full transition-all duration-700 ${
                        index < currentIndex
                          ? "w-full bg-pizza-red"
                          : "w-0"
                      }`}
                    />

                  </div>
                )}

                {/* Icon */}
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${
                    completed
                      ? "border-pizza-red bg-pizza-red text-white shadow-lg shadow-pizza-red/20"
                      : "border-white/10 bg-dark-950 text-white/30"
                  } ${
                    active
                      ? "scale-110 ring-4 ring-pizza-red/10"
                      : ""
                  }`}
                >
                  <Icon size={17} />
                </div>

                {/* Text */}
                <p
                  className={`mt-3 text-center text-xs font-semibold ${
                    completed
                      ? "text-white"
                      : "text-white/30"
                  }`}
                >
                  {step.label}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default OrderTracker;

