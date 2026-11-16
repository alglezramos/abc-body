#!/usr/bin/env python3
"""Pruebas del validador: cada caso rompe algo a propósito y el validador debe detectarlo."""
import copy, json, pathlib, sys
from importlib import util
T = pathlib.Path(__file__).resolve().parent.parent / "tools"
def cargar(nombre, archivo):
    s = util.spec_from_file_location(nombre, T / archivo); m = util.module_from_spec(s); s.loader.exec_module(m); return m
ab = cargar("abc_body", "abc.py"); val = cargar("validador", "validar_curriculo.py")
_, FICHAS, META = ab.leer()
BASE = json.loads((T / "linea_base.json").read_text(encoding="utf-8"))

def errores(mut_f=None, mut_m=None):
    f, m = copy.deepcopy(FICHAS), copy.deepcopy(META)
    if mut_f: mut_f(f)
    if mut_m: mut_m(m)
    return val.validar(f, m, BASE)[0]

def primer(f, pid): return next(x for x in f if x["id"] == pid)
def subir(m): m["curriculumVersion"] = "999.0.0"

CASOS = {
    "currículo actual sin errores": (None, None, False, ""),
    "ID duplicado": (lambda f: primer(f, "K6-W02").update(id="K6-W01"), subir, True, "ID duplicado"),
    "semana faltante": (lambda f: f.remove(primer(f, "Y13-W10")), subir, True, "semanas incorrectas"),
    "ID eliminado": (lambda f: f.remove(primer(f, "LON-80_plus-W52")), subir, True, "Se eliminó el ID"),
    "domain_id cambiado": (lambda f: primer(f, "K9-W05").update(domain_id="BODY.KIDS.99"), subir, True, "domain_id cambió"),
    "campo vacío": (lambda f: primer(f, "K7-W03").update(safety=""), subir, True, "campo obligatorio vacío"),
    "paso vacío": (lambda f: primer(f, "K7-W03")["steps"].append("  "), subir, True, "elementos vacíos"),
    "contenido cambia sin subir versión": (lambda f: primer(f, "K6-W01").update(theory="Texto nuevo."), None, True, "súbela"),
    "nueva repetición": (lambda f: primer(f, "K6-W01").update(steps=primer(f, "K6-W02")["steps"]), subir, True, "subieron"),
    "MEP incompleto": (lambda f: primer(f, "K6-W01").update(mep={"grado": "1°", "estado": "propuesta"}), subir, True, "referencia MEP sin"),
    "estado MEP inválido": (lambda f: primer(f, "K6-W01").update(mep={"grado": "1°", "periodo": "I", "unidad": "x", "programa": "y", "competencia_abc": "z", "estado": "aprobada"}), subir, True, "no válido"),
    "versión mal formada": (None, lambda m: m.update(curriculumVersion="v19"), True, "inválida"),
}

fallos = 0
for nombre, (mf, mm, debe_fallar, texto) in CASOS.items():
    e = errores(mf, mm)
    ok = (bool(e) == debe_fallar) and (not texto or any(texto in x for x in e))
    print(("✓" if ok else "✗"), nombre, "" if ok else f"→ {e[:3]}")
    fallos += not ok
sys.exit(1 if fallos else 0)
