# ABC BODY LOCAL V18 — Fases 1, 2 y 3 (auditoría y pruebas)

## Alcance confirmado
- 5 programas, 22 rutas, 1.144 fichas, 52 semanas por ruta. Todos los identificadores de V17 conservados.
- Sin Supabase ni dependencias de red; un único perfil local. Las copias JSON contienen perfil/progreso, **no** los videos.
- CSV de auditoría para cada ficha; CSV de las 160 correcciones/normalizaciones editoriales aplicadas.
- Cuatro tareas KIDS 6 estaban clasificadas como saltos pese a describir empuje o transporte; su etiqueta visible se corrigió sin cambiar domain_id.
- 156 fichas KIDS 6-8 reemplazan el texto genérico de materiales por un control de preparación; se requiere inventario de materiales específico para cada clase en revisión humana.
- Se conserva el contenido base; la app distingue reflexión, práctica registrada y autoevaluación. Ninguno certifica una competencia.
- Registros de práctica se filtran por ruta seleccionada; los controles de videos se vinculan sin usar acciones inline con IDs importados; restaurar JSON no simula disponer de videos.

## Límites importantes
- La Fase 1 **no equivale a validación pedagógica/profesional individual** de 1.144 lecciones. Los textos repetidos persisten, especialmente en las rutas de adultos. Revisar el informe de auditoría.
- La Fase 3 realiza pruebas técnicas automatizadas, no ensayos de campo, pruebas de usabilidad reales ni validación clínica.
- El entorno de almacenamiento del navegador puede eliminarse; exportar respaldos regularmente. No usar datos personales de menores en esta demo.

## Pruebas y resultados V18
- 22/22 rutas con exactamente 52 semanas; 1.144 IDs únicos; variantes y campos obligatorios presentes.
- Chromium mediante `set_content` con almacenamiento local **simulado**: 12 comprobaciones de navegación y flujos sin errores JS; ver `reporte_pruebas_v18.json`. El entorno bloqueó cargar la URL local/file:// directamente, por eso **no** se ha probado una recarga con localStorage/IndexedDB nativos.
- No se comprobó en un dispositivo físico ni se realizó un test de accesibilidad completo.
- Aún hay 468 repeticiones exactas de pasos y 468 de rúbricas entre fichas; esto NO permite declarar Fase 1 validada académicamente.
- `auditoria_1144_v18.csv` detalla los hallazgos por ficha.

## V18.1 — Guardado seguro (Claude)
- Aviso visible si el navegador no puede guardar (modo privado o almacenamiento lleno). En V18 el error se lanzaba sin avisar y el progreso se perdía.
- Si los datos guardados están dañados, se conserva una copia (`abchuman.local.v12.danado.<fecha>`) y se avisa.
- Recordatorio para descargar un respaldo cada 20 cambios; exportar reinicia el contador.
- Probado en Chrome real servido por HTTP (no `set_content`): 17/17, incluidas recarga con localStorage nativo, video en IndexedDB tras recargar, exportar, borrar datos y restaurar, almacenamiento lleno, almacenamiento bloqueado, datos dañados y móvil de 390 px.
- No cambia ninguna ficha ni el dataset.

## V18.2 — Contenido diferenciado, validación docente, MEP y validador (Claude)

### Teoría: qué cambió y por qué
- **Validador de contenido** (`tools/validar_curriculo.py`): impide que vuelvan las fichas repetidas y protege el progreso guardado. Falla si hay IDs duplicados, rutas sin 52 semanas, campos vacíos, IDs o `domain_id` eliminados o cambiados, contenido modificado sin subir `curriculumVersion`, más repeticiones que la línea base o referencias MEP incompletas.
- **Versión del currículo** (`curriculumVersion` en `<script id="curriculum-meta">`, hoy 18.2.0): la app migra el progreso al abrir una versión nueva; lo que apunte a fichas retiradas se archiva en el respaldo, no se borra.
- **KIDS 9–12 diferenciado**: 13 dominios × 4 actividades propias × 4 edades (9 adapta, 10 aplica en juego, 11 refina, 12 diseña y enseña). Antes eran 13 juegos de pasos para 208 fichas.
- **YOUTH 13–18**: objetivo propio por etapa (Foundations → Autonomy) y semana.
- **Validación docente**: el docente registra nivel (Inicial, En desarrollo, Competente, Consolidada), nombre y fecha por competencia. La autoevaluación no cuenta; la medalla de competencia validada solo se obtiene con validación Competente o Consolidada. Es un registro local, no una certificación oficial.
- **MEP como datos**: 572 fichas de 6–16 años con grado, periodo, unidad oficial, programa y competencia ABC, en estado «propuesta» (grado = edad típica − 5).
- **ATHLETE, ACTIVE y LONGEVITY**: actividad principal y nota de seguridad propias de cada ruta.
- Resultado: 1.144 de 1.144 fichas con pasos distintos (antes 468 repeticiones). Todo sigue **pendiente de validación profesional**.

