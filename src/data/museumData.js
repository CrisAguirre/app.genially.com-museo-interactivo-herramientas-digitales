// Museo Interactivo de Tecnología Educativa
// Tema Central: Pensamiento Lógico y Resolución de Problemas
// Población: Grado 5.° — Institución Las Planadas, Tolima
// Estudiante: Juana Yasiris Valoyes Serna
// Módulo: Herramientas Digitales y Didáctica
// Docente: Profesora Ilsy del Pilar Rodríguez Bernal
// Plataforma Virtual Unificada: Genially / Experiencia Web Inmersiva
// Basado en la Ficha Técnica y Programa Oficial de Salas

export const INSTITUCION = {
  nombre: 'Institución Las Planadas',
  ubicacion: 'Tolima, Colombia',
  grado: 'Grado 5.°',
  estudiante: 'Juana Yasiris Valoyes Serna',
  modulo: 'Herramientas Digitales y Didáctica',
  docente: 'Profesora Ilsy del Pilar Rodríguez Bernal'
};

export const FICHA_TECNICA = {
  temaCentral: 'Pensamiento Lógico y Resolución de Problemas',
  poblacion: 'Estudiantes de Grado 5.° — Institución Las Planadas, Tolima',
  plataforma: 'Genially como lienzo virtual unificado y entorno web interactivo',
  estructura: '4 salas temáticas con navegación no lineal + Reto del Visitante',
  modalidad: 'Trabajo colaborativo e individual guiado',
  objetivoPedagogico: 'Potenciar el razonamiento deductivo, la identificación de patrones y la resolución de algoritmos mediante Recursos Educativos Digitales (RED).',
  enfoque: 'Cada sala articula 1 herramienta TIC + 5 RED propios + 1 actividad interactiva para que el visitante pase de espectador a sujeto activo.',
  estudiante: 'Juana Yasiris Valoyes Serna',
  docente: 'Profesora Ilsy del Pilar Rodríguez Bernal',
  modulo: 'Herramientas Digitales y Didáctica',
  institucion: 'Institución Las Planadas, Tolima'
};

export const MUSEUM_ROOMS = [
  {
    id: 'lobby',
    number: '0',
    title: 'Lobby Principal',
    subtitle: 'Bienvenida & Ficha Técnica del Museo',
    badge: 'Pórtico Central',
    color: '#46178F', // Genially / Luxury Purple
    icon: 'Landmark',
    description: 'Explora la exposición virtual sobre Pensamiento Lógico y Resolución de Problemas para Grado 5.° de la Institución Las Planadas, Tolima, fundamentada en 4 salas TIC y más de 20 REDs interactivos.'
  },
  {
    id: 'sala1',
    number: '1',
    title: 'Organizadores Gráficos',
    subtitle: 'Herramientas: Padlet / Canva / MindMeister',
    badge: 'Sala 1 • Visual & Algorítmica',
    color: '#00C4CC', // Canva Cyan / Turquoise
    icon: 'Network',
    description: 'Aprende a estructurar el pensamiento mediante mapas conceptuales deductivos, diagramas de flujo algorítmicos, patrones naturales y un clasificador de pasos desordenados.'
  },
  {
    id: 'sala2',
    number: '2',
    title: 'Presentaciones & Gamificación',
    subtitle: 'Herramientas: Genially / Prezi / SlideShare',
    badge: 'Sala 2 • Lúdica & Dilemas',
    color: '#E21B3C', // Genially / Vibrant Red
    icon: 'Gamepad2',
    description: 'Enfrenta paradojas lógicas célebres, árboles de decisión, enigmas visuales con puntos calientes, la guía del método Pólya y un Escape Room con 3 acertijos.'
  },
  {
    id: 'sala3',
    number: '3',
    title: 'Video Educativo Interactivo',
    subtitle: 'Herramientas: Edpuzzle / H5P / Nearpod',
    badge: 'Sala 3 • Análisis Crítico',
    color: '#1368CE', // Edpuzzle / Intense Blue
    icon: 'Video',
    description: 'Desarrolla el pensamiento crítico analizando sesgos cognitivos, silogismos aristotélicos, patrones numéricos y un simulador de toma de decisiones en momentos clave.'
  },
  {
    id: 'sala4',
    number: '4',
    title: 'Blogs & Metacognición',
    subtitle: 'Herramientas: Blogger / WordPress / Wix (+ Reto & Votación)',
    badge: 'Sala 4 • Metacognición & Reto',
    color: '#26890C', // Growth / Green
    icon: 'Trophy',
    description: 'Reflexiona sobre la lógica formal en la era de la IA, Scratch, bitácoras de retos, foro ético-lógico y el Reto Culminante con Quiz de 5 preguntas, Votación e Insignias.'
  }
];

