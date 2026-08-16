import { Zap, Smartphone, Headphones, Laptop, Music2, Package, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const CATEGORY_ICONS = {
  Electronics: Zap,
  Mobiles: Smartphone,
  Accessories: Headphones,
  Laptops: Laptop,
  Audio: Music2,
};

export function ProductCard({ product, onView, onAddToCart }) {
  const Icon = CATEGORY_ICONS[product.category] || Package;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-xl hover:shadow-teal-900/10">
      <button
        type="button"
        onClick={() => onView(product)}
        className="relative flex h-36 items-center justify-center bg-teal-50 text-teal-400 transition-colors group-hover:bg-teal-100 dark:bg-teal-500/10 dark:text-teal-100/50 dark:group-hover:bg-teal-500/15"
      >
        <Icon className="h-9 w-9" strokeWidth={1.5} />
        {discount && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-500 px-2.5 py-0.5 text-[11px] font-semibold text-ink">
            {discount}% OFF
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <button type="button" onClick={() => onView(product)} className="text-left">
          <span className="inline-block rounded-full bg-gold-100 px-2.5 py-0.5 text-[11px] font-semibold text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
            {product.category}
          </span>
          <h3 className="mt-2 font-display text-base font-semibold leading-snug text-ink dark:text-paper">
            {product.name}
          </h3>
        </button>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-mono text-lg font-semibold text-ink dark:text-paper">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="font-mono text-sm text-ink-light line-through dark:text-paper/45">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <Button size="sm" className="mt-4 w-full" onClick={() => onAddToCart(product)}>
          <Plus className="h-3.5 w-3.5" /> Add to Cart
        </Button>
      </div>
    </Card>
  );
}
