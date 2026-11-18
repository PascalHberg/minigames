#!/usr/bin/env python3
"""Sammelt alle games/<ordner>/game.json und schreibt games/games.js (Liste für das Menü).

Ordner, die mit "_" oder "." beginnen (z. B. _template), werden übersprungen.
Danach die index.html einfach im Browser öffnen (Doppelklick genügt).
"""
import json
import sys
from pathlib import Path

GAMES = Path(__file__).resolve().parent.parent / "games"


def main():
    entries, keys, errors = [], {}, []
    for d in sorted(p for p in GAMES.iterdir() if p.is_dir()):
        if d.name.startswith(("_", ".")):
            continue
        meta, page = d / "game.json", d / "index.html"
        if not meta.exists() or not page.exists():
            print(f"Übersprungen: {d.name} (index.html oder game.json fehlt)")
            continue
        try:
            data = json.loads(meta.read_text(encoding="utf-8"))
        except ValueError as err:
            errors.append(f"{d.name}/game.json ist kein gültiges JSON: {err}")
            continue
        try:
            order = int(data.get("order", 100))
        except (TypeError, ValueError):
            order = 100
        title = str(data.get("title", "")).strip() or d.name
        entry = {
            "id": d.name,
            "title": title,
            "desc": str(data.get("desc", "")).strip(),
            "hiKey": str(data.get("hiKey", "")).strip() or d.name.replace("-", "") + "_hi",
            "color": str(data.get("color", "")).strip() or "#3b4cff",
            "order": order,
        }
        if entry["hiKey"] in keys:
            errors.append(f"hiKey '{entry['hiKey']}' wird von {keys[entry['hiKey']]} und {d.name} verwendet")
        keys[entry["hiKey"]] = d.name
        entries.append(entry)
    if errors:
        print("FEHLER:")
        for e in errors:
            print(" -", e)
        sys.exit(1)
    entries.sort(key=lambda g: (g["order"], g["title"].lower()))
    body = json.dumps(entries, ensure_ascii=False, indent=2)
    (GAMES / "games.js").write_text(
        "// Automatisch erzeugt von scripts/build_manifest.py, nicht von Hand ändern.\n"
        "window.GAMES = " + body + ";\n",
        encoding="utf-8",
    )
    print(f"{len(entries)} Spiel(e) eingetragen: " + ", ".join(g["id"] for g in entries))


main()