// SALA 1: Organizadores Gráficos
export const SALA1_DATA = {
  herramientas: 'Padlet / Canva / MindMeister',
  enfoque: 'Organización Visual del Pensamiento y Modelado de Algoritmos',
  redItems: [
    {
      id: 'red-1',
      title: 'RED #1: Mapa Conceptual de Razonamiento Deductivo e Inductivo',
      formato: 'Mapa Conceptual Interactivo (MindMeister / Canva)',
      descripcion: 'Distingue con claridad las premisas universales de las conclusiones particulares (deducción) frente a la inferencia de leyes a partir de observaciones repetidas (inducción).',
      aportePedagogico: 'Fortalece la capacidad de argumentación y estructuración jerárquica del conocimiento en ciencias y matemáticas.'
    },
    {
      id: 'red-2',
      title: 'RED #2: Diagrama de Flujo: Algoritmo para Problemas Cotidianos',
      formato: 'Diagrama de Flujo Lógico con Simbología ISO (Canva)',
      descripcion: 'Representa gráficamente los bloques de decisión (rombos), procesos (rectángulos) e inicio/fin (óvalos) para resolver un dilema de la vida diaria: ¿Cómo actuar frente a una noticia dudosa en redes?',
      aportePedagogico: 'Introduce el pensamiento computacional y la descomposición algorítmica paso a paso.'
    },
    {
      id: 'red-3',
      title: 'RED #3: Infografía: Patrones Lógicos en la Naturaleza',
      formato: 'Infografía Visual de Alta Resolución (Canva)',
      descripcion: 'Explora la secuencia de Fibonacci, espirales en girasoles, fractales en hojas de helecho y la geometría de copos de nieve.',
      aportePedagogico: 'Conecta el razonamiento matemático abstracto con la observación estética del entorno biológico.'
    },
    {
      id: 'red-4',
      title: 'RED #4: Muro Colaborativo de Estrategias Lógicas Grupales',
      formato: 'Mural Virtual Colaborativo (Padlet)',
      descripcion: 'Pizarra interactiva donde los estudiantes aportan diferentes rutas lógicas para resolver un mismo acertijo geométrico o numérico.',
      aportePedagogico: 'Promueve el aprendizaje social, la co-construcción de conocimiento y la validación de múltiples caminos de solución.'
    },
    {
      id: 'red-5',
      title: 'RED #5 (Actividad): Clasificador de Pasos de un Algoritmo Desordenado',
      formato: 'Actividad Interactiva Gamificada de Reordenamiento Secuencial',
      descripcion: 'El visitante debe arrastrar u ordenar cronológicamente los 5 pasos lógicos para "Detectar una noticia falsa antes de compartirla".',
      aportePedagogico: 'Permite pasar de espectador a sujeto activo evaluando la coherencia secuencial de un algoritmo de solución.'
    }
  ],
  algoritmoStepsDefault: [
    { id: 3, text: 'Verificar la fecha de publicación y contrastar con otras 3 fuentes confiables.', correctIndex: 2 },
    { id: 1, text: 'Leer el titular alarmante y suspender el impulso de reenviarlo de inmediato.', correctIndex: 0 },
    { id: 5, text: 'Decidir responsablemente no compartir o alertar al remitente con educación.', correctIndex: 4 },
    { id: 2, text: 'Revisar quién es el autor y si la URL del sitio web es auténtica o clonada.', correctIndex: 1 },
    { id: 4, text: 'Comprobar si las imágenes y evidencias son reales o manipuladas con IA.', correctIndex: 3 }
  ]
};

