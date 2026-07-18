/* ============================================
   GAME — game.js
   ============================================ */

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
  ['Vache',         'Bison'],
  ['Serpent',       'Lézard'],
  ['Aigle',         'Faucon'],
  ['Hibou',         'Chouette'],
  ['Crocodile',     'Alligator'],
  ['Éléphant',      'Rhinocéros'],
  ['Girafe',        'Zèbre'],
  ['Singe',         'Gorille'],
  ['Ours',          'Panda'],
  ['Renard',        'Loup'],
  ['Papillon',      'Abeille'],
  ['Araignée',      'Scorpion'],
  ['Tortue',        'Grenouille'],
  ['Poulpe',        'Méduse'],
  ['Perroquet',     'Toucan'],
  ['Flamant rose',  'Cigogne'],
  ['Loutre',        'Castor'],
  ['Lynx',          'Panthère'],
  ['Jaguar',        'Léopard'],
  ['Chameau',       'Dromadaire'],
  ['Autruche',      'Émeu'],
  ['Pingouin',      'Manchot'],
  ['Saumon',        'Truite'],
  ['Baleine',       'Orque'],
  ['Taupe',         'Hérisson'],
  ['Lama',          'Alpaga'],
  ['Cerf',          'Élan'],

  /* Nourriture */
  ['Pizza',         'Burger'],
  ['Chocolat',      'Caramel'],
  ['Glace',         'Sorbet'],
  ['Gâteau',        'Tarte'],
  ['Boulanger',     'Pâtissier'],
  ['Croissant',     'Pain au chocolat'],
  ['Crêpe',         'Gaufre'],
  ['Macarons',      'Éclairs'],
  ['Tiramisu',      'Panna cotta'],
  ['Sushi',         'Sashimi'],
  ['Tacos',         'Burrito'],
  ['Chips',         'Popcorn'],
  ['Soupe',         'Bouillon'],
  ['Ramen',         'Pho'],
  ['Steak',         'Côtelette'],
  ['Crevette',      'Homard'],
  ['Yaourt',        'Fromage blanc'],
  ['Miel',          'Confiture'],
  ['Beurre',        'Margarine'],
  ['Fromage',       'Ricotta'],
  ['Pain',          'Brioche'],
  ['Pomme',         'Poire'],
  ['Orange',        'Mandarine'],
  ['Fraise',        'Framboise'],
  ['Cerise',        'Prune'],
  ['Mangue',        'Ananas'],
  ['Banane',        'Plantain'],
  ['Citron',        'Citron vert'],
  ['Pastèque',      'Melon'],
  ['Pêche',         'Abricot'],
  ['Tomate',        'Poivron'],
  ['Carotte',       'Navet'],
  ['Champignon',    'Truffe'],
  ['Courgette',     'Aubergine'],
  ['Spaghetti',     'Tagliatelles'],
  ['Coca',          'Pepsi'],
  ['Vin',           'Champagne'],
  ['Bière',         'Cidre'],
  ['Whisky',        'Rhum'],
  ['Café',          'Thé'],
  ['Nutella',       'Beurre de cacahuète'],
  ['Hot-dog',       'Sandwich'],
  ['Omelette',      'Quiche'],
  ['Poulet rôti',   'Dinde rôtie'],
  ['Bonbon',        'Chewing-gum'],
  ['Donuts',        'Churros'],

  /* Lieux */
  ['Plage',         'Piscine'],
  ['Forêt',         'Jungle'],
  ['Montagne',      'Colline'],
  ['Rivière',       'Lac'],
  ['Château',       'Manoir'],
  ['École',         'Université'],
  ['Hôpital',       'Clinique'],
  ['Restaurant',    'Brasserie'],
  ['Supermarché',   'Épicerie'],
  ['Musée',         'Galerie d\'art'],
  ['Stade',         'Gymnase'],
  ['Parc',          'Jardin'],
  ['Désert',        'Steppe'],
  ['Île',           'Atoll'],
  ['Volcan',        'Geyser'],
  ['Grotte',        'Mine'],
  ['Phare',         'Tour'],
  ['Pont',          'Tunnel'],
  ['Aéroport',      'Gare'],
  ['Port',          'Marina'],
  ['Cathédrale',    'Mosquée'],
  ['Temple',        'Synagogue'],
  ['Prison',        'Commissariat'],
  ['Casino',        'Hippodrome'],
  ['Cirque',        'Zoo'],
  ['Aquarium',      'Planétarium'],
  ['Discothèque',   'Bar'],
  ['Hôtel',         'Auberge'],
  ['Camping',       'Caravane'],
  ['Glacier',       'Iceberg'],
  ['Savane',        'Prairie'],
  ['Marécage',      'Tourbière'],
  ['Bibliothèque',  'Librairie'],
  ['Boulangerie',   'Pâtisserie'],
  ['Pharmacie',     'Hôpital'],
  ['Mairie',        'Préfecture'],
  ['Ambassade',     'Consulat'],

  /* Sports */
  ['Football',      'Rugby'],
  ['Tennis',        'Badminton'],
  ['Natation',      'Plongée'],
  ['Cyclisme',      'Triathlon'],
  ['Ski',           'Snowboard'],
  ['Surf',          'Kitesurf'],
  ['Équitation',    'Polo'],
  ['Boxe',          'Karaté'],
  ['Judo',          'Lutte'],
  ['Golf',          'Pétanque'],
  ['Baseball',      'Cricket'],
  ['Hockey',        'Patinage'],
  ['Volleyball',    'Beach-volley'],
  ['Handball',      'Water-polo'],
  ['Athlétisme',    'Marathon'],
  ['Escalade',      'Alpinisme'],
  ['Parachutisme',  'Deltaplane'],
  ['Kayak',         'Canoë'],
  ['Bowling',       'Curling'],
  ['Yoga',          'Pilates'],
  ['Danse',         'Gymnastique'],
  ['Escrime',       'Tir à l\'arc'],
  ['Planche à voile','Windsurf'],
  ['Trampoline',    'Parkour'],
  ['Pétanque',      'Bocce'],

  /* Métiers */
  ['Docteur',       'Infirmier'],
  ['Police',        'Armée'],
  ['Pompier',       'Secouriste'],
  ['Avocat',        'Juge'],
  ['Architecte',    'Ingénieur'],
  ['Pharmacien',    'Biologiste'],
  ['Dentiste',      'Orthodontiste'],
  ['Vétérinaire',   'Zoologiste'],
  ['Journaliste',   'Reporter'],
  ['Photographe',   'Vidéaste'],
  ['Acteur',        'Comédien'],
  ['Chanteur',      'Musicien'],
  ['Peintre',       'Sculpteur'],
  ['Écrivain',      'Poète'],
  ['Maçon',         'Charpentier'],
  ['Plombier',      'Électricien'],
  ['Jardinier',     'Agriculteur'],
  ['Pêcheur',       'Chasseur'],
  ['Pilote',        'Copilote'],
  ['Astronaute',    'Cosmonaute'],
  ['Professeur',    'Instituteur'],
  ['Psychologue',   'Psychiatre'],
  ['Comptable',     'Banquier'],
  ['Coiffeur',      'Barbier'],
  ['Tailleur',      'Couturier'],
  ['Cuisinier',     'Traiteur'],
  ['Serveur',       'Barman'],
  ['Informaticien', 'Développeur'],
  ['Designer',      'Graphiste'],
  ['Magicien',      'Illusionniste'],
  ['Acrobate',      'Jongleur'],
  ['Gardien',       'Vigile'],
  ['Boucher',       'Charcutier'],
  ['Fleuriste',     'Herboriste'],

  /* Transports */
  ['Avion',         'Hélicoptère'],
  ['Tramway',       'Bus'],
  ['Voiture',       'Moto'],
  ['Vélo',          'Trottinette'],
  ['Train',         'Métro'],
  ['Bateau',        'Yacht'],
  ['Fusée',         'Satellite'],
  ['Taxi',          'Uber'],
  ['Scooter',       'Mobylette'],
  ['Camion',        'Semi-remorque'],
  ['Ambulance',     'Camion de pompiers'],
  ['Tracteur',      'Moissonneuse'],
  ['Sous-marin',    'Bathyscaphe'],
  ['Montgolfière',  'Dirigeable'],
  ['Funiculaire',   'Téléphérique'],
  ['Gondole',       'Barque'],
  ['Rickshaw',      'Pousse-pousse'],
  ['Quad',          'Buggy'],

  /* Technologie / Objets */
  ['Téléphone',     'Tablette'],
  ['Ordinateur',    'Laptop'],
  ['Télévision',    'Écran'],
  ['Radio',         'Enceinte'],
  ['Appareil photo','Caméra'],
  ['Montre',        'Bracelet connecté'],
  ['Robot',         'Drone'],
  ['Lampe',         'Bougie'],
  ['Clé',           'Cadenas'],
  ['Guitare',       'Violon'],
  ['Casque',        'Écouteurs'],
  ['Clavier',       'Souris'],
  ['Console',       'Manette'],
  ['Imprimante',    'Scanner'],
  ['Lunettes',      'Loupe'],
  ['Parapluie',     'Imperméable'],
  ['Sac à dos',     'Valise'],
  ['Livre',         'Magazine'],
  ['Carte',         'Boussole'],
  ['Marteau',       'Masse'],
  ['Couteau',       'Ciseau'],
  ['Flipper',       'Jeu d\'arcade'],
  ['Micro',         'Haut-parleur'],
  ['Miroir',        'Vitre'],
  ['Rideau',        'Store'],
  ['Tapis',         'Parquet'],

  /* Vêtements */
  ['Manteau',       'Veste'],
  ['Pull',          'Sweat'],
  ['Jean',          'Pantalon'],
  ['Robe',          'Jupe'],
  ['Chemise',       'Blouse'],
  ['Chapeau',       'Casquette'],
  ['Écharpe',       'Foulard'],
  ['Gants',         'Moufles'],
  ['Bottes',        'Baskets'],
  ['Sandales',      'Tongs'],
  ['Cravate',       'Nœud papillon'],
  ['Ceinture',      'Bretelles'],
  ['Maillot de bain','Bikini'],
  ['Pyjama',        'Chemise de nuit'],
  ['Costume',       'Smoking'],
  ['Survêtement',   'Short de sport'],
  ['Imperméable',   'Poncho'],

  /* Nature / Météo */
  ['Soleil',        'Lune'],
  ['Pluie',         'Brouillard'],
  ['Neige',         'Grêle'],
  ['Tonnerre',      'Éclair'],
  ['Tornade',       'Ouragan'],
  ['Arc-en-ciel',   'Aurore boréale'],
  ['Nuage',         'Brume'],
  ['Vague',         'Marée'],
  ['Sable',         'Gravier'],
  ['Diamant',       'Émeraude'],
  ['Or',            'Argent'],
  ['Lave',          'Magma'],
  ['Récif',         'Corail'],
  ['Cascade',       'Fontaine'],
  ['Prairie',       'Champ'],
  ['Forêt tropicale','Mangrove'],
  ['Dune',          'Falaise'],
  ['Geyser',        'Source chaude'],

  /* Divertissement / Culture */
  ['Cinéma',        'Théâtre'],
  ['Film',          'Série'],
  ['Dessin animé',  'Manga'],
  ['Jeu vidéo',     'Jeu de plateau'],
  ['Concert',       'Festival'],
  ['Ballet',        'Opéra'],
  ['Comédie',       'Tragédie'],
  ['Roman',         'Nouvelle'],
  ['Bande dessinée','Roman graphique'],
  ['Podcast',       'Émission de radio'],
  ['Jeu d\'échecs', 'Dames'],
  ['Poker',         'Blackjack'],
  ['Monopoly',      'Scrabble'],
  ['Puzzle',        'Rubik\'s cube'],
  ['Magie',         'Hypnose'],
  ['Cirque',        'Cabaret'],
  ['Boîte de nuit', 'Karaoké'],
  ['Escape game',   'Jeu de piste'],
  ['Kermesse',      'Fête foraine'],

  /* Personnages / Imaginaire */
  ['Vampire',       'Zombie'],
  ['Pirate',        'Corsaire'],
  ['Sorcière',      'Magicien'],
  ['Dragon',        'Hydre'],
  ['Licorne',       'Pégase'],
  ['Fantôme',       'Spectre'],
  ['Super-héros',   'Super-vilain'],
  ['Elfe',          'Lutin'],
  ['Nain',          'Troll'],
  ['Sirène',        'Nymphe'],
  ['Génie',         'Djinn'],
  ['Momie',         'Pharaon'],
  ['Gladiateur',    'Chevalier'],
  ['Samouraï',      'Ninja'],
  ['Viking',        'Guerrier gaulois'],
  ['Extraterrestre','Robot'],
  ['Loup-garou',    'Yéti'],
  ['Fée',           'Elfe de lumière'],
  ['Démon',         'Ange déchu'],
  ['Roi',           'Empereur'],

  /* Maison / Mobilier */
  ['Canapé',        'Fauteuil'],
  ['Lit',           'Matelas'],
  ['Armoire',       'Commode'],
  ['Baignoire',     'Douche'],
  ['Réfrigérateur', 'Congélateur'],
  ['Four',          'Micro-ondes'],
  ['Lave-vaisselle','Lave-linge'],
  ['Escalier',      'Ascenseur'],
  ['Balcon',        'Terrasse'],
  ['Jardin',        'Cour'],
  ['Cave',          'Grenier'],
  ['Garage',        'Hangar'],
  ['Cheminée',      'Radiateur'],
  ['Table basse',   'Pouf'],
  ['Bibliothèque',  'Étagère'],

  /* Corps / Santé */
  ['Cerveau',       'Cœur'],
  ['Poumon',        'Foie'],
  ['Os',            'Cartilage'],
  ['Dent',          'Ongle'],
  ['Œil',           'Oreille'],
  ['Main',          'Pied'],
  ['Genou',         'Coude'],
  ['Vaccin',        'Médicament'],
  ['Opération',     'Biopsie'],
  ['Stéthoscope',   'Tensiomètre'],

  /* Divers / Concepts */
  ['Mariage',       'Fiançailles'],
  ['Anniversaire',  'Fête'],
  ['Vacances',      'Voyage'],
  ['Trophée',       'Médaille'],
  ['Drapeau',       'Emblème'],
  ['Timbre',        'Carte postale'],
  ['Cadeau',        'Surprise'],
  ['Feux d\'artifice','Pétard'],
  ['Examen',        'Concours'],
  ['Amour',         'Amitié'],
  ['Rêve',          'Cauchemar'],
  ['Mensonge',      'Secret'],
  ['Liberté',       'Indépendance'],
  ['Prison',        'Exil'],
  ['Guerre',        'Bataille'],
  ['Paix',          'Trêve'],
  ['Révolution',    'Révolte'],
  ['Élection',      'Référendum'],
  ['Discours',      'Débat'],
  ['Médaille d\'or','Médaille d\'argent'],
  ['Champion',      'Vice-champion'],
  ['Record',        'Performance'],
  ['Entraîneur',    'Coach'],
  ['Arbitre',       'Juge de ligne'],
  ['Stade',         'Vélodrome'],
  ['Coupe du monde','Jeux olympiques'],
  ['Nuit',          'Crépuscule'],
  ['Matin',         'Aube'],
  ['Printemps',     'Été'],
  ['Automne',       'Hiver'],
  ['Nord',          'Sud'],
  ['Est',           'Ouest'],
  ['Carte postale', 'Lettre'],
  ['Musique',       'Rythme'],
  ['Couleur',       'Teinte'],
  ['Parfum',        'Eau de toilette'],
  ['Brosse à dents','Fil dentaire'],
  ['Savon',         'Gel douche'],
  ['Shampooing',    'Après-shampooing'],
  ['Miroir',        'Reflet'],
  ['Ombre',         'Silhouette'],
  ['Lumière',       'Rayon'],
  ['Son',           'Écho'],
  ['Chaleur',       'Humidité'],
  ['Froid',         'Gel'],
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
  const num  = current + 1;
  const def  = `Joueur ${num}`;

  stepBadge.textContent = `Joueur ${num} / ${NB_JOUEURS}`;
  nameLabel.textContent = def;
  nameInput.value       = NOMS[current] || '';
  nameInput.placeholder = `${def}…`;
  playerAvatar.textContent = num;

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
