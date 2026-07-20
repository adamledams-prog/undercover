/* ============================================
   JOIN — join.js  (PeerJS, sans Firebase)
   ============================================ */

const params  = new URLSearchParams(window.location.search);
const ROOM_ID = params.get('room');

/* ---- Références DOM ---- */
const joinSub       = document.getElementById('joinSub');
const joinForm      = document.getElementById('joinForm');
const nameInput     = document.getElementById('nameInput');
const clearBtn      = document.getElementById('clearBtn');
const joinBtn       = document.getElementById('joinBtn');
const waitingScreen = document.getElementById('waitingScreen');
const waitingName   = document.getElementById('waitingName');
const errorScreen   = document.getElementById('errorScreen');
const errorMsg      = document.getElementById('errorMsg');

/* ---- Pas de code dans l'URL ---- */
if (!ROOM_ID) {
  showError('Lien invalide. Demande un nouveau QR code \u00e0 l\'h\u00f4te.');
} else {
  joinSub.textContent = 'Code : ' + ROOM_ID.toUpperCase();
}

let peer       = null;
let playerName = '';

/* ---- Bouton effacer ---- */
clearBtn.addEventListener('click', () => {
  nameInput.value = '';
  nameInput.focus();
  clearBtn.style.display = 'none';
});

nameInput.addEventListener('input', () => {
  clearBtn.style.display = nameInput.value ? 'flex' : 'none';
});

/* ---- Soumettre le prénom ---- */
joinBtn.addEventListener('click', submitName);
nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitName(); });

function submitName() {
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.classList.add('shake');
    setTimeout(() => nameInput.classList.remove('shake'), 400);
    return;
  }

  playerName = name;
  joinBtn.disabled    = true;
  joinBtn.textContent = '\u23f3 Connexion\u2026';

  connect(name);
}

/* ---- Connexion PeerJS ---- */
function connect(name) {
  peer = new Peer({ debug: 0 }); // ID aléatoire pour le joueur

  peer.on('open', () => {
    const conn = peer.connect(ROOM_ID, { reliable: true });

    /* Envoi du prénom dès que la connexion est ouverte */
    conn.on('open', () => {
      conn.send({ type: 'join', name });
    });

    /* Réponse de l'hôte */
    conn.on('data', data => {
      if (data.type === 'ack') {
        joinForm.hidden      = true;
        waitingScreen.hidden = false;
        waitingName.textContent = '\U0001f44b Salut ' + name + ' !';
      } else if (data.type === 'start') {
        waitingScreen.querySelector('.waiting-sub').textContent = '\U0001f680 La partie commence !';
        // TODO: window.location.href = `game.html?name=${encodeURIComponent(name)}`;
      }
    });

    conn.on('close', () => {
      if (!waitingScreen.hidden) {
        showToast('\u26a0\ufe0f Connexion perdue avec l\'h\u00f4te.');
      }
    });

    conn.on('error', () => {
      showError('Connexion échouée. Vérifie que l\'h\u00f4te est bien connecté.');
    });
  });

  /* Salle introuvable */
  peer.on('error', err => {
    if (err.type === 'peer-unavailable') {
      showError('Salle introuvable. Le code est peut-\u00eatre expiré.');
    } else {
      joinBtn.disabled    = false;
      joinBtn.textContent = 'Rejoindre \u2192';
      showToast('\u274c Erreur réseau. Réessaie.');
    }
  });

  /* Timeout si l'hôte ne répond pas */
  setTimeout(() => {
    if (!joinForm.hidden) {
      joinBtn.disabled    = false;
      joinBtn.textContent = 'Rejoindre \u2192';
      showToast('\u23f1 Timeout. L\'h\u00f4te est peut-\u00eatre déconnecté.');
    }
  }, 12000);
}

/* ---- Affiche un écran d'erreur ---- */
function showError(msg) {
  joinForm.hidden    = true;
  joinSub.textContent = '';
  errorScreen.hidden = false;
  errorMsg.textContent = msg;
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

/* ---- Init Firebase ---- */
const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

/* ---- Récupère le code de salle depuis l'URL ---- */
const params = new URLSearchParams(window.location.search);
const ROOM_ID = params.get('room');

/* ---- Références DOM ---- */
const joinSub      = document.getElementById('joinSub');
const joinForm     = document.getElementById('joinForm');
const nameInput    = document.getElementById('nameInput');
const clearBtn     = document.getElementById('clearBtn');
const joinBtn      = document.getElementById('joinBtn');
const waitingScreen = document.getElementById('waitingScreen');
const waitingName  = document.getElementById('waitingName');
const errorScreen  = document.getElementById('errorScreen');
const errorMsg     = document.getElementById('errorMsg');

/* ---- Pas de code de salle → erreur ---- */
if (!ROOM_ID) {
  showError('Lien invalide. Demande un nouveau QR code à l\'hôte.');
} else {
  joinSub.textContent = `Code de salle : ${ROOM_ID}`;
  checkRoom();
}

/* ---- Vérifie que la salle existe ---- */
async function checkRoom() {
  const snap = await get(ref(db, `rooms/${ROOM_ID}/status`));
  if (!snap.exists()) {
    showError('Cette salle n\'existe pas ou a expiré.');
  } else if (snap.val() === 'playing') {
    showError('La partie a déjà commencé !');
  }
}

/* ---- Bouton effacer ---- */
clearBtn.addEventListener('click', () => {
  nameInput.value = '';
  nameInput.focus();
});

nameInput.addEventListener('input', () => {
  clearBtn.style.display = nameInput.value ? 'flex' : 'none';
});

/* ---- Rejoindre la partie ---- */
joinBtn.addEventListener('click', submitName);
nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitName(); });

async function submitName() {
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.classList.add('shake');
    setTimeout(() => nameInput.classList.remove('shake'), 400);
    return;
  }

  joinBtn.disabled = true;
  joinBtn.textContent = '⏳ Connexion…';

  try {
    /* Vérifie une dernière fois que la salle est ouverte */
    const snap = await get(ref(db, `rooms/${ROOM_ID}/status`));
    if (!snap.exists() || snap.val() === 'playing') {
      showError('La salle n\'est plus disponible.');
      return;
    }

    /* Ajoute le joueur */
    await push(ref(db, `rooms/${ROOM_ID}/players`), {
      name,
      joinedAt: serverTimestamp(),
    });

    /* Passe à l'écran d'attente */
    joinForm.hidden     = true;
    waitingScreen.hidden = false;
    waitingName.textContent = `👋 Salut ${name} !`;

    /* Écoute le lancement de la partie */
    onValue(ref(db, `rooms/${ROOM_ID}/status`), s => {
      if (s.val() === 'playing') {
        // Redirige vers la page de jeu Zentrix (à créer)
        // window.location.href = `game.html?room=${ROOM_ID}&name=${encodeURIComponent(name)}`;
        waitingScreen.querySelector('.waiting-sub').textContent = '🚀 La partie commence !';
      }
    });

  } catch {
    joinBtn.disabled = false;
    joinBtn.textContent = 'Rejoindre →';
    showToast('❌ Erreur de connexion, réessaie.');
  }
}

/* ---- Affiche un écran d'erreur ---- */
function showError(msg) {
  joinForm.hidden    = true;
  joinSub.textContent = '';
  errorScreen.hidden = false;
  errorMsg.textContent = msg;
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
