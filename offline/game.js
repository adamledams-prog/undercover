/* ============================================
   GAME — game.js
   ============================================ */

/* ---- Banque de mots (civil, undercover) ---- */
const MOTS = [
  /* Animaux */
  ['Chat',          'Chien'],
  ['Tigre',         'Lion'],
  ['Requin',        'Dauphin'],
  ['Cheval',        'Âne'],
  ['Poule',         'Canard'],
  ['Lapin',         'Lièvre'],
  ['Cochon',        'Sanglier'],
  ['Mouton',        'Chèvre'],
  ['Vache',         'Cheval'],
  ['Serpent',       'Lézard'],
  ['Aigle',         'Perroquet'],
  ['Hibou',         'Chouette'],
  ['Crocodile',     'Alligator'],
  ['Éléphant',      'Rhinocéros'],
  ['Girafe',        'Zèbre'],
  ['Singe',         'Gorille'],
  ['Ours',          'Panda'],
  ['Renard',        'Loup'],
  ['Papillon',      'Abeille'],
  ['Araignée',      'Fourmi'],
  ['Tortue',        'Grenouille'],
  ['Baleine',       'Dauphin'],
  ['Pingouin',      'Manchot'],
  ['Chameau',       'Dromadaire'],
  ['Autruche',      'Flamant rose'],
  ['Saumon',        'Truite'],
  ['Cerf',          'Chevreuil'],
  ['Ours blanc',    'Ours brun'],
  ['Perroquet',     'Toucan'],
  ['Tigre',         'Guépard'],

  /* Nourriture */
  ['Pizza',         'Burger'],
  ['Chocolat',      'Bonbon'],
  ['Glace',         'Sorbet'],
  ['Gâteau',        'Tarte'],
  ['Croissant',     'Pain au chocolat'],
  ['Crêpe',         'Gaufre'],
  ['Frite',         'Chips'],
  ['Soupe',         'Bouillon'],
  ['Poulet',        'Dinde'],
  ['Pain',          'Brioche'],
  ['Pomme',         'Poire'],
  ['Orange',        'Clémentine'],
  ['Fraise',        'Framboise'],
  ['Cerise',        'Prune'],
  ['Banane',        'Mangue'],
  ['Citron',        'Orange'],
  ['Pastèque',      'Melon'],
  ['Pêche',         'Abricot'],
  ['Tomate',        'Poivron'],
  ['Carotte',       'Navet'],
  ['Champignon',    'Cornichon'],
  ['Spaghetti',     'Macaroni'],
  ['Coca',          'Limonade'],
  ['Lait',          'Jus de fruits'],
  ['Beurre',        'Confiture'],
  ['Fromage',       'Yaourt'],
  ['Œuf',           'Omelette'],
  ['Sandwich',      'Hot-dog'],
  ['Popcorn',       'Chips'],
  ['Sucette',       'Chewing-gum'],
  ['Donuts',        'Croissant'],
  ['Miel',          'Confiture'],
  ['Nutella',       'Beurre de cacahuète'],
  ['Biscuit',       'Gâteau sec'],
  ['Croque-monsieur','Sandwich grillé'],

  /* Lieux */
  ['Plage',         'Piscine'],
  ['Forêt',         'Bois'],
  ['Montagne',      'Colline'],
  ['Rivière',       'Lac'],
  ['Château',       'Maison hantée'],
  ['École',         'Collège'],
  ['Hôpital',       'Pharmacie'],
  ['Restaurant',    'Cafétéria'],
  ['Supermarché',   'Épicerie'],
  ['Zoo',           'Ferme'],
  ['Parc',          'Jardin'],
  ['Île',           'Plage'],
  ['Grotte',        'Tunnel'],
  ['Aéroport',      'Gare'],
  ['Port',          'Plage'],
  ['Camping',       'Cabane'],
  ['Cinéma',        'Théâtre'],
  ['Bibliothèque',  'Librairie'],
  ['Boulangerie',   'Pâtisserie'],
  ['Piscine',       'Lac'],
  ['Stade',         'Terrain de foot'],
  ['Fête foraine',  'Cirque'],
  ['Aquarium',      'Zoo'],
  ['Maison',        'Appartement'],
  ['Château fort',  'Tour'],
  ['Plaine',        'Prairie'],
  ['Désert',        'Dune de sable'],
  ['Volcan',        'Montagne de feu'],
  ['Cascade',       'Fontaine'],
  ['Phare',         'Tour'],

  /* Sports */
  ['Football',      'Rugby'],
  ['Tennis',        'Badminton'],
  ['Natation',      'Plongée'],
  ['Ski',           'Luge'],
  ['Vélo',          'Trottinette'],
  ['Boxe',          'Karaté'],
  ['Judo',          'Lutte'],
  ['Golf',          'Pétanque'],
  ['Volleyball',    'Basketball'],
  ['Danse',         'Gym'],
  ['Course à pied', 'Marche'],
  ['Saut en hauteur','Saut en longueur'],
  ['Tir à l\'arc',  'Fronde'],
  ['Snowboard',     'Ski'],
  ['Surf',          'Planche à voile'],
  ['Roller',        'Skateboard'],
  ['Trampoline',    'Saut'],
  ['Catch',         'Boxe'],
  ['Ping-pong',     'Tennis'],
  ['Patin à glace', 'Roller'],

  /* Métiers */
  ['Docteur',       'Infirmier'],
  ['Policier',      'Soldat'],
  ['Pompier',       'Sauveteur'],
  ['Professeur',    'Maître d\'école'],
  ['Boulanger',     'Pâtissier'],
  ['Cuisinier',     'Serveur'],
  ['Pilote',        'Conducteur de train'],
  ['Astronaute',    'Cosmonaute'],
  ['Vétérinaire',   'Fermier'],
  ['Coiffeur',      'Barbier'],
  ['Facteur',       'Livreur'],
  ['Plombier',      'Électricien'],
  ['Jardinier',     'Agriculteur'],
  ['Pêcheur',       'Chasseur'],
  ['Acteur',        'Chanteur'],
  ['Magicien',      'Clown'],
  ['Gardien de zoo','Dresseur'],
  ['Banquier',      'Caissier'],
  ['Maçon',         'Peintre en bâtiment'],
  ['Boucher',       'Poissonnier'],

  /* Transports */
  ['Avion',         'Hélicoptère'],
  ['Bus',           'Tramway'],
  ['Voiture',       'Moto'],
  ['Vélo',          'Trottinette'],
  ['Train',         'Métro'],
  ['Bateau',        'Canot'],
  ['Taxi',          'Bus'],
  ['Camion',        'Van'],
  ['Ambulance',     'Camion de pompiers'],
  ['Tracteur',      'Quad'],
  ['Montgolfière',  'Planeur'],
  ['Fusée',         'Navette spatiale'],
  ['Scooter',       'Vélo électrique'],
  ['Gondole',       'Barque'],
  ['Sous-marin',    'Bateau'],

  /* Objets du quotidien */
  ['Téléphone',     'Tablette'],
  ['Télévision',    'Ordinateur'],
  ['Radio',         'Enceinte'],
  ['Appareil photo','Caméra'],
  ['Montre',        'Réveil'],
  ['Lampe',         'Bougie'],
  ['Clé',           'Cadenas'],
  ['Couteau',       'Fourchette'],
  ['Livre',         'Magazine'],
  ['Stylo',         'Crayon'],
  ['Règle',         'Équerre'],
  ['Sac à dos',     'Cartable'],
  ['Parapluie',     'Imperméable'],
  ['Casque',        'Écouteurs'],
  ['Ballon',        'Balle'],
  ['Poupée',        'Peluche'],
  ['Voiture jouet', 'Camion jouet'],
  ['Corde à sauter','Yo-yo'],
  ['Puzzle',        'Jeu de construction'],
  ['Dé',            'Pièce de jeu'],

  /* Vêtements */
  ['Manteau',       'Veste'],
  ['Pull',          'Sweat'],
  ['Jean',          'Jogging'],
  ['Robe',          'Jupe'],
  ['Chemise',       'T-shirt'],
  ['Chapeau',       'Casquette'],
  ['Écharpe',       'Foulard'],
  ['Gants',         'Moufles'],
  ['Bottes',        'Baskets'],
  ['Sandales',      'Tongs'],
  ['Pyjama',        'Survêtement'],
  ['Costume',       'Smoking'],
  ['Maillot de bain','Short de plage'],
  ['Imperméable',   'Poncho'],
  ['Bonnet',        'Casquette'],

  /* Nature / Météo */
  ['Soleil',        'Lune'],
  ['Pluie',         'Neige'],
  ['Tonnerre',      'Éclair'],
  ['Vent',          'Tempête'],
  ['Arc-en-ciel',   'Aurore'],
  ['Nuage',         'Brouillard'],
  ['Vague',         'Marée'],
  ['Sable',         'Boue'],
  ['Pierre',        'Rocher'],
  ['Fleur',         'Plante'],
  ['Arbre',         'Buisson'],
  ['Herbe',         'Mousse'],
  ['Étoile',        'Lune'],
  ['Comète',        'Météorite'],
  ['Glacier',       'Iceberg'],
  ['Volcan',        'Geyser'],
  ['Rivière',       'Ruisseau'],
  ['Lac',           'Mare'],
  ['Mer',           'Océan'],
  ['Île',           'Rocher en mer'],

  /* Jeux / Divertissement */
  ['Jeu vidéo',     'Jeu de plateau'],
  ['Film',          'Dessin animé'],
  ['Concert',       'Spectacle'],
  ['Cirque',        'Fête foraine'],
  ['Jeu d\'échecs', 'Dames'],
  ['Poker',         'Bataille'],
  ['Monopoly',      'Jeu de l\'oie'],
  ['Lego',          'Playmobil'],
  ['Vélo',          'Trottinette'],
  ['Piscine gonflable','Pataugeoire'],
  ['Bonhomme de neige','Igloo'],
  ['Château de sable','Pâté de sable'],
  ['Cache-cache',   'Loup y es-tu'],
  ['Toboggan',      'Balançoire'],
  ['Merry-go-round','Balançoire'],

  /* Personnages / Imaginaire */
  ['Vampire',       'Zombie'],
  ['Pirate',        'Marin'],
  ['Sorcière',      'Magicien'],
  ['Dragon',        'Monstre'],
  ['Licorne',       'Cheval ailé'],
  ['Fantôme',       'Monstre'],
  ['Super-héros',   'Super-vilain'],
  ['Elfe',          'Lutin'],
  ['Géant',         'Ogre'],
  ['Sirène',        'Fée des mers'],
  ['Fée',           'Elfe'],
  ['Chevalier',     'Guerrier'],
  ['Samouraï',      'Ninja'],
  ['Viking',        'Pirate'],
  ['Extraterrestre','Robot'],
  ['Loup-garou',    'Monstre'],
  ['Roi',           'Prince'],
  ['Reine',         'Princesse'],
  ['Sorcier',       'Druide'],
  ['Momie',         'Squelette'],

  /* Maison */
  ['Canapé',        'Fauteuil'],
  ['Lit',           'Matelas'],
  ['Armoire',       'Placard'],
  ['Baignoire',     'Douche'],
  ['Frigo',         'Congélateur'],
  ['Four',          'Micro-ondes'],
  ['Escalier',      'Ascenseur'],
  ['Balcon',        'Terrasse'],
  ['Garage',        'Hangar'],
  ['Cheminée',      'Radiateur'],
  ['Jardin',        'Cour'],
  ['Cave',          'Grenier'],
  ['Cuisine',       'Salle à manger'],
  ['Salon',         'Salle de jeux'],
  ['Chambre',       'Dortoir'],

  /* Divers faciles */
  ['Anniversaire',  'Fête'],
  ['Vacances',      'Week-end'],
  ['Cadeau',        'Surprise'],
  ['Médaille',      'Trophée'],
  ['Drapeau',       'Bannière'],
  ['Carte postale', 'Lettre'],
  ['Feux d\'artifice','Pétard'],
  ['Bonhomme de neige','Lutin de Noël'],
  ['Sapin de Noël', 'Décoration de Noël'],
  ['Citrouille',    'Fantôme d\'Halloween'],
  ['Matin',         'Soir'],
  ['Nuit',          'Jour'],
  ['Printemps',     'Été'],
  ['Automne',       'Hiver'],
  ['Nord',          'Sud'],
  ['Ville',         'Village'],
  ['Rue',           'Avenue'],
  ['Pont',          'Passerelle'],
  ['Tunnel',        'Grotte'],
  ['Fontaine',      'Puits'],
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

/* ---- Noms : charge le replay si disponible ---- */
const _replay  = JSON.parse(sessionStorage.getItem('undercoverReplay') || 'null');
if (_replay) sessionStorage.removeItem('undercoverReplay');
const NOMS = _replay ? [..._replay.noms] : Array(NB_JOUEURS).fill('');

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

const progressFill = document.getElementById('progressFill');
const playerAvatar = document.getElementById('playerAvatar');

/* ============================================
   NAVIGATION ENTRE PANELS
   ============================================ */
function updateProgress() {
  const pct = (current / NB_JOUEURS) * 100;
  progressFill.style.width = pct + '%';
}

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
  const num      = current + 1;
  const saved    = NOMS[current] || '';
  const def      = `Joueur ${num}`;

  stepBadge.textContent    = `Joueur ${num} / ${NB_JOUEURS}`;
  nameLabel.textContent    = saved || def;
  nameInput.value          = saved;
  nameInput.placeholder    = saved || `${def}…`;
  playerAvatar.textContent = saved ? saved[0].toUpperCase() : String(num);

  updateProgress();
  show(panelName);
  setTimeout(() => nameInput.focus(), 300);
}

