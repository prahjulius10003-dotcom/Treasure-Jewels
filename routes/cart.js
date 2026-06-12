const express = require('express');
const router = express.Router();
const { db } = require('../database');

router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  res.render('cart', { cart, total });
});

router.post('/add/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.redirect('/shop');
  const cart = req.session.cart || [];
  const existing = cart.find(i => i.id === product.id);
  if (existing) { existing.quantity += 1; }
  else { cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }); }
  req.session.cart = cart;
  req.flash('success', `${product.name} added to cart!`);
  res.redirect('back');
});

router.post('/update/:id', (req, res) => {
  const cart = req.session.cart || [];
  const qty = parseInt(req.body.quantity);
  if (qty <= 0) req.session.cart = cart.filter(i => i.id !== parseInt(req.params.id));
  else {
    const item = cart.find(i => i.id === parseInt(req.params.id));
    if (item) { item.quantity = qty; req.session.cart = cart; }
  }
  res.redirect('/cart');
});

router.post('/remove/:id', (req, res) => {
  req.session.cart = (req.session.cart || []).filter(i => i.id !== parseInt(req.params.id));
  res.redirect('/cart');
});

router.get('/checkout', (req, res) => {
  const cart = req.session.cart || [];
  if (cart.length === 0) return res.redirect('/cart');
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  res.render('checkout', { cart, total, paystackKey: process.env.PAYSTACK_PUBLIC_KEY });
});

module.exports = router;
