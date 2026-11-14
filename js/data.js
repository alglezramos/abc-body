/* ABC BODY — Currículo y datos demo (v0.1)
   Todo el contenido es un borrador para validar con docentes de Educación Física.
   Campo `mep`: alineación con el programa oficial del MEP, pendiente de mapear. */

const DOMAINS = {
  mov:   { name: "Movimiento",                icon: "🏃", color: "#2F80ED" },
  fit:   { name: "Condición física",          icon: "💪", color: "#EB5757" },
  body:  { name: "Cuerpo humano",             icon: "🫀", color: "#9B51E0" },
  fuel:  { name: "Alimentación y recuperación", icon: "🍎", color: "#27AE60" },
  train: { name: "Entrenamiento",             icon: "📈", color: "#F2994A" },
  self:  { name: "Autogestión",               icon: "🧭", color: "#2D9CDB" }
};

const LEVELS = [
  { id: "PL1", name: "Descubrir",   grades: "1°–2°", ages: "6–8",   sfl: "FUNdamentals",
    goal: "Confianza, disfrute y familiaridad con el movimiento." },
  { id: "PL2", name: "Moverse",     grades: "3°–4°", ages: "8–10",  sfl: "FUNdamentals",
    goal: "Dominar habilidades motrices fundamentales." },
  { id: "PL3", name: "Jugar",       grades: "5°–6°", ages: "10–12", sfl: "Learn to Train",
    goal: "Aplicar habilidades en juegos y deportes variados." },
  { id: "PL4", name: "Entrenar",    grades: "7°–8°", ages: "12–14", sfl: "Train to Train / Active for Life",
    goal: "Aprender a entrenar con técnica y seguridad." },
  { id: "PL5", name: "Comprender",  grades: "9°",    ages: "14–15", sfl: "Train to Train / Active for Life",
    goal: "Entender cómo responde el cuerpo al entrenamiento." },
  { id: "PL6", name: "Diseñar",     grades: "10°",   ages: "15–16", sfl: "Active for Life",
    goal: "Diseñar sesiones, semanas y hábitos propios." },
  { id: "PL7", name: "Autonomía",   grades: "11°",   ages: "16–17", sfl: "Active for Life / Train to Compete",
    goal: "Gestionar su actividad física y salud sin depender de otros." }
];

/* Cada unidad: aprende (teoría) + quiz (conocimiento, autoevaluado)
   + práctica (registro) + competencia (validada por docente). */
