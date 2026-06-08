/* ============================================================
   order.js — Order page: mini-menu, cart sidebar, form logic
   ============================================================ */

var COMBO_PRICE = 4.99;
var comboOn = false;
var activeMenuTab = 'bowls';

var MENU = {
  bowls: [
    { name:'Lamb Over Rice',           price:10.99, tags:'Halal · Rice Base' },
    { name:'Chicken Over Rice',         price:10.99, tags:'Halal · Rice Base' },
    { name:'Lamb & Chicken Over Rice',  price:12.99, tags:'Halal · Best Seller' },
    { name:'Falafel Over Rice',         price:9.99,  tags:'Vegetarian · Tahini' },
  ],
  wraps: [
    { name:'Chicken Gyro Wrap',   price:9.99,  tags:'Halal · Pita' },
    { name:'Lamb Gyro Wrap',      price:9.99,  tags:'Halal · Pita' },
    { name:'Falafel Wrap',        price:8.99,  tags:'Vegetarian · Pita' },
    { name:'Fried Chicken Wrap',  price:9.99,  tags:'Halal · Tortilla' },
  ],
  burgers: [
    { name:'Hamburger',          price:7.99,  tags:'Halal Beef' },
    { name:'Cheeseburger',       price:8.99,  tags:'Halal Beef · Cheese' },
    { name:'Chicken Sandwich',   price:9.99,  tags:'Halal Chicken' },
    { name:'Double Cheeseburger',price:11.99, tags:'Halal Beef · Double' },
  ],
  steak: [
    { name:'Original Steak or Chicken', price:11.99, tags:'Halal · Hoagie' },
    { name:'Supreme Steak or Chicken',  price:13.99, tags:'Halal · Loaded' },
  ],
  sides: [
    { name:'French Fries',       price:3.99,  tags:'Vegan · Crispy' },
    { name:'Cheese Fries',       price:4.99,  tags:'Vegetarian' },
    { name:'Chilli Cheese Fries',price:5.99,  tags:'Loaded' },
    { name:'Mozzarella Sticks',  price:4.99,  tags:'Vegetarian' },
  ],
  snacks: [
    { name:'Chicken Tenders',price:7.99, tags:'Halal' },
    { name:'Chicken Wings',  price:8.99, tags:'Halal' },
    { name:'Chicken Nuggets',price:5.99, tags:'Halal' },
    { name:'Nachos',         price:5.99, tags:'Vegetarian' },
  ],
};

