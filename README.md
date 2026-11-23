# MINIGAMES

[![pages-build-deployment](https://github.com/PascalHberg/minigames/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/PascalHberg/minigames/actions/workflows/pages/pages-build-deployment)

Eine Sammlung kleiner, direkt im Browser spielbarer Minispiele im Retro- und Arcade-Stil. Das Projekt verwendet HTML, CSS und Vanilla JavaScript – ohne externe JavaScript-Bibliotheken, Paketmanager oder Build-Schritt für die Spiele selbst.

**Live spielen:** https://pascalhberg.github.io/minigames/

## Spiele

Die Menüliste wird aus den Metadaten in den einzelnen Spielordnern erzeugt.

| Spiel | Beschreibung | Eintrag |
|---|---|---|
| **SUPERBALL** | Rolle eine Kugel durch die Spielszone, weiche fallenden Scheiben aus und sammle Schilde sowie Zeitlupe. | `games/superball/` |
| **SPACE INVADERS** | Verteidige die Erde gegen Wellen von Invasoren. Das Spiel bietet drei Leben und einen UFO-Bonus. | `games/space-invaders/` |
| **NEON DODGE** | Weiche immer schneller werdenden Hindernissen aus, sammle Schutzschilde und verbessere deinen Rekord. | `games/neon-dodge/` |
| **MEMORY** | Finde alle Kartenpaare mit möglichst wenigen Zügen. | `games/memory/` |
| **KERNEL PANIC** | Überlebe Malware-Wellen, sammle Datenfragmente und kombiniere Firewall-Upgrades. | `games/kernelpanic/` |
| **WORDRUSH** | Entschlüssle rotierende Buchstaben und finde zehn Wörter in 30 Sekunden. | `games/wordrush/` |

## Funktionen

- Zentrales Menü mit automatisch erzeugter Spieleliste
- Individuelle Spielseiten mit eigenem Canvas beziehungsweise eigener Spiellogik
- Lokale Highscores je Spiel
- Gemeinsames Responsive-Design über `shared/style.css`
- Gemeinsame Helfer für Sternenhimmel, Sound und Highscores in `shared/core.js`
- Retro-inspirierte Darstellung und animierter Sternenhimmel
- Soundeffekte über die Web Audio API
- Touch-, Maus- und Tastatursteuerung je nach Spiel
- Direkte lokale Ausführung ohne Server
- Automatische Manifestprüfung und Veröffentlichung über GitHub Actions und GitHub Pages

## Technologie

| Bereich | Technologie |
|---|---|
| Struktur | HTML5 |
| Darstellung | CSS3 |
| Spiellogik | JavaScript (Vanilla JS) |
| Rendering | Canvas 2D und DOM-Elemente |
| Highscores | Cookies und `localStorage` |
| Sound | Web Audio API |
| Manifestgenerator | Python 3 |
| CI | GitHub Actions |
| Hosting | GitHub Pages |

Es werden keine externen JavaScript-Bibliotheken oder Laufzeit-Frameworks benötigt.

## Projektstruktur

```text
minigames/
├── index.html                 # Startseite und Spielmenü
├── shared/
│   ├── style.css              # Gemeinsames Retro-Design
│   └── core.js                # Sterne, Sound und Highscores
├── games/
│   ├── _template/             # Vorlage für neue Spiele
│   ├── superball/             # Ausweichspiel
│   ├── space-invaders/        # Arcade-Shooter
│   ├── neon-dodge/            # Hindernisausweichspiel
│   ├── memory/                # Karten-Memory
│   ├── kernelpanic/           # Arena-Survival-Spiel
│   ├── wordrush/              # Schnelles Buchstaben-/Wortspiel
│   └── games.js               # Automatisch erzeugtes Menümanifest
├── scripts/
│   └── build_manifest.py      # Erzeugt games/games.js aus game.json
├── .github/
│   └── workflows/
│       ├── ci.yml             # Prüft das Manifest
│       └── pages.yml          # Baut und veröffentlicht GitHub Pages
└── README.md
```

## Lokal starten

Ein zusätzlicher Webserver ist nicht erforderlich.

1. Repository klonen oder als ZIP herunterladen.
2. Die Datei `index.html` im Browser öffnen.
3. Ein Spiel über das Menü auswählen.

Mit Git unter Windows:

```powershell
git clone https://github.com/PascalHberg/minigames.git
cd minigames
start index.html
```

## Neues Spiel hinzufügen

Für neue Spiele steht `games/_template/` als Ausgangspunkt bereit.

1. Den Vorlagenordner kopieren und unter einem neuen Ordnernamen in `games/` ablegen, zum Beispiel `games/snake/`.
2. In `game.json` Titel, Beschreibung, Farbe, Reihenfolge und einen eindeutigen `hiKey` festlegen.
3. Die Spielseite `index.html` anpassen und die Spiellogik implementieren.
4. Den in der Spielseite verwendeten Highscore-Schlüssel mit dem `hiKey` in `game.json` identisch halten.
5. Das Manifest erzeugen:

   **Windows (PowerShell):**

   ```powershell
   py scripts/build_manifest.py
   ```

   **Linux / macOS:**

   ```bash
   python3 scripts/build_manifest.py
   ```

6. Änderungen committen und pushen.

Beispiel für `games/snake/game.json`:

```json
{
  "title": "SNAKE",
  "desc": "Sammle Punkte und weiche deinem eigenen Körper aus.",
  "hiKey": "snake_hi",
  "color": "#39ff88",
  "order": 6
}
```

Wichtige Konventionen:

- Der Ordnername wird als Spiel-ID und URL-Pfad verwendet.
- Jeder `hiKey` muss repositoryweit eindeutig sein.
- Ordnernamen, die mit `_` oder `.` beginnen, werden beim Manifestaufbau ignoriert.
- `games/games.js` wird automatisch erzeugt und sollte nicht manuell bearbeitet werden.
- Gemeinsame Funktionen werden aus Spielordnern über `../../shared/core.js` eingebunden.

## Manifest prüfen

Der Generator prüft unter anderem, ob beide Dateien vorhanden sind und ob alle `hiKey`-Werte eindeutig sind:

```powershell
py scripts/build_manifest.py
```

Bei einem erfolgreichen Lauf schreibt das Skript die aktuelle Liste in `games/games.js`.

## Highscores und Datenspeicherung

Highscores werden lokal im Browser gespeichert. Das gemeinsame Core-Modul verwendet dafür sowohl Cookies als auch `localStorage`; beim Auslesen gilt jeweils der höhere gespeicherte Wert.

Es gibt keine zentrale Datenbank und keine serverseitige Bestenliste. Rekorde werden daher nicht automatisch zwischen Geräten oder Browsern synchronisiert. Werden Browserdaten gelöscht, können gespeicherte Highscores verloren gehen.

## Qualitätssicherung und Deployment

### Continuous Integration

Der Workflow `.github/workflows/ci.yml` läuft bei Pushes, Pull Requests und manueller Ausführung. Er erzeugt das Spielemanifest und prüft anschließend, ob `games/games.js` vollständig mit den `game.json`-Metadaten übereinstimmt.

### GitHub Pages

Der Workflow `.github/workflows/pages.yml` veröffentlicht die Website bei jedem Push auf `main`. Vor dem Deployment wird das Manifest erneut aus den vorhandenen Spielordnern erzeugt.

Für die Einrichtung muss unter **Settings → Pages → Build and deployment → Source** die Option **GitHub Actions** ausgewählt sein.

## Projektziel

Das Repository ist ein fortlaufendes Lern- und Entwicklungsprojekt. Neue Spiele dienen dazu, JavaScript, Browser-APIs, Spielmechaniken und die Erweiterung einer kleinen Webanwendung praktisch zu üben.

## Lizenz

Für dieses Repository ist derzeit keine ausdrückliche Open-Source-Lizenzdatei hinterlegt. Soweit nicht anders gekennzeichnet, bleibt die Nutzung daher auf die Rechte beschränkt, die der Repositoryinhaber beziehungsweise das Rechtssystem gewährt. Eine spätere Lizenzierung kann über eine `LICENSE`-Datei vorgenommen werden.
