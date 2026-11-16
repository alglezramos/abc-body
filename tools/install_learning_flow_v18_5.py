#!/usr/bin/env python3
"""Install ABC BODY's guided lesson UI without rewriting the embedded curriculum."""
from pathlib import Path
import hashlib
root=Path(__file__).resolve().parent.parent
path=root/'index.html'
data=path.read_bytes()
def blob_sha(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
original='cbb105cf7228a013640b3142fc51dfb161b541a8'
css='<link rel="stylesheet" href="learning-flow-v18-5.css">'
js='<script src="learning-flow-v18-5.js"></script>'
if css.encode() in data and js.encode() in data:
 print('Guided lesson already installed');raise SystemExit(0)
if blob_sha(data)!=original:
 raise SystemExit('Refusing unexpected index.html version: '+blob_sha(data))
src=data.decode('utf-8')
assert src.count('</head>')==1 and src.count('</body>')==1
assert src.count('id="dataset"')==1 and src.count('id="curriculum-meta"')==1
assert src.count('id="academia"')==1 and src.count('id="evidencia"')==1
src=src.replace('</head>',css+'</head>').replace('</body>',js+'</body>')
path.write_text(src,encoding='utf-8')
print('Installed guided lessons, new blob:',blob_sha(path.read_bytes()))
