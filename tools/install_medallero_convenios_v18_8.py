#!/usr/bin/env python3
"""Connect the V18.8 Medallero & Convenios modules without changing the curriculum."""
from pathlib import Path
import hashlib
ROOT=Path(__file__).resolve().parent.parent
html=ROOT/'index.html'
original=html.read_bytes()
def blob(data): return hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
base_sha='625445ffe908b9a36e88bc792510183842e4c356'
css='<link rel="stylesheet" href="medallero-convenios-v18-8.css">'
js='<script src="medallero-convenios-v18-8.js"></script>'
source=original.decode('utf-8')
if css in source and js in source:
 print('Medallero & Convenios already installed')
 raise SystemExit(0)
if blob(original)!=base_sha:
 raise SystemExit(f'Unexpected index.html revision: {blob(original)}')
if source.count('</head>')!=1 or source.count('</body>')!=1:
 raise SystemExit('Missing/ambiguous HTML landmarks')
if source.count('id="dataset"')!=1 or source.count('id="curriculum-meta"')!=1:
 raise SystemExit('Missing curriculum data anchors')
if source.count('id="medallero"')!=1 or source.count('id="nav"')!=1:
 raise SystemExit('Missing Medallero/navigation anchors')
for name in ['medallero-convenios-v18-8.js','medallero-convenios-v18-8.css']:
 if not (ROOT/name).is_file():
  raise SystemExit('Missing: '+name)
source=source.replace('</head>',css+'</head>',1).replace('</body>',js+'</body>',1)
html.write_text(source,encoding='utf-8')
print('Installed V18.8, new index SHA:',blob(html.read_bytes()))
