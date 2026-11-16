#!/usr/bin/env python3
"""Validador del currículo ABC BODY.

Uso:
  python3 tools/validar_curriculo.py                  # valida y falla (código 1) ante errores
  python3 tools/validar_curriculo.py --actualizar-linea-base   # tras un cambio intencional

Comprueba:
  1. Estructura: IDs únicos, 52 semanas por ruta, campos obligatorios no vacíos.
  2. Estabilidad: ningún ID o domain_id existente desaparece ni cambia (romperían el progreso guardado).
  3. Versión: si el contenido cambia, curriculumVersion debe subir.
  4. Repeticiones: pasos, rúbricas, objetivos y teoría idénticos entre fichas
     no pueden aumentar respecto a la línea base (solo bajar).
  5. MEP: toda referencia MEP debe estar completa y con un estado válido.
"""
import collections, json, re, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))

from importlib import util as _u
_spec = _u.spec_from_file_location("abc_body", pathlib.Path(__file__).resolve().parent / "abc.py")
ab = _u.module_from_spec(_spec); _spec.loader.exec_module(ab)

LINEA_BASE = pathlib.Path(__file__).resolve().parent / "linea_base.json"
OBLIGATORIOS = ["id", "age", "week", "cycle", "program", "domain", "domain_id", "title",
                "objective", "theory", "question", "steps", "materials", "safety", "evidence", "rubric"]
CAMPOS_REPETICION = ["steps", "rubric", "objective", "theory"]
ESTADOS_MEP = {"propuesta", "revisada", "validada"}
CAMPOS_MEP = ["grado", "periodo", "unidad", "programa", "competencia_abc", "estado"]
SEMVER = re.compile(r"^\d+\.\d+\.\d+$")


def ruta_de(f):
    return (f["program"], f.get("cohort") or f.get("cohort_label") or f["age"])


def repeticiones(fichas):
    out = {}
    for campo in CAMPOS_REPETICION:
        c = collections.Counter(json.dumps(f.get(campo), ensure_ascii=False) for f in fichas)
        out[campo] = sum(v - 1 for v in c.values() if v > 1)
    return out


def version_tuple(v):
    return tuple(int(x) for x in v.split("."))


def validar(fichas, meta, base):
    errores, avisos = [], []
    # 1. Estructura
    ids = collections.Counter(f.get("id") for f in fichas)
    for i, n in ids.items():
        if n > 1:
            errores.append(f"ID duplicado: {i} ({n} veces)")
    rutas = collections.defaultdict(list)
    for f in fichas:
        rutas[ruta_de(f)].append(f["week"])
        for campo in OBLIGATORIOS:
            v = f.get(campo)
            if v is None or v == "" or v == []:
                errores.append(f"{f.get('id')}: campo obligatorio vacío «{campo}»")
            elif isinstance(v, list) and any(not str(x).strip() for x in v):
                errores.append(f"{f.get('id')}: «{campo}» tiene elementos vacíos")
    for r, semanas in rutas.items():
        if sorted(semanas) != list(range(1, 53)):
            faltan = sorted(set(range(1, 53)) - set(semanas))
            errores.append(f"Ruta {r}: semanas incorrectas (faltan {faltan[:5]}{'…' if len(faltan) > 5 else ''}, total {len(semanas)})")
    # 2. Estabilidad de IDs
    actuales = {f["id"]: f["domain_id"] for f in fichas}
    for i, dom in base.get("ids", {}).items():
        if i not in actuales:
            errores.append(f"Se eliminó el ID {i}: rompería el progreso guardado")
        elif actuales[i] != dom:
            errores.append(f"{i}: domain_id cambió de {dom} a {actuales[i]}: rompería las autoevaluaciones guardadas")
    # 3. Versión
    v = meta.get("curriculumVersion", "")
    if not SEMVER.match(v):
        errores.append(f"curriculumVersion inválida o ausente: «{v}» (formato X.Y.Z)")
    elif base:
        if ab.huella(fichas) != base.get("huella") and version_tuple(v) <= version_tuple(base.get("version", "0.0.0")):
            errores.append(f"El contenido cambió pero curriculumVersion sigue en {v}: súbela")
    # 4. Repeticiones (no pueden aumentar)
    rep = repeticiones(fichas)
    for campo, n in rep.items():
        limite = base.get("repeticiones", {}).get(campo)
        if limite is not None and n > limite:
            errores.append(f"Repeticiones de «{campo}» subieron de {limite} a {n}")
        elif n:
            avisos.append(f"Repeticiones exactas de «{campo}»: {n}" + (f" (línea base {limite})" if limite is not None else ""))
    # 5. MEP
    con_mep = 0
    for f in fichas:
        mep = f.get("mep")
        if mep is None:
            continue
        con_mep += 1
        for campo in CAMPOS_MEP:
            if not str(mep.get(campo, "")).strip():
                errores.append(f"{f['id']}: referencia MEP sin «{campo}»")
        if mep.get("estado") and mep["estado"] not in ESTADOS_MEP:
            errores.append(f"{f['id']}: estado MEP «{mep['estado']}» no válido ({', '.join(sorted(ESTADOS_MEP))})")
    return errores, avisos, rep, con_mep


def main():
    actualizar = "--actualizar-linea-base" in sys.argv
    _, fichas, meta = ab.leer()
    base = json.loads(LINEA_BASE.read_text(encoding="utf-8")) if LINEA_BASE.exists() else {}
    errores, avisos, rep, con_mep = validar(fichas, meta, {} if actualizar else base)
    print(f"Currículo {meta.get('curriculumVersion', '?')}: {len(fichas)} fichas, "
          f"{len({ruta_de(f) for f in fichas})} rutas, {con_mep} con referencia MEP")
    for a in avisos:
        print("  aviso:", a)
    if errores:
        print(f"\n{len(errores)} error(es):")
        for e in errores[:60]:
            print("  ✗", e)
        if len(errores) > 60:
            print(f"  … y {len(errores) - 60} más")
        sys.exit(1)
    if actualizar:
        nueva = {"version": meta.get("curriculumVersion"), "huella": ab.huella(fichas),
                 "repeticiones": rep, "ids": {f["id"]: f["domain_id"] for f in fichas}}
        LINEA_BASE.write_text(json.dumps(nueva, ensure_ascii=False, indent=1, sort_keys=True) + "\n", encoding="utf-8")
        print("Línea base actualizada.")
    print("✓ Validación correcta")


if __name__ == "__main__":
    main()
