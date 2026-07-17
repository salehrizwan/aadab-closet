import React from 'react';
import { motion } from 'motion/react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product, Region } from '../types';
import { formatPrice } from '../data';

interface ProductCardProps {
  key?: string;
  product: Product;
  region: Region;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  onQuickView: () => void;
  onAddToCart: (size: string) => void;
  onImageClick?: (imageUrl: string) => void;
}

export default function ProductCard({
  product,
  region,
  isWishlisted,
  onWishlistToggle,
  onQuickView,
  onAddToCart,
  onImageClick,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="group flex flex-col relative"
    >
      {/* Image Frame with hover controls */}
      <div 
        onClick={(e) => {
          e.stopPropagation();
          onQuickView();
        }}
        className="aspect-[3/4] w-full overflow-hidden bg-neutral-100 relative mb-4 cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Wishlist Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle();
          }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full border border-neutral-100 hover:bg-white transition-all duration-300 shadow-sm z-10 cursor-pointer"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart
            size={14}
            className={`transition-colors duration-300 ${
              isWishlisted ? 'text-red-500 fill-red-500' : 'text-neutral-700'
            }`}
          />
        </button>

        {/* Hover Quick Actions Layer with premium dark semi-transparent backdrop */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2 z-5">
          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="bg-white text-black text-[10px] tracking-widest uppercase font-sans font-medium py-2.5 px-4 w-full flex items-center justify-center space-x-2 cursor-pointer hover:bg-neutral-50 transition-colors shadow-md"
          >
            <Eye size={12} />
            <span>Quick View</span>
          </button>

          {/* Instant Add Bag Button (standard size S by default) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.sizes[0] || 'S'); // Add 'S' size by default or fallback
            }}
            className="bg-black text-white text-[10px] tracking-widest uppercase font-sans font-medium py-2.5 px-4 w-full flex items-center justify-center space-x-2 cursor-pointer hover:bg-neutral-900 transition-colors shadow-md border border-neutral-800"
          >
            <ShoppingBag size={12} />
            <span>Add to Bag (S)</span>
          </button>
        </div>

        {/* Category Badge overlay on top-left */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 font-mono">
          {product.category}
        </div>
      </div>

      {/* Product Details Section */}
      <div 
        onClick={onQuickView}
        className="flex flex-col flex-grow text-center px-2 cursor-pointer group/details"
      >
        <h4 className="font-serif text-base text-neutral-900 font-light group-hover/details:text-gold-500 group-hover:text-gold-500 transition-colors line-clamp-1">
          {product.name}
        </h4>
        
        {/* Dynamic Price */}
        <p className="font-sans text-xs text-neutral-600 font-medium mt-1">
          {formatPrice(product.pricePKR, region)}
        </p>

        {/* Size chips preview on card */}
        <div className="mt-2.5 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider mr-1">Sizes:</span>
          {product.sizes.map((sz) => (
            <span
              key={sz}
              className="text-[9px] font-mono font-medium text-neutral-600 border border-neutral-100 bg-neutral-50 px-1 rounded-sm"
            >
              {sz}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
