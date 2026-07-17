import { MapPin, Mail, Phone, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white pt-24 pb-12 border-t border-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-neutral-900">
          
          {/* Brand Intro Column (5 Columns) */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <h3 className="font-serif text-2xl tracking-[0.3em] text-white font-light leading-none">
                AADAB
              </h3>
              <p className="text-[9px] tracking-[0.45em] text-gold-300 uppercase mt-1.5 font-mono">
                CLOSET
              </p>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-light">
              Luxury modest fashion designed in Karachi, Pakistan. Inspired by contemporary Pinterest aesthetics and crafted by three sisters, we create timeless silhouettes representing grace and confidence. Now serving clients globally across Karachi and Dhaka.
            </p>
            
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-center space-x-2.5">
                <MapPin size={12} className="text-gold-300" />
                <span>Karachi, Pakistan (Studio Hub)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <MapPin size={12} className="text-gold-300" />
                <span>Dhaka, Bangladesh (Intl Delivery Express)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail size={12} className="text-gold-300" />
                <span>studio@aadabcloset.com</span>
              </div>
            </div>
          </div>

          {/* Links Column 1: Info (3 Columns) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-white uppercase font-semibold">
              Boutique Info
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-gold-300 transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-gold-300 transition-colors cursor-pointer"
                >
                  Featured Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-gold-300 transition-colors cursor-pointer"
                >
                  Boutique FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-gold-300 transition-colors cursor-pointer"
                >
                  Contact Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Legal & Guidelines (4 Columns) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-white uppercase font-semibold">
              Boutique Policies
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('policy-shipping')}
                  className="hover:text-gold-300 transition-colors cursor-pointer text-left"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policy-privacy')}
                  className="hover:text-gold-300 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policy-terms')}
                  className="hover:text-gold-300 transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policy-returns')}
                  className="hover:text-gold-300 transition-colors cursor-pointer text-left"
                >
                  Return & Exchange
                </button>
              </li>
            </ul>

            {/* Newsletter form */}
            <div className="pt-4 border-t border-neutral-900 mt-4">
              <span className="block text-[10px] tracking-widest uppercase text-neutral-400 mb-2">
                Join our VIP Sisterhood
              </span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-neutral-900 border border-neutral-800 text-white text-xs px-3 py-2 w-full focus:outline-none focus:border-gold-300"
                />
                <button className="bg-white text-black hover:bg-neutral-200 px-4 text-xs font-mono uppercase tracking-widest transition-colors font-medium cursor-pointer">
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-wider text-neutral-500">
          <p>&copy; {currentYear} Aadab Closet. All Rights Reserved.</p>
          <p className="flex items-center mt-4 sm:mt-0">
            <span>Made with</span>
            <Heart size={10} className="text-gold-400 mx-1 fill-gold-400" />
            <span>by Three Sisters. کراچی • ঢাকা</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
