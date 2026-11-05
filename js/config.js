/* ==========================================================
   NEXIUM DARKRP - contenu du loading screen
   C'est le seul fichier à modifier pour changer les textes.
   ========================================================== */
var NEXIUM_CONFIG = {
    about: "Un serveur semi-RP pensé dans une ambiance américaine. Choisissez votre camp, construisez votre histoire. Bon jeu à vous !",

    // Temps affiché à côté du chronomètre
    estimatedTime: "6 à 10 min sans les addons",

    // Valeurs affichées tant que le jeu n'a pas envoyé les vraies
    defaultMap: "rp_unioncity",
    defaultSlots: 64,

    discord: "discord.gg/FFSwDBkxZA",

    // Fonds d'écran optionnels : ex. ["assets/screen1.jpg", "assets/screen2.jpg"]
    // Laissé vide, c'est la silhouette de ville qui s'affiche.
    backgrounds: [],

    rules: [
        { title: "Freekill", text: "Ne pas tuer les gens sans raison." },
        { title: "NoRP", text: "Rester dans son personnage et jouer son rôle." },
        { title: "FailRP", text: "Pas d'actions irréalistes ou impossibles." },
        { title: "Troll", text: "Ne pas chercher à gêner les autres joueurs." },
        { title: "Insulte parentale", text: "Aucune insulte visant la famille." },
        { title: "HRP vocal", text: "Pas de hors-RP dans le chat vocal." }
    ],

    staff: [
        { name: "Migniax", role: "Fondateur / Dev" },
        { name: "Marlou", role: "Fondateur / Gérant staff" },
        { name: "[FRP] Chara", role: "Administrateur" },
        { name: "KingOfDuck", role: "Modérateur" },
        { name: "YTB_Figues", role: "Modérateur" }
    ],

    factions: [
        { icon: "shield", name: "Forces de l'ordre", jobs: "Officier NYPD, SWAT NYPD, FBI" },
        { icon: "users", name: "Vie civile", jobs: "Citoyen, Médecin, Garagiste, Cuisinier" },
        { icon: "skull", name: "Illégal", jobs: "Weed, Cocaïne, Armurier clandestin, Hackeur" },
        { icon: "target", name: "Privé", jobs: "PMC Maria" }
    ],

    // Astuces qui défilent pendant le chargement
    tips: [
        "Tapez !help en jeu pour ouvrir le menu d'aide.",
        "Tapez !perso pour gérer vos personnages.",
        "Tapez !tutos pour rejouer les tutoriels.",
        "Un problème avec un joueur ? Faites un /report.",
        "Tapez !vehicules pour retrouver vos véhicules.",
        "Tapez /factures pour consulter vos factures.",
        "Tapez !boutique pour découvrir la boutique."
    ]
};
