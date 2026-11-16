"""Utilidades compartidas: leer y escribir el currículo incrustado en index.html."""
import json, re, hashlib, pathlib

RAIZ = pathlib.Path(__file__).resolve().parent.parent
INDEX = RAIZ / "index.html"
_DATASET = re.compile(r'(<script id="dataset" type="application/json">)(.*?)(</script>)', re.S)
_META = re.compile(r'(<script id="curriculum-meta" type="application/json">)(.*?)(</script>)', re.S)


def leer(ruta=INDEX):
    html = pathlib.Path(ruta).read_text(encoding="utf-8")
    m = _DATASET.search(html)
    if not m:
        raise SystemExit("No se encontró <script id=\"dataset\"> en index.html")
    fichas = json.loads(m.group(2))
    mm = _META.search(html)
    meta = json.loads(mm.group(2)) if mm else {}
    return html, fichas, meta


def serializar(fichas):
    s = json.dumps(fichas, ensure_ascii=False, separators=(",", ":"))
    if "</" in s:
        s = s.replace("</", "<\\/")
    return s


def escribir(html, fichas, meta, ruta=INDEX):
    html = _DATASET.sub(lambda m: m.group(1) + serializar(fichas) + m.group(3), html, count=1)
    meta_s = json.dumps(meta, ensure_ascii=False, separators=(",", ":"))
    if _META.search(html):
        html = _META.sub(lambda m: m.group(1) + meta_s + m.group(3), html, count=1)
    else:
        html = html.replace('<script id="dataset"',
                            '<script id="curriculum-meta" type="application/json">' + meta_s + '</script>\n<script id="dataset"', 1)
    pathlib.Path(ruta).write_text(html, encoding="utf-8")


def huella(fichas):
    """Hash del contenido (sin campos de control), para detectar cambios de contenido."""
    return hashlib.sha256(serializar(fichas).encode("utf-8")).hexdigest()
