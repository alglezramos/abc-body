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
