const express = require('express');
const router = express.Router();
const https = require('https');
const { db } = require('../database');

router.post('/place-order', (req, res) => {
  const { name, email, phone, address, city, payment_method, payment_number, notes } = req.body;
  const cart = req.session.cart || [];
  if (cart.length === 0) return res.redirect('/cart');
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const items = JSON.stringify(cart);

  const result = db.prepare(`
    INSERT INTO orders (customer_name, customer_email, customer_phone, delivery_address, city, items, total, payment_method, payment_status, order_status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending', ?)
  `).run(name, email, phone, address, city, items, total, payment_method, notes || '');

  const orderId = result.lastInsertRowid;

  if (payment_method === 'cash') {
    req.session.cart = [];
    return res.redirect(`/order-success/${orderId}`);
  }

  req.session.pendingOrderId = orderId;
  const metadata = { orderId, name, phone, payment_method };
  if (payment_number && payment_method === 'momo') metadata.payment_number = payment_number;

  const paystackData = JSON.stringify({
    email, amount: Math.round(total * 100),
    reference: `BAG-${orderId}-${Date.now()}`,
    callback_url: `${req.protocol}://${req.get('host')}/payment/verify`,
    metadata
  });

  const options = {
    hostname: 'api.paystack.co', port: 443,
    path: '/transaction/initialize', method: 'POST',
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' }
  };

  const paystackReq = https.request(options, paystackRes => {
    let data = '';
    paystackRes.on('data', chunk => data += chunk);
    paystackRes.on('end', () => {
      const response = JSON.parse(data);
      if (response.status) res.redirect(response.data.authorization_url);
      else { req.flash('error', 'Payment initialization failed. Try again.'); res.redirect('/cart/checkout'); }
    });
  });
  paystackReq.on('error', () => { req.flash('error', 'Payment error. Please try again.'); res.redirect('/cart/checkout'); });
  paystackReq.write(paystackData);
  paystackReq.end();
});

router.get('/verify', (req, res) => {
  const { reference } = req.query;
  const options = {
    hostname: 'api.paystack.co', port: 443,
    path: `/transaction/verify/${reference}`, method: 'GET',
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
  };
  https.request(options, paystackRes => {
    let data = '';
    paystackRes.on('data', chunk => data += chunk);
    paystackRes.on('end', () => {
      const response = JSON.parse(data);
      const orderId = req.session.pendingOrderId;
      if (response.status && response.data.status === 'success') {
        db.prepare('UPDATE orders SET payment_status = ?, paystack_ref = ? WHERE id = ?').run('paid', reference, orderId);
        req.session.cart = [];
        req.session.pendingOrderId = null;
        res.redirect(`/order-success/${orderId}`);
      } else {
        db.prepare('UPDATE orders SET payment_status = ? WHERE id = ?').run('failed', orderId);
        req.flash('error', 'Payment was not successful. Please try again.');
        res.redirect('/cart/checkout');
      }
    });
  }).end();
});

module.exports = router;
