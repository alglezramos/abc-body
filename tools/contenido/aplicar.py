#!/usr/bin/env python3
"""Aplica los módulos de contenido al currículo incrustado en index.html.

Idempotente: siempre reescribe los mismos campos a partir de los módulos.
Nunca cambia id, week, cycle, program, domain ni domain_id (el validador lo exige).
"""
import pathlib, sys
from importlib import util
AQUI = pathlib.Path(__file__).resolve().parent
def mod(nombre, ruta):
    s = util.spec_from_file_location(nombre, ruta); m = util.module_from_spec(s); s.loader.exec_module(m); return m
ab = mod("abc_body", AQUI.parent / "abc.py")


def aplicar_kids_9_12(fichas):
    k = mod("kids_9_12", AQUI / "kids_9_12.py")
    n = 0
    for f in fichas:
        if f["program"] != "ABC KIDS" or not 9 <= f["age"] <= 12:
            continue
        dom = k.DOMINIOS[f["domain"]]
        titulo, principal, variacion, clave = dom["ciclos"][f["cycle"] - 1]
        base_titulo = f["title"].split(" · ")[0]
        assert base_titulo == titulo, (f["id"], base_titulo, titulo)
        reto, observable, concepto = dom["edades"][f["age"]]
        etapa = k.ETAPAS[f["age"]]
        t = titulo
        f["objective"] = f"{etapa['verbo'].format(t=t)}: {observable}."
        f["theory"] = f"{clave} {concepto}"
        f["question"] = etapa["pregunta"].format(t=t)
        f["steps"] = [principal, f"{variacion} {reto}", etapa["cierre"].format(t=t)]
        f["rubric"] = [f"En «{t}», {observable}.", etapa["proceso"], f"Explica con sus palabras: {clave[0].lower() + clave[1:]}"]
        v = f.get("variants") or {}
        if "base" in v:
            v["base"]["activity"] = principal
            v["base"]["observables"] = f["rubric"][:2]
        if "progresion" in v:
            v["progresion"]["activity"] = f"{principal} {variacion}"
            v["progresion"]["observables"] = [f["rubric"][0], f["rubric"][1]]
        if "desafio" in v:
            v["desafio"]["activity"] = f"{variacion} {reto}"
            v["desafio"]["observables"] = [f"En «{t}», {observable} con una variación nueva.", f["rubric"][1]]
        f["editorial_status"] = "v18_2_diferenciado_por_edad_pendiente_validacion_profesional"
        n += 1
    return n


ETAPAS_YOUTH = {
    13: ("Foundations", "Aprender los puntos clave de «{t}» y reconocer sus criterios de seguridad antes de añadir dificultad."),
    14: ("Control", "Ejecutar «{t}» con control estable en varias repeticiones y corregir un error propio con retroalimentación."),
    15: ("Develop", "Aumentar de forma gradual la exigencia de «{t}» (volumen, velocidad o complejidad) y registrar cómo responde el cuerpo."),
    16: ("Application", "Aplicar «{t}» en un juego o deporte elegido y adaptarlo a situaciones cambiantes."),
    17: ("Planning", "Planificar una sesión breve que incluya «{t}», con objetivo, progresión y criterios de seguridad."),
    18: ("Autonomy", "Gestionar «{t}» de forma autónoma dentro de un plan semanal propio y evaluar su efecto."),
}


def aplicar_youth_objetivos(fichas):
    n = 0
    for f in fichas:
        if f["program"] != "ABC YOUTH":
            continue
        etapa, plantilla = ETAPAS_YOUTH[f["age"]]
        assert f["title"].endswith(" · " + etapa), (f["id"], f["title"])
        t = f["title"].split(" · ")[0]
        f["objective"] = plantilla.format(t=t)
        n += 1
    return n


ROMANOS = {1: "I", 2: "II", 3: "III"}


def aplicar_mep(fichas):
    """Referencia MEP como dato (estado «propuesta») para KIDS y YOUTH de 6 a 16 años.

    Grado = edad típica − 5 (6 años → 1°). Periodo = tercio del año (semanas 1–17, 18–35, 36–52).
    En 11° el MEP tiene dos unidades: el periodo III continúa la unidad II.
    """
    import json
    datos = json.loads((AQUI / "mep_unidades.json").read_text(encoding="utf-8"))
    por = {(u["grade"], u["tri"]): u for u in datos["unidades"]}
    n = 0
    for f in fichas:
        f.pop("mep", None)
        if f["program"] not in ("ABC KIDS", "ABC YOUTH") or not 6 <= f["age"] <= 16:
            continue
        g = f["age"] - 5
        tri = min(3, (f["week"] - 1) * 3 // 52 + 1)
        u = por.get((f"{g}°", tri)) or por.get((f"{g}°", 2))
        programa = ("I y II Ciclos (2013)" if g <= 6 else "III Ciclo y Educación Diversificada «Ética, Estética y Ciudadanía» (2011)")
        f["mep"] = {
            "grado": f"{g}°", "periodo": ROMANOS[tri], "unidad": u["mep"], "unidad_id": u["id"],
            "programa": programa, "competencia_abc": u["competency"], "area_abc": u["area_abc"],
            "estado": "propuesta",
            "nota": "Correspondencia por edad típica (edad − 5) y periodo del año; confirmar con el grado real del estudiante y el programa vigente.",
        }
        n += 1
    return n


def aplicar_rutas_adultos(fichas):
    """Actividad principal y nota de seguridad propias de cada ruta en ATHLETE, ACTIVE y LONGEVITY."""
    import json, re
    r = mod("rutas_adultos", AQUI / "rutas_adultos.py")
    patron = re.compile(r"^(Práctica principal \([^)]*\): )(.*?)(\. .*)$")
    n = 0
    for f in fichas:
        if f["program"] not in r.RUTAS:
            continue
        idx = r.RUTAS[f["program"]].index(f["cohort"])
        nueva = r.ACTIVIDADES[f["program"]][f["domain"]][idx]
        m = patron.match(f["steps"][1])
        assert m, (f["id"], f["steps"][1])
        vieja = m.group(2)  # actividad actual (original V18 o ya aplicada): idempotente
        f["steps"][1] = m.group(1) + nueva + m.group(3)
        low_v, low_n = vieja[0].lower() + vieja[1:], nueva[0].lower() + nueva[1:]
        def cambiar(x):
            if isinstance(x, str):
                return x.replace(vieja, nueva).replace(low_v, low_n)
            if isinstance(x, list):
                return [cambiar(y) for y in x]
            if isinstance(x, dict):
                return {k: cambiar(v) for k, v in x.items()}
            return x
        f["rubric"] = cambiar(f["rubric"])
        f["variants"] = cambiar(f["variants"])
        f["evidence"] = cambiar(f["evidence"])
        nota = r.SEGURIDAD_RUTA[f["cohort"]]
        base_seg = f["safety"]
        for previa in r.SEGURIDAD_RUTA.values():
            if base_seg.startswith(previa + " "):
                base_seg = base_seg[len(previa) + 1:]
        f["safety"] = nota + " " + base_seg
        n += 1
    return n


PASOS = {"kids": aplicar_kids_9_12, "youth": aplicar_youth_objetivos, "mep": aplicar_mep, "rutas": aplicar_rutas_adultos}

if __name__ == "__main__":
    html, fichas, meta = ab.leer()
    for f in fichas:
        f.pop("_actividad_v18", None); f.pop("_seguridad_v18", None)
    for nombre in sys.argv[1:] or PASOS:
        print(nombre, PASOS[nombre](fichas), "fichas")
    ab.escribir(html, fichas, meta)
