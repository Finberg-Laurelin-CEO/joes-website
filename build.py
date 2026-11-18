"""Build joefinberg.dev from content/*.html, _posts/*.md, _poems/*.md and _data/now.json.

Run:  python3 build.py
Needs: pandoc (brew install pandoc). Posts named _something.md are drafts and are skipped.
"""
import datetime, html, json, re, subprocess
from pathlib import Path

C = Path("content")
TODAY = datetime.date.today().isoformat()
SITE = "https://joefinberg.dev"
BUILT = []  # (url, lastmod) for the sitemap
HEAD, HEADER, FOOTER = ((C / f).read_text() for f in ("_head.html", "_header.html", "_footer.html"))
PAGES = [("home", "Home", "/"), ("projects", "Projects", "/projects/"), ("posts", "Posts", "/posts/"),
         ("now", "Now", "/now/"), ("publications", "Publications", "/publications/"),
         ("poetry", "Poetry", "/poetry/")]

# Template's centered 80ch column. The body is opaque so the ASCII flux field (css/field.js) shows only in the margins.
STYLE = """    <style>
      .header h1 a { color: inherit; text-decoration: none; }
      body { background: var(--background-color); min-height: 100vh; }
      .debug-toggle { display: none !important; }
      .header td.width-min, .header tr:last-child td:last-child { white-space: nowrap; }
      @media screen and (max-width: 600px) {
        .header td.width-min, .header tr:last-child td:last-child { white-space: normal; }
        .header td.width-min { word-break: break-all; }
        .header .coords { font-size: 0.68rem; letter-spacing: -0.02em; }
      }
      #dd-plot { overflow-x: auto; }
      .coords { color: var(--text-color-alt); white-space: nowrap; }
      pre, code { font-variant-ligatures: none; }
      pre { overflow-x: auto; }
      .poem p { margin: 0 0 var(--line-height); }
      .poem .n { display: inline-block; width: 4ch; color: var(--text-color-alt); user-select: none; }
      #field { position: fixed; inset: 0; z-index: -1; margin: 0; overflow: hidden; pointer-events: none;
               color: var(--text-color-alt); opacity: .3; font: inherit; line-height: var(--line-height); white-space: pre; }
    </style>
    <script src="/css/field.js" defer></script>
"""


def front_matter(f):
    m = re.match(r"---\n(.*?)\n---\n(.*)", f.read_text(), re.S)
    if not m:
        raise SystemExit(f"{f}: missing --- front matter ---")
    meta = {k.strip(): v.strip() for k, v in (l.split(":", 1) for l in m.group(1).splitlines() if ":" in l)}
    meta["slug"] = f.stem
    return meta, m.group(2)


def load_posts():
    posts = []
    for f in sorted(Path("_posts").glob("*.md")):
        if f.name.startswith("_"):
            continue
        meta, body = front_matter(f)
        meta["kind"] = "Short" if meta.get("kind", "").lower().startswith("s") else "Long"
        meta["html"] = subprocess.run(["pandoc", "-f", "markdown", "-t", "html", "--mathml"],
                                      input=body, capture_output=True, text=True, check=True).stdout
        posts.append(meta)
    return sorted(posts, key=lambda p: p.get("date", ""), reverse=True)


def posts_table(posts):
    if not posts:
        return "  <p>No posts yet.</p>\n"
    rows = "".join(
        f'      <tr><td><a href="/posts/{p["slug"]}/">{html.escape(p["title"])}</a>'
        + (f'<br><em>{html.escape(p["subtitle"])}</em>' if p.get("subtitle") else "")
        + f'</td><td>{p["kind"]}</td><td><time>{p.get("date", "")}</time></td><td>{html.escape(p.get("tags", ""))}</td></tr>\n'
        for p in posts)
    return ('  <table>\n    <thead><tr><th class="width-auto">Title</th><th class="width-min">Type</th>'
            f'<th class="width-min">Date</th><th class="width-min">Tags</th></tr></thead>\n    <tbody>\n{rows}    </tbody>\n  </table>\n')


def nav(current):
    items = "".join(f'    <li><a href="{u}"{" aria-current=\"page\"" if k == current else ""}>{l}</a></li>\n'
                    for k, l, u in PAGES)
    return f'<nav id="TOC" aria-label="Site navigation">\n  <h2 id="toc-title">Contents</h2>\n  <ul>\n{items}  </ul>\n</nav>\n'


