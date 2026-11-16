"""Actividades diferenciadas por ruta para ABC ATHLETE, ACTIVE y LONGEVITY (V18.2).

Para cada programa y dominio hay una actividad principal por ruta (en el orden de RUTAS),
y cada ruta tiene una nota de seguridad propia. Borrador pendiente de validación profesional.
"""

RUTAS = {
    "ABC ATHLETE": ["joven", "adulto", "master"],
    "ABC ACTIVE": ["joven_adulto", "adulto_medio", "adulto_mayor"],
    "ABC LONGEVITY": ["60_69", "70_79", "80_plus"],
}

SEGURIDAD_RUTA = {
    "joven": "Ruta 13–17: supervisión adulta, técnica antes que carga y sin especialización temprana ni pruebas máximas.",
    "adulto": "Ruta 18–39: progresar carga y volumen de forma gradual (no más de un cambio por semana) y respetar la recuperación.",
    "master": "Ruta 40+: considerar historial de lesiones y salud; calentamiento más largo y progresión conservadora; consultar si hay síntomas.",
    "joven_adulto": "Ruta 18–39: adaptar la sesión a la jornada laboral o de estudio y evitar compensar días inactivos con esfuerzos extremos.",
    "adulto_medio": "Ruta 40–59: priorizar constancia; si hay condición crónica o síntomas, obtener orientación profesional antes de aumentar la intensidad.",
    "adulto_mayor": "Ruta 60+: tener apoyo estable cerca, superficie segura y pausas; detenerse ante mareo o inestabilidad.",
    "60_69": "Ruta 60–69: buscar independencia y fuerza funcional; progresar con apoyo disponible y valoración si hubo caídas.",
    "70_79": "Ruta 70–79: practicar siempre con apoyo estable al alcance y pausas frecuentes; preferible acompañado en tareas nuevas.",
    "80_plus": "Ruta 80+: práctica acompañada o supervisada, apoyo estable obligatorio y tareas cortas; derivar cualquier síntoma.",
}

