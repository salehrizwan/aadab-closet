import heroImage from '../assets/images/sapphire_style_hero2_1784351582658.jpg';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slideImages = [
  '/1st_enter.png',
  heroImage
];

const slidesData = [
  {
    title: "AADAB CLOSET",
    subtitle: "READY TO WEAR",
    linkText: "SHOP NEW ARRIVALS",
  },
  {
    title: "SPRING FESTIVE",
    subtitle: "LUXURY EMBROIDERIES",
    linkText: "DISCOVER THE CATALOGUE",
  }
];

interface HeroProps {
  onExplore: () => void;
  onNewArrivals: () => void;
}

export default function Hero({ onExplore, onNewArrivals }: HeroProps) {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slideImages.length);
  };

  const currentSlide = slidesData[current];

  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 pt-[60px] md:pt-[68px]">
      {/* Widescreen Banner Container (approx. 16:9 on desktop, responsive heights) */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16:10] lg:aspect-[16:9] overflow-hidden group">
        
        {/* Animated Slide Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-neutral-950"
          >
            {/* Elegant blurred background to fill any letterbox areas beautifully without empty spaces */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl scale-110 opacity-40 pointer-events-none"
              style={{ backgroundImage: `url(${slideImages[current]})` }}
            />
            
            {/* Main fully-visible image containing all articles/models from top to bottom */}
            <img
              src={slideImages[current]}
              alt={currentSlide.title}
            className="relative w-full h-full object-contain pointer-events-none z-10 bg-black"
              referrerPolicy="no-referrer"
            />
            {/* Subtle premium gradient overlay at bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows on Left and Right (Vogue Style, visible on hover) */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-xs transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer z-10"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-xs transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer z-10"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>

        {/* Center Overlay Text perfectly centered directly on the image with zero boxes or borders */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl space-y-4 md:space-y-6"
            >
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-[0.18em] font-light text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.85)]">
                {currentSlide.title}
              </h2>
              <p className="font-sans text-[11px] md:text-xs tracking-[0.35em] uppercase font-bold text-gold-200 drop-shadow-[0_1.5px_8px_rgba(0,0,0,0.95)]">
                {currentSlide.subtitle}
              </p>
              <div className="pt-4 md:pt-6">
                <button
                  onClick={current === 0 ? onNewArrivals : onExplore}
                  className="inline-block text-[11px] md:text-xs tracking-[0.3em] text-white hover:text-gold-200 font-bold uppercase border-b-2 border-white hover:border-gold-200 pb-1.5 transition-colors duration-300 cursor-pointer drop-shadow-[0_1.5px_5px_rgba(0,0,0,0.85)]"
                >
                  {currentSlide.linkText}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Progress Dots / Line Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2.5 z-10">
          {slideImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                current === idx ? 'bg-white scale-125 px-2' : 'bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
