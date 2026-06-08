/* ============================================================
   gallery.js — Lightbox + scroll-reveal (IntersectionObserver)
   ============================================================ */

/* ---- Scroll reveal ---- */
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function(el) {
  revealObserver.observe(el);
});

/* ---- Lightbox ---- */
var lbItems   = [];
var lbCurrent = 0;

function buildLbItems() {
  lbItems = [];
  document.querySelectorAll('.gallery-item[data-index]').forEach(function(el) {
    var img = el.querySelector('img');
    var cap = el.getAttribute('data-caption') || '';
    if (img) lbItems.push({ src: img.src, alt: img.alt, cap: cap });
  });
}

function openLightbox(idx) {
  buildLbItems();
  lbCurrent = (idx >= 0 && idx < lbItems.length) ? idx : 0;
  lbShow();
  var lb = document.getElementById('lightbox');
  if (lb) { lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeLightbox() {
  var lb = document.getElementById('lightbox');
  if (lb) { lb.classList.remove('open'); document.body.style.overflow = ''; }
}

function lbOverlayClick(e) {
  if (e.target === e.currentTarget || e.target.id === 'lightbox') closeLightbox();
}

function lbNav(dir) {
  if (lbItems.length === 0) return;
  lbCurrent = (lbCurrent + dir + lbItems.length) % lbItems.length;
  lbShow();
}

function lbShow() {
  var item = lbItems[lbCurrent];
  if (!item) return;
  var img  = document.getElementById('lightboxImg');
  var ctr  = document.getElementById('lbCounter');
  if (img) { img.src = item.src; img.alt = item.alt; }
  if (ctr)   ctr.textContent = (lbCurrent + 1) + ' / ' + lbItems.length
               + (item.cap ? '  —  ' + item.cap : '');
}

/* Arrow-key navigation inside lightbox */
document.addEventListener('keydown', function(e) {
  var lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});

document.addEventListener('DOMContentLoaded', buildLbItems);
