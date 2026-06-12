const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../database');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/images/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

function isAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  res.redirect('/admin/login');
}

function getAdmin() {
  return db.prepare('SELECT * FROM admin ORDER BY id LIMIT 1').get();
}

router.get('/login', (req, res) => res.render('admin/login'));
router.get('/reset', (req, res) => {
  res.render('admin/reset', { resetEnabled: Boolean(process.env.ADMIN_RESET_TOKEN) });
});
router.post('/reset', (req, res) => {
  const resetToken = process.env.ADMIN_RESET_TOKEN;
  const { reset_token, new_password, confirm_password } = req.body;

  if (!resetToken) {
    req.flash('error', 'Password reset is not configured. Please set ADMIN_RESET_TOKEN in your environment.');
    return res.redirect('/admin/login');
  }

  if (reset_token !== resetToken) {
    req.flash('error', 'Invalid reset token');
    return res.redirect('/admin/reset');
  }

  if (!new_password || new_password !== confirm_password) {
    req.flash('error', 'New password and confirmation do not match');
    return res.redirect('/admin/reset');
  }

  const admin = getAdmin();
  const newHash = bcrypt.hashSync(new_password, 10);
  if (admin) {
    db.prepare('UPDATE admin SET password_hash = ? WHERE id = ?').run(newHash, admin.id);
  } else {
    db.prepare('INSERT INTO admin (username, name, email, password_hash) VALUES (?,?,?,?)')
      .run('admin', 'Admin', 'admin@treasurejewels.com', newHash);
  }

  req.flash('success', 'Password reset successfully. Please sign in with your new password.');
  res.redirect('/admin/login');
});
router.post('/login', (req, res) => {
  const admin = getAdmin();
  if (admin && bcrypt.compareSync(req.body.password, admin.password_hash)) {
    req.session.isAdmin = true;
    req.session.adminId = admin.id;
    req.session.adminName = admin.name;
    req.session.adminImage = admin.image || '';
    return res.redirect('/admin');
  }

  if (!admin && req.body.password === (process.env.ADMIN_PASSWORD || 'admin123')) {
    req.session.isAdmin = true;
    req.session.adminName = 'Admin';
    req.session.adminImage = '';
    return res.redirect('/admin');
  }

  req.flash('error', 'Incorrect password');
  res.redirect('/admin/login');
});
router.get('/logout', (req, res) => { req.session.isAdmin = false; req.session.adminId = null; req.session.adminName = null; res.redirect('/admin/login'); });

router.get('/profile', isAdmin, (req, res) => {
  const admin = getAdmin();
  res.render('admin/profile', { admin });
});

router.put('/profile', isAdmin, upload.single('image'), (req, res) => {
  const { name, email } = req.body;
  const admin = getAdmin();
  const image = req.file ? req.file.filename : admin.image;
  db.prepare('UPDATE admin SET name = ?, email = ?, image = ? WHERE id = ?').run(name, email, image, admin.id);
  req.session.adminName = name;
  req.session.adminImage = image || '';
  req.flash('success', 'Profile updated successfully');
  res.redirect('/admin/profile');
});

router.post('/profile/remove-image', isAdmin, (req, res) => {
  const admin = getAdmin();
  if (admin && admin.image) {
    // Do not delete the shared placeholder
    if (admin.image !== 'avatar-placeholder.svg') {
      const imgPath = path.join(__dirname, '..', 'public', 'images', admin.image);
      try { if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath); } catch (e) { /* ignore errors */ }
    }
    db.prepare('UPDATE admin SET image = ? WHERE id = ?').run('', admin.id);
  }
  req.session.adminImage = '';
  req.flash('success', 'Profile image removed');
  res.redirect('/admin/profile');
});

router.put('/profile/password', isAdmin, (req, res) => {
  const { current_password, new_password, confirm_password } = req.body;
  if (new_password !== confirm_password) {
    req.flash('error', 'New password and confirmation do not match');
    return res.redirect('/admin/profile');
  }

  const admin = getAdmin();
  if (!bcrypt.compareSync(current_password, admin.password_hash)) {
    req.flash('error', 'Current password is incorrect');
    return res.redirect('/admin/profile');
  }

  const newHash = bcrypt.hashSync(new_password, 10);
  db.prepare('UPDATE admin SET password_hash = ? WHERE id = ?').run(newHash, admin.id);
  req.flash('success', 'Password changed successfully');
  res.redirect('/admin/profile');
});

