import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, Plus, Pencil, Trash2, Package, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MOCK_PRODUCTS = [
  { id: 1, name: "Handloom Cotton Saree", price: 1899, category: "Apparel", available: true },
  { id: 2, name: "Brass Table Lamp", price: 1240, category: "Home Decor", available: true },
  { id: 3, name: "Clay Diffuser Set", price: 560, category: "Home Decor", available: false },
  { id: 4, name: "Embroidered Cushion Cover", price: 420, category: "Home Decor", available: true },
  { id: 5, name: "Block Print Kurta", price: 990, category: "Apparel", available: true },
  { id: 6, name: "Jute Wall Hanging", price: 350, category: "Decor", available: false },
];

const CATEGORIES = ["All", "Apparel", "Home Decor", "Decor"];

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper dark:placeholder:text-paper/30";

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-teal-500" : "bg-ink/15 dark:bg-paper/20"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
      {label && <span className="text-sm font-medium text-ink dark:text-paper">{label}</span>}
    </label>
  );
}

function ProductModal({ open, onOpenChange, onSave }) {
  const [draft, setDraft] = useState({
    name: "",
    price: "",
    category: CATEGORIES[1],
    description: "",
    available: true,
  });

  const update = (key) => (e) => setDraft((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = () => {
    onSave?.(draft);
    onOpenChange(false);
    setDraft({ name: "", price: "", category: CATEGORIES[1], description: "", available: true });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-ink/8 bg-paper p-6 shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:border-paper/10 dark:bg-night-card">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-lg font-semibold text-ink dark:text-paper">
              Add Product
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-1.5 text-ink/60 hover:bg-ink/5 dark:text-paper/60 dark:hover:bg-paper/10">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <div className="mt-5 space-y-4">
            <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-ink/[0.03] text-ink/30 dark:border-paper/15 dark:bg-paper/5 dark:text-paper/25">
              <Package className="h-8 w-8" strokeWidth={1.5} />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50">
                Product Name
              </label>
              <input className={inputClass} value={draft.name} onChange={update("name")} placeholder="Product name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50">
                  Price
                </label>
                <input className={inputClass} type="number" value={draft.price} onChange={update("price")} placeholder="0" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50">
                  Category
                </label>
                <select className={inputClass} value={draft.category} onChange={update("category")}>
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50">
                Description
              </label>
              <textarea
                className={`${inputClass} min-h-[80px] resize-y`}
                value={draft.description}
                onChange={update("description")}
                placeholder="Short product description"
              />
            </div>

            <Toggle
              checked={draft.available}
              onChange={(val) => setDraft((prev) => ({ ...prev, available: val }))}
              label="Available for purchase"
            />
          </div>

          <div className="mt-6 flex gap-3">
            <Button className="flex-1" onClick={handleSave}>
              Save Product
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ProductsManager() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    const matchesAvailability =
      availability === "All" ||
      (availability === "Available" && p.available) ||
      (availability === "Unavailable" && !p.available);
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleAdd = (draft) => {
    setProducts((prev) => [
      { id: Date.now(), name: draft.name, price: Number(draft.price) || 0, category: draft.category, available: draft.available },
      ...prev,
    ]);
  };

  const handleDelete = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35 dark:text-paper/35" />
            <input
              className={`${inputClass} pl-10`}
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className={`${inputClass} w-auto`} value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            className={`${inputClass} w-auto`}
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            {["All", "Available", "Unavailable"].map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 px-6 py-16 text-center">
          <Package className="h-8 w-8 text-ink/25 dark:text-paper/25" strokeWidth={1.5} />
          <p className="text-sm text-ink-light dark:text-paper/60">No products match your filters.</p>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-xl hover:shadow-teal-900/10"
            >
              <div className="flex h-36 items-center justify-center bg-teal-50 text-teal-400 dark:bg-teal-500/10 dark:text-teal-100/50">
                <Package className="h-9 w-9" strokeWidth={1.5} />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-semibold leading-snug text-ink dark:text-paper">
                    {product.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      product.available
                        ? "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100"
                        : "bg-ink/5 text-ink/45 dark:bg-paper/10 dark:text-paper/45"
                    }`}
                  >
                    {product.available ? "Available" : "Unavailable"}
                  </span>
                </div>
                <p className="mt-1.5 font-mono text-lg font-semibold text-ink dark:text-paper">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <span className="mt-2 inline-block rounded-full bg-gold-100 px-2.5 py-0.5 text-[11px] font-semibold text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                  {product.category}
                </span>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:border-red-400/40 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ProductModal open={modalOpen} onOpenChange={setModalOpen} onSave={handleAdd} />
    </div>
  );
}
