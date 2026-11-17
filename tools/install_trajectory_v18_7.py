#!/usr/bin/env python3
"""Install ABC BODY visual trajectory using a verified source payload.

The payload suffered a one-character transfer omission. Recover that character
only when reconstructed files match both original SHA-256 values exactly.
Keep the curriculum and storage model unchanged.
"""
from pathlib import Path
import base64, gzip, hashlib, io, tarfile, re

ROOT=Path(__file__).resolve().parent.parent
PACKAGE=ROOT/'tools/trajectory_v18_7_payload.b64'
EXPECTED={
 'trayectoria-v18-7.js':'4077b165dfb1b5af901306bb3d463b6b0068270dc3016c6d7a35b67ff538ff9c',
 'trayectoria-v18-7.css':'d1898cfac2f3d1a07aa3271a7337dff053cda5776d6d20c3199e825eb38b9fc7',
}
CHARSET='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
def unpack(encoded):
    raw=gzip.decompress(base64.b64decode(encoded,validate=True))
    with tarfile.open(fileobj=io.BytesIO(raw)) as t:
        return {n:t.extractfile(n).read() for n in EXPECTED}
def verified(files):
    return all(hashlib.sha256(files[n]).hexdigest()==sha for n,sha in EXPECTED.items())
def recover():
    encoded=PACKAGE.read_text().strip()
    try:
        files=unpack(encoded)
        if verified(files):return files
    except Exception:pass
    if len(encoded)!=7151:raise SystemExit('Unexpected payload length; no automatic recovery')
    for i in range(len(encoded)+1):
        for char in CHARSET:
            try:
                files=unpack(encoded[:i]+char+encoded[i:])
                if verified(files):
                    print('Recovered verified payload at position',i)
                    return files
            except (ValueError,EOFError,OSError,tarfile.TarError,KeyError,RuntimeError):
                pass
    raise SystemExit('No reconstruction matches source hashes; refusing to publish')
def git_blob(data):
    return hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
def main():
    files=recover()
    index=ROOT/'index.html'
    old=index.read_bytes()
    before_sha='382bf7744cc758a3630fd56b197e4f20c812a999'
    link_css='<link rel="stylesheet" href="trayectoria-v18-7.css">'
    link_js='<script src="trayectoria-v18-7.js"></script>'
    text=old.decode('utf-8')
    if link_css not in text or link_js not in text:
        if git_blob(old)!=before_sha:raise SystemExit('Unexpected index.html revision. Refusing to overwrite.')
        if text.count('</head>')!=1 or text.count('</body>')!=1:
            raise SystemExit('HTML link anchors not unique')
        text=text.replace('</head>',link_css+'</head>').replace('</body>',link_js+'</body>')
        index.write_text(text,encoding='utf-8')
    for name,data in files.items():
        path=ROOT/name
        if path.exists() and path.read_bytes()!=data:
            raise SystemExit('Refusing overwrite of changed file: '+name)
        path.write_bytes(data)
    print('Installed verified V18.7 visual dashboard; curriculum embedded in index.html retained')
if __name__=='__main__':main()
