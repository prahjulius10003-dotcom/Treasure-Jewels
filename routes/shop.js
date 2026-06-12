const express = require('express');
const router = express.Router();
const { db } = require('../database');

router.get('/', (req, res) => {
  const featured = db.prepare('SELECT * FROM products WHERE is_featured = 1 LIMIT 6').all();
  const newArrivals = db.prepare('SELECT * FROM products WHERE is_new = 1 LIMIT 4').all();
  const categories = db.prepare('SELECT DISTINCT category FROM products').all();
  const bestsellers = db.prepare('SELECT * FROM products ORDER BY review_count DESC LIMIT 4').all();
  res.render('index', { featured, categories, newArrivals, bestsellers });
});

router.get('/shop', (req, res) => {
  const { category, search, sort, min_price, max_price } = req.query;
  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];
  if (category) { query += ' AND category = ?'; params.push(category); }
  if (search) { query += ' AND (name LIKE ? OR description LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
  if (min_price) { query += ' AND price >= ?'; params.push(parseFloat(min_price)); }
  if (max_price) { query += ' AND price <= ?'; params.push(parseFloat(max_price)); }
  const sortMap = { price_asc: 'price ASC', price_desc: 'price DESC', newest: 'created_at DESC', popular: 'review_count DESC' };
  query += ' ORDER BY ' + (sortMap[sort] || 'created_at DESC');
  const products = db.prepare(query).all(...params);
  const categories = db.prepare('SELECT DISTINCT category FROM products').all();
  const wishlist = req.session.wishlist || [];
  res.render('products', { products, categories, selectedCategory: category || '', search: search || '', sort: sort || '', min_price: min_price || '', max_price: max_price || '', wishlist });
});

router.get('/product/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.redirect('/shop');
  const related = db.prepare('SELECT * FROM products WHERE category = ? AND id != ? LIMIT 4').all(product.category, product.id);
  const reviews = db.prepare('SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC').all(product.id);
  const wishlist = req.session.wishlist || [];
  res.render('product-detail', { product, related, reviews, wishlist });
});

router.post('/product/:id/review', (req, res) => {
  const { customer_name, rating, comment } = req.body;
  db.prepare('INSERT INTO reviews (product_id, customer_name, rating, comment) VALUES (?,?,?,?)').run(req.params.id, customer_name, parseInt(rating), comment);
  const avg = db.prepare('SELECT AVG(rating) as avg, COUNT(*) as cnt FROM reviews WHERE product_id = ?').get(req.params.id);
  db.prepare('UPDATE products SET rating = ?, review_count = ? WHERE id = ?').run(Math.round(avg.avg * 10) / 10, avg.cnt, req.params.id);
  req.flash('success', 'Thank you for your review!');
  res.redirect('/product/' + req.params.id);
});

router.post('/wishlist/toggle/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let wishlist = req.session.wishlist || [];
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(w => w !== id);
  } else {
    wishlist.push(id);
  }
  req.session.wishlist = wishlist;
  res.json({ wishlisted: wishlist.includes(id), count: wishlist.length });
});

router.get('/wishlist', (req, res) => {
  const wishlist = req.session.wishlist || [];
  const products = wishlist.length ? db.prepare(`SELECT * FROM products WHERE id IN (${wishlist.map(() => '?').join(',')}) `).all(...wishlist) : [];
  res.render('wishlist', { products, wishlist });
});

router.post('/newsletter', (req, res) => {
  const { email } = req.body;
  try {
    db.prepare('INSERT INTO newsletter (email) VALUES (?)').run(email);
    req.flash('success', 'You are subscribed! Thank you.');
  } catch(e) {
    req.flash('error', 'This email is already subscribed.');
  }
  res.redirect('back');
});

router.get('/order-success/:id', (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.redirect('/');
  res.render('order-success', { order });
});

router.get('/track-order', (req, res) => {
  const { order_id, phone } = req.query;
  let order = null;
  if (order_id && phone) {
    order = db.prepare('SELECT * FROM orders WHERE id = ? AND customer_phone = ?').get(order_id, phone);
  }
  res.render('track-order', { order, searched: !!(order_id && phone) });
});

module.exports = router;
