# ABC BODY

**Aprender a moverse. Aprender a entrenar. Aprender a cuidarse. Para toda la vida.**

Plataforma de alfabetización física para colegios privados de Costa Rica. Un estudiante que se gradúa a los 17 años sale entendiendo su cuerpo y sabiendo cómo manejar su salud con actividad física, alimentación y descanso. Puede entrenar de forma autónoma y, si tiene talento, cuenta con un perfil deportivo documentado.

> Prototipo v0.3: sin servidor y con datos ficticios. El currículo de 1° a 11° está alineado al programa oficial de Educación Física del MEP. Ver **[CURRICULO.md](CURRICULO.md)**.

---

## 1. Teoría: el modelo

**Base conceptual.** Es la alfabetización física según Sport for Life (Canadá): motivación y confianza, competencia física, conocimiento y comprensión, y compromiso con la actividad para toda la vida. ABC BODY se inspira en ese marco, pero no tiene afiliación con Sport for Life.

**Principio clave.** La edad define la experiencia. La competencia define el nivel.

**Alineación con el MEP.** Cada grado sigue las unidades del programa oficial de Educación Física: I y II Ciclos (2013) y III Ciclo y Educación Diversificada ("Ética, Estética y Ciudadanía", vigente desde 2011). Son 32 unidades oficiales, cada una con su capa ABC BODY, más 2 extensiones propias en 11°. El detalle está en [CURRICULO.md](CURRICULO.md).

| Nivel | Nombre | Grados | Edad | Meta |
|---|---|---|---|---|
| PL1 | Descubrir | 1°–2° | 6–8 | Conocer el cuerpo y disfrutar el movimiento |
| PL2 | Moverse | 3°–4° | 8–10 | Habilidades motrices fundamentales en el juego |
| PL3 | Jugar | 5°–6° | 10–12 | Juegos predeportivos y salud |
| PL4 | Entrenar | 7°–8° | 12–14 | Técnica y seguridad en el entrenamiento |
| PL5 | Comprender | 9° | 14–15 | Principios del entrenamiento y prevención de lesiones |
| PL6 | Diseñar | 10° | 15–16 | Promover la salud y diseñar desafíos para otros |
| PL7 | Autonomía | 11° | 16–17 | Salud comunitaria + proyecto Self-Coach + ruta opcional de alto rendimiento |

**Siete áreas:** Movimiento · Condición física · Cuerpo humano · Alimentación y recuperación · Entrenamiento · Autogestión y liderazgo · Juego y deporte.

**Cada unidad pide tres evidencias:**
1. **Teoría**: quiz que se corrige solo.
2. **Práctica**: el estudiante registra lo que hizo. Esto no cuenta como competencia.
3. **Competencia**: la valida el docente en clase con una rúbrica de 4 estados (Inicial, En desarrollo, Competente, Consolidada).

**Sello del colegio.** Se otorga según el porcentaje de competencias logradas en el nivel esperado de cada grado (Bronce ≥50%, Plata ≥70%, Oro ≥85%) y según cuántos docentes están certificados. *Es un criterio interno provisional que todavía hay que validar.*

**Límites deliberados**
- **Nutrición:** se enseñan principios generales, no planes de alimentación personalizados (eso le corresponde a un profesional en nutrición colegiado). No hay metas de peso para menores.
- **Docentes:** las competencias las evalúan profesionales en Ciencias del Movimiento Humano debidamente colegiados (Ley 10184).
- **Alto rendimiento:** el perfil deportivo documenta pruebas y trayectoria. No promete becas.

## 2. Herramienta: la app

| Vista | Para quién | Qué hace |
|---|---|---|
| 🎒 Estudiante | Alumno | Camino por niveles tipo Duolingo, con lecciones, quiz, registro de práctica y estado de cada competencia |
| 🧑‍🏫 Docente | Profesor de EF | Matriz del grupo para validar competencias con un toque, más las rúbricas del nivel |
| 🏫 Colegio | Dirección | Sello, avance por grado y por dominio, y perfil del graduado |
| 👨‍👩‍👧 Familia | Padres | Pasaporte del estudiante con insignias, competencias, perfil deportivo e impresión |
| 📚 Currículo | Todos | Mapa por grado: unidad oficial del MEP, competencia ABC, práctica y valor agregado, con las fuentes |

**Estructura**
```
index.html        página principal
css/styles.css    estilos
js/data.js        currículo 1°–11° alineado al MEP (unidades, quizzes, rúbricas) y datos de demostración
CURRICULO.md      currículo completo en formato documento
js/app.js         lógica y vistas
```
Para editar el currículo se modifica `js/data.js`. Cada unidad tiene `grade`, `tri`, `mep` (título oficial), `mepContents`, `competency`, `lesson`, `quiz`, `practice` y `abc` (valor agregado).

## 3. Tutorial

**Ver la app en tu computadora:** descarga el repositorio y abre `index.html` en el navegador. No necesita instalar nada.

**Publicarla gratis con GitHub Pages** (el repositorio debe ser público, o tener un plan de pago):
1. En el repositorio, entra a *Settings → Pages*.
2. En *Source* elige *Deploy from a branch*, luego la rama `main` y la carpeta `/ (root)`, y haz clic en *Save*.
3. En uno o dos minutos la app queda disponible en `https://<usuario>.github.io/abc-body/`.

**Demo sugerida para un director (5 minutos)**
1. **Currículo:** elige un grado y muestra la unidad del MEP junto con la capa ABC BODY.
2. **Estudiante:** abre "Cuidándome y entrenándome: jugando, bailando y creando" (7°), haz el quiz y registra una práctica.
3. **Docente:** en el grupo 7°A, valida competencias tocando las celdas.
4. **Colegio:** muestra el sello y el perfil del graduado.
5. **Familia:** abre el pasaporte de un estudiante de 11°A que tenga perfil deportivo.

## Cambios
- **v0.3** · Guardado seguro: aviso si el navegador no puede guardar (modo privado o almacenamiento lleno), copia de datos dañados en lugar de borrarlos, botones *Descargar respaldo* y *Restaurar respaldo* (JSON) y recordatorio cada 20 cambios sin respaldo.
- **v0.2** · Currículo 1°–11° alineado al programa de Educación Física del MEP.

## Hoja de ruta
- [x] Alinear cada unidad con el programa oficial de Educación Física del MEP (v0.2)
- [x] Respaldo y restauración de datos en JSON (v0.3)
- [ ] Integrar fichas útiles de la V18 (ChatGPT) como lecciones extra de las 34 unidades
- [ ] Validar contenidos y rúbricas con docentes colegiados
- [ ] Ampliar cada unidad a varias lecciones (hoy hay 1 lección y 1 quiz por unidad)
- [ ] Backend con usuarios reales (colegio, docente, estudiante, familia), por ejemplo con Supabase
- [ ] Consentimientos, privacidad de datos de menores y protocolos de seguridad
- [ ] Instrumentos de medición validados (PLAY tools, CAPL-2) para investigación
- [ ] Formato del perfil deportivo según lo que piden los reclutadores universitarios
- [ ] Piloto en 1–2 colegios (2027)
