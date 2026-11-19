# MINIGAMES

Eine Sammlung kleiner, direkt im Browser spielbarer Minispiele im Retro- und Arcade-Stil. Das Projekt setzt auf HTML, CSS und Vanilla JavaScript – ohne Frameworks, Paketmanager oder Build-Schritt für die Spiele selbst.

**Live spielen:** https://pascalhberg.github.io/minigames/

## Spiele

| Spiel | Beschreibung |
|---|---|
| **SUPERBALL** | Steuere eine Kugel, weiche fallenden Scheiben aus und sammle Schilde sowie Zeitlupe. |
| **SPACE INVADERS** | Verteidige die Erde gegen Gegnerwellen. Mit drei Leben und Ufo-Bonus. |
| **NEON DODGE** | Weiche Hindernissen aus, sammle Schutzschilde und verbessere deinen Rekord. |
| **MEMORY** | Finde alle Kartenpaare mit möglichst wenigen Zügen. |
| **Kernel Panic** | Überlebe Malware-Wellen und kombiniere Firewall-Upgrades. |

Die Spieleliste wird automatisch aus den Metadaten der einzelnen Spielordner generiert.

## Funktionen

- Zentrales Menü mit automatisch geladenen Spielen
- Individuelle Spielseiten und Spielmechaniken
- Highscores pro Spiel
- Gemeinsame Design- und Hilfsfunktionen
- Retro-inspirierte Darstellung mit animiertem Sternenhimmel
- Soundeffekte über die Web Audio API
- Responsive Darstellung für unterschiedliche Bildschirmgrößen
- Direkt lokal im Browser ausführbar
- Automatische Veröffentlichung über GitHub Pages

## Technologie

| Bereich | Technologie |
|---|---|
| Struktur | HTML5 |
| Darstellung | CSS3 |
| Spiellogik | JavaScript (Vanilla JS) |
| Highscores | Cookies und localStorage |
| Sound | Web Audio API |
| Automatisierung | Python |
| CI | GitHub Actions |
| Hosting | GitHub Pages |

Es werden keine externen JavaScript-Bibliotheken oder Laufzeit-Frameworks benötigt.

## Projektstruktur

```text
minigames/
├── index.html                 # Startseite und Spielemenü
├── shared/
│   ├── style.css              # Gemeinsames Design
│   └── core.js                # Highscores, Sternenhimmel und Sound
├── games/
│   ├── _template/             # Vorlage für neue Spiele
│   ├── superball/
│   ├── space-invaders/
│   ├── neon-dodge/
│   ├── memory/
│   ├── kernelpanic/
│   └── games.js               # Automatisch erzeugte Spieleliste
├── scripts/
│   └── build_manifest.py      # Erstellt games/games.js aus game.json
└── .github/
    └── workflows/
        ├── ci.yml             # Prüft das Spielemanifest
        └── pages.yml          # Veröffentlicht die Website
```

## Lokal starten

Ein zusätzlicher Webserver ist nicht erforderlich.

1. Repository klonen oder als ZIP herunterladen.
2. Die Datei `index.html` im Browser öffnen.
3. Ein Spiel über das Menü auswählen.

Unter Windows kann das Repository beispielsweise mit Git geklont werden:

```powershell
git clone https://github.com/PascalHberg/minigames.git
cd minigames
start index.html
```

## Ein neues Spiel hinzufügen

Für neue Spiele gibt es den Ordner `games/_template/`.

1. Den Vorlagenordner kopieren und unter einem neuen Namen in `games/` ablegen, beispielsweise `games/snake/`.
2. In der neuen `game.json` Titel, Beschreibung, Farbe, Reihenfolge und einen eindeutigen `hiKey` festlegen.
3. Die Spielseite `index.html` anpassen und die Spiellogik implementieren.
4. Den Wert `HI_KEY` in der Spielseite identisch zum `hiKey` in `game.json` setzen.
5. Das Manifest neu erzeugen:

   **Windows (PowerShell):**
   ```powershell
   py scripts/build_manifest.py
   ```

   **Linux / macOS:**
   ```bash
   python3 scripts/build_manifest.py
   ```

6. Änderungen committen und pushen.

Beispiel für eine `game.json`:

```json
{
  "title": "SNAKE",
  "desc": "Sammle Punkte und weiche deinem eigenen Körper aus.",
  "hiKey": "snake_hi",
  "color": "#39ff88",
  "order": 6
}
```

Wichtig:
- Der Ordnername wird als Spiel-ID und URL-Pfad verwendet.
- Jeder `hiKey` muss repositoryweit eindeutig sein.
- Die Ordner `_` und `.` am Anfang werden beim Erstellen des Manifests ignoriert.
- `games/games.js` wird aus den `game.json`-Dateien erzeugt und sollte nicht manuell bearbeitet werden.
- Gemeinsame Funktionen können über `../../shared/core.js` eingebunden werden.

## Highscores und Datenspeicherung

Highscores werden lokal im Browser gespeichert. Das gemeinsame Core-Modul verwendet Cookies und `localStorage`; beim Auslesen wird der höhere gespeicherte Wert verwendet.

Es gibt keine serverseitige Datenbank und keine zentrale Bestenliste. Spielstände und Rekorde werden daher nicht automatisch zwischen verschiedenen Geräten oder Browsern synchronisiert. Browserdaten können durch das Löschen von Cookies oder Website-Daten verloren gehen.

## Qualitätssicherung und Deployment

**Continuous Integration**

Der Workflow `.github/workflows/ci.yml` wird bei Pushes, Pull Requests und manueller Ausführung gestartet. Er erzeugt das Spielemanifest und prüft anschließend, ob `games/games.js` mit den Quelldateien übereinstimmt.

**GitHub Pages**

Der Workflow `.github/workflows/pages.yml` veröffentlicht die Website bei jedem Push auf den Branch `main`. Vor dem Deployment wird das Spielemanifest erneut aus den `game.json`-Dateien erstellt.

Für die einmalige Einrichtung muss unter **Settings → Pages → Build and deployment → Source** die Option **GitHub Actions** ausgewählt sein. Den Status der Workflows findest du im Tab **Actions**.

## Projektziel

Das Repository ist ein fortlaufendes Lern- und Entwicklungsprojekt. Neue Spiele dienen dazu, JavaScript, Browser-APIs, Spielmechaniken und die strukturierte Erweiterung einer kleinen Webanwendung praktisch umzusetzen.

## Lizenz

Sofern in einzelnen Dateien oder Spielordnern nichts anderes angegeben ist, gelten die Nutzungsbedingungen des Repositories. Eine explizite Open-Source-Lizenz sollte im Repository über eine `LICENSE`-Datei festgelegt werden.
