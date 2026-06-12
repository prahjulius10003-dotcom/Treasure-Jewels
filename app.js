require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');
const { initDB, db } = require('./database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'bagshopsecret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.cart = req.session.cart || [];
  res.locals.cartCount = (req.session.cart || []).reduce((sum, i) => sum + i.quantity, 0);
  res.locals.isAdmin = req.session.isAdmin || false;
  res.locals.adminName = req.session.adminName || 'Admin';
  // prefer session-stored avatar; fall back to DB-stored image or built-in placeholder
  if (req.session && req.session.adminImage) {
    res.locals.adminImage = req.session.adminImage;
  } else {
    try {
      const r = db.prepare('SELECT image FROM admin ORDER BY id LIMIT 1').get();
      res.locals.adminImage = (r && r.image) ? r.image : 'avatar-placeholder.svg';
    } catch (e) {
      res.locals.adminImage = 'avatar-placeholder.svg';
    }
  }
  next();
});

app.use('/', require('./routes/shop'));
app.use('/cart', require('./routes/cart'));
app.use('/payment', require('./routes/payment'));
app.use('/admin', require('./routes/admin'));

initDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Bag Shop running at http://localhost:${PORT}`));
