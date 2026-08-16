import { useMemo, useState } from "react";
import { StoreHeader } from "@/components/storefront/StoreHeader";
import { StoreHero } from "@/components/storefront/StoreHero";
import { CategoryList } from "@/components/storefront/CategoryList";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { ProductDetails } from "@/components/storefront/ProductDetails";
import { CartDrawer } from "@/components/storefront/CartDrawer";
import { StoreInfo } from "@/components/storefront/StoreInfo";
import { StoreFooter } from "@/components/storefront/StoreFooter";
import { mockStore } from "@/data/mockStore";
import { categories, products } from "@/data/mockProducts";

 function StoreFront() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const featuredProducts = useMemo(() => products.filter((p) => p.featured).slice(0, 4), []);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        !term || product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term);
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const openDetails = (product) => {
    setSelectedProduct(product);
    setDetailsOpen(true);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setCartOpen(true);
  };

  const increaseQuantity = (id) =>
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));

  const decreaseQuantity = (id) =>
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item))
    );

  const removeItem = (id) => setCartItems((prev) => prev.filter((item) => item.id !== id));

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-night dark:text-paper">
      <StoreHeader
        storeName={mockStore.name}
        searchValue={search}
        onSearchChange={setSearch}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <StoreHero
        storeName={mockStore.name}
        description={mockStore.description}
        onShopClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
      />

      <section id="categories" className="py-6">
        <div className="container">
          <h2 className="font-display text-lg font-semibold text-ink dark:text-paper">Shop by Category</h2>
        </div>
      </section>
      <CategoryList categories={categories} activeCategory={activeCategory} onSelect={handleCategorySelect} />

      <section className="py-10 md:py-14">
        <div className="container">
          <h2 className="font-display text-lg font-semibold text-ink dark:text-paper">Featured Products</h2>
          <div className="mt-5">
            <ProductGrid products={featuredProducts} onView={openDetails} onAddToCart={addToCart} />
          </div>
        </div>
      </section>

      <section id="products" className="py-10 md:py-14">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-lg font-semibold text-ink dark:text-paper">All Products</h2>
            <p className="text-sm text-ink-light dark:text-paper/60">
              {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="mt-3">
            <CategoryList categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
          </div>
          <div className="mt-5">
            <ProductGrid products={filteredProducts} onView={openDetails} onAddToCart={addToCart} />
          </div>
        </div>
      </section>

      <section id="about" className="py-10 md:py-14">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-lg font-semibold text-ink dark:text-paper">
              About {mockStore.name}
            </h2>
            <p className="mt-3 text-balance text-ink-light dark:text-paper/70">{mockStore.description}</p>
          </div>
        </div>
      </section>

      <div id="contact">
        <StoreInfo location={mockStore.location} phone={mockStore.phone} email={mockStore.email} />
      </div>

      <StoreFooter storeName={mockStore.name} />

      <ProductDetails
        product={selectedProduct}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onAddToCart={addToCart}
      />

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeItem}
        onCheckout={() => console.log("Checkout — requires authentication (future feature)")}
      />
    </div>
  );
}

export default StoreFront