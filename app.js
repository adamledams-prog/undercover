/* ============================================
   UNDERCOVER — app.js
   ============================================ */

/* ---- Mode selection ---- */
document.getElementById('btnOffline').addEventListener('click', () => {
  window.location.href = 'offline/index.html';
});

document.getElementById('btnOnline').addEventListener('click', () => {
  showToast('🌐 Mode en ligne — bientôt disponible !');
});

/* ---- Règles ---- */
document.getElementById('rulesBtn').addEventListener('click', () => {
  const btn   = document.getElementById('rulesBtn');
  const panel = document.getElementById('rulesPanel');
  const open  = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  panel.hidden = open;
});

/* ---- Toast ---- */
let toastTimer = null;

function showToast(message, duration = 2400) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}
