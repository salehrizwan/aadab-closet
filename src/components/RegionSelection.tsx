import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Region } from '../types';

const entranceImg = '/src/assets/images/luxury_modest_entrance_1784351189438.jpg';

interface RegionSelectionProps {
  onSelect: (region: Region) => void;
}

export default function RegionSelection({ onSelect }: RegionSelectionProps) {
  const [detectedRegion, setDetectedRegion] = useState<Region | null>(null);
  const [selectedTempRegion, setSelectedTempRegion] = useState<Region | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Auto-detect visitor region from system timezone or language
  useEffect(() => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone.toLowerCase().includes('karachi') || timeZone.toLowerCase().includes('pakistan')) {
        setDetectedRegion(Region.Pakistan);
      } else if (timeZone.toLowerCase().includes('dhaka') || timeZone.toLowerCase().includes('bangladesh')) {
        setDetectedRegion(Region.Bangladesh);
      } else {
        setDetectedRegion(Region.Pakistan);
      }
    } catch {
      setDetectedRegion(Region.Pakistan);
    }
  }, []);

  const handleCardClick = (region: Region) => {
    setSelectedTempRegion(region);
    
    // If the selected region is different from the detected region, show the friendly confirmation message.
    if (detectedRegion && detectedRegion !== region) {
      setShowConfirmation(true);
    } else {
      onSelect(region);
    }
  };

  const handleConfirmAndProceed = () => {
    if (selectedTempRegion) {
      onSelect(selectedTempRegion);
    }
  };

  return (
    <div className="fixed inset-0 bg-neutral-950 text-white z-45 flex overflow-hidden font-sans">
      
      {/* Left Column: Stunning Editorial Fashion Image (Desktop only) */}
      <div className="hidden lg:block lg:w-1/2 relative h-full bg-neutral-900">
        <img
          src={entranceImg}
          alt="Aadab Closet Luxury Editorial"
          className="absolute inset-0 w-full h-full object-cover opacity-85"
          referrerPolicy="no-referrer"
        />
        {/* Soft luxury vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/20 via-neutral-950/10 to-neutral-950" />
        <div className="absolute inset-0 bg-black/15" />
        
        {/* Elegant typography branding in the image column */}
        <div className="absolute bottom-16 left-16 z-10 max-w-md space-y-3">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[10px] tracking-[0.4em] text-gold-300 uppercase font-mono block"
          >
            Karachi Signature
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-serif text-3xl xl:text-4xl tracking-wide font-light text-white leading-tight"
          >
            Designed with Grace.<br />
            <span className="italic font-normal text-gold-100">Worn with Confidence.</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="w-16 h-[1px] bg-gold-400 origin-left mt-4"
          />
        </div>
      </div>

      {/* Right Column: Clean, Luxurious Form Controls (Full width on mobile, half width on desktop) */}
      <div className="w-full lg:w-1/2 relative h-full flex flex-col items-center justify-center px-6 sm:px-12 xl:px-20 bg-neutral-950">
        
        {/* Background Image overlay for Mobile only */}
        <div className="absolute inset-0 block lg:hidden z-0 bg-neutral-900">
          <img
            src={entranceImg}
            alt="Aadab Closet Luxury Background"
            className="w-full h-full object-cover opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-neutral-950" />
        </div>

        <div className="w-full max-w-md text-center lg:text-left space-y-12 z-10">
          
          {/* Brand Identity Header */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block lg:block"
            >
              <h1 className="font-serif text-3xl tracking-[0.3em] text-white font-light leading-none">
                AADAB
              </h1>
              <span className="text-[10px] tracking-[0.45em] text-gold-300 uppercase mt-2 block font-mono">
                CLOSET
              </span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm mx-auto lg:mx-0"
            >
              Welcome to our boutique. Select your region to view localized pricing, collections, and tailored delivery guidelines.
            </motion.p>
          </div>

          {/* Region Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Pakistan Store Button */}
            <motion.button
              whileHover={{ y: -4, borderColor: '#dab98b' }}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onClick={() => handleCardClick(Region.Pakistan)}
              className={`p-6 border text-left rounded-none cursor-pointer transition-all duration-300 relative bg-neutral-900/40 backdrop-blur-md flex flex-col justify-between h-40 ${
                selectedTempRegion === Region.Pakistan ? 'border-gold-300 bg-neutral-900/80' : 'border-neutral-800 hover:bg-neutral-900/60'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase">
                  PKR STORE
                </span>
                {detectedRegion === Region.Pakistan && (
                  <span className="bg-gold-400/10 text-gold-300 text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-full font-sans">
                    Auto-detected
                  </span>
                )}
              </div>
              
              <div>
                <span className="block font-serif text-xl tracking-wider text-white">Pakistan</span>
                <span className="text-[10px] text-neutral-400 font-light mt-1 block">
                  Studio Hub • Free Domestic Delivery
                </span>
              </div>
            </motion.button>

            {/* Bangladesh Store Button */}
            <motion.button
              whileHover={{ y: -4, borderColor: '#dab98b' }}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onClick={() => handleCardClick(Region.Bangladesh)}
              className={`p-6 border text-left rounded-none cursor-pointer transition-all duration-300 relative bg-neutral-900/40 backdrop-blur-md flex flex-col justify-between h-40 ${
                selectedTempRegion === Region.Bangladesh ? 'border-gold-300 bg-neutral-900/80' : 'border-neutral-800 hover:bg-neutral-900/60'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase">
                  BDT STORE
                </span>
                {detectedRegion === Region.Bangladesh && (
                  <span className="bg-gold-400/10 text-gold-300 text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-full font-sans">
                    Auto-detected
                  </span>
                )}
              </div>
              
              <div>
                <span className="block font-serif text-xl tracking-wider text-white">Bangladesh</span>
                <span className="text-[10px] text-neutral-400 font-light mt-1 block">
                  Intl Line • Express Courier Handover
                </span>
              </div>
            </motion.button>

          </div>

          {/* Confirmation panel if user changes region */}
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 border border-gold-300/30 bg-neutral-900/90 text-left space-y-4"
            >
              <h4 className="font-serif text-sm tracking-wide text-gold-300 font-light">
                Confirm Selected Currency & Shipping Terms
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                You are currently in{' '}
                <strong className="text-white">
                  {detectedRegion === Region.Pakistan ? 'Pakistan' : 'Bangladesh'}
                </strong>
                , but chosen to explore the{' '}
                <strong className="text-white">
                  {selectedTempRegion === Region.Pakistan ? 'Pakistan (PKR)' : 'Bangladesh (BDT)'}
                </strong>{' '}
                catalogue. Delivery metrics and shipping policies will adjust automatically.
              </p>
              <div className="flex gap-3 pt-1">
                <button
                  onClick={handleConfirmAndProceed}
                  className="flex-1 bg-white text-black hover:bg-neutral-200 py-2 text-[10px] tracking-widest uppercase transition-colors font-medium cursor-pointer"
                >
                  Proceed
                </button>
                <button
                  onClick={() => {
                    if (detectedRegion) {
                      setSelectedTempRegion(detectedRegion);
                      setShowConfirmation(false);
                      onSelect(detectedRegion);
                    }
                  }}
                  className="flex-1 border border-neutral-700 bg-transparent text-neutral-400 hover:text-white py-2 text-[10px] tracking-widest uppercase transition-colors font-sans cursor-pointer"
                >
                  Use {detectedRegion === Region.Pakistan ? 'PKR' : 'BDT'}
                </button>
              </div>
            </motion.div>
          )}

          {/* Footer credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-wider text-neutral-500 gap-2"
          >
            <span>کراچی • ঢাকা • International Modest Luxury</span>
            <span className="italic font-serif text-gold-300/60 font-light">“She Wears Aadab.”</span>
          </motion.div>

        </div>
      </div>

    </div>
  );
}
