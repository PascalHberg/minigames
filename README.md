# Minigames

Kleine Browserspiele im Retro-Stil, gehostet über GitHub Pages. Kein Build-Werkzeug nötig, nur HTML, CSS und JavaScript.

Spielbar unter: https://pascalhberg.github.io/minigames/

## Aufbau

```
minigames/
├─ index.html              Menü, lädt die Spieleliste automatisch
├─ shared/
│  ├─ style.css            gemeinsames Design
│  └─ core.js              Highscore, Sternenhimmel, Sound
├─ games/
│  ├─ _template/           Vorlage für neue Spiele (wird nicht im Menü angezeigt)
│  ├─ superball/           index.html + game.json
│  └─ space-invaders/      index.html + game.json
├─ scripts/
│  └─ build_manifest.py    erzeugt games/games.json aus allen game.json
└─ .github/workflows/
   └─ pages.yml            veröffentlicht die Seite bei jedem Push
```

## Neues Spiel hinzufügen

1. Ordner `games/_template/` kopieren und umbenennen, z. B. `games/snake/`.
2. `game.json` anpassen: Titel, Beschreibung, Farbe, Reihenfolge (`order`) und einen eindeutigen `hiKey` (z. B. `snake_hi`).
3. In der `index.html` des Spiels `HI_KEY` auf denselben Wert setzen und das Spiel einbauen.
4. `git add .`, `git commit`, `git push`. Die Kachel im Menü erscheint automatisch.

Die Datei `games/games.js` wird nicht von Hand gepflegt: Sie wird aus den `game.json`-Dateien erzeugt (beim Veröffentlichen automatisch). Zusätzlich liegt sie im Repository, damit das Menü auch per Doppelklick funktioniert. Führe vor dem Commit `python3 scripts/build_manifest.py` aus (unter Windows oft `py scripts/build_manifest.py`), damit diese Kopie aktuell bleibt.

## Einmalige Einrichtung

Im Repository unter **Settings → Pages → Build and deployment → Source** den Wert **GitHub Actions** wählen. Danach veröffentlicht `.github/workflows/pages.yml` die Seite bei jedem Push auf `main`. Den Stand siehst du im Reiter **Actions**.

## Lokal testen

`index.html` einfach im Browser öffnen, ein Server ist nicht nötig. Nach dem Hinzufügen eines Spiels vorher `python3 scripts/build_manifest.py` ausführen, damit die Kachel erscheint.

## Regeln

- Nur relative Pfade verwenden (`../../shared/...`), keine mit `/` beginnenden.
- Jeder `hiKey` muss eindeutig sein. Das Skript bricht sonst mit einer Fehlermeldung ab. Alle Seiten unter `pascalhberg.github.io` teilen sich Cookies und Browserspeicher.
- Der Highscore liegt im Browser des Spielers (Cookie plus localStorage). Eine gemeinsame Bestenliste würde einen Backend-Dienst brauchen.
- Das Repository ist öffentlich, es gehören keine Zugangsdaten hinein.