### Herramienta
| Archivo | Para qué |
|---|---|
| `tools/validar_curriculo.py` | Valida el currículo; `--actualizar-linea-base` tras un cambio intencional |
| `tools/linea_base.json` | IDs, versión y repeticiones aceptadas (solo pueden bajar) |
| `tools/contenido/*.py` | Contenido fuente (KIDS 9–12, rutas de adultos) y `aplicar.py`, que lo incrusta en `index.html` |
| `tools/contenido/mep_unidades.json` | Las 32 unidades del MEP del prototipo v0.2 |
| `tests/test_validador.py` | 12 casos que rompen el currículo a propósito |
| `.github/workflows/validar.yml` | Corre validador y pruebas en cada push y pull request |

### Tutorial: cambiar una ficha
1. Edita el módulo en `tools/contenido/` (o la ficha en `index.html`).
2. `python3 tools/contenido/aplicar.py` (si usaste los módulos).
3. Sube `curriculumVersion` en `index.html` (por ejemplo 18.2.0 → 18.3.0).
4. `python3 tools/validar_curriculo.py` hasta ver «✓ Validación correcta».
5. Si el cambio es intencional y bajaron las repeticiones: `python3 tools/validar_curriculo.py --actualizar-linea-base`.
6. Commit y pull request: GitHub Actions vuelve a validar.

## V18.3 – V18.5 (resumen)
- **V18.3**: panel Kinetic y Ruta Anual (`tools/apply_kinetic_v18_3.py`).
- **V18.4**: identidad ABC HUMAN V1.0 (`brand-v18-4.css`).
- **V18.5**: lección guiada en 4 pasos — Aprende, Observa, Comprueba, Practica (`learning-flow-v18-5.js/.css`).

## V18.6 — Cuestionario fiable y reflexión recuperada (Claude)

### Teoría: qué cambió y por qué
- **Las respuestas ya no siguen un patrón.** En V18.5 la correcta estaba siempre en la posición B, B, A: se aprobaba sin leer. Ahora el orden se baraja por ficha (estable al recargar) y la correcta queda en cada posición ≈⅓ de las veces.
- **Distractores reales.** Las opciones incorrectas son textos de *otras* fichas de la misma ruta y de otro dominio (teoría, consignas, criterios del docente), no frases absurdas. Se elimina de cada opción el nombre de la propia ficha para que el título no delate la respuesta, y todas las opciones se recortan igual (por palabra completa, con «…»).
- **Preguntas:** 1) idea de la teoría, 2) consigna de la actividad, 3) qué revisará el docente (en YOUTH, cuyo criterio es genérico, se usa el objetivo). Se quitó «¿Qué habilidad trabajamos?», que ya respondía el título.
- **Reflexión recuperada.** La pregunta propia de cada ficha (`question`) vuelve en el paso Comprueba y se guarda en el mismo campo que antes (`answer`), así que vuelve a aparecer en «Mi Trayectoria».
- **Detalles:** mensajes dentro de la página en lugar de `alert()`; la lección vuelve a «Aprende» al cambiar de semana; se dibuja una sola vez por actualización; pie de página V18.6.
- **Progreso anterior:** los resultados de cuestionario guardados con V18.5 se ignoran (eran otras preguntas); siguen en el respaldo. Las reflexiones y los registros de práctica no cambian.
- Sin cambios en `index.html` ni en el currículo (`curriculumVersion` sigue en 18.2.0).

### Hallazgos de contenido (para revisión pedagógica)
- `safety` es la misma para todas las fichas de una ruta (64 textos para 1.144 fichas): no sirve para preguntas por ficha.
- En YOUTH, `rubric` es genérica («Participa de forma segura en la actividad «…»»).
- El cuestionario sigue siendo **automático**: comprueba lectura, no comprensión profunda. El siguiente paso es un banco de preguntas redactado por dominio.

