import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  AlertTriangle,
  CheckCircle2,
  Plus,
  X,
  Loader2,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import InventoryTable from "../../components/admin/InventoryTable";
import StockUpdate from "../../components/admin/StockUpdate";

import {
  getInventory,
  createInventory,
  updateStock,
  deleteInventory,
} from "../../services/inventoryService";

function Inventory() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add inventory modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [adding, setAdding] = useState(false);

  // Delete confirmation modal
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Base",
    quantity: "",
    unit: "pieces",
    threshold: "5",
    available: true,

    priceType: "free",
    price: "",
    image: "",
  });

  // --------------------------------
  // Load Inventory
  // --------------------------------

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const data = await getInventory();
        setItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, []);

  const lowStock = items.filter(
    (item) => item.quantity <= item.threshold
  );

  // --------------------------------
  // Stock Update
  // --------------------------------

  const handleUpdate = async (id, quantity, price) => {
    try {
      setError("");

      const data = await updateStock(
        id,
        quantity,
        price
      );

      setItems((currentItems) =>
        currentItems.map((item) =>
          item._id === id ? data.item : item
        )
      );

      setSelectedItem(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // --------------------------------
  // Delete Inventory
  // --------------------------------

  const handleDelete = async () => {
    if (!deleteItem) return;

    try {
      setDeleting(true);
      setError("");

      await deleteInventory(deleteItem._id);

      setItems((currentItems) =>
        currentItems.filter(
          (item) => item._id !== deleteItem._id
        )
      );

      setDeleteItem(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setDeleting(false);
    }
  };

  // --------------------------------
  // Add Inventory
  // --------------------------------

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Base",
      quantity: "",
      unit: "pieces",
      threshold: "5",
      available: true,

      priceType: "free",
      price: "",
      image: "",
    });
  };

  const closeAddModal = () => {
    if (adding) return;

    setShowAddModal(false);
    resetForm();
  };

  const handleAddInventory = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Ingredient name is required.");
      return;
    }

    if (
      formData.quantity === "" ||
      Number(formData.quantity) < 0
    ) {
      setError("Quantity must be 0 or greater.");
      return;
    }

    if (
      formData.threshold === "" ||
      Number(formData.threshold) < 0
    ) {
      setError("Threshold must be 0 or greater.");
      return;
    }

    // Price validation
    if (
      formData.priceType === "paid" &&
      (
        formData.price === "" ||
        Number(formData.price) < 0
      )
    ) {
      setError("Please enter a valid ingredient price.");
      return;
    }

    try {
      setAdding(true);
      setError("");

      const finalPrice =
        formData.priceType === "free"
          ? 0
          : Number(formData.price);

      const data = await createInventory({
        name: formData.name.trim(),
        category: formData.category,
        quantity: Number(formData.quantity),
        unit: formData.unit.trim() || "pieces",
        threshold: Number(formData.threshold),
        available: formData.available,
        price: finalPrice,
        image: formData.image.trim() || "",
      });

      setItems((currentItems) => [
        data.item,
        ...currentItems,
      ]);

      closeAddModal();
    } catch (error) {
      setError(error.message);
    } finally {
      setAdding(false);
    }
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

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pizza-orange">
                Administration
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight text-pizza-cream sm:text-5xl">
                Inventory
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                Monitor ingredients and keep your pizza stock ready.
              </p>

            </div>

            {/* Add Ingredient */}
            <button
              type="button"
              onClick={() => {
                setError("");
                setShowAddModal(true);
              }}
              className="group flex items-center justify-center gap-2 rounded-xl bg-pizza-red px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-pizza-red/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pizza-orange"
            >
              <Plus
                size={17}
                className="transition-transform duration-300 group-hover:rotate-90"
              />

              Add Ingredient
            </button>

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-2xl border border-red-400/20 bg-red-400/5 p-4">

            <p className="text-sm leading-6 text-red-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0 rounded-lg p-1 text-red-400/50 transition hover:bg-red-400/10 hover:text-red-400"
            >
              <X size={17} />
            </button>

          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center text-white/40">
            Loading inventory...
          </div>
        ) : (
          <>

            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">

              {/* Total */}
              <div className="rounded-2xl border border-white/10 bg-dark-800 p-5">
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                      Total Items
                    </p>

                    <p className="mt-2 text-3xl font-black">
                      {items.length}
                    </p>
                  </div>

                  <Package
                    className="text-pizza-orange"
                    size={22}
                  />

                </div>
              </div>

              {/* Low Stock */}
              <div className="rounded-2xl border border-white/10 bg-dark-800 p-5">
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                      Low Stock
                    </p>

                    <p className="mt-2 text-3xl font-black text-red-400">
                      {lowStock.length}
                    </p>
                  </div>

                  <AlertTriangle
                    className="text-red-400"
                    size={22}
                  />

                </div>
              </div>

              {/* Healthy */}
              <div className="rounded-2xl border border-white/10 bg-dark-800 p-5">
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                      Healthy Stock
                    </p>

                    <p className="mt-2 text-3xl font-black text-emerald-400">
                      {items.length - lowStock.length}
                    </p>
                  </div>

                  <CheckCircle2
                    className="text-emerald-400"
                    size={22}
                  />

                </div>
              </div>

            </div>

            {/* Warning */}
            {lowStock.length > 0 && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-400/5 p-4">

                <AlertTriangle
                  size={19}
                  className="mt-0.5 shrink-0 text-red-400"
                />

                <div>
                  <p className="text-sm font-bold text-red-400">
                    Low stock alert
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/40">
                    {lowStock.length} ingredient
                    {lowStock.length > 1 ? "s are" : " is"} below
                    the recommended threshold.
                  </p>
                </div>

              </div>
            )}

            {/* Inventory Table */}
            <InventoryTable
              items={items}
              onUpdate={setSelectedItem}
              onDelete={setDeleteItem}
            />

          </>
        )}

      </div>

      {/* -------------------------------- */}
      {/* Stock Update Modal */}
      {/* -------------------------------- */}

      {selectedItem && (
        <StockUpdate
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onUpdate={handleUpdate}
        />
      )}

      {/* -------------------------------- */}
      {/* Add Inventory Modal */}
      {/* -------------------------------- */}

      {showAddModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-5 py-8 backdrop-blur-sm"
        >
          <div className="mx-auto flex min-h-full w-full max-w-lg items-center justify-center">

            <div className="my-auto max-h-[calc(100vh-4rem)] w-full overflow-y-auto rounded-3xl border border-white/10 bg-dark-800 shadow-2xl">

              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 p-6 sm:p-7">

                <div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pizza-red/10 text-pizza-red">
                    <Package size={20} />
                  </div>

                  <h2 className="mt-5 text-2xl font-black">
                    Add Ingredient
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    Add a new ingredient to your pizza inventory.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={closeAddModal}
                  disabled={adding}
                  className="rounded-lg p-2 text-white/30 transition hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                >
                  <X size={19} />
                </button>

              </div>

              {/* Form */}
              <form
                onSubmit={handleAddInventory}
                className="space-y-5 p-6 sm:p-7"
              >

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-white/70"
                  >
                    Ingredient Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Mozzarella Cheese"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-pizza-red/50"
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-semibold text-white/70"
                  >
                    Category
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition focus:border-pizza-red/50"
                  >
                    <option value="Base" className="bg-dark-800">
                      Base
                    </option>

                    <option value="Sauce" className="bg-dark-800">
                      Sauce
                    </option>

                    <option value="Cheese" className="bg-dark-800">
                      Cheese
                    </option>

                    <option value="Vegetable" className="bg-dark-800">
                      Vegetable
                    </option>

                    <option value="Other" className="bg-dark-800">
                      Other
                    </option>
                  </select>
                </div>

                {/* Quantity + Unit */}
                <div className="grid gap-4 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="quantity"
                      className="mb-2 block text-sm font-semibold text-white/70"
                    >
                      Initial Stock
                    </label>

                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="0"
                      value={formData.quantity}
                      onChange={handleFormChange}
                      placeholder="0"
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-pizza-red/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="unit"
                      className="mb-2 block text-sm font-semibold text-white/70"
                    >
                      Unit
                    </label>

                    <input
                      id="unit"
                      name="unit"
                      type="text"
                      value={formData.unit}
                      onChange={handleFormChange}
                      placeholder="pieces"
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-pizza-red/50"
                    />
                  </div>

                </div>

                {/* Price */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-white/70">
                    Ingredient Price
                  </label>

                  <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/20 p-1.5">

                    <button
                      type="button"
                      onClick={() => {
                        setFormData((current) => ({
                          ...current,
                          priceType: "free",
                          price: "",
                        }));
                      }}
                      className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                        formData.priceType === "free"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "text-white/30 hover:text-white/60"
                      }`}
                    >
                      Free
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData((current) => ({
                          ...current,
                          priceType: "paid",
                        }));
                      }}
                      className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                        formData.priceType === "paid"
                          ? "bg-pizza-red/10 text-pizza-red"
                          : "text-white/30 hover:text-white/60"
                      }`}
                    >
                      Paid
                    </button>

                  </div>

                  {formData.priceType === "paid" && (
                    <div className="relative mt-3">

                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white/30">
                        Rs.
                      </span>

                      <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        value={formData.price}
                        onChange={handleFormChange}
                        placeholder="Enter ingredient price"
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 pl-12 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-pizza-red/50"
                      />

                    </div>
                  )}

                  <p className="mt-2 text-xs text-white/25">
                    Free ingredients will be added at no extra cost.
                  </p>

                </div>

                {/* Image URL */}
                <div>

                  <label
                    htmlFor="image"
                    className="mb-2 block text-sm font-semibold text-white/70"
                  >
                    Image URL

                    <span className="ml-2 text-xs font-normal text-white/25">
                      Optional
                    </span>
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleFormChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-pizza-red/50"
                  />

                  <p className="mt-2 text-xs text-white/25">
                    Leave empty to use the default ingredient image.
                  </p>

                </div>

                {/* Threshold */}
                <div>

                  <label
                    htmlFor="threshold"
                    className="mb-2 block text-sm font-semibold text-white/70"
                  >
                    Low Stock Threshold
                  </label>

                  <input
                    id="threshold"
                    name="threshold"
                    type="number"
                    min="0"
                    value={formData.threshold}
                    onChange={handleFormChange}
                    placeholder="5"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-pizza-red/50"
                  />

                  <p className="mt-2 text-xs text-white/25">
                    The ingredient will show as low stock when it reaches
                    this amount or below.
                  </p>

                </div>

                {/* Available */}
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4">

                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleFormChange}
                    className="h-4 w-4 accent-pizza-red"
                  />

                  <div>
                    <p className="text-sm font-semibold text-white/80">
                      Available for use
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                      Mark this ingredient as currently available.
                    </p>
                  </div>

                </label>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">

                  <button
                    type="button"
                    onClick={closeAddModal}
                    disabled={adding}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-bold text-white/60 transition hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={adding}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-pizza-red px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-pizza-red/10 transition-all duration-300 hover:bg-pizza-orange disabled:pointer-events-none disabled:opacity-50"
                  >
                    {adding ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Add Ingredient
                      </>
                    )}
                  </button>

                </div>

              </form>

            </div>
          </div>
        </div>
      )}

      {/* -------------------------------- */}
      {/* Delete Confirmation Modal */}
      {/* -------------------------------- */}

      {deleteItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm">

          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-dark-800 shadow-2xl">

            <div className="p-6 sm:p-7">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-400/10 text-red-400">
                <Trash2 size={21} />
              </div>

              <h2 className="mt-5 text-2xl font-black">
                Delete ingredient?
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/40">
                Are you sure you want to permanently delete{" "}
                <span className="font-bold text-white/80">
                  {deleteItem.name}
                </span>{" "}
                from your inventory?
              </p>

              <div className="mt-5 rounded-2xl border border-red-400/10 bg-red-400/5 p-4">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                      Current Stock
                    </p>

                    <p className="mt-1 text-sm font-bold text-red-400">
                      {deleteItem.quantity} {deleteItem.unit}
                    </p>
                  </div>

                  <Trash2
                    size={19}
                    className="text-red-400/40"
                  />

                </div>

              </div>

              <p className="mt-4 text-xs text-white/25">
                This action cannot be undone.
              </p>

              <div className="mt-6 flex gap-3">

                <button
                  type="button"
                  onClick={() => setDeleteItem(null)}
                  disabled={deleting}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-bold text-white/60 transition hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-red-400 disabled:pointer-events-none disabled:opacity-50"
                >
                  {deleting ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Delete
                    </>
                  )}
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default Inventory;