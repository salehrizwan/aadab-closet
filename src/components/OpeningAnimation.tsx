import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // 4 seconds total cinematic intro
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background Silk Ambient Gradients */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-800 blur-[120px] pointer-events-none"
      />

      <div className="relative flex flex-col items-center justify-center text-center px-6">
        {/* Floral Motif Emblem (Rendered as beautiful premium SVG lines) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            className="text-neutral-300"
          >
            {/* Elegant letter 'A' contour */}
            <motion.path
              d="M 50 15 L 25 80 M 50 15 L 75 80 M 35 60 L 65 60"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* Delicate organic flower leaves wrapped around 'A' */}
            <motion.path
              d="M 38 60 C 35 50, 42 45, 48 45 C 55 45, 58 50, 52 55 C 46 60, 40 55, 38 60"
              stroke="#dab98b"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M 50 45 C 55 35, 65 35, 60 45 C 55 55, 48 50, 50 45"
              stroke="#dab98b"
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ delay: 1.1, duration: 1.5, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#dab98b" />
                <stop offset="100%" stopColor="#c9a063" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Brand Name Reveal with Letter Spacing Transition */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: '0.25em' }}
          animate={{ opacity: 1, letterSpacing: '0.45em' }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl md:text-4xl tracking-[0.45em] text-gold-100 font-light"
        >
          A A D A B
        </motion.h1>

        {/* Sub-label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs tracking-[0.6em] text-neutral-400 font-sans mt-3 uppercase"
        >
          C L O S E T
        </motion.p>

        {/* Divider Shimmer */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-300 to-transparent my-6 relative overflow-hidden">
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent"
          />
        </div>

        {/* Tagline Reveal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.2 }}
          className="italic text-sm text-gold-300 font-serif tracking-wider font-light"
        >
          &ldquo;She Wears Aadab.&rdquo;
        </motion.p>
      </div>

      {/* Creative face introduction in soft credit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 text-[9px] tracking-[0.3em] uppercase text-neutral-500 font-sans"
      >
        A Karachi Signature • Crafted by Three Sisters
      </motion.div>
    </div>
  );
}
