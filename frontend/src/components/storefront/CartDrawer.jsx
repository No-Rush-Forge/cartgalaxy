import { Minus, Plus, ShoppingCart, Trash2, Package } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CATEGORY_ICONS } from "@/components/storefront/ProductCard";

export function CartDrawer({ open, onOpenChange, items, onIncrease, onDecrease, onRemove, onCheckout }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <h2 className="font-display text-lg font-semibold text-ink dark:text-paper">Your Cart</h2>

        {items.length === 0 ? (
          <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <ShoppingCart className="h-8 w-8 text-ink/25 dark:text-paper/25" strokeWidth={1.5} />
            <p className="text-sm text-ink-light dark:text-paper/60">Your cart is empty.</p>
          </div>
        ) : (
          <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
            {items.map((item) => {
              const Icon = CATEGORY_ICONS[item.category] || Package;
              return (
                <div key={item.id} className="flex gap-3 border-b border-dashed border-ink/10 pb-4 dark:border-paper/10">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-400 dark:bg-teal-500/10 dark:text-teal-100/50">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink dark:text-paper">{item.name}</p>
                    <p className="font-mono text-sm text-ink-light dark:text-paper/60">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-lg border border-ink/10 dark:border-paper/15">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => onDecrease(item.id)}
                          className="flex h-7 w-7 items-center justify-center text-ink/70 transition hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-paper/10"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center font-mono text-xs text-ink dark:text-paper">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => onIncrease(item.id)}
                          className="flex h-7 w-7 items-center justify-center text-ink/70 transition hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-paper/10"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => onRemove(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-ink/40 transition hover:bg-red-50 hover:text-red-500 dark:text-paper/40 dark:hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )} 

        {items.length > 0 && (
          <div className="mt-4 space-y-4 border-t border-ink/10 pt-4 dark:border-paper/10">
            <div className="flex items-center justify-between text-sm font-semibold text-ink dark:text-paper">
              <span>Subtotal</span>
              <span className="font-mono">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <Button className="w-full" onClick={onCheckout}>
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
