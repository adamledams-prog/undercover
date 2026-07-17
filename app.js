/* ============================================
   UNDERCOVER — app.js
   Logique de la page d'accueil
   ============================================ */

/**
 * Gère le choix de mode (en ligne / hors ligne).
 * Pour l'instant affiche un toast; remplacez les
 * redirections par les vraies pages quand elles seront prêtes.
 *
 * @param {'online'|'offline'} mode
 */
function choisirMode(mode) {
  if (mode === 'offline') {
    window.location.href = 'offline/index.html';
  } else {
    showToast('🌐 Mode en ligne — chargement…');
    // TODO: window.location.href = 'online/lobby.html';
  }
}

/* ============================================
   ACCORDÉON RÈGLES
   ============================================ */
function toggleRules() {
  const btn   = document.getElementById('rulesBtn');
  const panel = document.getElementById('rulesPanel');
  const open  = btn.getAttribute('aria-expanded') === 'true';

  btn.setAttribute('aria-expanded', String(!open));
  panel.hidden = open;
}

/* ============================================
   TOAST
   ============================================ */
let toastTimer = null;

function showToast(message, duration = 2400) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}
