import { PackageSearch } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProductCard } from "@/components/storefront/ProductCard";

export function ProductGrid({ products, onView, onAddToCart }) {
  if (products.length === 0) {
    return (
      <Card className="flex flex-col items-center gap-3 px-6 py-16 text-center">
        <PackageSearch className="h-8 w-8 text-ink/25 dark:text-paper/25" strokeWidth={1.5} />
        <p className="text-sm text-ink-light dark:text-paper/60">No products found.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onView={onView} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