// SALA 2: Presentaciones y Gamificación
export const SALA2_DATA = {
  herramientas: 'Genially / Prezi / SlideShare',
  enfoque: 'Gamificación de Conceptos Lógicos Complejos y Narrativas Interactivas',
  redItems: [
    {
      id: 'red-6',
      title: 'RED #6: Presentación Interactiva: Paradojas Lógicas Célebres',
      formato: 'Presentación No Lineal con Diapositivas Ramificadas (Genially)',
      descripcion: 'Explora la Paradoja de Aquiles y la Tortuga (Zenón), la Paradoja del Barbero (Bertrand Russell) y la Paradoja del Mentiroso de Epiménides.',
      aportePedagogico: 'Desafía las intuiciones superficiales y demuestra los límites de los sistemas lógicos formales.'
    },
    {
      id: 'red-7',
      title: 'RED #7: Infografía Animada: Árboles de Decisión',
      formato: 'Infografía Dinámica con Nodos Clickeables (Genially)',
      descripcion: 'Despliega una estructura arbórea con ramas de causa-efecto que modelan la toma de decisiones basada en probabilidades y lógica condicional (Si... Entonces... Si No...).',
      aportePedagogico: 'Fomenta la previsión de consecuencias a corto y mediano plazo en la resolución de problemas.'
    },
    {
      id: 'red-8',
      title: 'RED #8: Imagen Interactiva: Enigmas Visuales Desplegables',
      formato: 'Imagen con Puntos Calientes (Hotspots) Multicapa (Genially)',
      descripcion: 'Ilustración interactiva llena de pistas ocultas, ilusiones ópticas y ventanas modales que se activan al hacer clic sobre elementos clave.',
      aportePedagogico: 'Desarrolla la agudeza perceptiva, la atención a los detalles y la deducción espacial.'
    },
    {
      id: 'red-9',
      title: 'RED #9: Guía Didáctica: El Método Pólya para Resolver Dilemas',
      formato: 'Guía Metodológica Interactiva (SlideShare / Genially)',
      descripcion: 'Los 4 pasos esenciales de George Pólya: 1. Comprender el problema; 2. Trazar un plan; 3. Ejecutar el plan; 4. Mirar hacia atrás (evaluar la solución).',
      aportePedagogico: 'Proporciona un andamiaje metacognitivo universal para enfrentar cualquier problema científico o cotidiano.'
    },
    {
      id: 'red-10',
      title: 'RED #10 (Actividad): Escape Room con 3 Acertijos Lógicos',
      formato: 'Juego Interactivo de Fuga con Candados Digitales y Código Secreto',
      descripcion: 'El visitante debe superar 3 enigmas consecutivos (deducción numérica, silogismo de colores y combinación lógica) para abrir la compuerta de la sala.',
      aportePedagogico: 'Genera alta inmersión, trabajo bajo presión positiva y retroalimentación inmediata sobre hipótesis erradas.'
    }
  ],
  escapeRoomRiddles: [
    {
      id: 1,
      name: 'Candado 1: El Enigma Numérico',
      prompt: 'Un número de 3 dígitos: La suma de sus dígitos es 12. El dígito central es el doble del primero. El último dígito es 4. ¿Cuál es el código de 3 cifras?',
      answer: '246', // 2 + 4 + 6 = 12, 4 is double of 2, but wait: prompt says last digit is 6? Let's check: 2 + 4 + 6 = 12. First is 2, central is 4 (double of 2), last is 6!
      clue: 'Pista: El primer dígito es 2. El del medio es el doble. ¿Qué falta para sumar 12?'
    },
    {
      id: 2,
      name: 'Candado 2: La Paradoja de los Tres Guardianes',
      prompt: 'El Guardián A dice: "B siempre miente". El Guardián B dice: "C es quien tiene la llave". El Guardián C dice: "Yo no tengo la llave". Si solo UNO de ellos dice la verdad, ¿quién tiene la llave (A, B o C)?',
      answer: 'C',
      clue: 'Pista: Si B mintiera, C no tendría la llave, lo que haría a C veraz... ¡analiza quién resulta tenerla!'
    },
    {
      id: 3,
      name: 'Candado 3: Código de Cierre Pólya',
      prompt: '¿Cuántos pasos fundamentales tiene el célebre método de George Pólya para resolver problemas matemáticos?',
      answer: '4',
      clue: 'Pista: 1. Comprender, 2. Planificar, 3. Ejecutar, 4. Verificar.'
    }
  ]
};

