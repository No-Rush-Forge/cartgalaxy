import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StoreHero({ storeName, description, onShopClick }) {
  return (
    <section id="home" className="bg-textured py-14 md:py-20">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500 text-white">
            <Store className="h-6 w-6" strokeWidth={2} />
          </span>
          <h1 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight text-ink dark:text-paper sm:text-4xl">
            Welcome to {storeName}
          </h1>
          <p className="mt-3 max-w-md text-balance text-ink-light dark:text-paper/70">{description}</p>
          <Button size="lg" className="mt-7" onClick={onShopClick}>
            Shop Products
          </Button>
        </div>
      </div>
    </section>
  );
}