def render(path, current, page_label, title, canonical, body, lastmod=None):
    head = HEAD.replace('href="css/', 'href="/css/')
    if current != "home":
        head = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)} · Joe Finberg</title>", head)
        head = re.sub(r'<link rel="canonical" href="[^"]*">',
                      f'<link rel="canonical" href="https://joefinberg.dev{canonical}">', head)
    header = re.sub(r'(<th>Page</th>\s*<td class="width-min">)[^<]*', r"\g<1>" + page_label, HEADER)
    header = re.sub(r'(<th>Updated</th>\s*<td class="width-min"><time>)[^<]*', r"\g<1>" + TODAY, header)
    header = header.replace('<h1 class="title">Joe Finberg</h1>', '<h1 class="title"><a href="/">Joe Finberg</a></h1>')
    body = re.sub(r'href="(portfolio/|poem-)', r'href="/\1', body)
    footer = FOOTER.replace('href="css/', 'href="/css/')
    head += f'    <link rel="alternate" type="application/rss+xml" title="Joe Finberg: Posts" href="/feed.xml">\n'
    out = (f"{head}{STYLE}</head>\n<body>\n<main>\n"
           f"{header}\n\n{nav(current)}\n<section>\n{body}</section>\n\n{footer}\n</main>\n"
           '<input type="checkbox" class="debug-toggle" hidden aria-hidden="true">\n'
           '<script src="/css/monospace/index.js"></script>\n</body>\n</html>\n')
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    Path(path).write_text(out)
    BUILT.append((canonical, lastmod or TODAY))
    print("wrote", path)


posts = load_posts()
render("index.html", "home", "Home", "Home", "/",
       (C / "home.html").read_text() + "</section>\n\n<section>\n  <h1>Recent posts</h1>\n" + posts_table(posts[:5]))
render("projects/index.html", "projects", "Projects", "Projects", "/projects/", (C / "projects.html").read_text())
render("posts/index.html", "posts", "Posts", "Posts", "/posts/", "  <h1>All posts</h1>\n" + posts_table(posts))
PUBS = json.loads(Path("_data/publications.json").read_text())
pub_rows = "".join(
    "      <tr><td>" + (f'<a href="{p["url"]}" target="_blank" rel="noopener noreferrer">{html.escape(p["title"])}</a>'
                         if p["url"] else html.escape(p["title"]))
    + (f'<br><em>{html.escape(p["venue"])}</em>' if p["venue"] else "") + f'</td><td><time>{p["date"]}</time></td></tr>\n'
    for p in PUBS)
render("publications/index.html", "publications", "Publications", "Publications", "/publications/",
       '  <h1 id="publications">Publications</h1>\n'
       "  <p>Preprints are listed with their DOI and date. They have not been peer reviewed.</p>\n"
       '  <table>\n    <thead><tr><th class="width-auto">Title</th><th class="width-min">Date</th></tr></thead>\n'
       f"    <tbody>\n{pub_rows}    </tbody>\n  </table>\n")


# Now: the two books of the week, from _data/now.json (update with: python3 now.py "Title, Author" "Title, Author").
now = json.loads(Path("_data/now.json").read_text())
books = "".join(f"    <li><cite>{html.escape(b['title'])}</cite>"
                + (f", {html.escape(b['author'])}" if b.get("author") else "")
                + (f" ({html.escape(b['year'])})" if b.get("year") else "") + "</li>\n" for b in now["books"])
past = "".join(f"      <tr><td><cite>{html.escape(b['title'])}</cite></td><td>{html.escape(b.get('author', ''))}</td><td>{html.escape(b.get('year', ''))}</td>"
               f"<td><time>{w['week']}</time></td></tr>\n" for w in now.get("history", []) for b in w["books"])
now_body = (f'  <h1 id="now">Now</h1>\n  <p><small>Updated <time>{now["updated"]}</time></small></p>\n'
            + (f'  <h2>Reading this week</h2>\n  <ul>\n{books}  </ul>\n' if books else "  <p>Nothing listed yet.</p>\n")
            + (f'  <h2>Earlier weeks</h2>\n  <table>\n    <thead><tr><th class="width-auto">Book</th>'
               f'<th class="width-min">Author</th><th class="width-min">Year</th><th class="width-min">Week</th></tr></thead>\n'
               f'    <tbody>\n{past}    </tbody>\n  </table>\n' if past else ""))
render("now/index.html", "now", "Now", "Now", "/now/", now_body)

# Poetry: plain-text poems in _poems/*.md, stanzas separated by a blank line. Long poems get line numbers.
poems = [front_matter(f) for f in sorted(Path("_poems").glob("*.md")) if not f.name.startswith("_")]
rows = "".join(f'      <tr><td><a href="/poetry/{m["slug"]}/">{html.escape(m["title"])}</a>'
               + (f'<br><em>{html.escape(m["subtitle"])}</em>' if m.get("subtitle") else "")
               + f'</td><td>{html.escape(m.get("date", ""))}</td></tr>\n' for m, _ in poems)
render("poetry/index.html", "poetry", "Poetry", "Poetry", "/poetry/",
       '  <h1 id="poetry">Poetry</h1>\n  <table>\n    <thead><tr><th class="width-auto">Title</th>'
       f'<th class="width-min">Date</th></tr></thead>\n    <tbody>\n{rows}    </tbody>\n  </table>\n')
