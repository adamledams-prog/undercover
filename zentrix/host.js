/* ============================================
   HOST — host.js
   ============================================ */

import { initializeApp }                       from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getDatabase, ref, set, push, onValue, serverTimestamp }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

/* ---- Init Firebase ---- */
const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

/* ---- Génère un code de salle 6 chars ---- */
function genRoomId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const ROOM_ID  = genRoomId();
const JOIN_URL = `${window.location.origin}${window.location.pathname.replace('host.html', 'join.html')}?room=${ROOM_ID}`;

/* ---- Références DOM ---- */
const qrImg        = document.getElementById('qrImg');
const qrLoader     = document.getElementById('qrLoader');
const roomCodeEl   = document.getElementById('roomCode');
const copyBtn      = document.getElementById('copyBtn');
const shareBtn     = document.getElementById('shareBtn');
const playerList   = document.getElementById('playerList');
const playersCount = document.getElementById('playersCount');
const launchBtn    = document.getElementById('launchBtn');
const launchLabel  = document.getElementById('launchLabel');

/* ---- Affiche le code et le QR ---- */
roomCodeEl.textContent = ROOM_ID;

const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(JOIN_URL)}&bgcolor=18182e&color=f0f0f8&margin=14&format=png`;
qrImg.src = qrSrc;
qrImg.onload  = () => { qrLoader.style.display = 'none'; qrImg.style.display = 'block'; };
qrImg.onerror = () => { qrLoader.textContent = '❌ Erreur QR'; };

/* ---- Crée la salle dans Firebase ---- */
const roomRef = ref(db, `rooms/${ROOM_ID}`);
set(roomRef, { status: 'waiting', createdAt: serverTimestamp() });

/* ---- Écoute les joueurs en temps réel ---- */
const playersRef = ref(db, `rooms/${ROOM_ID}/players`);

onValue(playersRef, snap => {
  const data    = snap.val();
  const players = data ? Object.values(data) : [];

  playerList.innerHTML = '';

  if (players.length === 0) {
    playerList.innerHTML = '<li class="player-list__empty">En attente de joueurs…</li>';
    launchBtn.disabled   = true;
    launchLabel.textContent = 'Attendre des joueurs…';
  } else {
    players
      .sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0))
      .forEach((p, i) => {
        const li = document.createElement('li');
        li.className   = 'player-list__item';
        li.innerHTML   = `<span class="pli__num">${i + 1}</span><span class="pli__name">${p.name}</span><span class="pli__check">✓</span>`;
        playerList.appendChild(li);
      });

    launchBtn.disabled  = players.length < 2;
    launchLabel.textContent = players.length < 2
      ? `Encore ${2 - players.length} joueur(s)…`
      : `Lancer la partie (${players.length} joueurs)`;
  }

  playersCount.textContent = `${players.length} joueur${players.length > 1 ? 's' : ''}`;
});

/* ---- Lancer la partie ---- */
launchBtn.addEventListener('click', async () => {
  await set(ref(db, `rooms/${ROOM_ID}/status`), 'playing');
  // Redirige vers la page de jeu Zentrix (à créer)
  // window.location.href = `game.html?room=${ROOM_ID}`;
  showToast('🚀 Partie lancée !');
});

/* ---- Copier le lien ---- */
copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(JOIN_URL);
  showToast('✅ Lien copié !');
});

/* ---- Partage natif (Web Share API) ---- */
shareBtn.addEventListener('click', async () => {
  if (navigator.share) {
    await navigator.share({
      title: 'Rejoins ma partie Zentrix !',
      text:  `Code : ${ROOM_ID}`,
      url:   JOIN_URL,
    });
  } else {
    await navigator.clipboard.writeText(JOIN_URL);
    showToast('✅ Lien copié dans le presse-papiers !');
  }
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