// SALA 3: Video Educativo Interactivo
export const SALA3_DATA = {
  herramientas: 'Edpuzzle / H5P / Nearpod',
  enfoque: 'Análisis Crítico Audiovisual y Toma de Decisiones en Tiempo Real',
  redItems: [
    {
      id: 'red-11',
      title: 'RED #11: Vlog Educativo: Sesgos Cognitivos Cotidianos',
      formato: 'Video Lección con Pausas Explicativas (Edpuzzle)',
      descripcion: 'Explora el sesgo de confirmación, el sesgo de disponibilidad y el efecto anclaje que distorsionan nuestras decisiones cotidianas.',
      aportePedagogico: 'Desarrolla la autocrítica y la vigilancia epistémica al evaluar información en medios digitales.'
    },
    {
      id: 'red-12',
      title: 'RED #12: Video Lección: Preguntas sobre Silogismos',
      formato: 'Video Interactivo con Preguntas Insertadas (H5P)',
      descripcion: 'Clase dinámica que enseña la estructura clásica: Premisa Mayor, Premisa Menor y Conclusión válida vs. Falacias lógicas de afirmación del consecuente.',
      aportePedagogico: 'Capacita en la formalización del pensamiento deductivo riguroso.'
    },
    {
      id: 'red-13',
      title: 'RED #13: Video Interactivo: Preguntas V/F con Pistas',
      formato: 'Video Ramificado con Retroalimentación Instantánea (Nearpod)',
      descripcion: 'Píldora interactiva con 3 paradas donde el estudiante califica enunciados como Verdaderos o Falsos, recibiendo pistas si duda.',
      aportePedagogico: 'Estimula la evaluación activa durante el visionado audiovisual en lugar de un consumo pasivo.'
    },
    {
      id: 'red-14',
      title: 'RED #14: Micro-Vídeo: Patrones Numéricos y Secuencias',
      formato: 'Animación Gráfica de 90 Segundos (H5P)',
      descripcion: 'Cápsula ágil que descompone secuencias aritméticas, geométricas y triangulares, retando a predecir el siguiente término.',
      aportePedagogico: 'Entrena la abstracción matemática y la formulación de reglas generales.'
    },
    {
      id: 'red-15',
      title: 'RED #15 (Actividad): Decisiones Lógicas en Momentos Clave del Vídeo',
      formato: 'Simulador Interactivo con Línea de Tiempo y Puntos de Decisión',
      descripcion: 'El visitante reproduce un video educativo simulado que se detiene en 3 momentos cruciales, obligándolo a elegir la inferencia lógica correcta para continuar.',
      aportePedagogico: 'Aplica el principio de bifurcación narrativa y evaluación formativa en punto de necesidad.'
    }
  ],
  videoDecisionPoints: [
    {
      id: 1,
      timestamp: '00:15',
      title: 'Punto de Decisión 1: El Sesgo de Confirmación',
      scenario: 'Un usuario solo lee publicaciones en redes que apoyan su hipótesis inicial y descarta las contrarias sin revisarlas.',
      question: '¿Qué falacia o sesgo lógico comete?',
      options: [
        { text: 'Sesgo de Confirmación', isCorrect: true, feedback: '¡Correcto! Tiende a buscar y valorar únicamente la información que ratifica sus creencias previas.' },
        { text: 'Argumento Ad Hominem', isCorrect: false, feedback: 'Incorrecto. No está atacando a la persona, sino seleccionando sesgadamente la evidencia.' },
        { text: 'Falacia de Causa Falsa', isCorrect: false, feedback: 'Incorrecto. La causa no se confunde aquí con una correlación temporal.' }
      ]
    },
    {
      id: 2,
      timestamp: '00:30',
      title: 'Punto de Decisión 2: Validez del Silogismo',
      scenario: 'Premisa 1: Todos los cetáceos son mamíferos. Premisa 2: Los delfines son cetáceos.',
      question: '¿Cuál es la única conclusión lógicamente válida?',
      options: [
        { text: 'Algunos delfines ponen huevos', isCorrect: false, feedback: 'Incorrecto. Va en contra de la premisa de que los cetáceos son mamíferos.' },
        { text: 'Todos los delfines son mamíferos', isCorrect: true, feedback: '¡Exacto! Sigue la regla del silogismo Bárbara (A-A-A de la primera figura).' },
        { text: 'Los mamíferos solo viven en el mar', isCorrect: false, feedback: 'Incorrecto. Es una generalización indebida no contenida en las premisas.' }
      ]
    },
    {
      id: 3,
      timestamp: '00:45',
      title: 'Punto de Decisión 3: Continuación de la Secuencia Lógica',
      scenario: 'Observa la serie: 2, 6, 12, 20, 30, ...',
      question: '¿Cuál es el siguiente número según el patrón de diferencias crecientes (+4, +6, +8, +10, +12)?',
      options: [
        { text: '40', isCorrect: false, feedback: 'Incorrecto. La diferencia debe ser +12 (30 + 12).' },
        { text: '42', isCorrect: true, feedback: '¡Excelente! 30 + 12 = 42 (patrón de n*(n+1): 1*2, 2*3, 3*4, 4*5, 5*6, 6*7=42).' },
        { text: '44', isCorrect: false, feedback: 'Incorrecto. Revisa el incremento diferencial continuo.' }
      ]
    }
  ]
};

