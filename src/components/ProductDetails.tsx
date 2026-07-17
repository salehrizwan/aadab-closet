import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Product, Region } from '../types';
import { PRODUCTS, formatPrice, TESTIMONIALS } from '../data';
import { Heart, ShoppingBag, Truck, Info, Scissors, ShieldAlert, Sparkles, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  region: Region;
  wishlist: string[];
  onWishlistToggle: (productId: string) => void;
  onAddToCart: (product: Product, size: string) => void;
  onBuyNow: (product: Product, size: string) => void;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onImageClick?: (imageUrl: string) => void;
}

export default function ProductDetails({
  product,
  region,
  wishlist,
  onWishlistToggle,
  onAddToCart,
  onBuyNow,
  onClose,
  onSelectProduct,
  onImageClick,
}: ProductDetailsProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('S');
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'stitching' | 'care'>('details');
  const [zoomScale, setZoomScale] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isWishlisted = wishlist.includes(product.id);

  const safeActiveImageIndex = useMemo(() => {
    return activeImageIndex >= product.images.length ? 0 : activeImageIndex;
  }, [activeImageIndex, product.images.length]);

  // Filter recommendations: 3 products in the same collection (excluding current)
  const recommendations = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
  }, [product.id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button to Catalog */}
        <button
          onClick={onClose}
          className="group flex items-center space-x-2 text-xs tracking-widest uppercase text-neutral-500 hover:text-black mb-8 cursor-pointer transition-all font-mono"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Catalog</span>
        </button>

        {/* Two-Column Grid: Images and Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Zoom Gallery (5 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4">
            
            {/* Thumbnail vertical list (2 columns) */}
            <div className="col-span-2 flex flex-col space-y-3">
              {product.images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[3/4] border overflow-hidden transition-all duration-300 ${
                    safeActiveImageIndex === idx ? 'border-black' : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Main Interactive Zoom Box (10 columns) */}
            <div className="col-span-10 relative aspect-[3/4] overflow-hidden border border-neutral-100 bg-neutral-50">
              <div
                onClick={() => {
                  if (onImageClick) {
                    onImageClick(product.images[safeActiveImageIndex]);
                  }
                }}
                className="w-full h-full cursor-zoom-in relative"
                onMouseEnter={() => setZoomScale(true)}
                onMouseLeave={() => setZoomScale(false)}
                onMouseMove={handleMouseMove}
              >
                <motion.img
                  src={product.images[safeActiveImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-100 origin-center"
                  style={{
                    transform: zoomScale ? 'scale(2)' : 'scale(1)',
                    transformOrigin: zoomScale ? `${mousePos.x}% ${mousePos.y}%` : 'center',
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Zoom prompt badge */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[8px] tracking-[0.25em] uppercase px-3 py-1 font-mono pointer-events-none">
                Hover image to zoom
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Config, Details Accordion (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Brand and category */}
            <span className="text-[10px] tracking-[0.4em] text-gold-500 uppercase font-mono font-medium mb-2">
              Aadab Closet • {product.category}
            </span>

            {/* Product Name */}
            <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 tracking-wide font-light mb-3">
              {product.name}
            </h1>

            {/* Dynamic Price display */}
            <div className="text-xl font-sans font-medium text-neutral-900 mb-6">
              {formatPrice(product.pricePKR, region)}
            </div>

            {/* Quick snippet on Brand Integrity */}
            <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light mb-6 pb-6 border-b border-neutral-100">
              {product.description}
            </p>

            {/* Available Articles Style Selector */}
            <div className="mb-8 border-b border-neutral-100 pb-6">
              <span className="text-[11px] tracking-widest text-neutral-900 font-mono uppercase block mb-3">Available Articles</span>
              <div className="flex gap-4">
                {PRODUCTS.map((p) => {
                  const isCurrent = p.id === product.id;
                  const label = p.id === 'nura-organza' ? 'Article 01' : p.id === 'zoya-velvet' ? 'Article 02' : 'Article 03';
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        setActiveImageIndex(0); // reset active image to front
                      }}
                      className="group relative flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer"
                    >
                      <div className={`w-16 h-20 border overflow-hidden transition-all duration-300 bg-neutral-50 ${
                        isCurrent ? 'border-neutral-900 ring-1 ring-neutral-900 scale-102' : 'border-neutral-200 hover:border-neutral-400'
                      }`}>
                        <img 
                          src={p.images[0]} 
                          alt={p.name} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer" 
                        />
                      </div>
                      <span className={`text-[9.5px] tracking-wider uppercase font-mono transition-colors ${
                        isCurrent ? 'text-neutral-900 font-semibold' : 'text-neutral-400 group-hover:text-neutral-600'
                      }`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] tracking-widest text-neutral-900 font-mono uppercase">Select Size</span>
                <span className="text-[10px] tracking-wider text-neutral-400 font-sans">True to size</span>
              </div>
              
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-11 text-xs font-mono font-medium tracking-wider flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col gap-3 mb-10">
              <div className="flex gap-3">
                {/* Add to Bag Button */}
                <button
                  onClick={() => onAddToCart(product, selectedSize)}
                  className="flex-1 bg-black text-white hover:bg-neutral-800 h-14 text-xs tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer border border-black hover:tracking-[0.3em]"
                >
                  <ShoppingBag size={14} />
                  <span>Add to Bag</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onWishlistToggle(product.id)}
                  className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isWishlisted
                      ? 'border-red-500 bg-red-50/20 text-red-500'
                      : 'border-neutral-200 hover:border-black text-neutral-700'
                  }`}
                  title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart size={16} className={isWishlisted ? 'fill-red-500' : ''} />
                </button>
              </div>

              {/* Buy Now Button (Instant checkout) */}
              <button
                onClick={() => onBuyNow(product, selectedSize)}
                className="w-full border border-gold-400 bg-gold-50/30 text-gold-600 hover:bg-gold-100 hover:text-gold-700 h-14 text-xs tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 flex items-center justify-center cursor-pointer hover:tracking-[0.3em]"
              >
                <span>Instant Buy Now</span>
              </button>
            </div>

            {/* Expandable Tabs for Premium Specs */}
            <div className="border-t border-neutral-100 pt-6">
              <div className="flex border-b border-neutral-100 pb-3 gap-6 mb-4">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`text-[10px] tracking-widest uppercase font-mono pb-1 relative transition-colors ${
                    activeTab === 'details' ? 'text-black font-semibold' : 'text-neutral-400 hover:text-neutral-800'
                  }`}
                >
                  Specs
                </button>
                <button
                  onClick={() => setActiveTab('fabric')}
                  className={`text-[10px] tracking-widest uppercase font-mono pb-1 relative transition-colors ${
                    activeTab === 'fabric' ? 'text-black font-semibold' : 'text-neutral-400 hover:text-neutral-800'
                  }`}
                >
                  Fabric
                </button>
                <button
                  onClick={() => setActiveTab('stitching')}
                  className={`text-[10px] tracking-widest uppercase font-mono pb-1 relative transition-colors ${
                    activeTab === 'stitching' ? 'text-black font-semibold' : 'text-neutral-400 hover:text-neutral-800'
                  }`}
                >
                  Stitching
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`text-[10px] tracking-widest uppercase font-mono pb-1 relative transition-colors ${
                    activeTab === 'care' ? 'text-black font-semibold' : 'text-neutral-400 hover:text-neutral-800'
                  }`}
                >
                  Care & Delivery
                </button>
              </div>

              {/* Tab Content Panels */}
              <div className="text-xs leading-relaxed text-neutral-600 font-sans font-light min-h-[100px]">
                {activeTab === 'details' && (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2.5">
                      <Sparkles size={13} className="text-gold-400 mt-0.5 shrink-0" />
                      <span>Premium Karachi Modest Collection • Elegant Pinterest Aesthetic.</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Info size={13} className="text-neutral-400 mt-0.5 shrink-0" />
                      <span>Includes handcrafted detailing on neckline and arm-cuffs.</span>
                    </div>
                  </div>
                )}
                {activeTab === 'fabric' && (
                  <p>{product.fabric}</p>
                )}
                {activeTab === 'stitching' && (
                  <div className="space-y-2">
                    <p>{product.stitching}</p>
                    <div className="flex items-center space-x-2 text-[10px] text-neutral-500 font-mono mt-2">
                      <Scissors size={11} />
                      <span>Custom tailoring pattern refined for beautiful drapery</span>
                    </div>
                  </div>
                )}
                {activeTab === 'care' && (
                  <div className="space-y-4">
                    <div>
                      <span className="block font-medium text-neutral-900 mb-1">Care Guidelines:</span>
                      <p>{product.care}</p>
                    </div>
                    <div>
                      <span className="block font-medium text-neutral-900 mb-1">Estimated Shipping:</span>
                      <p>{region === 'PK' ? product.delivery.PK : product.delivery.BD}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* CUSTOMER TESTIMONIALS + image.png SIDE-BY-SIDE SECTION (MANDATORY REQUIREMENT) */}
        <section className="mt-32 pt-20 border-t border-neutral-100">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase font-mono block mb-2">
              Our Community
            </span>
            <h3 className="font-serif text-3xl text-neutral-950 font-light tracking-wide">
              Sisterhood & Voices
            </h3>
            <p className="text-xs text-neutral-500 font-sans mt-3">
              Aadab Closet is loved by women who embrace elegance and modesty. Read genuine reviews from our client base in Karachi & Dhaka.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((test) => (
                <div key={test.id} className="p-6 border border-neutral-100 bg-neutral-50/50 flex flex-col justify-between">
                  <div>
                    {/* Rating Stars */}
                    <div className="flex space-x-1 mb-3 text-gold-400">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} size={11} className="fill-gold-400 text-gold-400" />
                      ))}
                    </div>

                    <p className="text-xs text-neutral-700 leading-relaxed font-sans italic mb-4">
                      &ldquo;{test.comment}&rdquo;
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] tracking-wider text-neutral-500 font-sans mt-4 pt-3 border-t border-neutral-100/50">
                    <span className="font-medium text-neutral-900">{test.name}</span>
                    <span className="font-mono text-[9px]">{test.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECOMMENDATIONS: YOU MAY ALSO LIKE */}
        <section className="mt-32 pt-20 border-t border-neutral-100">
          <h3 className="font-serif text-2xl text-neutral-950 font-light tracking-wide mb-12 text-center">
            You May Also Like
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {recommendations.map((recProduct) => (
              <div
                key={recProduct.id}
                onClick={() => {
                  onSelectProduct(recProduct);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer group flex flex-col text-center"
              >
                <div className="aspect-[3/4] overflow-hidden bg-neutral-50 mb-3 relative">
                  <img
                    src={recProduct.images[0]}
                    alt={recProduct.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                </div>
                <h4 className="font-serif text-sm text-neutral-950 group-hover:text-gold-500 transition-colors">
                  {recProduct.name}
                </h4>
                <p className="text-[11px] font-mono text-neutral-500 mt-1">
                  {formatPrice(recProduct.pricePKR, region)}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