const UNITS = [
  // ---------- PL1 ----------
  { id: "u01", level: "PL1", domain: "body", title: "Conozco mi cuerpo",
    competency: "Nombra y mueve las principales partes del cuerpo cuando se le pide.",
    lesson: [
      "Tu cuerpo tiene partes que se doblan: se llaman articulaciones. Rodillas, codos, hombros y cadera son algunas.",
      "Cuando juegas, tus músculos mueven tus huesos desde esas articulaciones.",
      "Reto: toca tu rodilla, tu codo y tu hombro lo más rápido que puedas."
    ],
    quiz: [
      { q: "¿Qué parte del cuerpo se dobla cuando te sientas?", options: ["La rodilla", "La nariz", "La oreja"], a: 0 },
      { q: "¿Qué mueve tus huesos?", options: ["El pelo", "Los músculos", "La ropa"], a: 1 },
      { q: "El codo está en…", options: ["La pierna", "El brazo", "La espalda"], a: 1 }
    ],
    practice: "Juega 'Simón dice' en casa nombrando partes del cuerpo (5 min).", mep: "Pendiente" },
  { id: "u02", level: "PL1", domain: "mov", title: "Correr y frenar",
    competency: "Corre con braceo coordinado (brazo contrario a la pierna) y se detiene de forma controlada.",
    lesson: [
      "Al correr, el brazo contrario acompaña a la pierna que va adelante. Eso te da equilibrio.",
      "Para frenar bien: pasos cortos, rodillas un poco dobladas y cuerpo bajo.",
      "Correr y frenar es la base de casi todos los deportes."
    ],
    quiz: [
      { q: "Cuando la pierna derecha va adelante, ¿qué brazo va adelante?", options: ["El derecho", "El izquierdo", "Ninguno"], a: 1 },
      { q: "Para frenar mejor das…", options: ["Pasos largos", "Pasos cortos", "Un salto"], a: 1 },
      { q: "Al frenar, las rodillas van…", options: ["Rectas y rígidas", "Un poco dobladas", "En el suelo"], a: 1 }
    ],
    practice: "Juego de 'semáforo': corre en verde, frena en rojo (10 repeticiones).", mep: "Pendiente" },
  { id: "u03", level: "PL1", domain: "mov", title: "Equilibrio",
    competency: "Se mantiene 10 segundos sobre cada pie sin apoyarse.",
    lesson: [
      "El equilibrio es mantener el cuerpo estable sin caerte.",
      "Mira un punto fijo al frente y aprieta suavemente la barriga: te ayuda a no tambalearte.",
      "Practica con ambos pies; casi siempre uno es más fácil que el otro."
    ],
    quiz: [
      { q: "¿Qué te ayuda a mantener el equilibrio?", options: ["Mirar un punto fijo", "Cerrar los ojos", "Mover la cabeza"], a: 0 },
      { q: "Debes practicar equilibrio con…", options: ["Solo el pie favorito", "Los dos pies", "Las manos"], a: 1 },
      { q: "Equilibrio significa…", options: ["Correr rápido", "Mantenerse estable", "Saltar alto"], a: 1 }
    ],
    practice: "Cepíllate los dientes sobre un pie (cambia de pie a la mitad).", mep: "Pendiente" },

  // ---------- PL2 ----------
  { id: "u04", level: "PL2", domain: "mov", title: "Saltar y aterrizar",
    competency: "Salta con impulso de brazos y aterriza suave con rodillas flexionadas, alineadas con los pies.",
    lesson: [
      "Los brazos ayudan a saltar: llévalos atrás y luego adelante y arriba con fuerza.",
      "Aterrizar bien protege tus rodillas: cae sobre la parte delantera del pie y dobla las rodillas como un resorte.",
      "Las rodillas deben apuntar en la misma dirección que los pies, no hacia adentro."
    ],
    quiz: [
      { q: "Al aterrizar, las rodillas deben…", options: ["Quedarse rectas", "Doblarse como resorte", "Juntarse hacia adentro"], a: 1 },
      { q: "Para saltar más lejos, los brazos…", options: ["Se quedan quietos", "Impulsan adelante y arriba", "Van a los bolsillos"], a: 1 },
      { q: "Un buen aterrizaje suena…", options: ["Fuerte", "Suave", "No importa"], a: 1 }
    ],
    practice: "10 saltos de rana aterrizando en silencio.", mep: "Pendiente" },
  { id: "u05", level: "PL2", domain: "mov", title: "Lanzar y atrapar",
    competency: "Lanza por encima del hombro dando un paso con el pie contrario y atrapa con las manos (no contra el pecho).",
    lesson: [
      "Para lanzar lejos: de lado al objetivo, brazo atrás, paso con el pie contrario al brazo que lanza.",
      "La fuerza nace en las piernas y la cadera, no solo en el brazo.",
      "Para atrapar: manos listas frente al cuerpo, ojos en la bola y 'amortiguar' llevando las manos hacia ti."
    ],
    quiz: [
      { q: "Si lanzas con la mano derecha, das el paso con…", options: ["El pie derecho", "El pie izquierdo", "Ningún pie"], a: 1 },
      { q: "La fuerza del lanzamiento empieza en…", options: ["Los dedos", "Piernas y cadera", "La cabeza"], a: 1 },
      { q: "Para atrapar, tus ojos miran…", options: ["La bola", "Al compañero", "El suelo"], a: 0 }
    ],
    practice: "20 lanzamientos contra una pared, 10 con cada mano.", mep: "Pendiente" },
  { id: "u06", level: "PL2", domain: "body", title: "Mi corazón se acelera",
    competency: "Reconoce y describe cambios en respiración y pulso según la intensidad.",
    lesson: [
      "Cuando te mueves más fuerte, tu corazón late más rápido para llevar oxígeno a los músculos.",
      "Prueba del habla: si puedes hablar pero no cantar, la intensidad es moderada; si casi no puedes hablar, es vigorosa.",
      "Puedes sentir tu pulso en el cuello o en la muñeca."
    ],
    quiz: [
      { q: "¿Por qué late más rápido el corazón al correr?", options: ["Para llevar oxígeno a los músculos", "Porque tiene miedo", "Por el calor solamente"], a: 0 },
      { q: "Si puedes hablar pero no cantar, la intensidad es…", options: ["Ligera", "Moderada", "Vigorosa"], a: 1 },
      { q: "¿Dónde puedes sentir tu pulso?", options: ["En la uña", "En la muñeca", "En el pelo"], a: 1 }
    ],
    practice: "Mide tu pulso 15 s en reposo y después de 1 min de saltos. ¿Qué cambió?", mep: "Pendiente" },

  // ---------- PL3 ----------
  { id: "u07", level: "PL3", domain: "mov", title: "Agilidad y cambios de dirección",
    competency: "Cambia de dirección bajando el centro de gravedad y empujando con el pie exterior.",
    lesson: [
      "Agilidad es cambiar de dirección rápido y con control.",
      "Antes de girar baja la cadera, da pasos cortos y empuja el suelo con el pie del lado contrario a donde vas.",
      "La agilidad se usa en fútbol, baloncesto, tenis y casi cualquier juego."
    ],
    quiz: [
      { q: "Antes de cambiar de dirección conviene…", options: ["Subir la cadera", "Bajar la cadera", "Cerrar los ojos"], a: 1 },
      { q: "Para ir a la izquierda empujas con…", options: ["El pie derecho", "El pie izquierdo", "Las manos"], a: 0 },
      { q: "Los pasos antes del giro deben ser…", options: ["Cortos", "Muy largos", "Saltos"], a: 0 }
    ],
    practice: "Circuito en zigzag con 5 conos (o zapatos), 6 repeticiones.", mep: "Pendiente" },
  { id: "u08", level: "PL3", domain: "fuel", title: "Hidratación",
    competency: "Planifica cuándo y qué beber antes, durante y después de la actividad.",
    lesson: [
      "Tu cuerpo es mayormente agua y la pierdes al sudar, sobre todo en clima caliente.",
      "Para la mayoría de actividades escolares el agua es la mejor bebida. Las bebidas deportivas están pensadas para esfuerzos largos e intensos.",
      "Señales de que te falta agua: sed, boca seca, dolor de cabeza y orina oscura."
    ],
    quiz: [
      { q: "Para una clase de educación física, la mejor bebida suele ser…", options: ["Refresco", "Agua", "Bebida energética"], a: 1 },
      { q: "Una señal de deshidratación es…", options: ["Orina oscura", "Mucha energía", "Manos frías"], a: 0 },
      { q: "Se pierde más agua cuando…", options: ["Hace calor y sudas", "Duermes", "Lees"], a: 0 }
    ],
    practice: "Registra cuánta agua llevaste y tomaste en 3 días con actividad física.", mep: "Pendiente" },
  { id: "u09", level: "PL3", domain: "self", title: "Juego limpio y roles",
    competency: "Participa en juegos asumiendo distintos roles (jugador, árbitro, capitán) con respeto a las reglas.",
    lesson: [
      "En un equipo hay roles distintos y todos importan.",
      "El juego limpio significa respetar reglas, rivales y árbitros, aunque estés perdiendo.",
      "Probar varios deportes y roles te ayuda a descubrir qué disfrutas."
    ],
    quiz: [
      { q: "Juego limpio es…", options: ["Ganar como sea", "Respetar reglas y rivales", "No jugar"], a: 1 },
      { q: "Probar varios deportes a tu edad…", options: ["Es una pérdida de tiempo", "Ayuda a desarrollar habilidades variadas", "Está prohibido"], a: 1 },
      { q: "El árbitro…", options: ["Es parte del juego", "Es el enemigo", "No importa"], a: 0 }
    ],
    practice: "Sé árbitro en un juego de recreo y anota qué fue lo más difícil.", mep: "Pendiente" },

  // ---------- PL4 ----------
  { id: "u10", level: "PL4", domain: "fit", title: "Patrones de fuerza",
    competency: "Ejecuta sentadilla, bisagra de cadera, empuje y tracción con peso corporal y técnica correcta.",
    lesson: [
      "Casi todos los ejercicios de fuerza combinan 4 patrones: sentadilla, bisagra de cadera, empuje y tracción.",
      "Sentadilla: pies al ancho de hombros, pecho arriba, rodillas en la dirección de los pies, baja controlado.",
      "Entrenar fuerza con buena técnica y supervisión es seguro y recomendado para adolescentes."
    ],
    quiz: [
      { q: "En la sentadilla las rodillas deben apuntar…", options: ["Hacia adentro", "En la dirección de los pies", "Hacia afuera al máximo"], a: 1 },
      { q: "Una flexión de pecho es un patrón de…", options: ["Tracción", "Empuje", "Bisagra"], a: 1 },
      { q: "El entrenamiento de fuerza en adolescentes con supervisión…", options: ["Es peligroso siempre", "Es seguro y recomendado", "Detiene el crecimiento"], a: 1 }
    ],
    practice: "3 series de 8 sentadillas, 8 puentes de glúteo y 6 flexiones (en rodillas si hace falta).", mep: "Pendiente" },
  { id: "u11", level: "PL4", domain: "train", title: "Series, repeticiones y descanso",
    competency: "Explica y aplica series, repeticiones y descanso en una sesión guiada.",
    lesson: [
      "Una repetición es un movimiento completo. Una serie es un grupo de repeticiones seguidas.",
      "'3 × 10' significa 3 series de 10 repeticiones.",
      "El descanso entre series permite recuperar: más pesado o intenso = más descanso."
    ],
    quiz: [
      { q: "'4 × 8' significa…", options: ["8 series de 4", "4 series de 8 repeticiones", "48 series"], a: 1 },
      { q: "Si el ejercicio es más intenso, el descanso…", options: ["Es menor", "Es mayor", "No existe"], a: 1 },
      { q: "Una serie es…", options: ["Un movimiento", "Un grupo de repeticiones", "Un día de entrenamiento"], a: 1 }
    ],
    practice: "Anota una sesión: ejercicios, series, repeticiones y descanso.", mep: "Pendiente" },
  { id: "u12", level: "PL4", domain: "train", title: "Escala de esfuerzo (RPE)",
    competency: "Califica su esfuerzo con una escala de 1 a 10 de forma coherente con lo observado.",
    lesson: [
      "El RPE (esfuerzo percibido) va de 1 (muy fácil) a 10 (máximo esfuerzo posible).",
      "Un RPE de 7–8 significa que es difícil pero podrías hacer 2–3 repeticiones más.",
      "Usar el RPE te permite ajustar el entrenamiento a cómo estás ese día."
    ],
    quiz: [
      { q: "RPE 10 significa…", options: ["Muy fácil", "Esfuerzo máximo", "Descanso"], a: 1 },
      { q: "RPE 7–8 indica que podrías hacer…", options: ["0 repeticiones más", "2–3 repeticiones más", "20 repeticiones más"], a: 1 },
      { q: "El RPE sirve para…", options: ["Ajustar el entrenamiento al día", "Competir con otros", "Medir la estatura"], a: 0 }
    ],
    practice: "Registra el RPE de 3 sesiones distintas de la semana.", mep: "Pendiente" },
  { id: "u13", level: "PL4", domain: "fuel", title: "El plato saludable",
    competency: "Arma un plato equilibrado con verduras, proteína, carbohidratos y agua.",
    lesson: [
      "Un plato equilibrado incluye verduras y frutas, una fuente de proteína (frijoles, huevo, pollo, pescado) y carbohidratos (arroz, tortilla, papa).",
      "Los carbohidratos son la principal fuente de energía para moverte.",
      "Aquí aprendemos principios generales. Los planes de alimentación personalizados los hace un profesional en nutrición."
    ],
    quiz: [
      { q: "La principal fuente de energía para el ejercicio es…", options: ["Los carbohidratos", "El agua", "Las vitaminas"], a: 0 },
      { q: "Una fuente de proteína es…", options: ["Frijoles", "Refresco", "Galletas"], a: 0 },
      { q: "¿Quién diseña un plan de alimentación personalizado?", options: ["Un influencer", "Un profesional en nutrición", "Un amigo"], a: 1 }
    ],
    practice: "Toma foto (o dibuja) un almuerzo y clasifica sus grupos de alimentos.", mep: "Pendiente" },

  // ---------- PL5 ----------
  { id: "u14", level: "PL5", domain: "body", title: "Sistemas de energía",
    competency: "Distingue esfuerzos aeróbicos y anaeróbicos y da ejemplos en su deporte.",
    lesson: [
      "Esfuerzos largos y moderados (trotar 30 min) usan principalmente el sistema aeróbico, que necesita oxígeno.",
      "Esfuerzos cortos y máximos (un sprint de 10 s) dependen sobre todo de sistemas anaeróbicos.",
      "La mayoría de deportes de equipo combinan ambos."
    ],
    quiz: [
      { q: "Un sprint de 10 segundos es principalmente…", options: ["Aeróbico", "Anaeróbico", "Ninguno"], a: 1 },
      { q: "El sistema aeróbico necesita…", options: ["Oxígeno", "Azúcar únicamente", "Frío"], a: 0 },
      { q: "El fútbol usa…", options: ["Solo aeróbico", "Solo anaeróbico", "Ambos"], a: 2 }
    ],
    practice: "Clasifica 5 acciones de tu deporte favorito en aeróbicas o anaeróbicas.", mep: "Pendiente" },
  { id: "u15", level: "PL5", domain: "train", title: "Principios del entrenamiento",
    competency: "Explica sobrecarga progresiva, especificidad y recuperación con ejemplos propios.",
    lesson: [
      "Sobrecarga progresiva: para mejorar hay que aumentar poco a poco la exigencia (peso, repeticiones, tiempo).",
      "Especificidad: mejoras en lo que entrenas. Para correr mejor, hay que correr.",
      "Recuperación: el cuerpo se adapta mientras descansa, no solo mientras entrena."
    ],
    quiz: [
      { q: "Aumentar poco a poco la exigencia es…", options: ["Especificidad", "Sobrecarga progresiva", "Descanso"], a: 1 },
      { q: "Para nadar mejor, el principio de especificidad dice que…", options: ["Debes nadar", "Debes correr", "No importa"], a: 0 },
      { q: "El cuerpo se adapta principalmente…", options: ["Durante el descanso", "Solo entrenando", "Comiendo dulces"], a: 0 }
    ],
    practice: "Escribe cómo aplicarías sobrecarga progresiva a 4 semanas de sentadillas.", mep: "Pendiente" },
  { id: "u16", level: "PL5", domain: "fuel", title: "Sueño y recuperación",
    competency: "Analiza su propio patrón de sueño y propone un ajuste realista.",
    lesson: [
      "Durante el sueño el cuerpo repara tejidos y consolida lo aprendido, incluyendo habilidades motrices.",
      "Para adolescentes de 13 a 18 años se recomiendan de 8 a 10 horas por noche.",
      "Pantallas brillantes justo antes de dormir pueden retrasar el sueño."
    ],
    quiz: [
      { q: "Horas recomendadas para adolescentes (13–18):", options: ["5–6", "8–10", "12–14"], a: 1 },
      { q: "Durante el sueño el cuerpo…", options: ["Se repara", "No hace nada", "Pierde músculo siempre"], a: 0 },
      { q: "Algo que puede retrasar el sueño es…", options: ["Leer un libro en papel", "Pantallas antes de dormir", "Una cama cómoda"], a: 1 }
    ],
    practice: "Registra tus horas de sueño durante 7 días.", mep: "Pendiente" },
  { id: "u17", level: "PL5", domain: "body", title: "Dolor, molestia y señales de alerta",
    competency: "Diferencia fatiga muscular normal de señales de alerta y sabe cuándo detenerse y avisar.",
    lesson: [
      "Sentir los músculos cansados o adoloridos 1–2 días después de un entrenamiento nuevo es normal.",
      "Detente y avisa a un adulto o profesional si sientes dolor agudo, en una articulación, mareo, dolor en el pecho o falta de aire desproporcionada.",
      "Entrenar con dolor agudo no es valentía: aumenta el riesgo de lesión."
    ],
    quiz: [
      { q: "Músculos adoloridos 1–2 días después de un ejercicio nuevo suele ser…", options: ["Normal", "Una emergencia", "Una fractura"], a: 0 },
      { q: "Dolor en el pecho durante el ejercicio significa…", options: ["Seguir más fuerte", "Detenerse y avisar", "Tomar un refresco"], a: 1 },
      { q: "Entrenar con dolor agudo…", options: ["Aumenta el riesgo de lesión", "Te hace más fuerte", "No pasa nada"], a: 0 }
    ],
    practice: "Escribe tu plan: ¿a quién avisas y qué haces si aparece una señal de alerta?", mep: "Pendiente" },

  // ---------- PL6 ----------
  { id: "u18", level: "PL6", domain: "train", title: "Diseña una sesión",
    competency: "Diseña y dirige una sesión de 45 min con calentamiento, parte principal y vuelta a la calma.",
    lesson: [
      "Una sesión tiene 3 partes: calentamiento (aumentar temperatura y preparar movimientos), parte principal (el objetivo del día) y vuelta a la calma.",
      "El calentamiento debe parecerse a lo que vas a hacer después.",
      "Define un objetivo por sesión: fuerza, resistencia, técnica o juego."
    ],
    quiz: [
      { q: "¿Cuál es el orden correcto?", options: ["Principal → calentamiento → calma", "Calentamiento → principal → vuelta a la calma", "Calma → principal"], a: 1 },
      { q: "Un buen calentamiento…", options: ["Se parece a la actividad principal", "Es siempre igual", "Se puede omitir"], a: 0 },
      { q: "Cada sesión debería tener…", options: ["Un objetivo claro", "Todos los objetivos", "Ningún objetivo"], a: 0 }
    ],
    practice: "Diseña una sesión y dirígela a 3 compañeros.", mep: "Pendiente" },
  { id: "u19", level: "PL6", domain: "self", title: "Mi semana activa",
    competency: "Construye una semana que cumple las recomendaciones de la OMS para su edad.",
    lesson: [
      "La OMS recomienda para personas de 5 a 17 años un promedio de 60 minutos diarios de actividad física moderada a vigorosa.",
      "Además, actividades vigorosas y de fortalecimiento muscular y óseo al menos 3 días por semana.",
      "También recomienda limitar el tiempo sedentario, sobre todo frente a pantallas recreativas."
    ],
    quiz: [
      { q: "Recomendación OMS (5–17 años):", options: ["60 min diarios en promedio", "60 min por semana", "10 min al día"], a: 0 },
      { q: "Fortalecimiento muscular y óseo, al menos…", options: ["1 día al mes", "3 días por semana", "Nunca"], a: 1 },
      { q: "La OMS también recomienda…", options: ["Limitar el tiempo sedentario", "Más pantallas", "Dormir menos"], a: 0 }
    ],
    practice: "Arma tu semana ideal (horario, actividades, intensidad) y cúmplela.", mep: "Pendiente" },
  { id: "u20", level: "PL6", domain: "self", title: "Metas SMART",
    competency: "Formula una meta específica, medible, alcanzable, relevante y con plazo, y la sigue.",
    lesson: [
      "Una meta SMART es Específica, Medible, Alcanzable, Relevante y con Tiempo definido.",
      "'Ponerme en forma' no es SMART. 'Correr 5 km sin parar en 10 semanas' sí lo es.",
      "Las metas de proceso (entrenar 3 veces por semana) se controlan mejor que las de resultado."
    ],
    quiz: [
      { q: "¿Cuál es una meta SMART?", options: ["Estar fit", "Correr 5 km sin parar en 10 semanas", "Ser el mejor"], a: 1 },
      { q: "La 'M' de SMART significa…", options: ["Motivadora", "Medible", "Mágica"], a: 1 },
      { q: "'Entrenar 3 veces por semana' es una meta de…", options: ["Proceso", "Resultado", "Suerte"], a: 0 }
    ],
    practice: "Escribe una meta SMART y registra tu avance semanal.", mep: "Pendiente" },

  // ---------- PL7 ----------
  { id: "u21", level: "PL7", domain: "train", title: "Planificación por bloques",
    competency: "Organiza un plan de 8 semanas con progresión y semana de descarga.",
    lesson: [
      "Un mesociclo es un bloque de varias semanas (por ejemplo 4) con un objetivo.",
      "Dentro del bloque la carga aumenta de forma progresiva y luego se reduce en una semana de descarga para recuperar.",
      "Planificar por bloques evita estancarse y reduce el riesgo de sobrecarga."
    ],
    quiz: [
      { q: "Un mesociclo es…", options: ["Una repetición", "Un bloque de varias semanas", "Un año"], a: 1 },
      { q: "La semana de descarga sirve para…", options: ["Recuperar", "Entrenar el doble", "Competir"], a: 0 },
      { q: "Planificar por bloques ayuda a…", options: ["Evitar estancarse", "Lesionarse", "Nada"], a: 0 }
    ],
    practice: "Dibuja tu plan de 8 semanas indicando carga y descarga.", mep: "Pendiente" },
  { id: "u22", level: "PL7", domain: "self", title: "Evalúa tu progreso",
    competency: "Selecciona pruebas adecuadas, las aplica antes y después y ajusta su plan con los resultados.",
    lesson: [
      "Para saber si un plan funciona, mide antes y después con la misma prueba y condiciones.",
      "Ejemplos: salto horizontal, flexiones en 1 min, tiempo en 2,4 km, sentadillas con técnica.",
      "Si no mejoras, revisa: ¿frecuencia?, ¿progresión?, ¿sueño?, ¿alimentación?"
    ],
    quiz: [
      { q: "Para comparar resultados debes usar…", options: ["Pruebas distintas cada vez", "La misma prueba y condiciones", "Tu memoria"], a: 1 },
      { q: "Si no mejoras, lo primero es…", options: ["Revisar tu plan y hábitos", "Abandonar", "Entrenar con dolor"], a: 0 },
      { q: "Un ejemplo de prueba es…", options: ["Salto horizontal", "Contar pasos al dormir", "Ver videos"], a: 0 }
    ],
    practice: "Aplica 3 pruebas hoy y repítelas en 8 semanas.", mep: "Pendiente" },
  { id: "u23", level: "PL7", domain: "self", title: "Proyecto Self-Coach",
    competency: "Diseña, ejecuta y defiende su propio plan de 8 semanas (actividad, hábitos y evaluación).",
    lesson: [
      "Este es el proyecto final: demuestra que puedes entrenarte de forma autónoma.",
      "Incluye: meta SMART, pruebas iniciales, plan de 8 semanas, sesiones, hábitos de sueño e hidratación, y evaluación final.",
      "Lo defiendes ante tu docente explicando por qué elegiste cada cosa."
    ],
    quiz: [
      { q: "El proyecto Self-Coach demuestra…", options: ["Autonomía para entrenar", "Que eres atleta profesional", "Que eres nutricionista"], a: 0 },
      { q: "El plan debe incluir…", options: ["Solo ejercicios", "Meta, pruebas, plan, hábitos y evaluación", "Una dieta estricta"], a: 1 },
      { q: "La defensa consiste en…", options: ["Explicar el porqué de tus decisiones", "Copiar un plan de internet", "Nada"], a: 0 }
    ],
    practice: "Entrega tu plan y registra las 8 semanas.", mep: "Pendiente" },
  { id: "u24", level: "PL7", domain: "train", title: "Ruta de alto rendimiento (opcional)",
    competency: "Comprende las etapas del desarrollo del atleta y construye su perfil deportivo documentado.",
    lesson: [
      "El modelo de desarrollo a largo plazo describe etapas como Aprender a entrenar, Entrenar para entrenar, Entrenar para competir y Entrenar para ganar.",
      "Especializarse demasiado temprano en un solo deporte aumenta riesgos de lesión y abandono; la base amplia ayuda.",
      "Un perfil deportivo documentado (pruebas, competencias, trayectoria) es lo que revisan quienes buscan talento."
    ],
    quiz: [
      { q: "Especializarse muy temprano en un solo deporte…", options: ["Siempre es mejor", "Aumenta riesgo de lesión y abandono", "Es obligatorio"], a: 1 },
      { q: "Una etapa del desarrollo del atleta es…", options: ["Entrenar para competir", "Entrenar sin dormir", "Competir sin entrenar"], a: 0 },
      { q: "Un perfil deportivo incluye…", options: ["Pruebas y trayectoria verificables", "Solo fotos", "Likes en redes"], a: 0 }
    ],
    practice: "Completa tu perfil deportivo con tus pruebas y competencias.", mep: "Pendiente", optional: true }
];

