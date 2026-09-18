export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  badge?: string;
  description?: string;
  inStock?: boolean;
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Classic Leather Tote',
    category: 'Tote Bags',
    price: 350,
    originalPrice: 420,
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    badge: 'Bestseller',
    description: 'A timeless leather tote that fits your laptop, daily essentials, and more. Handcrafted with premium grain leather that develops a beautiful patina over time.',
    inStock: true,
  },
  {
    id: 2,
    name: 'Mini Crossbody Bag',
    category: 'Crossbody Bags',
    price: 180,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    badge: 'New',
    description: 'Perfect for hands-free convenience. Features multiple compartments and an adjustable strap.',
    inStock: true,
  },
  {
    id: 3,
    name: 'Weekend Travel Duffel',
    category: 'Travel Bags',
    price: 420,
    originalPrice: 500,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    badge: 'Sale',
    description: 'Your perfect companion for weekend getaways. Spacious interior with premium brass hardware.',
    inStock: true,
  },
  {
    id: 4,
    name: 'Woven Straw Beach Bag',
    category: 'Beach Bags',
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800',
    badge: 'New',
    description: 'Bring summer vibes wherever you go. Hand-woven with durable natural straw.',
    inStock: true,
  },
  {
    id: 5,
    name: 'Executive Laptop Bag',
    category: 'Work Bags',
    price: 520,
    imageUrl: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&q=80&w=800',
    description: 'Professional and sleek laptop bag that protects your devices in style.',
    inStock: true,
  },
  {
    id: 6,
    name: 'Quilted Chain Shoulder Bag',
    category: 'Shoulder Bags',
    price: 290,
    originalPrice: 350,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    badge: 'Sale',
    description: 'Elegant quilted design with a versatile chain strap for day-to-night transitions.',
    inStock: true,
  }
];

export async function getProducts(options?: { category?: string; query?: string; sort?: string }): Promise<Product[]> {
  let products = [...MOCK_PRODUCTS];

  if (options?.category && options.category !== 'All') {
    products = products.filter(p => p.category === options.category);
  }

  if (options?.query) {
    const q = options.query.toLowerCase();
    products = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  if (options?.sort) {
    switch (options.sort) {
      case 'price_asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products = products.filter(p => p.badge === 'New').concat(products.filter(p => p.badge !== 'New'));
        break;
      case 'featured':
        products = products.filter(p => p.badge === 'Bestseller').concat(products.filter(p => p.badge !== 'Bestseller'));
        break;
    }
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return products;
}

export async function getProductById(id: number): Promise<Product | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_PRODUCTS.find(p => p.id === id);
}

export async function getCategories(): Promise<string[]> {
  const categories = new Set(MOCK_PRODUCTS.map(p => p.category));
  return ['All', ...Array.from(categories)];
}
