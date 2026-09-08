import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, Star, X, ImagePlus, CheckCircle2, XCircle, ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { getPizzas, createPizza, updatePizza, deletePizza } from "../../services/pizzaService";

const emptyForm = { name: "", description: "", image: "", price: "", rating: "4.5", popular: false, category: "", available: true };

function AdminPizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPizza, setEditingPizza] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deletePizzaTarget, setDeletePizzaTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadPizzas = async () => {
      try {
        const data = await getPizzas();
        if (cancelled) return;
        setPizzas(data.pizzas || data || []);
        setError("");
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setError("Unable to load pizzas.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadPizzas();
    return () => { cancelled = true; };
  }, []);

  const openAddModal = () => {
    setEditingPizza(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  const openEditModal = (pizza) => {
    setEditingPizza(pizza);
    setForm({
      name: pizza.name || "",
      description: pizza.description || "",
      image: pizza.image || "",
      price: pizza.price ?? "",
      rating: pizza.rating ?? "4.5",
      popular: Boolean(pizza.popular),
      category: pizza.category || "",
      available: pizza.available !== false,
    });
    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;
    setShowModal(false);
    setEditingPizza(null);
    setForm(emptyForm);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.image || !form.price || !form.category) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      setSaving(true);
      setError("");
      const pizzaData = {
        name: form.name.trim(), description: form.description.trim(), image: form.image.trim(),
        price: Number(form.price), rating: Number(form.rating), popular: form.popular,
        category: form.category.trim(), available: form.available,
      };
      if (editingPizza) {
        const data = await updatePizza(editingPizza._id, pizzaData);
        const updatedPizza = data.pizza || data;
        setPizzas((current) => current.map((pizza) => pizza._id === editingPizza._id ? updatedPizza : pizza));
        setSuccess("Pizza updated successfully.");
      } else {
        const data = await createPizza(pizzaData);
        const newPizza = data.pizza || data;
        setPizzas((current) => [newPizza, ...current]);
        setSuccess("Pizza added successfully.");
      }
      setShowModal(false);
      setEditingPizza(null);
      setForm(emptyForm);
      setTimeout(() => setSuccess(""), 2500);
    } catch (err) {
      console.error(err);
      setError(editingPizza ? "Failed to update pizza." : "Failed to add pizza.");
    } finally {
      setSaving(false);
    }
  };

  const openDeleteModal = (pizza) => {
    setDeletePizzaTarget(pizza);
    setError("");
  };

  const closeDeleteModal = () => {
    if (deleting) return;
    setDeletePizzaTarget(null);
  };

  const handleDelete = async () => {
    if (!deletePizzaTarget) return;
    try {
      setDeleting(true);
      setError("");
      await deletePizza(deletePizzaTarget._id);
      setPizzas((current) => current.filter((item) => item._id !== deletePizzaTarget._id));
      setDeletePizzaTarget(null);
      setSuccess("Pizza deleted successfully.");
      setTimeout(() => setSuccess(""), 2500);
    } catch (err) {
      console.error(err);
      setError("Failed to delete pizza.");
    } finally {
      setDeleting(false);
    }
  };

  const filteredPizzas = pizzas.filter((pizza) => {
    const query = search.toLowerCase();
    return pizza.name?.toLowerCase().includes(query) || pizza.category?.toLowerCase().includes(query);
  });

  return (
    <main className="min-h-screen bg-dark-950 text-white">
      <div className="p-5 sm:p-8">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/40 transition hover:text-white">
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" /> Back to Dashboard
          </Link>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pizza-orange">Menu Management</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Pizza Collection</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">Manage the pizzas customers see in the menu. Add new pizzas, update existing ones or remove unavailable items.</p>
            </div>
            <button onClick={openAddModal} className="flex w-fit items-center gap-2 rounded-xl bg-pizza-red px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pizza-red/10 transition-all duration-300 hover:bg-pizza-orange"><Plus size={18} /> Add Pizza</button>
          </div>
        </div>

        {success && <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-400"><CheckCircle2 size={18} />{success}</div>}
        {error && !showModal && <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-400">{error}</div>}

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pizzas..." className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-pizza-red/40" />
          </div>
          <p className="text-xs font-semibold text-white/30">{filteredPizzas.length} {filteredPizzas.length === 1 ? "pizza" : "pizzas"}</p>
        </div>

        {loading && <div className="flex min-h-60 items-center justify-center rounded-3xl border border-white/10 bg-white/5"><p className="text-sm font-medium text-white/40">Loading pizzas...</p></div>}

        {!loading && filteredPizzas.length === 0 && <div className="flex min-h-60 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 text-center"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pizza-red/10 text-pizza-red"><PizzaIcon /></div><h3 className="mt-4 text-lg font-black">No pizzas found</h3><p className="mt-1 text-sm text-white/35">Add your first pizza to the menu.</p></div>}

        {!loading && filteredPizzas.length > 0 && <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredPizzas.map((pizza) => <article key={pizza._id} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-pizza-red/20">
            <div className="relative aspect-video overflow-hidden bg-black/30">
              <img src={pizza.image} alt={pizza.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-bold backdrop-blur-md"><Star size={13} className="fill-pizza-orange text-pizza-orange" />{pizza.rating}</div>
              {pizza.popular && <span className="absolute right-4 top-4 rounded-full bg-pizza-red px-3 py-1.5 text-xs font-bold">Popular</span>}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4"><div><h2 className="text-lg font-black">{pizza.name}</h2><p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/25">{pizza.category}</p></div><p className="shrink-0 text-lg font-black text-pizza-cream">Rs. {pizza.price?.toLocaleString()}</p></div>
              <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/40">{pizza.description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">{pizza.available ? <><CheckCircle2 size={15} className="text-emerald-400" /><span className="text-xs font-semibold text-emerald-400">Available</span></> : <><XCircle size={15} className="text-red-400" /><span className="text-xs font-semibold text-red-400">Unavailable</span></>}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEditModal(pizza)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 transition hover:border-pizza-orange/30 hover:bg-pizza-orange/10 hover:text-pizza-orange" title="Edit pizza"><Pencil size={15} /></button>
                  <button onClick={() => openDeleteModal(pizza)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400" title="Delete pizza"><Trash2 size={15} /></button>
                </div>
              </div>
            </div>
          </article>)}
        </div>}
      </div>

      {showModal && <div className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-black/70 px-4 py-6 backdrop-blur-sm">
        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-dark-900 shadow-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-dark-900/95 p-5 backdrop-blur-md sm:p-6">
            <div><p className="text-xs font-semibold uppercase tracking-widest text-pizza-orange">{editingPizza ? "Edit Menu Item" : "New Menu Item"}</p><h2 className="mt-1 text-xl font-black">{editingPizza ? "Update Pizza" : "Add Pizza"}</h2></div>
            <button onClick={closeModal} disabled={saving} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/40 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"><X size={18} /></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
            {error && <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-xs font-semibold text-red-400">{error}</div>}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><label className="mb-2 block text-xs font-semibold text-white/50">Pizza Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="e.g. BBQ Chicken" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-pizza-red/40" /></div>
              <div className="sm:col-span-2"><label className="mb-2 block text-xs font-semibold text-white/50">Description *</label><textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Describe the pizza..." className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-pizza-red/40" /></div>
              <div className="sm:col-span-2"><label className="mb-2 block text-xs font-semibold text-white/50">Image URL *</label><div className="relative"><ImagePlus size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" /><input name="image" value={form.image} onChange={handleChange} placeholder="https://images.unsplash.com/..." className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-pizza-red/40" /></div><p className="mt-2 text-[11px] text-white/25">Cloudinary can replace this URL field later.</p></div>
              <div><label className="mb-2 block text-xs font-semibold text-white/50">Price (Rs.) *</label><input type="number" name="price" value={form.price} onChange={handleChange} min="0" placeholder="1500" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-pizza-red/40" /></div>
              <div><label className="mb-2 block text-xs font-semibold text-white/50">Rating</label><input type="number" name="rating" value={form.rating} onChange={handleChange} min="0" max="5" step="0.1" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-pizza-red/40" /></div>
              <div><label className="mb-2 block text-xs font-semibold text-white/50">Category *</label><input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Chicken" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-pizza-red/40" /></div>
              <div className="flex flex-col justify-end gap-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3"><input type="checkbox" name="popular" checked={form.popular} onChange={handleChange} className="h-4 w-4 accent-pizza-red" /><span className="text-xs font-semibold text-white/60">Mark as Popular</span></label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3"><input type="checkbox" name="available" checked={form.available} onChange={handleChange} className="h-4 w-4 accent-pizza-red" /><span className="text-xs font-semibold text-white/60">Available on Menu</span></label>
              </div>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
              <button type="button" onClick={closeModal} disabled={saving} className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/60 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50">Cancel</button>
              <button type="submit" disabled={saving} className="rounded-xl bg-pizza-red px-6 py-3 text-sm font-bold text-white transition hover:bg-pizza-orange disabled:cursor-not-allowed disabled:opacity-50">{saving ? "Saving..." : editingPizza ? "Update Pizza" : "Add Pizza"}</button>
            </div>
          </form>
        </div>
      </div>}

      {deletePizzaTarget && <div className="fixed inset-0 z-110 flex items-center justify-center overflow-hidden bg-black/70 px-4 py-6 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-400/10 text-red-400"><AlertTriangle size={23} /></div>
            <div><p className="text-xs font-semibold uppercase tracking-widest text-red-400">Delete Pizza</p><h2 className="mt-1 text-xl font-black">Delete this pizza?</h2><p className="mt-2 text-sm leading-6 text-white/40">Are you sure you want to delete <span className="font-bold text-white/80">"{deletePizzaTarget.name}"</span>? This action cannot be undone.</p></div>
          </div>
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={closeDeleteModal} disabled={deleting} className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/60 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50">Cancel</button>
            <button type="button" onClick={handleDelete} disabled={deleting} className="rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50">{deleting ? "Deleting..." : "Delete Pizza"}</button>
          </div>
        </div>
      </div>}
    </main>
  );
}

function PizzaIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 11h.01" /><path d="M11 15h.01" /><path d="M16 16h.01" /><path d="M2 2l20 20" /><path d="M2.5 2.5C7.5 1 15 3 20 8c1.5 1.5 1.8 3.5.7 5.2L13.2 20.7c-1.7 1.1-3.7.8-5.2-.7C3 15 1 7.5 2.5 2.5Z" /></svg>;
}

export default AdminPizzas;