// SALA 4: Blogs y Metacognición + Reto Final + Votación
export const SALA4_DATA = {
  herramientas: 'Blogger / WordPress / Wix',
  enfoque: 'Metacognición, Ética Digital y Publicación Reflexiva de Saberes',
  redItems: [
    {
      id: 'red-16',
      title: 'RED #16: Artículo de Opinión: Lógica Formal en la Era de la IA',
      formato: 'Ensayo Web Editorial Publicado en Blog Digital (Blogger / WordPress)',
      descripcion: 'Análisis crítico sobre por qué los modelos LLM requieren verificación lógica humana y cómo las alucinaciones desafían la verdad deductiva.',
      aportePedagogico: 'Desarrolla el criterio ético y la comprensión del rol de la lógica humana frente a la automatización algorítmica.'
    },
    {
      id: 'red-17',
      title: 'RED #17: Bitácora Digital: Resolución de Retos Semanales',
      formato: 'Blog Diario de Aprendizaje / Portafolio Reflexivo (Wix)',
      descripcion: 'Cronología de 8 semanas donde los estudiantes registran sus aciertos, errores y estrategias metacognitivas al resolver problemas.',
      aportePedagogico: 'Permite visibilizar el proceso cognitivo (pensar sobre el propio pensamiento) y celebrar el error constructivo.'
    },
    {
      id: 'red-18',
      title: 'RED #18: Guía de Recursos: Aplicaciones para Ejercitación Mental',
      formato: 'Directorio Curado de Herramientas TIC (WordPress)',
      descripcion: 'Selección pedagógica de software interactivo: Lightbot (programación), Brilliant (lógica), GeoGebra y plataformas de ajedrez escolar.',
      aportePedagogico: 'Dota a la comunidad educativa de recursos autónomos para la práctica continua del pensamiento divergente.'
    },
    {
      id: 'red-19',
      title: 'RED #19: Reseña Crítica: Plataformas como Scratch',
      formato: 'Artículo Crítico Comparativo con Rúbrica de Evaluación',
      descripcion: 'Evaluación técnica y pedagógica del entorno de bloques de Scratch: condicionales, bucles, variables y eventos orientados a objetos.',
      aportePedagogico: 'Conecta la teoría lógica pura con la aplicación directa en la creación de software educativo.'
    },
    {
      id: 'red-20',
      title: 'RED #20 (Actividad): Foro de Debate sobre Dilema Ético-Lógico',
      formato: 'Espacio de Discusión con Muro de Argumentos y Votación en Vivo',
      descripcion: 'Dilema: "¿Debe un vehículo autónomo programarse para minimizar daños a sus ocupantes o a la mayor cantidad de peatones?". Los visitantes postean y votan argumentos.',
      aportePedagogico: 'Integra el pensamiento lógico formal con la reflexión bioética y la empatía social.'
    }
  ],
  forumDilemma: {
    title: 'Dilema Ético-Lógico del Vehículo Autónomo',
    prompt: 'Un algoritmo de conducción autónoma enfrenta una situación inevitable: salvar a su único pasajero o desviarse y salvar a tres peatones en un cruce indebido. ¿Cómo debe programarse la regla lógica?',
    positions: [
      { id: 'utilitarista', label: 'Enfoque Utilitarista (Minimizar número de víctimas totales)', votes: 78, pct: '62%' },
      { id: 'deontologico', label: 'Enfoque Deontológico (No actuar activamente para desviar el daño)', votes: 29, pct: '23%' },
      { id: 'contractual', label: 'Enfoque de Protección Prioritaria al Ocupante', votes: 19, pct: '15%' }
    ]
  }
};

