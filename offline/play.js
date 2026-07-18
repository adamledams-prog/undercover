/* ============================================
   PLAY PAGE — play.js
   ============================================ */

/* ---- Lecture de sessionStorage ---- */
const raw = sessionStorage.getItem('undercoverGame');
if (!raw) { window.location.href = '../index.html'; }

const { players } = JSON.parse(raw);
const TOTAL = players.length;

let currentIdx = 0;   // joueur actif
let round      = 1;   // numéro de manche

/* ---- Références DOM ---- */
const roundBadge  = document.getElementById('roundBadge');
const playTitle   = document.getElementById('playTitle');
const playSub     = document.getElementById('playSub');
const activeCard  = document.getElementById('activeCard');
const activeNum   = document.getElementById('activeNum');
const activeName  = document.getElementById('activeName');
const playersGrid = document.getElementById('playersGrid');
const nextBtn     = document.getElementById('nextBtn');
const nextBtnLbl  = document.getElementById('nextBtnLabel');

/* ============================================
   RENDU PRINCIPAL
   ============================================ */
function render() {
  const p = players[currentIdx];

  /* -- Header -- */
  roundBadge.textContent = `Manche ${round}`;
  playTitle.textContent  = 'À toi de jouer !';
  playSub.textContent    = 'Décris ton mot en un seul indice, sans le dire.';

  /* -- Carte active (animation reset) -- */
  activeNum.textContent  = `#${currentIdx + 1}`;
  activeName.textContent = p.name;

  activeCard.style.animation = 'none';
  void activeCard.offsetWidth;
  activeCard.style.animation = '';

  /* -- Grille des autres joueurs -- */
  playersGrid.innerHTML = '';

  players.forEach((player, i) => {
    if (i === currentIdx) return; // la carte active les représente déjà

    const card = document.createElement('div');
    const done = i < currentIdx;

    card.className = `player-card${done ? ' player-card--done' : ''}`;
    card.innerHTML = `
      <span class="player-card__num">#${i + 1}</span>
      <span class="player-card__name">${player.name}</span>
      ${done ? '<span class="player-card__check">✓</span>' : ''}
    `;
    playersGrid.appendChild(card);
  });

  /* -- Bouton -- */
  const isLast = currentIdx === TOTAL - 1;
  nextBtnLbl.textContent = isLast ? '🗳 Passer au vote' : 'Suivant →';
  nextBtn.className = `next-btn${isLast ? ' next-btn--vote' : ''}`;
}

/* ============================================
   AVANCER AU JOUEUR SUIVANT
   ============================================ */
nextBtn.addEventListener('click', () => {
  const isLast = currentIdx === TOTAL - 1;

  if (isLast) {
    showVote();
    return;
  }

  currentIdx++;
  render();
});

/* ============================================
   ÉCRAN DE VOTE (fin de manche)
   ============================================ */
function showVote() {
  /* Remplace le contenu de main */
  const main = document.querySelector('.play-page');
  main.innerHTML = buildVoteHTML();

  /* Câble les cartes de vote */
  let selected = null;

  main.querySelectorAll('.vote-card').forEach(card => {
    card.addEventListener('click', () => {
      main.querySelectorAll('.vote-card').forEach(c => c.classList.remove('vote-card--selected'));
      card.classList.add('vote-card--selected');
      selected = card.dataset.idx;
      main.querySelector('.confirm-btn').disabled = false;
    });
  });

  main.querySelector('.confirm-btn').addEventListener('click', () => {
    if (selected === null) return;
    eliminatePlayer(parseInt(selected, 10));
  });
}

function buildVoteHTML() {
  const cards = players
    .filter(p => !p.eliminated)
    .map((p, i) => {
      const orig = players.indexOf(p);
      return `
        <div class="vote-card" data-idx="${orig}">
          <span class="vote-card__name">${p.name}</span>
        </div>`;
    }).join('');

  return `
    <div class="vote-screen">
      <div class="round-badge">Manche ${round} · Vote</div>
      <h2 class="vote-title">Qui est l'imposteur ?</h2>
      <p class="vote-sub">Votez pour éliminer un joueur suspect.</p>
      <div class="vote-grid">${cards}</div>
      <button class="confirm-btn" disabled>Éliminer ce joueur 🗳</button>
    </div>`;
}

/* ============================================
   ÉLIMINATION + FIN DE MANCHE
   ============================================ */
function eliminatePlayer(idx) {
  players[idx].eliminated = true;

  const alive        = players.filter(p => !p.eliminated);
  const aliveUc      = alive.filter(p => p.roleType === 'uc');
  const aliveWhite   = alive.filter(p => p.roleType === 'white');
  const aliveCivils  = alive.filter(p => p.roleType === 'civil');
  const eliminated   = players[idx];

  /* Conditions de fin */
  if (aliveUc.length === 0 && aliveWhite.length === 0) {
    return showEndScreen('civils');           // Civils gagnent
  }
  if (aliveCivils.length <= aliveUc.length + aliveWhite.length) {
    return showEndScreen('imposteurs');       // Imposteurs gagnent
  }

  /* Mr White éliminé → il peut deviner le mot civil */
  if (eliminated.roleType === 'white') {
    return showMrWhiteGuess(eliminated, alive);
  }

  /* Continuer la manche suivante */
  nextRound(alive);
}

/* ============================================
   MR WHITE DEVINE
   ============================================ */
