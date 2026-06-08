/* ============================================================
   main.js — Cart, navigation, reveal, utilities
   ============================================================ */

var CART_KEY = 'tow_v3_cart';

/* ==== CART ==== */
function getCart() {
  try { var r = localStorage.getItem(CART_KEY); return r ? JSON.parse(r) : []; }
  catch (e) { return []; }
}
function _saveCart(cart) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
}
function addToCart(name, price, qty) {
  qty = qty || 1;
  var cart = getCart();
  var existing = null;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) { existing = cart[i]; break; }
  }
  if (existing) { existing.qty = (existing.qty || 1) + qty; }
  else { cart.push({ id: Date.now() + Math.random(), name: name, price: price, qty: qty }); }
  _saveCart(cart);
  updateCartBadge();
  _bounceFab();
  _showToast('✓ ' + name + ' added!', 'success');
}
function removeFromCart(id) {
  _saveCart(getCart().filter(function(i) { return i.id !== id; }));
  updateCartBadge();
}
function updateCartQty(id, qty) {
  if (qty < 1) { removeFromCart(id); return; }
  var cart = getCart();
  for (var i = 0; i < cart.length; i++) { if (cart[i].id === id) { cart[i].qty = qty; break; } }
  _saveCart(cart);
  updateCartBadge();
}
function clearCart() { _saveCart([]); updateCartBadge(); }
function getCartTotal() { return getCart().reduce(function(s,i){ return s+(i.price*(i.qty||1)); },0); }
function getCartCount() { return getCart().reduce(function(s,i){ return s+(i.qty||1); },0); }

function updateCartBadge() {
  var n = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(function(b) {
    b.textContent = n;
    b.classList.toggle('show', n > 0);
  });
  var fab = document.querySelector('.cart-fab-badge');
  if (fab) { fab.textContent = n; fab.classList.toggle('show', n > 0); }
}

function _bounceFab() {
  var fab = document.getElementById('cartFab');
  if (!fab) return;
  fab.classList.remove('bounce');
  void fab.offsetWidth;
  fab.classList.add('bounce');
  fab.addEventListener('animationend', function() { fab.classList.remove('bounce'); }, { once: true });
}

/* ==== TOAST ==== */
function _showToast(msg, type) {
  var t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = 'toast toast-' + (type || 'success');
  clearTimeout(t._tid);
  requestAnimationFrame(function() { t.classList.add('show'); });
  t._tid = setTimeout(function() { t.classList.remove('show'); }, 2800);
}
/* Public alias */
function showToast(msg, type) { _showToast(msg, type); }

/* ==== MOBILE NAV ==== */
function toggleMobileNav() {
  var ov = document.getElementById('mobileOverlay');
  var hb = document.getElementById('hamburger');
  if (!ov) return;
  var open = ov.classList.toggle('open');
  if (hb) hb.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMobileNav() {
  var ov = document.getElementById('mobileOverlay');
  var hb = document.getElementById('hamburger');
  if (ov) ov.classList.remove('open');
  if (hb) hb.classList.remove('open');
  document.body.style.overflow = '';
}

/* ==== ACTIVE NAV ==== */
function _setActiveNav() {
  var file = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0].split('#')[0];
  if (!file || file === '') file = 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-overlay a').forEach(function(a) {
    var hFile = (a.getAttribute('href') || '').split('/').pop().split('?')[0].split('#')[0];
    if (!hFile) hFile = 'index.html';
    a.classList.toggle('active', hFile === file);
  });
}

/* ==== NAVBAR SCROLL ==== */
function _navScroll() {
  var nb = document.querySelector('.navbar');
  if (nb) nb.classList.toggle('scrolled', window.scrollY > 10);
}

/* ==== SCROLL REVEAL ==== */
function _initReveal() {
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });
}

/* ==== MODAL ==== */
function openModal(id) {
  var m = document.getElementById(id);
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  var m = document.getElementById(id);
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
function overlayClick(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}

/* ==== ESCAPE KEY ==== */
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.modal-overlay.open').forEach(function(m) { closeModal(m.id); });
  closeMobileNav();
});

/* ==== SCROLL HELPER ==== */
function scrollTo(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ==== INIT ==== */
document.addEventListener('DOMContentLoaded', function() {
  updateCartBadge();
  _setActiveNav();
  _initReveal();
  window.addEventListener('scroll', _navScroll, { passive: true });
});

/* Cross-tab cart sync */
window.addEventListener('storage', function(e) {
  if (e.key === CART_KEY) updateCartBadge();
});
