import { Product, Testimonial } from './types';

// Conversion rate: 1 PKR = 0.42 BDT
export const EXCHANGE_RATE = 0.42;

export const formatPrice = (pricePKR: number, region: 'PK' | 'BD'): string => {
  if (region === 'BD') {
    const priceBDT = Math.round(pricePKR * EXCHANGE_RATE);
    return `${priceBDT.toLocaleString('en-BD')} BDT`;
  }
  return `Rs. ${pricePKR.toLocaleString('en-PK')} PKR`;
};

export const getDeliveryCharge = (region: 'PK' | 'BD'): number => {
  if (region === 'BD') {
    // 5,000 PKR equivalent converted to BDT
    return Math.round(5000 * EXCHANGE_RATE);
  }
  // Standard PKR delivery charge inside PK
  return 350;
};

export const PRODUCTS: Product[] = [
  {
    id: 'nura-organza',
    name: 'Nura Organza Set',
    pricePKR: 28500,
    category: 'Signature Collection',
    images: [
      '/1st_front.png',
      '/1st.png'
    ],
    description: 'An ethereal champagne-gold luxury ensemble tailored in premium organza. Detailed with handcrafted zardozi and delicate threadwork across the neckline and cuffs. Complete with matching pure silk trousers and an embellished dupatta.',
    fabric: 'Premium Sheer Organza with Pure Crepe Lining. Dupatta: Soft organza with scalloped borders.',
    stitching: 'Includes high-quality inner lining, intricate custom piping, and tailored structural panels. Finished with handmade fabric buttons.',
    care: 'Dry clean only. Store in a protective cloth bag away from direct sunlight.',
    delivery: {
      PK: 'Dispatched within 5-7 working days. Free shipping nationwide.',
      BD: 'International express shipping. Dispatched in 8-12 working days.'
    },
    sizes: ['S', 'M', 'L'],
    featured: true
  },
  {
    id: 'zoya-velvet',
    name: 'Zoya Velvet Kurta',
    pricePKR: 32000,
    category: 'Limited Edition',
    images: [
      '/2nd_front.png',
      '/2nd.png'
    ],
    description: 'A masterpiece in matte-black micro-velvet, featuring deep, rich texture and delicate champagne-gold tilla embroidery along the sleeves and hemline. Perfect for high-profile evening events and winter luxury wardrobes.',
    fabric: 'Ultra-luxurious 100% Micro-velvet. Breathable and structure-retaining.',
    stitching: 'Straight silhouette with dynamic side slits, structured shoulder padding, and hand-tacked detailing.',
    care: 'Steam iron only on reverse side. Professional dry clean recommended.',
    delivery: {
      PK: 'Dispatched within 4-6 working days. Free shipping nationwide.',
      BD: 'International express shipping. Dispatched in 8-12 working days.'
    },
    sizes: ['S', 'M', 'L'],
    featured: true
  },
  {
    id: 'ayla-linen',
    name: 'Ayla Pleated Linen Set',
    pricePKR: 16500,
    category: 'Everyday Elegance',
    images: [
      '/3rd_front.png',
      '/3rd.png'
    ],
    description: 'A minimalist Pinterest-inspired modest co-ord set in a soft sand hue. Featuring elegant vertical pleats, a relaxed high-low tunic, and wide-leg trousers that flow effortlessly with every movement.',
    fabric: 'Breathable, premium flax linen blended with soft viscose for a wrinkle-resistant drape.',
    stitching: 'Relaxed contemporary fit, dropped shoulders, concealed pocket details, and custom soft-flex waistband.',
    care: 'Gentle hand wash. Iron on medium heat.',
    delivery: {
      PK: 'Dispatched within 3-5 working days. Free shipping nationwide.',
      BD: 'International express shipping. Dispatched in 7-10 working days.'
    },
    sizes: ['S', 'M', 'L'],
    featured: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Anila Siddiqui',
    rating: 5,
    comment: 'The craftsmanship on my Nura Organza set is absolutely breathtaking. Wore it to a wedding in Karachi and got endless compliments. Perfect modest cut without compromising on the high-fashion silhouette!',
    date: 'June 14, 2026',
    location: 'Karachi, Pakistan'
  },
  {
    id: 't2',
    name: 'Fariha Rahman',
    rating: 5,
    comment: 'Ordering from Dhaka was super smooth. The price was automatically converted to BDT and the delivery arrived in exactly 9 days. The quality of the linen co-ord set is incredible. Aadab Closet is truly unique.',
    date: 'July 2, 2026',
    location: 'Dhaka, Bangladesh'
  },
  {
    id: 't3',
    name: 'Madiha Kamal',
    rating: 5,
    comment: 'Three sisters building an amazing modest empire! The creative direction of the brand is so elegant. The Zoya velvet kurta fits beautifully and feels unbelievably heavy and rich.',
    date: 'June 28, 2026',
    location: 'Lahore, Pakistan'
  },
  {
    id: 't4',
    name: 'Tahreem Malik',
    rating: 5,
    comment: 'In love with the minimalistic, Pinterest aesthetic. The Dania Minimalist coat set is exactly what I was searching for. It is elegant, professional, and completely modest. Will definitely order again.',
    date: 'July 11, 2026',
    location: 'Islamabad, Pakistan'
  }
];

export const COLLECTIONS = [
  {
    name: 'Signature Collection',
    description: 'Handcrafted zardozi, liquid charmeuse silks, and intricate detailing built for monumental occasions.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Everyday Elegance',
    description: 'Luxurious flax linens and breathable Japanese crepes customized for effortless everyday sophistication.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Limited Edition',
    description: 'Artisanal micro-velvets, structural brocades, and rare heritage fabrics in extremely small quantities.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'New Arrivals',
    description: 'The latest drop of contemporary modest silhouettes, delicate collar embroideries, and fresh seasonal color stories.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
  }
];
