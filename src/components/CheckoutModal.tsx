import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Region } from '../types';
import { formatPrice, getDeliveryCharge } from '../data';
import { X, Check, Copy, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  region: Region;
  onOrderSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  region,
  onOrderSuccess,
}: CheckoutModalProps) {
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  
  // Interaction State
  const [copiedText, setCopiedText] = useState(false);
  const [orderFinalized, setOrderFinalized] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [messageBody, setMessageBody] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.pricePKR * item.quantity, 0);
  const shipping = getDeliveryCharge(region);
  const subtotalFormatted = formatPrice(subtotal, region);
  const shippingFormatted = region === 'PK' ? 'Rs. 350 PKR' : formatPrice(5000, region);
  
  const grandTotalFormatted = region === 'PK'
    ? formatPrice(subtotal + 350, 'PK')
    : formatPrice(subtotal + 5000, 'BD');

  // business phone number for order intake (Karachi base)
  const businessPhoneNumber = '923001234567';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !city || !email || !selectedPayment) {
      alert('Please fill out all billing and payment fields.');
      return;
    }

    // Build ordered items summary text
    const itemsSummary = cart
      .map((item) => `- ${item.product.name} (Size: ${item.size}) x${item.quantity}`)
      .join('\n');

    // Build the WhatsApp formatted message
    const formattedMessage = `*NEW ORDER - AADAB CLOSET* 🌸\n\n` +
      `*CUSTOMER DETAILS:*\n` +
      `• *Name:* ${name}\n` +
      `• *Phone:* ${phone}\n` +
      `• *Email:* ${email}\n` +
      `• *Selected Region:* ${region === 'PK' ? 'Pakistan 🇵🇰' : 'Bangladesh 🇧🇩'}\n` +
      `• *Delivery Address:* ${address}, ${city}\n\n` +
      `*ORDERED GARMENTS:*\n` +
      `${itemsSummary}\n\n` +
      `*FINANCIAL SUMMARY:*\n` +
      `• *Subtotal:* ${subtotalFormatted}\n` +
      `• *Shipping Charges:* ${shippingFormatted}\n` +
      `• *Total Payable:* ${grandTotalFormatted}\n` +
      `• *Payment Method:* ${selectedPayment}\n\n` +
      `*She Wears Aadab.* Thank you for your order!`;

    setMessageBody(formattedMessage);
    const encodedMessage = encodeURIComponent(formattedMessage);
    setWhatsappLink(`https://wa.me/${businessPhoneNumber}?text=${encodedMessage}`);
    setOrderFinalized(true);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(messageBody);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCompletedCheckout = () => {
    onOrderSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white text-black max-w-2xl w-full p-6 md:p-8 relative shadow-2xl z-10 border border-neutral-100 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-black transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {!orderFinalized ? (
          <>
            {/* Header */}
            <div className="mb-6">
              <span className="text-[10px] tracking-[0.4em] text-gold-500 uppercase font-mono block mb-1">
                Aadab Closet Boutique
              </span>
              <h3 className="font-serif text-2xl tracking-wide text-neutral-900 font-light">
                Secure Checkout
              </h3>
            </div>

            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Form Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono tracking-widest uppercase text-neutral-950 border-b border-neutral-100 pb-2 mb-4 font-semibold">
                  1. Shipping Information
                </h4>
                
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-1.5 font-sans">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-neutral-200 px-3.5 py-2.5 text-xs focus:border-black focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-1.5 font-sans">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ayesha@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-neutral-200 px-3.5 py-2.5 text-xs focus:border-black focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-1.5 font-sans">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-neutral-200 px-3.5 py-2.5 text-xs focus:border-black focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-1.5 font-sans">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karachi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-neutral-200 px-3.5 py-2.5 text-xs focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-1.5 font-sans">
                      Region
                    </label>
                    <input
                      type="text"
                      disabled
                      value={region === 'PK' ? 'Pakistan (PKR)' : 'Bangladesh (BDT)'}
                      className="w-full border border-neutral-200 bg-neutral-50 text-neutral-500 px-3.5 py-2.5 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-1.5 font-sans">
                    Complete Shipping Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Street, Block, House number..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-neutral-200 px-3.5 py-2.5 text-xs focus:border-black focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Right Column: Order Summary and Payments */}
              <div className="flex flex-col justify-between space-y-6 bg-neutral-50/50 p-5 border border-neutral-100">
                <div>
                  <h4 className="text-xs font-mono tracking-widest uppercase text-neutral-950 border-b border-neutral-200 pb-2 mb-4 font-semibold">
                    2. Order & Payment
                  </h4>
                  
                  {/* Cart preview */}
                  <div className="max-h-36 overflow-y-auto mb-4 space-y-2.5 pr-1">
                    {cart.map((item) => (
                      <div key={`${item.product.id}-${item.size}`} className="flex justify-between items-center text-xs">
                        <span className="text-neutral-700 truncate max-w-[160px]">
                          {item.product.name} ({item.size})
                        </span>
                        <span className="font-mono text-neutral-400">x{item.quantity}</span>
                        <span className="font-mono text-neutral-800 font-medium shrink-0">
                          {formatPrice(item.product.pricePKR * item.quantity, region)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-neutral-100 pt-3 space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-500">
                      <span>Subtotal</span>
                      <span className="font-mono">{subtotalFormatted}</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Shipping ({region === 'PK' ? 'PK Store' : 'Intl Express'})</span>
                      <span className="font-mono text-gold-500">{shippingFormatted}</span>
                    </div>
                    <div className="flex justify-between font-bold text-neutral-900 pt-1 border-t border-neutral-100 text-sm">
                      <span className="font-serif">Total Payable</span>
                      <span className="font-mono text-gold-600">{grandTotalFormatted}</span>
                    </div>
                  </div>

                  {/* Payment Selection based on Region */}
                  <div className="mt-6">
                    <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-3 font-mono">
                      Select Payment Method *
                    </label>

                    {region === 'PK' ? (
                      // Pakistan Store Payments
                      <div className="space-y-2">
                        {['Bank Transfer', 'EasyPaisa', 'JazzCash'].map((method) => (
                          <label
                            key={method}
                            className={`flex items-center justify-between p-3 border cursor-pointer transition-all ${
                              selectedPayment === method
                                ? 'border-black bg-white shadow-xs'
                                : 'border-neutral-200 bg-white hover:border-neutral-400'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="payment_method"
                                required
                                checked={selectedPayment === method}
                                onChange={() => setSelectedPayment(method)}
                                className="accent-black h-3.5 w-3.5"
                              />
                              <span className="text-xs font-sans text-neutral-800">{method}</span>
                            </div>
                            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                              {method === 'Bank Transfer' ? 'No limit' : 'Mobile wallet'}
                            </span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      // Bangladesh Store Payments
                      <div className="space-y-2">
                        {['Stripe Payment', 'Credit/Debit Card (International)'].map((method) => (
                          <label
                            key={method}
                            className={`flex items-center justify-between p-3 border cursor-pointer transition-all ${
                              selectedPayment === method
                                ? 'border-black bg-white shadow-xs'
                                : 'border-neutral-200 bg-white hover:border-neutral-400'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="payment_method"
                                required
                                checked={selectedPayment === method}
                                onChange={() => setSelectedPayment(method)}
                                className="accent-black h-3.5 w-3.5"
                              />
                              <span className="text-xs font-sans text-neutral-800">{method}</span>
                            </div>
                            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                              Secure Intl
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-neutral-800 py-3.5 text-xs tracking-[0.25em] uppercase transition-all duration-300 font-sans font-medium hover:tracking-[0.3em] cursor-pointer"
                >
                  Confirm & Generate Order
                </button>
              </div>
            </form>
          </>
        ) : (
          /* ORDER FINALIZED SCREEN - WHATSAPP TRANSFER FLOW */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gold-50 text-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles size={28} className="animate-pulse" />
            </div>

            <span className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase font-mono block mb-1">
              Order Registered Successfully
            </span>
            <h3 className="font-serif text-3xl text-neutral-900 tracking-wide font-light mb-4">
              Send Your Order to Aadab Closet
            </h3>
            
            <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed mb-8">
              Your order ticket has been custom generated! To finalize your payment and initiate processing, click the WhatsApp button to send your details directly to our customer assistance desk.
            </p>

            {/* Formatted Text Box for Copying */}
            <div className="bg-neutral-50 border border-neutral-100 p-4 mb-8 text-left max-w-lg mx-auto rounded-none relative">
              <span className="text-[8px] tracking-widest text-neutral-400 font-mono uppercase block border-b border-neutral-200/60 pb-1.5 mb-2.5">
                Automated Message Ticket
              </span>
              <pre className="text-[10px] text-neutral-600 font-mono whitespace-pre-wrap leading-normal select-all">
                {messageBody}
              </pre>

              <button
                onClick={handleCopyToClipboard}
                className="absolute top-3.5 right-4 flex items-center space-x-1.5 bg-white border border-neutral-200 text-neutral-600 hover:text-black hover:border-black px-2 py-1 text-[9px] font-mono uppercase tracking-wider cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <Check size={10} className="text-green-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={10} />
                    <span>Copy Ticket</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              {/* WhatsApp Redirection Link */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  // Wait a short bit then trigger success
                  setTimeout(() => {
                    handleCompletedCheckout();
                  }, 2000);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white h-13 text-xs tracking-widest uppercase font-sans font-medium flex items-center justify-center space-x-2 transition-colors duration-300"
              >
                <MessageCircle size={14} className="fill-white" />
                <span>Send via WhatsApp</span>
              </a>

              <button
                onClick={handleCompletedCheckout}
                className="flex-1 border border-neutral-300 hover:border-black hover:bg-neutral-50 text-black h-13 text-xs tracking-widest uppercase font-sans transition-colors"
              >
                Done (Back to Home)
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-[10px] text-neutral-400 mt-6 max-w-xs mx-auto">
              <AlertCircle size={11} className="text-neutral-400" />
              <span>If popup blocks WhatsApp, copy details manually above.</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
