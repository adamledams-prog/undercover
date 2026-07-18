/* ============================================
   UNDERCOVER — app.js
   ============================================ */

/* ---- Sélection du jeu ---- */
document.getElementById('btnUndercover').addEventListener('click', () => {
  window.location.href = 'offline/index.html';
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
