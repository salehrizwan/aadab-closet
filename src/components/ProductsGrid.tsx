import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Region } from '../types';
import { PRODUCTS } from '../data';
import ProductCard from './ProductCard';
import { SlidersHorizontal, Search } from 'lucide-react';

interface ProductsGridProps {
  region: Region;
  wishlist: string[];
  onWishlistToggle: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onImageClick?: (imageUrl: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ProductsGrid({
  region,
  wishlist,
  onWishlistToggle,
  onQuickView,
  onAddToCart,
  onImageClick,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}: ProductsGridProps) {
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    return ['All', 'Signature Collection', 'Everyday Elegance', 'Limited Edition'];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory =
        activeCategory === 'All' ||
        product.category === activeCategory ||
        (activeCategory === 'Best Sellers' && product.featured); // Best sellers are represented by featured flag

      // Search match
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="products-section" className="bg-white py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs tracking-[0.4em] text-neutral-400 uppercase font-sans mb-3">
            Karachi Modest Couture
          </p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-neutral-950 font-light">
            {activeCategory === 'All' ? 'Our Collection' : activeCategory}
          </h2>
          <p className="text-xs text-neutral-500 font-sans font-light mt-3 leading-relaxed">
            Drape yourself in heritage patterns and sleek modern cuts, finished with high-end Pakistani craftsmanship.
          </p>
        </div>

        {/* Filters and Search Bar Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-neutral-100 pb-8 mb-12">
          {/* Categories Horizontal Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto scrollbar-none pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-[11px] tracking-widest uppercase py-2 px-4 transition-all duration-300 relative shrink-0 cursor-pointer ${
                  activeCategory === category
                    ? 'text-black font-semibold'
                    : 'text-neutral-400 hover:text-neutral-800'
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategoryBorder"
                    className="absolute bottom-0 left-4 right-4 h-[1px] bg-black"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Interactive Search Field */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search fabrics, cuts, names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-neutral-200 pl-10 pr-4 py-2.5 text-xs tracking-widest uppercase focus:border-black focus:outline-none transition-colors"
            />
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] tracking-widest uppercase text-neutral-400 hover:text-black font-semibold font-sans"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Counter / Search status */}
        <div className="flex items-center justify-between mb-8 text-xs text-neutral-500 tracking-wider">
          <span>Showing {filteredProducts.length} of {PRODUCTS.length} Outfits</span>
          {searchQuery && (
            <span>
              Searching for &ldquo;<strong className="text-black font-medium">{searchQuery}</strong>&rdquo;
            </span>
          )}
        </div>

        {/* Grid of Outfits */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  region={region}
                  isWishlisted={wishlist.includes(product.id)}
                  onWishlistToggle={() => onWishlistToggle(product.id)}
                  onQuickView={() => onQuickView(product)}
                  onAddToCart={(size) => onAddToCart(product, size)}
                  onImageClick={onImageClick}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-neutral-200">
            <p className="font-serif text-lg text-neutral-400 mb-4 font-light">No garments found matching your filter</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="border border-black text-black text-xs tracking-widest uppercase px-6 py-3 font-sans hover:bg-black hover:text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