/* ==== MENU TABS ==== */
function switchOrderTab(tab) {
  activeMenuTab = tab;
  document.querySelectorAll('.otab-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  renderMenuPanel();
}

function renderMenuPanel() {
  var el = document.getElementById('menuPanel');
  if (!el) return;
  var items = MENU[activeMenuTab] || [];
  el.innerHTML = items.map(function(item) {
    var safe = item.name.replace(/'/g, "\\'");
    return '<div class="omenu-item">'
      + '<div class="omenu-item-info">'
      +   '<div class="omenu-item-name">' + item.name + '</div>'
      +   '<div class="omenu-item-tags">' + item.tags + '</div>'
      + '</div>'
      + '<div class="omenu-item-right">'
      +   '<span class="omenu-item-price">$' + item.price.toFixed(2) + '</span>'
      +   '<button class="btn btn-red btn-sm omenu-add" onclick="addToCart(\'' + safe + '\',' + item.price + '); refreshOrderPage();">+ ADD</button>'
      + '</div>'
      + '</div>';
  }).join('');
}

/* ==== SIDEBAR ==== */
function renderSidebar() {
  var el = document.getElementById('orderSidebar');
  if (!el) return;
  var cart = getCart();
  if (cart.length === 0 && !comboOn) {
    el.innerHTML = '<div class="sidebar-empty"><div style="font-size:2.5rem;margin-bottom:12px">🛒</div>'
      + '<p>Your cart is empty.<br>Add items to get started!</p></div>';
    return;
  }
  var html = '<div class="sidebar-items">';
  cart.forEach(function(item) {
    html += '<div class="sb-item">'
      + '<div class="sb-item-left">'
      +   '<button class="sb-qty-btn" onclick="updateCartQty(' + item.id + ',' + ((item.qty||1)-1) + ');refreshOrderPage();">−</button>'
      +   '<span class="sb-qty">' + (item.qty||1) + '</span>'
      +   '<button class="sb-qty-btn" onclick="updateCartQty(' + item.id + ',' + ((item.qty||1)+1) + ');refreshOrderPage();">+</button>'
      + '</div>'
      + '<span class="sb-name">' + item.name + '</span>'
      + '<div class="sb-right">'
      +   '<span class="sb-price">$' + (item.price*(item.qty||1)).toFixed(2) + '</span>'
      +   '<button class="sb-remove" onclick="removeFromCart(' + item.id + ');refreshOrderPage();" aria-label="Remove">×</button>'
      + '</div>'
      + '</div>';
  });
  if (comboOn) {
    html += '<div class="sb-item sb-combo">'
      + '<span class="sb-name">Combo — Fries + Drink</span>'
      + '<div class="sb-right"><span class="sb-price">$' + COMBO_PRICE.toFixed(2) + '</span></div>'
      + '</div>';
  }
  html += '</div>';
  var total = getCartTotal() + (comboOn ? COMBO_PRICE : 0);
  html += '<div class="sb-total"><span>ORDER TOTAL</span><span>$' + total.toFixed(2) + '</span></div>';
  el.innerHTML = html;
}

/* ==== ORDER REVIEW SUMMARY ==== */
function renderReview() {
  var el = document.getElementById('reviewSummary');
  if (!el) return;
  var cart = getCart();
  var sub = getCartTotal();
  var combo = comboOn ? COMBO_PRICE : 0;
  var total = sub + combo;
  var html = '';
  if (cart.length === 0 && !comboOn) {
    html = '<div class="review-empty">No items added yet.</div>';
  } else {
    cart.forEach(function(i) {
      html += '<div class="review-row"><span>' + (i.qty||1) + '× ' + i.name + '</span><span>$' + (i.price*(i.qty||1)).toFixed(2) + '</span></div>';
    });
    if (comboOn) html += '<div class="review-row"><span>Combo Add-on</span><span>$' + COMBO_PRICE.toFixed(2) + '</span></div>';
    html += '<div class="review-row review-row-sub"><span>Subtotal</span><span>$' + sub.toFixed(2) + '</span></div>';
    if (comboOn) html += '<div class="review-row"><span>Combo</span><span>+$' + COMBO_PRICE.toFixed(2) + '</span></div>';
    html += '<div class="review-row review-row-total"><span>TOTAL</span><span>$' + total.toFixed(2) + '</span></div>';
  }
  el.innerHTML = html;
}

function refreshOrderPage() {
  updateCartBadge();
  renderSidebar();
  renderReview();
}

/* ==== COMBO TOGGLE ==== */
function toggleCombo() {
  var cb = document.getElementById('comboCheck');
  comboOn = cb ? cb.checked : false;
  refreshOrderPage();
}

/* ==== PICKUP TIMES ==== */
function buildPickupTimes() {
  var sel = document.getElementById('pickupTime');
  if (!sel) return;
  var now = new Date();
  now.setMinutes(now.getMinutes() + 15);
  var html = '<option value="">— Select pickup time —</option>';
  for (var i = 0; i < 20; i++) {
    var t = new Date(now.getTime() + i * 15 * 60000);
    var h = t.getHours(), m = t.getMinutes();
    var ap = h >= 12 ? 'PM' : 'AM';
    var h12 = h % 12 || 12;
    var ms = m < 10 ? '0' + m : m;
    var label = h12 + ':' + ms + ' ' + ap + (i === 0 ? ' (ASAP)' : '');
    html += '<option value="' + label + '">' + label + '</option>';
  }
  sel.innerHTML = html;
}

/* ==== FORM SUBMIT ==== */
function submitOrder(e) {
  e.preventDefault();
  var cart = getCart();
  if (cart.length === 0 && !comboOn) { _showToast('Please add items first!', 'error'); return; }
  var name   = document.getElementById('custName').value.trim();
  var phone  = document.getElementById('custPhone').value.trim();
  var pickup = document.getElementById('pickupTime').value;
  if (!name)   { _showToast('Please enter your name', 'error'); return; }
  if (!phone)  { _showToast('Please enter your phone number', 'error'); return; }
  if (!pickup) { _showToast('Please select a pickup time', 'error'); return; }
  var total = getCartTotal() + (comboOn ? COMBO_PRICE : 0);
  _showSuccess(name, phone, pickup, cart, total);
}

function _showSuccess(name, phone, pickup, cart, total) {
  clearCart();
  comboOn = false;
  refreshOrderPage();
  var orderSec = document.getElementById('orderSection');
  var successSec = document.getElementById('successSection');
  if (orderSec)  orderSec.style.display = 'none';
  if (!successSec) return;
  successSec.style.display = 'block';
  successSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  var sName   = document.getElementById('sName');
  var sPickup = document.getElementById('sPickup');
  var sTotal  = document.getElementById('sTotal');
  var sPhone  = document.getElementById('sPhone');
  var sItems  = document.getElementById('sItems');
  if (sName)   sName.textContent   = name;
  if (sPickup) sPickup.textContent = pickup;
  if (sTotal)  sTotal.textContent  = '$' + total.toFixed(2);
  if (sPhone)  sPhone.textContent  = phone;
  if (sItems)  sItems.innerHTML = cart.map(function(i) {
    return '<div class="si-line">' + (i.qty||1) + '× ' + i.name + ' — $' + (i.price*(i.qty||1)).toFixed(2) + '</div>';
  }).join('');
}

/* ==== INIT ==== */
document.addEventListener('DOMContentLoaded', function() {
  renderMenuPanel();
  renderSidebar();
  renderReview();
  buildPickupTimes();
  var form = document.getElementById('orderForm');
  if (form) form.addEventListener('submit', submitOrder);
  var combo = document.getElementById('comboCheck');
  if (combo) combo.addEventListener('change', toggleCombo);
  window.addEventListener('storage', function(e) {
    if (e.key === CART_KEY) refreshOrderPage();
  });
});