const STATES = [
  { id: 0, name: "Sin evaluar",   short: "—",  color: "#E0E0E0" },
  { id: 1, name: "Inicial",       short: "I",  color: "#F2C94C" },
  { id: 2, name: "En desarrollo", short: "D",  color: "#F2994A" },
  { id: 3, name: "Competente",    short: "C",  color: "#6FCF97" },
  { id: 4, name: "Consolidada",   short: "✓",  color: "#219653" }
];

/* Criterio interno provisional del sello (no validado). */
const SEAL_RULES = [
  { name: "Oro",    min: 85, color: "#D4A017" },
  { name: "Plata",  min: 70, color: "#9EA7AD" },
  { name: "Bronce", min: 50, color: "#B87333" }
];

const SCHOOL = { name: "Colegio Demo San José", grades: ["1°", "2°", "3°", "4°", "5°", "6°", "7°", "8°", "9°", "10°", "11°"] };

const GRADE_LEVEL = { "1°": "PL1", "2°": "PL1", "3°": "PL2", "4°": "PL2", "5°": "PL3", "6°": "PL3",
  "7°": "PL4", "8°": "PL4", "9°": "PL5", "10°": "PL6", "11°": "PL7" };

/* Estudiantes ficticios de demostración */
const DEMO_GROUPS = {
  "7°A": ["Sofía Rojas", "Mateo Vargas", "Valeria Mora", "Sebastián Jiménez", "Camila Solano", "Diego Araya",
          "Isabella Chaves", "Daniel Quesada", "Mariana Castro", "Gabriel Brenes", "Lucía Alfaro", "Andrés Herrera"],
  "11°A": ["Natalia Ugalde", "José Pablo Monge", "Fernanda Salas", "Emiliano Cordero", "Paula Navarro",
           "Tomás Méndez", "Ariana Esquivel", "Felipe Calderón"]
};