function showMrWhiteGuess(mrWhite, alive) {
  const { motCivil } = JSON.parse(sessionStorage.getItem('undercoverGame'));
  const main = document.querySelector('.play-page');

  main.innerHTML = `
    <div class="vote-screen">
      <div class="round-badge">Mr White éliminé !</div>
      <h2 class="vote-title">Dernière chance 🤍</h2>
      <p class="vote-sub">${mrWhite.name}, tu as été éliminé. Devine le mot des civils pour gagner !</p>
      <div class="name-field" style="display:flex;flex-direction:column;gap:.4rem">
        <input id="guessInput" type="text" placeholder="Ton mot…"
          style="padding:.9rem 1rem;background:var(--clr-card);border:1.5px solid var(--clr-border-2);
          border-radius:var(--radius-lg);color:var(--clr-text);font-size:1.1rem;font-weight:700;
          outline:none;font-family:inherit;width:100%"/>
      </div>
      <button id="guessBtn" class="next-btn">Valider ma réponse</button>
    </div>`;

  document.getElementById('guessBtn').addEventListener('click', () => {
    const guess = document.getElementById('guessInput').value.trim().toLowerCase();
    if (!guess) return;
    if (guess === motCivil.toLowerCase()) {
      showEndScreen('mrwhite');
    } else {
      nextRound(alive);
    }
  });
}

/* ============================================
   MANCHE SUIVANTE
   ============================================ */
function nextRound(alive) {
  /* Reset les joueurs actifs dans l'ordre de jeu original (sans éliminés) */
  players.forEach((p, i) => { players[i] = p; });
  currentIdx = 0;
  round++;

  /* Reconstruire avec les joueurs encore en vie dans l'ordre de jeu */
  const main = document.querySelector('.play-page');
  main.innerHTML = `
    <header class="play-header">
      <div class="round-badge" id="roundBadge">Manche ${round}</div>
      <h1 class="play-title" id="playTitle">À toi de jouer !</h1>
      <p class="play-sub" id="playSub">Décris ton mot en un seul indice.</p>
    </header>
    <div class="active-card" id="activeCard">
      <div class="active-card__num" id="activeNum">1</div>
      <span class="active-card__name" id="activeName">—</span>
      <span class="active-card__hint">Donne ton indice !</span>
    </div>
    <div class="players-grid" id="playersGrid"></div>
    <button class="next-btn" id="nextBtn">
      <span id="nextBtnLabel">Suivant →</span>
    </button>`;

  /* Re-câbler */
  document.getElementById('nextBtn').addEventListener('click', () => {
    const aliveNow = players.filter(p => !p.eliminated);
    const aliveIdx = players.filter(p => !p.eliminated);
    const isLast   = currentIdx === aliveIdx.length - 1;

    if (isLast) {
      showVote();
      return;
    }
    currentIdx++;
    renderAlive();
  });

  renderAlive();
}

function renderAlive() {
  const alive   = players.filter(p => !p.eliminated);
  const current = alive[currentIdx];

  document.getElementById('roundBadge').textContent  = `Manche ${round}`;
  document.getElementById('activeNum').textContent   = `#${currentIdx + 1}`;
  document.getElementById('activeName').textContent  = current.name;

  const ac = document.getElementById('activeCard');
  ac.style.animation = 'none';
  void ac.offsetWidth;
  ac.style.animation = '';

  const grid = document.getElementById('playersGrid');
  grid.innerHTML = '';

  alive.forEach((p, i) => {
    if (i === currentIdx) return;
    const done = i < currentIdx;
    const card = document.createElement('div');
    card.className = `player-card${done ? ' player-card--done' : ''}`;
    card.innerHTML = `
      <span class="player-card__num">#${i + 1}</span>
      <span class="player-card__name">${p.name}</span>
      ${done ? '<span class="player-card__check">✓</span>' : ''}`;
    grid.appendChild(card);
  });

  const isLast = currentIdx === alive.length - 1;
  document.getElementById('nextBtnLabel').textContent = isLast ? '🗳 Passer au vote' : 'Suivant →';
  document.getElementById('nextBtn').className = `next-btn${isLast ? ' next-btn--vote' : ''}`;
}

/* ============================================
   ÉCRAN DE FIN
   ============================================ */
function showEndScreen(winner) {
  const { motCivil, motUc } = JSON.parse(sessionStorage.getItem('undercoverGame'));
  const main = document.querySelector('.play-page');

  const config = {
    civils:      { emoji: '🏆', title: 'Les civils ont gagné !',     color: '#4ade80', msg: 'Vous avez démasqué tous les imposteurs !'  },
    imposteurs:  { emoji: '🕵️', title: 'Les imposteurs ont gagné !', color: '#f97316', msg: 'Ils ont réussi à se fondre dans la masse !' },
    mrwhite:     { emoji: '🤍', title: 'Mr White a gagné !',         color: '#e0e0e0', msg: `Il a deviné le mot : "${motCivil}" !`       },
  }[winner];

  const rows = players.map(p => {
    const roleLabel = p.roleType === 'civil' ? `Civil · <em>${motCivil}</em>`
      : p.roleType === 'uc'    ? `Undercover · <em>${motUc}</em>`
      :                          'Mr White';
    const elim = p.eliminated ? '💀' : '✅';
    return `<div class="recap-row">
      <span>${elim} ${p.name}</span>
      <span>${roleLabel}</span>
    </div>`;
  }).join('');

  main.innerHTML = `
    <div class="vote-screen">
      <div class="done-icon">${config.emoji}</div>
      <div class="round-badge" style="color:${config.color};border-color:${config.color}40;background:${config.color}15">
        Fin de partie
      </div>
      <h2 class="vote-title">${config.title}</h2>
      <p class="vote-sub">${config.msg}</p>
      <div class="done-recap">${rows}</div>
      <button class="next-btn" id="homeBtn">
        Retour à l'accueil
      </button>
    </div>`;

  document.getElementById('homeBtn').addEventListener('click', () => {
    window.location.href = '../index.html';
  });
}

/* ============================================
   DÉMARRAGE
   ============================================ */
render();
