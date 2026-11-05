/* Nexium DarkRP - logique du loading screen.
   Écrit en ES5 : pas de let/const, de fonctions fléchées ni de fetch, pour rester
   compatible avec l'ancien navigateur intégré de Garry's Mod. */
(function () {
    var CFG = window.NEXIUM_CONFIG;

    var ICONS = {
        pin: '<path d="M12 22 5 12V8l4-5h6l4 5v4z"/><path d="M12 7l3 3-3 3-3-3z"/>',
        users: '<path d="M3 21v-4l3-3h6l3 3v4"/><path d="M9 11 6 8V5l3-2 3 2v3z"/><path d="M16 3l3 2v3l-2 2"/><path d="M18 14l3 3v4"/>',
        gamepad: '<path d="M7 7h10l5 6v5h-4l-3-3H9l-3 3H2v-5z"/><path d="M8 10v4M6 12h4"/><path d="M16 11h.01M18 13h.01"/>',
        chat: '<path d="M3 4h18v13H10l-5 4v-4H3z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>',
        gavel: '<path d="M13 3l8 8"/><path d="M9 7l8 8"/><path d="M11 5l-2 2M19 13l-2 2"/><path d="M12 10l-9 9 2 2 9-9"/><path d="M13 21h8"/>',
        badge: '<path d="M12 2l9 4v6l-9 10L3 12V6z"/><path d="M12 8l1.2 2.4 2.8.3-2 1.9.5 2.7-2.5-1.3-2.5 1.3.5-2.7-2-1.9 2.8-.3z"/>',
        city: '<path d="M3 21V10l6-3v14"/><path d="M9 21V3h8v18"/><path d="M17 21v-9l4 2v7"/><path d="M1 21h22"/><path d="M12 7h2M12 11h2M12 15h2"/>',
        shield: '<path d="M12 2l9 3v7l-9 10-9-10V5z"/><path d="M8 11l3 3 5-6"/>',
        skull: '<path d="M5 15V8l4-5h6l4 5v7l-3 2v4H8v-4z"/><path d="M9 11h1M14 11h1"/><path d="M11 21v-2M13 21v-2"/>',
        target: '<path d="M12 3l9 9-9 9-9-9z"/><path d="M12 8l4 4-4 4-4-4z"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>',
        plug: '<path d="M9 2v6M15 2v6"/><path d="M6 8h12v4l-4 5h-4l-4-5z"/><path d="M12 17v5"/>',
        download: '<path d="M12 3v12"/><path d="M6 10l6 6 6-6"/><path d="M3 21h18"/>',
        code: '<path d="M8 6l-6 6 6 6"/><path d="M16 6l6 6-6 6"/><path d="M14 4l-4 16"/>',
        clock: '<path d="M8 2h8l6 6v8l-6 6H8l-6-6V8z"/><path d="M12 7v5l3 3"/>',
        bulb: '<path d="M9 18v-3L6 11V7l4-4h4l4 4v4l-3 4v3z"/><path d="M9 22h6"/>'
    };

    function $(id) { return document.getElementById(id); }

    function icon(name) {
        return '<svg viewBox="0 0 24 24">' + (ICONS[name] || '') + '</svg>';
    }

    function setText(el, text) {
        el.textContent = text;
    }

    function make(tag, className, text) {
        var el = document.createElement(tag);
        if (className) { el.className = className; }
        if (text) { setText(el, text); }
        return el;
    }

    function param(name) {
        var m = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        if (!m) { return ''; }
        var value = m[1];
        try { value = decodeURIComponent(value); } catch (e) { /* valeur brute */ }
        // GMod n'a pas remplacé la variable : on l'ignore
        return value.indexOf('%') === 0 ? '' : value;
    }

    /* ---------- Mise à l'échelle ---------- */
    function fit() {
        var w = window.innerWidth, h = window.innerHeight;
        var scale = Math.min(w / 1920, h / 1080);
        var x = Math.round((w - 1920 * scale) / 2);
        var y = Math.round((h - 1080 * scale) / 2);
        var t = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')';
        var stage = $('stage');
        stage.style.webkitTransform = t;
        stage.style.transform = t;
    }

    /* ---------- Contenu ---------- */
    function fill() {
        var i, el, list;

        setText($('about'), CFG.about);
        setText($('i-map'), param('map') || CFG.defaultMap);
        setText($('i-slots'), CFG.defaultSlots + ' joueurs');
        setText($('i-discord'), CFG.discord);
        setText($('estimate'), 'Estimé : ' + CFG.estimatedTime);

        list = $('rules');
        for (i = 0; i < CFG.rules.length; i++) {
            el = make('div', 'rule');
            el.appendChild(make('b', '', CFG.rules[i].title));
            el.appendChild(make('span', '', CFG.rules[i].text));
            list.appendChild(el);
        }

        list = $('staff');
        for (i = 0; i < CFG.staff.length; i++) {
            el = make('div', /fondateur/i.test(CFG.staff[i].role) ? 'member top' : 'member');
            el.appendChild(make('b', '', CFG.staff[i].name));
            el.appendChild(make('span', '', CFG.staff[i].role));
            list.appendChild(el);
        }

        list = $('factions');
        for (i = 0; i < CFG.factions.length; i++) {
            el = make('div', 'faction');
            var ic = make('span', 'ico');
            ic.innerHTML = icon(CFG.factions[i].icon);
            el.appendChild(ic);
            el.appendChild(make('b', '', CFG.factions[i].name));
            el.appendChild(make('span', 'jobs', CFG.factions[i].jobs));
            list.appendChild(el);
        }

        var placeholders = document.querySelectorAll('[data-icon]');
        for (i = 0; i < placeholders.length; i++) {
            placeholders[i].innerHTML = icon(placeholders[i].getAttribute('data-icon'));
        }
    }

    /* ---------- Progression ----------
       GMod ne donne pas un pourcentage global : la barre combine les étapes
       annoncées par le jeu et le nombre de fichiers. Elle ne recule jamais. */
    var state = { total: 0, needed: null, percent: 0, step: 0 };

    // [motif du message GMod, texte affiché, % minimum, étape]
    var STATUS = [
        [/retrieving server|connecting|gathering|server info/i, 'Récupération des infos du serveur', 3, 0],
        [/workshop complete/i, 'Addons Workshop prêts', 72, 1],
        [/workshop|mounting|addon/i, 'Préparation des addons Workshop', 10, 1],
        [/download/i, 'Téléchargement du contenu', 10, 1],
        [/sending client info/i, 'Envoi des infos client', 82, 2],
        [/client info sent/i, 'Infos client envoyées', 85, 2],
        [/received all lua/i, 'Scripts du serveur reçus', 90, 2],
        [/lua/i, 'Chargement des scripts', 87, 2],
        [/precach|parsing game|map|starting|entities/i, 'Préparation de la ville', 95, 3]
    ];

    function setProgress(percent, step) {
        if (percent > state.percent) { state.percent = Math.min(percent, 99); }
        if (step > state.step) { state.step = step; }

        var shown = Math.round(state.percent);
        setText($('percent'), shown + '%');
        $('bar-fill').style.width = shown + '%';

        for (var i = 0; i < 4; i++) {
            $('s' + i).className = 'step' + (i < state.step ? ' done' : (i === state.step ? ' now' : ''));
        }
    }

    function updateFiles() {
        // On attend d'avoir les deux valeurs : le total arrive avant le restant
        if (state.total <= 0 || state.needed === null) { return; }
        var done = Math.max(0, state.total - state.needed);
        // Les fichiers couvrent la partie 10 % -> 80 % de la barre
        setProgress(10 + 70 * done / state.total, 1);
    }

    /* ---------- Fonctions appelées par Garry's Mod ---------- */
    window.GameDetails = function (servername, serverurl, mapname, maxplayers, steamid, gamemode) {
        if (mapname) { setText($('i-map'), mapname); }
        if (maxplayers) { setText($('i-slots'), maxplayers + ' joueurs'); }
        if (gamemode) { setText($('i-mode'), /darkrp/i.test(gamemode) ? 'DarkRP' : gamemode); }
        if (/en dev/i.test(servername || '')) { $('dev-tag').className = ''; }
        setProgress(2, 0);
    };

    window.SetFilesTotal = function (total) {
        state.total = Number(total) || 0;
        updateFiles();
    };

    window.SetFilesNeeded = function (needed) {
        state.needed = Number(needed) || 0;
        updateFiles();
    };

    window.DownloadingFile = function (fileName) {
        var name = String(fileName || '');
        if (name.length > 110) { name = '...' + name.slice(-107); }
        setText($('file'), name);
        setText($('status'), 'Téléchargement du contenu');
        setProgress(10, 1);
    };

    window.SetStatusChanged = function (status) {
        var text = String(status || '');
        // Texte inconnu : on affiche le message d'origine du jeu
        var label = text;

        for (var i = 0; i < STATUS.length; i++) {
            if (STATUS[i][0].test(text)) {
                label = STATUS[i][1];
                setProgress(STATUS[i][2], STATUS[i][3]);
                break;
            }
        }
        setText($('status'), label);

        // Exemple de message Workshop : « 12/40 ... »
        var count = /(\d+)\s*\/\s*(\d+)/.exec(text);
        if (count && Number(count[2]) > 0) {
            setText($('file'), text);
            setProgress(10 + 60 * Number(count[1]) / Number(count[2]), 1);
        } else {
            setText($('file'), '');
        }
    };

    /* ---------- Chronomètre et astuces ---------- */
    function startTimer() {
        var start = new Date().getTime();
        setInterval(function () {
            var s = Math.floor((new Date().getTime() - start) / 1000);
            var mm = Math.floor(s / 60), ss = s % 60;
            setText($('elapsed'), (mm < 10 ? '0' : '') + mm + ':' + (ss < 10 ? '0' : '') + ss);
        }, 1000);
    }

    function startTips() {
        var el = $('tip-text');
        var index = Math.floor(Math.random() * CFG.tips.length);
        setText(el, CFG.tips[index]);
        setInterval(function () {
            el.style.opacity = 0;
            setTimeout(function () {
                index = (index + 1) % CFG.tips.length;
                setText(el, CFG.tips[index]);
                el.style.opacity = 1;
            }, 300);
        }, 8000);
    }

    /* ---------- Fonds d'écran optionnels ---------- */
    function startBackgrounds() {
        var list = CFG.backgrounds || [];
        if (!list.length) { return; }

        $('bg-skyline').className = 'hidden';
        $('bg-glow').className = 'hidden';

        var layers = [$('bg-photo-a'), $('bg-photo-b')];
        var current = 0, index = 0;

        function show() {
            var next = 1 - current;
            layers[next].style.backgroundImage = 'url("' + list[index] + '")';
            layers[next].className = 'bg-photo on';
            layers[current].className = 'bg-photo';
            current = next;
            index = (index + 1) % list.length;
        }

        show();
        if (list.length > 1) { setInterval(show, 12000); }
    }

    /* ---------- Démo : ouvrir index.html?demo=1 dans un navigateur ---------- */
    function startDemo() {
        window.GameDetails('Nexium DarkRP - En Dev', '', 'rp_unioncity', 64, '', 'darkrp');
        window.SetStatusChanged('Retrieving server info...');
        window.SetFilesTotal(240);

        var needed = 240;
        var timer = setInterval(function () {
            needed -= 8;
            if (needed > 0) {
                window.SetFilesNeeded(needed);
                window.DownloadingFile('materials/nexium_characters/logo_' + needed + '.vtf');
                return;
            }
            clearInterval(timer);
            window.SetFilesNeeded(0);
            var steps = ['Sending client info...', 'Client info sent!', 'Received all Lua files we needed!', 'Starting Lua...', 'Precaching models...'];
            var i = 0;
            var next = setInterval(function () {
                window.SetStatusChanged(steps[i++]);
                if (i >= steps.length) { clearInterval(next); }
            }, 1200);
        }, 300);
    }

    /* ---------- Démarrage ---------- */
    fill();
    fit();
    window.onresize = fit;
    setProgress(0, 0);
    startTimer();
    startTips();
    startBackgrounds();
    if (param('demo')) { startDemo(); }
})();