for m, text in poems:
    stanzas = [s.splitlines() for s in text.strip().split("\n\n")]
    numbered = sum(map(len, stanzas)) > 40
    n, out = 0, []
    for st in stanzas:
        lines = []
        for line in st:
            n += 1
            num = f'<span class="n">{n if n % 5 == 0 else ""}</span>' if numbered else ""
            lines.append(num + html.escape(line))
        out.append("    <p>" + "<br>\n".join(lines) + "</p>")
    head = (f'  <h1>{html.escape(m["title"])}</h1>\n'
            + (f'  <p><em>{html.escape(m["subtitle"])}</em></p>\n' if m.get("subtitle") else "")
            + (f'  <p><small>{html.escape(m["date"])}</small></p>\n' if m.get("date") else ""))
    render(f'poetry/{m["slug"]}/index.html', "poetry", "Poem", m["title"], f'/poetry/{m["slug"]}/',
           head + '  <div class="poem">\n' + "\n".join(out) + "\n  </div>\n")

# Old addresses forward to the new pages.
for old, new in [("poem-1.html", "/poetry/the-unfinished-epistle/"), ("poem-2.html", "/poetry/the-fog/"),
                 ("writing.html", "/poetry/"), ("writing/index.html", "/poetry/")]:
    Path(old).parent.mkdir(parents=True, exist_ok=True)
    Path(old).write_text(f'<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url={new}">'
                         f'<link rel="canonical" href="https://joefinberg.dev{new}"><a href="{new}">Moved here</a>\n')
for p in posts:
    meta = (f'  <h1>{html.escape(p["title"])}</h1>\n'
            + (f'  <p><em>{html.escape(p["subtitle"])}</em></p>\n' if p.get("subtitle") else "")
            + f'  <p><small>Published <time>{p.get("date", "")}</time> · {p["kind"]} · Tags {html.escape(p.get("tags", ""))}</small></p>\n')
    render(f'posts/{p["slug"]}/index.html', "posts", "Post", p["title"], f'/posts/{p["slug"]}/', meta + p["html"],
           lastmod=p.get("date"))


# RSS feed of posts, full text.
def rfc822(d):
    return datetime.datetime.strptime(d, "%Y-%m-%d").strftime("%a, %d %b %Y 12:00:00 +0000")
items = "".join(
    f"  <item>\n    <title>{html.escape(p['title'])}</title>\n    <link>{SITE}/posts/{p['slug']}/</link>\n"
    f"    <guid>{SITE}/posts/{p['slug']}/</guid>\n    <pubDate>{rfc822(p['date'])}</pubDate>\n"
    + (f"    <description>{html.escape(p['subtitle'])}</description>\n" if p.get("subtitle") else "")
    + f"    <content:encoded><![CDATA[{p['html']}]]></content:encoded>\n  </item>\n" for p in posts)
Path("feed.xml").write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" '
    'xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n  <title>Joe Finberg: Posts</title>\n'
    f"  <link>{SITE}/posts/</link>\n  <atom:link href=\"{SITE}/feed.xml\" rel=\"self\" type=\"application/rss+xml\"/>\n"
    "  <description>Essays and notes by Joe Finberg on fusion, physics, philosophy, and politics.</description>\n"
    f"  <language>en</language>\n{items}</channel>\n</rss>\n")
print("wrote feed.xml")

# Sitemap from every page rendered above.
Path("sitemap.xml").write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + "".join(f"  <url><loc>{SITE}{u}</loc><lastmod>{m}</lastmod></url>\n" for u, m in BUILT) + "</urlset>\n")
print("wrote sitemap.xml")

# llms.txt: fixed facts from content/llms.md plus generated publications, posts, and poems.
gen = "## Publications\n" + "".join(
    f"- " + (f"[{p['title']}]({p['url']})" if p["url"] else f"*{p['title']}*")
    + f" ({', '.join(x for x in (p['venue'], p['date']) if x)})\n" for p in PUBS)
gen += f"- Full list: {SITE}/publications/\n\n## Posts\n" + "".join(
    f"- [{p['title']}]({SITE}/posts/{p['slug']}/) ({p['date']})\n" for p in posts)
gen += f"- RSS: {SITE}/feed.xml\n\n## Poetry\n" + "".join(
    f"- [{m['title']}]({SITE}/poetry/{m['slug']}/)\n" for m, _ in poems)
gen += f"\n## Projects\n- {SITE}/projects/\n\n## Now\n- What Joe is reading this week: {SITE}/now/\n"
Path("llms.txt").write_text((C / "llms.md").read_text().replace("{{GENERATED}}", gen))
print("wrote llms.txt")
