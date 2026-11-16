#!/usr/bin/env python3
"""ABC BODY V18.4: install visual brand layer without modifying curriculum data."""
from pathlib import Path
import hashlib

ROOT=Path(__file__).resolve().parent.parent
HTML=ROOT/"index.html"
CSS=ROOT/"brand-v18-4.css"

def blob_hash(data):
    return hashlib.sha1(b"blob "+str(len(data)).encode()+b"\0"+data).hexdigest()

def main():
    if not CSS.is_file():
        raise SystemExit("Brand stylesheet missing")
    text=HTML.read_text(encoding="utf-8")
    expected="bcddef3412c1078d2fc6c041691cb6cf5674a175"
    linked='<link rel="stylesheet" href="brand-v18-4.css">'
    if linked in text:
        print("Brand stylesheet already linked")
        return
    current=blob_hash(HTML.read_bytes())
    if current != expected:
        raise SystemExit(f"Refusing to patch unexpected index.html blob: {current}")
    replacements={
       '<meta name="theme-color" content="#102638">':'<meta name="theme-color" content="#0B2438">',
       '<title>ABC BODY | Kinetic Athletic V18.3</title>':'<title>ABC BODY | ABC HUMAN · V18.4</title>',
       '<div class="sub">THE HUMAN DEVELOPMENT PLATFORM</div>':'<div class="sub">BEYOND YOUR LIMITS</div>',
       'ABC BODY LOCAL V18.3':'ABC BODY LOCAL V18.4',
       '</head>':linked+'</head>',
    }
    for before,after in replacements.items():
       if text.count(before)!=1:
          raise SystemExit(f"Expected exactly one occurrence for {before[:45]} but got {text.count(before)}")
       text=text.replace(before,after,1)
    assert text.count('id="dataset"')==1
    assert text.count('id="curriculum-meta"')==1
    HTML.write_text(text,encoding="utf-8")
    print("Applied ABC HUMAN visual manual V1.0; index.html blob="+blob_hash(HTML.read_bytes()))

if __name__=="__main__":
    main()
