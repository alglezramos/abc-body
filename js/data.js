/* ABC BODY — Currículo 1°–11° alineado al programa oficial de Educación Física del MEP (v0.2)
   Fuentes MEP:
   - I y II Ciclos: Programa de Estudio de Educación Física (Consejo Superior de Educación, 2013),
     según la priorización publicada por la Dirección de Desarrollo Curricular del MEP.
   - III Ciclo y Educación Diversificada: Programa de Estudio de Educación Física,
     "Ética, Estética y Ciudadanía" (CSE, acuerdo 02-40-10; rige desde 2011).
   Cada unidad conserva el título oficial del MEP y le suma la "capa ABC BODY":
   competencia observable, lección corta, quiz, práctica registrada y área de alfabetización física.
   Contenido en borrador: debe validarse con docentes de Educación Física colegiados. */

const SOURCES = [
  { name: "MEP · Programa de Educación Física I y II Ciclos (2013)",
    url: "https://ddc.mep.go.cr/sites/all/files/ddc_mep_go_cr/archivos/educacion_fisica.pdf" },
  { name: "MEP · Programa de Educación Física III Ciclo y Educación Diversificada (rige 2011)",
    url: "https://www.mep.go.cr/sites/default/files/media/educfisica3cicloydiversificada.pdf" },
  { name: "MEP · Cartel de alcance y secuencia, Educación Física I y II Ciclos",
    url: "https://ddc.mep.go.cr/sites/all/files/ddc_mep_go_cr/adjuntos/educacion_fisica-cartel_de_alcance_y_secuencia.pdf" }
];

const DOMAINS = {
  mov:   { name: "Movimiento",                  icon: "🏃", color: "#2F80ED" },
  fit:   { name: "Condición física",            icon: "💪", color: "#EB5757" },
  body:  { name: "Cuerpo humano",               icon: "🫀", color: "#9B51E0" },
  fuel:  { name: "Alimentación y recuperación", icon: "🍎", color: "#27AE60" },
  train: { name: "Entrenamiento",               icon: "📈", color: "#F2994A" },
  self:  { name: "Autogestión y liderazgo",     icon: "🧭", color: "#2D9CDB" },
  sport: { name: "Juego y deporte",             icon: "⚽", color: "#16A085" }
};

const GRADES = ["1°", "2°", "3°", "4°", "5°", "6°", "7°", "8°", "9°", "10°", "11°"];

const LEVELS = [
  { id: "PL1", name: "Descubrir",  grades: ["1°", "2°"], ages: "6–8",   cycle: "I Ciclo",
    goal: "Conocer el cuerpo y disfrutar el movimiento." },
  { id: "PL2", name: "Moverse",    grades: ["3°", "4°"], ages: "8–10",  cycle: "I–II Ciclo",
    goal: "Dominar habilidades motrices fundamentales en el juego." },
  { id: "PL3", name: "Jugar",      grades: ["5°", "6°"], ages: "10–12", cycle: "II Ciclo",
    goal: "Aplicar habilidades en juegos predeportivos y entender la salud." },
  { id: "PL4", name: "Entrenar",   grades: ["7°", "8°"], ages: "12–14", cycle: "III Ciclo",
    goal: "Aprender a entrenar con técnica y seguridad." },
  { id: "PL5", name: "Comprender", grades: ["9°"],       ages: "14–15", cycle: "III Ciclo",
    goal: "Entender los principios del entrenamiento y prevenir lesiones." },
  { id: "PL6", name: "Diseñar",    grades: ["10°"],      ages: "15–16", cycle: "Diversificada",
    goal: "Promover la salud y diseñar desafíos para otros." },
  { id: "PL7", name: "Autonomía",  grades: ["11°"],      ages: "16–17", cycle: "Diversificada",
    goal: "Gestionar su salud y la de su comunidad de forma autónoma." }
];

const GRADE_LEVEL = {};
LEVELS.forEach(L => L.grades.forEach(g => { GRADE_LEVEL[g] = L.id; }));

/* q(pregunta, [opciones], índice correcto) */
function q(text, options, a) { return { q: text, options, a }; }

