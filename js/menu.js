/* ============================================================
   menu.js — Tab switching for the menu page
   ============================================================ */

function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.tab === name);
  });
  document.querySelectorAll('.tab-panel').forEach(function(p) {
    p.classList.remove('active');
  });
  var panel = document.getElementById('tab-' + name);
  if (panel) panel.classList.add('active');
}

/* Activate tab from URL hash (e.g. menu.html#burgers) */
document.addEventListener('DOMContentLoaded', function() {
  var hash = window.location.hash.replace('#', '');
  var valid = ['bowls', 'wraps', 'burgers', 'steak', 'sides', 'snacks'];
  if (hash && valid.indexOf(hash) !== -1) {
    switchTab(hash);
    var el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
