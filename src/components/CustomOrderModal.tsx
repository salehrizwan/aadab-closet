import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Scissors, HelpCircle, MessageSquare } from 'lucide-react';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomOrderModal({ isOpen, onClose }: CustomOrderModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dressName, setDressName] = useState('');
  const [height, setHeight] = useState('');
  const [bust, setBust] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [customizations, setCustomizations] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedMessage = `*BESPOKE CUSTOM ORDER INQUIRY* 🌸\n\n` +
      `*CLIENT DETAILS:*\n` +
      `• *Name:* ${name}\n` +
      `• *Phone:* ${phone}\n\n` +
      `*DESIGN PREFERENCE:*\n` +
      `• *Garment Style Name:* ${dressName || 'Not Specified (General inquiry)'}\n\n` +
      `*MEASUREMENTS (inches):*\n` +
      `• *Height:* ${height} ft/in\n` +
      `• *Bust:* ${bust}"\n` +
      `• *Waist:* ${waist}"\n` +
      `• *Hips:* ${hips}"\n\n` +
      `*SPECIAL TAILORING REQUESTS:*\n` +
      `${customizations || 'None specified.'}\n\n` +
      `*She Wears Aadab.* Requesting custom quote.`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappLink = `https://wa.me/923001234567?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white text-black max-w-lg w-full p-6 md:p-8 relative shadow-2xl z-10 border border-neutral-100 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-black transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <div className="mb-6 flex items-start space-x-3">
              <div className="bg-neutral-100 p-2.5 rounded-full text-gold-500 shrink-0">
                <Scissors size={20} />
              </div>
              <div>
                <span className="text-[9px] tracking-[0.4em] text-gold-500 uppercase font-mono block mb-0.5">
                  Tailored To Perfection
                </span>
                <h3 className="font-serif text-xl md:text-2xl tracking-wide text-neutral-900 font-light">
                  Bespoke Custom Orders
                </h3>
              </div>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed font-sans mb-6 font-light">
              At Aadab Closet, we understand that true modesty is about comfort. We offer complimentary tailoring adjustments for length, sleeve-extensions, or custom inner lining additions. Fill out your specifications below to initiate a private consultation with our Karachi design studio.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-1.5 font-sans">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amina"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-neutral-200 px-3 py-2 text-xs focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-1.5 font-sans">
                    WhatsApp Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +92 321 9876543"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-neutral-200 px-3 py-2 text-xs focus:border-black focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-1.5 font-sans">
                  Outfit Style of Interest (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nura Organza, Zoya Velvet, etc."
                  value={dressName}
                  onChange={(e) => setDressName(e.target.value)}
                  className="w-full border border-neutral-200 px-3 py-2 text-xs focus:border-black focus:outline-none transition-colors"
                />
              </div>

              {/* Measurements Group */}
              <div className="border-t border-neutral-100 pt-4 mt-4">
                <span className="block text-[10px] tracking-widest uppercase text-neutral-800 mb-3 font-mono font-semibold">
                  Sizing Metrics (Inches)
                </span>
                
                <div className="grid grid-cols-4 gap-2.5">
                  <div>
                    <label className="block text-[9px] text-neutral-400 font-sans mb-1 uppercase">Height</label>
                    <input
                      type="text"
                      placeholder="5'4"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full border border-neutral-200 px-2 py-1.5 text-xs text-center font-mono focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-neutral-400 font-sans mb-1 uppercase">Bust</label>
                    <input
                      type="text"
                      placeholder="34"
                      value={bust}
                      onChange={(e) => setBust(e.target.value)}
                      className="w-full border border-neutral-200 px-2 py-1.5 text-xs text-center font-mono focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-neutral-400 font-sans mb-1 uppercase">Waist</label>
                    <input
                      type="text"
                      placeholder="28"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                      className="w-full border border-neutral-200 px-2 py-1.5 text-xs text-center font-mono focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-neutral-400 font-sans mb-1 uppercase">Hips</label>
                    <input
                      type="text"
                      placeholder="38"
                      value={hips}
                      onChange={(e) => setHips(e.target.value)}
                      className="w-full border border-neutral-200 px-2 py-1.5 text-xs text-center font-mono focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-1.5 font-sans">
                  Customization details / length modifications
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Please increase length to 54 inches. Add full sleeves lining..."
                  value={customizations}
                  onChange={(e) => setCustomizations(e.target.value)}
                  className="w-full border border-neutral-200 px-3 py-2 text-xs focus:border-black focus:outline-none transition-colors resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white hover:bg-neutral-800 py-3 text-xs tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 cursor-pointer hover:tracking-[0.3em]"
              >
                Launch Consultation via WhatsApp
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={22} />
            </div>
            <h3 className="font-serif text-xl text-neutral-900 tracking-wide font-light mb-2">
              Consultation Dispatched!
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-6">
              A bespoke tailoring ticket has been opened. Our design assistant has been notified on WhatsApp with your exact sizing requirements. We will contact you shortly with a personalized price estimate.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="border border-black text-black px-6 py-2.5 text-xs tracking-widest uppercase transition-colors hover:bg-black hover:text-white"
            >
              Close Window
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