router.get('/', isAdmin, (req, res) => {
  const totalOrders = db.prepare('SELECT COUNT(*) as c FROM orders').get().c;
  const totalRevenue = db.prepare("SELECT SUM(total) as r FROM orders WHERE payment_status='paid'").get().r || 0;
  const pendingOrders = db.prepare("SELECT COUNT(*) as c FROM orders WHERE order_status='pending'").get().c;
  const totalProducts = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
  const subscribers = db.prepare('SELECT COUNT(*) as c FROM newsletter').get().c;
  const recentOrders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT 8').all();
  const topProducts = db.prepare('SELECT * FROM products ORDER BY review_count DESC LIMIT 5').all();
  // Revenue last 7 days
  const weekRevenue = db.prepare(`
    SELECT DATE(created_at) as day, SUM(total) as revenue, COUNT(*) as orders
    FROM orders WHERE created_at >= datetime('now', '-7 days') AND payment_status='paid'
    GROUP BY DATE(created_at) ORDER BY day ASC
  `).all();
  res.render('admin/dashboard', { totalOrders, totalRevenue, pendingOrders, totalProducts, subscribers, recentOrders, topProducts, weekRevenue });
});

router.get('/products', isAdmin, (req, res) => {
  const products = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
  res.render('admin/products', { products });
});
router.get('/products/new', isAdmin, (req, res) => res.render('admin/product-form', { product: null }));
router.post('/products', isAdmin, upload.single('image'), (req, res) => {
  const { name, description, price, original_price, category, stock, is_featured, is_new, badge } = req.body;
  const image = req.file ? req.file.filename : 'default-bag.jpg';
  db.prepare('INSERT INTO products (name, description, price, original_price, category, image, stock, is_featured, is_new, badge) VALUES (?,?,?,?,?,?,?,?,?,?)')
    .run(name, description, parseFloat(price), original_price ? parseFloat(original_price) : null, category, image, parseInt(stock), is_featured ? 1 : 0, is_new ? 1 : 0, badge || '');
  req.flash('success', 'Product added!');
  res.redirect('/admin/products');
});
router.get('/products/:id/edit', isAdmin, (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  res.render('admin/product-form', { product });
});
router.put('/products/:id', isAdmin, upload.single('image'), (req, res) => {
  const { name, description, price, original_price, category, stock, is_featured, is_new, badge } = req.body;
  const current = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  const image = req.file ? req.file.filename : current.image;
  db.prepare('UPDATE products SET name=?,description=?,price=?,original_price=?,category=?,image=?,stock=?,is_featured=?,is_new=?,badge=? WHERE id=?')
    .run(name, description, parseFloat(price), original_price ? parseFloat(original_price) : null, category, image, parseInt(stock), is_featured ? 1 : 0, is_new ? 1 : 0, badge || '', req.params.id);
  req.flash('success', 'Product updated!');
  res.redirect('/admin/products');
});
router.delete('/products/:id', isAdmin, (req, res) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  req.flash('success', 'Product deleted.');
  res.redirect('/admin/products');
});

router.get('/orders', isAdmin, (req, res) => {
  const { status } = req.query;
  let orders;
  if (status) orders = db.prepare('SELECT * FROM orders WHERE order_status = ? ORDER BY created_at DESC').all(status);
  else orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  res.render('admin/orders', { orders, filterStatus: status || '' });
});
router.put('/orders/:id/status', isAdmin, (req, res) => {
  db.prepare('UPDATE orders SET order_status = ? WHERE id = ?').run(req.body.order_status, req.params.id);
  req.flash('success', 'Order status updated!');
  res.redirect('/admin/orders');
});

router.get('/newsletter', isAdmin, (req, res) => {
  const subscribers = db.prepare('SELECT * FROM newsletter ORDER BY created_at DESC').all();
  res.render('admin/newsletter', { subscribers });
});

router.get('/reviews', isAdmin, (req, res) => {
  const reviews = db.prepare('SELECT r.*, p.name as product_name FROM reviews r JOIN products p ON r.product_id = p.id ORDER BY r.created_at DESC').all();
  res.render('admin/reviews', { reviews });
});
router.delete('/reviews/:id', isAdmin, (req, res) => {
  db.prepare('DELETE FROM reviews WHERE id = ?').run(req.params.id);
  req.flash('success', 'Review deleted.');
  res.redirect('/admin/reviews');
});


router.get('/newsletter/export', isAdmin, (req, res) => {
  const subscribers = db.prepare('SELECT * FROM newsletter ORDER BY created_at DESC').all();
  const csv = [
    'Email,Date',
    ...subscribers.map(s => `${s.email},${s.created_at}`)
  ].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv');
  res.send(csv);
});
module.exports = router;
