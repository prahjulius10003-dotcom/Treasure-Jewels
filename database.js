const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const db = new Database(path.join(__dirname, 'database.db'));

function initDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      original_price REAL,
      category TEXT,
      image TEXT DEFAULT 'default-bag.jpg',
      images TEXT DEFAULT '[]',
      stock INTEGER DEFAULT 10,
      is_featured INTEGER DEFAULT 0,
      is_new INTEGER DEFAULT 0,
      badge TEXT DEFAULT '',
      rating REAL DEFAULT 4.5,
      review_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      delivery_address TEXT NOT NULL,
      city TEXT NOT NULL,
      items TEXT NOT NULL,
      total REAL NOT NULL,
      payment_method TEXT NOT NULL,
      payment_status TEXT DEFAULT 'pending',
      order_status TEXT DEFAULT 'pending',
      paystack_ref TEXT,
      notes TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      customer_name TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS newsletter (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS wishlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      product_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT,
      password_hash TEXT NOT NULL,
      image TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const adminColumns = db.prepare("PRAGMA table_info(admin)").all();
  if (!adminColumns.some(c => c.name === 'image')) {
    db.exec("ALTER TABLE admin ADD COLUMN image TEXT DEFAULT ''");
  }

  const count = db.prepare('SELECT COUNT(*) as c FROM products').get();
  if (count.c === 0) {
    const insert = db.prepare(`
      INSERT INTO products (name, description, price, original_price, category, image, stock, is_featured, is_new, badge, rating, review_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const products = [
      ['Classic Leather Tote', 'Crafted from premium full-grain leather, this timeless tote transitions effortlessly from the office to weekend outings. Spacious interior with magnetic snap closure and interior pockets.', 350, 420, 'Tote Bags', 'tote1.jpg', 15, 1, 0, 'Bestseller', 4.8, 124],
      ['Mini Crossbody Bag', 'Compact yet surprisingly roomy, this crossbody features an adjustable leather strap and gold-tone hardware. Perfect for evenings out or errands.', 180, null, 'Crossbody Bags', 'cross1.jpg', 20, 1, 1, 'New', 4.6, 87],
      ['Weekend Travel Duffel', 'Waxed canvas with full-grain leather handles. Fits a 3-day wardrobe with room to spare. Shoe compartment included.', 420, 500, 'Travel Bags', 'duffel1.jpg', 8, 1, 0, 'Sale', 4.9, 203],
      ['Woven Straw Beach Bag', 'Hand-woven by local artisans. Roomy enough for towels, sunscreen and a good book. Includes an inner zip pouch.', 120, null, 'Beach Bags', 'beach1.jpg', 25, 0, 1, 'New', 4.5, 56],
      ['Executive Laptop Bag', 'Slim silhouette with padded laptop sleeve up to 15 inches. RFID-blocking pocket and trolley sleeve for easy airport navigation.', 520, null, 'Work Bags', 'laptop1.jpg', 12, 1, 0, '', 4.7, 145],
      ['Quilted Chain Shoulder Bag', 'Diamond-quilted leather with an 18k gold-plated chain strap. A statement piece that elevates any outfit.', 290, 350, 'Shoulder Bags', 'shoulder1.jpg', 18, 1, 0, 'Sale', 4.8, 98],
      ['Kente Print Clutch', 'Celebrating Ghanaian heritage with authentic Kente fabric panels and genuine leather trim. A true collector item.', 150, null, 'Clutches', 'clutch1.jpg', 30, 0, 1, 'Local Craft', 4.9, 67],
      ['Leather Backpack', 'Full-grain leather backpack with padded back panel and laptop compartment. Ages beautifully with use.', 480, null, 'Backpacks', 'backpack1.jpg', 10, 0, 1, 'New', 4.6, 42],
    ];
    for (const p of products) insert.run(...p);

    // Seed some reviews
    const addReview = db.prepare('INSERT INTO reviews (product_id, customer_name, rating, comment) VALUES (?,?,?,?)');
    const reviews = [
      [1, 'Akosua M.', 5, 'Absolutely love this bag! The leather quality is outstanding and it looks even better in person.'],
      [1, 'Esi T.', 5, 'Got so many compliments at work. Worth every pesewa!'],
      [1, 'Abena K.', 4, 'Beautiful bag, delivery was fast too. Would buy again.'],
      [2, 'Adwoa S.', 5, 'Perfect size for a night out. The gold hardware is gorgeous.'],
      [3, 'Kwame A.', 5, 'Best travel bag I have owned. So well made.'],
      [5, 'Kofi B.', 5, 'Very professional look. My colleagues keep asking where I got it.'],
    ];
    for (const r of reviews) addReview.run(...r);
    console.log('Sample products and reviews seeded');
  }

  const adminCount = db.prepare('SELECT COUNT(*) as c FROM admin').get();
  if (adminCount.c === 0) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const passwordHash = bcrypt.hashSync(defaultPassword, 10);
    db.prepare('INSERT INTO admin (username, name, email, password_hash) VALUES (?,?,?,?)')
      .run('admin', 'Admin', 'admin@treasurejewels.com', passwordHash);
    console.log('Admin user seeded (username: admin)');
  }
}

module.exports = { db, initDB };