const UNITS = [
  /* ===================== 1° AÑO · PL1 ===================== */
  { id: "g1t1", grade: "1°", tri: 1, domain: "body",
    mep: "Conociendo mi cuerpo",
    mepContents: "El cuerpo y sus acciones (flexión, extensión, torsión); espacio propio y general; formaciones grupales; reglas de seguridad.",
    competency: "Flexiona, extiende y gira partes del cuerpo cuando se le indica, y se mueve en el espacio general sin chocar.",
    lesson: [
      "Tu cuerpo puede doblarse (flexión), estirarse (extensión) y girar (torsión).",
      "El espacio propio es la burbuja alrededor de tu cuerpo. El espacio general es todo el lugar donde jugamos.",
      "Para jugar seguros nos movemos mirando y sin chocar con nadie."
    ],
    quiz: [
      q("Doblar el brazo es una…", ["Flexión", "Extensión", "Torsión"], 0),
      q("El espacio propio es…", ["Toda la cancha", "La burbuja alrededor de mi cuerpo", "El aula"], 1),
      q("Para no chocar debo…", ["Correr con los ojos cerrados", "Mirar a dónde voy", "Empujar"], 1)
    ],
    practice: "Juego de estatuas en casa: dobla, estira y gira cuando alguien lo diga (5 min).",
    abc: "Vocabulario corporal básico que se usará en todos los niveles." },

  { id: "g1t2", grade: "1°", tri: 2, domain: "mov",
    mep: "Cómo se mueve mi cuerpo",
    mepContents: "Partes del cuerpo (cabeza, tronco, extremidades) y sus funciones; direcciones y niveles; respuesta a estímulos auditivos.",
    competency: "Se desplaza en distintas direcciones (adelante, atrás, lados) y niveles (alto, medio, bajo) respondiendo a señales sonoras.",
    lesson: [
      "Mi cuerpo tiene cabeza, tronco y extremidades (brazos y piernas).",
      "Puedo moverme adelante, atrás y a los lados, y en nivel alto (de puntillas), medio o bajo (cerca del suelo).",
      "Cuando escucho una señal (silbato, aplauso) cambio rápido mi movimiento."
    ],
    quiz: [
      q("Las piernas y los brazos son…", ["El tronco", "Las extremidades", "La cabeza"], 1),
      q("Moverme cerca del suelo es nivel…", ["Alto", "Medio", "Bajo"], 2),
      q("Si suena el silbato, yo…", ["Lo ignoro", "Cambio mi movimiento", "Me voy"], 1)
    ],
    practice: "Con música: cuando pare, cambia de dirección o de nivel (10 veces).",
    abc: "Primer contacto con respuesta a estímulos (base de agilidad)." },

  { id: "g1t3", grade: "1°", tri: 3, domain: "mov",
    mep: "Disfrutando del Movimiento",
    mepContents: "Patrones locomotores (correr, saltar, rodar…), manipulativos (lanzar, golpear, rebotar) y no locomotores (girar, empujar, halar).",
    competency: "Corre, salta, lanza y gira con control, distinguiendo movimientos locomotores, manipulativos y no locomotores.",
    lesson: [
      "Locomotores: me llevan de un lugar a otro (correr, saltar, galopar, rodar).",
      "Manipulativos: uso un objeto (lanzar, rebotar, golpear, atrapar).",
      "No locomotores: me muevo sin cambiar de lugar (girar, empujar, halar, estirarme)."
    ],
    quiz: [
      q("Correr es un movimiento…", ["Locomotor", "Manipulativo", "No locomotor"], 0),
      q("Lanzar una bola es…", ["Locomotor", "Manipulativo", "No locomotor"], 1),
      q("Girar en mi lugar es…", ["Locomotor", "Manipulativo", "No locomotor"], 2)
    ],
    practice: "Circuito en casa: corre, lanza una bola de papel a una caja y gira 3 veces.",
    abc: "Clasificación de patrones que guía la evaluación motriz de todo el programa." },

  /* ===================== 2° AÑO · PL1 ===================== */
  { id: "g2t1", grade: "2°", tri: 1, domain: "mov",
    mep: "¡Moviéndome! Gimnasia y actividades complementarias I",
    mepContents: "Actividad física, salud y tiempo libre; imitación de animales; rodar hacia atrás; equilibrio con apoyos; judo: caídas (ukemi), desplazamientos (tai sabaki), desequilibrios (kuzushi).",
    competency: "Mantiene equilibrios con distintos apoyos y realiza una caída segura hacia atrás (ukemi) con el mentón al pecho.",
    lesson: [
      "Con más apoyos (manos, pies, rodillas) el equilibrio es más fácil; con menos, es un reto.",
      "Para caer seguro hacia atrás: mentón al pecho, espalda redonda y palmadas al suelo con los brazos.",
      "En judo las caídas se llaman ukemi y protegen la cabeza."
    ],
    quiz: [
      q("¿Qué equilibrio es más fácil?", ["Con 3 apoyos", "Con 1 apoyo", "Con 0 apoyos"], 0),
      q("Al caer hacia atrás, el mentón va…", ["Hacia arriba", "Al pecho", "A un lado"], 1),
      q("En judo, las caídas seguras se llaman…", ["Ukemi", "Gol", "Sprint"], 0)
    ],
    practice: "Sobre un colchón o cama: 5 caídas suaves hacia atrás con mentón al pecho, con un adulto presente.",
    abc: "Seguridad al caer: competencia de autoprotección para toda la vida." },

  { id: "g2t2", grade: "2°", tri: 2, domain: "mov",
    mep: "¡Moviéndome! Gimnasia y actividades complementarias II",
    mepContents: "Desplazamientos en direcciones y niveles; rodar hacia adelante; parada de cabeza; caídas laterales y hacia atrás; judo.",
    competency: "Realiza el rol hacia adelante con mentón al pecho y apoyo de manos, y caídas laterales seguras.",
    lesson: [
      "Rol hacia adelante: manos en el suelo, mentón al pecho, espalda redonda como una bola y rodar.",
      "En la caída lateral, el brazo de ese lado palmea el suelo para amortiguar.",
      "Los ejercicios de gimnasia se hacen en colchonetas y con la guía del docente."
    ],
    quiz: [
      q("En el rol hacia adelante la espalda va…", ["Recta como tabla", "Redonda como bola", "Arqueada"], 1),
      q("En una caída lateral, el brazo…", ["Palmea el suelo", "Queda debajo del cuerpo", "Se esconde"], 0),
      q("La gimnasia se practica…", ["Sobre colchoneta con guía", "En las gradas", "Sin docente"], 0)
    ],
    practice: "Practica la posición de 'bolita' (mentón al pecho, rodillas al pecho) y mécete 10 veces.",
    abc: "Conciencia de la posición de la cabeza y la columna." },

  { id: "g2t3", grade: "2°", tri: 3, domain: "mov",
    mep: "¡Moviéndome! Gimnasia y actividades complementarias III",
    mepContents: "Desplazamientos con objetos (conos, aros, bancas, vigas); rueda de carreta; el puente; movimientos con distintos ritmos; caídas hacia adelante.",
    competency: "Se desplaza sobre una banca o viga baja con control y combina movimientos siguiendo distintos ritmos.",
    lesson: [
      "Para caminar sobre una viga: brazos abiertos, mirada al frente y pasos cortos.",
      "Un ritmo puede ser lento, medio o rápido: tu cuerpo puede seguirlo.",
      "La rueda de carreta y el puente necesitan fuerza en los brazos y control del cuerpo."
    ],
    quiz: [
      q("En la viga, la mirada va…", ["A los pies", "Al frente", "Al cielo"], 1),
      q("Los brazos abiertos ayudan a…", ["Mantener el equilibrio", "Ir más lento", "Nada"], 0),
      q("Un ritmo puede ser…", ["Lento o rápido", "Solo rápido", "Solo lento"], 0)
    ],
    practice: "Camina sobre una línea en el piso de ida y vuelta 5 veces, primero lento y luego rápido.",
    abc: "Equilibrio dinámico: predictor de autonomía motriz." },

  /* ===================== 3° AÑO · PL2 ===================== */
  { id: "g3t1", grade: "3°", tri: 1, domain: "sport",
    mep: "A divertirme y aprender jugando",
    mepContents: "Relación entre juego y salud; espacio propio y general; juegos que combinan movimientos locomotores y no locomotores; coordinación visomotora.",
    competency: "Combina movimientos locomotores y no locomotores en juegos y coordina ojo-mano al atrapar y lanzar.",
    lesson: [
      "Jugar activo hace que tu corazón y tus pulmones trabajen más fuerte: eso fortalece tu salud.",
      "Coordinación ojo-mano: los ojos siguen el objeto y las manos se preparan antes de que llegue.",
      "Muchos juegos mezclan correr (locomotor) con girar o agacharse (no locomotor)."
    ],
    quiz: [
      q("Al atrapar, los ojos miran…", ["El objeto", "Al suelo", "A otro lado"], 0),
      q("Jugar activo hace que el corazón…", ["Se detenga", "Trabaje más fuerte", "No cambie"], 1),
      q("'Correr y luego agacharse' combina…", ["Dos movimientos locomotores", "Locomotor y no locomotor", "Ningún movimiento"], 1)
    ],
    practice: "Lanza una bola contra la pared y atrápala 20 veces sin que caiga.",
    abc: "Introduce la relación movimiento–corazón (alfabetización en salud)." },

  { id: "g3t2", grade: "3°", tri: 2, domain: "mov",
    mep: "A jugar utilizando la música",
    mepContents: "Juegos con actividades manipulativas; coordinación auditivo-motriz con música y percepción táctil; dominio de direcciones.",
    competency: "Sigue el ritmo de la música con desplazamientos y manipulación de objetos (bola, aro o cuerda).",
    lesson: [
      "La música tiene un pulso: puedes marcarlo con pasos, palmadas o rebotes de bola.",
      "Coordinación auditivo-motriz: escuchar y mover el cuerpo al mismo tiempo.",
      "Moverse con música es una forma divertida de hacer ejercicio."
    ],
    quiz: [
      q("El pulso de la música se puede marcar con…", ["Pasos o palmadas", "Silencio", "Durmiendo"], 0),
      q("Escuchar y moverse a la vez es coordinación…", ["Auditivo-motriz", "Visual", "Ninguna"], 0),
      q("Bailar o moverse con música es…", ["Ejercicio", "Descanso", "Tarea"], 0)
    ],
    practice: "Escoge una canción y rebota una bola siguiendo el ritmo durante toda la canción.",
    abc: "Ritmo como base para coordinación y para el baile como ejercicio (7°)." },

  { id: "g3t3", grade: "3°", tri: 3, domain: "body",
    mep: "El juego en mi vida",
    mepContents: "Juegos con distintos patrones de movimiento; propiocepción (equilibrio estático y dinámico); combinación de actividades.",
    competency: "Mantiene el equilibrio estático (10 s en un pie, cada lado) y dinámico (desplazándose sobre una línea) en juegos.",
    lesson: [
      "Equilibrio estático: quieto sin caerte. Equilibrio dinámico: moviéndote sin perder el control.",
      "Tu cuerpo 'siente' dónde están tus partes aunque no las mires: eso se llama propiocepción.",
      "Practica con los dos pies; casi siempre uno es más fácil."
    ],
    quiz: [
      q("Estar quieto en un pie es equilibrio…", ["Estático", "Dinámico", "Rápido"], 0),
      q("Sentir dónde está tu cuerpo sin mirar es…", ["Propiocepción", "Velocidad", "Fuerza"], 0),
      q("Debo practicar equilibrio con…", ["Solo el pie favorito", "Los dos pies", "Las manos"], 1)
    ],
    practice: "Cepíllate los dientes sobre un pie (cambia de pie a la mitad).",
    abc: "Prueba de equilibrio a 1 pie usada como indicador del pasaporte." },

  /* ===================== 4° AÑO · PL2 ===================== */
  { id: "g4t1", grade: "4°", tri: 1, domain: "fit",
    mep: "Aprovechando mi tiempo libre jugando I",
    mepContents: "Recreación y su importancia para la salud; formas de diversión positivas y negativas; juegos predeportivos de trote y carrera (atletismo, gimnasia).",
    competency: "Trota y corre con braceo coordinado, regula su intensidad con la prueba del habla y explica qué es la recreación.",
    lesson: [
      "Recreación: actividades libres y agradables en el tiempo libre. Moverse es una recreación positiva.",
      "Prueba del habla: si puedes hablar pero no cantar, la intensidad es moderada; si casi no puedes hablar, es vigorosa.",
      "Al correr, el brazo contrario acompaña a la pierna que va adelante."
    ],
    quiz: [
      q("Si puedes hablar pero no cantar, la intensidad es…", ["Ligera", "Moderada", "Vigorosa"], 1),
      q("Una recreación positiva es…", ["Jugar al aire libre", "Pasar 5 horas en pantallas", "No moverse"], 0),
      q("Con la pierna derecha adelante, va adelante el brazo…", ["Derecho", "Izquierdo", "Ninguno"], 1)
    ],
    practice: "Trota 10 minutos a intensidad moderada usando la prueba del habla.",
    abc: "Autorregulación de la intensidad: primera herramienta de autogestión." },

  { id: "g4t2", grade: "4°", tri: 2, domain: "sport",
    mep: "Aprovechando mi tiempo libre jugando II",
    mepContents: "Concepto de deporte y su importancia para la salud; predeportivos con balones usando las extremidades inferiores (fútbol, fútbol sala, fútbol playa).",
    competency: "Conduce, pasa y recibe un balón con los pies en juegos predeportivos, respetando reglas y juego limpio.",
    lesson: [
      "El deporte es actividad física con reglas e instituciones; jugarlo con frecuencia ayuda a la salud.",
      "Para pasar con precisión usa el borde interno del pie y mira a tu compañero.",
      "Para recibir, 'amortigua': el pie cede un poco al contacto con el balón."
    ],
    quiz: [
      q("Para un pase preciso se usa…", ["La punta del pie", "El borde interno del pie", "El talón"], 1),
      q("Recibir 'amortiguando' significa…", ["Patear fuerte", "Ceder un poco con el pie", "Saltar"], 1),
      q("El juego limpio es…", ["Ganar como sea", "Respetar reglas y rivales", "No jugar"], 1)
    ],
    practice: "Pases contra una pared: 20 con cada pie.",
    abc: "Juego limpio como valor medible (rúbrica actitudinal)." },

  { id: "g4t3", grade: "4°", tri: 3, domain: "sport",
    mep: "Aprovechando mi tiempo libre jugando III",
    mepContents: "Juegos tradicionales; predeportivos de coordinación con balones usando una y dos manos (baloncesto y afines).",
    competency: "Bota, pasa y recibe con una y dos manos, y enseña un juego tradicional a sus compañeros.",
    lesson: [
      "Para botar: empuja el balón con las yemas de los dedos, no con la palma, y mira al frente.",
      "Pase de pecho: dos manos, pulgares hacia abajo al soltar, paso hacia el compañero.",
      "Los juegos tradicionales (quedó, escondido, rayuela) son parte de nuestra cultura."
    ],
    quiz: [
      q("Al botar el balón uso…", ["Las yemas de los dedos", "El puño", "El codo"], 0),
      q("Mientras boto, la mirada va…", ["Al balón siempre", "Al frente", "Al suelo"], 1),
      q("Un juego tradicional costarricense es…", ["Quedó", "Videojuego", "Ninguno"], 0)
    ],
    practice: "Pregunta a un adulto qué juego tradicional jugaba y enséñalo en clase.",
    abc: "Identidad cultural y transmisión de juegos entre generaciones." },

  /* ===================== 5° AÑO · PL3 ===================== */
  { id: "g5t1", grade: "5°", tri: 1, domain: "fit",
    mep: "Ejercitándome por medio del juego I",
    mepContents: "Recreación deportiva; predeportivos que desarrollan fuerza de brazos al lanzar; acondicionamiento físico general con música (atletismo, gimnasia formativa).",
    competency: "Lanza con técnica (de lado, paso con el pie contrario, fuerza desde la cadera) y sigue una rutina de acondicionamiento con música.",
    lesson: [
      "Para lanzar lejos: de lado al objetivo, brazo atrás y paso con el pie contrario al brazo que lanza.",
      "La fuerza nace en las piernas y la cadera y termina en el brazo.",
      "Una rutina con música puede trabajar todo el cuerpo: saltos, sentadillas, brazos y abdomen."
    ],
    quiz: [
      q("Si lanzas con la derecha, das el paso con…", ["El pie derecho", "El pie izquierdo", "Ningún pie"], 1),
      q("La fuerza del lanzamiento empieza en…", ["Los dedos", "Piernas y cadera", "La cabeza"], 1),
      q("Una rutina con música sirve para…", ["Acondicionar el cuerpo", "Dormir", "Nada"], 0)
    ],
    practice: "20 lanzamientos de pelota a un objetivo, 10 con cada mano.",
    abc: "Cadena cinética: concepto que reaparece en entrenamiento de fuerza (8°)." },

  { id: "g5t2", grade: "5°", tri: 2, domain: "fuel",
    mep: "Ejercitándome por medio del juego II",
    mepContents: "Concepto de ejercicio físico y de acondicionamiento físico para la salud y el deporte; predeportivos de golpeo y lanzamiento (béisbol, sóftbol).",
    competency: "Golpea y lanza en juegos tipo béisbol/sóftbol, explica qué es el acondicionamiento físico y planifica su hidratación.",
    lesson: [
      "Ejercicio físico: actividad física planificada y repetida para mejorar la condición física.",
      "Para golpear con un bate: pies al ancho de hombros, mirada en la bola y giro de cadera.",
      "Para la clase, el agua es la mejor bebida. Señales de deshidratación: sed, boca seca y orina oscura."
    ],
    quiz: [
      q("El ejercicio físico es actividad…", ["Planificada para mejorar", "Sin propósito", "Solo para atletas"], 0),
      q("En educación física la mejor bebida suele ser…", ["Refresco", "Agua", "Bebida energética"], 1),
      q("Una señal de deshidratación es…", ["Orina oscura", "Mucha energía", "Manos frías"], 0)
    ],
    practice: "Registra cuánta agua llevas y tomas en 3 días con clase de educación física.",
    abc: "Hidratación: primera unidad de alfabetización alimentaria (sin prescripción)." },

  { id: "g5t3", grade: "5°", tri: 3, domain: "self",
    mep: "Activando mi Escuela: mini torneos y pre deportivos",
    mepContents: "Predeportivos con balón usando una mano y desplazamientos (balonmano); organización de mini torneos y festivales deportivos.",
    competency: "Participa en un mini torneo asumiendo roles de jugador, árbitro y organizador, con respeto a las reglas.",
    lesson: [
      "Un torneo necesita equipos equilibrados, horario, reglas claras y árbitros.",
      "En balonmano se lanza con una mano después de máximo 3 pasos.",
      "Organizar también es parte del deporte: todos los roles importan."
    ],
    quiz: [
      q("Un torneo justo necesita…", ["Equipos equilibrados y reglas claras", "Solo los mejores", "Sin árbitro"], 0),
      q("En balonmano el lanzamiento es…", ["Con el pie", "Con una mano", "Con la cabeza"], 1),
      q("El árbitro…", ["Es parte del juego", "Es el enemigo", "No importa"], 0)
    ],
    practice: "Sé árbitro en un juego del recreo y anota qué fue lo más difícil.",
    abc: "Liderazgo: primera competencia de gestión de actividades para otros." },

  /* ===================== 6° AÑO · PL3 ===================== */
  { id: "g6t1", grade: "6°", tri: 1, domain: "fuel",
    mep: "Beneficio mi salud practicando juegos pre deportivos",
    mepContents: "Salud y calidad de vida; factores que la afectan (actividad física, alimentación, higiene, ambientes saludables); predeportivos de salto y equilibrio (atletismo de saltos, acrosport).",
    competency: "Salta y aterriza con técnica (rodillas flexionadas y alineadas) y explica cuatro factores que afectan la salud.",
    lesson: [
      "Cuatro factores de salud del programa: actividad física, alimentación saludable, higiene personal y ambientes saludables.",
      "Un plato equilibrado incluye verduras y frutas, proteína (frijoles, huevo, pollo, pescado) y carbohidratos (arroz, tortilla, papa). Los planes personalizados los hace un profesional en nutrición.",
      "Al aterrizar, dobla las rodillas como resorte y mantenlas alineadas con los pies."
    ],
    quiz: [
      q("Un factor que afecta la salud es…", ["La higiene personal", "El color de la camiseta", "La suerte"], 0),
      q("La principal fuente de energía para moverse es…", ["Los carbohidratos", "El agua", "Las vitaminas"], 0),
      q("Al aterrizar, las rodillas…", ["Quedan rectas", "Se doblan alineadas con los pies", "Se juntan hacia adentro"], 1)
    ],
    practice: "Dibuja tu almuerzo y clasifica sus grupos de alimentos. Haz 10 saltos aterrizando en silencio.",
    abc: "Alfabetización alimentaria: principios generales, nunca dietas individuales." },

  { id: "g6t2", grade: "6°", tri: 2, domain: "sport",
    mep: "La música, pre deportivos y recreación, en Mi Salud",
    mepContents: "Beneficios de la recreación; actividad física con música; predeportivos de coordinación para aplicar fuerza al balón (voleibol y afines).",
    competency: "Realiza voleo y golpe de antebrazo en juegos predeportivos y crea en grupo una rutina con música.",
    lesson: [
      "Voleo: manos en forma de triángulo sobre la frente, golpe con los dedos y extensión de brazos y piernas.",
      "Golpe de antebrazo: brazos juntos y rectos; el impulso viene de las piernas.",
      "Crear rutinas con música mejora la coordinación y es una forma de recreación saludable."
    ],
    quiz: [
      q("En el voleo las manos forman…", ["Un puño", "Un triángulo sobre la frente", "Una línea"], 1),
      q("En el golpe de antebrazo el impulso viene de…", ["Las piernas", "La cabeza", "Las muñecas"], 0),
      q("Una rutina con música es…", ["Recreación saludable", "Pérdida de tiempo", "Solo para bailarines"], 0)
    ],
    practice: "Golpe de antebrazo contra la pared o con un globo: 30 toques seguidos.",
    abc: "Creación colectiva: base del diseño de sesiones (10°)." },

  { id: "g6t3", grade: "6°", tri: 3, domain: "self",
    mep: "Festivales para ponerse en movimiento",
    mepContents: "Predeportivos de raqueta; organización de competencias y festivales deportivos para todas las personas.",
    competency: "Golpea con raqueta controlando la dirección y coorganiza un festival deportivo inclusivo.",
    lesson: [
      "Con raqueta: agarre firme pero relajado, mirada en la bola y golpe con el cuerpo de lado.",
      "Un festival inclusivo adapta reglas y materiales para que todas las personas participen.",
      "Al terminar 6° cierras el nivel 'Jugar': ya puedes aprender a entrenar."
    ],
    quiz: [
      q("Al golpear con raqueta, la mirada va…", ["A la bola", "Al público", "Al suelo"], 0),
      q("Un festival inclusivo…", ["Adapta reglas para que todos participen", "Solo admite a los mejores", "No tiene reglas"], 0),
      q("Organizar un festival requiere…", ["Planificar roles, espacio y materiales", "Solo un balón", "Nada"], 0)
    ],
    practice: "Golpea una bola con raqueta (o la mano) contra la pared: 20 golpes controlados.",
    abc: "Inclusión y adaptación de reglas: competencia evaluada en el sello." },

  /* ===================== 7° AÑO · PL4 ===================== */
  { id: "g7t1", grade: "7°", tri: 1, domain: "self",
    mep: "Cuidándome y entrenándome en casa",
    mepContents: "Movimiento humano, salud, calidad de vida, tiempo libre y recreación; tipos de actividad física; postura y respiración; apreciación del propio estado de salud.",
    competency: "Evalúa sus hábitos (actividad física, sueño, pantallas) y diseña una rutina segura para hacer en casa con buena postura y respiración.",
    lesson: [
      "La OMS recomienda para personas de 5 a 17 años un promedio de 60 minutos diarios de actividad física moderada a vigorosa.",
      "Postura: columna neutra, abdomen activo. Respiración: no aguantes el aire durante el esfuerzo.",
      "Evaluar tus hábitos (movimiento, sueño, pantallas) es el primer paso para mejorarlos."
    ],
    quiz: [
      q("Recomendación OMS (5–17 años):", ["60 min diarios en promedio", "60 min por semana", "10 min al día"], 0),
      q("Durante el esfuerzo debes…", ["Aguantar la respiración", "Respirar de forma continua", "No respirar"], 1),
      q("El primer paso para mejorar hábitos es…", ["Evaluarlos", "Ignorarlos", "Copiar a otros"], 0)
    ],
    practice: "Registra una semana: minutos de actividad, horas de sueño y horas de pantalla.",
    abc: "Autoevaluación de estilo de vida: inicio de la autogestión." },

  { id: "g7t2", grade: "7°", tri: 2, domain: "sport",
    mep: "Poniéndome en acción: juegos y deportes",
    mepContents: "El juego y sus tipos; juegos tradicionales, predeportivos y deportes de la comunidad; creación y adaptación de juegos para inclusión, espacio y materiales.",
    competency: "Crea o adapta un juego para que participen personas con distintas capacidades, con el espacio y los materiales disponibles.",
    lesson: [
      "Juegos tradicionales, predeportivos y deportes forman una progresión: de reglas simples a reglas oficiales.",
      "Adaptar un juego puede cambiar el espacio, los materiales, las reglas o el número de jugadores.",
      "Un buen juego inclusivo mantiene el reto para todos."
    ],
    quiz: [
      q("Un juego predeportivo es…", ["Un juego que prepara para un deporte", "Un deporte profesional", "Un videojuego"], 0),
      q("Para incluir a más personas puedo cambiar…", ["Reglas, espacio o materiales", "Nada", "Solo el marcador"], 0),
      q("Un buen juego inclusivo…", ["Mantiene el reto para todos", "Es aburrido", "Excluye a algunos"], 0)
    ],
    practice: "Diseña un juego con materiales de casa y pruébalo con tu familia.",
    abc: "Diseño centrado en las personas: competencia de liderazgo." },

  { id: "g7t3", grade: "7°", tri: 3, domain: "fit",
    mep: "Cuidándome y entrenándome: jugando, bailando y creando",
    mepContents: "Beneficios físicos, cognitivos, emocionales y sociales del baile; tipos de baile; el baile como ejercicio; rutinas individuales y grupales.",
    competency: "Crea y dirige una rutina de baile como ejercicio, controlando la intensidad con la escala de esfuerzo (RPE).",
    lesson: [
      "El baile mejora la condición física, la coordinación, el ánimo y la convivencia.",
      "RPE (esfuerzo percibido) de 1 a 10: 1 muy fácil, 10 esfuerzo máximo.",
      "Una rutina de baile como ejercicio debería llegar a una intensidad moderada o vigorosa (RPE 5–8)."
    ],
    quiz: [
      q("RPE 10 significa…", ["Muy fácil", "Esfuerzo máximo", "Descanso"], 1),
      q("El baile como ejercicio beneficia…", ["Solo el físico", "Lo físico, emocional y social", "Nada"], 1),
      q("Intensidad moderada a vigorosa es aprox. RPE…", ["1–2", "5–8", "10 siempre"], 1)
    ],
    practice: "Crea una coreografía de 3 minutos y registra tu RPE al terminar.",
    abc: "Escala RPE: herramienta de autorregulación que se usa hasta 11°." },

  /* ===================== 8° AÑO · PL4 ===================== */
  { id: "g8t1", grade: "8°", tri: 1, domain: "train",
    mep: "Cuidándome y entrenándome en el colegio",
    mepContents: "Entrenamiento físico y sus objetivos; componentes de la aptitud física para la salud (resistencia aeróbica, fuerza, flexibilidad, resistencia muscular localizada, composición corporal); estructura de la sesión; rutina básica para 13–18 años.",
    competency: "Diseña y ejecuta una sesión con calentamiento, parte principal y vuelta a la calma, con técnica correcta en sentadilla, bisagra, empuje y tracción.",
    lesson: [
      "Componentes de la aptitud física para la salud: resistencia aeróbica, fuerza, resistencia muscular, flexibilidad y composición corporal.",
      "Una sesión tiene 3 partes: calentamiento, parte principal y vuelta a la calma.",
      "'3 × 10' significa 3 series de 10 repeticiones. Entrenar fuerza con técnica y supervisión es seguro y recomendado en adolescentes."
    ],
    quiz: [
      q("¿Cuál es un componente de la aptitud física para la salud?", ["Flexibilidad", "Puntería", "Estatura"], 0),
      q("El orden de una sesión es…", ["Principal → calentamiento → calma", "Calentamiento → principal → vuelta a la calma", "Solo parte principal"], 1),
      q("'4 × 8' significa…", ["8 series de 4", "4 series de 8 repeticiones", "48 series"], 1)
    ],
    practice: "Ejecuta tu sesión: 3 × 8 sentadillas, 3 × 8 puentes de glúteo, 3 × 6 flexiones, con calentamiento y vuelta a la calma.",
    abc: "Patrones de fuerza y vocabulario de entrenamiento (series, repeticiones, descanso)." },

  { id: "g8t2", grade: "8°", tri: 2, domain: "sport",
    mep: "Poniendo al colegio en acción: deporte y baile en el colegio I",
    mepContents: "Historia, reglas y tipos de gimnasia a manos libres, baloncesto y fútbol; baile aplicado al juego; roles de jugador y juez; preparación (calentamiento y alimentación); torneos cortos inclusivos.",
    competency: "Juega y arbitra partidos de baloncesto o fútbol aplicando reglas básicas, y se prepara con calentamiento e hidratación.",
    lesson: [
      "Conocer la historia y las reglas de un deporte te permite jugarlo y también arbitrarlo.",
      "El calentamiento debe parecerse a lo que vas a hacer: movilidad, trote y gestos del deporte.",
      "Antes de competir: come algo liviano con carbohidratos 2–3 horas antes y llega hidratado."
    ],
    quiz: [
      q("Un buen calentamiento…", ["Se parece a la actividad principal", "Es siempre igual", "Se puede omitir"], 0),
      q("Antes de competir conviene…", ["Llegar hidratado", "Ayunar todo el día", "Tomar energéticas"], 0),
      q("Arbitrar requiere…", ["Conocer las reglas", "Ser el mejor jugador", "Gritar"], 0)
    ],
    practice: "Arbitra 10 minutos de un partido y anota 3 decisiones que tomaste.",
    abc: "Preparación para competir (calentamiento e hidratación) como hábito." },

  { id: "g8t3", grade: "8°", tri: 3, domain: "sport",
    mep: "Poniendo al colegio en acción: deporte y baile en el colegio II",
    mepContents: "Atletismo de pista y campo, voleibol y fútbol sala; competencias de baile; roles de jugador y juez; organización de torneos cortos.",
    competency: "Ejecuta una prueba de atletismo (carrera, salto o lanzamiento) con técnica básica y ayuda a organizar un torneo corto inclusivo.",
    lesson: [
      "El atletismo incluye carreras (pista), saltos y lanzamientos (campo).",
      "Salida de velocidad: peso adelante, primeros pasos cortos y potentes, brazos enérgicos.",
      "Un torneo corto inclusivo da minutos de juego a todas las personas."
    ],
    quiz: [
      q("Los saltos y lanzamientos son pruebas de…", ["Pista", "Campo", "Gimnasio"], 1),
      q("En la salida de velocidad los primeros pasos son…", ["Largos y lentos", "Cortos y potentes", "Saltos"], 1),
      q("Un torneo inclusivo…", ["Da minutos a todos", "Solo usa titulares", "No tiene reglas"], 0)
    ],
    practice: "Mide tu salto horizontal 3 veces y registra el mejor.",
    abc: "Primeras pruebas físicas registradas (base del perfil deportivo)." },

  /* ===================== 9° AÑO · PL5 ===================== */
  { id: "g9t1", grade: "9°", tri: 1, domain: "train",
    mep: "Cuidándome y entrenándome en mi entorno",
    mepContents: "Principios del entrenamiento (frecuencia, intensidad, tiempo, tipo, progresión, variedad); entrenamiento en adolescentes; lesiones y prevención; diferencias por edad y sexo; entrenamiento en obesidad, diabetes, asma e hipertensión.",
    competency: "Aplica los principios FITT y de progresión en un plan de 4 semanas e identifica señales de alerta para detenerse y avisar.",
    lesson: [
      "FITT: Frecuencia (cuántas veces), Intensidad (qué tan fuerte), Tiempo (cuánto dura) y Tipo (qué actividad).",
      "Progresión: aumenta la exigencia poco a poco; el cuerpo se adapta durante el descanso. Adolescentes de 13 a 18 años: 8 a 10 horas de sueño.",
      "Detente y avisa si hay dolor agudo o en una articulación, mareo, dolor en el pecho o falta de aire desproporcionada."
    ],
    quiz: [
      q("La 'I' de FITT es…", ["Inicio", "Intensidad", "Igualdad"], 1),
      q("El cuerpo se adapta principalmente…", ["Durante el descanso", "Solo entrenando", "Nunca"], 0),
      q("Dolor en el pecho durante el ejercicio significa…", ["Seguir más fuerte", "Detenerse y avisar", "Tomar un refresco"], 1)
    ],
    practice: "Escribe tu plan de 4 semanas con FITT y registra tus horas de sueño 7 días.",
    abc: "Prevención de lesiones y recuperación (sueño) integradas al entrenamiento." },

  { id: "g9t2", grade: "9°", tri: 2, domain: "sport",
    mep: "Poniendo al colegio en acción: haciendo juegos, deportes y baile",
    mepContents: "Balonmano, béisbol y softbol, baile deportivo: historia, reglamento, calentamiento y alimentación; grandes eventos deportivos y trayectoria de Costa Rica; roles de deportista, juez y director técnico.",
    competency: "Participa como deportista, juez o director técnico y coorganiza un evento deportivo con reglamento y roles definidos.",
    lesson: [
      "Los grandes eventos (Juegos Olímpicos, Centroamericanos, mundiales) tienen historia, filosofía y organización.",
      "El director técnico planifica, motiva y toma decisiones tácticas.",
      "Organizar un evento implica reglamento, horarios, arbitraje, seguridad y comunicación."
    ],
    quiz: [
      q("El director técnico…", ["Planifica y toma decisiones tácticas", "Solo anima", "Arbitra"], 0),
      q("Organizar un evento implica…", ["Reglamento, horarios y seguridad", "Solo trofeos", "Nada"], 0),
      q("Un gran evento multideportivo es…", ["Los Juegos Olímpicos", "Un partido de recreo", "Una clase"], 0)
    ],
    practice: "Investiga un atleta costarricense en un gran evento y preséntalo en 1 minuto.",
    abc: "Rol de dirección técnica: preparación para el liderazgo de 10°–11°." },

  { id: "g9t3", grade: "9°", tri: 3, domain: "fit",
    mep: "Poniendo al colegio en acción: haciendo juegos, deportes y ejercicio con música",
    mepContents: "Deportes con raqueta (tenis de mesa, tenis, bádminton, frontón); actividades con música como entrenamiento (pilates, ciclismo estacionario, danza aeróbica); otras disciplinas de interés; seguridad e hidratación.",
    competency: "Practica un deporte de raqueta y diseña una sesión con música como entrenamiento, con calentamiento, hidratación e intensidad controlada.",
    lesson: [
      "Pilates trabaja control, respiración y estabilidad del tronco; la danza aeróbica, la resistencia cardiovascular.",
      "Una sesión con música puede estructurarse por canciones: calentamiento, bloques intensos y vuelta a la calma.",
      "Preparación integral: calentamiento, hidratación y alimentación adecuadas."
    ],
    quiz: [
      q("El pilates trabaja principalmente…", ["Control y estabilidad del tronco", "Velocidad máxima", "Puntería"], 0),
      q("La danza aeróbica mejora…", ["La resistencia cardiovascular", "La vista", "La estatura"], 0),
      q("Una sesión con música puede organizarse…", ["Por canciones según la intensidad", "Sin estructura", "Solo con una canción"], 0)
    ],
    practice: "Diseña una playlist de 30 minutos con calentamiento, bloque principal y vuelta a la calma.",
    abc: "Variedad de actividades para sostener la adherencia de por vida." },

  /* ===================== 10° AÑO · PL6 ===================== */
  { id: "g10t1", grade: "10°", tri: 1, domain: "fuel",
    mep: "Promoviendo salud: mi colegio y yo activos y saludables",
    mepContents: "Teorías y procesos de promoción de la salud; contaminación y alimentación en el rendimiento; efectos biopsicosociales de la actividad física; valoración del estilo de vida; actividades de promoción en el colegio.",
    competency: "Evalúa su estilo de vida con una herramienta y organiza una actividad de promoción de la salud en el colegio.",
    lesson: [
      "Promover salud es ayudar a otras personas a tener más control sobre los factores que afectan su bienestar.",
      "La alimentación y la contaminación del aire afectan el rendimiento; entrena lejos del tráfico cuando sea posible.",
      "La actividad física tiene efectos fisiológicos, cognitivos, emocionales y sociales. La educación alimentaria es general; los planes individuales son tarea de nutricionistas."
    ],
    quiz: [
      q("Promover salud es…", ["Ayudar a otros a mejorar su bienestar", "Vender suplementos", "Solo ir al médico"], 0),
      q("Para entrenar es mejor un lugar…", ["Lejos del tráfico", "Junto a una autopista", "Da igual"], 0),
      q("Un plan de alimentación personalizado lo hace…", ["Un profesional en nutrición", "Un influencer", "Un compañero"], 0)
    ],
    practice: "Organiza con tu grupo una campaña de pausas activas en el colegio.",
    abc: "Del autocuidado al cuidado de otros: alfabetización en salud aplicada." },

  { id: "g10t2", grade: "10°", tri: 2, domain: "self",
    mep: "Venciendo desafíos deportivos y de baile en el colegio I",
    mepContents: "Entrenamiento físico-deportivo en medio natural y urbano; repaso de juegos, deportes y baile; danza aeróbica y competencias de resistencia bailando; actividades desafiantes en equipo; liderazgo con otros niveles.",
    competency: "Diseña y dirige, en equipo, un desafío físico-deportivo para estudiantes de otro nivel, con una meta SMART.",
    lesson: [
      "Meta SMART: Específica, Medible, Alcanzable, Relevante y con Tiempo definido.",
      "Un buen desafío es retador pero alcanzable y se ajusta al nivel de los participantes.",
      "Liderar implica explicar con claridad, cuidar la seguridad y motivar a todos."
    ],
    quiz: [
      q("La 'M' de SMART significa…", ["Motivadora", "Medible", "Mágica"], 1),
      q("Un buen desafío es…", ["Retador pero alcanzable", "Imposible", "Muy fácil"], 0),
      q("Liderar un desafío implica…", ["Cuidar la seguridad de todos", "Ganar siempre", "Solo dar órdenes"], 0)
    ],
    practice: "Escribe una meta SMART personal y registra tu avance semanal.",
    abc: "Metas SMART y diseño de experiencias para otros." },

  { id: "g10t3", grade: "10°", tri: 3, domain: "train",
    mep: "Venciendo desafíos deportivos y de baile en el colegio II",
    mepContents: "Recreación física y sus tipos; juegos, deportes, ejercicio y baile en medio urbano y natural; efectos de la contaminación; actividades novedosas y desafiantes.",
    competency: "Planifica y dirige una sesión de 45 minutos de recreación física en un entorno urbano o natural, considerando clima, ambiente y seguridad.",
    lesson: [
      "Una sesión tiene un objetivo claro: fuerza, resistencia, técnica o juego.",
      "Al aire libre considera calor, hidratación, superficie, sombra y plan ante emergencias.",
      "Deja el entorno mejor de lo que lo encontraste: recreación responsable con el ambiente."
    ],
    quiz: [
      q("Cada sesión debería tener…", ["Un objetivo claro", "Todos los objetivos", "Ningún objetivo"], 0),
      q("Al aire libre en día caluroso debes planear…", ["Hidratación y sombra", "Más abrigo", "Nada"], 0),
      q("La recreación responsable…", ["Cuida el ambiente", "Deja basura", "Daña senderos"], 0)
    ],
    practice: "Dirige tu sesión al aire libre para 3 personas y anota qué mejorarías.",
    abc: "Diseño de sesiones completas: puente hacia el proyecto Self-Coach." },

  /* ===================== 11° AÑO · PL7 ===================== */
  { id: "g11t1", grade: "11°", tri: 1, domain: "body",
    mep: "Promoviendo salud: mi comunidad y yo activos y saludables",
    mepContents: "Promoción de cambios en conductas riesgosas; efectos de la actividad física en diabetes, osteoporosis, artrosis, hipertensión y obesidad; actividad física en embarazo; prevención del ejercicio excesivo y del abuso de sustancias ergogénicas.",
    competency: "Diseña un proyecto de promoción de actividad física para un grupo de su comunidad, adaptado a sus condiciones y con derivación a profesionales de salud cuando corresponde.",
    lesson: [
      "La actividad física adaptada ayuda a personas con diabetes, hipertensión u osteoporosis, siempre con autorización y guía de profesionales de salud.",
      "Más no siempre es mejor: el ejercicio excesivo y las sustancias para 'rendir más' pueden dañar la salud.",
      "Cambiar conductas riesgosas requiere metas pequeñas, apoyo social y seguimiento."
    ],
    quiz: [
      q("Para personas con enfermedades crónicas, la actividad física debe…", ["Adaptarse con guía profesional", "Evitarse siempre", "Ser máxima"], 0),
      q("El ejercicio excesivo…", ["Puede dañar la salud", "Siempre es bueno", "No existe"], 0),
      q("Para cambiar una conducta riesgosa ayuda…", ["Metas pequeñas y apoyo", "Hacerlo todo de golpe", "Nada"], 0)
    ],
    practice: "Ejecuta tu proyecto con un grupo de tu comunidad durante 4 semanas y registra la asistencia.",
    abc: "Liderazgo comunitario y límites profesionales (derivar, no prescribir)." },

  { id: "g11t2", grade: "11°", tri: 2, domain: "train",
    mep: "Venciendo desafíos deportivos y de baile en mi comunidad",
    mepContents: "Entrenamiento y recreación en medio natural y urbano; deportes de aventura; organización de actividades comunitarias (II y III trimestre).",
    competency: "Organiza un desafío deportivo-recreativo comunitario con planificación por bloques y gestión de riesgos.",
    lesson: [
      "Un mesociclo es un bloque de semanas con un objetivo; la carga sube progresivamente y luego baja en una semana de descarga.",
      "Los deportes de aventura (senderismo, ciclismo de montaña, escalada) requieren equipo, permisos y plan de seguridad.",
      "Gestión de riesgos: identificar peligros, reducirlos y tener un plan de respuesta."
    ],
    quiz: [
      q("La semana de descarga sirve para…", ["Recuperar", "Entrenar el doble", "Competir"], 0),
      q("Un deporte de aventura requiere…", ["Equipo y plan de seguridad", "Solo valentía", "Nada"], 0),
      q("Gestionar riesgos es…", ["Identificarlos, reducirlos y planear respuesta", "Ignorarlos", "Suspender todo"], 0)
    ],
    practice: "Planifica 8 semanas de preparación para tu desafío con una semana de descarga.",
    abc: "Planificación por bloques: competencia de autonomía en el entrenamiento." },

  /* ============ EXTENSIONES ABC BODY (fuera del programa MEP) ============ */
  { id: "x11a", grade: "11°", tri: 3, domain: "self", ext: true,
    mep: null, title: "Proyecto Self-Coach",
    mepContents: "Extensión ABC BODY. Integra los aprendizajes de 7° a 11° en un proyecto final.",
    competency: "Diseña, ejecuta durante 8 semanas y defiende su propio plan (meta SMART, pruebas, sesiones, sueño, hidratación y evaluación).",
    lesson: [
      "Este proyecto demuestra que puedes entrenarte de forma autónoma.",
      "Incluye: meta SMART, pruebas iniciales y finales, plan de 8 semanas, hábitos de recuperación y evaluación.",
      "Lo defiendes ante tu docente explicando por qué elegiste cada cosa."
    ],
    quiz: [
      q("El proyecto Self-Coach demuestra…", ["Autonomía para entrenar", "Que eres atleta profesional", "Que eres nutricionista"], 0),
      q("Para comparar resultados debes usar…", ["Pruebas distintas", "La misma prueba y condiciones", "Tu memoria"], 1),
      q("La defensa consiste en…", ["Explicar el porqué de tus decisiones", "Copiar un plan de internet", "Nada"], 0)
    ],
    practice: "Entrega tu plan y registra las 8 semanas.",
    abc: "Proyecto final que certifica el perfil del graduado ABC BODY." },

  { id: "x11b", grade: "11°", tri: 3, domain: "sport", ext: true, optional: true,
    mep: null, title: "Perfil deportivo (ruta de alto rendimiento)",
    mepContents: "Extensión ABC BODY opcional para estudiantes con talento deportivo.",
    competency: "Comprende las etapas del desarrollo del atleta y construye su perfil deportivo documentado con pruebas verificables.",
    lesson: [
      "El desarrollo del atleta a largo plazo incluye etapas como Entrenar para entrenar, Entrenar para competir y Entrenar para ganar.",
      "Especializarse demasiado temprano en un solo deporte aumenta el riesgo de lesión y abandono.",
      "Un perfil deportivo con pruebas estandarizadas y trayectoria verificable es lo que revisan quienes buscan talento."
    ],
    quiz: [
      q("Especializarse muy temprano…", ["Siempre es mejor", "Aumenta riesgo de lesión y abandono", "Es obligatorio"], 1),
      q("Una etapa del desarrollo del atleta es…", ["Entrenar para competir", "Competir sin entrenar", "Entrenar sin dormir"], 0),
      q("Un perfil deportivo incluye…", ["Pruebas y trayectoria verificables", "Solo fotos", "Likes"], 0)
    ],
    practice: "Completa tu perfil con 3 pruebas medidas por tu docente.",
    abc: "Puente hacia el reconocimiento por universidades y reclutadores." }
];

