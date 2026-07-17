/* ============================================
   GAME — game.js
   ============================================ */

/* ---- Banque de mots (civil, undercover) ---- */
const MOTS = [
  ['Chat',        'Chien'],
  ['Plage',       'Piscine'],
  ['Pizza',       'Burger'],
  ['Avion',       'Hélicoptère'],
  ['Cinéma',      'Théâtre'],
  ['Café',        'Thé'],
  ['Football',    'Basketball'],
  ['Chocolat',    'Caramel'],
  ['Vampire',     'Zombie'],
  ['Château',     'Manoir'],
  ['Montagne',    'Colline'],
  ['Forêt',       'Jungle'],
  ['Soleil',      'Lune'],
  ['Glace',       'Sorbet'],
  ['Guitare',     'Violon'],
  ['Docteur',     'Infirmier'],
  ['Pirate',      'Corsaire'],
  ['Bibliothèque','Librairie'],
  ['Tramway',     'Bus'],
  ['Gâteau',      'Tarte'],
  ['Requin',      'Dauphin'],
  ['Police',      'Armée'],
  ['Boulanger',   'Pâtissier'],
  ['Tigre',       'Lion'],
  ['Rivière',     'Lac'],
];

/* ---- Lecture des paramètres URL ---- */
const params   = new URLSearchParams(window.location.search);
const NB_JOUEURS = parseInt(params.get('joueurs') || '4', 10);
const NB_UC      = parseInt(params.get('uc')      || '1', 10);
const NB_WHITE   = parseInt(params.get('white')   || '0', 10);

/* ---- Sélection d'une paire de mots aléatoire ---- */
const paire = MOTS[Math.floor(Math.random() * MOTS.length)];
const MOT_CIVIL = paire[0];
const MOT_UC    = paire[1];

/* ---- Construction et mélange des rôles ---- */
function buildRoles() {
  const roles = [];
  const nbCivils = NB_JOUEURS - NB_UC - NB_WHITE;
  for (let i = 0; i < nbCivils;  i++) roles.push({ type: 'civil',   mot: MOT_CIVIL });
  for (let i = 0; i < NB_UC;     i++) roles.push({ type: 'uc',      mot: MOT_UC    });
  for (let i = 0; i < NB_WHITE;  i++) roles.push({ type: 'white',   mot: null       });
  /* Mélange Fisher-Yates */
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }
  return roles;
}

const ROLES   = buildRoles();
const NOMS    = Array(NB_JOUEURS).fill('');   // prénoms saisis
let current   = 0;                            // index joueur actuel

/* ---- Références DOM ---- */
const panelName = document.getElementById('panelName');
const panelRole = document.getElementById('panelRole');
const panelPass = document.getElementById('panelPass');
const panelDone = document.getElementById('panelDone');

const stepBadge  = document.getElementById('stepBadge');
const nameLabel  = document.getElementById('nameLabel');
const nameInput  = document.getElementById('nameInput');
const roleBadge  = document.getElementById('roleBadge');
const roleCard   = document.getElementById('roleCard');
const roleEmoji  = document.getElementById('roleEmoji');
const roleWord   = document.getElementById('roleWord');
const roleHint   = document.getElementById('roleHint');
const passTitle  = document.getElementById('passTitle');
const passName   = document.getElementById('passName');

/* ============================================
   NAVIGATION ENTRE PANELS
   ============================================ */
function show(panel) {
  [panelName, panelRole, panelPass, panelDone].forEach(p => {
    p.classList.add('panel--hidden');
  });
  panel.classList.remove('panel--hidden');
  /* Re-déclenche l'animation */
  void panel.offsetWidth;
  panel.style.animation = 'none';
  panel.offsetHeight;
  panel.style.animation = '';
}

/* ============================================
   PANEL NAME
   ============================================ */
function showName() {
  const num  = current + 1;
  const def  = `Joueur ${num}`;

  stepBadge.textContent = `Joueur ${num} / ${NB_JOUEURS}`;
  nameLabel.textContent = def;
  nameInput.value       = NOMS[current] || '';
  nameInput.placeholder = `${def}…`;

  show(panelName);
  setTimeout(() => nameInput.focus(), 300);
}

function clearName() {
  nameInput.value = '';
  nameInput.focus();
}

/* ============================================
   PANEL ROLE
   ============================================ */
function revealRole() {
  const nom  = nameInput.value.trim() || `Joueur ${current + 1}`;
  NOMS[current] = nom;

  const role = ROLES[current];

  roleBadge.textContent = nom;

  /* Réinitialise la carte */
  roleCard.className = 'role-card';

  if (role.type === 'white') {
    roleCard.classList.add('role-card--mrwhite');
    roleEmoji.textContent = '🤍';
    roleWord.textContent  = 'Mr White';
    roleHint.textContent  = 'Tu ne connais aucun mot !';
  } else {
    roleEmoji.textContent = '🃏';
    roleWord.textContent  = role.mot;
    roleHint.textContent  = 'Mémorise bien ton mot !';
  }

  show(panelRole);
}

/* ============================================
   PANEL PASS / DONE
   ============================================ */
function nextPlayer() {
  current++;

  if (current >= NB_JOUEURS) {
    showDone();
    return;
  }

  /* Affiche l'écran "Passe l'appareil" avant le joueur suivant */
  const nextNom = `Joueur ${current + 1}`;
  passName.textContent = nextNom;
  show(panelPass);
}

/* ============================================
   PANEL DONE
   ============================================ */
function showDone() {
  const recap = document.getElementById('doneRecap');
  recap.innerHTML = '';

  NOMS.forEach((nom, i) => {
    const row = document.createElement('div');
    row.className = 'recap-row';
    row.innerHTML = `<span>${nom || `Joueur ${i + 1}`}</span><span>Rôle reçu ✓</span>`;
    recap.appendChild(row);
  });

  show(panelDone);
}

/* ============================================
   INIT
   ============================================ */
showName();
