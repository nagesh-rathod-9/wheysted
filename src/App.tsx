import React, { useState, useEffect } from 'react';
import { Product, FlavorOption, WeightOption, CartItem, ActiveFilterCategory } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExplodedScienceSection } from './components/ExplodedScienceSection';
import { ProductGrid } from './components/ProductGrid';
import { FlavorLabExperience } from './components/FlavorLabExperience';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { MacroCalculator } from './components/MacroCalculator';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [heroProduct, setHeroProduct] = useState<Product>(PRODUCTS[0]);
  const [heroFlavor, setHeroFlavor] = useState<FlavorOption>(PRODUCTS[0].flavors[0]);
  const [activeCategory, setActiveCategory] = useState<ActiveFilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart State (Initialized from LocalStorage if available)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wheysted_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isMacroCalcOpen, setIsMacroCalcOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wheysted_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Add item to cart handler
  const handleAddToCart = (
    product: Product,
    flavor: FlavorOption = product.flavors[0],
    weight: WeightOption = product.weights[0]
  ) => {
    const cartItemId = `${product.id}-${flavor.id}-${weight.size}`;
    const unitPrice = Math.round(product.basePrice * weight.priceMultiplier);

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedFlavor: flavor,
          selectedWeight: weight,
          quantity: 1,
          unitPrice,
        },
      ];
    });

    showToast(`Added ${product.name} (${flavor.name}) to your cart!`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Open Product Details Modal
  const handleOpenDetailModal = (product: Product) => {
    setDetailProduct(product);
    setIsDetailOpen(true);
  };

  // Handle flavor selection from Flavor Lab
  const handleSelectProductAndFlavor = (product: Product, flavor: FlavorOption) => {
    setHeroProduct(product);
    setHeroFlavor(flavor);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Selected ${flavor.name} for ${product.name}`);
  };

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#e01931] selection:text-white relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-2xl shadow-slate-900/30 animate-fadeIn flex items-center gap-2 border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onOpenMacroCalc={() => setIsMacroCalcOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        heroProduct={heroProduct}
        selectedFlavor={heroFlavor}
        onSelectFlavor={(f) => setHeroFlavor(f)}
        onAddToCart={(prod, flav) => handleAddToCart(prod, flav)}
        onOpenMacroCalc={() => setIsMacroCalcOpen(true)}
        onOpenDetailModal={handleOpenDetailModal}
      />

      {/* The Wheysted Purity Standard */}
      <ExplodedScienceSection product={heroProduct} />

      {/* Product Catalog Grid & Category Filter */}
      <ProductGrid
        products={products}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onAddToCart={handleAddToCart}
        onOpenDetailModal={handleOpenDetailModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Desi Sensory Flavor Lab */}
      <FlavorLabExperience
        products={products}
        onSelectProductAndFlavor={handleSelectProductAndFlavor}
      />

      {/* Real Lab Comparison Matrix */}
      <ComparisonMatrix />

      {/* Footer with Batch Verifier & Trust Badges */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={detailProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Daily Protein Requirement Calculator Modal */}
      <MacroCalculator
        isOpen={isMacroCalcOpen}
        onClose={() => setIsMacroCalcOpen(false)}
        products={products}
        onAddToCart={handleAddToCart}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(prod) => handleOpenDetailModal(prod)}
      />

      {/* Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