UNITS.forEach(u => { u.level = GRADE_LEVEL[u.grade]; u.title = u.title || u.mep; });

const STATES = [
  { id: 0, name: "Sin evaluar",   short: "—", color: "#E0E0E0" },
  { id: 1, name: "Inicial",       short: "I", color: "#F2C94C" },
  { id: 2, name: "En desarrollo", short: "D", color: "#F2994A" },
  { id: 3, name: "Competente",    short: "C", color: "#6FCF97" },
  { id: 4, name: "Consolidada",   short: "✓", color: "#219653" }
];

/* Criterio interno provisional del sello (no validado). */
const SEAL_RULES = [
  { name: "Oro",    min: 85, color: "#D4A017" },
  { name: "Plata",  min: 70, color: "#9EA7AD" },
  { name: "Bronce", min: 50, color: "#B87333" }
];

const SCHOOL = { name: "Colegio Demo San José" };

/* Estudiantes ficticios de demostración */
const DEMO_GROUPS = {
  "7°A": ["Sofía Rojas", "Mateo Vargas", "Valeria Mora", "Sebastián Jiménez", "Camila Solano", "Diego Araya",
          "Isabella Chaves", "Daniel Quesada", "Mariana Castro", "Gabriel Brenes", "Lucía Alfaro", "Andrés Herrera"],
  "11°A": ["Natalia Ugalde", "José Pablo Monge", "Fernanda Salas", "Emiliano Cordero", "Paula Navarro",
           "Tomás Méndez", "Ariana Esquivel", "Felipe Calderón"]
};
