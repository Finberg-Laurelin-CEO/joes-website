"""Set this week's two books on the Now page, then rebuild.

Usage:  python3 now.py "Title, Author, Year" "Title, Author, Year"
Last week's books move to the "Earlier weeks" table.
"""
import datetime, json, subprocess, sys
from pathlib import Path

if len(sys.argv) != 3:
    sys.exit(__doc__)
path = Path("_data/now.json")
now = json.loads(path.read_text())
if now["books"]:
    now["history"].insert(0, {"week": now["updated"], "books": now["books"]})
def book(s):
    parts = [p.strip() for p in s.rsplit(",", 2)] if s.count(",") >= 2 else [p.strip() for p in s.split(",", 1)]
    year = parts.pop() if len(parts) == 3 else ""
    return {"title": parts[0], "author": parts[1] if len(parts) > 1 else "", "year": year}
now["books"] = [book(a) for a in sys.argv[1:]]
now["updated"] = datetime.date.today().isoformat()
path.write_text(json.dumps(now, indent=2, ensure_ascii=False) + "\n")
subprocess.run([sys.executable, "build.py"], check=True)