### Pruebas (Chrome real servido por HTTP, escritorio 1280 px y móvil 390 px)
- 1.144/1.144 fichas con 3 preguntas, sin opciones duplicadas, sin el título en la respuesta correcta; correcta en posición 1/2/3: 1.107 / 1.186 / 1.139 de 3.432.
- Reflexión: guardar, recargar y verla en «Mi Trayectoria». Cuestionario incompleto, 3/3, 0/3, registros V18.5 ignorados, cambio de semana. Sin errores JS ni diálogos.

### Tutorial: publicar
1. Sube `learning-flow-v18-5.js`, `learning-flow-v18-5.css` y `README.md` a `main` (o por pull request).
2. El workflow «Publish ABC BODY guided learning V18.5» se ejecuta, comprueba el JS y no toca `index.html` (ya enlaza estos archivos).
3. Abre la app, entra a Academia → Comprueba y verifica que el pie diga V18.6.

## V18.9 — Panel Familia, sesiones en casa, deporte favorito y progreso tipo juego (Claude)

### Teoría: qué cambió y por qué
- **Panel Familia** (pestaña ♥ Familia): lo que un padre necesita ver en 30 segundos. Muestra las sesiones, los minutos, los días activos y la racha de la semana; un gráfico de minutos de las últimas 6 semanas; qué está aprendiendo y para qué le sirve en su deporte; los logros (incluidas las competencias validadas por un docente, con nombre y fecha); su última reflexión; qué viene y qué material necesita; el reto familiar y tres consejos según la edad. También tiene un botón **Imprimir o guardar PDF**. El correo semanal queda para una versión con servidor.
- **Sesiones de 10–15 minutos**: cada semana se divide en 3 sesiones para hacer en casa (Aprende y prueba · Practica y mejora · Reto de la semana). Cada sesión tiene un temporizador por bloques (calienta 2 min, actividad principal, reto 2 min, vuelta a la calma 1 min), la lista de lo que se necesita (detectada en la ficha: pelota, aro, marcadores…) y la nota de seguridad. La duración es de 10 min para KIDS de 6 a 8 años, 12 min para KIDS de 9 a 12 y 15 min para el resto.
- **Deporte favorito**: fútbol, baloncesto, voleibol, natación, atletismo, artes marciales, tenis, gimnasia, ciclismo o varios. Cada habilidad muestra una frase de cómo sirve en ese deporte (14 categorías × 10 deportes). Se elige en Inicio o en Perfil.
- **Progreso tipo juego**: avatar (8 animales) con nivel y XP, racha de días, habilidades que se desbloquean al completar semanas, 8 insignias nuevas de corto plazo en el Medallero y un reto familiar semanal.
- **Sin avisos de prototipo**: textos de «modo local», «simulada», «de prueba» y «pendiente de validación» reescritos; edades agrupadas por etapa; Convenios ya no muestra logos de organizaciones sin convenio firmado (el campo `signed:true` las vuelve visibles).
- Las semanas con sesiones cuentan como «con actividad» en Inicio y Ruta Anual.

### Herramienta: archivos
- `familia-v18-9.js` / `familia-v18-9.css` (nuevos, enlazados al final de `index.html`).
- `index.html`: solo textos, agrupación de edades y los dos enlaces nuevos. El currículo no cambia (`curriculumVersion` sigue igual, validador en verde).
- `medallero-convenios-v18-8.js`: insignias nuevas mediante `window.ABC9` y Convenios solo confirmados.
- `learning-flow-v18-5.js`: sin aviso de «pendiente de revisión pedagógica».
- Datos nuevos en el mismo perfil local: `s.sessions`, `s.sport`, `s.avatar`, `s.familyDone`. Se incluyen en el respaldo JSON.

### Límites conocidos
- Las fichas están escritas para clase (rondas, compañeros, equipos). La sesión en casa las adapta automáticamente; conviene redactar versiones «en casa» de las actividades principales.
- Las frases por deporte y los retos familiares son una propuesta inicial: revisarlas con un entrenador.
- Todo sigue guardándose en un solo dispositivo: para cobrar hacen falta cuentas y sincronización.

### Tutorial: publicar
1. Sube los archivos de esta versión respetando las rutas, en una rama nueva, y abre un pull request.
2. El workflow «Validar currículo» debe quedar en verde.
3. Después de fusionar, abre la app y recarga sin caché (Ctrl+Shift+R): el pie debe decir V18.9 y debe aparecer la pestaña ♥ Familia.
