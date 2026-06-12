// ── Navbar scroll effect
const nav = document.getElementById('mainNav');
if(nav){
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── Search overlay
const searchToggle = document.getElementById('searchToggle');
const searchClose = document.getElementById('searchClose');
const searchOverlay = document.getElementById('searchOverlay');
if(searchToggle && searchOverlay){
  searchToggle.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchOverlay.querySelector('input').focus();
  });
  searchClose.addEventListener('click', () => searchOverlay.classList.remove('active'));
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') searchOverlay.classList.remove('active');
  });
}

// ── Toast auto dismiss
const toast = document.getElementById('toastMsg');
if(toast){ setTimeout(() => toast.remove(), 4200); }

// ── Back to top
const backBtn = document.getElementById('backToTop');
if(backBtn){
  window.addEventListener('scroll', () => backBtn.classList.toggle('visible', window.scrollY > 300));
  backBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

// ── Wishlist toggle (AJAX)
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = btn.dataset.id;
    const res = await fetch(`/wishlist/toggle/${id}`, {method:'POST'});
    if(res.ok){
      const data = await res.json();
      const icon = btn.querySelector('i');
      if(data.wishlisted){
        icon.className = 'bi bi-heart-fill';
        btn.classList.add('active');
      } else {
        icon.className = 'bi bi-heart';
        btn.classList.remove('active');
      }
    }
  });
});

// ── Wishlist large button on product detail
const wishlistBtnLg = document.querySelector('.wishlist-btn-lg');
if(wishlistBtnLg){
  wishlistBtnLg.addEventListener('click', async () => {
    const id = wishlistBtnLg.dataset.id;
    const res = await fetch(`/wishlist/toggle/${id}`, {method:'POST'});
    if(res.ok){
      const data = await res.json();
      wishlistBtnLg.innerHTML = data.wishlisted
        ? '<i class="bi bi-heart-fill me-2"></i> Saved to Wishlist'
        : '<i class="bi bi-heart me-2"></i> Save to Wishlist';
    }
  });
}

// ── Animate product cards on scroll (Intersection Observer)
const cards = document.querySelectorAll('.product-card, .testimonial-card, .stat-card');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.1});
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity .5s ease, transform .5s ease';
    io.observe(card);
  });
}

// ── Add-to-cart button loading state
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.closest('form').addEventListener('submit', () => {
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Adding...';
    btn.disabled = true;
  });
});
