import { pgTable, serial, text, real, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: real('price').notNull(),
  originalPrice: real('original_price'),
  category: text('category'),
  image: text('image').default('default-bag.jpg'),
  images: text('images').default('[]'),
  stock: integer('stock').default(10),
  isFeatured: boolean('is_featured').default(false),
  isNew: boolean('is_new').default(false),
  badge: text('badge').default(''),
  rating: real('rating').default(4.5),
  reviewCount: integer('review_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  deliveryAddress: text('delivery_address').notNull(),
  city: text('city').notNull(),
  items: text('items').notNull(), // JSON string for now
  total: real('total').notNull(),
  paymentMethod: text('payment_method').notNull(),
  paymentStatus: text('payment_status').default('pending'),
  orderStatus: text('order_status').default('pending'),
  paystackRef: text('paystack_ref'),
  notes: text('notes').default(''),
  createdAt: timestamp('created_at').defaultNow(),
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id),
  customerName: text('customer_name').notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const newsletter = pgTable('newsletter', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const wishlist = pgTable('wishlist', {
  id: serial('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  productId: integer('product_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').unique().notNull(),
  name: text('name').notNull(),
  email: text('email'),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('customer').notNull(), // 'admin' | 'staff' | 'customer'
  image: text('image').default(''),
  createdAt: timestamp('created_at').defaultNow(),
});