ACTIVIDADES = {
    "ABC ATHLETE": {
        "Evaluación funcional": [
            "Circuito de movimiento con sentadilla, zancada asistida y lanzamiento observado por el entrenador",
            "Batería técnica de sentadilla, bisagra, zancada y empuje con registro en video propio",
            "Evaluación de movilidad, equilibrio a una pierna y control de tronco con historial de lesiones a la vista",
        ],
        "Preparación y calentamiento": [
            "Calentamiento por juegos con desplazamientos, saltos suaves y cambios de dirección",
            "Calentamiento de 12 minutos: activación, movilidad dinámica y aceleraciones progresivas",
            "Calentamiento extendido de 15–20 minutos con movilidad articular y aumentos graduales de ritmo",
        ],
        "Fuerza básica": [
            "Sentadilla a banco, plancha y remo elástico con peso corporal y técnica supervisada",
            "Sentadilla goblet, remo con mancuerna y empuje con carga ligera a moderada en 3 series",
            "Sentadilla a banco, empuje contra pared o inclinado y remo elástico con progresión lenta",
        ],
        "Aceleración": [
            "Salidas desde distintas posiciones (sentado, de rodillas, de pie) de 5–10 m en forma de juego",
            "Aceleraciones de 10–20 m con postura inclinada y recuperación completa entre series",
            "Aceleraciones progresivas de 10 m al 70–80 % del esfuerzo con caminata de recuperación",
        ],
        "Desaceleración": [
            "Carrera suave y frenada en zona marcada con aterrizaje silencioso",
            "Aceleración de 10 m y frenada en 3 pasos con caderas bajas y tronco estable",
            "Trote y frenada progresiva en 4–5 pasos, priorizando control de rodillas",
        ],
        "Saltos y aterrizaje": [
            "Saltos a marcas y aterrizajes congelados de tres segundos con rodillas alineadas",
            "Saltos al cajón bajo y caídas controladas, 3 series de 5 con descanso amplio",
            "Mini saltos en el sitio y paso a escalón con pausa estable, sin impactos si hay dolor",
        ],
        "Agilidad perceptiva": [
            "Juego de reacción a colores con cambios de dirección y compañero que da las señales",
            "Tareas de agilidad reactiva con señal visual y decisión entre dos direcciones",
            "Desplazamientos a señal con giros amplios y velocidad controlada",
        ],
        "Capacidad aeróbica": [
            "Juegos continuos de 10–15 minutos con pausas de valoración del esfuerzo",
            "Intervalos de 3 minutos a esfuerzo moderado-alto y 2 minutos suaves, 4 repeticiones",
            "Trote o bicicleta en zona conversacional 20–30 minutos con control de esfuerzo percibido",
        ],
        "Movilidad específica": [
            "Movilidad de tobillos, caderas y hombros integrada en juegos de imitación",
            "Movilidad específica para el deporte practicado con control al final del rango",
            "Movilidad diaria de 10 minutos para cadera, columna torácica y hombros sin forzar",
        ],
        "Recuperación": [
            "Registrar sueño, ánimo y esfuerzo de la semana con apoyo de un adulto",
            "Registrar carga semanal (minutos × esfuerzo) y señales de fatiga para ajustar la siguiente semana",
            "Planificar días de recuperación activa y registrar sueño y molestias articulares",
        ],
        "Nutrición deportiva básica": [
            "Planear con la familia hidratación y meriendas para un día de entrenamiento escolar",
            "Planear hidratación y comidas alrededor del entrenamiento, sin dietas ni suplementos",
            "Revisar hidratación y horarios de comida en días de entrenamiento; derivar dudas a nutricionista",
        ],
        "Estrategia y cooperación": [
            "Juego reducido 3 contra 3 con roles rotativos y reflexión del equipo",
            "Análisis de una situación de juego en equipo y propuesta de una estrategia",
            "Rol de mentor en un ejercicio cooperativo con deportistas más jóvenes",
        ],
        "Plan de rendimiento responsable": [
            "Crear con el entrenador un microplan semanal que combine escuela, deporte y descanso",
            "Crear un microplan de una semana con objetivo técnico, carga y recuperación",
            "Crear un plan semanal que equilibre deporte, recuperación y prevención de lesiones",
        ],
    },
    "ABC ACTIVE": {
        "Mapa de hábitos": [
            "Registrar tres momentos de actividad y de tiempo sentado en un día de estudio o trabajo",
            "Registrar actividad, tiempo sentado y sueño durante tres días de la semana",
            "Registrar rutinas diarias de movimiento, descanso y tareas del hogar durante una semana",
        ],
        "Movilidad cotidiana": [
            "Rutina de movilidad de 5 minutos para cuello, hombros y caderas entre clases o trabajo",
            "Movilidad de cadera, columna y hombros al iniciar y cerrar la jornada",
            "Movilidad sentado y de pie con apoyo para tobillos, caderas y hombros",
        ],
        "Caminar con intención": [
            "Caminata rápida de 20–30 minutos a ritmo conversacional en ruta segura",
            "Caminata de 30 minutos con dos tramos de ritmo más vivo",
            "Caminata de 10–20 minutos en ruta plana y segura con pausas",
        ],
        "Fuerza de tren inferior": [
            "Sentadillas, zancadas y puente de glúteo con peso corporal, 2–3 series",
            "Sentadilla a silla, paso a escalón y puente de glúteo con progresión de repeticiones",
            "Levantarse de silla con apoyo de manos opcional y paso a escalón bajo",
        ],
        "Fuerza de tren superior": [
            "Flexiones inclinadas, remo con banda y empuje sobre la cabeza con banda ligera",
            "Empuje en pared o inclinado y remo con banda, 2–3 series",
            "Empuje de pared y remo sentado con banda ligera",
        ],
        "Equilibrio funcional": [
            "Equilibrio a una pierna con movimiento de brazos y desplazamientos en línea",
            "Caminar sobre línea y equilibrio a una pierna junto a un apoyo",
            "Equilibrio de pie con los pies juntos y en semitándem junto a una encimera",
        ],
        "Resistencia progresiva": [
            "Bloques de 10 minutos de bicicleta, trote suave o natación a ritmo conversacional",
            "Bloques de caminata vigorosa o bicicleta estática con progresión semanal de 5 minutos",
            "Bloques cortos de caminata o bicicleta estática con pausas, aumentando de a pocos minutos",
        ],
        "Pausas activas": [
            "Pausa activa de 3 minutos cada hora de estudio o pantalla",
            "Pausa activa de levantarse, caminar y estirar cada 45–60 minutos de trabajo",
            "Pausa activa al levantarse de la silla con movilidad y pasos cortos",
        ],
        "Habilidades con objetos": [
            "Juegos de lanzamiento y recepción con pelota a distintas distancias",
            "Pases a un blanco con pelota y cambio de mano",
            "Pasar una pelota blanda a un blanco cercano sentado o de pie con apoyo",
        ],
        "Actividad recreativa": [
            "Probar un deporte recreativo nuevo o una clase grupal",
            "Probar baile, bicicleta o senderismo suave con amistades o familia",
            "Probar baile suave, caminata grupal o juegos adaptados",
        ],
        "Descanso y estrés": [
            "Respiración de 4 tiempos y paseo breve en semanas de exámenes o mucha carga",
            "Respiración cómoda y paseo de 10 minutos para cerrar la jornada laboral",
            "Respiración lenta sentado y paseo breve acompañado",
        ],
        "Autonomía y accesibilidad": [
            "Diseñar dos versiones de un entrenamiento: con y sin equipamiento",
            "Diseñar opciones para entrenar en casa, al aire libre y en el trabajo",
            "Diseñar dos opciones para la misma tarea: sentado y de pie con apoyo",
        ],
        "Plan personal sostenible": [
            "Organizar siete días combinando estudio o trabajo, movimiento y descanso",
            "Organizar siete días con movimiento, sueño y descanso según la agenda laboral y familiar",
            "Organizar siete días con caminatas, fuerza ligera y descanso",
        ],
    },
    "ABC LONGEVITY": {
        "Seguridad y autonomía": [
            "Revisar asiento, iluminación y recorrido de práctica, y anotar un cambio útil en casa",
            "Revisar el recorrido de práctica con un acompañante y retirar obstáculos",
            "Revisar con la persona cuidadora el asiento, la iluminación y los apoyos disponibles",
        ],
        "Sentarse y levantarse": [
            "Levantarse y sentarse de una silla sin usar las manos, si es posible, 2 series de 8",
            "Levantarse y sentarse de una silla estable con apoyo de manos si se necesita",
            "Levantarse de una silla alta y estable con apoyo y supervisión, pocas repeticiones",
        ],
        "Marcha segura": [
            "Caminar por ruta libre cambiando de velocidad y deteniéndose en una marca",
            "Caminar por ruta libre y detenerse en una marca, con ayuda técnica si se usa",
            "Caminar tramos cortos dentro de casa con ayuda técnica habitual y acompañante",
        ],
        "Equilibrio con apoyo": [
            "Trasladar el peso lateral y hacia adelante con una mano cerca de la barra",
            "Trasladar el peso lateral con las dos manos cerca de la encimera",
            "Trasladar el peso sentado o de pie con las dos manos en un apoyo firme y acompañante cerca",
        ],
        "Fuerza de piernas": [
            "Levantarse de silla, elevaciones de talón y paso a escalón bajo",
            "Extender la rodilla sentado y levantarse de silla según capacidad",
            "Extender la rodilla sentado y elevar talones sentado",
        ],
        "Fuerza de brazos": [
            "Empuje de pared y remo con banda ligera de pie",
            "Empujar pared o mover un objeto liviano cerca del cuerpo",
            "Apretar una pelota blanda y empujar con las manos sentado",
        ],
        "Alcance y coordinación": [
            "Mover objetos blandos entre superficies a distintas alturas sin salir de la base de apoyo",
            "Mover un objeto blando entre dos superficies accesibles",
            "Mover un objeto liviano sobre la mesa estando sentado",
        ],
        "Movilidad articular": [
            "Movilidad de tobillo, hombro y columna de pie con apoyo",
            "Movilidad controlada de tobillo, hombro y columna sentado",
            "Movilidad suave de manos, hombros y tobillos sentado",
        ],
        "Resistencia cotidiana": [
            "Caminar 15–20 minutos en exterior accesible con pausas",
            "Caminar dentro de casa o en exterior accesible con pausas",
            "Caminar en tramos cortos dentro de casa con pausas sentado",
        ],
        "Doble tarea segura": [
            "Caminar y responder una pregunta simple en ruta libre",
            "Caminar y responder una pregunta simple, o detenerse para responder",
            "Responder una pregunta simple sentado y luego caminar, sin combinar ambas tareas",
        ],
        "Prevención de caídas": [
            "Inspeccionar el hogar con una lista de comprobación y corregir un riesgo",
            "Inspección simulada del entorno y ruta despejada",
            "Revisar con la persona cuidadora calzado, iluminación nocturna y apoyos del baño",
        ],
        "Participación social": [
            "Paseo grupal o clase de baile suave en la comunidad",
            "Paseo compartido o juego de pases adaptado",
            "Juego de pases sentado o visita acompañada a un espacio comunitario",
        ],
        "Plan de vida independiente": [
            "Crear un plan semanal con tareas activas, ejercicio y actividades sociales",
            "Crear un plan semanal de tareas cotidianas activas y descansos",
            "Crear con la persona cuidadora un plan semanal de tareas activas y descansos",
        ],
    },
}
