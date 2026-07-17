import { motion } from 'motion/react';
import { CartItem, Region } from '../types';
import { formatPrice, getDeliveryCharge } from '../data';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  region: Region;
  onUpdateQuantity: (productId: string, size: string, change: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  region,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.pricePKR * item.quantity, 0);
  const shipping = cart.length > 0 ? getDeliveryCharge(region) : 0;
  
  // subtotal in PKR
  const totalPKR = subtotal + (region === 'PK' ? 350 : 5000); // add PKR equivalent for shipping

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.35 }}
          className="w-screen max-w-md bg-white flex flex-col shadow-2xl h-full"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag size={16} />
              <h3 className="font-serif text-lg tracking-wide text-neutral-900">Your Shopping Bag</h3>
              <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded-full text-neutral-500">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="p-1 hover:bg-neutral-50 rounded-full transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length > 0 ? (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex items-start space-x-4 pb-6 border-b border-neutral-100"
                >
                  {/* Thumbnail Image */}
                  <div className="w-20 aspect-[3/4] bg-neutral-100 shrink-0 overflow-hidden border">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Item Description */}
                  <div className="flex-1 flex flex-col justify-between h-full min-w-0">
                    <div>
                      <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block mb-0.5">
                        {item.product.category}
                      </span>
                      <h4 className="font-serif text-sm text-neutral-900 tracking-wide line-clamp-1">
                        {item.product.name}
                      </h4>
                      <span className="inline-block text-[9px] tracking-wider text-neutral-500 font-mono mt-1 border border-neutral-100 px-1.5 py-0.2 bg-neutral-50">
                        SIZE: {item.size}
                      </span>
                    </div>

                    {/* Quantity Selector and Price */}
                    <div className="flex items-center justify-between mt-3.5">
                      <div className="flex items-center border border-neutral-200">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                          className="p-1 px-2.5 hover:bg-neutral-50 cursor-pointer text-xs transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-neutral-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                          className="p-1 px-2.5 hover:bg-neutral-50 cursor-pointer text-xs transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-medium text-neutral-900 block">
                          {formatPrice(item.product.pricePKR * item.quantity, region)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[9px] text-neutral-400 font-sans block mt-0.5">
                            {formatPrice(item.product.pricePKR, region)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id, item.size)}
                    className="p-1 text-neutral-300 hover:text-black hover:bg-neutral-50 transition-all cursor-pointer"
                    title="Remove item"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-24">
                <ShoppingBag size={32} className="text-neutral-300 mb-4 stroke-[1.2]" />
                <h4 className="font-serif text-base text-neutral-700 font-light mb-1">Your bag is empty</h4>
                <p className="text-xs text-neutral-400 max-w-[240px] leading-relaxed mb-6">
                  Browse our designer silhouettes to find your perfect fit.
                </p>
                <button
                  onClick={onClose}
                  className="border border-black text-black px-5 py-2.5 text-[10px] tracking-widest uppercase transition-colors hover:bg-black hover:text-white"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </div>

          {/* Checkout Footer Block */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatPrice(subtotal, region)}</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Shipping ({region === 'PK' ? 'Karachi Standard' : 'Dhaka Express BDT Equivalent'})</span>
                  <span className="font-mono text-gold-500">
                    {region === 'PK' ? 'Rs. 350 PKR' : formatPrice(5000, region)}
                  </span>
                </div>
                <div className="w-full h-[1px] bg-neutral-100 my-2"></div>
                <div className="flex justify-between text-sm font-medium text-neutral-900">
                  <span className="font-serif text-base font-light">Total Estimated</span>
                  <span className="font-mono text-base font-bold">
                    {region === 'PK'
                      ? formatPrice(subtotal + 350, 'PK')
                      : formatPrice(subtotal + 5000, 'BD')
                    }
                  </span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={onCheckout}
                className="w-full bg-black text-white hover:bg-neutral-800 h-13 text-xs tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer border border-black hover:tracking-[0.3em]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={12} />
              </button>
              
              <p className="text-[9px] text-neutral-400 font-sans text-center leading-normal">
                Tax calculated at checkout. Real-time secure orders dispatched with automated tracking.
              </p>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
