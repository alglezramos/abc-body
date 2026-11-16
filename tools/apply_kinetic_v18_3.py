#!/usr/bin/env python3
"""Apply the reviewed V18.3 visual-only update to index.html.

Checks both original and final Git blob hashes. No external dependencies.
"""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"
PATCH = ROOT / "tools" / "kinetic_v18_3_patch.json"

def git_blob_sha(data: bytes) -> str:
    return hashlib.sha1(b"blob " + str(len(data)).encode("ascii") + b"\0" + data).hexdigest()

def main() -> None:
    p = json.loads(PATCH.read_text(encoding="utf-8"))
    original = INDEX.read_bytes()
    actual = git_blob_sha(original)
    if actual == p["expected_blob_sha"]:
        print("V18.3 already applied; nothing to do.")
        return
    if actual != p["base_blob_sha"]:
        raise SystemExit(f"Refusing to overwrite changed index.html: actual={actual}, expected={p['base_blob_sha']}")
    lines = original.decode("utf-8").splitlines(keepends=True)
    for change in sorted(p["operations"], key=lambda c: c["start"], reverse=True):
        lines[change["start"]:change["end"]] = [change["text"]]
    result = "".join(lines).encode("utf-8")
    sha = git_blob_sha(result)
    if sha != p["expected_blob_sha"]:
        raise SystemExit(f"Patch verification failed: {sha} != {p['expected_blob_sha']}")
    INDEX.write_bytes(result)
    print(f"Applied V18.3: {sha} ({len(result)} bytes)")

if __name__ == "__main__":
    main()
