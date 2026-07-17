import { useState } from 'react';
import { Menu, Search, Heart, ShoppingBag, User, MapPin, ChevronDown, X, Scissors } from 'lucide-react';
import { Region } from '../types';

interface HeaderProps {
  selectedRegion: Region;
  onSwitchRegion: () => void;
  cartCount: number;
  wishlistCount: number;
  onNavigate: (screen: string, categoryFilter?: string) => void;
  onCartToggle: () => void;
  onWishlistToggle: () => void;
  onSearchOpen: () => void;
  onCustomOrderOpen: () => void;
}

export default function Header({
  selectedRegion,
  onSwitchRegion,
  cartCount,
  wishlistCount,
  onNavigate,
  onCartToggle,
  onWishlistToggle,
  onSearchOpen,
  onCustomOrderOpen,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic background color/border on scroll
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }

  const handleCategoryClick = (category: string) => {
    onNavigate('home', category);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const grid = document.getElementById('products-section');
      if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans ${
        scrolled
          ? 'bg-white border-b border-neutral-100 py-3 shadow-xs'
          : 'bg-white border-b border-neutral-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left Side: Hamburger Menu & Logo */}
          <div className="flex items-center space-x-6">
            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-neutral-800 hover:text-black transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              <Menu size={20} strokeWidth={1.8} />
            </button>

            {/* Brand Logo - Spaced Bold Clean, inspired by Sapphire */}
            <button
              onClick={() => onNavigate('home', 'All')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <h1 className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-neutral-900 font-bold leading-none transition-all duration-300">
                AADAB
              </h1>
              <p className="text-[7.5px] tracking-[0.55em] text-gold-500 uppercase font-mono mt-1 text-left">
                CLOSET
              </p>
            </button>
          </div>

          {/* Center Navigation Categories - Hidden on mobile, beautiful row below on small screens or centered inline */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleCategoryClick('All')}
              className="text-[11px] tracking-[0.2em] uppercase text-neutral-600 hover:text-black font-medium transition-colors cursor-pointer"
            >
              WOMAN
            </button>
            <button
              onClick={() => handleCategoryClick('Signature Collection')}
              className="text-[11px] tracking-[0.2em] uppercase text-neutral-600 hover:text-black font-medium transition-colors cursor-pointer"
            >
              SIGNATURE
            </button>
            <button
              onClick={() => handleCategoryClick('Everyday Elegance')}
              className="text-[11px] tracking-[0.2em] uppercase text-neutral-600 hover:text-black font-medium transition-colors cursor-pointer"
            >
              EVERYDAY PREP
            </button>
            <button
              onClick={() => handleCategoryClick('Limited Edition')}
              className="text-[11px] tracking-[0.2em] uppercase text-neutral-600 hover:text-black font-medium transition-colors cursor-pointer"
            >
              LIMITED EDITION
            </button>
            <button
              onClick={onCustomOrderOpen}
              className="text-[11px] tracking-[0.2em] uppercase text-gold-500 hover:text-gold-600 font-semibold transition-colors cursor-pointer"
            >
              BESPOKE TAILORING
            </button>
          </nav>

          {/* Right Side: Tools & Cart, Wishlist, Account, Region Selector */}
          <div className="flex items-center space-x-1.5 md:space-x-4">
            
            {/* Region Toggle */}
            <button
              onClick={onSwitchRegion}
              className="flex items-center space-x-1 hover:bg-neutral-50 px-2 py-1 transition-all duration-200 cursor-pointer border border-transparent"
            >
              <MapPin size={11} className="text-neutral-500" />
              <span className="text-[9.5px] font-mono tracking-wider text-neutral-700">
                {selectedRegion === Region.Pakistan ? 'PKR' : 'BDT'}
              </span>
              <ChevronDown size={8} className="text-neutral-400" />
            </button>

            {/* Search */}
            <button
              onClick={onSearchOpen}
              className="p-2 text-neutral-700 hover:text-black transition-colors cursor-pointer"
              title="Search"
            >
              <Search size={17} strokeWidth={1.5} />
            </button>

            {/* Account */}
            <button
              onClick={() => onNavigate('account')}
              className="p-2 text-neutral-700 hover:text-black transition-colors cursor-pointer hidden sm:inline-block"
              title="My Account"
            >
              <User size={17} strokeWidth={1.5} />
            </button>

            {/* Wishlist */}
            <button
              onClick={onWishlistToggle}
              className="p-2 text-neutral-700 hover:text-black transition-colors relative cursor-pointer"
              title="Wishlist"
            >
              <Heart size={17} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-black text-white text-[7px] font-mono w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag with item bubble */}
            <button
              onClick={onCartToggle}
              className="p-2 text-neutral-700 hover:text-black transition-colors relative cursor-pointer"
              title="Shopping Bag"
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-gold-400 text-black text-[7px] font-mono w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Slide-out Mobile Navigation Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] md:top-[68px] z-30 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer Body */}
          <div className="w-72 bg-white h-full relative z-10 flex flex-col justify-between py-8 px-6 shadow-2xl border-r border-neutral-100">
            <div className="space-y-8">
              <span className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase font-mono block">
                Boutique Directory
              </span>
              
              <div className="space-y-6">
                <button
                  onClick={() => handleCategoryClick('All')}
                  className="block text-sm tracking-widest uppercase text-neutral-800 hover:text-black text-left font-serif"
                >
                  Woman Catalog
                </button>
                <button
                  onClick={() => handleCategoryClick('Signature Collection')}
                  className="block text-sm tracking-widest uppercase text-neutral-800 hover:text-black text-left font-serif"
                >
                  Signature Silk
                </button>
                <button
                  onClick={() => handleCategoryClick('Everyday Elegance')}
                  className="block text-sm tracking-widest uppercase text-neutral-800 hover:text-black text-left font-serif"
                >
                  Everyday Prep
                </button>
                <button
                  onClick={() => handleCategoryClick('Limited Edition')}
                  className="block text-sm tracking-widest uppercase text-neutral-800 hover:text-black text-left font-serif"
                >
                  Limited Edition
                </button>
                <button
                  onClick={() => {
                    onCustomOrderOpen();
                    setMobileMenuOpen(false);
                  }}
                  className="block text-sm tracking-widest uppercase text-gold-600 hover:text-gold-700 text-left font-serif font-medium"
                >
                  Bespoke Tailoring
                </button>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-6 space-y-4 text-xs font-light text-neutral-500">
              <p>Karachi • Dhaka • Global Delivery</p>
              <p className="text-[10px] tracking-widest text-gold-500 font-serif">“She Wears Aadab”</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