/* ---- Câblage des boutons ---- */
document.getElementById('clearBtn').addEventListener('click', () => {
  nameInput.value = '';
  nameInput.focus();
});

document.getElementById('revealBtn').addEventListener('click', revealRole);
document.getElementById('memorizedBtn').addEventListener('click', nextPlayer);
document.getElementById('passBtn').addEventListener('click', showName);
document.getElementById('doneBtn').addEventListener('click', () => {
  window.location.href = '../index.html';
});

/* ============================================
   INIT
   ============================================ */
showName();

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
    startGame();
    return;
  }

  const nextNom = `Joueur ${current + 1}`;
  passName.textContent = nextNom;
  show(panelPass);
}

/* ============================================
   DÉMARRAGE — ordre de jeu aléatoire
   ============================================ */
function startGame() {
  progressFill.style.width = '100%';

  // Construire la liste des joueurs avec leur rôle
  const players = NOMS.map((nom, i) => ({
    name:     nom || `Joueur ${i + 1}`,
    roleType: ROLES[i].type,
    mot:      ROLES[i].mot,
  }));

  // Mélanger (Fisher-Yates)
  for (let i = players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [players[i], players[j]] = [players[j], players[i]];
  }

  // Mr White ne peut pas être 1er — le pousser au moins en 2e
  if (players[0].roleType === 'white') {
    const swap = players.findIndex((p, i) => i > 0 && p.roleType !== 'white');
    if (swap > 0) [players[0], players[swap]] = [players[swap], players[0]];
  }

  // Sauvegarder dans sessionStorage (rôles cachés côté play.js)
  sessionStorage.setItem('undercoverGame', JSON.stringify({
    players,          // ordre de jeu avec infos rôles (pour révélation finale)
    motCivil: MOT_CIVIL,
    motUc:    MOT_UC,
  }));

  window.location.href = 'play.html';
}

/* ============================================
   INIT
   ============================================ */
showName();
