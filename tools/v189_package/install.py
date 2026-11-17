#!/usr/bin/env python3
"""Install exact supplied V18.9 ZIP on feature branch, preserving other files."""
from pathlib import Path
import base64, hashlib, zipfile, io, json, re, subprocess

root=Path(__file__).resolve().parent.parent
pieces=sorted((root/"tools/v189_package").glob("part-*.txt"))
assert len(pieces)==13, f"Expected 13 pieces, got {len(pieces)}"
data=base64.b64decode("".join(p.read_text().strip() for p in pieces),validate=True)
expected="3ac501437be8cd2479b6188afe97106538edb1bbe7bb4b2f5eb48d8815cd0778"
assert hashlib.sha256(data).hexdigest()==expected,"V18.9 uploaded ZIP digest mismatch"
expected_names={
"familia-v18-9.js","familia-v18-9.css","README.md","index.html",
"medallero-convenios-v18-8.js","learning-flow-v18-5.js"
}
with zipfile.ZipFile(io.BytesIO(data)) as z:
    files={}
    for member in z.infolist():
        if member.is_dir():continue
        assert member.filename.startswith("abc-body-v18-9/"),member.filename
        name=member.filename.removeprefix("abc-body-v18-9/")
        assert "/" not in name and name in expected_names,name
        files[name]=z.read(member)
assert set(files)==expected_names,set(files)
# Protect other repository state and ensure patch is against inspected main.
old_sha=subprocess.check_output(["git","hash-object","index.html"],cwd=root,text=True).strip()
assert old_sha=="809a7e09f5f0dd850ce7de8ad4cb56986b1edcb9",f"Unexpected base index {old_sha}"
for name,contents in files.items():
    (root/name).write_bytes(contents)
html=files["index.html"].decode("utf-8")
assert html.count('id="dataset"')==1 and html.count('id="curriculum-meta"')==1
curriculum=json.loads(re.search(r'<script\s+id="dataset"[^>]*>(.*?)</script>',html,re.S).group(1))
assert len(curriculum)==1144 and len({r["id"] for r in curriculum})==1144
for name in ("familia-v18-9.js","familia-v18-9.css","learning-flow-v18-5.js","medallero-convenios-v18-8.js"):
    assert name in html,name
for name in ("familia-v18-9.js","medallero-convenios-v18-8.js","learning-flow-v18-5.js"):
    subprocess.run(["node","--check",name],cwd=root,check=True)
assert "V18.9" in files["README.md"].decode("utf-8")
print("Installed exact V18.9: six requested files, 1144 unique curriculum IDs, JavaScript syntax OK.")
