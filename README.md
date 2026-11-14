# ABC BODY

**Aprender a moverse. Aprender a entrenar. Aprender a cuidarse. Para toda la vida.**

Plataforma de alfabetización física para colegios privados de Costa Rica. Un estudiante que se gradúa a los 17 años sale entendiendo su cuerpo y sabiendo cómo manejar su salud con actividad física, alimentación y descanso. Puede entrenar de forma autónoma y, si tiene talento, cuenta con un perfil deportivo documentado.

> Prototipo v0.1: sin servidor y con datos ficticios. Sirve para mostrar el concepto a directores, docentes y familias.

---

## 1. Teoría: el modelo

**Base conceptual.** Es la alfabetización física según Sport for Life (Canadá): motivación y confianza, competencia física, conocimiento y comprensión, y compromiso con la actividad para toda la vida. ABC BODY se inspira en ese marco, pero no tiene afiliación con Sport for Life.

**Principio clave.** La edad define la experiencia. La competencia define el nivel.

| Nivel | Nombre | Grados | Edad | Meta |
|---|---|---|---|---|
| PL1 | Descubrir | 1°–2° | 6–8 | Confianza y disfrute del movimiento |
| PL2 | Moverse | 3°–4° | 8–10 | Habilidades motrices fundamentales |
| PL3 | Jugar | 5°–6° | 10–12 | Aplicar habilidades en juegos y deportes |
| PL4 | Entrenar | 7°–8° | 12–14 | Técnica y seguridad en el entrenamiento |
| PL5 | Comprender | 9° | 14–15 | Cómo responde el cuerpo |
| PL6 | Diseñar | 10° | 15–16 | Diseñar sesiones, semanas y hábitos |
| PL7 | Autonomía | 11° | 16–17 | Proyecto Self-Coach + ruta opcional de alto rendimiento |

**Seis dominios:** Movimiento · Condición física · Cuerpo humano · Alimentación y recuperación · Entrenamiento · Autogestión.

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

**Estructura**
```
index.html        página principal
css/styles.css    estilos
js/data.js        currículo (niveles, unidades, quizzes, rúbricas) y datos de demostración
js/app.js         lógica y vistas
```
Para editar el currículo se modifica `js/data.js`. Cada unidad tiene `lesson`, `quiz`, `practice`, `competency` y `mep` (la alineación con el programa del MEP, pendiente).

## 3. Tutorial

**Ver la app en tu computadora:** descarga el repositorio y abre `index.html` en el navegador. No necesita instalar nada.

**Publicarla gratis con GitHub Pages** (el repositorio debe ser público, o tener un plan de pago):
1. En el repositorio, entra a *Settings → Pages*.
2. En *Source* elige *Deploy from a branch*, luego la rama `main` y la carpeta `/ (root)`, y haz clic en *Save*.
3. En uno o dos minutos la app queda disponible en `https://<usuario>.github.io/abc-body/`.

**Demo sugerida para un director (5 minutos)**
1. **Estudiante:** abre "Patrones de fuerza", haz el quiz y registra una práctica.
2. **Docente:** en el grupo 7°A, valida competencias tocando las celdas.
3. **Colegio:** muestra el sello y el perfil del graduado.
4. **Familia:** abre el pasaporte de un estudiante de 11°A que tenga perfil deportivo.

## Hoja de ruta
- [ ] Mapear cada unidad con el programa oficial de Educación Física del MEP
- [ ] Validar contenidos y rúbricas con docentes colegiados
- [ ] Completar las unidades por nivel (hoy hay 24 de muestra)
- [ ] Backend con usuarios reales (colegio, docente, estudiante, familia), por ejemplo con Supabase
- [ ] Consentimientos, privacidad de datos de menores y protocolos de seguridad
- [ ] Instrumentos de medición validados (PLAY tools, CAPL-2) para investigación
- [ ] Formato del perfil deportivo según lo que piden los reclutadores universitarios
- [ ] Piloto en 1–2 colegios (2027)
