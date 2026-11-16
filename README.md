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
