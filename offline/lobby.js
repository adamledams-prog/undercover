/* ============================================
   LOBBY HORS LIGNE — lobby.js
   ============================================ */

const CONFIGS = {
  joueurs: { val: 4, min: 3,  max: 20, minId: 'btnJoueursMinus', plusId: 'btnJoueursPlus', displayId: 'joueurCount' },
  uc:      { val: 1, min: 1,  max: 3,  minId: 'btnUcMinus',      plusId: 'btnUcPlus',      displayId: 'ucCount'     },
  white:   { val: 0, min: 0,  max: 3,  minId: 'btnWMinus',       plusId: 'btnWPlus',       displayId: 'whiteCount'  },
};

const hintEl = document.getElementById('hintMsg');

/* ---- Changer une valeur ---- */
function change(key, delta) {
  const cfg  = CONFIGS[key];
  const next = cfg.val + delta;
  if (next < cfg.min || next > cfg.max) return;

  cfg.val = next;

  /* Animation bump */
  const el = document.getElementById(cfg.displayId);
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 120);

  updateUI();
}

/* ---- Mise à jour de l'affichage ---- */
function updateUI() {
  for (const [, cfg] of Object.entries(CONFIGS)) {
    document.getElementById(cfg.displayId).textContent = cfg.val;
    document.getElementById(cfg.minId).disabled  = cfg.val <= cfg.min;
    document.getElementById(cfg.plusId).disabled = cfg.val >= cfg.max;
  }

  /* Validation : imposteurs < joueurs */
  const total      = CONFIGS.joueurs.val;
  const imposteurs = CONFIGS.uc.val + CONFIGS.white.val;
  hintEl.textContent = imposteurs >= total
    ? '⚠️ Trop d\'imposteurs par rapport aux joueurs !'
    : '';
}

/* ---- Commencer la partie ---- */
function demarrer() {
  const total      = CONFIGS.joueurs.val;
  const imposteurs = CONFIGS.uc.val + CONFIGS.white.val;

  if (imposteurs >= total) {
    showToast('⚠️ Réduisez le nombre d\'imposteurs !');
    return;
  }

  showToast(`🚀 Partie lancée — ${total} joueurs !`);
  // TODO: window.location.href = `game.html?joueurs=${total}&uc=${CONFIGS.uc.val}&white=${CONFIGS.white.val}`;
}

/* ---- Toast ---- */
let toastTimer = null;
function showToast(message, duration = 2400) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ---- Init ---- */
updateUI();