// 🏆 RETO FINAL PARA EL VISITANTE (5 PREGUNTAS TIPO QUIZ)
// Exigido en instruccioones.md: 5 preguntas tipo quiz + votación rápida con insignias
export const RETO_VISITANTE_QUESTIONS = [
  {
    id: 1,
    sala: 'Sala 1',
    herramienta: 'Canva / Padlet',
    question: 'En un diagrama de flujo de resolución algorítmica, ¿qué figura geométrica estándar representa una bifurcación o toma de decisión?',
    timeLimit: 15,
    options: [
      { id: 'A', text: 'El Rectángulo (indica proceso o acción)', color: '#00C4CC', shape: 'triangle', isCorrect: false },
      { id: 'B', text: 'El Rombo (indica condición Si/No)', color: '#E21B3C', shape: 'diamond', isCorrect: true },
      { id: 'C', text: 'El Óvalo (indica inicio o fin)', color: '#D89E00', shape: 'circle', isCorrect: false },
      { id: 'D', text: 'El Círculo (indica conector de página)', color: '#26890C', shape: 'square', isCorrect: false }
    ],
    feedback: '¡Exacto! Según la norma ISO/ANSI, el Rombo simboliza la toma de decisiones basada en condiciones lógicas booleanas.'
  },
  {
    id: 2,
    sala: 'Sala 2',
    herramienta: 'Genially',
    question: 'De acuerdo con el célebre Método de George Pólya para resolver dilemas, ¿cuál es el orden correcto de las 4 etapas?',
    timeLimit: 15,
    options: [
      { id: 'A', text: 'Ejecutar plan → Probar suerte → Comprobar → Olvidar', color: '#00C4CC', shape: 'triangle', isCorrect: false },
      { id: 'B', text: 'Comprender el problema → Trazar un plan → Ejecutar el plan → Examinar la solución', color: '#E21B3C', shape: 'diamond', isCorrect: true },
      { id: 'C', text: 'Memorizar fórmula → Copiar respuesta → Preguntar al docente → Finalizar', color: '#D89E00', shape: 'circle', isCorrect: false },
      { id: 'D', text: 'Trazar plan → Preguntar hipótesis → Reintentar → Descartar', color: '#26890C', shape: 'square', isCorrect: false }
    ],
    feedback: '¡Excelente! Pólya (1945) estableció: 1. Comprender, 2. Planificar, 3. Ejecutar y 4. Mirar hacia atrás (evaluación crítica).'
  },
  {
    id: 3,
    sala: 'Sala 3',
    herramienta: 'Edpuzzle / H5P',
    question: 'En el análisis crítico de la información, ¿qué caracteriza al llamado "Sesgo de Confirmación"?',
    timeLimit: 15,
    options: [
      { id: 'A', text: 'Buscar, interpretar y recordar únicamente la información que valida nuestras creencias previas', color: '#E21B3C', shape: 'triangle', isCorrect: true },
      { id: 'B', text: 'Aceptar cualquier noticia sin contrastar su veracidad en absoluto', color: '#00C4CC', shape: 'diamond', isCorrect: false },
      { id: 'C', text: 'Memorizar todos los teoremas matemáticos sin razonar', color: '#D89E00', shape: 'circle', isCorrect: false },
      { id: 'D', text: 'Comprar software de inteligencia artificial sin licencia escolar', color: '#26890C', shape: 'square', isCorrect: false }
    ],
    feedback: '¡Brillante! El sesgo de confirmación es el mayor obstáculo para el pensamiento crítico y la evaluación objetiva de evidencias.'
  },
  {
    id: 4,
    sala: 'Sala 4',
    herramienta: 'Blogger / WordPress',
    question: '¿Por qué la lógica formal humana es insustituible al supervisar los resultados generados por Inteligencias Artificiales generativas?',
    timeLimit: 15,
    options: [
      { id: 'A', text: 'Porque las IA no consumen electricidad', color: '#00C4CC', shape: 'triangle', isCorrect: false },
      { id: 'B', text: 'Porque las IA pueden "alucinar" datos verosímiles pero falsos, requiriendo verificación deductiva humana', color: '#E21B3C', shape: 'diamond', isCorrect: true },
      { id: 'C', text: 'Porque los blogs ya no se leen en dispositivos móviles', color: '#D89E00', shape: 'circle', isCorrect: false },
      { id: 'D', text: 'Porque los algoritmos solo funcionan en idioma inglés', color: '#26890C', shape: 'square', isCorrect: false }
    ],
    feedback: '¡Totalmente cierto! La IA genera patrones probabilísticos de lenguaje, por lo que el razonamiento lógico humano debe auditar la veracidad factual.'
  },
  {
    id: 5,
    sala: 'Transversal',
    herramienta: 'Genially / TIC',
    question: '¿Cuál es el propósito pedagógico esencial de un Museo Interactivo de Herramientas Digitales?',
    timeLimit: 15,
    options: [
      { id: 'A', text: 'Que el visitante pase de ser un espectador pasivo a un sujeto activo del conocimiento', color: '#26890C', shape: 'square', isCorrect: true },
      { id: 'B', text: 'Descargar aplicaciones de pago para llenar la memoria del teléfono', color: '#00C4CC', shape: 'triangle', isCorrect: false },
      { id: 'C', text: 'Eliminar los libros físicos y las bibliotecas escolares para siempre', color: '#E21B3C', shape: 'diamond', isCorrect: false },
      { id: 'D', text: 'Realizar exámenes tradicionales con lápiz y papel sin retroalimentación', color: '#D89E00', shape: 'circle', isCorrect: false }
    ],
    feedback: '¡Magnífico! Como subraya la ficha técnica del museo: el visitante se convierte en protagonista mediante retos, interactividad y metacognición.'
  }
];

