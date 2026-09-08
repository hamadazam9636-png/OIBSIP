import {  useState } from "react";
import {
  Save,
  RotateCcw,
  Store,
  Mail,
  Truck,
  Bell,
  ShieldCheck,
  Wrench,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const defaultSettings = {
  storeName: "Pizzaro",
  supportEmail: "support@pizzaro.com",
  deliveryFee: "150",
  minimumOrder: "500",
  orderNotifications: true,
  emailNotifications: true,
  maintenanceMode: false,
};

function Settings() {
  const [settings, setSettings] = useState(() => {
  const storedSettings = localStorage.getItem(
    "pizzaroSettings"
  );

  if (!storedSettings) {
    return defaultSettings;
  }

  try {
    return {
      ...defaultSettings,
      ...JSON.parse(storedSettings),
    };
  } catch {
    return defaultSettings;
  }
});

const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    localStorage.setItem(
      "pizzaroSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const resetSettings = () => {
    const confirmed = window.confirm(
      "Reset all settings to default?"
    );

    if (!confirmed) return;

    setSettings(defaultSettings);

    localStorage.setItem(
      "pizzaroSettings",
      JSON.stringify(defaultSettings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

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
            Administration
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Settings
        </h1>

        <p className="mt-2 text-sm text-white/40">
            Manage your Pizzaro store preferences and notifications.
        </p>
        </div>

        {/* Store */}
        <section className="rounded-3xl border border-white/10 bg-white/2.5 p-5 sm:p-7">

          <div className="flex items-center gap-3 border-b border-white/10 pb-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-red/10 text-pizza-red">
              <Store size={19} />
            </div>

            <div>
              <h2 className="font-black">
                Store Information
              </h2>

              <p className="text-xs text-white/30">
                Basic information about your pizza business.
              </p>
            </div>

          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-xs font-semibold text-white/50">
                Store Name
              </label>

              <input
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-pizza-red/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-white/50">
                Support Email
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  type="email"
                  name="supportEmail"
                  value={settings.supportEmail}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm outline-none focus:border-pizza-red/40"
                />
              </div>
            </div>

          </div>

        </section>

        {/* Delivery */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/2.5 p-5 sm:p-7">

          <div className="flex items-center gap-3 border-b border-white/10 pb-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-orange/10 text-pizza-orange">
              <Truck size={19} />
            </div>

            <div>
              <h2 className="font-black">
                Delivery & Orders
              </h2>

              <p className="text-xs text-white/30">
                Configure basic ordering rules.
              </p>
            </div>

          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-xs font-semibold text-white/50">
                Delivery Fee (Rs.)
              </label>

              <input
                type="number"
                name="deliveryFee"
                value={settings.deliveryFee}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-pizza-red/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-white/50">
                Minimum Order (Rs.)
              </label>

              <input
                type="number"
                name="minimumOrder"
                value={settings.minimumOrder}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-pizza-red/40"
              />
            </div>

          </div>

        </section>

        {/* Notifications */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/2.5 p-5 sm:p-7">

          <div className="flex items-center gap-3 border-b border-white/10 pb-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
              <Bell size={19} />
            </div>

            <div>
              <h2 className="font-black">
                Notifications
              </h2>

              <p className="text-xs text-white/30">
                Choose which admin notifications are enabled.
              </p>
            </div>

          </div>

          <div className="mt-5 space-y-3">

            <SettingToggle
              icon={<Bell size={17} />}
              title="Order Notifications"
              description="Get notified when a new order is placed."
              name="orderNotifications"
              checked={settings.orderNotifications}
              onChange={handleChange}
            />

            <SettingToggle
              icon={<Mail size={17} />}
              title="Email Notifications"
              description="Receive important store updates by email."
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />

          </div>

        </section>

        {/* Security */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/2.5 p-5 sm:p-7">

          <div className="flex items-center gap-3 border-b border-white/10 pb-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <ShieldCheck size={19} />
            </div>

            <div>
              <h2 className="font-black">
                Store Status
              </h2>

              <p className="text-xs text-white/30">
                Control store availability.
              </p>
            </div>

          </div>

          <div className="mt-5">

            <SettingToggle
              icon={<Wrench size={17} />}
              title="Maintenance Mode"
              description="Temporarily indicate that the store is under maintenance."
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              danger
            />

          </div>

        </section>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            onClick={resetSettings}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            onClick={saveSettings}
            className="flex items-center justify-center gap-2 rounded-xl bg-pizza-red px-6 py-3 text-sm font-bold text-white transition hover:bg-pizza-orange"
          >
            <Save size={16} />
            {saved ? "Saved" : "Save Changes"}
          </button>

        </div>

      </div>
    </main>
  );
}

function SettingToggle({
  icon,
  title,
  description,
  name,
  checked,
  onChange,
  danger = false,
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5 rounded-2xl border border-white/10 bg-black/20 p-4">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            danger
              ? "bg-red-400/10 text-red-400"
              : "bg-white/5 text-white/40"
          }`}
        >
          {icon}
        </div>

        <div>
          <p className="text-sm font-bold">
            {title}
          </p>

          <p className="mt-1 text-xs text-white/30">
            {description}
          </p>
        </div>

      </div>

      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 shrink-0 accent-pizza-red"
      />

    </label>
  );
}

export default Settings;