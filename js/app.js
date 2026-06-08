/* ============================================================
   app.js — Cart (localStorage), modals, nav, toast, utilities
   ============================================================ */

/* ---- Cart state ---- */
var cart = [];
var _id  = 0;

function loadCart() {
  try {
    var saved = localStorage.getItem('tow_cart');
    if (saved) {
      cart = JSON.parse(saved);
      _id = cart.reduce(function(mx, i) { return Math.max(mx, i.id); }, 0);
    }
  } catch (e) { cart = []; }
}

function saveCart() {
  try { localStorage.setItem('tow_cart', JSON.stringify(cart)); } catch (e) {}
}

/* ---- Cart operations ---- */
function addToCart(name, price) {
  cart.push({ id: ++_id, name: name, price: price });
  saveCart();
  updateBadge();
  bounceFab();
  toast('✓ ' + name + ' added!', 'success');
}

function removeFromCart(id) {
  cart = cart.filter(function(i) { return i.id !== id; });
  saveCart();
  updateBadge();
  renderOrderBody();
}

function cartTotal() {
  return cart.reduce(function(s, i) { return s + i.price; }, 0);
}

function updateBadge() {
  var badge = document.getElementById('cartBadge');
  if (!badge) return;
  badge.textContent = cart.length;
  badge.classList.toggle('show', cart.length > 0);
}

function bounceFab() {
  var fab = document.getElementById('cartFab');
  if (!fab) return;
  fab.classList.remove('bounce');
  void fab.offsetWidth;
  fab.classList.add('bounce');
  fab.addEventListener('animationend', function() { fab.classList.remove('bounce'); }, { once: true });
}

/* ---- Mobile nav ---- */
function toggleMobileNav() {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('hamburger');
  if (!nav) return;
  var open = nav.classList.toggle('open');
  if (btn) btn.classList.toggle('open', open);
}

function closeMobileNav() {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('hamburger');
  if (nav) nav.classList.remove('open');
  if (btn) btn.classList.remove('open');
}

/* ---- Scroll helper ---- */
function scrollToEl(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---- Modal helpers ---- */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

function overlayClick(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}

/* ---- Order modal ---- */
function renderOrderBody() {
  var body = document.getElementById('orderModalBody');
  if (!body) return;

  var listHTML = cart.length === 0
    ? '<div class="cart-empty">Your cart is empty &mdash; add items from the <a href="menu.html" style="color:var(--gold)">menu</a>!</div>'
    : cart.map(function(item) {
        return '<div class="cart-item">'
          + '<span class="cart-item-name">' + escHTML(item.name) + '</span>'
          + '<div class="cart-item-right">'
          + '<span class="cart-item-price">$' + item.price.toFixed(2) + '</span>'
          + '<button class="btn-item-remove" onclick="removeFromCart(' + item.id + ')" aria-label="Remove">&times;</button>'
          + '</div></div>';
      }).join('');

  body.innerHTML = ''
    + '<h2 class="modal-title">&#x1F6D2; YOUR ORDER</h2>'
    + '<div class="cart-list">' + listHTML + '</div>'
    + '<div class="cart-total-row">'
    +   '<span class="cart-total-label">TOTAL</span>'
    +   '<span class="cart-total-val">$' + cartTotal().toFixed(2) + '</span>'
    + '</div>'
    + '<form class="order-form" onsubmit="placeOrder(event)">'
    +   '<div class="form-group"><label for="cName">Your Name</label>'
    +     '<input type="text" id="cName" placeholder="Enter your name" required autocomplete="name"></div>'
    +   '<div class="form-group"><label for="cPhone">Phone Number</label>'
    +     '<input type="tel" id="cPhone" placeholder="(555) 555-5555" required autocomplete="tel"></div>'
    +   '<div class="form-group"><label for="cPickup">Pickup Time</label>'
    +     '<input type="text" id="cPickup" placeholder="e.g. 1:30 PM" required></div>'
    +   '<div class="form-group"><label for="cNotes">Special Instructions</label>'
    +     '<input type="text" id="cNotes" placeholder="Any special requests?"></div>'
    +   '<div class="modal-actions">'
    +     '<button type="button" class="btn-modal-cancel" onclick="closeModal(\'orderModal\')">Cancel</button>'
    +     '<button type="submit" class="btn-place-order"'
    +       (cart.length === 0 ? ' disabled style="opacity:0.5"' : '')
    +     '>PLACE ORDER &#x1F525;</button>'
    +   '</div>'
    + '</form>';
}

function openOrderModal() {
  renderOrderBody();
  openModal('orderModal');
}

function openCallModal() {
  openModal('callModal');
}

/* ---- Place order ---- */
function placeOrder(e) {
  e.preventDefault();
  if (cart.length === 0) { toast('Please add items first!', 'error'); return; }

  var name   = document.getElementById('cName').value.trim();
  var phone  = document.getElementById('cPhone').value.trim();
  var pickup = document.getElementById('cPickup').value.trim();
  var total  = cartTotal();

  document.getElementById('orderModalBody').innerHTML = ''
    + '<div class="order-confirm">'
    +   '<div class="confirm-icon">&#x1F389;</div>'
    +   '<div class="confirm-title">ORDER PLACED!</div>'
    +   '<p class="confirm-text">'
    +     'Thanks, <strong style="color:var(--gold)">' + escHTML(name) + '</strong>!<br>'
    +     'Your order of <strong style="color:var(--gold)">$' + total.toFixed(2) + '</strong> is confirmed.<br><br>'
    +     'Hot &amp; ready at pickup by <strong style="color:var(--gold)">' + escHTML(pickup) + '</strong>.<br>'
    +     "We'll call <strong style=\"color:var(--gold)\">" + escHTML(phone) + '</strong> if needed.'
    +   '</p>'
    +   '<p class="confirm-fire">&#x1F525; MADE FRESH. MADE TO SATISFY. &#x1F525;</p>'
    +   '<button class="btn-primary-full" onclick="closeModal(\'orderModal\')">CLOSE &mdash; SEE YOU SOON!</button>'
    + '</div>';

  cart = [];
  saveCart();
  updateBadge();
}

/* ---- Toast ---- */
function toast(msg, type) {
  var old = document.querySelector('.toast');
  if (old) old.remove();
  var t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  t.style.background = (type === 'error') ? 'var(--red)' : 'var(--gold)';
  t.style.color       = (type === 'error') ? 'var(--white)' : 'var(--black)';
  document.body.appendChild(t);
  setTimeout(function() { if (t.parentNode) t.remove(); }, 2600);
}

/* ---- XSS-safe HTML escape ---- */
function escHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ---- Escape key closes any open modal ---- */
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Escape') return;
  if (typeof closeLightbox === 'function') {
    var lb = document.getElementById('lightbox');
    if (lb && lb.classList.contains('open')) { closeLightbox(); return; }
  }
  document.querySelectorAll('.modal-overlay.open').forEach(function(m) {
    closeModal(m.id);
  });
});

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  updateBadge();
  renderOrderBody();
});