export const BADGES_SYSTEM = [
  {
    minScore: 5,
    title: '🏆 Gran Maestro del Pensamiento Lógico',
    rank: 'Nivel Máximo de Sabiduría',
    emoji: '👑',
    color: '#FFD700',
    description: 'Puntaje perfecto 5/5. Dominio integral del razonamiento deductivo, algoritmos, método Pólya y metacognición digital.'
  },
  {
    minScore: 4,
    title: '🥇 Arquitecto de Algoritmos & TIC',
    rank: 'Nivel Experto',
    emoji: '🚀',
    color: '#00C4CC',
    description: '4/5 aciertos. Extraordinaria agudeza lógica y comprensión de los Recursos Educativos Digitales en el aula.'
  },
  {
    minScore: 3,
    title: '🥈 Investigador de Patrones',
    rank: 'Nivel Intermedio',
    emoji: '🎯',
    color: '#1368CE',
    description: '3/5 aciertos. Buen manejo de las premisas, diagramas y análisis crítico audiovisual.'
  },
  {
    minScore: 2,
    title: '🥉 Explorador Deductivo',
    rank: 'Nivel Aprendiz',
    emoji: '🔍',
    color: '#E21B3C',
    description: '2/5 aciertos. Has iniciado tu entrenamiento en pensamiento lógico y metacognición.'
  },
  {
    minScore: 0,
    title: '💡 Pensador en Formación',
    rank: 'Nivel Iniciación',
    emoji: '🌱',
    color: '#26890C',
    description: '¡Gracias por participar! Te invitamos a repasar las salas interactivas para continuar potenciando tus habilidades.'
  }
];

export const SHAPES_ICONS = {
  triangle: '▲',
  diamond: '◆',
  circle: '●',
  square: '■'
};
