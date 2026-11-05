# Nexium DarkRP - Loading screen

Écran de chargement Garry's Mod du serveur Nexium DarkRP : logo, règlement, équipe,
métiers, infos serveur et progression réelle du chargement.

## Mise en ligne

1. Créez un dépôt GitHub public (ex. `nexium-loadingscreen`) et placez-y le **contenu** de ce dossier,
   avec `index.html` à la racine du dépôt.
2. Dans le dépôt : **Settings > Pages > Branch : `main`, dossier `/ (root)` > Save**.
3. Attendez que l'adresse s'affiche : `https://VOTRE-PSEUDO.github.io/nexium-loadingscreen/`
4. Dans le panneau AMP (le `server.cfg` est géré par AMP), réglez :

   ```
   sv_loadingurl "https://VOTRE-PSEUDO.github.io/nexium-loadingscreen/?steamid=%s&map=%m"
   ```

5. Redémarrez le serveur, puis connectez-vous pour vérifier.

## Modifier le contenu

Tous les textes sont dans [`js/config.js`](js/config.js) : présentation, règlement, équipe, métiers,
astuces, Discord et temps estimé.

Pour afficher des captures du serveur en fond, ajoutez les images dans `assets/`, puis listez-les :

```js
backgrounds: ["assets/screen1.jpg", "assets/screen2.jpg"],
```

## Tester sans lancer le jeu

Ouvrez l'adresse du site avec `?demo=1` à la fin : le chargement est simulé.

## Structure

```
index.html          Structure de la page
css/style.css       Apparence
js/config.js        Textes et réglages
js/main.js          Progression et appels de Garry's Mod
assets/logo.png     Logo Nexium
assets/skyline.svg  Silhouette de ville en fond
```

## Compatibilité

Le navigateur intégré de Garry's Mod peut être très ancien selon la branche du jeu. Le code reste donc
en JavaScript ES5 et en CSS simple, avec une scène 1920x1080 mise à l'échelle selon l'écran.
Gardez cette contrainte lors de vos modifications : pas de `let`, de fonctions fléchées, de CSS grid
ni de variables CSS.
