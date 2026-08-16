import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_ICONS } from "@/components/storefront/ProductCard";

export function ProductDetails({ product, open, onOpenChange, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (open) setQuantity(1);
  }, [open, product]);

  if (!product) return null;

  const Icon = CATEGORY_ICONS[product.category] || Package;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-ink/8 bg-paper p-6 shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:border-paper/10 dark:bg-night-card">
          <Dialog.Close className="absolute right-5 top-5 rounded-full p-1.5 text-ink/60 hover:bg-ink/5 dark:text-paper/60 dark:hover:bg-paper/10">
            <X className="h-4 w-4" />
          </Dialog.Close>

          <div className="relative flex h-44 items-center justify-center rounded-2xl bg-teal-50 text-teal-400 dark:bg-teal-500/10 dark:text-teal-100/50">
            <Icon className="h-14 w-14" strokeWidth={1.5} />
            {discount && (
              <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-2.5 py-0.5 text-[11px] font-semibold text-ink">
                {discount}% OFF
              </span>
            )}
          </div>

          <div className="mt-5">
            <span className="inline-block rounded-full bg-gold-100 px-2.5 py-0.5 text-[11px] font-semibold text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
              {product.category}
            </span>
            <Dialog.Title className="mt-2 font-display text-xl font-semibold text-ink dark:text-paper">
              {product.name}
            </Dialog.Title>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-semibold text-ink dark:text-paper">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-sm text-ink-light line-through dark:text-paper/45">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <p className="mt-3 text-sm leading-relaxed text-ink-light dark:text-paper/65">
              {product.description}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50">
                Quantity
              </span>
              <div className="flex items-center gap-1 rounded-xl border border-ink/10 dark:border-paper/15">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center text-ink/70 transition hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-paper/10"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center font-mono text-sm text-ink dark:text-paper">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-9 w-9 items-center justify-center text-ink/70 transition hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-paper/10"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <Button
              className="mt-6 w-full"
              onClick={() => {
                onAddToCart(product, quantity);
                onOpenChange(false);
              }}
            >
              Add to Cart
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
