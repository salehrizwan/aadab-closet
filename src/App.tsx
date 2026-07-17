import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Region, CartItem } from './types';
import { PRODUCTS, formatPrice } from './data';

// Components
import OpeningAnimation from './components/OpeningAnimation';
import RegionSelection from './components/RegionSelection';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductsGrid from './components/ProductsGrid';
import ProductDetails from './components/ProductDetails';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import CustomOrderModal from './components/CustomOrderModal';
import Footer from './components/Footer';

// Icons
import { Heart, ShoppingBag, X, Check, MapPin, Sparkles, Phone, HelpCircle } from 'lucide-react';

export default function App() {
  // App States
  const [showAnimation, setShowAnimation] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [activeScreen, setActiveScreen] = useState<string>('home'); // home, collections, new-arrivals, account
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Wishlist State (with localStorage persistence)
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<{ title: string; content: React.ReactNode } | null>(null);
  
  // Notification State
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Load persistence
  useEffect(() => {
    const savedRegion = localStorage.getItem('aadab_region') as Region;
    if (savedRegion) {
      setSelectedRegion(savedRegion);
    }

    const savedCart = localStorage.getItem('aadab_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart', e);
      }
    }

    const savedWishlist = localStorage.getItem('aadab_wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Error loading wishlist', e);
      }
    }
  }, []);

  // Sync utilities
  const triggerNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    localStorage.setItem('aadab_region', region);
    triggerNotification(`Switched store location to ${region === 'PK' ? 'Pakistan' : 'Bangladesh'}.`);
  };

  const handleWishlistToggle = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    let updated: string[];
    if (wishlist.includes(productId)) {
      updated = wishlist.filter(id => id !== productId);
      triggerNotification(`Removed ${product?.name} from wishlist.`, 'info');
    } else {
      updated = [...wishlist, productId];
      triggerNotification(`Added ${product?.name} to wishlist.`);
    }
    setWishlist(updated);
    localStorage.setItem('aadab_wishlist', JSON.stringify(updated));
  };

  const handleAddToCart = (product: Product, size: string) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      let updatedCart: CartItem[];

      if (existingIdx > -1) {
        updatedCart = [...prevCart];
        updatedCart[existingIdx].quantity += 1;
      } else {
        updatedCart = [...prevCart, { product, size, quantity: 1 }];
      }

      localStorage.setItem('aadab_cart', JSON.stringify(updatedCart));
      return updatedCart;
    });

    triggerNotification(`Added ${product.name} (Size: ${size}) to your Shopping Bag.`);
  };

  const handleUpdateQuantity = (productId: string, size: string, change: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const nextQty = item.quantity + change;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      localStorage.setItem('aadab_cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => !(item.product.id === productId && item.size === size)
      );
      localStorage.setItem('aadab_cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
    triggerNotification('Item removed from Shopping Bag.', 'info');
  };

  const handleInstantBuyNow = (product: Product, size: string) => {
    // Add to cart if not present
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      let updatedCart: CartItem[];

      if (existingIdx > -1) {
        updatedCart = [...prevCart];
      } else {
        updatedCart = [...prevCart, { product, size, quantity: 1 }];
      }

      localStorage.setItem('aadab_cart', JSON.stringify(updatedCart));
      return updatedCart;
    });

    // Close details page, open checkout
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompletion = () => {
    // Empty cart upon successful order dispatch
    setCart([]);
    localStorage.removeItem('aadab_cart');
    triggerNotification('🌸 Your order has been logged! Sending details to WhatsApp...');
  };

  // Switch Screen Navigation wrapper
  const handleNavigation = (screen: string, categoryFilter: string = 'All') => {
    setActiveScreen(screen);
    setActiveCategory(categoryFilter);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Footer Links Policy Handlers
  const openPolicyModal = (policyType: string) => {
    let title = '';
    let content: React.ReactNode = null;

    switch (policyType) {
      case 'policy-shipping':
        title = 'Shipping & Logistics Policy';
        content = (
          <div className="space-y-4 text-xs font-light leading-relaxed">
            <p><strong>Domestic Shipping (Pakistan):</strong> All standard orders inside Pakistan are fulfilled directly from our Karachi studio. Delivery typically takes 3 to 5 business days. We offer free nationwide shipping for orders exceeding PKR 15,000, with a base rate of PKR 350 for smaller packages.</p>
            <p><strong>International Express Shipping (Bangladesh):</strong> To accommodate our expanding clientele in Dhaka and beyond, international express shipments are dispatched via DHL/FedEx. A fixed delivery charge equivalent to <strong>PKR 5,000 (BDT 2,100 equivalent)</strong> is auto-calculated at checkout. Delivery takes approximately 8 to 12 business days.</p>
            <p><strong>Custom & Pre-Orders:</strong> Custom orders or bespoke tailored sizing requests require 7-10 additional working days for craftsmanship, stitching, and finishing before dispatch.</p>
          </div>
        );
        break;
      case 'policy-returns':
        title = 'Returns, Exchanges & Alterations';
        content = (
          <div className="space-y-4 text-xs font-light leading-relaxed">
            <p>Since Aadab Closet operates on premium high-end fabrics and limited-batch designer cuts, we strive for flawless client satisfaction. We accept exchanges within 7 days of delivery under the following conditions:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>The garment must be unworn, unwashed, and retained in original packaging with all boutique tags intact.</li>
              <li>Bespoke custom orders (tailored sizes, customized lengths) are meticulously handcrafted to your specific metrics and are <strong>not eligible for exchange or refund</strong> unless a production defect is verified.</li>
              <li>To initiate an exchange, please forward your order invoice ticket directly to our WhatsApp support line (+92 300 1234567). Our کراچی studio will gladly coordinate.</li>
            </ul>
          </div>
        );
        break;
      case 'policy-privacy':
        title = 'Boutique Privacy Guidelines';
        content = (
          <div className="space-y-3 text-xs font-light leading-relaxed">
            <p>At Aadab Closet, we treat our clients data with the utmost discretion. Your personal contact details (Name, Email, WhatsApp number, Shipping Address) are solely used to structure your customized fashion orders, handle billing parameters, and coordinate localized shipment dispatches.</p>
            <p>We do not store credit card credentials on server-side modules; all payments are processed through secure global gateways like Stripe or standard bank transfers.</p>
          </div>
        );
        break;
      case 'policy-terms':
        title = 'Terms & Conditions of Service';
        content = (
          <div className="space-y-3 text-xs font-light leading-relaxed">
            <p>Welcome to Aadab Closet. By purchasing our luxury apparel, you agree to comply with our boutique guidelines:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Product pricing is subject to live currency conversion if Bangladesh store region is chosen.</li>
              <li>Color variation of 5-10% may occur due to photographic studio lighting and individual monitor calibrations.</li>
              <li>Handcrafted embroideries use delicate threads and kora. Please dry clean exclusively as designated in the care guide.</li>
            </ul>
          </div>
        );
        break;
      case 'faq':
        title = 'Boutique FAQs';
        content = (
          <div className="space-y-4 text-xs font-light leading-relaxed">
            <div>
              <h5 className="font-semibold text-neutral-900 mb-1">Q: How do I order a custom length or sleeve modification?</h5>
              <p>A: Simply click the &ldquo;Custom Orders&rdquo; button in the header, specify your measurements, and send the request via WhatsApp! Our studio will customize the fit free of charge.</p>
            </div>
            <div>
              <h5 className="font-semibold text-neutral-900 mb-1">Q: Who are the creators behind Aadab Closet?</h5>
              <p>A: Aadab Closet is proudly founded and managed by three sisters based in Karachi. We design modern, Pinterest-inspired modest wear with premium stitching.</p>
            </div>
            <div>
              <h5 className="font-semibold text-neutral-900 mb-1">Q: Can I pay cash on delivery (COD)?</h5>
              <p>A: COD is available selectively inside Pakistan. For international orders (Bangladesh), pre-payment via secure Bank Transfer, EasyPaisa, JazzCash, or online card gateways is required before shipment dispatch.</p>
            </div>
          </div>
        );
        break;
      case 'contact':
        title = 'Contact Our Design Desk';
        content = (
          <div className="space-y-3 text-xs font-light leading-relaxed">
            <p>Our client care assistants are available 6 days a week to guide your styling questions, sizing dilemmas, or bulk/custom requests.</p>
            <div className="border-t border-neutral-100 pt-3 space-y-1 text-neutral-600">
              <p><strong>Studio Location:</strong> DHA Phase 6, Karachi, Pakistan</p>
              <p><strong>WhatsApp Support:</strong> +92 300 1234567</p>
              <p><strong>Direct Helpline:</strong> +92 21 35123456</p>
              <p><strong>Official Email:</strong> studio@aadabcloset.com</p>
            </div>
          </div>
        );
        break;
      default:
        return;
    }

    setActivePolicy({ title, content });
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white flex flex-col font-sans">
      
      {/* Cinematic Opening Animation */}
      <AnimatePresence>
        {showAnimation && (
          <OpeningAnimation onComplete={() => setShowAnimation(false)} />
        )}
      </AnimatePresence>

      {/* Region Selection Screen */}
      {!showAnimation && !selectedRegion && (
        <RegionSelection onSelect={handleRegionSelect} />
      )}

      {/* Main Website View Layout */}
      {!showAnimation && selectedRegion && (
        <>
          {/* Global Sticky Header */}
          <Header
            selectedRegion={selectedRegion}
            onSwitchRegion={() => setSelectedRegion(null)} // resets region state to show prompt screen
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            wishlistCount={wishlist.length}
            onNavigate={handleNavigation}
            onCartToggle={() => setIsCartOpen(true)}
            onWishlistToggle={() => setIsWishlistOpen(true)}
            onSearchOpen={() => {
              setActiveScreen('home');
              const searchInput = document.getElementById('products-section');
              if (searchInput) searchInput.scrollIntoView({ behavior: 'smooth' });
            }}
            onCustomOrderOpen={() => setIsCustomOrderOpen(true)}
          />

          {/* Dynamic Core Screen Render */}
          <main className="flex-grow pt-10">
            <AnimatePresence mode="wait">
              {selectedProduct ? (
                /* PRODUCT DETAIL SUB-SCREEN */
                <motion.div
                  key="product-details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductDetails
                    product={selectedProduct}
                    region={selectedRegion}
                    wishlist={wishlist}
                    onWishlistToggle={handleWishlistToggle}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleInstantBuyNow}
                    onClose={() => setSelectedProduct(null)}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    onImageClick={(img) => setLightboxImage(img)}
                  />
                </motion.div>
              ) : (
                /* MAIN CATALOG / LANDING PAGE */
                <motion.div
                  key="main-catalog"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Hero Slider Block */}
                  <Hero
                    onExplore={() => {
                      const grid = document.getElementById('products-section');
                      if (grid) grid.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onNewArrivals={() => {
                      setActiveCategory('New Arrivals');
                      const grid = document.getElementById('products-section');
                      if (grid) grid.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />

                  {/* Products Grid with Filter Tabs & Search */}
                  <ProductsGrid
                    region={selectedRegion}
                    wishlist={wishlist}
                    onWishlistToggle={handleWishlistToggle}
                    onQuickView={(p) => setSelectedProduct(p)}
                    onAddToCart={handleAddToCart}
                    onImageClick={(img) => setLightboxImage(img)}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Footer layout */}
          <Footer onNavigate={openPolicyModal} />

          {/* WISHLIST SIDE DRAWER PANEL */}
          <AnimatePresence>
            {isWishlistOpen && (
              <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsWishlistOpen(false)} />
                <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    className="w-screen max-w-md bg-white flex flex-col shadow-2xl h-full"
                  >
                    <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Heart className="text-red-500 fill-red-500" size={16} />
                        <h3 className="font-serif text-lg tracking-wide text-neutral-900">Your Saved Wishlist</h3>
                        <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded-full text-neutral-500">
                          {wishlist.length} saved
                        </span>
                      </div>
                      <button onClick={() => setIsWishlistOpen(false)} className="p-1 hover:bg-neutral-50 rounded-full cursor-pointer">
                        <X size={16} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {wishlist.length > 0 ? (
                        PRODUCTS.filter(p => wishlist.includes(p.id)).map((p) => (
                          <div key={p.id} className="flex items-center space-x-4 pb-4 border-b border-neutral-50">
                            <div className="w-16 aspect-[3/4] bg-neutral-100 overflow-hidden border shrink-0">
                              <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-grow min-w-0">
                              <h4 className="font-serif text-sm text-neutral-900 truncate">{p.name}</h4>
                              <p className="text-xs font-mono text-neutral-500 mt-0.5">{formatPrice(p.pricePKR, selectedRegion)}</p>
                              
                              <div className="flex gap-2 mt-2.5">
                                <button
                                  onClick={() => {
                                    handleAddToCart(p, 'S');
                                    setIsWishlistOpen(false);
                                    setIsCartOpen(true);
                                  }}
                                  className="bg-black text-white text-[9px] tracking-widest uppercase px-3 py-1.5 font-sans"
                                >
                                  Add to Bag
                                </button>
                                <button
                                  onClick={() => handleWishlistToggle(p.id)}
                                  className="border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 text-[9px] tracking-widest uppercase px-3 py-1.5 font-sans"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                          <Heart size={32} className="text-neutral-300 mb-4 stroke-[1.2]" />
                          <h4 className="font-serif text-base text-neutral-700 font-light">Your wishlist is empty</h4>
                          <p className="text-xs text-neutral-400 max-w-[200px] leading-relaxed mt-2">
                            Save garments you love to keep track of them here.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* CART DRAWER PANEL */}
          <AnimatePresence>
            {isCartOpen && (
              <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                region={selectedRegion}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
              />
            )}
          </AnimatePresence>

          {/* BESPOKE CUSTOM TAILORING MODAL */}
          <AnimatePresence>
            {isCustomOrderOpen && (
              <CustomOrderModal
                isOpen={isCustomOrderOpen}
                onClose={() => setIsCustomOrderOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* SECURE CHECKOUT MODAL */}
          <AnimatePresence>
            {isCheckoutOpen && (
              <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                cart={cart}
                region={selectedRegion}
                onOrderSuccess={handleOrderCompletion}
              />
            )}
          </AnimatePresence>

          {/* FOOTER POLICIES EDITORIAL MODAL */}
          <AnimatePresence>
            {activePolicy && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActivePolicy(null)} />
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white text-black max-w-lg w-full p-6 md:p-8 relative shadow-2xl z-10 border border-neutral-100"
                >
                  <button onClick={() => setActivePolicy(null)} className="absolute top-5 right-5 text-neutral-400 hover:text-black cursor-pointer">
                    <X size={18} />
                  </button>
                  <h3 className="font-serif text-2xl tracking-wide text-neutral-950 font-light mb-4 border-b border-neutral-100 pb-3">
                    {activePolicy.title}
                  </h3>
                  <div className="max-h-[60vh] overflow-y-auto pr-2">
                    {activePolicy.content}
                  </div>
                  <div className="mt-8 pt-4 border-t border-neutral-100 text-right">
                    <button
                      onClick={() => setActivePolicy(null)}
                      className="bg-black text-white px-6 py-2.5 text-[10px] tracking-widest uppercase hover:bg-neutral-800 font-medium"
                    >
                      Acknowledge & Close
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* GLOBAL DYNAMIC ALERT / TOAST COMPONENT */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: 50, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 20, x: '-50%' }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-3 bg-neutral-900 text-white px-6 py-4 shadow-2xl border border-neutral-800"
              >
                <div className="w-2 h-2 rounded-full bg-gold-400 animate-ping"></div>
                <span className="text-xs font-mono tracking-wider font-light">{notification.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HIGH-QUALITY LIGHTBOX MODAL */}
          <AnimatePresence>
            {lightboxImage && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
                {/* Backdrop with elegant blur */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLightboxImage(null)}
                  className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
                />

                {/* Lightbox Content Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="relative z-10 max-h-[85vh] max-w-[90vw] flex flex-col items-center justify-center select-none"
                >
                  {/* High Quality Responsive Image */}
                  <img
                    src={lightboxImage}
                    alt="Boutique high-resolution detail view"
                    className="max-h-[80vh] max-w-[90vw] object-contain shadow-2xl border border-neutral-800/30 bg-neutral-900/10 rounded-sm"
                    referrerPolicy="no-referrer"
                  />

                  {/* Close button overlay */}
                  <div className="absolute -top-14 right-0 flex items-center space-x-3">
                    <button
                      onClick={() => setLightboxImage(null)}
                      className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 cursor-pointer backdrop-blur-xs border border-white/10 hover:scale-105"
                      title="Close View"
                    >
                      <X size={18} strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Elegant bottom label */}
                  <div className="mt-4 text-center text-white/60 text-[10px] tracking-[0.3em] uppercase font-mono">
                    Press anywhere to return
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </>
      )}

    </div>
  );
}
