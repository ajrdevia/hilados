/* =========================================================
   HILADOS — script.js
   Juego de palabras: se debe cubrir toda la grilla con una
   cadena continua de letras adyacentes que forma las palabras
   temáticas del nivel, en orden, sin dejar celdas sueltas.
   ========================================================= */

/* ---------------------------------------------------------
   1) DATOS DE NIVELES (10 niveles, ya armados)
   Cada nivel define: tema, ícono, tamaño de grilla y la lista
   de palabras cuya suma de letras es EXACTAMENTE rows*cols.
   --------------------------------------------------------- */
const LEVELS_DATA = [
  { id: 1,  theme: 'Cocina',       icon: '🍳', rows: 3, cols: 3, words: ['PAN', 'SAL', 'AJI'] },                                   // 3+3+3=9
  { id: 2,  theme: 'Animales',     icon: '🐾', rows: 4, cols: 4, words: ['GATO', 'PERRO', 'OSO', 'LOBO'] },                         // 4+5+3+4=16
  { id: 3,  theme: 'Playa',        icon: '🏖️', rows: 4, cols: 4, words: ['SOL', 'MAR', 'ISLA', 'TOALLA'] },                        // 3+3+4+6=16
  { id: 4,  theme: 'Oficina',      icon: '🗂️', rows: 5, cols: 5, words: ['SILLA', 'MESA', 'PAPEL', 'LAPIZ', 'GRAPAS'] },           // 5+4+5+5+6=25
  { id: 5,  theme: 'Espacio',      icon: '🚀', rows: 5, cols: 5, words: ['LUZ', 'ASTRO', 'MARTE', 'COMETA', 'ORBITA'] },            // 3+5+5+6+6=25
  { id: 6,  theme: 'Música',       icon: '🎵', rows: 6, cols: 6, words: ['PIANO', 'GUITARRA', 'TAMBOR', 'FLAUTA', 'VIOLIN', 'RITMO'] }, // 5+8+6+6+6+5=36
  { id: 7,  theme: 'Deportes',     icon: '⚽', rows: 6, cols: 6, words: ['FUTBOL', 'TENIS', 'BOXEO', 'GOLF', 'RUGBY', 'JUDO', 'ESGRIMA'] }, // 6+5+5+4+5+4+7=36
  { id: 8,  theme: 'Naturaleza',   icon: '🌿', rows: 6, cols: 6, words: ['ARBOL', 'RIO', 'PLANTA', 'HOJA', 'BOSQUE', 'TIERRA', 'VIENTO'] }, // 5+3+6+4+6+6+6=36
  { id: 9,  theme: 'Cine y Arte',  icon: '🎬', rows: 6, cols: 6, words: ['CINE', 'ACTOR', 'PINTURA', 'CAMARA', 'GUION', 'ESCENA', 'ROL'] }, // 4+5+7+6+5+6+3=36
  { id: 10, theme: 'Tecnología',   icon: '💻', rows: 6, cols: 6, words: ['CABLE', 'DATOS', 'ROBOT', 'TECLADO', 'PANTALLA', 'CODIGO'] },     // 5+5+5+7+8+6=36

  /* --- Niveles 11 a 150: generados con un banco de ~35 temas y verificados
     con un script (suma de letras == celdas de la grilla, sin duplicados)
     para que cada uno cargue de una sola vez, sin cálculos en tiempo real --- */
  { id: 11, theme: 'Cocina', icon: '🍳', rows: 6, cols: 6, words: ['SAL', 'MANTEL', 'ACEITE', 'PLATO', 'ARROZ', 'AZUCAR', 'LECHE'] },
  { id: 12, theme: 'Animales', icon: '🐾', rows: 6, cols: 6, words: ['CABALLO', 'ELEFANTE', 'RATON', 'PANTERA', 'COYOTE', 'OSO'] },
  { id: 13, theme: 'Playa', icon: '🏖️', rows: 6, cols: 6, words: ['VERANO', 'BALDE', 'CONCHA', 'OLA', 'SOL', 'GAVIOTA', 'BIKINI'] },
  { id: 14, theme: 'Oficina', icon: '🗂️', rows: 6, cols: 6, words: ['FOLIO', 'CINTA', 'MESA', 'GRAPAS', 'JEFE', 'PAPEL', 'ARCHIVO'] },
  { id: 15, theme: 'Espacio', icon: '🚀', rows: 6, cols: 6, words: ['SATELITE', 'ASTEROIDE', 'ORBITA', 'NAVE', 'ASTRO', 'LUNA'] },
  { id: 16, theme: 'Musica', icon: '🎵', rows: 6, cols: 6, words: ['ACORDE', 'RITMO', 'TROMPETA', 'ARPA', 'CORO', 'BANDA', 'NOTA'] },
  { id: 17, theme: 'Deportes', icon: '⚽', rows: 6, cols: 6, words: ['TENIS', 'MARATON', 'ARQUERO', 'NATACION', 'GOLF', 'VOLEY'] },
  { id: 18, theme: 'Naturaleza', icon: '🌿', rows: 6, cols: 6, words: ['RAMA', 'VALLE', 'FLOR', 'RIO', 'ARBOL', 'TIERRA', 'ROCIO', 'RAIZ'] },
  { id: 19, theme: 'Cine y Arte', icon: '🎬', rows: 6, cols: 6, words: ['ACTRIZ', 'GALERIA', 'PALETA', 'CINE', 'GUION', 'TRAMA', 'ROL'] },
  { id: 20, theme: 'Tecnologia', icon: '💻', rows: 6, cols: 6, words: ['PANTALLA', 'TECLADO', 'CODIGO', 'RED', 'SERVIDOR', 'NUBE'] },
  { id: 21, theme: 'Colores', icon: '🎨', rows: 6, cols: 6, words: ['NEGRO', 'PLATEADO', 'BLANCO', 'GRIS', 'AMARILLO', 'VERDE'] },
  { id: 22, theme: 'Frutas', icon: '🍎', rows: 6, cols: 6, words: ['LIMON', 'MELON', 'MANGO', 'UVA', 'BANANA', 'POMELO', 'SANDIA'] },
  { id: 23, theme: 'Verduras', icon: '🥕', rows: 6, cols: 6, words: ['PAPA', 'PUERRO', 'REMOLACHA', 'PEREJIL', 'PEPINO', 'APIO'] },
  { id: 24, theme: 'Ropa', icon: '👕', rows: 6, cols: 6, words: ['CAMISA', 'BOTA', 'SHORT', 'CINTURON', 'TRAJE', 'PANTALON'] },
  { id: 25, theme: 'Cuerpo Humano', icon: '🧍', rows: 6, cols: 6, words: ['BRAZO', 'MANO', 'CINTURA', 'HOMBRO', 'PIE', 'DEDO', 'ESPALDA'] },
  { id: 26, theme: 'Familia', icon: '👪', rows: 6, cols: 6, words: ['SOBRINO', 'NIETO', 'TIO', 'HIJO', 'SUEGRO', 'PADRE', 'ABUELA'] },
  { id: 27, theme: 'Escuela', icon: '📚', rows: 6, cols: 6, words: ['TIZA', 'ALUMNO', 'GOMA', 'EXAMEN', 'PIZARRON', 'CUADERNO'] },
  { id: 28, theme: 'Ciudad', icon: '🏙️', rows: 6, cols: 6, words: ['TERMINAL', 'ESQUINA', 'ESTACION', 'AVENIDA', 'PUENTE'] },
  { id: 29, theme: 'Clima', icon: '🌦️', rows: 6, cols: 6, words: ['NEBLINA', 'TEMPESTAD', 'FRIO', 'NIEVE', 'NUBE', 'GRANIZO'] },
  { id: 30, theme: 'Transporte', icon: '🚗', rows: 6, cols: 6, words: ['COLECTIVO', 'TAXI', 'CAMION', 'CARRETA', 'SUBTE', 'BARCO'] },
  { id: 31, theme: 'Herramientas', icon: '🔧', rows: 6, cols: 6, words: ['DESTORNILLADOR', 'TORNILLO', 'LLAVE', 'LIJA', 'NIVEL'] },
  { id: 32, theme: 'Profesiones', icon: '👷', rows: 6, cols: 6, words: ['MAESTRO', 'MEDICO', 'ENFERMERO', 'PILOTO', 'DENTISTA'] },
  { id: 33, theme: 'Emociones', icon: '😊', rows: 6, cols: 6, words: ['ALEGRIA', 'CALMA', 'TRISTEZA', 'NOSTALGIA', 'TERNURA'] },
  { id: 34, theme: 'Geografia', icon: '🗺️', rows: 6, cols: 6, words: ['MESETA', 'ISLA', 'POLO', 'LLANURA', 'VALLE', 'RIO', 'ECUADOR'] },
  { id: 35, theme: 'Insectos', icon: '🐝', rows: 6, cols: 6, words: ['GRILLO', 'TERMITA', 'ESCARABAJO', 'MOSQUITO', 'ABEJA'] },
  { id: 36, theme: 'Aves', icon: '🦜', rows: 6, cols: 6, words: ['CIGUENA', 'PINGUINO', 'TUCAN', 'LORO', 'AGUILA', 'CONDOR'] },
  { id: 37, theme: 'Mar', icon: '🐠', rows: 6, cols: 6, words: ['ARRECIFE', 'CORAL', 'ESTRELLA', 'FOCA', 'CANGREJO', 'PEZ'] },
  { id: 38, theme: 'Granja', icon: '🐄', rows: 6, cols: 6, words: ['HENO', 'CABRA', 'GALLINA', 'GANSO', 'VACA', 'ARADO', 'CORRAL'] },
  { id: 39, theme: 'Fiesta', icon: '🎉', rows: 6, cols: 6, words: ['GUIRNALDA', 'SORPRESA', 'PINATA', 'REGALO', 'CONFETI'] },
  { id: 40, theme: 'Matematica', icon: '🔢', rows: 6, cols: 6, words: ['DIVISION', 'GRAFICO', 'RESTA', 'FRACCION', 'CUADRADO'] },
  { id: 41, theme: 'Historia', icon: '🏛️', rows: 7, cols: 7, words: ['CASTILLO', 'MONUMENTO', 'ESPADA', 'TRONO', 'BATALLA', 'ARQUEOLOGIA', 'REY'] },
  { id: 42, theme: 'Literatura', icon: '📖', rows: 7, cols: 7, words: ['METAFORA', 'VERSO', 'PERSONAJE', 'TRAMA', 'LEYENDA', 'LIBRO', 'AUTOR', 'POEMA'] },
  { id: 43, theme: 'Astronomia', icon: '🔭', rows: 7, cols: 7, words: ['CONSTELACION', 'ESTRELLA', 'CRATER', 'SUPERNOVA', 'ORBITA', 'SATELITE'] },
  { id: 44, theme: 'Salud', icon: '🏥', rows: 7, cols: 7, words: ['ANALISIS', 'CIRUGIA', 'DIAGNOSTICO', 'MEDICO', 'RECETA', 'CONSULTORIO'] },
  { id: 45, theme: 'Construccion', icon: '🏗️', rows: 7, cols: 7, words: ['EXCAVADORA', 'CEMENTO', 'CAL', 'PARED', 'OBRERO', 'PLANO', 'ANDAMIO', 'PALETA'] },
  { id: 46, theme: 'Videojuegos', icon: '🎮', rows: 7, cols: 7, words: ['JOYSTICK', 'PIXEL', 'MANDO', 'PERSONAJE', 'ESTRATEGIA', 'NIVEL', 'CONSOLA'] },
  { id: 47, theme: 'Moda', icon: '👗', rows: 7, cols: 7, words: ['CREMALLERA', 'MODELO', 'BOTON', 'PASARELA', 'DISENADOR', 'ESTILO', 'TALLA'] },
  { id: 48, theme: 'Ecologia', icon: '🌍', rows: 7, cols: 7, words: ['CONSERVACION', 'CLIMA', 'ECOSISTEMA', 'ESPECIE', 'AMBIENTE', 'HABITAT'] },
  { id: 49, theme: 'Cocina', icon: '🍳', rows: 7, cols: 7, words: ['LECHE', 'SOPA', 'HARINA', 'SARTEN', 'QUESO', 'OLLA', 'ARROZ', 'PLATO', 'PAN', 'ACEITE'] },
  { id: 50, theme: 'Animales', icon: '🐾', rows: 7, cols: 7, words: ['CEBRA', 'MONO', 'PUMA', 'FOCA', 'LEON', 'LOBO', 'COYOTE', 'PERRO', 'CONEJO', 'CANGURO'] },
  { id: 51, theme: 'Playa', icon: '🏖️', rows: 7, cols: 7, words: ['BRISA', 'COSTA', 'MAR', 'BALDE', 'OLA', 'SOL', 'MUELLE', 'ISLA', 'CONCHA', 'BOTE', 'BARCA'] },
  { id: 52, theme: 'Oficina', icon: '🗂️', rows: 7, cols: 7, words: ['MOUSE', 'SILLA', 'REUNION', 'EMAIL', 'LAPIZ', 'SELLO', 'TECLADO', 'CALENDARIO'] },
  { id: 53, theme: 'Espacio', icon: '🚀', rows: 7, cols: 7, words: ['SATELITE', 'COHETE', 'ASTEROIDE', 'NAVE', 'VENUS', 'ECLIPSE', 'COMETA', 'LUNA'] },
  { id: 54, theme: 'Musica', icon: '🎵', rows: 7, cols: 7, words: ['CONCIERTO', 'ACORDE', 'NOTA', 'ARPA', 'GUITARRA', 'ORQUESTA', 'CANTO', 'RITMO'] },
  { id: 55, theme: 'Deportes', icon: '⚽', rows: 7, cols: 7, words: ['JUDO', 'REMO', 'SURF', 'EQUIPO', 'VOLEY', 'GOLF', 'RUGBY', 'FUTBOL', 'TENIS', 'KARATE'] },
  { id: 56, theme: 'Naturaleza', icon: '🌿', rows: 7, cols: 7, words: ['RIO', 'PLANTA', 'PRADERA', 'SELVA', 'MONTANA', 'BOSQUE', 'NIEBLA', 'LAGO', 'ARBOL'] },
  { id: 57, theme: 'Cine y Arte', icon: '🎬', rows: 7, cols: 7, words: ['ACTRIZ', 'CAMARA', 'TALLER', 'PANTALLA', 'MUSEO', 'LIENZO', 'RETRATO', 'TRAMA'] },
  { id: 58, theme: 'Tecnologia', icon: '💻', rows: 7, cols: 7, words: ['ROBOT', 'ALGORITMO', 'ARCHIVO', 'NUBE', 'DATOS', 'SERVIDOR', 'RED', 'DRON', 'CHIP'] },
  { id: 59, theme: 'Colores', icon: '🎨', rows: 7, cols: 7, words: ['NEGRO', 'VERDE', 'AMARILLO', 'MARRON', 'ROSA', 'GRIS', 'NARANJA', 'BLANCO', 'AZUL'] },
  { id: 60, theme: 'Frutas', icon: '🍎', rows: 7, cols: 7, words: ['HIGO', 'PALTA', 'CEREZA', 'UVA', 'PERA', 'POMELO', 'SANDIA', 'CIRUELA', 'FRUTILLA'] },
  { id: 61, theme: 'Verduras', icon: '🥕', rows: 7, cols: 7, words: ['ZANAHORIA', 'PEREJIL', 'BROCOLI', 'PEPINO', 'LECHUGA', 'PAPA', 'AJO', 'PUERRO'] },
  { id: 62, theme: 'Ropa', icon: '👕', rows: 7, cols: 7, words: ['PIJAMA', 'BOTA', 'GORRO', 'CAMISA', 'CINTURON', 'SHORT', 'TRAJE', 'MEDIAS', 'SACO'] },
  { id: 63, theme: 'Cuerpo Humano', icon: '🧍', rows: 7, cols: 7, words: ['MANO', 'CODO', 'PECHO', 'MENTON', 'DEDO', 'OJO', 'CABEZA', 'OREJA', 'BRAZO', 'BOCA', 'PIE'] },
  { id: 64, theme: 'Familia', icon: '👪', rows: 7, cols: 7, words: ['HIJO', 'HIJA', 'PARIENTE', 'PADRE', 'TIO', 'ABUELO', 'FAMILIA', 'HERMANO', 'MADRE'] },
  { id: 65, theme: 'Escuela', icon: '📚', rows: 7, cols: 7, words: ['MAESTRO', 'TAREA', 'RECREO', 'LAPIZ', 'REGLA', 'EXAMEN', 'CUADERNO', 'PUPITRE'] },
  { id: 66, theme: 'Ciudad', icon: '🏙️', rows: 7, cols: 7, words: ['TERMINAL', 'PARQUE', 'VEREDA', 'SEMAFORO', 'BARRIO', 'TRANSITO', 'AVENIDA'] },
  { id: 67, theme: 'Clima', icon: '🌦️', rows: 7, cols: 7, words: ['GRANIZO', 'NIEVE', 'NEBLINA', 'LLUVIA', 'TEMPESTAD', 'CALOR', 'HUMEDAD', 'SOL'] },
  { id: 68, theme: 'Transporte', icon: '🚗', rows: 7, cols: 7, words: ['TRINEO', 'TAXI', 'CAMION', 'AUTO', 'TRANVIA', 'HELICOPTERO', 'BICI', 'CARRETA'] },
  { id: 69, theme: 'Herramientas', icon: '🔧', rows: 7, cols: 7, words: ['MARTILLO', 'TENAZA', 'LLAVE', 'NIVEL', 'PINZA', 'SIERRA', 'DESTORNILLADOR'] },
  { id: 70, theme: 'Profesiones', icon: '👷', rows: 7, cols: 7, words: ['POLICIA', 'PANADERO', 'PERIODISTA', 'PINTOR', 'INGENIERO', 'ENFERMERO'] },
  { id: 71, theme: 'Emociones', icon: '😊', rows: 7, cols: 7, words: ['NOSTALGIA', 'VERGUENZA', 'ALEGRIA', 'ORGULLO', 'CONFIANZA', 'ANSIEDAD'] },
  { id: 72, theme: 'Geografia', icon: '🗺️', rows: 7, cols: 7, words: ['ARCHIPIELAGO', 'DESIERTO', 'OCEANO', 'MESETA', 'POLO', 'RIO', 'CONTINENTE'] },
  { id: 73, theme: 'Insectos', icon: '🐝', rows: 7, cols: 7, words: ['HORMIGA', 'MARIPOSA', 'MOSCA', 'ORUGA', 'ABEJA', 'LUCIERNAGA', 'CUCARACHA'] },
  { id: 74, theme: 'Aves', icon: '🦜', rows: 7, cols: 7, words: ['CUERVO', 'BUHO', 'TUCAN', 'CANARIO', 'COLIBRI', 'AVESTRUZ', 'HALCON', 'AGUILA'] },
  { id: 75, theme: 'Mar', icon: '🐠', rows: 7, cols: 7, words: ['FOCA', 'PEZ', 'CALAMAR', 'ARRECIFE', 'CANGREJO', 'CARACOL', 'ALGA', 'ESTRELLA'] },
  { id: 76, theme: 'Granja', icon: '🐄', rows: 7, cols: 7, words: ['OVEJA', 'PATO', 'TRACTOR', 'CABALLO', 'GALLINA', 'CABRA', 'ARADO', 'HENO', 'PASTO'] },
  { id: 77, theme: 'Fiesta', icon: '🎉', rows: 7, cols: 7, words: ['BAILE', 'TORTA', 'DISFRAZ', 'INVITADO', 'GLOBO', 'VELA', 'SORPRESA', 'BRINDIS'] },
  { id: 78, theme: 'Matematica', icon: '🔢', rows: 7, cols: 7, words: ['ANGULO', 'DIVISION', 'FRACCION', 'CALCULO', 'NUMERO', 'FORMULA', 'GRAFICO'] },
  { id: 79, theme: 'Historia', icon: '🏛️', rows: 7, cols: 7, words: ['COLONIA', 'REY', 'GUERRA', 'TRATADO', 'ESPADA', 'REINA', 'MONUMENTO', 'CORONA'] },
  { id: 80, theme: 'Literatura', icon: '📖', rows: 7, cols: 7, words: ['CUENTO', 'CAPITULO', 'AUTOR', 'LEYENDA', 'PERSONAJE', 'NARRADOR', 'LECTOR'] },
  { id: 81, theme: 'Astronomia', icon: '🔭', rows: 8, cols: 8, words: ['NEBULOSA', 'SATELITE', 'METEORO', 'COMETA', 'UNIVERSO', 'CONSTELACION', 'ESTRELLA', 'GALAXIA'] },
  { id: 82, theme: 'Salud', icon: '🏥', rows: 8, cols: 8, words: ['CAMILLA', 'MEDICO', 'TERAPIA', 'RECETA', 'PASTILLA', 'ANALISIS', 'JERINGA', 'CIRUGIA', 'HOSPITAL'] },
  { id: 83, theme: 'Construccion', icon: '🏗️', rows: 8, cols: 8, words: ['OBRERO', 'CAL', 'NIVEL', 'CIMIENTO', 'PALETA', 'ARENA', 'VIGA', 'LADRILLO', 'PLANO', 'TECHO', 'GRUA', 'CASCO'] },
  { id: 84, theme: 'Videojuegos', icon: '🎮', rows: 8, cols: 8, words: ['PANTALLA', 'MISION', 'VICTORIA', 'AVENTURA', 'JOYSTICK', 'PERSONAJE', 'ESTRATEGIA', 'CONSOLA'] },
  { id: 85, theme: 'Moda', icon: '👗', rows: 8, cols: 8, words: ['MAQUILLAJE', 'COSTURA', 'CREMALLERA', 'MODELO', 'DISENADOR', 'TALLA', 'TEJIDO', 'ESTILO', 'BOTON'] },
  { id: 86, theme: 'Ecologia', icon: '🌍', rows: 8, cols: 8, words: ['CONSERVACION', 'SUSTENTABLE', 'HABITAT', 'COMPOST', 'BIODIVERSIDAD', 'ESPECIE', 'EMISION'] },
  { id: 87, theme: 'Cocina', icon: '🍳', rows: 8, cols: 8, words: ['ARROZ', 'HARINA', 'AZUCAR', 'ACEITE', 'PLATO', 'PAN', 'ESPECIA', 'CUCHILLO', 'HUEVO', 'QUESO', 'AJI', 'HORNO'] },
  { id: 88, theme: 'Animales', icon: '🐾', rows: 8, cols: 8, words: ['ELEFANTE', 'CEBRA', 'JIRAFA', 'PATO', 'PUMA', 'VACA', 'CONEJO', 'PERRO', 'FOCA', 'LOBO', 'OSO', 'MONO', 'PANTERA'] },
  { id: 89, theme: 'Playa', icon: '🏖️', rows: 8, cols: 8, words: ['SOL', 'MAR', 'PALA', 'TOALLA', 'CONCHA', 'BRISA', 'BALDE', 'ARENA', 'ANCLA', 'OLA', 'SURF', 'MUELLE', 'BARCA', 'BOTE'] },
  { id: 90, theme: 'Oficina', icon: '🗂️', rows: 8, cols: 8, words: ['MESA', 'IMPRESORA', 'AGENDA', 'CARPETA', 'CALENDARIO', 'CINTA', 'ARCHIVO', 'LAPIZ', 'SILLA', 'GRAPAS'] },
  { id: 91, theme: 'Espacio', icon: '🚀', rows: 8, cols: 8, words: ['COMETA', 'MARTE', 'ORBITA', 'ECLIPSE', 'UNIVERSO', 'NAVE', 'ESTRELLA', 'GRAVEDAD', 'PLANETA', 'ASTRO'] },
  { id: 92, theme: 'Musica', icon: '🎵', rows: 8, cols: 8, words: ['DISCO', 'CLARINETE', 'COMPAS', 'TAMBOR', 'NOTA', 'ARPA', 'CONCIERTO', 'FLAUTA', 'CORO', 'ACORDE', 'PIANO'] },
  { id: 93, theme: 'Deportes', icon: '⚽', rows: 8, cols: 8, words: ['REMO', 'ARQUERO', 'JUDO', 'FUTBOL', 'KARATE', 'RUGBY', 'MARATON', 'SURF', 'VOLEY', 'CICLISMO', 'NATACION'] },
  { id: 94, theme: 'Naturaleza', icon: '🌿', rows: 8, cols: 8, words: ['TIERRA', 'ARBOL', 'PLANTA', 'SELVA', 'MONTANA', 'PRADERA', 'ROCIO', 'HOJA', 'FLOR', 'VALLE', 'RAIZ', 'VIENTO'] },
  { id: 95, theme: 'Cine y Arte', icon: '🎬', rows: 8, cols: 8, words: ['GUION', 'BOCETO', 'ESTRENO', 'ROL', 'TALLER', 'CINE', 'MUSEO', 'ACTRIZ', 'PANTALLA', 'PALETA', 'DIRECTOR'] },
  { id: 96, theme: 'Tecnologia', icon: '💻', rows: 8, cols: 8, words: ['ROBOT', 'NUBE', 'CHIP', 'APLICACION', 'CODIGO', 'RED', 'DRON', 'PIXEL', 'SENSOR', 'INTERNET', 'ALGORITMO'] },
  { id: 97, theme: 'Colores', icon: '🎨', rows: 8, cols: 8, words: ['ROJO', 'AZUL', 'VIOLETA', 'CARMESI', 'MARRON', 'NARANJA', 'LILA', 'ROSA', 'NEGRO', 'AMARILLO', 'PLATEADO'] },
  { id: 98, theme: 'Frutas', icon: '🍎', rows: 8, cols: 8, words: ['CIRUELA', 'PALTA', 'BANANA', 'NARANJA', 'PERA', 'MELON', 'SANDIA', 'CEREZA', 'HIGO', 'UVA', 'KIWI', 'MANZANA'] },
  { id: 99, theme: 'Verduras', icon: '🥕', rows: 8, cols: 8, words: ['CEBOLLA', 'APIO', 'CHOCLO', 'LECHUGA', 'ZANAHORIA', 'BROCOLI', 'TOMATE', 'AJO', 'REMOLACHA', 'PEPINO'] },
  { id: 100, theme: 'Ropa', icon: '👕', rows: 8, cols: 8, words: ['CINTURON', 'SACO', 'PANTALON', 'TRAJE', 'MEDIAS', 'GORRO', 'BUFANDA', 'CAMISA', 'SANDALIA', 'CAMPERA'] },
  { id: 101, theme: 'Cuerpo Humano', icon: '🧍', rows: 8, cols: 8, words: ['OREJA', 'PIE', 'NARIZ', 'ESPALDA', 'HOMBRO', 'PECHO', 'BRAZO', 'BOCA', 'MANO', 'RODILLA', 'PIERNA', 'DEDO', 'OJO'] },
  { id: 102, theme: 'Familia', icon: '👪', rows: 8, cols: 8, words: ['HERMANO', 'TIO', 'ABUELO', 'PRIMO', 'PADRE', 'FAMILIA', 'PARIENTE', 'TIA', 'CUNADO', 'HIJO', 'HIJA', 'ABUELA'] },
  { id: 103, theme: 'Escuela', icon: '📚', rows: 8, cols: 8, words: ['CUADERNO', 'PIZARRON', 'MAESTRO', 'ALUMNO', 'PUPITRE', 'LIBRO', 'TIZA', 'EXAMEN', 'RECREO', 'MOCHILA'] },
  { id: 104, theme: 'Ciudad', icon: '🏙️', rows: 8, cols: 8, words: ['VEREDA', 'RASCACIELOS', 'TERMINAL', 'BARRIO', 'CALLE', 'PLAZA', 'ESTACION', 'MERCADO', 'EDIFICIO'] },
  { id: 105, theme: 'Clima', icon: '🌦️', rows: 8, cols: 8, words: ['LLUVIA', 'NIEVE', 'ARCOIRIS', 'NUBE', 'HUMEDAD', 'SOL', 'FRIO', 'TORMENTA', 'GRANIZO', 'NEBLINA', 'CALOR'] },
  { id: 106, theme: 'Transporte', icon: '🚗', rows: 8, cols: 8, words: ['MOTO', 'BICI', 'TREN', 'SUBTE', 'TRINEO', 'CAMION', 'YATE', 'AUTO', 'TRANVIA', 'CAMIONETA', 'CARRETA', 'TAXI'] },
  { id: 107, theme: 'Herramientas', icon: '🔧', rows: 8, cols: 8, words: ['TALADRO', 'CLAVO', 'SIERRA', 'LLAVE', 'DESTORNILLADOR', 'HACHA', 'LIJA', 'CINTA', 'TORNILLO', 'NIVEL'] },
  { id: 108, theme: 'Profesiones', icon: '👷', rows: 8, cols: 8, words: ['PLOMERO', 'PERIODISTA', 'PANADERO', 'ARQUITECTO', 'PILOTO', 'POLICIA', 'INGENIERO', 'MAESTRO'] },
  { id: 109, theme: 'Emociones', icon: '😊', rows: 8, cols: 8, words: ['EUFORIA', 'ENVIDIA', 'MIEDO', 'CULPA', 'ALEGRIA', 'ESPERANZA', 'CONFIANZA', 'TRISTEZA', 'TERNURA'] },
  { id: 110, theme: 'Geografia', icon: '🗺️', rows: 8, cols: 8, words: ['ARCHIPIELAGO', 'ISLA', 'CONTINENTE', 'MONTANA', 'VOLCAN', 'RIO', 'ECUADOR', 'LLANURA', 'DESIERTO'] },
  { id: 111, theme: 'Insectos', icon: '🐝', rows: 8, cols: 8, words: ['POLILLA', 'ESCARABAJO', 'TERMITA', 'LUCIERNAGA', 'CUCARACHA', 'MARIPOSA', 'LIBELULA', 'MOSCA'] },
  { id: 112, theme: 'Aves', icon: '🦜', rows: 8, cols: 8, words: ['TUCAN', 'CIGUENA', 'BUHO', 'AVESTRUZ', 'HALCON', 'CUERVO', 'PINGUINO', 'COLIBRI', 'GORRION', 'PALOMA'] },
  { id: 113, theme: 'Mar', icon: '🐠', rows: 8, cols: 8, words: ['ARRECIFE', 'FOCA', 'MEDUSA', 'CORAL', 'BALLENA', 'PEZ', 'ESTRELLA', 'LANGOSTA', 'CARACOL', 'CANGREJO'] },
  { id: 114, theme: 'Granja', icon: '🐄', rows: 8, cols: 8, words: ['PATO', 'HENO', 'CERDO', 'CORRAL', 'PASTO', 'TRACTOR', 'VACA', 'CABRA', 'GALLINA', 'GANSO', 'OVEJA', 'GRANERO'] },
  { id: 115, theme: 'Fiesta', icon: '🎉', rows: 8, cols: 8, words: ['BAILE', 'CANCION', 'GUIRNALDA', 'VELA', 'INVITADO', 'CUMPLEANOS', 'REGALO', 'CONFETI', 'SORPRESA'] },
  { id: 116, theme: 'Matematica', icon: '🔢', rows: 8, cols: 8, words: ['NUMERO', 'PROBLEMA', 'FRACCION', 'CALCULO', 'SUMA', 'FORMULA', 'CUADRADO', 'GRAFICO', 'TRIANGULO'] },
  { id: 117, theme: 'Historia', icon: '🏛️', rows: 8, cols: 8, words: ['IMPERIO', 'CASTILLO', 'COLONIA', 'CONQUISTA', 'ARQUEOLOGIA', 'MONUMENTO', 'REY', 'REVOLUCION'] },
  { id: 118, theme: 'Literatura', icon: '📖', rows: 8, cols: 8, words: ['LIBRO', 'LEYENDA', 'FABULA', 'PROSA', 'POEMA', 'AUTOR', 'METAFORA', 'CUENTO', 'LECTOR', 'VERSO', 'NOVELA'] },
  { id: 119, theme: 'Astronomia', icon: '🔭', rows: 8, cols: 8, words: ['NEBULOSA', 'TELESCOPIO', 'SATELITE', 'UNIVERSO', 'ESTRELLA', 'SUPERNOVA', 'GALAXIA', 'ORBITA'] },
  { id: 120, theme: 'Salud', icon: '🏥', rows: 8, cols: 8, words: ['MEDICO', 'CONSULTORIO', 'RECETA', 'HOSPITAL', 'DIAGNOSTICO', 'VENDAJE', 'VACUNA', 'ENFERMERA'] },
  { id: 121, theme: 'Construccion', icon: '🏗️', rows: 9, cols: 9, words: ['PARED', 'CASCO', 'TECHO', 'ANDAMIO', 'VIGA', 'NIVEL', 'CEMENTO', 'GRUA', 'CIMIENTO', 'ARENA', 'EXCAVADORA', 'PLANO', 'CAL', 'LADRILLO'] },
  { id: 122, theme: 'Videojuegos', icon: '🎮', rows: 9, cols: 9, words: ['PERSONAJE', 'DERROTA', 'ESTRATEGIA', 'DESAFIO', 'ARCADE', 'PUNTAJE', 'PANTALLA', 'VICTORIA', 'PIXEL', 'AVENTURA', 'MISION'] },
  { id: 123, theme: 'Moda', icon: '👗', rows: 9, cols: 9, words: ['ESTILO', 'MAQUILLAJE', 'TENDENCIA', 'VITRINA', 'BOTON', 'ETIQUETA', 'COSTURA', 'TEXTIL', 'ACCESORIO', 'MODELO', 'PASARELA'] },
  { id: 124, theme: 'Ecologia', icon: '🌍', rows: 9, cols: 9, words: ['HABITAT', 'COMPOST', 'SUSTENTABLE', 'AMBIENTE', 'HUELLA', 'ECOSISTEMA', 'RESIDUO', 'BIODIVERSIDAD', 'ENERGIA', 'CLIMA'] },
  { id: 125, theme: 'Cocina', icon: '🍳', rows: 9, cols: 9, words: ['AZUCAR', 'MANTEL', 'CUCHARA', 'HORNO', 'HARINA', 'ESPECIA', 'ARROZ', 'OLLA', 'TENEDOR', 'SARTEN', 'TAZA', 'HUEVO', 'VINAGRE', 'FUENTE'] },
  { id: 126, theme: 'Animales', icon: '🐾', rows: 9, cols: 9, words: ['TIGRE', 'PANTERA', 'PUMA', 'RATON', 'CANGURO', 'LOBO', 'GATO', 'CABALLO', 'COYOTE', 'JIRAFA', 'ARDILLA', 'CONEJO', 'ELEFANTE', 'CEBRA'] },
  { id: 127, theme: 'Oficina', icon: '🗂️', rows: 9, cols: 9, words: ['REUNION', 'CALENDARIO', 'MOUSE', 'ARCHIVO', 'SILLA', 'MESA', 'IMPRESORA', 'EMAIL', 'PAPEL', 'GRAPAS', 'JEFE', 'CLIP', 'FOLIO', 'SELLO'] },
  { id: 128, theme: 'Espacio', icon: '🚀', rows: 9, cols: 9, words: ['COMETA', 'LUNA', 'VENUS', 'SATURNO', 'COHETE', 'ECLIPSE', 'ASTRO', 'SATELITE', 'LUZ', 'TELESCOPIO', 'NAVE', 'GRAVEDAD', 'ESTRELLA'] },
  { id: 129, theme: 'Musica', icon: '🎵', rows: 9, cols: 9, words: ['CORO', 'TROMPETA', 'BANDA', 'TAMBOR', 'BAJO', 'CANTO', 'CLARINETE', 'ORQUESTA', 'VIOLIN', 'DISCO', 'FLAUTA', 'RITMO', 'NOTA', 'COMPAS'] },
  { id: 130, theme: 'Deportes', icon: '⚽', rows: 9, cols: 9, words: ['ESQUI', 'JUDO', 'FUTBOL', 'VOLEY', 'ATLETISMO', 'GOLF', 'ARQUERO', 'HOCKEY', 'BASQUET', 'BOXEO', 'TENIS', 'KARATE', 'MARATON', 'RUGBY'] },
  { id: 131, theme: 'Naturaleza', icon: '🌿', rows: 9, cols: 9, words: ['SELVA', 'FLOR', 'BOSQUE', 'SEMILLA', 'MONTANA', 'CASCADA', 'RIO', 'TIERRA', 'ROCIO', 'PLANTA', 'RAMA', 'DESIERTO', 'PRADERA', 'NIEBLA'] },
  { id: 132, theme: 'Cine y Arte', icon: '🎬', rows: 9, cols: 9, words: ['CAMARA', 'CINE', 'RETRATO', 'ESTRENO', 'ACTOR', 'BOCETO', 'ROL', 'PANTALLA', 'ESCULTURA', 'TALLER', 'GALERIA', 'DIRECTOR', 'GUION'] },
  { id: 133, theme: 'Tecnologia', icon: '💻', rows: 9, cols: 9, words: ['SERVIDOR', 'MEMORIA', 'BATERIA', 'CODIGO', 'RED', 'DRON', 'TECLADO', 'APLICACION', 'SENSOR', 'PANTALLA', 'CABLE', 'ROBOT', 'PIXEL'] },
  { id: 134, theme: 'Colores', icon: '🎨', rows: 9, cols: 9, words: ['AZUL', 'VERDE', 'LILA', 'CARMESI', 'ROSA', 'TURQUESA', 'DORADO', 'CELESTE', 'VIOLETA', 'NARANJA', 'PLATEADO', 'GRIS', 'MARRON', 'ROJO'] },
  { id: 135, theme: 'Frutas', icon: '🍎', rows: 9, cols: 9, words: ['FRUTILLA', 'CEREZA', 'UVA', 'MANZANA', 'BANANA', 'DURAZNO', 'NARANJA', 'HIGO', 'SANDIA', 'MELON', 'LIMON', 'MANGO', 'PALTA', 'CIRUELA'] },
  { id: 136, theme: 'Verduras', icon: '🥕', rows: 9, cols: 9, words: ['RABANO', 'PEPINO', 'TOMATE', 'ZANAHORIA', 'LECHUGA', 'AJO', 'ESPINACA', 'PUERRO', 'BROCOLI', 'CEBOLLA', 'ZAPALLO', 'REMOLACHA'] },
  { id: 137, theme: 'Ropa', icon: '👕', rows: 9, cols: 9, words: ['SHORT', 'SANDALIA', 'POLLERA', 'BUFANDA', 'TRAJE', 'CAMPERA', 'BOTA', 'CINTURON', 'REMERA', 'VESTIDO', 'MEDIAS', 'GORRO', 'GUANTE'] },
  { id: 138, theme: 'Familia', icon: '👪', rows: 9, cols: 9, words: ['PARIENTE', 'SOBRINO', 'PADRE', 'HIJA', 'SUEGRO', 'FAMILIA', 'ESPOSA', 'TIO', 'CUNADO', 'HERMANO', 'ESPOSO', 'PRIMO', 'ABUELA', 'NIETO'] },
  { id: 139, theme: 'Escuela', icon: '📚', rows: 9, cols: 9, words: ['GOMA', 'TIZA', 'MOCHILA', 'TAREA', 'CUADERNO', 'EXAMEN', 'MAESTRO', 'REGLA', 'LIBRO', 'CAMPANA', 'AULA', 'PUPITRE', 'DIPLOMA', 'LAPIZ'] },
  { id: 140, theme: 'Ciudad', icon: '🏙️', rows: 9, cols: 9, words: ['PARQUE', 'MURO', 'TERMINAL', 'SEMAFORO', 'ESQUINA', 'EDIFICIO', 'VEREDA', 'RASCACIELOS', 'PLAZA', 'BARRIO', 'CALLE', 'AVENIDA'] },
  { id: 141, theme: 'Clima', icon: '🌦️', rows: 9, cols: 9, words: ['NEBLINA', 'LLUVIA', 'FRIO', 'HUMEDAD', 'SOL', 'SEQUIA', 'TEMPESTAD', 'HELADA', 'CALOR', 'GRANIZO', 'NIEVE', 'RAYO', 'NUBE', 'ARCOIRIS'] },
  { id: 142, theme: 'Transporte', icon: '🚗', rows: 9, cols: 9, words: ['YATE', 'AUTO', 'CARRETA', 'TRINEO', 'CAMIONETA', 'TAXI', 'CAMION', 'TRANVIA', 'BARCO', 'HELICOPTERO', 'BICI', 'SUBTE', 'COLECTIVO'] },
  { id: 143, theme: 'Herramientas', icon: '🔧', rows: 9, cols: 9, words: ['TORNILLO', 'MARTILLO', 'SIERRA', 'HACHA', 'ALICATE', 'DESTORNILLADOR', 'CINTA', 'PINZA', 'FORMON', 'LLAVE', 'ESCOFINA', 'LIJA'] },
  { id: 144, theme: 'Profesiones', icon: '👷', rows: 9, cols: 9, words: ['PLOMERO', 'POLICIA', 'DENTISTA', 'COCINERO', 'PINTOR', 'INGENIERO', 'BOMBERO', 'PILOTO', 'ENFERMERO', 'MAESTRO', 'ABOGADO'] },
  { id: 145, theme: 'Emociones', icon: '😊', rows: 9, cols: 9, words: ['EUFORIA', 'ANSIEDAD', 'MIEDO', 'ENVIDIA', 'ENOJO', 'ALEGRIA', 'VERGUENZA', 'TERNURA', 'ORGULLO', 'NOSTALGIA', 'CALMA', 'CULPA'] },
  { id: 146, theme: 'Geografia', icon: '🗺️', rows: 9, cols: 9, words: ['ISLA', 'ARCHIPIELAGO', 'DESIERTO', 'OCEANO', 'CONTINENTE', 'PENINSULA', 'RIO', 'MONTANA', 'POLO', 'MESETA', 'VALLE', 'GLACIAR'] },
  { id: 147, theme: 'Insectos', icon: '🐝', rows: 9, cols: 9, words: ['MARIPOSA', 'LIBELULA', 'ABEJA', 'LUCIERNAGA', 'ESCARABAJO', 'MOSCA', 'MOSQUITO', 'HORMIGA', 'CUCARACHA', 'ORUGA', 'GRILLO'] },
  { id: 148, theme: 'Aves', icon: '🦜', rows: 9, cols: 9, words: ['AVESTRUZ', 'CIGUENA', 'LORO', 'BUHO', 'HALCON', 'PALOMA', 'COLIBRI', 'GAVIOTA', 'TUCAN', 'GORRION', 'AGUILA', 'PINGUINO', 'CONDOR'] },
  { id: 149, theme: 'Mar', icon: '🐠', rows: 9, cols: 9, words: ['ESTRELLA', 'CARACOL', 'CORAL', 'TIBURON', 'LANGOSTA', 'ARRECIFE', 'PEZ', 'ALGA', 'BALLENA', 'CALAMAR', 'DELFIN', 'MEDUSA', 'OSTRA'] },
  { id: 150, theme: 'Fiesta', icon: '🎉', rows: 9, cols: 9, words: ['DISFRAZ', 'VELA', 'BAILE', 'INVITADO', 'REGALO', 'CONFETI', 'CANCION', 'SORPRESA', 'GLOBO', 'TORTA', 'GUIRNALDA', 'CUMPLEANOS'] },

  /* --- Niveles 151 a 1150: 1000 niveles adicionales generados con un banco
     ampliado de 53 temas y un solver de subconjuntos exactos (programación
     dinámica) que garantiza que la suma de letras cierra con la grilla.
     La dificultad sigue creciendo: de 6×7 hasta 12×12. --- */
  { id: 151, theme: 'Cocina', icon: '🍳', rows: 6, cols: 7, words: ['MERMELADA', 'COLADOR', 'LEVADURA', 'TENEDOR', 'CUCHARA', 'MIEL'] },
  { id: 152, theme: 'Animales', icon: '🐾', rows: 6, cols: 7, words: ['BURRO', 'PANTERA', 'MONO', 'FOCA', 'PERRO', 'CANGURO', 'ZORRO', 'TIGRE'] },
  { id: 153, theme: 'Playa', icon: '🏖️', rows: 6, cols: 7, words: ['ACANTILADO', 'MAREA', 'PALA', 'OLA', 'ANCLA', 'CONCHA', 'FARO', 'BARCA'] },
  { id: 154, theme: 'Oficina', icon: '🗂️', rows: 6, cols: 7, words: ['PIZARRA', 'PRESUPUESTO', 'CARTELERA', 'TIJERA', 'CLIP', 'FOLIO'] },
  { id: 155, theme: 'Espacio', icon: '🚀', rows: 6, cols: 7, words: ['COHETE', 'SATURNO', 'GALAXIA', 'MERCURIO', 'ROBOT', 'ORBITA', 'LUZ'] },
  { id: 156, theme: 'Musica', icon: '🎵', rows: 6, cols: 7, words: ['FESTIVAL', 'SAXOFON', 'ACORDE', 'BATERIA', 'VIOLIN', 'TROMPETA'] },
  { id: 157, theme: 'Deportes', icon: '⚽', rows: 6, cols: 7, words: ['SURF', 'NATACION', 'GIMNASIA', 'GOLF', 'TIRO', 'MEDALLA', 'ARBITRO'] },
  { id: 158, theme: 'Naturaleza', icon: '🌿', rows: 6, cols: 7, words: ['NIEBLA', 'FLOR', 'ROCA', 'ENREDADERA', 'MANANTIAL', 'BOSQUE', 'RIO'] },
  { id: 159, theme: 'Cine y Arte', icon: '🎬', rows: 6, cols: 7, words: ['DECORADO', 'REPARTO', 'ACTRIZ', 'PROTAGONISTA', 'CAMARA', 'ROL'] },
  { id: 160, theme: 'Tecnologia', icon: '💻', rows: 6, cols: 7, words: ['APLICACION', 'MEMORIA', 'PANTALLA', 'DRON', 'ROUTER', 'USUARIO'] },
  { id: 161, theme: 'Colores', icon: '🎨', rows: 6, cols: 7, words: ['VERDE', 'MARRON', 'AGUAMARINA', 'CREMA', 'ROSA', 'OCRE', 'AMARILLO'] },
  { id: 162, theme: 'Frutas', icon: '🍎', rows: 6, cols: 7, words: ['MELON', 'DURAZNO', 'PERA', 'MEMBRILLO', 'HIGO', 'POMELO', 'CIRUELA'] },
  { id: 163, theme: 'Verduras', icon: '🥕', rows: 6, cols: 7, words: ['PAPA', 'AJO', 'COLIFLOR', 'HABAS', 'BATATA', 'CEBOLLA', 'BERENJENA'] },
  { id: 164, theme: 'Ropa', icon: '👕', rows: 6, cols: 7, words: ['MOCHILA', 'GUANTE', 'OVEROL', 'SANDALIA', 'CAMPERA', 'PANTALON'] },
  { id: 165, theme: 'Cuerpo Humano', icon: '🧍', rows: 6, cols: 7, words: ['PESTANA', 'BRAZO', 'CEJA', 'CABEZA', 'NARIZ', 'MANO', 'CODO', 'RODILLA'] },
  { id: 166, theme: 'Familia', icon: '👪', rows: 6, cols: 7, words: ['HIJA', 'CUNADO', 'ESPOSO', 'MADRE', 'PARIENTE', 'MADRINA', 'SUEGRO'] },
  { id: 167, theme: 'Escuela', icon: '📚', rows: 6, cols: 7, words: ['EXAMEN', 'PUPITRE', 'DIPLOMA', 'TIZA', 'CUADERNO', 'CARTUCHERA'] },
  { id: 168, theme: 'Ciudad', icon: '🏙️', rows: 6, cols: 7, words: ['ESTACIONAMIENTO', 'MUNICIPIO', 'MERCADO', 'PUENTE', 'CALLE'] },
  { id: 169, theme: 'Clima', icon: '🌦️', rows: 6, cols: 7, words: ['TRUENO', 'HELADA', 'SOL', 'BRISA', 'ESCARCHA', 'LLUVIA', 'VENDAVAL'] },
  { id: 170, theme: 'Transporte', icon: '🚗', rows: 6, cols: 7, words: ['BICI', 'TREN', 'MONOPATIN', 'TRANVIA', 'YATE', 'SUBTE', 'TAXI', 'AVION'] },
  { id: 171, theme: 'Herramientas', icon: '🔧', rows: 6, cols: 7, words: ['TORNILLO', 'NIVEL', 'ALICATE', 'PINZA', 'TENAZA', 'CEPILLO', 'GATO'] },
  { id: 172, theme: 'Profesiones', icon: '👷', rows: 6, cols: 7, words: ['ABOGADO', 'INGENIERO', 'PERIODISTA', 'CARPINTERO', 'PILOTO'] },
  { id: 173, theme: 'Emociones', icon: '😊', rows: 6, cols: 7, words: ['EUFORIA', 'CALMA', 'MIEDO', 'FRUSTRACION', 'VERGUENZA', 'ENOJO'] },
  { id: 174, theme: 'Geografia', icon: '🗺️', rows: 6, cols: 7, words: ['MONTANA', 'VALLE', 'POLO', 'BAHIA', 'COSTA', 'CORDILLERA', 'OCEANO'] },
  { id: 175, theme: 'Insectos', icon: '🐝', rows: 6, cols: 7, words: ['CUCARACHA', 'PULGON', 'LIBELULA', 'HORMIGA', 'TERMITA', 'ABEJA'] },
  { id: 176, theme: 'Aves', icon: '🦜', rows: 6, cols: 7, words: ['PERDIZ', 'GORRION', 'BUHO', 'PETIRROJO', 'PINGUINO', 'AVESTRUZ'] },
  { id: 177, theme: 'Mar', icon: '🐠', rows: 6, cols: 7, words: ['ANEMONA', 'CORAL', 'FOCA', 'LANGOSTA', 'MEDUSA', 'PLANCTON', 'ATUN'] },
  { id: 178, theme: 'Granja', icon: '🐄', rows: 6, cols: 7, words: ['SEMBRADO', 'CERDO', 'GANSO', 'TRACTOR', 'HENO', 'ARADO', 'PATO', 'SILO'] },
  { id: 179, theme: 'Fiesta', icon: '🎉', rows: 6, cols: 7, words: ['INVITADO', 'CANCION', 'CONFETI', 'SORPRESA', 'REGALO', 'PINATA'] },
  { id: 180, theme: 'Matematica', icon: '🔢', rows: 6, cols: 7, words: ['VARIABLE', 'PORCENTAJE', 'NUMERO', 'ANGULO', 'CUADRADO', 'SUMA'] },
  { id: 181, theme: 'Historia', icon: '🏛️', rows: 6, cols: 7, words: ['PIRAMIDE', 'REINA', 'REVOLUCION', 'MONUMENTO', 'COLONIA', 'REY'] },
  { id: 182, theme: 'Literatura', icon: '📖', rows: 6, cols: 7, words: ['CAPITULO', 'PROSA', 'METAFORA', 'LECTOR', 'FABULA', 'EDITORIAL'] },
  { id: 183, theme: 'Astronomia', icon: '🔭', rows: 6, cols: 7, words: ['TELESCOPIO', 'OBSERVATORIO', 'PLANETA', 'COMETA', 'GALAXIA'] },
  { id: 184, theme: 'Salud', icon: '🏥', rows: 6, cols: 7, words: ['ANALISIS', 'QUIROFANO', 'HOSPITAL', 'VACUNA', 'DIAGNOSTICO'] },
  { id: 185, theme: 'Construccion', icon: '🏗️', rows: 6, cols: 7, words: ['CASCO', 'PARED', 'CIMIENTO', 'ESCALERA', 'PALETA', 'PUERTA', 'VIGA'] },
  { id: 186, theme: 'Videojuegos', icon: '🎮', rows: 6, cols: 7, words: ['MISION', 'PERSONAJE', 'DERROTA', 'JOYSTICK', 'MULTIJUGADOR'] },
  { id: 187, theme: 'Moda', icon: '👗', rows: 6, cols: 7, words: ['TEJIDO', 'BOLSO', 'MAQUILLAJE', 'TEXTIL', 'CREMALLERA', 'TALLA'] },
  { id: 188, theme: 'Ecologia', icon: '🌍', rows: 6, cols: 7, words: ['RECICLAJE', 'ECOSISTEMA', 'RESIDUO', 'EXTINCION', 'HABITAT'] },
  { id: 189, theme: 'Postres', icon: '🍰', rows: 6, cols: 7, words: ['CREMA', 'TORTA', 'TIRAMISU', 'DULCE', 'GELATINA', 'TARTA', 'BOMBON'] },
  { id: 190, theme: 'Bebidas', icon: '🥤', rows: 6, cols: 7, words: ['SODA', 'CERVEZA', 'NECTAR', 'COCTEL', 'BATIDO', 'LIMONADA', 'LECHE'] },
  { id: 191, theme: 'Piratas', icon: '🏴‍☠️', rows: 6, cols: 7, words: ['ANCLA', 'BANDERA', 'MAPA', 'ESPADA', 'ISLA', 'TRIPULACION', 'CANON'] },
  { id: 192, theme: 'Halloween', icon: '🎃', rows: 6, cols: 7, words: ['CALDERO', 'MURCIELAGO', 'VAMPIRO', 'TELARANA', 'CEMENTERIO'] },
  { id: 193, theme: 'Navidad', icon: '🎄', rows: 6, cols: 7, words: ['GUIRNALDA', 'VILLANCICO', 'MEDIA', 'ARBOL', 'BASTON', 'CAMPANA'] },
  { id: 194, theme: 'Dinosaurios', icon: '🦕', rows: 6, cols: 7, words: ['ESCAMA', 'JURASICO', 'FOSIL', 'HUEVO', 'ESQUELETO', 'EXTINCION'] },
  { id: 195, theme: 'Superheroes', icon: '🦸', rows: 6, cols: 7, words: ['RESCATE', 'MISION', 'VUELO', 'PODER', 'TRAJE', 'MASCARA', 'VILLANO'] },
  { id: 196, theme: 'Circo', icon: '🎪', rows: 6, cols: 7, words: ['TRAPECIO', 'LEON', 'CARPA', 'MAGO', 'FUNAMBULO', 'DOMADOR', 'CANON'] },
  { id: 197, theme: 'Camping', icon: '🏕️', rows: 6, cols: 7, words: ['TIENDA', 'LINTERNA', 'MONTANA', 'RIO', 'CANTIMPLORA', 'INSECTO'] },
  { id: 198, theme: 'Jardin', icon: '🌷', rows: 6, cols: 7, words: ['JARDINERO', 'HOJA', 'SEMILLA', 'TIERRA', 'TALLO', 'INVERNADERO'] },
  { id: 199, theme: 'Panaderia', icon: '🥖', rows: 6, cols: 7, words: ['MASA', 'LEVADURA', 'MOLDE', 'MIGA', 'BANDEJA', 'MEDIALUNA', 'TORTA'] },
  { id: 200, theme: 'Invierno', icon: '❄️', rows: 6, cols: 7, words: ['TRINEO', 'HIELO', 'NEVADA', 'ESQUI', 'GUANTE', 'ESTUFA', 'CHIMENEA'] },
  { id: 201, theme: 'Egipto', icon: '🏺', rows: 6, cols: 7, words: ['RIO', 'PAPIRO', 'JEROGLIFICO', 'MOMIA', 'OASIS', 'TUMBA', 'CAMELLO'] },
  { id: 202, theme: 'Vikingos', icon: '⚔️', rows: 6, cols: 7, words: ['RUNAS', 'FIORDO', 'TRIBU', 'CONQUISTA', 'CASCO', 'LEYENDA', 'BARCO'] },
  { id: 203, theme: 'Cuentos', icon: '🏰', rows: 6, cols: 7, words: ['DRAGON', 'REINO', 'HADA', 'MAGIA', 'CABALLERO', 'BRUJA', 'CASTILLO'] },
  { id: 204, theme: 'Cocina', icon: '🍳', rows: 6, cols: 7, words: ['MIEL', 'AJI', 'ALMENDRA', 'MERMELADA', 'GUISO', 'SARTEN', 'VINAGRE'] },
  { id: 205, theme: 'Animales', icon: '🐾', rows: 6, cols: 7, words: ['COYOTE', 'PATO', 'PANTERA', 'RANA', 'PERRO', 'GORILA', 'CONEJO', 'LOBO'] },
  { id: 206, theme: 'Playa', icon: '🏖️', rows: 6, cols: 7, words: ['OLA', 'BRONCEADOR', 'BOTE', 'SOMBRILLA', 'ARRECIFE', 'SOL', 'ARENA'] },
  { id: 207, theme: 'Oficina', icon: '🗂️', rows: 6, cols: 7, words: ['ARCHIVO', 'PROYECTO', 'AGENDA', 'GRAPAS', 'FOTOCOPIA', 'TIJERA'] },
  { id: 208, theme: 'Espacio', icon: '🚀', rows: 6, cols: 7, words: ['METEORITO', 'TELESCOPIO', 'MARTE', 'SATURNO', 'CRATER', 'ASTRO'] },
  { id: 209, theme: 'Musica', icon: '🎵', rows: 6, cols: 7, words: ['ORQUESTA', 'PIANO', 'CLARINETE', 'BANDA', 'MELODIA', 'BAJO', 'NOTA'] },
  { id: 210, theme: 'Deportes', icon: '⚽', rows: 6, cols: 7, words: ['TENIS', 'ATLETISMO', 'TROFEO', 'JUDO', 'GOLF', 'CICLISMO', 'KARATE'] },
  { id: 211, theme: 'Naturaleza', icon: '🌿', rows: 6, cols: 7, words: ['RIO', 'SEMILLA', 'MATORRAL', 'LAGO', 'RAIZ', 'BOSQUE', 'HOJA', 'NIEBLA'] },
  { id: 212, theme: 'Cine y Arte', icon: '🎬', rows: 6, cols: 7, words: ['PREMIERE', 'MUSEO', 'LIENZO', 'PALETA', 'GUION', 'PROTAGONISTA'] },
  { id: 213, theme: 'Tecnologia', icon: '💻', rows: 6, cols: 7, words: ['DRON', 'PROCESADOR', 'ROUTER', 'DATOS', 'ALGORITMO', 'CABLE', 'RED'] },
  { id: 214, theme: 'Colores', icon: '🎨', rows: 6, cols: 7, words: ['ESMERALDA', 'MAGENTA', 'ROSA', 'VIOLETA', 'BEIGE', 'AGUAMARINA'] },
  { id: 215, theme: 'Frutas', icon: '🍎', rows: 6, cols: 7, words: ['SANDIA', 'FRAMBUESA', 'COCO', 'LICHI', 'PERA', 'PALTA', 'LIMON', 'KIWI'] },
  { id: 216, theme: 'Verduras', icon: '🥕', rows: 6, cols: 7, words: ['ESPINACA', 'PAPA', 'ALCAUCIL', 'RABANO', 'AJO', 'CEBOLLA', 'RUCULA'] },
  { id: 217, theme: 'Ropa', icon: '👕', rows: 6, cols: 7, words: ['PIJAMA', 'IMPERMEABLE', 'SACO', 'CHALECO', 'ZAPATILLA', 'BLUSA'] },
  { id: 218, theme: 'Cuerpo Humano', icon: '🧍', rows: 6, cols: 7, words: ['PECHO', 'DEDO', 'HOMBRO', 'PARPADO', 'PIE', 'CEJA', 'TOBILLO', 'MENTON'] },
  { id: 219, theme: 'Familia', icon: '👪', rows: 6, cols: 7, words: ['TIA', 'HIJA', 'MADRINA', 'SOBRINO', 'PADRINO', 'CUNADO', 'NIETO', 'TIO'] },
  { id: 220, theme: 'Escuela', icon: '📚', rows: 6, cols: 7, words: ['PIZARRON', 'CUADERNO', 'LIBRO', 'MOCHILA', 'LAPIZ', 'TAREA', 'MAPA'] },
  { id: 221, theme: 'Ciudad', icon: '🏙️', rows: 6, cols: 7, words: ['VEREDA', 'PARQUE', 'TERMINAL', 'SEMAFORO', 'ESTACION', 'BARRIO'] },
  { id: 222, theme: 'Clima', icon: '🌦️', rows: 6, cols: 7, words: ['CALOR', 'HELADA', 'LLUVIA', 'MONZON', 'GRANIZO', 'ROCIO', 'NEBLINA'] },
  { id: 223, theme: 'Transporte', icon: '🚗', rows: 6, cols: 7, words: ['BICI', 'TELEFERICO', 'CAMION', 'TRINEO', 'MONOPATIN', 'CARRETA'] },
  { id: 224, theme: 'Herramientas', icon: '🔧', rows: 6, cols: 7, words: ['NIVEL', 'CINCEL', 'BROCA', 'LIJA', 'ESCOFINA', 'DESTORNILLADOR'] },
  { id: 225, theme: 'Profesiones', icon: '👷', rows: 6, cols: 7, words: ['DENTISTA', 'CARPINTERO', 'MECANICO', 'PSICOLOGO', 'BOMBERO'] },
  { id: 226, theme: 'Emociones', icon: '😊', rows: 6, cols: 7, words: ['CULPA', 'NOSTALGIA', 'ENTUSIASMO', 'FRUSTRACION', 'TERNURA'] },
  { id: 227, theme: 'Geografia', icon: '🗺️', rows: 6, cols: 7, words: ['BAHIA', 'CORDILLERA', 'VALLE', 'MONTANA', 'OCEANO', 'ALTIPLANO'] },
  { id: 228, theme: 'Insectos', icon: '🐝', rows: 6, cols: 7, words: ['LIBELULA', 'AVISPA', 'CIEMPIES', 'LUCIERNAGA', 'ESCARABAJO'] },
  { id: 229, theme: 'Aves', icon: '🦜', rows: 6, cols: 7, words: ['BUHO', 'PETIRROJO', 'CANARIO', 'COLIBRI', 'CACATUA', 'FLAMENCO'] },
  { id: 230, theme: 'Mar', icon: '🐠', rows: 6, cols: 7, words: ['ANEMONA', 'CANGREJO', 'ALGA', 'BALLENA', 'PEZ', 'MOROENA', 'MEDUSA'] },
  { id: 231, theme: 'Granja', icon: '🐄', rows: 6, cols: 7, words: ['ARADO', 'CERDO', 'CABRA', 'CORRAL', 'PASTO', 'OVEJA', 'ESTABLO', 'PATO'] },
  { id: 232, theme: 'Fiesta', icon: '🎉', rows: 6, cols: 7, words: ['PINATA', 'MUSICA', 'BANQUETE', 'INVITADO', 'CANCION', 'CONFETI'] },
  { id: 233, theme: 'Matematica', icon: '🔢', rows: 6, cols: 7, words: ['DECIMAL', 'VOLUMEN', 'CIRCULO', 'SUMA', 'PROBLEMA', 'TRIANGULO'] },
  { id: 234, theme: 'Historia', icon: '🏛️', rows: 6, cols: 7, words: ['CORONA', 'CIVILIZACION', 'CONQUISTA', 'TRATADO', 'PIRAMIDE'] },
  { id: 235, theme: 'Literatura', icon: '📖', rows: 6, cols: 7, words: ['BIBLIOTECA', 'NARRADOR', 'LECTOR', 'POEMA', 'PROLOGO', 'CUENTO'] },
  { id: 236, theme: 'Astronomia', icon: '🔭', rows: 6, cols: 7, words: ['ORBITA', 'METEORO', 'ESTRELLA', 'CONSTELACION', 'ASTEROIDE'] },
  { id: 237, theme: 'Salud', icon: '🏥', rows: 6, cols: 7, words: ['CIRUGIA', 'PACIENTE', 'VENDAJE', 'QUIROFANO', 'DIAGNOSTICO'] },
  { id: 238, theme: 'Construccion', icon: '🏗️', rows: 6, cols: 7, words: ['VENTANA', 'TECHO', 'HORMIGON', 'PLANO', 'CIMIENTO', 'CASCO', 'GRUA'] },
  { id: 239, theme: 'Videojuegos', icon: '🎮', rows: 6, cols: 7, words: ['INVENTARIO', 'PANTALLA', 'MULTIJUGADOR', 'NIVEL', 'CONSOLA'] },
  { id: 240, theme: 'Moda', icon: '👗', rows: 6, cols: 7, words: ['TEXTIL', 'PERFUME', 'TEJIDO', 'BOLSO', 'TENDENCIA', 'ACCESORIO'] },
  { id: 241, theme: 'Ecologia', icon: '🌍', rows: 6, cols: 7, words: ['HUELLA', 'ESPECIE', 'COMPOST', 'RECICLAJE', 'DEFORESTACION'] },
  { id: 242, theme: 'Postres', icon: '🍰', rows: 6, cols: 7, words: ['BOMBON', 'GELATINA', 'TARTA', 'MOUSSE', 'FLAN', 'HELADO', 'GALLETA'] },
  { id: 243, theme: 'Bebidas', icon: '🥤', rows: 6, cols: 7, words: ['GASEOSA', 'BATIDO', 'CERVEZA', 'LICUADO', 'LECHE', 'NECTAR', 'MATE'] },
  { id: 244, theme: 'Piratas', icon: '🏴‍☠️', rows: 6, cols: 7, words: ['PARCHE', 'MONEDA', 'TESORO', 'GALEON', 'LORO', 'BANDERA', 'BRUJULA'] },
  { id: 245, theme: 'Halloween', icon: '🎃', rows: 6, cols: 7, words: ['ZOMBI', 'POCION', 'CEMENTERIO', 'MURCIELAGO', 'CADENA', 'ARANA'] },
  { id: 246, theme: 'Navidad', icon: '🎄', rows: 6, cols: 7, words: ['ADORNO', 'GUIRNALDA', 'VILLANCICO', 'ESTRELLA', 'VELA', 'ARBOL'] },
  { id: 247, theme: 'Dinosaurios', icon: '🦕', rows: 6, cols: 7, words: ['CARNIVORO', 'REPTIL', 'VELOCIRAPTOR', 'TRICERATOPS', 'COLA'] },
  { id: 248, theme: 'Superheroes', icon: '🦸', rows: 6, cols: 7, words: ['ENEMIGO', 'GUARIDA', 'JUSTICIA', 'MASCARA', 'MISION', 'ANTIFAZ'] },
  { id: 249, theme: 'Circo', icon: '🎪', rows: 6, cols: 7, words: ['ELEFANTE', 'ACROBATA', 'CARPA', 'PISTA', 'FUNAMBULO', 'DOMADOR'] },
  { id: 250, theme: 'Camping', icon: '🏕️', rows: 6, cols: 7, words: ['LINTERNA', 'BOSQUE', 'MOCHILA', 'FOGATA', 'SENDERO', 'RIO', 'CARPA'] },
  { id: 251, theme: 'Jardin', icon: '🌷', rows: 6, cols: 7, words: ['HOJA', 'ROSAL', 'FLOR', 'MANGUERA', 'INVERNADERO', 'TALLO', 'PASTO'] },
  { id: 252, theme: 'Panaderia', icon: '🥖', rows: 6, cols: 7, words: ['TORTA', 'MASA', 'PAN', 'GLASEADO', 'MEDIALUNA', 'LEVADURA', 'BOLLO'] },
  { id: 253, theme: 'Invierno', icon: '❄️', rows: 6, cols: 7, words: ['FRIO', 'HIELO', 'BOTAS', 'GUANTE', 'ESQUI', 'NEVADA', 'MANTA', 'TRINEO'] },
  { id: 254, theme: 'Egipto', icon: '🏺', rows: 6, cols: 7, words: ['PIRAMIDE', 'CAMELLO', 'TUMBA', 'SARCOFAGO', 'ESFINGE', 'FARAON'] },
  { id: 255, theme: 'Vikingos', icon: '⚔️', rows: 6, cols: 7, words: ['GUERRERO', 'ESPADA', 'CUERNO', 'TRIBU', 'LEYENDA', 'RUNAS', 'CASCO'] },
  { id: 256, theme: 'Cuentos', icon: '🏰', rows: 6, cols: 7, words: ['VARITA', 'TESORO', 'PRINCESA', 'MAGIA', 'GIGANTE', 'HADA', 'ESPEJO'] },
  { id: 257, theme: 'Cocina', icon: '🍳', rows: 6, cols: 7, words: ['ACEITE', 'BANDEJA', 'REPOSTERIA', 'HORNO', 'NUEZ', 'TENEDOR', 'PAN'] },
  { id: 258, theme: 'Animales', icon: '🐾', rows: 6, cols: 7, words: ['TIGRE', 'LOBO', 'CEBRA', 'PERRO', 'ZORRO', 'BUFALO', 'PATO', 'PUMA', 'FOCA'] },
  { id: 259, theme: 'Playa', icon: '🏖️', rows: 6, cols: 7, words: ['BOTE', 'BIKINI', 'TOALLA', 'ESNORQUEL', 'MAREA', 'SOL', 'BUCEO', 'SURF'] },
  { id: 260, theme: 'Oficina', icon: '🗂️', rows: 6, cols: 7, words: ['REUNION', 'CONTRATO', 'CLIP', 'BOLIGRAFO', 'ASCENSOR', 'TIJERA'] },
  { id: 261, theme: 'Espacio', icon: '🚀', rows: 6, cols: 7, words: ['MARTE', 'COHETE', 'CRATER', 'NEPTUNO', 'ESTRELLA', 'TELESCOPIO'] },
  { id: 262, theme: 'Musica', icon: '🎵', rows: 6, cols: 7, words: ['TAMBOR', 'NOTA', 'RITMO', 'SAXOFON', 'LETRA', 'PIANO', 'ARPA', 'BALADA'] },
  { id: 263, theme: 'Deportes', icon: '⚽', rows: 7, cols: 8, words: ['RUGBY', 'CICLISMO', 'BOXEO', 'KARATE', 'VELOCIDAD', 'TIRO', 'ATLETISMO', 'ENTRENADOR'] },
  { id: 264, theme: 'Naturaleza', icon: '🌿', rows: 7, cols: 8, words: ['FLOR', 'CORTEZA', 'MONTANA', 'ENREDADERA', 'LAGO', 'TIERRA', 'TRONCO', 'BOSQUE', 'NIEBLA'] },
  { id: 265, theme: 'Cine y Arte', icon: '🎬', rows: 7, cols: 8, words: ['GALERIA', 'DECORADO', 'ACTOR', 'SUBTITULO', 'ESTRENO', 'BOCETO', 'RETRATO', 'REPARTO'] },
  { id: 266, theme: 'Tecnologia', icon: '💻', rows: 7, cols: 8, words: ['CONTRASENA', 'RED', 'MEMORIA', 'NAVEGADOR', 'SOFTWARE', 'ALGORITMO', 'APLICACION'] },
  { id: 267, theme: 'Colores', icon: '🎨', rows: 7, cols: 8, words: ['GRIS', 'LILA', 'BLANCO', 'ROSA', 'AZUL', 'PERLA', 'ROJO', 'TURQUESA', 'BEIGE', 'VIOLETA', 'VERDE'] },
  { id: 268, theme: 'Frutas', icon: '🍎', rows: 7, cols: 8, words: ['MEMBRILLO', 'GRANADA', 'MELON', 'MANDARINA', 'PALTA', 'MANGO', 'PERA', 'LIMON', 'UVA', 'HIGO'] },
  { id: 269, theme: 'Verduras', icon: '🥕', rows: 7, cols: 8, words: ['REMOLACHA', 'APIO', 'BATATA', 'CEBOLLA', 'PUERRO', 'PEPINO', 'CHOCLO', 'PAPA', 'ESPINACA'] },
  { id: 270, theme: 'Ropa', icon: '👕', rows: 7, cols: 8, words: ['CAMPERA', 'GORRA', 'MOCHILA', 'CINTURON', 'SANDALIA', 'CORBATA', 'BUFANDA', 'POLLERA'] },
  { id: 271, theme: 'Cuerpo Humano', icon: '🧍', rows: 7, cols: 8, words: ['PIE', 'MANO', 'PECHO', 'CABEZA', 'MUSLO', 'CINTURA', 'PESTANA', 'MUNECA', 'HOMBRO', 'MEJILLA'] },
  { id: 272, theme: 'Familia', icon: '👪', rows: 7, cols: 8, words: ['HIJA', 'SUEGRO', 'MADRE', 'NIETO', 'PADRE', 'MADRINA', 'ABUELA', 'HIJO', 'PARIENTE', 'ABUELO'] },
  { id: 273, theme: 'Escuela', icon: '📚', rows: 7, cols: 8, words: ['UNIFORME', 'LIBRO', 'PIZARRON', 'RECREO', 'BIBLIOTECA', 'AULA', 'TIZA', 'ALUMNO', 'REGLA'] },
  { id: 274, theme: 'Ciudad', icon: '🏙️', rows: 7, cols: 8, words: ['VEREDA', 'ESTACIONAMIENTO', 'AVENIDA', 'VECINO', 'TERMINAL', 'ESTACION', 'PUENTE'] },
  { id: 275, theme: 'Clima', icon: '🌦️', rows: 7, cols: 8, words: ['NEBLINA', 'LLUVIA', 'VIENTO', 'FRIO', 'SEQUIA', 'ARCOIRIS', 'TRUENO', 'TORMENTA', 'NIEVE'] },
  { id: 276, theme: 'Transporte', icon: '🚗', rows: 7, cols: 8, words: ['TRINEO', 'TREN', 'MOTO', 'AVION', 'MONOPATIN', 'CAMIONETA', 'GLOBO', 'BICI', 'TELEFERICO'] },
  { id: 277, theme: 'Herramientas', icon: '🔧', rows: 7, cols: 8, words: ['ALICATE', 'TORNILLO', 'PINZA', 'CLAVO', 'CEPILLO', 'HACHA', 'CINTA', 'SIERRA', 'ESCOFINA'] },
  { id: 278, theme: 'Profesiones', icon: '👷', rows: 7, cols: 8, words: ['ABOGADO', 'POLICIA', 'MECANICO', 'PLOMERO', 'ENFERMERO', 'ARQUITECTO', 'CONTADOR'] },
  { id: 279, theme: 'Emociones', icon: '😊', rows: 7, cols: 8, words: ['CALMA', 'ENOJO', 'CULPA', 'TRISTEZA', 'ALEGRIA', 'VERGUENZA', 'GRATITUD', 'NOSTALGIA'] },
  { id: 280, theme: 'Geografia', icon: '🗺️', rows: 7, cols: 8, words: ['ALTIPLANO', 'ECUADOR', 'LLANURA', 'ISLA', 'MONTANA', 'VALLE', 'BAHIA', 'COSTA', 'GLACIAR'] },
  { id: 281, theme: 'Insectos', icon: '🐝', rows: 7, cols: 8, words: ['CUCARACHA', 'POLILLA', 'CIGARRA', 'LIBELULA', 'ESCARABAJO', 'TERMITA', 'MARIPOSA'] },
  { id: 282, theme: 'Aves', icon: '🦜', rows: 7, cols: 8, words: ['AVESTRUZ', 'GORRION', 'COLIBRI', 'HALCON', 'FLAMENCO', 'FAISAN', 'CUERVO', 'PINGUINO'] },
  { id: 283, theme: 'Mar', icon: '🐠', rows: 7, cols: 8, words: ['PULPO', 'CORAL', 'LANGOSTA', 'ATUN', 'ANEMONA', 'DELFIN', 'ALGA', 'CANGREJO', 'RAYA', 'OSTRA'] },
  { id: 284, theme: 'Granja', icon: '🐄', rows: 7, cols: 8, words: ['GALLINA', 'GANSO', 'ORDENE', 'CORRAL', 'CERDO', 'GRANJERO', 'CABRA', 'CABALLO', 'TRACTOR'] },
  { id: 285, theme: 'Fiesta', icon: '🎉', rows: 7, cols: 8, words: ['CUMPLEANOS', 'DISFRAZ', 'VELA', 'BRINDIS', 'REGALO', 'CANCION', 'CONFETI', 'BRINDIS2'] },
  { id: 286, theme: 'Matematica', icon: '🔢', rows: 7, cols: 8, words: ['CIRCULO', 'CUADRADO', 'PERIMETRO', 'TRIANGULO', 'MEDIDA', 'PROBLEMA', 'RESTA', 'SUMA'] },
  { id: 287, theme: 'Historia', icon: '🏛️', rows: 7, cols: 8, words: ['IMPERIO', 'CIVILIZACION', 'CORONA', 'REINA', 'CONQUISTA', 'MONUMENTO', 'DINASTIA'] },
  { id: 288, theme: 'Literatura', icon: '📖', rows: 7, cols: 8, words: ['AUTOR', 'METAFORA', 'BIBLIOTECA', 'CUENTO', 'FABULA', 'LIBRO', 'TRAMA', 'VERSO', 'NOVELA'] },
  { id: 289, theme: 'Astronomia', icon: '🔭', rows: 7, cols: 8, words: ['ROTACION', 'UNIVERSO', 'SATELITE', 'ASTEROIDE', 'ORBITA', 'METEORO', 'TRASLACION'] },
  { id: 290, theme: 'Salud', icon: '🏥', rows: 7, cols: 8, words: ['CIRUGIA', 'RADIOGRAFIA', 'TERMOMETRO', 'QUIROFANO', 'DIAGNOSTICO', 'ANALISIS'] },
  { id: 291, theme: 'Construccion', icon: '🏗️', rows: 7, cols: 8, words: ['VIGA', 'ANDAMIO', 'PLANO', 'LADRILLO', 'GRUA', 'PARED', 'VENTANA', 'ESCALERA', 'CIMIENTO'] },
  { id: 292, theme: 'Videojuegos', icon: '🎮', rows: 7, cols: 8, words: ['PERSONAJE', 'ESTRATEGIA', 'LOGRO', 'PUNTAJE', 'DERROTA', 'MULTIJUGADOR', 'MISION'] },
  { id: 293, theme: 'Moda', icon: '👗', rows: 7, cols: 8, words: ['COSTURA', 'BOLSO', 'TEJIDO', 'VITRINA', 'MAQUILLAJE', 'BOTON', 'PERFUME', 'DISENADOR'] },
  { id: 294, theme: 'Ecologia', icon: '🌍', rows: 7, cols: 8, words: ['CONTAMINACION', 'RECICLAJE', 'EMISION', 'ESPECIE', 'BIODIVERSIDAD', 'RESIDUO'] },
  { id: 295, theme: 'Postres', icon: '🍰', rows: 7, cols: 8, words: ['GELATINA', 'BROWNIE', 'FRUTILLA', 'ALFAJOR', 'CREMA', 'TIRAMISU', 'TARTA', 'MERENGUE'] },
  { id: 296, theme: 'Bebidas', icon: '🥤', rows: 7, cols: 8, words: ['VINO', 'CERVEZA', 'INFUSION', 'MATE', 'CAFE', 'LICUADO', 'JUGO', 'GASEOSA', 'COCTEL', 'LECHE'] },
  { id: 297, theme: 'Piratas', icon: '🏴‍☠️', rows: 7, cols: 8, words: ['MONEDA', 'CAPITAN', 'LORO', 'CANON', 'ANCLA', 'PARCHE', 'TESORO', 'MAPA', 'GALEON', 'BANDERA'] },
  { id: 298, theme: 'Halloween', icon: '🎃', rows: 7, cols: 8, words: ['ARANA', 'TELARANA', 'FANTASMA', 'MURCIELAGO', 'VAMPIRO', 'LUNA', 'DISFRAZ', 'CALDERO'] },
  { id: 299, theme: 'Navidad', icon: '🎄', rows: 7, cols: 8, words: ['NOCHEBUENA', 'ARBOL', 'NIEVE', 'VELA', 'RENO', 'MEDIA', 'ESTRELLA', 'CHIMENEA', 'CAMPANA'] },
  { id: 300, theme: 'Dinosaurios', icon: '🦕', rows: 7, cols: 8, words: ['EXTINCION', 'ESQUELETO', 'VELOCIRAPTOR', 'CARNIVORO', 'REPTIL', 'FOSIL', 'VOLCAN'] },
  { id: 301, theme: 'Superheroes', icon: '🦸', rows: 7, cols: 8, words: ['PODER', 'LABORATORIO', 'VUELO', 'ANTIFAZ', 'ESCUDO', 'RESCATE', 'CAPA', 'SUPERFUERZA'] },
  { id: 302, theme: 'Circo', icon: '🎪', rows: 7, cols: 8, words: ['ELEFANTE', 'TRAPECIO', 'ACROBATA', 'CARPA', 'EQUILIBRISTA', 'PAYASO', 'PISTA', 'LEON'] },
  { id: 303, theme: 'Camping', icon: '🏕️', rows: 7, cols: 8, words: ['INSECTO', 'FOGON', 'LINTERNA', 'CANTIMPLORA', 'BOLSA', 'CARPA', 'SENDERO', 'ESTRELLA'] },
  { id: 304, theme: 'Jardin', icon: '🌷', rows: 7, cols: 8, words: ['TALLO', 'HOJA', 'ROSAL', 'ABONO', 'FLOR', 'RAIZ', 'MACETA', 'JARDINERO', 'TIJERA', 'REGADERA'] },
  { id: 305, theme: 'Panaderia', icon: '🥖', rows: 7, cols: 8, words: ['MIGA', 'GLASEADO', 'HORNO', 'BANDEJA', 'AMASAR', 'HARINA', 'MASA', 'PAN', 'MOLDE', 'LEVADURA'] },
  { id: 306, theme: 'Invierno', icon: '❄️', rows: 7, cols: 8, words: ['ABRIGO', 'GORRO', 'ESTUFA', 'ESQUI', 'GUANTE', 'NIEVE', 'BOTAS', 'VENTISCA', 'TRINEO', 'FRIO'] },
  { id: 307, theme: 'Egipto', icon: '🏺', rows: 7, cols: 8, words: ['TUMBA', 'RIO', 'ESFINGE', 'TEMPLO', 'MOMIA', 'OASIS', 'JEROGLIFICO', 'DESIERTO', 'FARAON'] },
  { id: 308, theme: 'Vikingos', icon: '⚔️', rows: 7, cols: 8, words: ['HACHA', 'GUERRERO', 'CUERNO', 'BARCO', 'ESPADA', 'LEYENDA', 'CASCO', 'RUNAS', 'CONQUISTA'] },
  { id: 309, theme: 'Cuentos', icon: '🏰', rows: 7, cols: 8, words: ['BOSQUE', 'HECHIZO', 'BRUJA', 'GIGANTE', 'CASTILLO', 'ESPEJO', 'TESORO', 'CORONA', 'REINO'] },
  { id: 310, theme: 'Cocina', icon: '🍳', rows: 7, cols: 8, words: ['CANELA', 'VINAGRE', 'MANTEL', 'MIEL', 'LEVADURA', 'REPOSTERIA', 'LECHE', 'COLADOR', 'SAL'] },
  { id: 311, theme: 'Animales', icon: '🐾', rows: 7, cols: 8, words: ['TOPO', 'MONO', 'ELEFANTE', 'ERIZO', 'LOBO', 'JAGUAR', 'GORILA', 'PATO', 'RANA', 'BUFALO', 'ZORRO'] },
  { id: 312, theme: 'Playa', icon: '🏖️', rows: 7, cols: 8, words: ['BRONCEADOR', 'MAREA', 'CAMARON', 'PALA', 'BOTE', 'PESCA', 'CANGREJO', 'ANCLA', 'ARRECIFE'] },
  { id: 313, theme: 'Oficina', icon: '🗂️', rows: 7, cols: 8, words: ['JEFE', 'FOLIO', 'MESA', 'ASCENSOR', 'CLIP', 'IMPRESORA', 'CLIENTE', 'BOLIGRAFO', 'TIJERA'] },
  { id: 314, theme: 'Espacio', icon: '🚀', rows: 7, cols: 8, words: ['LUNA', 'MISION', 'MERCURIO', 'AGUJERO', 'URANO', 'ORBITA', 'NAVE', 'ROBOT', 'MARTE', 'COHETE'] },
  { id: 315, theme: 'Musica', icon: '🎵', rows: 7, cols: 8, words: ['TAMBOR', 'FLAUTA', 'ARPA', 'BALADA', 'CLARINETE', 'SAXOFON', 'MELODIA', 'CANCION', 'CORO'] },
  { id: 316, theme: 'Deportes', icon: '⚽', rows: 7, cols: 8, words: ['ATLETISMO', 'ARQUERO', 'VOLEY', 'MEDALLA', 'CANCHA', 'KARATE', 'MARATON', 'VELOCIDAD'] },
  { id: 317, theme: 'Naturaleza', icon: '🌿', rows: 7, cols: 8, words: ['FLOR', 'PANTANO', 'LAGO', 'PRADERA', 'CORTEZA', 'RAMA', 'TIERRA', 'RIO', 'VIENTO', 'MATORRAL'] },
  { id: 318, theme: 'Cine y Arte', icon: '🎬', rows: 7, cols: 8, words: ['TRAMA', 'PANTALLA', 'LIENZO', 'CAMARA', 'ESCULTURA', 'REPARTO', 'ROL', 'PROTAGONISTA'] },
  { id: 319, theme: 'Tecnologia', icon: '💻', rows: 7, cols: 8, words: ['TECLADO', 'NUBE', 'RED', 'PROCESADOR', 'CONTRASENA', 'DATOS', 'ARCHIVO', 'APLICACION'] },
  { id: 320, theme: 'Colores', icon: '🎨', rows: 7, cols: 8, words: ['LILA', 'AGUAMARINA', 'MAGENTA', 'COBRE', 'ESMERALDA', 'DORADO', 'PERLA', 'BORDO', 'VERDE'] },
  { id: 321, theme: 'Frutas', icon: '🍎', rows: 7, cols: 8, words: ['POMELO', 'DURAZNO', 'MANGO', 'GRANADA', 'PERA', 'LICHI', 'PAPAYA', 'MANDARINA', 'GUAYABA'] },
  { id: 322, theme: 'Verduras', icon: '🥕', rows: 7, cols: 8, words: ['APIO', 'RUCULA', 'PAPA', 'HABAS', 'CHOCLO', 'CEBOLLA', 'ALCAUCIL', 'BERENJENA', 'LECHUGA'] },
  { id: 323, theme: 'Ropa', icon: '👕', rows: 7, cols: 8, words: ['SACO', 'CAMISA', 'BLUSA', 'BOTA', 'REMERA', 'CINTURON', 'POLLERA', 'TRAJE', 'ZAPATO', 'GORRA'] },
  { id: 324, theme: 'Cuerpo Humano', icon: '🧍', rows: 7, cols: 8, words: ['RODILLA', 'MEJILLA', 'MENTON', 'HOMBRO', 'BRAZO', 'BOCA', 'OREJA', 'CINTURA', 'OJO', 'MUNECA'] },
  { id: 325, theme: 'Familia', icon: '👪', rows: 7, cols: 8, words: ['CUNADO', 'PADRINO', 'MADRE', 'ESPOSA', 'NIETO', 'SOBRINO', 'SUEGRO', 'TIA', 'HERMANASTRO'] },
  { id: 326, theme: 'Escuela', icon: '📚', rows: 7, cols: 8, words: ['MAPA', 'TAREA', 'PIZARRON', 'MAESTRO', 'UNIFORME', 'RECREO', 'BOLETIN', 'ALUMNO', 'LIBRO'] },
  { id: 327, theme: 'Ciudad', icon: '🏙️', rows: 7, cols: 8, words: ['MERCADO', 'AVENIDA', 'ALCALDIA', 'PARQUE', 'MURO', 'FAROL', 'TERMINAL', 'SUBTERRANEO'] },
  { id: 328, theme: 'Clima', icon: '🌦️', rows: 7, cols: 8, words: ['ROCIO', 'ESCARCHA', 'TEMPESTAD', 'SOL', 'FRIO', 'NUBE', 'HURACAN', 'BRISA', 'SEQUIA', 'NIEVE'] },
  { id: 329, theme: 'Transporte', icon: '🚗', rows: 7, cols: 8, words: ['TRINEO', 'AUTO', 'BICI', 'GLOBO', 'CAMIONETA', 'BARCO', 'CARRUAJE', 'MOTO', 'HELICOPTERO'] },
  { id: 330, theme: 'Herramientas', icon: '🔧', rows: 7, cols: 8, words: ['GATO', 'NIVEL', 'FORMON', 'CINCEL', 'CINTA', 'SIERRA', 'SOLDADOR', 'CLAVO', 'PINZA', 'TENAZA'] },
  { id: 331, theme: 'Profesiones', icon: '👷', rows: 7, cols: 8, words: ['PSICOLOGO', 'ABOGADO', 'PERIODISTA', 'INGENIERO', 'COCINERO', 'PLOMERO', 'PINTOR'] },
  { id: 332, theme: 'Emociones', icon: '😊', rows: 7, cols: 8, words: ['ENTUSIASMO', 'VERGUENZA', 'ALEGRIA', 'CONFIANZA', 'CULPA', 'SERENIDAD', 'ORGULLO'] },
  { id: 333, theme: 'Geografia', icon: '🗺️', rows: 7, cols: 8, words: ['ECUADOR', 'GLACIAR', 'MESETA', 'COSTA', 'ISLA', 'RIO', 'VALLE', 'CONTINENTE', 'ALTIPLANO'] },
  { id: 334, theme: 'Insectos', icon: '🐝', rows: 7, cols: 8, words: ['SALTAMONTES', 'CIEMPIES', 'HORMIGA', 'ORUGA', 'MOSCA', 'MANTIS', 'MOSQUITO', 'PULGON'] },
  { id: 335, theme: 'Aves', icon: '🦜', rows: 7, cols: 8, words: ['BUHO', 'CANARIO', 'PINGUINO', 'GORRION', 'LORO', 'FAISAN', 'AVESTRUZ', 'COLIBRI', 'TUCAN'] },
  { id: 336, theme: 'Mar', icon: '🐠', rows: 7, cols: 8, words: ['PLANCTON', 'BALLENA', 'PULPO', 'FOCA', 'CANGREJO', 'CORAL', 'ESTRELLA', 'MOROENA', 'ATUN'] },
  { id: 337, theme: 'Granja', icon: '🐄', rows: 7, cols: 8, words: ['SEMBRADO', 'ESTABLO', 'OVEJA', 'CABALLO', 'PATO', 'CERDO', 'HENO', 'ORDENE', 'ARADO', 'PASTO'] },
  { id: 338, theme: 'Fiesta', icon: '🎉', rows: 7, cols: 8, words: ['INVITADO', 'ANFITRION', 'CONFETI', 'CANCION', 'GUIRNALDA', 'GLOBO', 'BAILE', 'MUSICA'] },
  { id: 339, theme: 'Matematica', icon: '🔢', rows: 7, cols: 8, words: ['FORMULA', 'FRACCION', 'NUMERO', 'TRIANGULO', 'VOLUMEN', 'RESTA', 'MULTIPLICACION'] },
  { id: 340, theme: 'Historia', icon: '🏛️', rows: 7, cols: 8, words: ['CORONA', 'CONQUISTA', 'CIVILIZACION', 'EJERCITO', 'COLONIA', 'TRATADO', 'IMPERIO'] },
  { id: 341, theme: 'Literatura', icon: '📖', rows: 7, cols: 8, words: ['NARRADOR', 'TRAMA', 'METAFORA', 'NOVELA', 'MANUSCRITO', 'LEYENDA', 'AUTOR', 'EPILOGO'] },
  { id: 342, theme: 'Astronomia', icon: '🔭', rows: 7, cols: 8, words: ['NEBULOSA', 'GALAXIA', 'ASTEROIDE', 'CONSTELACION', 'OBSERVATORIO', 'UNIVERSO'] },
  { id: 343, theme: 'Salud', icon: '🏥', rows: 7, cols: 8, words: ['TERMOMETRO', 'RADIOGRAFIA', 'QUIROFANO', 'HOSPITAL', 'TERAPIA', 'CONSULTORIO'] },
  { id: 344, theme: 'Construccion', icon: '🏗️', rows: 7, cols: 8, words: ['OBRERO', 'CIMIENTO', 'VIGA', 'HORMIGON', 'PLANO', 'GRUA', 'VENTANA', 'CAL', 'CASCO', 'PALETA'] },
  { id: 345, theme: 'Videojuegos', icon: '🎮', rows: 7, cols: 8, words: ['JEFE', 'PANTALLA', 'AVENTURA', 'MAPA', 'PUNTAJE', 'LOGRO', 'DESAFIO', 'CONSOLA', 'MISION'] },
  { id: 346, theme: 'Moda', icon: '👗', rows: 7, cols: 8, words: ['MAQUILLAJE', 'CREMALLERA', 'DISENADOR', 'DESFILE', 'TALLA', 'ACCESORIO', 'TEJIDO'] },
  { id: 347, theme: 'Ecologia', icon: '🌍', rows: 7, cols: 8, words: ['RENOVABLE', 'ENERGIA', 'DEFORESTACION', 'HUELLA', 'RECICLAJE', 'EMISION', 'CLIMA'] },
  { id: 348, theme: 'Postres', icon: '🍰', rows: 7, cols: 8, words: ['FLAN', 'MERENGUE', 'TORTA', 'FRUTILLA', 'MOUSSE', 'MASA', 'BOMBON', 'GELATINA', 'BROWNIE'] },
  { id: 349, theme: 'Bebidas', icon: '🥤', rows: 7, cols: 8, words: ['AGUA', 'BATIDO', 'LIMONADA', 'LICUADO', 'JUGO', 'NECTAR', 'VINO', 'CERVEZA', 'INFUSION', 'TE'] },
  { id: 350, theme: 'Piratas', icon: '🏴‍☠️', rows: 7, cols: 8, words: ['ESPADA', 'CAPITAN', 'COFRE', 'BANDERA', 'TESORO', 'MOTIN', 'MAPA', 'BRUJULA', 'CANON', 'ISLA'] },
  { id: 351, theme: 'Halloween', icon: '🎃', rows: 7, cols: 8, words: ['CALDERO', 'BRUJA', 'ESQUELETO', 'MURCIELAGO', 'DISFRAZ', 'CEMENTERIO', 'CALABAZA'] },
  { id: 352, theme: 'Navidad', icon: '🎄', rows: 7, cols: 8, words: ['MUERDAGO', 'VILLANCICO', 'REGALO', 'CAMPANA', 'NIEVE', 'GUIRNALDA', 'BASTON', 'MEDIA'] },
  { id: 353, theme: 'Dinosaurios', icon: '🦕', rows: 7, cols: 8, words: ['PANTANO', 'TRICERATOPS', 'CARNIVORO', 'VELOCIRAPTOR', 'COLA', 'FOSIL', 'JURASICO'] },
  { id: 354, theme: 'Superheroes', icon: '🦸', rows: 7, cols: 8, words: ['GUARIDA', 'PODER', 'MISION', 'JUSTICIA', 'TRAJE', 'CAPA', 'VILLANO', 'ANTIFAZ', 'MASCARA'] },
  { id: 355, theme: 'Circo', icon: '🎪', rows: 7, cols: 8, words: ['LEON', 'PISTA', 'EQUILIBRISTA', 'BOLETO', 'MAGO', 'ELEFANTE', 'ZANCOS', 'PAYASO', 'CANON'] },
  { id: 356, theme: 'Camping', icon: '🏕️', rows: 7, cols: 8, words: ['FOGATA', 'RIO', 'INSECTO', 'MONTANA', 'ESTRELLA', 'TIENDA', 'FOGON', 'BRUJULA', 'MOCHILA'] },
  { id: 357, theme: 'Jardin', icon: '🌷', rows: 7, cols: 8, words: ['SEMILLA', 'TIJERA', 'PASTO', 'RAIZ', 'INVERNADERO', 'TIERRA', 'MANGUERA', 'FLOR', 'TALLO'] },
  { id: 358, theme: 'Panaderia', icon: '🥖', rows: 7, cols: 8, words: ['AMASAR', 'HARINA', 'HORNO', 'MEDIALUNA', 'FACTURA', 'BOLLO', 'LEVADURA', 'TORTA', 'MOLDE'] },
  { id: 359, theme: 'Invierno', icon: '❄️', rows: 7, cols: 8, words: ['ESTUFA', 'HIELO', 'ABRIGO', 'NEVADA', 'TRINEO', 'MANTA', 'BOTAS', 'NIEVE', 'ESQUI', 'BUFANDA'] },
  { id: 360, theme: 'Egipto', icon: '🏺', rows: 7, cols: 8, words: ['OASIS', 'PIRAMIDE', 'TEMPLO', 'ESCARABAJO', 'RIO', 'JEROGLIFICO', 'CAMELLO', 'FARAON'] },
  { id: 361, theme: 'Vikingos', icon: '⚔️', rows: 7, cols: 8, words: ['TRIBU', 'RUNAS', 'REMO', 'DIOS', 'ESPADA', 'FIORDO', 'BATALLA', 'CUERNO', 'GUERRERO', 'BARCO'] },
  { id: 362, theme: 'Cuentos', icon: '🏰', rows: 7, cols: 8, words: ['MAGIA', 'BOSQUE', 'ESPEJO', 'HADA', 'BRUJA', 'HECHIZO', 'CASTILLO', 'CORONA', 'CABALLERO'] },
  { id: 363, theme: 'Cocina', icon: '🍳', rows: 7, cols: 8, words: ['BATIDORA', 'FUENTE', 'AJI', 'SOPA', 'VINAGRE', 'COLADOR', 'SARTEN', 'BANDEJA', 'PAN', 'GUISO'] },
  { id: 364, theme: 'Animales', icon: '🐾', rows: 7, cols: 8, words: ['PANTERA', 'NUTRIA', 'TOPO', 'VACA', 'LEON', 'CONEJO', 'CEBRA', 'RANA', 'HIPOPOTAMO', 'JIRAFA'] },
  { id: 365, theme: 'Playa', icon: '🏖️', rows: 7, cols: 8, words: ['MUELLE', 'ANCLA', 'BAHIA', 'FARO', 'BUCEO', 'CANOA', 'OLA', 'BALDE', 'PESCA', 'BRISA', 'SOL', 'ARENA'] },
  { id: 366, theme: 'Oficina', icon: '🗂️', rows: 7, cols: 8, words: ['CARTELERA', 'MESA', 'TIJERA', 'PRESUPUESTO', 'INFORME', 'CLIENTE', 'PIZARRA', 'LAPIZ'] },
  { id: 367, theme: 'Espacio', icon: '🚀', rows: 7, cols: 8, words: ['MERCURIO', 'ROBOT', 'COMETA', 'ASTRONAUTA', 'NEBULOSA', 'MODULO', 'ASTRO', 'VIA', 'MARTE'] },
  { id: 368, theme: 'Musica', icon: '🎵', rows: 7, cols: 8, words: ['BANDA', 'GUITARRA', 'FLAUTA', 'SAXOFON', 'CLARINETE', 'FESTIVAL', 'TROMPETA', 'PIANO'] },
  { id: 369, theme: 'Deportes', icon: '⚽', rows: 7, cols: 8, words: ['CAMPEONATO', 'BOXEO', 'KARATE', 'BASQUET', 'LUCHA', 'MARATON', 'ESGRIMA', 'VELOCIDAD'] },
  { id: 370, theme: 'Naturaleza', icon: '🌿', rows: 7, cols: 8, words: ['ROCA', 'HUMUS', 'MONTANA', 'SEMILLA', 'FLOR', 'PLANTA', 'HOJA', 'ENREDADERA', 'MANANTIAL'] },
  { id: 371, theme: 'Cine y Arte', icon: '🎬', rows: 7, cols: 8, words: ['VESTUARIO', 'TRAMA', 'EFECTO', 'ESTRENO', 'SUBTITULO', 'CINE', 'CAMARA', 'ROL', 'GALERIA'] },
  { id: 372, theme: 'Tecnologia', icon: '💻', rows: 7, cols: 8, words: ['BATERIA', 'PIXEL', 'CODIGO', 'MONITOR', 'MEMORIA', 'PROCESADOR', 'VIRUS', 'IMPRESORA'] },
  { id: 373, theme: 'Colores', icon: '🎨', rows: 7, cols: 8, words: ['MOSTAZA', 'NARANJA', 'GRIS', 'LILA', 'PLATEADO', 'AMARILLO', 'BORDO', 'CREMA', 'TURQUESA'] },
  { id: 374, theme: 'Frutas', icon: '🍎', rows: 8, cols: 9, words: ['HIGO', 'FRAMBUESA', 'COCO', 'MELON', 'MANGO', 'POMELO', 'DURAZNO', 'ARANDANO', 'BANANA', 'MARACUYA', 'CEREZA', 'PERA'] },
  { id: 375, theme: 'Verduras', icon: '🥕', rows: 8, cols: 9, words: ['CHOCLO', 'BROCOLI', 'RABANO', 'COLIFLOR', 'MORRON', 'PEREJIL', 'ZANAHORIA', 'PEPINO', 'BATATA', 'APIO', 'LECHUGA'] },
  { id: 376, theme: 'Ropa', icon: '👕', rows: 8, cols: 9, words: ['REMERA', 'CINTURON', 'PANTALON', 'BUFANDA', 'ZAPATILLA', 'SANDALIA', 'SHORT', 'BOTA', 'GUANTE', 'IMPERMEABLE'] },
  { id: 377, theme: 'Cuerpo Humano', icon: '🧍', rows: 8, cols: 9, words: ['OREJA', 'MEJILLA', 'PANTORRILLA', 'PIE', 'BRAZO', 'PECHO', 'PARPADO', 'TOBILLO', 'CABEZA', 'RODILLA', 'OJO', 'HOMBRO'] },
  { id: 378, theme: 'Familia', icon: '👪', rows: 8, cols: 9, words: ['TIO', 'PRIMO', 'ABUELO', 'SOBRINO', 'ESPOSO', 'ESPOSA', 'MADRE', 'PARIENTE', 'GEMELO', 'NIETO', 'HIJA', 'ABUELA', 'PADRE'] },
  { id: 379, theme: 'Escuela', icon: '📚', rows: 8, cols: 9, words: ['BIBLIOTECA', 'BOLETIN', 'MAESTRO', 'REGLA', 'DIPLOMA', 'CALCULADORA', 'LECTURA', 'TIZA', 'RECREO', 'PIZARRON'] },
  { id: 380, theme: 'Ciudad', icon: '🏙️', rows: 8, cols: 9, words: ['ESQUINA', 'ESTACIONAMIENTO', 'BARRIO', 'PUENTE', 'CIUDADANO', 'EDIFICIO', 'VECINO', 'PLAZA', 'FAROL', 'CALLE'] },
  { id: 381, theme: 'Clima', icon: '🌦️', rows: 8, cols: 9, words: ['NUBE', 'SEQUIA', 'SOL', 'ROCIO', 'TORMENTA', 'RAYO', 'MONZON', 'BRISA', 'VIENTO', 'HURACAN', 'TRUENO', 'LLUVIA', 'HELADA'] },
  { id: 382, theme: 'Transporte', icon: '🚗', rows: 8, cols: 9, words: ['AVION', 'CARRUAJE', 'HELICOPTERO', 'VELERO', 'SUBTE', 'CAMION', 'MOTO', 'GLOBO', 'CAMIONETA', 'BICI', 'MONOPATIN'] },
  { id: 383, theme: 'Herramientas', icon: '🔧', rows: 8, cols: 9, words: ['BROCA', 'PINZA', 'TORNILLO', 'TALADRO', 'ESCOFINA', 'TENAZA', 'NIVEL', 'CEPILLO', 'ESCUADRA', 'GATO', 'CLAVO', 'LIJA'] },
  { id: 384, theme: 'Profesiones', icon: '👷', rows: 8, cols: 9, words: ['BOMBERO', 'PERIODISTA', 'PILOTO', 'PANADERO', 'MEDICO', 'ENFERMERO', 'JARDINERO', 'INGENIERO', 'DENTISTA'] },
  { id: 385, theme: 'Emociones', icon: '😊', rows: 8, cols: 9, words: ['TRISTEZA', 'SORPRESA', 'GRATITUD', 'FRUSTRACION', 'MIEDO', 'ALEGRIA', 'VERGUENZA', 'EUFORIA', 'CONFIANZA'] },
  { id: 386, theme: 'Geografia', icon: '🗺️', rows: 8, cols: 9, words: ['VOLCAN', 'COSTA', 'PENINSULA', 'ALTIPLANO', 'MONTANA', 'DESIERTO', 'ECUADOR', 'RIO', 'OCEANO', 'ESTRECHO', 'POLO'] },
  { id: 387, theme: 'Insectos', icon: '🐝', rows: 8, cols: 9, words: ['SALTAMONTES', 'MANTIS', 'CIGARRA', 'CUCARACHA', 'LUCIERNAGA', 'ABEJA', 'MARIPOSA', 'ESCARABAJO', 'AVISPA'] },
  { id: 388, theme: 'Aves', icon: '🦜', rows: 8, cols: 9, words: ['PETIRROJO', 'LORO', 'FLAMENCO', 'BUHO', 'COLIBRI', 'CONDOR', 'AGUILA', 'AVESTRUZ', 'CUERVO', 'HALCON', 'PINGUINO'] },
  { id: 389, theme: 'Mar', icon: '🐠', rows: 8, cols: 9, words: ['FOCA', 'MEDUSA', 'ANEMONA', 'TIBURON', 'ATUN', 'LANGOSTA', 'ALGA', 'MOROENA', 'PEZ', 'CARACOL', 'BALLENA', 'ARRECIFE'] },
  { id: 390, theme: 'Granja', icon: '🐄', rows: 8, cols: 9, words: ['CABRA', 'OVEJA', 'SEMBRADO', 'CABALLO', 'CORRAL', 'ARADO', 'CERDO', 'HENO', 'ORDENE', 'SILO', 'GALLINA', 'PASTO', 'GANSO'] },
  { id: 391, theme: 'Fiesta', icon: '🎉', rows: 8, cols: 9, words: ['SERPENTINA', 'ANFITRION', 'INVITADO', 'BRINDIS2', 'SORPRESA', 'BRINDIS', 'BAILE', 'BANQUETE', 'GUIRNALDA'] },
  { id: 392, theme: 'Matematica', icon: '🔢', rows: 8, cols: 9, words: ['DECIMAL', 'CALCULO', 'NUMERO', 'RESTA', 'VOLUMEN', 'GRAFICO', 'PERIMETRO', 'PORCENTAJE', 'MEDIDA', 'DIVISION'] },
  { id: 393, theme: 'Historia', icon: '🏛️', rows: 8, cols: 9, words: ['REVOLUCION', 'CONQUISTA', 'PIRAMIDE', 'ARQUEOLOGIA', 'MONUMENTO', 'COLONIA', 'CIVILIZACION', 'ESPADA'] },
  { id: 394, theme: 'Literatura', icon: '📖', rows: 8, cols: 9, words: ['MANUSCRITO', 'LEYENDA', 'VERSO', 'CUENTO', 'NARRADOR', 'EDITORIAL', 'CAPITULO', 'EPILOGO', 'LECTOR', 'NOVELA'] },
  { id: 395, theme: 'Astronomia', icon: '🔭', rows: 8, cols: 9, words: ['GALAXIA', 'ORBITA', 'OBSERVATORIO', 'METEORO', 'NEBULOSA', 'SATELITE', 'COMETA', 'CRATER', 'CONSTELACION'] },
  { id: 396, theme: 'Salud', icon: '🏥', rows: 8, cols: 9, words: ['TERMOMETRO', 'PACIENTE', 'TERAPIA', 'JERINGA', 'RECETA', 'CAMILLA', 'CONSULTORIO', 'ENFERMERA', 'CIRUGIA'] },
  { id: 397, theme: 'Construccion', icon: '🏗️', rows: 8, cols: 9, words: ['LADRILLO', 'ESCALERA', 'PARED', 'CASCO', 'CAL', 'CIMIENTO', 'ANDAMIO', 'TECHO', 'NIVEL', 'ARENA', 'PLANO', 'GRUA', 'VIGA'] },
  { id: 398, theme: 'Videojuegos', icon: '🎮', rows: 8, cols: 9, words: ['ARCADE', 'CONSOLA', 'LOGRO', 'MAPA', 'MANDO', 'MULTIJUGADOR', 'JEFE', 'INVENTARIO', 'PANTALLA', 'NIVEL', 'MISION'] },
  { id: 399, theme: 'Moda', icon: '👗', rows: 8, cols: 9, words: ['TALLA', 'TEXTIL', 'COSTURA', 'BOTON', 'TENDENCIA', 'CREMALLERA', 'ACCESORIO', 'MAQUILLAJE', 'DESFILE', 'JOYA'] },
  { id: 400, theme: 'Ecologia', icon: '🌍', rows: 8, cols: 9, words: ['ENERGIA', 'HABITAT', 'EXTINCION', 'RECICLAJE', 'BIODIVERSIDAD', 'SUSTENTABLE', 'HUELLA', 'ECOSISTEMA'] },
  { id: 401, theme: 'Postres', icon: '🍰', rows: 8, cols: 9, words: ['MERENGUE', 'FLAN', 'DULCE', 'CHOCOLATE', 'TIRAMISU', 'BUDIN', 'MASA', 'VAINILLA', 'GALLETA', 'BOMBON', 'GELATINA'] },
  { id: 402, theme: 'Bebidas', icon: '🥤', rows: 8, cols: 9, words: ['INFUSION', 'NECTAR', 'SODA', 'MATE', 'VINO', 'AGUA', 'LICUADO', 'COCTEL', 'CERVEZA', 'LIMONADA', 'BATIDO', 'CAFE', 'JUGO'] },
  { id: 403, theme: 'Piratas', icon: '🏴‍☠️', rows: 8, cols: 9, words: ['PARCHE', 'LORO', 'COFRE', 'GALEON', 'ESPADA', 'MAPA', 'TESORO', 'CANON', 'TRIPULACION', 'BANDERA', 'BARCO', 'CAPITAN'] },
  { id: 404, theme: 'Halloween', icon: '🎃', rows: 8, cols: 9, words: ['MOMIA', 'FANTASMA', 'POCION', 'BRUJA', 'CADENA', 'DISFRAZ', 'CALDERO', 'CALABAZA', 'VAMPIRO', 'ESQUELETO', 'LUNA'] },
  { id: 405, theme: 'Navidad', icon: '🎄', rows: 8, cols: 9, words: ['GUIRNALDA', 'CHIMENEA', 'BASTON', 'VELA', 'ADORNO', 'TRINEO', 'MUERDAGO', 'MEDIA', 'REGALO', 'RENO', 'VILLANCICO'] },
  { id: 406, theme: 'Dinosaurios', icon: '🦕', rows: 8, cols: 9, words: ['TRICERATOPS', 'ESQUELETO', 'COLA', 'EXTINCION', 'VOLCAN', 'CARNIVORO', 'PANTANO', 'HERBIVORO', 'JURASICO'] },
  { id: 407, theme: 'Superheroes', icon: '🦸', rows: 8, cols: 9, words: ['ESCUDO', 'RESCATE', 'TRAJE', 'CAPA', 'MASCARA', 'MISION', 'VILLANO', 'GUARIDA', 'ANTIFAZ', 'VUELO', 'LABORATORIO'] },
  { id: 408, theme: 'Circo', icon: '🎪', rows: 8, cols: 9, words: ['BOLETO', 'FUNAMBULO', 'TRAPECIO', 'PISTA', 'MAGO', 'EQUILIBRISTA', 'ZANCOS', 'ACROBATA', 'PAYASO', 'ELEFANTE'] },
  { id: 409, theme: 'Camping', icon: '🏕️', rows: 8, cols: 9, words: ['FOGON', 'SENDERO', 'BOLSA', 'CARPA', 'LINTERNA', 'FOGATA', 'MONTANA', 'INSECTO', 'ESTRELLA', 'BRUJULA', 'MOCHILA'] },
  { id: 410, theme: 'Jardin', icon: '🌷', rows: 8, cols: 9, words: ['PASTO', 'HOJA', 'INVERNADERO', 'TALLO', 'TIJERA', 'TIERRA', 'MANGUERA', 'FLOR', 'ABONO', 'RAIZ', 'MACETA', 'REGADERA'] },
  { id: 411, theme: 'Panaderia', icon: '🥖', rows: 8, cols: 9, words: ['MOLDE', 'GLASEADO', 'BANDEJA', 'BOLLO', 'HARINA', 'MEDIALUNA', 'AMASAR', 'MASA', 'MIGA', 'TORTA', 'FACTURA', 'RECETA'] },
  { id: 412, theme: 'Invierno', icon: '❄️', rows: 8, cols: 9, words: ['TRINEO', 'ABRIGO', 'NIEVE', 'VENTISCA', 'BOTAS', 'GORRO', 'CHIMENEA', 'HIELO', 'ESQUI', 'BUFANDA', 'NEVADA', 'ESTUFA'] },
  { id: 413, theme: 'Egipto', icon: '🏺', rows: 8, cols: 9, words: ['SARCOFAGO', 'TUMBA', 'ESCARABAJO', 'DESIERTO', 'PIRAMIDE', 'TEMPLO', 'OBELISCO', 'FARAON', 'CAMELLO', 'MOMIA'] },
  { id: 414, theme: 'Vikingos', icon: '⚔️', rows: 8, cols: 9, words: ['GUERRERO', 'CONQUISTA', 'LEYENDA', 'FIORDO', 'CASCO', 'DIOS', 'BATALLA', 'BARCO', 'TRIBU', 'CUERNO', 'HACHA', 'RUNAS'] },
  { id: 415, theme: 'Cuentos', icon: '🏰', rows: 8, cols: 9, words: ['GIGANTE', 'VARITA', 'HADA', 'TESORO', 'CABALLERO', 'PRINCESA', 'CORONA', 'CASTILLO', 'ESPEJO', 'HECHIZO', 'REINO'] },
  { id: 416, theme: 'Cocina', icon: '🍳', rows: 8, cols: 9, words: ['ACEITE', 'VINAGRE', 'PLATO', 'TAZA', 'AZUCAR', 'ESPATULA', 'HUEVO', 'SOPA', 'TENEDOR', 'COLADOR', 'CUCHILLO', 'ARROZ'] },
  { id: 417, theme: 'Animales', icon: '🐾', rows: 8, cols: 9, words: ['OSO', 'CONEJO', 'RINOCERONTE', 'TOPO', 'CAMELLO', 'FOCA', 'PERRO', 'JIRAFA', 'CABALLO', 'RATON', 'GATO', 'MURCIELAGO'] },
  { id: 418, theme: 'Playa', icon: '🏖️', rows: 8, cols: 9, words: ['CANOA', 'MAR', 'ESNORQUEL', 'SOL', 'BRONCEADOR', 'ISLA', 'ACANTILADO', 'BOTE', 'ARRECIFE', 'FARO', 'OLA', 'MAREA', 'PALA'] },
  { id: 419, theme: 'Oficina', icon: '🗂️', rows: 8, cols: 9, words: ['CLIP', 'FOLIO', 'MARCADOR', 'MESA', 'CLIENTE', 'SILLA', 'PIZARRA', 'ARCHIVO', 'ESCRITORIO', 'IMPRESORA', 'AGENDA'] },
  { id: 420, theme: 'Espacio', icon: '🚀', rows: 8, cols: 9, words: ['ASTRO', 'GRAVEDAD', 'JUPITER', 'NEPTUNO', 'AGUJERO', 'CRATER', 'LUZ', 'VENUS', 'ORBITA', 'CONSTELACION', 'MISION'] },
  { id: 421, theme: 'Musica', icon: '🎵', rows: 8, cols: 9, words: ['ACORDE', 'BAJO', 'PIANO', 'ARPA', 'CANCION', 'BANDA', 'RITMO', 'SINFONIA', 'ORQUESTA', 'TROMPETA', 'AMPLIFICADOR'] },
  { id: 422, theme: 'Deportes', icon: '⚽', rows: 8, cols: 9, words: ['ARBITRO', 'CAMPEONATO', 'CICLISMO', 'NATACION', 'ENTRENADOR', 'ATLETISMO', 'EQUIPO', 'ESQUI', 'VELOCIDAD'] },
  { id: 423, theme: 'Naturaleza', icon: '🌿', rows: 8, cols: 9, words: ['ARBOL', 'DESIERTO', 'HUMUS', 'FLOR', 'LAGUNA', 'MANANTIAL', 'VALLE', 'NIEBLA', 'CASCADA', 'HOJA', 'RAIZ', 'RAMA', 'SELVA'] },
  { id: 424, theme: 'Cine y Arte', icon: '🎬', rows: 8, cols: 9, words: ['SUBTITULO', 'GUION', 'PROTAGONISTA', 'BOCETO', 'DECORADO', 'VESTUARIO', 'ROL', 'PREMIERE', 'ACTOR', 'RETRATO'] },
  { id: 425, theme: 'Tecnologia', icon: '💻', rows: 8, cols: 9, words: ['SENSOR', 'VIRUS', 'CHIP', 'ANTIVIRUS', 'ALGORITMO', 'DATOS', 'APLICACION', 'PROCESADOR', 'ROUTER', 'SERVIDOR'] },
  { id: 426, theme: 'Colores', icon: '🎨', rows: 8, cols: 9, words: ['AGUAMARINA', 'ROJO', 'CREMA', 'BEIGE', 'BLANCO', 'PERLA', 'MAGENTA', 'VIOLETA', 'GRIS', 'MARRON', 'PLATEADO', 'BORDO'] },
  { id: 427, theme: 'Frutas', icon: '🍎', rows: 8, cols: 9, words: ['GRANADA', 'NARANJA', 'PAPAYA', 'BANANA', 'MELON', 'MANDARINA', 'FRAMBUESA', 'MANZANA', 'FRUTILLA', 'HIGO', 'PERA'] },
  { id: 428, theme: 'Verduras', icon: '🥕', rows: 8, cols: 9, words: ['REMOLACHA', 'ZAPALLO', 'RUCULA', 'PAPA', 'PEPINO', 'CEBOLLA', 'BATATA', 'ESPINACA', 'COLIFLOR', 'MORRON', 'HABAS'] },
  { id: 429, theme: 'Ropa', icon: '👕', rows: 8, cols: 9, words: ['ZAPATILLA', 'PIJAMA', 'CAMISA', 'BLUSA', 'IMPERMEABLE', 'SANDALIA', 'SHORT', 'BOTA', 'MOCHILA', 'ZAPATO', 'GORRO'] },
  { id: 430, theme: 'Cuerpo Humano', icon: '🧍', rows: 8, cols: 9, words: ['BOCA', 'CODO', 'MEJILLA', 'TOBILLO', 'PESTANA', 'NARIZ', 'CABEZA', 'OREJA', 'RODILLA', 'PANTORRILLA', 'PIERNA', 'PIE'] },
  { id: 431, theme: 'Familia', icon: '👪', rows: 8, cols: 9, words: ['ABUELA', 'CUNADO', 'FAMILIA', 'ABUELO', 'NIETO', 'PADRE', 'HERMANO', 'BISABUELO', 'PRIMO', 'TIO', 'SUEGRO', 'MADRINA'] },
  { id: 432, theme: 'Escuela', icon: '📚', rows: 8, cols: 9, words: ['EXAMEN', 'LECTURA', 'MOCHILA', 'RECREO', 'UNIFORME', 'LAPIZ', 'LIBRO', 'DIRECTOR', 'PIZARRON', 'TAREA', 'MAESTRO'] },
  { id: 433, theme: 'Ciudad', icon: '🏙️', rows: 8, cols: 9, words: ['SEMAFORO', 'CIUDADANO', 'AVENIDA', 'MUNICIPIO', 'ESQUINA', 'MERCADO', 'ESTACION', 'SUBTERRANEO', 'PUENTE'] },
  { id: 434, theme: 'Clima', icon: '🌦️', rows: 8, cols: 9, words: ['HURACAN', 'FRIO', 'HELADA', 'NUBE', 'CALOR', 'MONZON', 'ESCARCHA', 'VIENTO', 'SEQUIA', 'HUMEDAD', 'NIEVE', 'TORMENTA'] },
  { id: 435, theme: 'Transporte', icon: '🚗', rows: 8, cols: 9, words: ['SUBTE', 'YATE', 'BARCO', 'GLOBO', 'TAXI', 'CAMION', 'AUTO', 'TRINEO', 'CARRETA', 'TRANVIA', 'MONOPATIN', 'TELEFERICO'] },
  { id: 436, theme: 'Herramientas', icon: '🔧', rows: 8, cols: 9, words: ['ESCOFINA', 'LLAVE', 'TALADRO', 'FORMON', 'TENAZA', 'CINTA', 'CINCEL', 'DESTORNILLADOR', 'PINZA', 'LIJA', 'SIERRA'] },
  { id: 437, theme: 'Profesiones', icon: '👷', rows: 8, cols: 9, words: ['PILOTO', 'POLICIA', 'BOMBERO', 'ELECTRICISTA', 'MEDICO', 'ENFERMERO', 'PSICOLOGO', 'MAESTRO', 'INGENIERO'] },
  { id: 438, theme: 'Emociones', icon: '😊', rows: 8, cols: 9, words: ['TRISTEZA', 'ORGULLO', 'CURIOSIDAD', 'CULPA', 'SERENIDAD', 'MIEDO', 'GRATITUD', 'SORPRESA', 'ALEGRIA', 'ENOJO'] },
  { id: 439, theme: 'Geografia', icon: '🗺️', rows: 8, cols: 9, words: ['OCEANO', 'MESETA', 'COSTA', 'PENINSULA', 'RIO', 'CONTINENTE', 'LLANURA', 'ECUADOR', 'POLO', 'VOLCAN', 'ALTIPLANO'] },
  { id: 440, theme: 'Insectos', icon: '🐝', rows: 8, cols: 9, words: ['ESCARABAJO', 'ABEJA', 'MANTIS', 'TERMITA', 'CIEMPIES', 'LIBELULA', 'PULGON', 'CIGARRA', 'LUCIERNAGA', 'ORUGA'] },
  { id: 441, theme: 'Aves', icon: '🦜', rows: 8, cols: 9, words: ['TUCAN', 'GORRION', 'AGUILA', 'AVESTRUZ', 'CIGUENA', 'HALCON', 'PALOMA', 'PINGUINO', 'LORO', 'PERDIZ', 'PETIRROJO'] },
  { id: 442, theme: 'Mar', icon: '🐠', rows: 8, cols: 9, words: ['ANEMONA', 'CANGREJO', 'TIBURON', 'PLANCTON', 'CORAL', 'DELFIN', 'CARACOL', 'RAYA', 'ALGA', 'FOCA', 'ATUN', 'LANGOSTA'] },
  { id: 443, theme: 'Granja', icon: '🐄', rows: 8, cols: 9, words: ['GALLO', 'PATO', 'GANSO', 'GRANERO', 'SEMBRADO', 'PASTO', 'ARADO', 'VACA', 'GRANJERO', 'COSECHA', 'OVEJA', 'HENO', 'CERDO'] },
  { id: 444, theme: 'Fiesta', icon: '🎉', rows: 8, cols: 9, words: ['GLOBO', 'VELA', 'ANFITRION', 'DISFRAZ', 'CUMPLEANOS', 'BRINDIS2', 'MUSICA', 'GUIRNALDA', 'BRINDIS', 'CONFETI'] },
  { id: 445, theme: 'Matematica', icon: '🔢', rows: 8, cols: 9, words: ['VARIABLE', 'MEDIDA', 'DECIMAL', 'MULTIPLICACION', 'PORCENTAJE', 'NUMERO', 'ECUACION', 'SUMA', 'GEOMETRIA'] },
  { id: 446, theme: 'Historia', icon: '🏛️', rows: 8, cols: 9, words: ['CIVILIZACION', 'IMPERIO', 'CORONA', 'REY', 'REINA', 'COLONIA', 'TRONO', 'MONUMENTO', 'REVOLUCION', 'EJERCITO'] },
  { id: 447, theme: 'Literatura', icon: '📖', rows: 8, cols: 9, words: ['CAPITULO', 'LEYENDA', 'FABULA', 'EPILOGO', 'CUENTO', 'METAFORA', 'TRAMA', 'NOVELA', 'BIBLIOTECA', 'PERSONAJE'] },
  { id: 448, theme: 'Astronomia', icon: '🔭', rows: 8, cols: 9, words: ['PLANETA', 'METEORO', 'OBSERVATORIO', 'ORBITA', 'UNIVERSO', 'SATELITE', 'SUPERNOVA', 'GALAXIA', 'NEBULOSA'] },
  { id: 449, theme: 'Salud', icon: '🏥', rows: 8, cols: 9, words: ['PACIENTE', 'RECETA', 'VACUNA', 'PASTILLA', 'HOSPITAL', 'TERAPIA', 'JERINGA', 'CAMILLA', 'VENDAJE', 'ANALISIS'] },
  { id: 450, theme: 'Construccion', icon: '🏗️', rows: 8, cols: 9, words: ['ARENA', 'TECHO', 'CASCO', 'GRUA', 'PLANO', 'PALETA', 'ANDAMIO', 'ESCALERA', 'EXCAVADORA', 'NIVEL', 'CEMENTO', 'PARED'] },
  { id: 451, theme: 'Videojuegos', icon: '🎮', rows: 8, cols: 9, words: ['PIXEL', 'ARCADE', 'ESTRATEGIA', 'LOGRO', 'MULTIJUGADOR', 'MAPA', 'INVENTARIO', 'DESAFIO', 'MANDO', 'AVENTURA'] },
  { id: 452, theme: 'Moda', icon: '👗', rows: 8, cols: 9, words: ['ESTILO', 'TENDENCIA', 'COSTURA', 'TALLA', 'VITRINA', 'CREMALLERA', 'DESFILE', 'BOLSO', 'PERFUME', 'ACCESORIO'] },
  { id: 453, theme: 'Ecologia', icon: '🌍', rows: 8, cols: 9, words: ['CONTAMINACION', 'SUSTENTABLE', 'RENOVABLE', 'RESIDUO', 'HABITAT', 'ECOSISTEMA', 'COMPOST', 'AMBIENTE'] },
  { id: 454, theme: 'Postres', icon: '🍰', rows: 8, cols: 9, words: ['TORTA', 'CARAMELO', 'BOMBON', 'TIRAMISU', 'FRUTILLA', 'MASA', 'GALLETA', 'BUDIN', 'GELATINA', 'BROWNIE', 'MOUSSE'] },
  { id: 455, theme: 'Bebidas', icon: '🥤', rows: 8, cols: 9, words: ['COCTEL', 'LIMONADA', 'AGUA', 'INFUSION', 'MATE', 'BATIDO', 'NECTAR', 'CERVEZA', 'VINO', 'JUGO', 'SODA', 'CAFE', 'LECHE', 'TE'] },
  { id: 456, theme: 'Piratas', icon: '🏴‍☠️', rows: 8, cols: 9, words: ['CANON', 'ESPADA', 'COFRE', 'MOTIN', 'MONEDA', 'MAPA', 'GALEON', 'TESORO', 'ISLA', 'BANDERA', 'TRIPULACION', 'BRUJULA'] },
  { id: 457, theme: 'Halloween', icon: '🎃', rows: 8, cols: 9, words: ['CALDERO', 'ARANA', 'TELARANA', 'CADENA', 'FANTASMA', 'LUNA', 'MURCIELAGO', 'ESQUELETO', 'MOMIA', 'CEMENTERIO'] },
  { id: 458, theme: 'Navidad', icon: '🎄', rows: 8, cols: 9, words: ['CAMPANA', 'RENO', 'VELA', 'TRINEO', 'CHIMENEA', 'GUIRNALDA', 'VILLANCICO', 'MEDIA', 'REGALO', 'NIEVE', 'MUERDAGO'] },
  { id: 459, theme: 'Dinosaurios', icon: '🦕', rows: 8, cols: 9, words: ['HUEVO', 'TRICERATOPS', 'ESQUELETO', 'COLA', 'TIRANOSAURIO', 'CARNIVORO', 'GARRA', 'EXTINCION', 'JURASICO'] },
  { id: 460, theme: 'Superheroes', icon: '🦸', rows: 8, cols: 9, words: ['RESCATE', 'VILLANO', 'CAPA', 'MISION', 'TRAJE', 'VUELO', 'ENEMIGO', 'ANTIFAZ', 'JUSTICIA', 'SUPERFUERZA', 'PODER'] },
  { id: 461, theme: 'Circo', icon: '🎪', rows: 8, cols: 9, words: ['EQUILIBRISTA', 'FUNAMBULO', 'CARPA', 'PAYASO', 'PISTA', 'ZANCOS', 'BOLETO', 'MALABARISTA', 'DOMADOR', 'CANON'] },
  { id: 462, theme: 'Camping', icon: '🏕️', rows: 8, cols: 9, words: ['FOGATA', 'BRUJULA', 'BOLSA', 'LINTERNA', 'CANTIMPLORA', 'MONTANA', 'ESTRELLA', 'TIENDA', 'SENDERO', 'INSECTO'] },
  { id: 463, theme: 'Jardin', icon: '🌷', rows: 8, cols: 9, words: ['PASTO', 'REGADERA', 'JARDINERO', 'SEMILLA', 'HOJA', 'FLOR', 'MACETA', 'TALLO', 'INVERNADERO', 'MANGUERA', 'ABONO'] },
  { id: 464, theme: 'Panaderia', icon: '🥖', rows: 8, cols: 9, words: ['LEVADURA', 'PAN', 'MIGA', 'RECETA', 'MOLDE', 'TORTA', 'HARINA', 'BANDEJA', 'GLASEADO', 'AMASAR', 'MEDIALUNA', 'HORNO'] },
  { id: 465, theme: 'Invierno', icon: '❄️', rows: 8, cols: 9, words: ['GORRO', 'HIELO', 'BOTAS', 'VENTISCA', 'BUFANDA', 'ABRIGO', 'ESQUI', 'GUANTE', 'CHIMENEA', 'NEVADA', 'TRINEO', 'MANTA'] },
  { id: 466, theme: 'Egipto', icon: '🏺', rows: 8, cols: 9, words: ['JEROGLIFICO', 'MOMIA', 'ESCARABAJO', 'OASIS', 'TEMPLO', 'PIRAMIDE', 'FARAON', 'CAMELLO', 'SARCOFAGO', 'TUMBA'] },
  { id: 467, theme: 'Vikingos', icon: '⚔️', rows: 8, cols: 9, words: ['ESPADA', 'GUERRERO', 'CONQUISTA', 'RUNAS', 'ESCUDO', 'CASCO', 'HACHA', 'DIOS', 'TRIBU', 'CUERNO', 'BATALLA', 'FIORDO'] },
  { id: 468, theme: 'Cuentos', icon: '🏰', rows: 8, cols: 9, words: ['PRINCESA', 'BRUJA', 'TESORO', 'DRAGON', 'ESPEJO', 'REINO', 'VARITA', 'CASTILLO', 'HECHIZO', 'CORONA', 'CABALLERO'] },
  { id: 469, theme: 'Cocina', icon: '🍳', rows: 8, cols: 9, words: ['PLATO', 'ARROZ', 'COLADOR', 'OREGANO', 'BATIDORA', 'REPOSTERIA', 'CUCHARA', 'SOPA', 'AJI', 'AZUCAR', 'MIEL', 'CANELA'] },
  { id: 470, theme: 'Animales', icon: '🐾', rows: 8, cols: 9, words: ['ZORRO', 'TOPO', 'ALCE', 'CANGURO', 'PANTERA', 'HIPOPOTAMO', 'LINCE', 'LEON', 'LOBO', 'PATO', 'GORILA', 'CAMELLO', 'PERRO'] },
  { id: 471, theme: 'Playa', icon: '🏖️', rows: 8, cols: 9, words: ['COSTA', 'ESNORQUEL', 'ARENA', 'BRISA', 'SURF', 'SOL', 'BRONCEADOR', 'OLA', 'MUELLE', 'BOTE', 'ARRECIFE', 'PALA', 'VERANO'] },
  { id: 472, theme: 'Oficina', icon: '🗂️', rows: 8, cols: 9, words: ['CINTA', 'PIZARRA', 'INFORME', 'PROYECTO', 'MOUSE', 'MESA', 'ASCENSOR', 'PRESUPUESTO', 'OFICINISTA', 'REUNION'] },
  { id: 473, theme: 'Espacio', icon: '🚀', rows: 8, cols: 9, words: ['CRATER', 'SATURNO', 'COHETE', 'ECLIPSE', 'NAVE', 'LUZ', 'JUPITER', 'METEORITO', 'MARTE', 'ASTRO', 'PLANETA', 'MODULO'] },
  { id: 474, theme: 'Musica', icon: '🎵', rows: 8, cols: 9, words: ['NOTA', 'ARPA', 'PARTITURA', 'AFINACION', 'CANCION', 'TAMBOR', 'PIANO', 'BALADA', 'LETRA', 'TROMPETA', 'CONCIERTO'] },
  { id: 475, theme: 'Deportes', icon: '⚽', rows: 8, cols: 9, words: ['MARATON', 'RUGBY', 'KARATE', 'HOCKEY', 'RAQUETA', 'ESQUI', 'CANCHA', 'ATLETISMO', 'SURF', 'ARBITRO', 'REMO', 'EQUIPO'] },
  { id: 476, theme: 'Naturaleza', icon: '🌿', rows: 8, cols: 9, words: ['CORTEZA', 'MUSGO', 'FLOR', 'ARROYO', 'PANTANO', 'HUMUS', 'NIEBLA', 'ECOSISTEMA', 'PRADERA', 'ROCIO', 'BOSQUE', 'HOJA'] },
  { id: 477, theme: 'Cine y Arte', icon: '🎬', rows: 8, cols: 9, words: ['PROTAGONISTA', 'MAQUILLAJE', 'ROL', 'DIRECTOR', 'DECORADO', 'TRAMA', 'PANTALLA', 'TALLER', 'PINTURA', 'GUION'] },
  { id: 478, theme: 'Tecnologia', icon: '💻', rows: 8, cols: 9, words: ['VIRUS', 'INTERNET', 'MEMORIA', 'ACTUALIZACION', 'ROUTER', 'CODIGO', 'PLATAFORMA', 'NUBE', 'CHIP', 'ALGORITMO'] },
  { id: 479, theme: 'Colores', icon: '🎨', rows: 8, cols: 9, words: ['BLANCO', 'AMARILLO', 'ROSA', 'BEIGE', 'INDIGO', 'ESMERALDA', 'CREMA', 'CELESTE', 'PERLA', 'VERDE', 'PLATEADO', 'OCRE'] },
  { id: 480, theme: 'Frutas', icon: '🍎', rows: 8, cols: 9, words: ['LICHI', 'PALTA', 'MANZANA', 'MANDARINA', 'COCO', 'FRUTILLA', 'ARANDANO', 'SANDIA', 'PAPAYA', 'CEREZA', 'MARACUYA'] },
  { id: 481, theme: 'Verduras', icon: '🥕', rows: 8, cols: 9, words: ['HABAS', 'TOMATE', 'RABANO', 'ACELGA', 'BERENJENA', 'CHOCLO', 'BROCOLI', 'PEPINO', 'COLIFLOR', 'RUCULA', 'LECHUGA'] },
  { id: 482, theme: 'Ropa', icon: '👕', rows: 8, cols: 9, words: ['ZAPATILLA', 'CAMISA', 'SANDALIA', 'CORBATA', 'OVEROL', 'SHORT', 'POLLERA', 'BOTA', 'PANTALON', 'GORRA', 'VESTIDO'] },
  { id: 483, theme: 'Cuerpo Humano', icon: '🧍', rows: 8, cols: 9, words: ['PIE', 'NARIZ', 'OREJA', 'PIERNA', 'PANTORRILLA', 'MEJILLA', 'TOBILLO', 'CUELLO', 'PESTANA', 'BOCA', 'RODILLA', 'CEJA'] },
  { id: 484, theme: 'Familia', icon: '👪', rows: 8, cols: 9, words: ['NIETO', 'MADRE', 'BISABUELO', 'MADRINA', 'ESPOSO', 'ABUELA', 'PADRE', 'HERMANASTRO', 'ABUELO', 'HIJO', 'PARIENTE'] },
  { id: 485, theme: 'Escuela', icon: '📚', rows: 9, cols: 10, words: ['CARTUCHERA', 'EXAMEN', 'PIZARRON', 'UNIFORME', 'DIRECTOR', 'AULA', 'DIPLOMA', 'MAPA', 'MOCHILA', 'RECREO', 'TAREA', 'TIZA', 'LAPIZ', 'CUADERNO'] },
  { id: 486, theme: 'Ciudad', icon: '🏙️', rows: 9, cols: 10, words: ['ESTACION', 'CALLE', 'MURO', 'EDIFICIO', 'VECINO', 'CIUDADANO', 'BARRIO', 'PUENTE', 'ALCALDIA', 'MERCADO', 'FAROL', 'PLAZA', 'ESQUINA', 'VEREDA'] },
  { id: 487, theme: 'Clima', icon: '🌦️', rows: 9, cols: 10, words: ['VIENTO', 'RAYO', 'GRANIZO', 'SEQUIA', 'VENDAVAL', 'SOL', 'NUBE', 'ROCIO', 'ARCOIRIS', 'ESCARCHA', 'TORMENTA', 'FRIO', 'HUMEDAD', 'NEBLINA', 'CALOR'] },
  { id: 488, theme: 'Transporte', icon: '🚗', rows: 9, cols: 10, words: ['CARRETA', 'TELEFERICO', 'MONOPATIN', 'YATE', 'CAMIONETA', 'BICI', 'BARCO', 'MOTO', 'TRANVIA', 'VELERO', 'GLOBO', 'CARRUAJE', 'CAMION', 'TRINEO'] },
  { id: 489, theme: 'Herramientas', icon: '🔧', rows: 9, cols: 10, words: ['NIVEL', 'CINCEL', 'CINTA', 'PINZA', 'ESCOFINA', 'TORNILLO', 'DESTORNILLADOR', 'LLAVE', 'MARTILLO', 'FORMON', 'GATO', 'TENAZA', 'CLAVO', 'BROCA'] },
  { id: 490, theme: 'Profesiones', icon: '👷', rows: 9, cols: 10, words: ['ENFERMERO', 'PANADERO', 'JARDINERO', 'PERIODISTA', 'MECANICO', 'PSICOLOGO', 'DENTISTA', 'PINTOR', 'POLICIA', 'INGENIERO', 'ABOGADO'] },
  { id: 491, theme: 'Emociones', icon: '😊', rows: 9, cols: 10, words: ['ANSIEDAD', 'ESPERANZA', 'CONFIANZA', 'CALMA', 'SERENIDAD', 'TERNURA', 'NOSTALGIA', 'SORPRESA', 'VERGUENZA', 'ENVIDIA', 'CURIOSIDAD'] },
  { id: 492, theme: 'Geografia', icon: '🗺️', rows: 9, cols: 10, words: ['CONTINENTE', 'POLO', 'MONTANA', 'PENINSULA', 'VALLE', 'CORDILLERA', 'ISLA', 'DELTA', 'LLANURA', 'MESETA', 'RIO', 'ALTIPLANO', 'OCEANO', 'BAHIA'] },
  { id: 493, theme: 'Insectos', icon: '🐝', rows: 9, cols: 10, words: ['AVISPA', 'LUCIERNAGA', 'SALTAMONTES', 'GRILLO', 'MANTIS', 'PULGON', 'POLILLA', 'ABEJA', 'HORMIGA', 'MARIPOSA', 'MOSQUITO', 'ESCARABAJO'] },
  { id: 494, theme: 'Aves', icon: '🦜', rows: 9, cols: 10, words: ['LORO', 'AVESTRUZ', 'BUHO', 'CANARIO', 'CUERVO', 'PALOMA', 'HALCON', 'PINGUINO', 'GAVIOTA', 'AGUILA', 'FAISAN', 'TUCAN', 'FLAMENCO', 'PETIRROJO'] },
  { id: 495, theme: 'Mar', icon: '🐠', rows: 9, cols: 10, words: ['MEDUSA', 'BALLENA', 'PLANCTON', 'DELFIN', 'MOROENA', 'ARRECIFE', 'ANEMONA', 'ATUN', 'FOCA', 'TIBURON', 'PULPO', 'CORAL', 'PEZ', 'OSTRA', 'LANGOSTA'] },
  { id: 496, theme: 'Granja', icon: '🐄', rows: 9, cols: 10, words: ['OVEJA', 'VACA', 'ORDENE', 'CABRA', 'GRANJERO', 'GRANERO', 'HENO', 'CORRAL', 'GALLINA', 'ESTABLO', 'PASTO', 'SILO', 'CERDO', 'ARADO', 'SEMBRADO', 'PATO'] },
  { id: 497, theme: 'Fiesta', icon: '🎉', rows: 9, cols: 10, words: ['GUIRNALDA', 'SORPRESA', 'MUSICA', 'TORTA', 'ANFITRION', 'INVITADO', 'SERPENTINA', 'REGALO', 'BRINDIS2', 'CUMPLEANOS', 'CANCION', 'VELA'] },
  { id: 498, theme: 'Matematica', icon: '🔢', rows: 9, cols: 10, words: ['GRAFICO', 'ECUACION', 'DIVISION', 'FORMULA', 'ANGULO', 'NUMERO', 'TRIANGULO', 'SUMA', 'CUADRADO', 'RESTA', 'CIRCULO', 'FRACCION', 'VOLUMEN'] },
  { id: 499, theme: 'Historia', icon: '🏛️', rows: 9, cols: 10, words: ['GUERRA', 'CASTILLO', 'ESPADA', 'IMPERIO', 'FORTALEZA', 'TRONO', 'PIRAMIDE', 'EJERCITO', 'MONUMENTO', 'CIVILIZACION', 'CONQUISTA', 'REY'] },
  { id: 500, theme: 'Literatura', icon: '📖', rows: 9, cols: 10, words: ['FABULA', 'VERSO', 'PERSONAJE', 'BIBLIOTECA', 'EDITORIAL', 'AUTOR', 'NOVELA', 'MANUSCRITO', 'PROLOGO', 'EPILOGO', 'METAFORA', 'NARRADOR'] },
  { id: 501, theme: 'Astronomia', icon: '🔭', rows: 9, cols: 10, words: ['ESTRELLA', 'TRASLACION', 'NEBULOSA', 'PLANETA', 'SATELITE', 'ROTACION', 'CONSTELACION', 'ECLIPSE', 'ORBITA', 'GALAXIA', 'ASTEROIDE'] },
  { id: 502, theme: 'Salud', icon: '🏥', rows: 9, cols: 10, words: ['CONSULTORIO', 'ANESTESIA', 'VACUNA', 'DIAGNOSTICO', 'HOSPITAL', 'JERINGA', 'ENFERMERA', 'ANALISIS', 'CAMILLA', 'CIRUGIA', 'VENDAJE'] },
  { id: 503, theme: 'Construccion', icon: '🏗️', rows: 9, cols: 10, words: ['PALETA', 'PLANO', 'ARENA', 'CEMENTO', 'GRUA', 'CAL', 'PUERTA', 'NIVEL', 'PARED', 'TECHO', 'ESCALERA', 'OBRERO', 'VENTANA', 'EXCAVADORA', 'CIMIENTO'] },
  { id: 504, theme: 'Videojuegos', icon: '🎮', rows: 9, cols: 10, words: ['NIVEL', 'JEFE', 'PUNTAJE', 'INVENTARIO', 'DERROTA', 'DESAFIO', 'ESTRATEGIA', 'MULTIJUGADOR', 'ARCADE', 'CONSOLA', 'MANDO', 'MAPA', 'MISION'] },
  { id: 505, theme: 'Moda', icon: '👗', rows: 9, cols: 10, words: ['BOTON', 'ETIQUETA', 'PERFUME', 'COSTURA', 'TALLA', 'MAQUILLAJE', 'CREMALLERA', 'TEJIDO', 'DESFILE', 'TEXTIL', 'VITRINA', 'ESTILO', 'MODELO'] },
  { id: 506, theme: 'Ecologia', icon: '🌍', rows: 9, cols: 10, words: ['CONTAMINACION', 'RESIDUO', 'HABITAT', 'COMPOST', 'BIODIVERSIDAD', 'ESPECIE', 'SUSTENTABLE', 'EMISION', 'RECICLAJE', 'RENOVABLE'] },
  { id: 507, theme: 'Postres', icon: '🍰', rows: 9, cols: 10, words: ['GALLETA', 'MOUSSE', 'DULCE', 'CHOCOLATE', 'ALFAJOR', 'MASA', 'TIRAMISU', 'TORTA', 'HELADO', 'TARTA', 'CARAMELO', 'FLAN', 'GELATINA', 'FRUTILLA'] },
  { id: 508, theme: 'Piratas', icon: '🏴‍☠️', rows: 9, cols: 10, words: ['ANCLA', 'BARCO', 'TRIPULACION', 'MONEDA', 'BRUJULA', 'BANDERA', 'COFRE', 'MOTIN', 'ISLA', 'ESPADA', 'GALEON', 'CAPITAN', 'PARCHE', 'LORO', 'TESORO'] },
  { id: 509, theme: 'Halloween', icon: '🎃', rows: 9, cols: 10, words: ['DISFRAZ', 'CADENA', 'BRUJA', 'CALDERO', 'ESQUELETO', 'MOMIA', 'ZOMBI', 'POCION', 'VAMPIRO', 'MURCIELAGO', 'CALABAZA', 'CEMENTERIO', 'ARANA'] },
  { id: 510, theme: 'Navidad', icon: '🎄', rows: 9, cols: 10, words: ['NIEVE', 'ESTRELLA', 'CHIMENEA', 'BASTON', 'GUIRNALDA', 'VILLANCICO', 'MUERDAGO', 'REGALO', 'RENO', 'ARBOL', 'MEDIA', 'NOCHEBUENA', 'ADORNO'] },
  { id: 511, theme: 'Dinosaurios', icon: '🦕', rows: 9, cols: 10, words: ['JURASICO', 'COLA', 'EXTINCION', 'CARNIVORO', 'ESCAMA', 'REPTIL', 'HUEVO', 'ESQUELETO', 'VELOCIRAPTOR', 'TIRANOSAURIO', 'FOSIL', 'GARRA'] },
  { id: 512, theme: 'Superheroes', icon: '🦸', rows: 9, cols: 10, words: ['ENEMIGO', 'VUELO', 'VILLANO', 'LABORATORIO', 'GUARIDA', 'ANTIFAZ', 'CAPA', 'SUPERFUERZA', 'RESCATE', 'JUSTICIA', 'TRAJE', 'PODER', 'ESCUDO'] },
  { id: 513, theme: 'Circo', icon: '🎪', rows: 9, cols: 10, words: ['MAGO', 'LEON', 'CARPA', 'PISTA', 'ZANCOS', 'ELEFANTE', 'CANON', 'TRAPECIO', 'DOMADOR', 'MALABARISTA', 'FUNAMBULO', 'EQUILIBRISTA', 'BOLETO'] },
  { id: 514, theme: 'Camping', icon: '🏕️', rows: 9, cols: 10, words: ['CARPA', 'BOSQUE', 'SENDERO', 'FOGON', 'BRUJULA', 'LINTERNA', 'MONTANA', 'CANTIMPLORA', 'FOGATA', 'INSECTO', 'TIENDA', 'ESTRELLA', 'MOCHILA'] },
  { id: 515, theme: 'Egipto', icon: '🏺', rows: 9, cols: 10, words: ['CAMELLO', 'ESFINGE', 'PAPIRO', 'OBELISCO', 'ESCARABAJO', 'OASIS', 'JEROGLIFICO', 'DESIERTO', 'MOMIA', 'FARAON', 'SARCOFAGO', 'PIRAMIDE'] },
  { id: 516, theme: 'Cuentos', icon: '🏰', rows: 9, cols: 10, words: ['CABALLERO', 'REINO', 'BOSQUE', 'PRINCESA', 'CASTILLO', 'CORONA', 'BRUJA', 'HECHIZO', 'ESPEJO', 'VARITA', 'DRAGON', 'MAGIA', 'TESORO', 'GIGANTE'] },
  { id: 517, theme: 'Cocina', icon: '🍳', rows: 9, cols: 10, words: ['SOPA', 'OLLA', 'GALLETA', 'PAN', 'ENSALADA', 'GUISO', 'ESPATULA', 'HUEVO', 'NUEZ', 'BANDEJA', 'PLATO', 'SARTEN', 'REPOSTERIA', 'AJI', 'PASTA', 'MANTEL'] },
  { id: 518, theme: 'Animales', icon: '🐾', rows: 9, cols: 10, words: ['CEBRA', 'BUFALO', 'HIPOPOTAMO', 'LOBO', 'CONEJO', 'PERRO', 'RANA', 'ELEFANTE', 'ARDILLA', 'LEOPARDO', 'LEON', 'GORILA', 'CANGURO', 'PATO', 'NUTRIA'] },
  { id: 519, theme: 'Playa', icon: '🏖️', rows: 9, cols: 10, words: ['CONCHA', 'BAHIA', 'VERANO', 'BOTE', 'TOALLA', 'CANGREJO', 'SOL', 'VOLEIBOL', 'BUCEO', 'ARRECIFE', 'GAVIOTA', 'MUELLE', 'TABLA', 'BALDE', 'FARO', 'ISLA'] },
  { id: 520, theme: 'Oficina', icon: '🗂️', rows: 9, cols: 10, words: ['PROYECTO', 'CALENDARIO', 'SILLA', 'FOTOCOPIA', 'IMPRESORA', 'TIJERA', 'CARPETA', 'CLIENTE', 'OFICINISTA', 'INFORME', 'SELLO', 'TECLADO'] },
  { id: 521, theme: 'Espacio', icon: '🚀', rows: 9, cols: 10, words: ['SUPERNOVA', 'ASTRO', 'NAVE', 'ORBITA', 'MISION', 'MERCURIO', 'ASTEROIDE', 'MODULO', 'VENUS', 'UNIVERSO', 'GALAXIA', 'JUPITER', 'ASTRONAUTA'] },
  { id: 522, theme: 'Musica', icon: '🎵', rows: 9, cols: 10, words: ['VIOLIN', 'GUITARRA', 'COMPAS', 'ESCENARIO', 'OPERA', 'BAJO', 'ARPA', 'BALADA', 'BATERIA', 'CANTO', 'DISCO', 'CONCIERTO', 'NOTA', 'AMPLIFICADOR'] },
  { id: 523, theme: 'Deportes', icon: '⚽', rows: 9, cols: 10, words: ['RAQUETA', 'VOLEY', 'CANCHA', 'GOLF', 'PATIN', 'NATACION', 'ENTRENADOR', 'RUGBY', 'GIMNASIA', 'RESISTENCIA', 'ARQUERO', 'JUDO', 'BOXEO', 'ESQUI'] },
  { id: 524, theme: 'Naturaleza', icon: '🌿', rows: 9, cols: 10, words: ['MANANTIAL', 'ENREDADERA', 'RIO', 'ECOSISTEMA', 'FLOR', 'SEMILLA', 'BOSQUE', 'POLEN', 'TRONCO', 'PRADERA', 'MATORRAL', 'TIERRA', 'ROCIO', 'RAIZ'] },
  { id: 525, theme: 'Cine y Arte', icon: '🎬', rows: 9, cols: 10, words: ['PALETA', 'REPARTO', 'ESCENA', 'ACTOR', 'EFECTO', 'MONTAJE', 'TRAMA', 'ACTRIZ', 'ILUMINACION', 'CAMARA', 'MAQUILLAJE', 'ESCULTURA', 'BOCETO'] },
  { id: 526, theme: 'Tecnologia', icon: '💻', rows: 9, cols: 10, words: ['DATOS', 'ROUTER', 'NUBE', 'SOFTWARE', 'MEMORIA', 'CABLE', 'PLATAFORMA', 'CODIGO', 'MONITOR', 'IMPRESORA', 'APLICACION', 'ANTIVIRUS', 'CHIP'] },
  { id: 527, theme: 'Colores', icon: '🎨', rows: 9, cols: 10, words: ['BEIGE', 'ROJO', 'AGUAMARINA', 'ESMERALDA', 'CARMESI', 'INDIGO', 'DORADO', 'NARANJA', 'LILA', 'VIOLETA', 'MOSTAZA', 'TURQUESA', 'GRIS', 'MARRON'] },
  { id: 528, theme: 'Frutas', icon: '🍎', rows: 9, cols: 10, words: ['CEREZA', 'MEMBRILLO', 'HIGO', 'UVA', 'KIWI', 'DURAZNO', 'SANDIA', 'COCO', 'LICHI', 'LIMON', 'POMELO', 'GRANADA', 'FRUTILLA', 'MANDARINA', 'NARANJA'] },
  { id: 529, theme: 'Verduras', icon: '🥕', rows: 9, cols: 10, words: ['PAPA', 'ZAPALLO', 'ZANAHORIA', 'ALCAUCIL', 'RABANO', 'PEREJIL', 'CEBOLLA', 'COLIFLOR', 'CHOCLO', 'ACELGA', 'MORRON', 'APIO', 'BATATA', 'RUCULA'] },
  { id: 530, theme: 'Ropa', icon: '👕', rows: 9, cols: 10, words: ['MOCHILA', 'REMERA', 'CAMISA', 'GORRO', 'BLUSA', 'CORBATA', 'VESTIDO', 'BUFANDA', 'POLLERA', 'CINTURON', 'IMPERMEABLE', 'ZAPATO', 'SANDALIA'] },
  { id: 531, theme: 'Cuerpo Humano', icon: '🧍', rows: 9, cols: 10, words: ['PIERNA', 'CODO', 'MENTON', 'NARIZ', 'CUELLO', 'BRAZO', 'PARPADO', 'CINTURA', 'PECHO', 'OREJA', 'PANTORRILLA', 'OJO', 'CEJA', 'MUNECA', 'HOMBRO', 'MANO'] },
  { id: 532, theme: 'Familia', icon: '👪', rows: 9, cols: 10, words: ['NIETO', 'ESPOSA', 'TIO', 'SUEGRO', 'ABUELO', 'CUNADO', 'PADRINO', 'ESPOSO', 'PRIMO', 'SOBRINO', 'GEMELO', 'FAMILIA', 'HERMANO', 'MADRE', 'PARIENTE'] },
  { id: 533, theme: 'Escuela', icon: '📚', rows: 9, cols: 10, words: ['DIRECTOR', 'MOCHILA', 'PIZARRON', 'LIBRO', 'AULA', 'BIBLIOTECA', 'CALCULADORA', 'LAPIZ', 'CARTUCHERA', 'TIZA', 'LECTURA', 'ALUMNO', 'TAREA'] },
  { id: 534, theme: 'Ciudad', icon: '🏙️', rows: 9, cols: 10, words: ['RASCACIELOS', 'ESQUINA', 'ESTACIONAMIENTO', 'FAROL', 'SUBTERRANEO', 'VEREDA', 'PLAZA', 'AVENIDA', 'SEMAFORO', 'MERCADO', 'TERMINAL'] },
  { id: 535, theme: 'Clima', icon: '🌦️', rows: 9, cols: 10, words: ['HURACAN', 'TEMPESTAD', 'LLUVIA', 'NEBLINA', 'ESCARCHA', 'ARCOIRIS', 'TRUENO', 'HELADA', 'NIEVE', 'FRIO', 'SEQUIA', 'ROCIO', 'BRISA', 'TORMENTA'] },
  { id: 536, theme: 'Transporte', icon: '🚗', rows: 9, cols: 10, words: ['TRANVIA', 'TREN', 'BICI', 'GLOBO', 'YATE', 'HELICOPTERO', 'CAMION', 'VELERO', 'MONOPATIN', 'BARCO', 'TELEFERICO', 'TAXI', 'CARRETA', 'CARRUAJE'] },
  { id: 537, theme: 'Herramientas', icon: '🔧', rows: 9, cols: 10, words: ['HACHA', 'CINCEL', 'LLAVE', 'LIJA', 'TORNILLO', 'SIERRA', 'ESCUADRA', 'TALADRO', 'GATO', 'BROCA', 'NIVEL', 'SOLDADOR', 'PINZA', 'DESTORNILLADOR'] },
  { id: 538, theme: 'Profesiones', icon: '👷', rows: 9, cols: 10, words: ['ARQUITECTO', 'INGENIERO', 'VETERINARIO', 'MECANICO', 'CONTADOR', 'DENTISTA', 'MEDICO', 'COCINERO', 'PSICOLOGO', 'PLOMERO', 'PILOTO'] },
  { id: 539, theme: 'Emociones', icon: '😊', rows: 9, cols: 10, words: ['ANSIEDAD', 'CURIOSIDAD', 'SERENIDAD', 'ORGULLO', 'TERNURA', 'ENVIDIA', 'GRATITUD', 'VERGUENZA', 'EUFORIA', 'SORPRESA', 'ENTUSIASMO'] },
  { id: 540, theme: 'Geografia', icon: '🗺️', rows: 9, cols: 10, words: ['BAHIA', 'PENINSULA', 'OCEANO', 'POLO', 'CORDILLERA', 'VOLCAN', 'DELTA', 'MESETA', 'ALTIPLANO', 'MONTANA', 'ESTRECHO', 'DESIERTO', 'ECUADOR'] },
  { id: 541, theme: 'Insectos', icon: '🐝', rows: 9, cols: 10, words: ['MARIPOSA', 'AVISPA', 'ABEJA', 'MOSQUITO', 'MOSCA', 'POLILLA', 'GRILLO', 'LUCIERNAGA', 'TERMITA', 'ESCARABAJO', 'CIGARRA', 'MANTIS', 'ORUGA'] },
  { id: 542, theme: 'Aves', icon: '🦜', rows: 9, cols: 10, words: ['GAVIOTA', 'BUHO', 'PINGUINO', 'AGUILA', 'CIGUENA', 'LORO', 'PALOMA', 'FLAMENCO', 'COLIBRI', 'AVESTRUZ', 'CUERVO', 'HALCON', 'PERDIZ', 'CANARIO'] },
  { id: 543, theme: 'Mar', icon: '🐠', rows: 9, cols: 10, words: ['CALAMAR', 'MEDUSA', 'LANGOSTA', 'FOCA', 'PLANCTON', 'ATUN', 'ESTRELLA', 'MOROENA', 'CANGREJO', 'CORAL', 'BALLENA', 'DELFIN', 'CARACOL', 'OSTRA'] },
  { id: 544, theme: 'Granja', icon: '🐄', rows: 9, cols: 10, words: ['OVEJA', 'SEMBRADO', 'PASTO', 'GRANJERO', 'PATO', 'GANSO', 'HENO', 'ORDENE', 'CERDO', 'CABRA', 'ARADO', 'CABALLO', 'GALLINA', 'VACA', 'GALLO', 'ESTABLO'] },
  { id: 545, theme: 'Fiesta', icon: '🎉', rows: 9, cols: 10, words: ['PINATA', 'BRINDIS2', 'TORTA', 'DISFRAZ', 'BAILE', 'BRINDIS', 'CUMPLEANOS', 'VELA', 'DECORACION', 'REGALO', 'CONFETI', 'CANCION', 'INVITADO'] },
  { id: 546, theme: 'Matematica', icon: '🔢', rows: 9, cols: 10, words: ['PERIMETRO', 'FORMULA', 'TRIANGULO', 'CIRCULO', 'DECIMAL', 'PROBLEMA', 'PORCENTAJE', 'SUMA', 'MEDIDA', 'ANGULO', 'VARIABLE', 'GEOMETRIA'] },
  { id: 547, theme: 'Historia', icon: '🏛️', rows: 9, cols: 10, words: ['REY', 'DINASTIA', 'CIVILIZACION', 'CONQUISTA', 'CASTILLO', 'TRATADO', 'EJERCITO', 'REINA', 'TRONO', 'MONUMENTO', 'IMPERIO', 'FORTALEZA'] },
  { id: 548, theme: 'Literatura', icon: '📖', rows: 9, cols: 10, words: ['PROLOGO', 'NOVELA', 'CAPITULO', 'CUENTO', 'METAFORA', 'LEYENDA', 'NARRADOR', 'MANUSCRITO', 'FABULA', 'PERSONAJE', 'PROSA', 'AUTOR', 'VERSO'] },
  { id: 549, theme: 'Astronomia', icon: '🔭', rows: 9, cols: 10, words: ['CONSTELACION', 'CRATER', 'SATELITE', 'NEBULOSA', 'TRASLACION', 'ROTACION', 'PLANETA', 'METEORO', 'ECLIPSE', 'ASTEROIDE', 'ESTRELLA'] },
  { id: 550, theme: 'Salud', icon: '🏥', rows: 9, cols: 10, words: ['VENDAJE', 'CAMILLA', 'HOSPITAL', 'DIAGNOSTICO', 'PASTILLA', 'CONSULTORIO', 'RECETA', 'PACIENTE', 'ANALISIS', 'CIRUGIA', 'QUIROFANO'] },
  { id: 551, theme: 'Construccion', icon: '🏗️', rows: 9, cols: 10, words: ['OBRERO', 'ARENA', 'GRUA', 'CASCO', 'TECHO', 'LADRILLO', 'NIVEL', 'PALETA', 'CEMENTO', 'ESCALERA', 'EXCAVADORA', 'ANDAMIO', 'CIMIENTO', 'PUERTA'] },
  { id: 552, theme: 'Videojuegos', icon: '🎮', rows: 9, cols: 10, words: ['INVENTARIO', 'LOGRO', 'PIXEL', 'ARCADE', 'CONSOLA', 'JEFE', 'AVENTURA', 'MAPA', 'DESAFIO', 'PANTALLA', 'NIVEL', 'PERSONAJE', 'PUNTAJE', 'MANDO'] },
  { id: 553, theme: 'Moda', icon: '👗', rows: 9, cols: 10, words: ['MAQUILLAJE', 'TALLA', 'ESTILO', 'DESFILE', 'TEJIDO', 'COSTURA', 'JOYA', 'TEXTIL', 'PERFUME', 'DISENADOR', 'ACCESORIO', 'TENDENCIA', 'BOTON'] },
  { id: 554, theme: 'Ecologia', icon: '🌍', rows: 9, cols: 10, words: ['ECOSISTEMA', 'SUSTENTABLE', 'CONSERVACION', 'HUELLA', 'COMPOST', 'CLIMA', 'HABITAT', 'EMISION', 'EXTINCION', 'ENERGIA', 'RECICLAJE'] },
  { id: 555, theme: 'Postres', icon: '🍰', rows: 9, cols: 10, words: ['MOUSSE', 'FLAN', 'VAINILLA', 'GALLETA', 'CHOCOLATE', 'BROWNIE', 'BOMBON', 'CREMA', 'CARAMELO', 'HELADO', 'MERENGUE', 'GELATINA', 'TIRAMISU'] },
  { id: 556, theme: 'Piratas', icon: '🏴‍☠️', rows: 9, cols: 10, words: ['MOTIN', 'BRUJULA', 'PARCHE', 'CAPITAN', 'ANCLA', 'LORO', 'ESPADA', 'CANON', 'GALEON', 'TESORO', 'BARCO', 'MONEDA', 'TRIPULACION', 'BANDERA', 'ISLA'] },
  { id: 557, theme: 'Halloween', icon: '🎃', rows: 9, cols: 10, words: ['CEMENTERIO', 'TELARANA', 'BRUJA', 'MURCIELAGO', 'CADENA', 'CALDERO', 'POCION', 'LUNA', 'CALABAZA', 'DISFRAZ', 'ARANA', 'ZOMBI', 'ESQUELETO'] },
  { id: 558, theme: 'Navidad', icon: '🎄', rows: 9, cols: 10, words: ['CHIMENEA', 'VILLANCICO', 'NIEVE', 'ADORNO', 'GUIRNALDA', 'CAMPANA', 'ARBOL', 'VELA', 'BASTON', 'TRINEO', 'REGALO', 'NOCHEBUENA', 'ESTRELLA'] },
  { id: 559, theme: 'Dinosaurios', icon: '🦕', rows: 9, cols: 10, words: ['ESCAMA', 'FOSIL', 'CARNIVORO', 'REPTIL', 'HERBIVORO', 'HUEVO', 'TIRANOSAURIO', 'VOLCAN', 'VELOCIRAPTOR', 'TRICERATOPS', 'EXTINCION'] },
  { id: 560, theme: 'Superheroes', icon: '🦸', rows: 9, cols: 10, words: ['MISION', 'VUELO', 'PODER', 'JUSTICIA', 'ENEMIGO', 'TRAJE', 'VILLANO', 'ANTIFAZ', 'LABORATORIO', 'CAPA', 'GUARIDA', 'RESCATE', 'SUPERFUERZA'] },
  { id: 561, theme: 'Circo', icon: '🎪', rows: 9, cols: 10, words: ['ELEFANTE', 'TRAPECIO', 'PAYASO', 'EQUILIBRISTA', 'ZANCOS', 'CANON', 'MAGO', 'DOMADOR', 'BOLETO', 'ACROBATA', 'MALABARISTA', 'FUNAMBULO'] },
  { id: 562, theme: 'Camping', icon: '🏕️', rows: 9, cols: 10, words: ['MOCHILA', 'LINTERNA', 'BOSQUE', 'FOGATA', 'INSECTO', 'CANTIMPLORA', 'BRUJULA', 'CARPA', 'FOGON', 'MONTANA', 'BOLSA', 'SENDERO', 'RIO', 'TIENDA'] },
  { id: 563, theme: 'Egipto', icon: '🏺', rows: 9, cols: 10, words: ['PAPIRO', 'OASIS', 'TUMBA', 'JEROGLIFICO', 'PIRAMIDE', 'TEMPLO', 'CAMELLO', 'ESFINGE', 'SARCOFAGO', 'ESCARABAJO', 'OBELISCO', 'DESIERTO'] },
  { id: 564, theme: 'Cuentos', icon: '🏰', rows: 9, cols: 10, words: ['VARITA', 'BOSQUE', 'CASTILLO', 'MAGIA', 'BRUJA', 'ESPEJO', 'CORONA', 'CABALLERO', 'HECHIZO', 'PRINCESA', 'REINO', 'TESORO', 'GIGANTE', 'DRAGON'] },
  { id: 565, theme: 'Cocina', icon: '🍳', rows: 9, cols: 10, words: ['GALLETA', 'CANELA', 'CUCHARA', 'COLADOR', 'TAZA', 'PAN', 'HUEVO', 'HORNO', 'MIEL', 'PLATO', 'LEVADURA', 'MERMELADA', 'ESPATULA', 'TENEDOR', 'PASTA'] },
  { id: 566, theme: 'Animales', icon: '🐾', rows: 9, cols: 10, words: ['CANGURO', 'TOPO', 'GATO', 'JIRAFA', 'PERRO', 'JAGUAR', 'OSO', 'VACA', 'CABALLO', 'RINOCERONTE', 'LEON', 'MURCIELAGO', 'PATO', 'ALCE', 'CEBRA', 'BUFALO'] },
  { id: 567, theme: 'Playa', icon: '🏖️', rows: 9, cols: 10, words: ['VOLEIBOL', 'SURF', 'MAREA', 'FARO', 'BOTE', 'MUELLE', 'VERANO', 'OLA', 'CANGREJO', 'ARRECIFE', 'BRISA', 'ANCLA', 'CONCHA', 'BRONCEADOR', 'MAR', 'BAHIA'] },
  { id: 568, theme: 'Oficina', icon: '🗂️', rows: 9, cols: 10, words: ['CARTELERA', 'MESA', 'BOLIGRAFO', 'PIZARRA', 'PROYECTO', 'JEFE', 'CALENDARIO', 'IMPRESORA', 'OFICINISTA', 'ARCHIVO', 'MOUSE', 'ASCENSOR'] },
  { id: 569, theme: 'Espacio', icon: '🚀', rows: 9, cols: 10, words: ['CRATER', 'ASTRONAUTA', 'VENUS', 'LUZ', 'TELESCOPIO', 'ASTRO', 'GALAXIA', 'CONSTELACION', 'SATELITE', 'COHETE', 'METEORITO', 'ASTEROIDE'] },
  { id: 570, theme: 'Musica', icon: '🎵', rows: 9, cols: 10, words: ['FLAUTA', 'RITMO', 'TAMBOR', 'ORQUESTA', 'CORO', 'BANDA', 'AFINACION', 'NOTA', 'ACUSTICA', 'CANTO', 'TROMPETA', 'AMPLIFICADOR', 'DISCO', 'OPERA'] },
  { id: 571, theme: 'Deportes', icon: '⚽', rows: 9, cols: 10, words: ['LUCHA', 'TENIS', 'ARBITRO', 'GIMNASIA', 'PATIN', 'ESGRIMA', 'ARQUERO', 'CICLISMO', 'KARATE', 'EQUIPO', 'JUDO', 'ENTRENADOR', 'RUGBY', 'MARATON'] },
  { id: 572, theme: 'Naturaleza', icon: '🌿', rows: 9, cols: 10, words: ['DESIERTO', 'LAGO', 'CASCADA', 'RIO', 'RAMA', 'CORTEZA', 'MANANTIAL', 'NIEBLA', 'LAGUNA', 'VALLE', 'ECOSISTEMA', 'RAIZ', 'SEMILLA', 'FLOR', 'BOSQUE'] },
  { id: 573, theme: 'Cine y Arte', icon: '🎬', rows: 9, cols: 10, words: ['ESTRENO', 'VESTUARIO', 'PALETA', 'ROL', 'BOCETO', 'RETRATO', 'SUBTITULO', 'MONTAJE', 'MUSEO', 'MAQUILLAJE', 'ACTRIZ', 'GALERIA', 'PANTALLA'] },
  { id: 574, theme: 'Tecnologia', icon: '💻', rows: 9, cols: 10, words: ['SENSOR', 'ROUTER', 'PANTALLA', 'ANTIVIRUS', 'INTERNET', 'DATOS', 'SOFTWARE', 'CABLE', 'MEMORIA', 'CONTRASENA', 'PIXEL', 'DESCARGA', 'ROBOT'] },
  { id: 575, theme: 'Colores', icon: '🎨', rows: 9, cols: 10, words: ['MARRON', 'BEIGE', 'BLANCO', 'VIOLETA', 'MOSTAZA', 'OCRE', 'DORADO', 'AZUL', 'ROJO', 'AMARILLO', 'LILA', 'ROSA', 'BORDO', 'ESMERALDA', 'GRIS', 'NARANJA'] },
  { id: 576, theme: 'Frutas', icon: '🍎', rows: 9, cols: 10, words: ['COCO', 'CEREZA', 'MANDARINA', 'POMELO', 'LIMON', 'MANGO', 'KIWI', 'PERA', 'GRANADA', 'BANANA', 'FRUTILLA', 'UVA', 'NARANJA', 'DURAZNO', 'FRAMBUESA'] },
  { id: 577, theme: 'Verduras', icon: '🥕', rows: 9, cols: 10, words: ['MORRON', 'LECHUGA', 'BERENJENA', 'ZANAHORIA', 'CHOCLO', 'APIO', 'CEBOLLA', 'PEPINO', 'PEREJIL', 'REMOLACHA', 'ESPINACA', 'PAPA', 'COLIFLOR'] },
  { id: 578, theme: 'Ropa', icon: '👕', rows: 9, cols: 10, words: ['CAMPERA', 'PIJAMA', 'REMERA', 'MEDIAS', 'TRAJE', 'GORRO', 'SHORT', 'CHALECO', 'ZAPATO', 'VESTIDO', 'GUANTE', 'SACO', 'CORBATA', 'BUFANDA', 'CAMISA'] },
  { id: 579, theme: 'Cuerpo Humano', icon: '🧍', rows: 9, cols: 10, words: ['BRAZO', 'RODILLA', 'OREJA', 'CABEZA', 'OJO', 'NARIZ', 'MENTON', 'PIERNA', 'PIE', 'HOMBRO', 'CINTURA', 'MUNECA', 'CUELLO', 'BOCA', 'PANTORRILLA', 'DEDO'] },
  { id: 580, theme: 'Familia', icon: '👪', rows: 9, cols: 10, words: ['ABUELO', 'ESPOSA', 'FAMILIA', 'PRIMO', 'ESPOSO', 'SUEGRO', 'BISABUELO', 'PADRE', 'HERMANO', 'PADRINO', 'TIA', 'TIO', 'NIETO', 'PARIENTE', 'SOBRINO'] },
  { id: 581, theme: 'Escuela', icon: '📚', rows: 9, cols: 10, words: ['AULA', 'MAPA', 'EXAMEN', 'GOMA', 'CALCULADORA', 'DIRECTOR', 'LAPIZ', 'DIPLOMA', 'CAMPANA', 'CUADERNO', 'UNIFORME', 'LIBRO', 'REGLA', 'PIZARRON'] },
  { id: 582, theme: 'Ciudad', icon: '🏙️', rows: 9, cols: 10, words: ['FAROL', 'MUNICIPIO', 'AVENIDA', 'MERCADO', 'PARQUE', 'ESTACIONAMIENTO', 'TRANSITO', 'EDIFICIO', 'CIUDADANO', 'PLAZA', 'RASCACIELOS'] },
  { id: 583, theme: 'Clima', icon: '🌦️', rows: 9, cols: 10, words: ['NUBE', 'VIENTO', 'HELADA', 'TORMENTA', 'HURACAN', 'TRUENO', 'TEMPESTAD', 'SEQUIA', 'BRISA', 'CALOR', 'NIEVE', 'SOL', 'LLUVIA', 'ARCOIRIS', 'MONZON'] },
  { id: 584, theme: 'Transporte', icon: '🚗', rows: 9, cols: 10, words: ['GLOBO', 'CAMIONETA', 'TRANVIA', 'SUBTE', 'YATE', 'MOTO', 'TAXI', 'COLECTIVO', 'CARRETA', 'BICI', 'CARRUAJE', 'TELEFERICO', 'AVION', 'MONOPATIN'] },
  { id: 585, theme: 'Herramientas', icon: '🔧', rows: 9, cols: 10, words: ['ESCUADRA', 'FORMON', 'GATO', 'ESCOFINA', 'NIVEL', 'CINCEL', 'SIERRA', 'BROCA', 'CLAVO', 'SOLDADOR', 'HACHA', 'LLAVE', 'PINZA', 'CEPILLO', 'ALICATE'] },
  { id: 586, theme: 'Profesiones', icon: '👷', rows: 9, cols: 10, words: ['ELECTRICISTA', 'BOMBERO', 'VETERINARIO', 'PINTOR', 'PLOMERO', 'DENTISTA', 'POLICIA', 'PILOTO', 'ABOGADO', 'ARQUITECTO', 'INGENIERO'] },
  { id: 587, theme: 'Emociones', icon: '😊', rows: 9, cols: 10, words: ['VERGUENZA', 'ENOJO', 'ALEGRIA', 'SORPRESA', 'ESPERANZA', 'EUFORIA', 'FRUSTRACION', 'MIEDO', 'CURIOSIDAD', 'ENVIDIA', 'CALMA', 'ORGULLO'] },
  { id: 588, theme: 'Geografia', icon: '🗺️', rows: 9, cols: 10, words: ['VOLCAN', 'ALTIPLANO', 'ESTRECHO', 'GLACIAR', 'PENINSULA', 'ARCHIPIELAGO', 'CORDILLERA', 'COSTA', 'ECUADOR', 'POLO', 'MESETA', 'MONTANA'] },
  { id: 589, theme: 'Insectos', icon: '🐝', rows: 9, cols: 10, words: ['SALTAMONTES', 'ESCARABAJO', 'LUCIERNAGA', 'AVISPA', 'POLILLA', 'HORMIGA', 'TERMITA', 'MARIPOSA', 'ABEJA', 'ORUGA', 'MANTIS', 'CIEMPIES'] },
  { id: 590, theme: 'Aves', icon: '🦜', rows: 9, cols: 10, words: ['CACATUA', 'PALOMA', 'CONDOR', 'GORRION', 'PERDIZ', 'BUHO', 'CUERVO', 'AGUILA', 'HALCON', 'AVESTRUZ', 'FAISAN', 'CIGUENA', 'PINGUINO', 'GAVIOTA'] },
  { id: 591, theme: 'Mar', icon: '🐠', rows: 9, cols: 10, words: ['LANGOSTA', 'CORAL', 'PULPO', 'PLANCTON', 'ANEMONA', 'MEDUSA', 'CALAMAR', 'CANGREJO', 'CARACOL', 'BALLENA', 'DELFIN', 'ATUN', 'MOROENA', 'OSTRA'] },
  { id: 592, theme: 'Granja', icon: '🐄', rows: 9, cols: 10, words: ['SEMBRADO', 'PATO', 'GALLO', 'ORDENE', 'GANSO', 'GRANJERO', 'OVEJA', 'ESTABLO', 'CERDO', 'VACA', 'COSECHA', 'ARADO', 'CABALLO', 'GALLINA', 'GRANERO'] },
  { id: 593, theme: 'Fiesta', icon: '🎉', rows: 9, cols: 10, words: ['INVITADO', 'CUMPLEANOS', 'MUSICA', 'CANCION', 'BANQUETE', 'DISFRAZ', 'ANFITRION', 'GLOBO', 'BAILE', 'BRINDIS', 'VELA', 'TORTA', 'GUIRNALDA'] },
  { id: 594, theme: 'Matematica', icon: '🔢', rows: 9, cols: 10, words: ['GEOMETRIA', 'GRAFICO', 'ECUACION', 'CIRCULO', 'CUADRADO', 'FRACCION', 'DIVISION', 'PROBLEMA', 'VOLUMEN', 'RESTA', 'NUMERO', 'PERIMETRO'] },
  { id: 595, theme: 'Historia', icon: '🏛️', rows: 9, cols: 10, words: ['CASTILLO', 'IMPERIO', 'ESPADA', 'REINA', 'EJERCITO', 'REVOLUCION', 'TRONO', 'BATALLA', 'CONQUISTA', 'REY', 'TRATADO', 'FORTALEZA', 'CORONA'] },
  { id: 596, theme: 'Literatura', icon: '📖', rows: 10, cols: 10, words: ['MANUSCRITO', 'CUENTO', 'TRAMA', 'LECTOR', 'PROSA', 'VERSO', 'BIBLIOTECA', 'CAPITULO', 'EPILOGO', 'EDITORIAL', 'PROLOGO', 'PERSONAJE', 'AUTOR', 'NARRADOR'] },
  { id: 597, theme: 'Astronomia', icon: '🔭', rows: 10, cols: 10, words: ['COMETA', 'METEORO', 'TRASLACION', 'SUPERNOVA', 'SATELITE', 'OBSERVATORIO', 'ESTRELLA', 'ECLIPSE', 'TELESCOPIO', 'ASTEROIDE', 'ROTACION', 'CRATER'] },
  { id: 598, theme: 'Salud', icon: '🏥', rows: 10, cols: 10, words: ['ENFERMERA', 'MEDICO', 'TERAPIA', 'CAMILLA', 'PACIENTE', 'PASTILLA', 'RECETA', 'VENDAJE', 'RADIOGRAFIA', 'ANALISIS', 'CIRUGIA', 'ANESTESIA', 'JERINGA'] },
  { id: 599, theme: 'Construccion', icon: '🏗️', rows: 10, cols: 10, words: ['NIVEL', 'ESCALERA', 'PUERTA', 'OBRERO', 'PLANO', 'TECHO', 'CASCO', 'CAL', 'PARED', 'CIMIENTO', 'CEMENTO', 'HORMIGON', 'LADRILLO', 'ANDAMIO', 'VIGA', 'EXCAVADORA'] },
  { id: 600, theme: 'Videojuegos', icon: '🎮', rows: 10, cols: 10, words: ['DESAFIO', 'PUNTAJE', 'JOYSTICK', 'AVENTURA', 'PANTALLA', 'MISION', 'ESTRATEGIA', 'INVENTARIO', 'MULTIJUGADOR', 'JEFE', 'DERROTA', 'MANDO', 'VICTORIA'] },
  { id: 601, theme: 'Moda', icon: '👗', rows: 10, cols: 10, words: ['VITRINA', 'BOTON', 'MAQUILLAJE', 'JOYA', 'PASARELA', 'TEJIDO', 'DISENADOR', 'ESTILO', 'ACCESORIO', 'COSTURA', 'PERFUME', 'TEXTIL', 'MODELO', 'CREMALLERA'] },
  { id: 602, theme: 'Ecologia', icon: '🌍', rows: 10, cols: 10, words: ['ESPECIE', 'AMBIENTE', 'RECICLAJE', 'ECOSISTEMA', 'CONSERVACION', 'ENERGIA', 'EXTINCION', 'HABITAT', 'HUELLA', 'RESIDUO', 'EMISION', 'SUSTENTABLE'] },
  { id: 603, theme: 'Postres', icon: '🍰', rows: 10, cols: 10, words: ['TORTA', 'TIRAMISU', 'DULCE', 'HELADO', 'ALFAJOR', 'CREMA', 'MOUSSE', 'BUDIN', 'FLAN', 'BOMBON', 'GALLETA', 'FRUTILLA', 'TARTA', 'BROWNIE', 'VAINILLA', 'CARAMELO'] },
  { id: 604, theme: 'Halloween', icon: '🎃', rows: 10, cols: 10, words: ['FANTASMA', 'ARANA', 'MOMIA', 'ZOMBI', 'VAMPIRO', 'CALABAZA', 'DISFRAZ', 'BRUJA', 'TELARANA', 'LUNA', 'POCION', 'CALDERO', 'CEMENTERIO', 'ESQUELETO', 'CADENA'] },
  { id: 605, theme: 'Navidad', icon: '🎄', rows: 10, cols: 10, words: ['VILLANCICO', 'RENO', 'ADORNO', 'NOCHEBUENA', 'ARBOL', 'CHIMENEA', 'MUERDAGO', 'TRINEO', 'NIEVE', 'GUIRNALDA', 'REGALO', 'VELA', 'MEDIA', 'ESTRELLA', 'BASTON'] },
  { id: 606, theme: 'Dinosaurios', icon: '🦕', rows: 10, cols: 10, words: ['GARRA', 'VELOCIRAPTOR', 'ESQUELETO', 'PANTANO', 'TRICERATOPS', 'VOLCAN', 'EXTINCION', 'ESCAMA', 'FOSIL', 'CARNIVORO', 'TIRANOSAURIO', 'HERBIVORO'] },
  { id: 607, theme: 'Circo', icon: '🎪', rows: 10, cols: 10, words: ['ACROBATA', 'MALABARISTA', 'CARPA', 'PISTA', 'BOLETO', 'PAYASO', 'ZANCOS', 'FUNAMBULO', 'DOMADOR', 'ELEFANTE', 'CANON', 'MAGO', 'EQUILIBRISTA', 'TRAPECIO'] },
  { id: 608, theme: 'Cocina', icon: '🍳', rows: 10, cols: 10, words: ['REPOSTERIA', 'MIEL', 'PLATO', 'FUENTE', 'HUEVO', 'ESPATULA', 'CANELA', 'LECHE', 'MANTEL', 'CUCHARA', 'TAZA', 'BANDEJA', 'AZUCAR', 'TENEDOR', 'SARTEN', 'BATIDORA'] },
  { id: 609, theme: 'Animales', icon: '🐾', rows: 10, cols: 10, words: ['FOCA', 'HIPOPOTAMO', 'BURRO', 'PANTERA', 'NUTRIA', 'JAGUAR', 'CONEJO', 'GACELA', 'COYOTE', 'VACA', 'RINOCERONTE', 'MONO', 'ZORRO', 'ELEFANTE', 'CABALLO', 'TIGRE'] },
  { id: 610, theme: 'Playa', icon: '🏖️', rows: 10, cols: 10, words: ['BUCEO', 'ESNORQUEL', 'MUELLE', 'MAR', 'ACANTILADO', 'SOL', 'BRONCEADOR', 'CAMARON', 'VOLEIBOL', 'OLA', 'BIKINI', 'BARCA', 'ARENA', 'CANGREJO', 'GAVIOTA', 'MAREA'] },
  { id: 611, theme: 'Oficina', icon: '🗂️', rows: 10, cols: 10, words: ['AGENDA', 'OFICINISTA', 'TECLADO', 'FOLIO', 'CINTA', 'PRESUPUESTO', 'MARCADOR', 'CLIP', 'INFORME', 'SELLO', 'GRAPAS', 'CARPETA', 'CALENDARIO', 'CARTELERA'] },
  { id: 612, theme: 'Espacio', icon: '🚀', rows: 10, cols: 10, words: ['SATURNO', 'MODULO', 'MARTE', 'METEORITO', 'ROBOT', 'SATELITE', 'ORBITA', 'NEPTUNO', 'PLANETA', 'JUPITER', 'GALAXIA', 'VIA', 'CRATER', 'ECLIPSE', 'URANO', 'ASTRO'] },
  { id: 613, theme: 'Musica', icon: '🎵', rows: 10, cols: 10, words: ['BATERIA', 'GUITARRA', 'ACUSTICA', 'ACORDE', 'CORO', 'CANCION', 'DISCO', 'VIOLIN', 'BALADA', 'RITMO', 'BANDA', 'PARTITURA', 'LETRA', 'SAXOFON', 'AMPLIFICADOR'] },
  { id: 614, theme: 'Deportes', icon: '⚽', rows: 10, cols: 10, words: ['KARATE', 'MARATON', 'ARBITRO', 'RESISTENCIA', 'REMO', 'LUCHA', 'NATACION', 'CANCHA', 'GIMNASIA', 'BOXEO', 'TIRO', 'VOLEY', 'VELOCIDAD', 'ESQUI', 'CAMPEONATO'] },
  { id: 615, theme: 'Naturaleza', icon: '🌿', rows: 10, cols: 10, words: ['CASCADA', 'SEMILLA', 'ECOSISTEMA', 'ROCIO', 'CORTEZA', 'NIEBLA', 'RAMA', 'LAGUNA', 'MUSGO', 'MONTANA', 'ENREDADERA', 'LAGO', 'RAIZ', 'FLOR', 'PLANTA', 'MATORRAL'] },
  { id: 616, theme: 'Cine y Arte', icon: '🎬', rows: 10, cols: 10, words: ['PANTALLA', 'PALETA', 'EFECTO', 'LIENZO', 'CAMARA', 'GUION', 'DIRECTOR', 'MONTAJE', 'PINTURA', 'ILUMINACION', 'DECORADO', 'RETRATO', 'SUBTITULO', 'ACTRIZ'] },
  { id: 617, theme: 'Tecnologia', icon: '💻', rows: 10, cols: 10, words: ['SOFTWARE', 'SERVIDOR', 'IMPRESORA', 'PANTALLA', 'CABLE', 'CHIP', 'DESCARGA', 'DRON', 'NAVEGADOR', 'INTERNET', 'NUBE', 'PIXEL', 'ACTUALIZACION', 'MONITOR'] },
  { id: 618, theme: 'Colores', icon: '🎨', rows: 10, cols: 10, words: ['BLANCO', 'DORADO', 'PLATEADO', 'VIOLETA', 'BEIGE', 'MOSTAZA', 'PERLA', 'NARANJA', 'BORDO', 'VERDE', 'CELESTE', 'MARRON', 'LILA', 'AGUAMARINA', 'NEGRO', 'MAGENTA'] },
  { id: 619, theme: 'Frutas', icon: '🍎', rows: 10, cols: 10, words: ['DURAZNO', 'MEMBRILLO', 'NARANJA', 'COCO', 'FRAMBUESA', 'MANDARINA', 'PAPAYA', 'FRUTILLA', 'PERA', 'LICHI', 'UVA', 'HIGO', 'MARACUYA', 'MELON', 'MANZANA', 'PALTA'] },
  { id: 620, theme: 'Verduras', icon: '🥕', rows: 10, cols: 10, words: ['ESPINACA', 'RUCULA', 'PAPA', 'CEBOLLA', 'LECHUGA', 'PEREJIL', 'ALCAUCIL', 'PEPINO', 'COLIFLOR', 'BERENJENA', 'ACELGA', 'BATATA', 'HABAS', 'CHOCLO', 'BROCOLI'] },
  { id: 621, theme: 'Ropa', icon: '👕', rows: 10, cols: 10, words: ['BUFANDA', 'POLLERA', 'CINTURON', 'SHORT', 'GORRA', 'BLUSA', 'VESTIDO', 'REMERA', 'SANDALIA', 'GUANTE', 'BOTA', 'ZAPATO', 'CORBATA', 'MOCHILA', 'CAMISA', 'OVEROL'] },
  { id: 622, theme: 'Cuerpo Humano', icon: '🧍', rows: 10, cols: 10, words: ['PANTORRILLA', 'MUNECA', 'HOMBRO', 'ESPALDA', 'NARIZ', 'RODILLA', 'BRAZO', 'MANO', 'CINTURA', 'OREJA', 'MEJILLA', 'TOBILLO', 'PESTANA', 'MUSLO', 'PARPADO', 'BOCA'] },
  { id: 623, theme: 'Familia', icon: '👪', rows: 10, cols: 10, words: ['PADRINO', 'HERMANO', 'TIO', 'BISABUELO', 'HIJO', 'SUEGRO', 'GEMELO', 'HERMANASTRO', 'NIETO', 'MADRINA', 'PADRE', 'HIJA', 'CUNADO', 'FAMILIA', 'SOBRINO', 'ESPOSA'] },
  { id: 624, theme: 'Escuela', icon: '📚', rows: 10, cols: 10, words: ['DIRECTOR', 'TAREA', 'LECTURA', 'RECREO', 'REGLA', 'UNIFORME', 'CALCULADORA', 'CAMPANA', 'MAESTRO', 'LAPIZ', 'BIBLIOTECA', 'GOMA', 'CARTUCHERA', 'MOCHILA'] },
  { id: 625, theme: 'Ciudad', icon: '🏙️', rows: 10, cols: 10, words: ['CIUDADANO', 'RASCACIELOS', 'PARQUE', 'CALLE', 'ALCALDIA', 'TRANSITO', 'FAROL', 'MURO', 'TERMINAL', 'BARRIO', 'SUBTERRANEO', 'ESQUINA', 'AVENIDA', 'PLAZA'] },
  { id: 626, theme: 'Clima', icon: '🌦️', rows: 10, cols: 10, words: ['LLUVIA', 'RAYO', 'SOL', 'NEBLINA', 'FRIO', 'VENDAVAL', 'TORMENTA', 'HURACAN', 'ARCOIRIS', 'TEMPESTAD', 'HUMEDAD', 'MONZON', 'ESCARCHA', 'VIENTO', 'NUBE', 'BRISA'] },
  { id: 627, theme: 'Transporte', icon: '🚗', rows: 10, cols: 10, words: ['AVION', 'HELICOPTERO', 'CAMION', 'YATE', 'TAXI', 'AUTO', 'TRANVIA', 'GLOBO', 'BARCO', 'TELEFERICO', 'CAMIONETA', 'COLECTIVO', 'VELERO', 'CARRETA', 'CARRUAJE'] },
  { id: 628, theme: 'Herramientas', icon: '🔧', rows: 10, cols: 10, words: ['NIVEL', 'SOLDADOR', 'CLAVO', 'ALICATE', 'CEPILLO', 'GATO', 'LLAVE', 'TALADRO', 'TENAZA', 'TORNILLO', 'PINZA', 'ESCUADRA', 'HACHA', 'SIERRA', 'DESTORNILLADOR'] },
  { id: 629, theme: 'Profesiones', icon: '👷', rows: 10, cols: 10, words: ['MAESTRO', 'ABOGADO', 'PILOTO', 'ENFERMERO', 'PLOMERO', 'ELECTRICISTA', 'PANADERO', 'ARQUITECTO', 'POLICIA', 'CONTADOR', 'VETERINARIO', 'COCINERO'] },
  { id: 630, theme: 'Emociones', icon: '😊', rows: 10, cols: 10, words: ['MIEDO', 'ENOJO', 'ANSIEDAD', 'SORPRESA', 'TRISTEZA', 'CALMA', 'CULPA', 'GRATITUD', 'TERNURA', 'NOSTALGIA', 'ESPERANZA', 'SERENIDAD', 'ORGULLO', 'EUFORIA'] },
  { id: 631, theme: 'Geografia', icon: '🗺️', rows: 10, cols: 10, words: ['CONTINENTE', 'ALTIPLANO', 'RIO', 'CORDILLERA', 'ECUADOR', 'DESIERTO', 'GLACIAR', 'VALLE', 'ISLA', 'PENINSULA', 'POLO', 'ARCHIPIELAGO', 'OCEANO', 'MESETA'] },
  { id: 632, theme: 'Insectos', icon: '🐝', rows: 10, cols: 10, words: ['MOSQUITO', 'MANTIS', 'GRILLO', 'ORUGA', 'ESCARABAJO', 'TERMITA', 'PULGON', 'LUCIERNAGA', 'CIGARRA', 'LIBELULA', 'POLILLA', 'MARIPOSA', 'HORMIGA', 'MOSCA'] },
  { id: 633, theme: 'Aves', icon: '🦜', rows: 10, cols: 10, words: ['CIGUENA', 'CACATUA', 'CONDOR', 'CUERVO', 'GAVIOTA', 'PETIRROJO', 'PALOMA', 'FAISAN', 'FLAMENCO', 'BUHO', 'CANARIO', 'HALCON', 'PINGUINO', 'TUCAN', 'AVESTRUZ'] },
  { id: 634, theme: 'Mar', icon: '🐠', rows: 10, cols: 10, words: ['OSTRA', 'ATUN', 'BALLENA', 'MEDUSA', 'PLANCTON', 'CALAMAR', 'ALGA', 'FOCA', 'ARRECIFE', 'RAYA', 'TIBURON', 'ESTRELLA', 'CANGREJO', 'ANEMONA', 'LANGOSTA', 'PULPO'] },
  { id: 635, theme: 'Fiesta', icon: '🎉', rows: 10, cols: 10, words: ['CONFETI', 'CUMPLEANOS', 'BAILE', 'DECORACION', 'REGALO', 'ANFITRION', 'BRINDIS', 'BANQUETE', 'DISFRAZ', 'INVITADO', 'SERPENTINA', 'GLOBO', 'BRINDIS2'] },
  { id: 636, theme: 'Matematica', icon: '🔢', rows: 10, cols: 10, words: ['SUMA', 'PERIMETRO', 'MULTIPLICACION', 'MEDIDA', 'GEOMETRIA', 'NUMERO', 'CUADRADO', 'PROBLEMA', 'ANGULO', 'VOLUMEN', 'DIVISION', 'FRACCION', 'DECIMAL'] },
  { id: 637, theme: 'Historia', icon: '🏛️', rows: 10, cols: 10, words: ['REY', 'DINASTIA', 'CIVILIZACION', 'CONQUISTA', 'GUERRA', 'TRONO', 'TRATADO', 'PIRAMIDE', 'ARQUEOLOGIA', 'CASTILLO', 'FORTALEZA', 'MONUMENTO', 'REINA'] },
  { id: 638, theme: 'Literatura', icon: '📖', rows: 10, cols: 10, words: ['POEMA', 'TRAMA', 'PERSONAJE', 'LEYENDA', 'METAFORA', 'AUTOR', 'EDITORIAL', 'BIBLIOTECA', 'VERSO', 'MANUSCRITO', 'PROLOGO', 'LECTOR', 'NARRADOR', 'NOVELA'] },
  { id: 639, theme: 'Astronomia', icon: '🔭', rows: 10, cols: 10, words: ['UNIVERSO', 'PLANETA', 'COMETA', 'GRAVEDAD', 'ECLIPSE', 'ESTRELLA', 'ROTACION', 'SATELITE', 'TRASLACION', 'NEBULOSA', 'ORBITA', 'SUPERNOVA', 'METEORO'] },
  { id: 640, theme: 'Salud', icon: '🏥', rows: 10, cols: 10, words: ['ANALISIS', 'ENFERMERA', 'RADIOGRAFIA', 'DIAGNOSTICO', 'QUIROFANO', 'MEDICO', 'RECETA', 'VENDAJE', 'CONSULTORIO', 'PASTILLA', 'CIRUGIA', 'TERAPIA'] },
  { id: 641, theme: 'Construccion', icon: '🏗️', rows: 10, cols: 10, words: ['PARED', 'VENTANA', 'LADRILLO', 'ARENA', 'HORMIGON', 'EXCAVADORA', 'CASCO', 'PLANO', 'PUERTA', 'VIGA', 'TECHO', 'OBRERO', 'NIVEL', 'PALETA', 'CEMENTO', 'ESCALERA'] },
  { id: 642, theme: 'Videojuegos', icon: '🎮', rows: 10, cols: 10, words: ['DERROTA', 'MANDO', 'DESAFIO', 'ESTRATEGIA', 'CONSOLA', 'PUNTAJE', 'JOYSTICK', 'PANTALLA', 'NIVEL', 'MISION', 'PERSONAJE', 'ARCADE', 'LOGRO', 'INVENTARIO'] },
  { id: 643, theme: 'Moda', icon: '👗', rows: 10, cols: 10, words: ['TENDENCIA', 'ACCESORIO', 'PERFUME', 'DISENADOR', 'DESFILE', 'VITRINA', 'ESTILO', 'ETIQUETA', 'BOLSO', 'PASARELA', 'JOYA', 'BOTON', 'MODELO', 'CREMALLERA'] },
  { id: 644, theme: 'Ecologia', icon: '🌍', rows: 10, cols: 10, words: ['CONTAMINACION', 'BIODIVERSIDAD', 'AMBIENTE', 'ECOSISTEMA', 'ENERGIA', 'RECICLAJE', 'ESPECIE', 'COMPOST', 'HABITAT', 'EMISION', 'CLIMA', 'RESIDUO'] },
  { id: 645, theme: 'Postres', icon: '🍰', rows: 10, cols: 10, words: ['MASA', 'GALLETA', 'DULCE', 'GELATINA', 'BROWNIE', 'ALFAJOR', 'TORTA', 'CREMA', 'BUDIN', 'FLAN', 'FRUTILLA', 'HELADO', 'MOUSSE', 'CHOCOLATE', 'BOMBON', 'MERENGUE'] },
  { id: 646, theme: 'Halloween', icon: '🎃', rows: 10, cols: 10, words: ['VAMPIRO', 'BRUJA', 'ZOMBI', 'CALDERO', 'ESQUELETO', 'FANTASMA', 'MURCIELAGO', 'CEMENTERIO', 'DISFRAZ', 'ARANA', 'TELARANA', 'POCION', 'MOMIA', 'CALABAZA'] },
  { id: 647, theme: 'Navidad', icon: '🎄', rows: 10, cols: 10, words: ['NOCHEBUENA', 'MUERDAGO', 'ARBOL', 'RENO', 'TRINEO', 'BASTON', 'GUIRNALDA', 'MEDIA', 'ESTRELLA', 'VELA', 'CHIMENEA', 'NIEVE', 'REGALO', 'VILLANCICO', 'ADORNO'] },
  { id: 648, theme: 'Dinosaurios', icon: '🦕', rows: 10, cols: 10, words: ['ESQUELETO', 'CARNIVORO', 'REPTIL', 'HUEVO', 'GARRA', 'TIRANOSAURIO', 'HERBIVORO', 'EXTINCION', 'TRICERATOPS', 'JURASICO', 'VOLCAN', 'ESCAMA', 'FOSIL'] },
  { id: 649, theme: 'Circo', icon: '🎪', rows: 10, cols: 10, words: ['TRAPECIO', 'PISTA', 'ELEFANTE', 'MALABARISTA', 'EQUILIBRISTA', 'LEON', 'FUNAMBULO', 'BOLETO', 'ZANCOS', 'CARPA', 'ACROBATA', 'DOMADOR', 'CANON', 'PAYASO'] },
  { id: 650, theme: 'Cocina', icon: '🍳', rows: 10, cols: 10, words: ['ARROZ', 'MANTEL', 'BANDEJA', 'HUEVO', 'POSTRE', 'GUISO', 'ALMENDRA', 'MERMELADA', 'GALLETA', 'SAL', 'ESPECIA', 'QUESO', 'SOPA', 'LEVADURA', 'TENEDOR', 'CUCHILLO'] },
  { id: 651, theme: 'Animales', icon: '🐾', rows: 10, cols: 10, words: ['BUFALO', 'ELEFANTE', 'MONO', 'CEBRA', 'ERIZO', 'ZORRO', 'MURCIELAGO', 'HIPOPOTAMO', 'NUTRIA', 'RANA', 'TOPO', 'OSO', 'ARDILLA', 'PANTERA', 'PERRO', 'RINOCERONTE'] },
  { id: 652, theme: 'Playa', icon: '🏖️', rows: 10, cols: 10, words: ['VOLEIBOL', 'ESNORQUEL', 'BARCA', 'ARENA', 'SOMBRILLA', 'BRONCEADOR', 'ANCLA', 'SOL', 'CANGREJO', 'CANOA', 'ACANTILADO', 'BAHIA', 'BALDE', 'FARO', 'ISLA', 'PESCA'] },
  { id: 653, theme: 'Oficina', icon: '🗂️', rows: 10, cols: 10, words: ['INFORME', 'MESA', 'REUNION', 'CLIENTE', 'ARCHIVO', 'CONTRATO', 'ASCENSOR', 'MOUSE', 'SILLA', 'CALENDARIO', 'TECLADO', 'BOLIGRAFO', 'FOLIO', 'TIJERA', 'CINTA'] },
  { id: 654, theme: 'Espacio', icon: '🚀', rows: 10, cols: 10, words: ['ROBOT', 'ASTRO', 'MODULO', 'MARTE', 'COHETE', 'VIA', 'JUPITER', 'MERCURIO', 'PLANETA', 'METEORITO', 'LUZ', 'GALAXIA', 'VENUS', 'CRATER', 'TELESCOPIO', 'UNIVERSO'] },
  { id: 655, theme: 'Musica', icon: '🎵', rows: 10, cols: 10, words: ['CORO', 'TAMBOR', 'CLARINETE', 'ARPA', 'COMPAS', 'RITMO', 'ACORDE', 'TROMPETA', 'CANCION', 'AMPLIFICADOR', 'SINFONIA', 'ACUSTICA', 'FESTIVAL', 'ESCENARIO'] },
  { id: 656, theme: 'Deportes', icon: '⚽', rows: 10, cols: 10, words: ['BOXEO', 'ARQUERO', 'HOCKEY', 'VOLEY', 'CAMPEONATO', 'PATIN', 'CICLISMO', 'GIMNASIA', 'FUTBOL', 'LUCHA', 'ARBITRO', 'NATACION', 'BASQUET', 'ESGRIMA', 'TROFEO'] },
  { id: 657, theme: 'Naturaleza', icon: '🌿', rows: 10, cols: 10, words: ['SEMILLA', 'SELVA', 'RAIZ', 'TIERRA', 'MATORRAL', 'PLANTA', 'PANTANO', 'ENREDADERA', 'CASCADA', 'POLEN', 'ROCA', 'PRADERA', 'VALLE', 'LAGUNA', 'BOSQUE', 'MONTANA'] },
  { id: 658, theme: 'Cine y Arte', icon: '🎬', rows: 10, cols: 10, words: ['RETRATO', 'MAQUILLAJE', 'VESTUARIO', 'DECORADO', 'GALERIA', 'PROTAGONISTA', 'PREMIERE', 'PALETA', 'SUBTITULO', 'REPARTO', 'TRAMA', 'ESCULTURA', 'ROL'] },
  { id: 659, theme: 'Tecnologia', icon: '💻', rows: 10, cols: 10, words: ['INTERNET', 'USUARIO', 'PIXEL', 'DESCARGA', 'CABLE', 'NAVEGADOR', 'ARCHIVO', 'ANTIVIRUS', 'ROBOT', 'APLICACION', 'PANTALLA', 'VIRUS', 'DATOS', 'IMPRESORA'] },
  { id: 660, theme: 'Colores', icon: '🎨', rows: 10, cols: 10, words: ['NEGRO', 'CELESTE', 'ROSA', 'PLATEADO', 'NARANJA', 'PERLA', 'AGUAMARINA', 'TURQUESA', 'BEIGE', 'AMARILLO', 'LILA', 'OCRE', 'CREMA', 'ESMERALDA', 'ROJO', 'CARMESI'] },
  { id: 661, theme: 'Frutas', icon: '🍎', rows: 10, cols: 10, words: ['DURAZNO', 'POMELO', 'HIGO', 'MELON', 'CIRUELA', 'MEMBRILLO', 'PAPAYA', 'BANANA', 'UVA', 'GUAYABA', 'PALTA', 'PERA', 'MARACUYA', 'FRUTILLA', 'MANZANA', 'ARANDANO'] },
  { id: 662, theme: 'Verduras', icon: '🥕', rows: 10, cols: 10, words: ['ZANAHORIA', 'CEBOLLA', 'ACELGA', 'BROCOLI', 'ALCAUCIL', 'LECHUGA', 'AJO', 'PUERRO', 'CHOCLO', 'BERENJENA', 'PAPA', 'ZAPALLO', 'BATATA', 'MORRON', 'REMOLACHA'] },
  { id: 663, theme: 'Ropa', icon: '👕', rows: 10, cols: 10, words: ['BOTA', 'PANTALON', 'CINTURON', 'TRAJE', 'SANDALIA', 'ZAPATILLA', 'CHALECO', 'OVEROL', 'BLUSA', 'GORRA', 'SACO', 'SHORT', 'MOCHILA', 'POLLERA', 'REMERA', 'GUANTE'] },
  { id: 664, theme: 'Cuerpo Humano', icon: '🧍', rows: 10, cols: 10, words: ['NARIZ', 'PANTORRILLA', 'OREJA', 'PECHO', 'ESPALDA', 'CUELLO', 'MUSLO', 'BOCA', 'CABEZA', 'TOBILLO', 'HOMBRO', 'PARPADO', 'MUNECA', 'MENTON', 'PESTANA', 'RODILLA'] },
  { id: 665, theme: 'Familia', icon: '👪', rows: 10, cols: 10, words: ['BISABUELO', 'PRIMO', 'PADRE', 'HERMANO', 'GEMELO', 'CUNADO', 'HERMANASTRO', 'TIO', 'TIA', 'SUEGRO', 'HIJA', 'MADRINA', 'PARIENTE', 'ABUELO', 'SOBRINO', 'FAMILIA'] },
  { id: 666, theme: 'Escuela', icon: '📚', rows: 10, cols: 10, words: ['LECTURA', 'REGLA', 'BOLETIN', 'LAPIZ', 'ALUMNO', 'DIPLOMA', 'LIBRO', 'CARTUCHERA', 'DIRECTOR', 'MAESTRO', 'CAMPANA', 'CUADERNO', 'GOMA', 'AULA', 'MAPA', 'RECREO'] },
  { id: 667, theme: 'Ciudad', icon: '🏙️', rows: 10, cols: 10, words: ['AVENIDA', 'MURO', 'ESTACIONAMIENTO', 'ESQUINA', 'TRANSITO', 'VECINO', 'VEREDA', 'EDIFICIO', 'RASCACIELOS', 'CALLE', 'CIUDADANO', 'PLAZA', 'MUNICIPIO'] },
  { id: 668, theme: 'Clima', icon: '🌦️', rows: 10, cols: 10, words: ['SOL', 'LLUVIA', 'TEMPESTAD', 'VIENTO', 'VENDAVAL', 'HUMEDAD', 'HURACAN', 'MONZON', 'TORMENTA', 'NIEVE', 'TRUENO', 'ROCIO', 'ESCARCHA', 'NUBE', 'BRISA', 'NEBLINA'] },
  { id: 669, theme: 'Transporte', icon: '🚗', rows: 10, cols: 10, words: ['GLOBO', 'MOTO', 'MONOPATIN', 'YATE', 'SUBTE', 'CARRUAJE', 'HELICOPTERO', 'TRINEO', 'VELERO', 'CARRETA', 'TAXI', 'CAMION', 'CAMIONETA', 'BICI', 'BARCO', 'TRANVIA'] },
  { id: 670, theme: 'Herramientas', icon: '🔧', rows: 10, cols: 10, words: ['ALICATE', 'SIERRA', 'DESTORNILLADOR', 'GATO', 'LIJA', 'NIVEL', 'ESCUADRA', 'MARTILLO', 'PINZA', 'CEPILLO', 'CLAVO', 'TENAZA', 'BROCA', 'ESCOFINA', 'SOLDADOR'] },
  { id: 671, theme: 'Profesiones', icon: '👷', rows: 10, cols: 10, words: ['COCINERO', 'PILOTO', 'CARPINTERO', 'PLOMERO', 'BOMBERO', 'INGENIERO', 'MEDICO', 'MECANICO', 'MAESTRO', 'ENFERMERO', 'POLICIA', 'PSICOLOGO', 'ABOGADO'] },
  { id: 672, theme: 'Emociones', icon: '😊', rows: 10, cols: 10, words: ['GRATITUD', 'VERGUENZA', 'SERENIDAD', 'ENTUSIASMO', 'ALEGRIA', 'ORGULLO', 'ESPERANZA', 'ENVIDIA', 'TERNURA', 'NOSTALGIA', 'CURIOSIDAD', 'SORPRESA'] },
  { id: 673, theme: 'Geografia', icon: '🗺️', rows: 10, cols: 10, words: ['MONTANA', 'BAHIA', 'DESIERTO', 'COSTA', 'ECUADOR', 'DELTA', 'ESTRECHO', 'GLACIAR', 'ISLA', 'VALLE', 'CORDILLERA', 'POLO', 'LLANURA', 'PENINSULA', 'ALTIPLANO'] },
  { id: 674, theme: 'Insectos', icon: '🐝', rows: 10, cols: 10, words: ['MARIPOSA', 'ESCARABAJO', 'PULGON', 'LIBELULA', 'LUCIERNAGA', 'CIEMPIES', 'SALTAMONTES', 'AVISPA', 'MANTIS', 'CIGARRA', 'POLILLA', 'GRILLO', 'HORMIGA'] },
  { id: 675, theme: 'Aves', icon: '🦜', rows: 10, cols: 10, words: ['PETIRROJO', 'BUHO', 'CONDOR', 'CACATUA', 'FAISAN', 'PALOMA', 'CANARIO', 'GORRION', 'PINGUINO', 'COLIBRI', 'AGUILA', 'CUERVO', 'CIGUENA', 'AVESTRUZ', 'PERDIZ'] },
  { id: 676, theme: 'Mar', icon: '🐠', rows: 10, cols: 10, words: ['MOROENA', 'PLANCTON', 'ALGA', 'FOCA', 'MEDUSA', 'DELFIN', 'CARACOL', 'BALLENA', 'ESTRELLA', 'TIBURON', 'ARRECIFE', 'RAYA', 'OSTRA', 'CALAMAR', 'PULPO', 'ANEMONA'] },
  { id: 677, theme: 'Fiesta', icon: '🎉', rows: 10, cols: 10, words: ['DECORACION', 'GLOBO', 'BRINDIS', 'BANQUETE', 'BAILE', 'ANFITRION', 'CUMPLEANOS', 'MUSICA', 'PINATA', 'DISFRAZ', 'INVITADO', 'GUIRNALDA', 'SERPENTINA'] },
  { id: 678, theme: 'Matematica', icon: '🔢', rows: 10, cols: 10, words: ['GRAFICO', 'FORMULA', 'FRACCION', 'PERIMETRO', 'MULTIPLICACION', 'CIRCULO', 'ANGULO', 'PROBLEMA', 'GEOMETRIA', 'CUADRADO', 'VOLUMEN', 'PORCENTAJE'] },
  { id: 679, theme: 'Historia', icon: '🏛️', rows: 10, cols: 10, words: ['FORTALEZA', 'ESPADA', 'CONQUISTA', 'IMPERIO', 'PIRAMIDE', 'CIVILIZACION', 'ARQUEOLOGIA', 'CORONA', 'TRONO', 'REVOLUCION', 'CASTILLO', 'MONUMENTO'] },
  { id: 680, theme: 'Literatura', icon: '📖', rows: 10, cols: 10, words: ['EPILOGO', 'NOVELA', 'PERSONAJE', 'POEMA', 'LEYENDA', 'AUTOR', 'LECTOR', 'LIBRO', 'TRAMA', 'BIBLIOTECA', 'CUENTO', 'CAPITULO', 'EDITORIAL', 'PROLOGO', 'VERSO'] },
  { id: 681, theme: 'Astronomia', icon: '🔭', rows: 10, cols: 10, words: ['GRAVEDAD', 'NEBULOSA', 'CRATER', 'SATELITE', 'OBSERVATORIO', 'ASTEROIDE', 'PLANETA', 'SUPERNOVA', 'TRASLACION', 'ESTRELLA', 'GALAXIA', 'UNIVERSO'] },
  { id: 682, theme: 'Salud', icon: '🏥', rows: 10, cols: 10, words: ['ANESTESIA', 'RADIOGRAFIA', 'VENDAJE', 'TERMOMETRO', 'DIAGNOSTICO', 'ANALISIS', 'ENFERMERA', 'RECETA', 'CAMILLA', 'CIRUGIA', 'TERAPIA', 'HOSPITAL'] },
  { id: 683, theme: 'Construccion', icon: '🏗️', rows: 10, cols: 10, words: ['LADRILLO', 'CEMENTO', 'EXCAVADORA', 'CIMIENTO', 'VIGA', 'ARENA', 'ESCALERA', 'VENTANA', 'HORMIGON', 'PALETA', 'PARED', 'TECHO', 'GRUA', 'PLANO', 'CAL', 'ANDAMIO'] },
  { id: 684, theme: 'Videojuegos', icon: '🎮', rows: 10, cols: 10, words: ['PANTALLA', 'PUNTAJE', 'JOYSTICK', 'DERROTA', 'ARCADE', 'JEFE', 'NIVEL', 'CONSOLA', 'MAPA', 'MULTIJUGADOR', 'VICTORIA', 'PERSONAJE', 'INVENTARIO', 'MANDO'] },
  { id: 685, theme: 'Moda', icon: '👗', rows: 10, cols: 10, words: ['TEJIDO', 'TALLA', 'TEXTIL', 'BOLSO', 'PASARELA', 'MODELO', 'MAQUILLAJE', 'ACCESORIO', 'ESTILO', 'BOTON', 'CREMALLERA', 'ETIQUETA', 'DISENADOR', 'DESFILE'] },
  { id: 686, theme: 'Ecologia', icon: '🌍', rows: 10, cols: 10, words: ['BIODIVERSIDAD', 'RENOVABLE', 'HABITAT', 'CLIMA', 'ECOSISTEMA', 'RECICLAJE', 'AMBIENTE', 'CONSERVACION', 'CONTAMINACION', 'ENERGIA', 'EMISION'] },
  { id: 687, theme: 'Postres', icon: '🍰', rows: 10, cols: 10, words: ['ALFAJOR', 'GELATINA', 'CARAMELO', 'BUDIN', 'DULCE', 'MOUSSE', 'HELADO', 'TIRAMISU', 'FLAN', 'VAINILLA', 'MASA', 'BOMBON', 'TORTA', 'CREMA', 'FRUTILLA', 'BROWNIE'] },
  { id: 688, theme: 'Halloween', icon: '🎃', rows: 10, cols: 10, words: ['MURCIELAGO', 'CALDERO', 'TELARANA', 'CADENA', 'CALABAZA', 'DISFRAZ', 'VAMPIRO', 'CEMENTERIO', 'BRUJA', 'POCION', 'FANTASMA', 'LUNA', 'ESQUELETO', 'ARANA'] },
  { id: 689, theme: 'Navidad', icon: '🎄', rows: 10, cols: 10, words: ['MEDIA', 'CHIMENEA', 'NIEVE', 'ADORNO', 'ARBOL', 'BASTON', 'RENO', 'GUIRNALDA', 'VELA', 'MUERDAGO', 'VILLANCICO', 'REGALO', 'TRINEO', 'NOCHEBUENA', 'ESTRELLA'] },
  { id: 690, theme: 'Dinosaurios', icon: '🦕', rows: 10, cols: 10, words: ['REPTIL', 'ESCAMA', 'VOLCAN', 'VELOCIRAPTOR', 'TRICERATOPS', 'ESQUELETO', 'PANTANO', 'GARRA', 'EXTINCION', 'HUEVO', 'COLA', 'JURASICO', 'TIRANOSAURIO'] },
  { id: 691, theme: 'Circo', icon: '🎪', rows: 10, cols: 10, words: ['LEON', 'PISTA', 'PAYASO', 'DOMADOR', 'ELEFANTE', 'CARPA', 'ACROBATA', 'BOLETO', 'EQUILIBRISTA', 'ZANCOS', 'TRAPECIO', 'FUNAMBULO', 'CANON', 'MALABARISTA'] },
  { id: 692, theme: 'Cocina', icon: '🍳', rows: 10, cols: 10, words: ['COLADOR', 'CUCHARA', 'PAN', 'BATIDORA', 'OLLA', 'MIEL', 'ESPATULA', 'PASTA', 'ALMENDRA', 'TENEDOR', 'CANELA', 'LEVADURA', 'GALLETA', 'NUEZ', 'QUESO', 'MERMELADA'] },
  { id: 693, theme: 'Animales', icon: '🐾', rows: 10, cols: 10, words: ['CONEJO', 'LINCE', 'LEOPARDO', 'MONO', 'PANTERA', 'RANA', 'ELEFANTE', 'CANGURO', 'TIGRE', 'CEBRA', 'RATON', 'HIPOPOTAMO', 'JAGUAR', 'GACELA', 'ALCE', 'MURCIELAGO'] },
  { id: 694, theme: 'Playa', icon: '🏖️', rows: 10, cols: 10, words: ['TOALLA', 'MUELLE', 'ESNORQUEL', 'ACANTILADO', 'VOLEIBOL', 'PESCA', 'BUCEO', 'SURF', 'CANGREJO', 'TABLA', 'OLA', 'BALDE', 'ARENA', 'BRONCEADOR', 'COSTA', 'VERANO'] },
  { id: 695, theme: 'Oficina', icon: '🗂️', rows: 10, cols: 10, words: ['CINTA', 'LAPIZ', 'GRAPAS', 'PROYECTO', 'ASCENSOR', 'CLIP', 'FOTOCOPIA', 'PRESUPUESTO', 'CONTRATO', 'JEFE', 'SELLO', 'FACTURA', 'OFICINISTA', 'MOUSE', 'SILLA'] },
  { id: 696, theme: 'Espacio', icon: '🚀', rows: 10, cols: 10, words: ['METEORITO', 'ECLIPSE', 'AGUJERO', 'TELESCOPIO', 'MODULO', 'ORBITA', 'MERCURIO', 'GALAXIA', 'SATURNO', 'UNIVERSO', 'JUPITER', 'COHETE', 'SATELITE', 'LUNA'] },
  { id: 697, theme: 'Musica', icon: '🎵', rows: 10, cols: 10, words: ['SINFONIA', 'CONCIERTO', 'CORO', 'TROMPETA', 'SAXOFON', 'ACUSTICA', 'LETRA', 'TAMBOR', 'VIOLIN', 'MICROFONO', 'CLARINETE', 'AMPLIFICADOR', 'CANTO', 'NOTA'] },
  { id: 698, theme: 'Deportes', icon: '⚽', rows: 10, cols: 10, words: ['ESQUI', 'ARBITRO', 'PELOTA', 'CANCHA', 'TROFEO', 'ESGRIMA', 'LUCHA', 'PATIN', 'CAMPEONATO', 'MARATON', 'HOCKEY', 'RUGBY', 'EQUIPO', 'ENTRENADOR', 'TIRO', 'BOXEO'] },
  { id: 699, theme: 'Naturaleza', icon: '🌿', rows: 10, cols: 10, words: ['ENREDADERA', 'HUMUS', 'TIERRA', 'BOSQUE', 'LAGUNA', 'ARROYO', 'VALLE', 'ECOSISTEMA', 'PRADERA', 'RIO', 'VIENTO', 'CORTEZA', 'ROCIO', 'MUSGO', 'POLEN', 'MATORRAL'] },
  { id: 700, theme: 'Cine y Arte', icon: '🎬', rows: 10, cols: 10, words: ['ESCULTURA', 'SUBTITULO', 'ACTRIZ', 'ESCENA', 'BOCETO', 'ROL', 'PREMIERE', 'PINTURA', 'VESTUARIO', 'PROTAGONISTA', 'ACTOR', 'PANTALLA', 'GALERIA', 'GUION'] },
  { id: 701, theme: 'Tecnologia', icon: '💻', rows: 10, cols: 10, words: ['SENSOR', 'USUARIO', 'CABLE', 'APLICACION', 'MEMORIA', 'ROUTER', 'PANTALLA', 'BATERIA', 'RED', 'SOFTWARE', 'DRON', 'DESCARGA', 'TECLADO', 'ALGORITMO', 'DATOS'] },
  { id: 702, theme: 'Colores', icon: '🎨', rows: 10, cols: 10, words: ['AMARILLO', 'TURQUESA', 'DORADO', 'CREMA', 'NARANJA', 'VERDE', 'MOSTAZA', 'PLATEADO', 'ROJO', 'ESMERALDA', 'CARMESI', 'BLANCO', 'BORDO', 'NEGRO', 'AGUAMARINA'] },
  { id: 703, theme: 'Frutas', icon: '🍎', rows: 10, cols: 10, words: ['COCO', 'HIGO', 'MELON', 'SANDIA', 'PALTA', 'FRAMBUESA', 'ARANDANO', 'MANZANA', 'MARACUYA', 'GRANADA', 'DURAZNO', 'FRUTILLA', 'LIMON', 'UVA', 'MANDARINA', 'MANGO'] },
  { id: 704, theme: 'Verduras', icon: '🥕', rows: 10, cols: 10, words: ['LECHUGA', 'APIO', 'ZANAHORIA', 'ACELGA', 'COLIFLOR', 'ESPINACA', 'BERENJENA', 'ALCAUCIL', 'ZAPALLO', 'BROCOLI', 'PEREJIL', 'BATATA', 'AJO', 'PAPA', 'CEBOLLA'] },
  { id: 705, theme: 'Ropa', icon: '👕', rows: 10, cols: 10, words: ['PANTALON', 'GORRO', 'GORRA', 'MEDIAS', 'VESTIDO', 'ZAPATO', 'CINTURON', 'POLLERA', 'IMPERMEABLE', 'SACO', 'CORBATA', 'CHALECO', 'ZAPATILLA', 'REMERA', 'BOTA'] },
  { id: 706, theme: 'Cuerpo Humano', icon: '🧍', rows: 10, cols: 10, words: ['PANTORRILLA', 'MENTON', 'BOCA', 'CINTURA', 'CUELLO', 'PARPADO', 'TOBILLO', 'MUSLO', 'MUNECA', 'PECHO', 'ESPALDA', 'MEJILLA', 'PESTANA', 'CABEZA', 'MANO', 'BRAZO'] },
  { id: 707, theme: 'Escuela', icon: '📚', rows: 10, cols: 11, words: ['CARTUCHERA', 'RECREO', 'PIZARRON', 'LECTURA', 'UNIFORME', 'REGLA', 'CAMPANA', 'LAPIZ', 'DIPLOMA', 'TIZA', 'MAPA', 'ALUMNO', 'CALCULADORA', 'MAESTRO', 'MOCHILA', 'CUADERNO'] },
  { id: 708, theme: 'Ciudad', icon: '🏙️', rows: 10, cols: 11, words: ['SEMAFORO', 'CALLE', 'TRANSITO', 'AVENIDA', 'ESTACION', 'ESTACIONAMIENTO', 'TERMINAL', 'CIUDADANO', 'MUNICIPIO', 'RASCACIELOS', 'MURO', 'BARRIO', 'PARQUE', 'PUENTE'] },
  { id: 709, theme: 'Transporte', icon: '🚗', rows: 10, cols: 11, words: ['CAMIONETA', 'MOTO', 'TRINEO', 'HELICOPTERO', 'COLECTIVO', 'TELEFERICO', 'MONOPATIN', 'AUTO', 'CARRETA', 'TRANVIA', 'CAMION', 'VELERO', 'GLOBO', 'CARRUAJE', 'SUBTE', 'YATE'] },
  { id: 710, theme: 'Herramientas', icon: '🔧', rows: 10, cols: 11, words: ['CEPILLO', 'NIVEL', 'SIERRA', 'SOLDADOR', 'CLAVO', 'TENAZA', 'TALADRO', 'FORMON', 'HACHA', 'ESCUADRA', 'GATO', 'DESTORNILLADOR', 'TORNILLO', 'ALICATE', 'MARTILLO', 'CINCEL'] },
  { id: 711, theme: 'Profesiones', icon: '👷', rows: 10, cols: 11, words: ['MEDICO', 'COCINERO', 'JARDINERO', 'ABOGADO', 'VETERINARIO', 'PERIODISTA', 'CONTADOR', 'MAESTRO', 'ARQUITECTO', 'PANADERO', 'MECANICO', 'INGENIERO', 'PSICOLOGO'] },
  { id: 712, theme: 'Emociones', icon: '😊', rows: 10, cols: 11, words: ['GRATITUD', 'ENTUSIASMO', 'ESPERANZA', 'FRUSTRACION', 'NOSTALGIA', 'SERENIDAD', 'ORGULLO', 'CURIOSIDAD', 'TRISTEZA', 'VERGUENZA', 'CALMA', 'ALEGRIA', 'ANSIEDAD'] },
  { id: 713, theme: 'Geografia', icon: '🗺️', rows: 10, cols: 11, words: ['GLACIAR', 'PENINSULA', 'LLANURA', 'MONTANA', 'CORDILLERA', 'ARCHIPIELAGO', 'VOLCAN', 'ISLA', 'ECUADOR', 'RIO', 'CONTINENTE', 'ALTIPLANO', 'ESTRECHO', 'COSTA', 'OCEANO'] },
  { id: 714, theme: 'Insectos', icon: '🐝', rows: 10, cols: 11, words: ['ORUGA', 'MOSQUITO', 'LIBELULA', 'TERMITA', 'HORMIGA', 'PULGON', 'CIGARRA', 'SALTAMONTES', 'GRILLO', 'ESCARABAJO', 'AVISPA', 'MOSCA', 'POLILLA', 'CUCARACHA', 'MARIPOSA'] },
  { id: 715, theme: 'Aves', icon: '🦜', rows: 10, cols: 11, words: ['PERDIZ', 'CACATUA', 'CONDOR', 'AGUILA', 'PETIRROJO', 'COLIBRI', 'AVESTRUZ', 'HALCON', 'FAISAN', 'CUERVO', 'FLAMENCO', 'PINGUINO', 'CANARIO', 'PALOMA', 'CIGUENA', 'GAVIOTA'] },
  { id: 716, theme: 'Fiesta', icon: '🎉', rows: 10, cols: 11, words: ['DISFRAZ', 'TORTA', 'ANFITRION', 'REGALO', 'CANCION', 'INVITADO', 'BAILE', 'MUSICA', 'GUIRNALDA', 'GLOBO', 'BRINDIS', 'BRINDIS2', 'SORPRESA', 'CUMPLEANOS', 'DECORACION'] },
  { id: 717, theme: 'Matematica', icon: '🔢', rows: 10, cols: 11, words: ['VOLUMEN', 'ANGULO', 'NUMERO', 'ECUACION', 'SUMA', 'FRACCION', 'GRAFICO', 'GEOMETRIA', 'DIVISION', 'DECIMAL', 'CUADRADO', 'TRIANGULO', 'PERIMETRO', 'MULTIPLICACION'] },
  { id: 718, theme: 'Historia', icon: '🏛️', rows: 10, cols: 11, words: ['CIVILIZACION', 'DINASTIA', 'REY', 'MONUMENTO', 'COLONIA', 'ARQUEOLOGIA', 'CORONA', 'ESPADA', 'GUERRA', 'PIRAMIDE', 'CASTILLO', 'IMPERIO', 'REVOLUCION', 'FORTALEZA'] },
  { id: 719, theme: 'Literatura', icon: '📖', rows: 10, cols: 11, words: ['NARRADOR', 'CAPITULO', 'AUTOR', 'LECTOR', 'NOVELA', 'PROSA', 'POEMA', 'LEYENDA', 'METAFORA', 'MANUSCRITO', 'VERSO', 'PROLOGO', 'PERSONAJE', 'CUENTO', 'BIBLIOTECA', 'LIBRO'] },
  { id: 720, theme: 'Astronomia', icon: '🔭', rows: 10, cols: 11, words: ['ECLIPSE', 'GRAVEDAD', 'ESTRELLA', 'ASTEROIDE', 'GALAXIA', 'TELESCOPIO', 'NEBULOSA', 'UNIVERSO', 'CRATER', 'ROTACION', 'TRASLACION', 'CONSTELACION', 'SUPERNOVA'] },
  { id: 721, theme: 'Salud', icon: '🏥', rows: 10, cols: 11, words: ['TERMOMETRO', 'VACUNA', 'VENDAJE', 'ENFERMERA', 'CAMILLA', 'ANESTESIA', 'PASTILLA', 'CIRUGIA', 'RADIOGRAFIA', 'MEDICO', 'HOSPITAL', 'ANALISIS', 'PACIENTE', 'RECETA'] },
  { id: 722, theme: 'Videojuegos', icon: '🎮', rows: 10, cols: 11, words: ['VICTORIA', 'MULTIJUGADOR', 'LOGRO', 'DERROTA', 'AVENTURA', 'DESAFIO', 'CONSOLA', 'MAPA', 'ESTRATEGIA', 'MISION', 'JOYSTICK', 'INVENTARIO', 'JEFE', 'ARCADE', 'PANTALLA'] },
  { id: 723, theme: 'Moda', icon: '👗', rows: 10, cols: 11, words: ['DESFILE', 'CREMALLERA', 'PERFUME', 'TENDENCIA', 'TEXTIL', 'JOYA', 'TEJIDO', 'DISENADOR', 'VITRINA', 'ETIQUETA', 'MAQUILLAJE', 'TALLA', 'COSTURA', 'ACCESORIO', 'ESTILO'] },
  { id: 724, theme: 'Ecologia', icon: '🌍', rows: 10, cols: 11, words: ['ECOSISTEMA', 'RENOVABLE', 'ESPECIE', 'EMISION', 'COMPOST', 'HABITAT', 'SUSTENTABLE', 'DEFORESTACION', 'CONTAMINACION', 'CLIMA', 'CONSERVACION', 'EXTINCION'] },
  { id: 725, theme: 'Postres', icon: '🍰', rows: 10, cols: 11, words: ['CREMA', 'VAINILLA', 'HELADO', 'GELATINA', 'BROWNIE', 'TORTA', 'TARTA', 'TIRAMISU', 'GALLETA', 'MERENGUE', 'CHOCOLATE', 'FRUTILLA', 'DULCE', 'ALFAJOR', 'BOMBON', 'CARAMELO'] },
  { id: 726, theme: 'Halloween', icon: '🎃', rows: 10, cols: 11, words: ['CEMENTERIO', 'MURCIELAGO', 'TELARANA', 'ESQUELETO', 'CADENA', 'VAMPIRO', 'BRUJA', 'FANTASMA', 'ARANA', 'LUNA', 'ZOMBI', 'CALDERO', 'CALABAZA', 'DISFRAZ', 'MOMIA', 'POCION'] },
  { id: 727, theme: 'Dinosaurios', icon: '🦕', rows: 10, cols: 11, words: ['FOSIL', 'EXTINCION', 'VELOCIRAPTOR', 'GARRA', 'REPTIL', 'VOLCAN', 'TRICERATOPS', 'HUEVO', 'TIRANOSAURIO', 'HERBIVORO', 'ESQUELETO', 'COLA', 'JURASICO', 'CARNIVORO'] },
  { id: 728, theme: 'Oficina', icon: '🗂️', rows: 10, cols: 11, words: ['CALENDARIO', 'FOTOCOPIA', 'BOLIGRAFO', 'MARCADOR', 'PROYECTO', 'PAPEL', 'JEFE', 'GRAPAS', 'AGENDA', 'REUNION', 'CINTA', 'CONTRATO', 'LAPIZ', 'EMAIL', 'MESA', 'PRESUPUESTO'] },
  { id: 729, theme: 'Espacio', icon: '🚀', rows: 10, cols: 11, words: ['TELESCOPIO', 'ORBITA', 'SATELITE', 'VENUS', 'VIA', 'NEBULOSA', 'ASTRO', 'ASTEROIDE', 'SATURNO', 'SUPERNOVA', 'ASTRONAUTA', 'PLANETA', 'ROBOT', 'MARTE', 'AGUJERO', 'MODULO'] },
  { id: 730, theme: 'Musica', icon: '🎵', rows: 10, cols: 11, words: ['COMPAS', 'GUITARRA', 'TAMBOR', 'ARPA', 'BANDA', 'ACORDE', 'AMPLIFICADOR', 'PARTITURA', 'BAJO', 'BALADA', 'CLARINETE', 'TROMPETA', 'FLAUTA', 'ACUSTICA', 'CANTO', 'ORQUESTA'] },
  { id: 731, theme: 'Deportes', icon: '⚽', rows: 10, cols: 11, words: ['VOLEY', 'HOCKEY', 'PELOTA', 'SURF', 'CANCHA', 'RESISTENCIA', 'BASQUET', 'ENTRENADOR', 'ARBITRO', 'ATLETISMO', 'ARQUERO', 'LUCHA', 'EQUIPO', 'RAQUETA', 'VELOCIDAD', 'ESQUI'] },
  { id: 732, theme: 'Cine y Arte', icon: '🎬', rows: 10, cols: 11, words: ['GUION', 'VESTUARIO', 'ACTOR', 'PREMIERE', 'TRAMA', 'RETRATO', 'DIRECTOR', 'MONTAJE', 'ILUMINACION', 'ESTRENO', 'EFECTO', 'PINTURA', 'ACTRIZ', 'REPARTO', 'PROTAGONISTA'] },
  { id: 733, theme: 'Tecnologia', icon: '💻', rows: 10, cols: 11, words: ['ALGORITMO', 'BATERIA', 'MEMORIA', 'DATOS', 'NUBE', 'PIXEL', 'ANTIVIRUS', 'CABLE', 'ROUTER', 'CHIP', 'IMPRESORA', 'APLICACION', 'NAVEGADOR', 'PANTALLA', 'ACTUALIZACION'] },
  { id: 734, theme: 'Verduras', icon: '🥕', rows: 10, cols: 11, words: ['ZANAHORIA', 'COLIFLOR', 'MORRON', 'APIO', 'RABANO', 'PAPA', 'REMOLACHA', 'ESPINACA', 'PEPINO', 'ZAPALLO', 'LECHUGA', 'ACELGA', 'BERENJENA', 'ALCAUCIL', 'BROCOLI', 'BATATA'] },
  { id: 735, theme: 'Ropa', icon: '👕', rows: 10, cols: 11, words: ['OVEROL', 'MOCHILA', 'IMPERMEABLE', 'PIJAMA', 'ZAPATILLA', 'BUFANDA', 'ZAPATO', 'REMERA', 'CAMPERA', 'MEDIAS', 'TRAJE', 'VESTIDO', 'CHALECO', 'CORBATA', 'SANDALIA', 'SHORT'] },
  { id: 736, theme: 'Escuela', icon: '📚', rows: 10, cols: 11, words: ['DIPLOMA', 'BIBLIOTECA', 'AULA', 'GOMA', 'MOCHILA', 'TAREA', 'REGLA', 'CUADERNO', 'CAMPANA', 'DIRECTOR', 'EXAMEN', 'CARTUCHERA', 'UNIFORME', 'BOLETIN', 'PUPITRE', 'LECTURA'] },
  { id: 737, theme: 'Ciudad', icon: '🏙️', rows: 10, cols: 11, words: ['MURO', 'VECINO', 'SEMAFORO', 'ESTACION', 'SUBTERRANEO', 'PARQUE', 'MUNICIPIO', 'ESQUINA', 'ALCALDIA', 'TERMINAL', 'MERCADO', 'PUENTE', 'CIUDADANO', 'FAROL', 'EDIFICIO'] },
  { id: 738, theme: 'Transporte', icon: '🚗', rows: 10, cols: 11, words: ['HELICOPTERO', 'MONOPATIN', 'YATE', 'BICI', 'CARRETA', 'TELEFERICO', 'TRINEO', 'CAMION', 'TRANVIA', 'CARRUAJE', 'CAMIONETA', 'BARCO', 'MOTO', 'SUBTE', 'VELERO', 'COLECTIVO'] },
  { id: 739, theme: 'Herramientas', icon: '🔧', rows: 10, cols: 11, words: ['GATO', 'CEPILLO', 'DESTORNILLADOR', 'PINZA', 'TALADRO', 'SIERRA', 'TORNILLO', 'TENAZA', 'MARTILLO', 'CLAVO', 'ESCOFINA', 'FORMON', 'ESCUADRA', 'LIJA', 'CINCEL', 'SOLDADOR'] },
  { id: 740, theme: 'Profesiones', icon: '👷', rows: 10, cols: 11, words: ['PANADERO', 'ARQUITECTO', 'CONTADOR', 'PINTOR', 'VETERINARIO', 'DENTISTA', 'ABOGADO', 'COCINERO', 'PILOTO', 'MEDICO', 'JARDINERO', 'PLOMERO', 'BOMBERO', 'PSICOLOGO'] },
  { id: 741, theme: 'Emociones', icon: '😊', rows: 10, cols: 11, words: ['ORGULLO', 'CURIOSIDAD', 'ENOJO', 'ALEGRIA', 'MIEDO', 'SORPRESA', 'ESPERANZA', 'ENTUSIASMO', 'EUFORIA', 'FRUSTRACION', 'ANSIEDAD', 'TRISTEZA', 'GRATITUD', 'ENVIDIA'] },
  { id: 742, theme: 'Geografia', icon: '🗺️', rows: 10, cols: 11, words: ['ARCHIPIELAGO', 'RIO', 'BAHIA', 'MESETA', 'ESTRECHO', 'VALLE', 'ALTIPLANO', 'CONTINENTE', 'DELTA', 'ISLA', 'LLANURA', 'PENINSULA', 'DESIERTO', 'ECUADOR', 'GLACIAR', 'COSTA'] },
  { id: 743, theme: 'Insectos', icon: '🐝', rows: 10, cols: 11, words: ['ESCARABAJO', 'POLILLA', 'CUCARACHA', 'PULGON', 'TERMITA', 'MOSCA', 'ORUGA', 'GRILLO', 'LIBELULA', 'HORMIGA', 'ABEJA', 'MOSQUITO', 'MARIPOSA', 'SALTAMONTES', 'CIEMPIES'] },
  { id: 744, theme: 'Aves', icon: '🦜', rows: 10, cols: 11, words: ['PETIRROJO', 'AVESTRUZ', 'PALOMA', 'CACATUA', 'GORRION', 'CUERVO', 'COLIBRI', 'FLAMENCO', 'AGUILA', 'CONDOR', 'CANARIO', 'PINGUINO', 'FAISAN', 'HALCON', 'GAVIOTA', 'PERDIZ'] },
  { id: 745, theme: 'Fiesta', icon: '🎉', rows: 10, cols: 11, words: ['CUMPLEANOS', 'SORPRESA', 'DECORACION', 'REGALO', 'BANQUETE', 'BRINDIS2', 'INVITADO', 'MUSICA', 'PINATA', 'GLOBO', 'DISFRAZ', 'GUIRNALDA', 'BAILE', 'TORTA', 'ANFITRION'] },
  { id: 746, theme: 'Matematica', icon: '🔢', rows: 10, cols: 11, words: ['PORCENTAJE', 'FRACCION', 'CALCULO', 'GRAFICO', 'NUMERO', 'PROBLEMA', 'FORMULA', 'PERIMETRO', 'SUMA', 'VOLUMEN', 'ECUACION', 'RESTA', 'VARIABLE', 'DIVISION', 'CUADRADO'] },
  { id: 747, theme: 'Historia', icon: '🏛️', rows: 10, cols: 11, words: ['EJERCITO', 'CORONA', 'CONQUISTA', 'GUERRA', 'MONUMENTO', 'REVOLUCION', 'CIVILIZACION', 'FORTALEZA', 'TRATADO', 'CASTILLO', 'DINASTIA', 'BATALLA', 'ARQUEOLOGIA'] },
  { id: 748, theme: 'Literatura', icon: '📖', rows: 10, cols: 11, words: ['AUTOR', 'CAPITULO', 'TRAMA', 'EPILOGO', 'PROSA', 'LECTOR', 'LIBRO', 'PROLOGO', 'FABULA', 'NARRADOR', 'METAFORA', 'LEYENDA', 'PERSONAJE', 'EDITORIAL', 'POEMA', 'MANUSCRITO'] },
  { id: 749, theme: 'Astronomia', icon: '🔭', rows: 10, cols: 11, words: ['ASTEROIDE', 'TRASLACION', 'CONSTELACION', 'SUPERNOVA', 'TELESCOPIO', 'COMETA', 'UNIVERSO', 'PLANETA', 'GALAXIA', 'METEORO', 'CRATER', 'ECLIPSE', 'OBSERVATORIO'] },
  { id: 750, theme: 'Salud', icon: '🏥', rows: 10, cols: 11, words: ['PACIENTE', 'RECETA', 'VENDAJE', 'RADIOGRAFIA', 'CIRUGIA', 'TERMOMETRO', 'DIAGNOSTICO', 'CONSULTORIO', 'QUIROFANO', 'ANALISIS', 'ANESTESIA', 'MEDICO', 'JERINGA'] },
  { id: 751, theme: 'Videojuegos', icon: '🎮', rows: 10, cols: 11, words: ['ESTRATEGIA', 'PERSONAJE', 'DERROTA', 'DESAFIO', 'MANDO', 'AVENTURA', 'MISION', 'JOYSTICK', 'INVENTARIO', 'MULTIJUGADOR', 'LOGRO', 'PIXEL', 'PUNTAJE', 'JEFE', 'CONSOLA'] },
  { id: 752, theme: 'Moda', icon: '👗', rows: 10, cols: 11, words: ['TEXTIL', 'ETIQUETA', 'JOYA', 'DESFILE', 'COSTURA', 'BOTON', 'ESTILO', 'CREMALLERA', 'TALLA', 'ACCESORIO', 'VITRINA', 'MAQUILLAJE', 'BOLSO', 'TEJIDO', 'MODELO', 'TENDENCIA'] },
  { id: 753, theme: 'Ecologia', icon: '🌍', rows: 10, cols: 11, words: ['BIODIVERSIDAD', 'ENERGIA', 'CONTAMINACION', 'DEFORESTACION', 'CONSERVACION', 'HUELLA', 'HABITAT', 'RENOVABLE', 'SUSTENTABLE', 'ECOSISTEMA', 'EXTINCION'] },
  { id: 754, theme: 'Postres', icon: '🍰', rows: 10, cols: 11, words: ['GALLETA', 'BROWNIE', 'HELADO', 'BOMBON', 'MOUSSE', 'CARAMELO', 'CHOCOLATE', 'CREMA', 'FRUTILLA', 'GELATINA', 'MERENGUE', 'MASA', 'ALFAJOR', 'VAINILLA', 'TIRAMISU', 'DULCE'] },
  { id: 755, theme: 'Halloween', icon: '🎃', rows: 10, cols: 11, words: ['ESQUELETO', 'MURCIELAGO', 'VAMPIRO', 'DISFRAZ', 'TELARANA', 'ZOMBI', 'CADENA', 'CALABAZA', 'CEMENTERIO', 'POCION', 'ARANA', 'LUNA', 'CALDERO', 'MOMIA', 'BRUJA', 'FANTASMA'] },
  { id: 756, theme: 'Dinosaurios', icon: '🦕', rows: 10, cols: 11, words: ['TRICERATOPS', 'HUEVO', 'VELOCIRAPTOR', 'ESCAMA', 'HERBIVORO', 'PANTANO', 'CARNIVORO', 'FOSIL', 'VOLCAN', 'ESQUELETO', 'GARRA', 'JURASICO', 'REPTIL', 'TIRANOSAURIO'] },
  { id: 757, theme: 'Oficina', icon: '🗂️', rows: 10, cols: 11, words: ['GRAPAS', 'MESA', 'CLIP', 'OFICINISTA', 'CONTRATO', 'CALENDARIO', 'TIJERA', 'PAPEL', 'ESCRITORIO', 'FOLIO', 'ASCENSOR', 'LAPIZ', 'PROYECTO', 'TECLADO', 'CARTELERA', 'CINTA'] },
  { id: 758, theme: 'Espacio', icon: '🚀', rows: 10, cols: 11, words: ['ORBITA', 'JUPITER', 'NEBULOSA', 'PLANETA', 'COMETA', 'GRAVEDAD', 'MERCURIO', 'SUPERNOVA', 'SATELITE', 'LUZ', 'MODULO', 'MARTE', 'VENUS', 'AGUJERO', 'ASTRONAUTA', 'SATURNO'] },
  { id: 759, theme: 'Musica', icon: '🎵', rows: 10, cols: 11, words: ['CLARINETE', 'TROMPETA', 'BALADA', 'AFINACION', 'RITMO', 'ORQUESTA', 'OPERA', 'LETRA', 'PIANO', 'MICROFONO', 'GUITARRA', 'FLAUTA', 'COMPAS', 'SAXOFON', 'BATERIA', 'MELODIA'] },
  { id: 760, theme: 'Deportes', icon: '⚽', rows: 10, cols: 11, words: ['ATLETISMO', 'GIMNASIA', 'MARATON', 'TENIS', 'CANCHA', 'JUDO', 'PATIN', 'ENTRENADOR', 'RESISTENCIA', 'RAQUETA', 'HOCKEY', 'BOXEO', 'VELOCIDAD', 'CICLISMO', 'CAMPEONATO'] },
  { id: 761, theme: 'Cine y Arte', icon: '🎬', rows: 10, cols: 11, words: ['CINE', 'PROTAGONISTA', 'BOCETO', 'ROL', 'ILUMINACION', 'SUBTITULO', 'DECORADO', 'MAQUILLAJE', 'RETRATO', 'ACTOR', 'TRAMA', 'GALERIA', 'ACTRIZ', 'GUION', 'CAMARA', 'ESCENA'] },
  { id: 762, theme: 'Tecnologia', icon: '💻', rows: 10, cols: 11, words: ['MEMORIA', 'CABLE', 'NAVEGADOR', 'ROBOT', 'DATOS', 'ACTUALIZACION', 'ALGORITMO', 'ANTIVIRUS', 'APLICACION', 'VIRUS', 'CONTRASENA', 'MONITOR', 'USUARIO', 'IMPRESORA'] },
  { id: 763, theme: 'Frutas', icon: '🍎', rows: 10, cols: 11, words: ['GRANADA', 'BANANA', 'GUAYABA', 'LICHI', 'MEMBRILLO', 'LIMON', 'ARANDANO', 'CEREZA', 'FRAMBUESA', 'MARACUYA', 'CIRUELA', 'MANDARINA', 'MELON', 'SANDIA', 'FRUTILLA', 'MANGO'] },
  { id: 764, theme: 'Verduras', icon: '🥕', rows: 10, cols: 11, words: ['REMOLACHA', 'ZAPALLO', 'PEPINO', 'PEREJIL', 'ALCAUCIL', 'CEBOLLA', 'RUCULA', 'CHOCLO', 'ESPINACA', 'RABANO', 'PUERRO', 'TOMATE', 'BERENJENA', 'LECHUGA', 'BATATA', 'ACELGA'] },
  { id: 765, theme: 'Ropa', icon: '👕', rows: 10, cols: 11, words: ['BUFANDA', 'SHORT', 'CAMISA', 'POLLERA', 'BLUSA', 'CAMPERA', 'ZAPATILLA', 'IMPERMEABLE', 'BOTA', 'ZAPATO', 'OVEROL', 'SANDALIA', 'CHALECO', 'CORBATA', 'CINTURON', 'MOCHILA'] },
  { id: 766, theme: 'Escuela', icon: '📚', rows: 10, cols: 11, words: ['CUADERNO', 'TAREA', 'PUPITRE', 'LAPIZ', 'BIBLIOTECA', 'LIBRO', 'REGLA', 'GOMA', 'MOCHILA', 'BOLETIN', 'RECREO', 'CARTUCHERA', 'DIRECTOR', 'UNIFORME', 'PIZARRON', 'MAESTRO'] },
  { id: 767, theme: 'Ciudad', icon: '🏙️', rows: 10, cols: 11, words: ['ALCALDIA', 'AVENIDA', 'SUBTERRANEO', 'BARRIO', 'MURO', 'CIUDADANO', 'VECINO', 'PLAZA', 'RASCACIELOS', 'TERMINAL', 'VEREDA', 'MERCADO', 'ESQUINA', 'ESTACIONAMIENTO'] },
  { id: 768, theme: 'Transporte', icon: '🚗', rows: 10, cols: 11, words: ['CARRETA', 'CAMIONETA', 'MOTO', 'CAMION', 'TRINEO', 'BARCO', 'HELICOPTERO', 'VELERO', 'TELEFERICO', 'CARRUAJE', 'AUTO', 'GLOBO', 'BICI', 'TRANVIA', 'MONOPATIN', 'COLECTIVO'] },
  { id: 769, theme: 'Herramientas', icon: '🔧', rows: 10, cols: 11, words: ['GATO', 'PINZA', 'CLAVO', 'ESCUADRA', 'SIERRA', 'CINTA', 'ESCOFINA', 'SOLDADOR', 'ALICATE', 'DESTORNILLADOR', 'CINCEL', 'TALADRO', 'TORNILLO', 'FORMON', 'TENAZA', 'CEPILLO'] },
  { id: 770, theme: 'Profesiones', icon: '👷', rows: 10, cols: 11, words: ['POLICIA', 'JARDINERO', 'BOMBERO', 'MAESTRO', 'CARPINTERO', 'PLOMERO', 'PERIODISTA', 'PSICOLOGO', 'MECANICO', 'PANADERO', 'ENFERMERO', 'ARQUITECTO', 'INGENIERO'] },
  { id: 771, theme: 'Emociones', icon: '😊', rows: 10, cols: 11, words: ['TERNURA', 'ENVIDIA', 'SORPRESA', 'SERENIDAD', 'TRISTEZA', 'ANSIEDAD', 'CULPA', 'CALMA', 'GRATITUD', 'CONFIANZA', 'FRUSTRACION', 'ALEGRIA', 'VERGUENZA', 'ESPERANZA'] },
  { id: 772, theme: 'Geografia', icon: '🗺️', rows: 10, cols: 11, words: ['CONTINENTE', 'GLACIAR', 'MESETA', 'MONTANA', 'OCEANO', 'PENINSULA', 'ECUADOR', 'ALTIPLANO', 'BAHIA', 'ISLA', 'VALLE', 'POLO', 'ESTRECHO', 'DESIERTO', 'DELTA', 'CORDILLERA'] },
  { id: 773, theme: 'Insectos', icon: '🐝', rows: 10, cols: 11, words: ['MANTIS', 'POLILLA', 'GRILLO', 'LIBELULA', 'CUCARACHA', 'ESCARABAJO', 'ABEJA', 'MOSCA', 'ORUGA', 'PULGON', 'HORMIGA', 'CIGARRA', 'AVISPA', 'MOSQUITO', 'MARIPOSA', 'TERMITA'] },
  { id: 774, theme: 'Aves', icon: '🦜', rows: 10, cols: 11, words: ['PALOMA', 'PERDIZ', 'CIGUENA', 'GAVIOTA', 'GORRION', 'FAISAN', 'CANARIO', 'FLAMENCO', 'AVESTRUZ', 'COLIBRI', 'CACATUA', 'PETIRROJO', 'TUCAN', 'PINGUINO', 'CONDOR', 'AGUILA'] },
  { id: 775, theme: 'Fiesta', icon: '🎉', rows: 10, cols: 11, words: ['ANFITRION', 'GLOBO', 'INVITADO', 'BANQUETE', 'PINATA', 'MUSICA', 'BRINDIS', 'VELA', 'GUIRNALDA', 'DISFRAZ', 'TORTA', 'DECORACION', 'CUMPLEANOS', 'REGALO', 'SERPENTINA'] },
  { id: 776, theme: 'Matematica', icon: '🔢', rows: 10, cols: 11, words: ['FRACCION', 'VOLUMEN', 'SUMA', 'MULTIPLICACION', 'DIVISION', 'VARIABLE', 'CUADRADO', 'GRAFICO', 'MEDIDA', 'PORCENTAJE', 'ECUACION', 'PERIMETRO', 'FORMULA', 'ANGULO'] },
  { id: 777, theme: 'Historia', icon: '🏛️', rows: 10, cols: 11, words: ['MONUMENTO', 'FORTALEZA', 'REY', 'ARQUEOLOGIA', 'EJERCITO', 'TRATADO', 'DINASTIA', 'REVOLUCION', 'COLONIA', 'TRONO', 'IMPERIO', 'ESPADA', 'CASTILLO', 'CIVILIZACION'] },
  { id: 778, theme: 'Literatura', icon: '📖', rows: 10, cols: 11, words: ['PERSONAJE', 'MANUSCRITO', 'POEMA', 'METAFORA', 'NARRADOR', 'EPILOGO', 'BIBLIOTECA', 'LEYENDA', 'LECTOR', 'EDITORIAL', 'TRAMA', 'VERSO', 'CUENTO', 'AUTOR', 'PROSA', 'LIBRO'] },
  { id: 779, theme: 'Astronomia', icon: '🔭', rows: 10, cols: 11, words: ['CONSTELACION', 'SATELITE', 'ESTRELLA', 'ASTEROIDE', 'COMETA', 'TELESCOPIO', 'CRATER', 'OBSERVATORIO', 'GRAVEDAD', 'PLANETA', 'ROTACION', 'GALAXIA', 'SUPERNOVA'] },
  { id: 780, theme: 'Salud', icon: '🏥', rows: 10, cols: 11, words: ['CIRUGIA', 'QUIROFANO', 'ENFERMERA', 'CONSULTORIO', 'ANALISIS', 'VACUNA', 'RECETA', 'ANESTESIA', 'TERAPIA', 'PACIENTE', 'HOSPITAL', 'DIAGNOSTICO', 'RADIOGRAFIA'] },
  { id: 781, theme: 'Videojuegos', icon: '🎮', rows: 10, cols: 11, words: ['CONSOLA', 'MANDO', 'MULTIJUGADOR', 'INVENTARIO', 'ARCADE', 'LOGRO', 'PERSONAJE', 'JOYSTICK', 'DERROTA', 'PANTALLA', 'NIVEL', 'MAPA', 'MISION', 'ESTRATEGIA', 'VICTORIA'] },
  { id: 782, theme: 'Moda', icon: '👗', rows: 10, cols: 11, words: ['JOYA', 'BOTON', 'TALLA', 'ACCESORIO', 'PERFUME', 'ESTILO', 'TEJIDO', 'ETIQUETA', 'TENDENCIA', 'MODELO', 'VITRINA', 'MAQUILLAJE', 'BOLSO', 'PASARELA', 'DISENADOR', 'TEXTIL'] },
  { id: 783, theme: 'Ecologia', icon: '🌍', rows: 10, cols: 11, words: ['HABITAT', 'RESIDUO', 'SUSTENTABLE', 'CLIMA', 'HUELLA', 'CONTAMINACION', 'EMISION', 'CONSERVACION', 'RECICLAJE', 'DEFORESTACION', 'COMPOST', 'BIODIVERSIDAD'] },
  { id: 784, theme: 'Postres', icon: '🍰', rows: 10, cols: 11, words: ['MASA', 'CHOCOLATE', 'MOUSSE', 'GELATINA', 'TORTA', 'GALLETA', 'ALFAJOR', 'FRUTILLA', 'BROWNIE', 'TIRAMISU', 'CARAMELO', 'HELADO', 'VAINILLA', 'MERENGUE', 'BOMBON', 'TARTA'] },
  { id: 785, theme: 'Halloween', icon: '🎃', rows: 10, cols: 11, words: ['ZOMBI', 'CADENA', 'FANTASMA', 'DISFRAZ', 'TELARANA', 'BRUJA', 'CEMENTERIO', 'LUNA', 'MOMIA', 'ESQUELETO', 'VAMPIRO', 'POCION', 'CALDERO', 'ARANA', 'CALABAZA', 'MURCIELAGO'] },
  { id: 786, theme: 'Dinosaurios', icon: '🦕', rows: 10, cols: 11, words: ['VELOCIRAPTOR', 'VOLCAN', 'TIRANOSAURIO', 'PANTANO', 'EXTINCION', 'GARRA', 'TRICERATOPS', 'JURASICO', 'CARNIVORO', 'ESCAMA', 'ESQUELETO', 'FOSIL', 'REPTIL', 'HUEVO'] },
  { id: 787, theme: 'Oficina', icon: '🗂️', rows: 10, cols: 11, words: ['CALENDARIO', 'GRAPAS', 'INFORME', 'FOLIO', 'MARCADOR', 'CARPETA', 'AGENDA', 'ASCENSOR', 'CINTA', 'FACTURA', 'JEFE', 'REUNION', 'TECLADO', 'FOTOCOPIA', 'LAPIZ', 'BOLIGRAFO'] },
  { id: 788, theme: 'Espacio', icon: '🚀', rows: 10, cols: 11, words: ['ASTEROIDE', 'MARTE', 'URANO', 'ASTRONAUTA', 'MODULO', 'AGUJERO', 'TELESCOPIO', 'NEBULOSA', 'SATURNO', 'COHETE', 'NAVE', 'ECLIPSE', 'LUNA', 'METEORITO', 'ASTRO', 'GRAVEDAD'] },
  { id: 789, theme: 'Musica', icon: '🎵', rows: 10, cols: 11, words: ['PIANO', 'AFINACION', 'OPERA', 'TAMBOR', 'SAXOFON', 'CANCION', 'ESCENARIO', 'ORQUESTA', 'BAJO', 'AMPLIFICADOR', 'PARTITURA', 'BATERIA', 'SINFONIA', 'MICROFONO', 'BANDA'] },
  { id: 790, theme: 'Deportes', icon: '⚽', rows: 10, cols: 11, words: ['RAQUETA', 'EQUIPO', 'GIMNASIA', 'RESISTENCIA', 'KARATE', 'ENTRENADOR', 'MEDALLA', 'JUDO', 'NATACION', 'CANCHA', 'CICLISMO', 'TENIS', 'PATIN', 'BOXEO', 'MARATON', 'ARQUERO'] },
  { id: 791, theme: 'Cine y Arte', icon: '🎬', rows: 10, cols: 11, words: ['PALETA', 'SUBTITULO', 'MONTAJE', 'EFECTO', 'TALLER', 'TRAMA', 'ILUMINACION', 'CAMARA', 'ACTRIZ', 'PANTALLA', 'RETRATO', 'PINTURA', 'BOCETO', 'CINE', 'ESCULTURA', 'REPARTO'] },
  { id: 792, theme: 'Tecnologia', icon: '💻', rows: 10, cols: 11, words: ['PLATAFORMA', 'DESCARGA', 'ALGORITMO', 'VIRUS', 'RED', 'ANTIVIRUS', 'DRON', 'IMPRESORA', 'PROCESADOR', 'CODIGO', 'SENSOR', 'CHIP', 'DATOS', 'USUARIO', 'SERVIDOR', 'BATERIA'] },
  { id: 793, theme: 'Verduras', icon: '🥕', rows: 10, cols: 11, words: ['PUERRO', 'CEBOLLA', 'CHOCLO', 'TOMATE', 'RUCULA', 'PAPA', 'ZAPALLO', 'COLIFLOR', 'BROCOLI', 'MORRON', 'REMOLACHA', 'ESPINACA', 'RABANO', 'ZANAHORIA', 'ALCAUCIL', 'PEREJIL'] },
  { id: 794, theme: 'Ropa', icon: '👕', rows: 10, cols: 11, words: ['MOCHILA', 'CINTURON', 'BLUSA', 'GORRA', 'REMERA', 'CORBATA', 'BUFANDA', 'IMPERMEABLE', 'BOTA', 'GUANTE', 'CAMPERA', 'ZAPATILLA', 'PANTALON', 'SANDALIA', 'CHALECO', 'GORRO'] },
  { id: 795, theme: 'Escuela', icon: '📚', rows: 10, cols: 11, words: ['MAESTRO', 'CUADERNO', 'DIRECTOR', 'GOMA', 'LECTURA', 'EXAMEN', 'BIBLIOTECA', 'PUPITRE', 'UNIFORME', 'ALUMNO', 'CAMPANA', 'MAPA', 'TAREA', 'CALCULADORA', 'LAPIZ', 'BOLETIN'] },
  { id: 796, theme: 'Ciudad', icon: '🏙️', rows: 10, cols: 11, words: ['PUENTE', 'EDIFICIO', 'ESQUINA', 'MERCADO', 'CALLE', 'ESTACION', 'RASCACIELOS', 'SUBTERRANEO', 'TRANSITO', 'TERMINAL', 'VEREDA', 'AVENIDA', 'VECINO', 'SEMAFORO', 'MURO'] },
  { id: 797, theme: 'Transporte', icon: '🚗', rows: 10, cols: 11, words: ['CARRETA', 'CARRUAJE', 'GLOBO', 'CAMIONETA', 'TELEFERICO', 'MOTO', 'TRANVIA', 'BARCO', 'AUTO', 'VELERO', 'CAMION', 'MONOPATIN', 'TRINEO', 'HELICOPTERO', 'YATE', 'COLECTIVO'] },
  { id: 798, theme: 'Herramientas', icon: '🔧', rows: 10, cols: 11, words: ['TALADRO', 'ESCUADRA', 'CINTA', 'CINCEL', 'CEPILLO', 'SIERRA', 'NIVEL', 'MARTILLO', 'PINZA', 'LLAVE', 'TENAZA', 'SOLDADOR', 'DESTORNILLADOR', 'TORNILLO', 'ALICATE', 'BROCA'] },
  { id: 799, theme: 'Profesiones', icon: '👷', rows: 10, cols: 11, words: ['ABOGADO', 'PERIODISTA', 'ENFERMERO', 'PILOTO', 'ELECTRICISTA', 'VETERINARIO', 'PLOMERO', 'POLICIA', 'PANADERO', 'MECANICO', 'JARDINERO', 'BOMBERO', 'INGENIERO'] },
  { id: 800, theme: 'Emociones', icon: '😊', rows: 10, cols: 11, words: ['SERENIDAD', 'CULPA', 'TERNURA', 'FRUSTRACION', 'ORGULLO', 'VERGUENZA', 'ESPERANZA', 'NOSTALGIA', 'ENOJO', 'CURIOSIDAD', 'CONFIANZA', 'MIEDO', 'ANSIEDAD', 'EUFORIA'] },
  { id: 801, theme: 'Geografia', icon: '🗺️', rows: 10, cols: 11, words: ['GLACIAR', 'ALTIPLANO', 'DESIERTO', 'POLO', 'VALLE', 'CONTINENTE', 'COSTA', 'RIO', 'MESETA', 'CORDILLERA', 'PENINSULA', 'MONTANA', 'OCEANO', 'BAHIA', 'ARCHIPIELAGO', 'ISLA'] },
  { id: 802, theme: 'Insectos', icon: '🐝', rows: 10, cols: 11, words: ['HORMIGA', 'POLILLA', 'MOSQUITO', 'AVISPA', 'ESCARABAJO', 'SALTAMONTES', 'MANTIS', 'CIGARRA', 'TERMITA', 'GRILLO', 'CIEMPIES', 'LIBELULA', 'CUCARACHA', 'LUCIERNAGA'] },
  { id: 803, theme: 'Aves', icon: '🦜', rows: 10, cols: 11, words: ['HALCON', 'FAISAN', 'FLAMENCO', 'AGUILA', 'CONDOR', 'COLIBRI', 'AVESTRUZ', 'PINGUINO', 'CUERVO', 'TUCAN', 'GAVIOTA', 'CIGUENA', 'PETIRROJO', 'CACATUA', 'GORRION', 'CANARIO'] },
  { id: 804, theme: 'Fiesta', icon: '🎉', rows: 10, cols: 11, words: ['DECORACION', 'SERPENTINA', 'CONFETI', 'CANCION', 'GLOBO', 'BAILE', 'ANFITRION', 'BRINDIS2', 'TORTA', 'MUSICA', 'SORPRESA', 'CUMPLEANOS', 'BRINDIS', 'GUIRNALDA', 'VELA'] },
  { id: 805, theme: 'Matematica', icon: '🔢', rows: 10, cols: 11, words: ['FRACCION', 'PROBLEMA', 'VARIABLE', 'ANGULO', 'DECIMAL', 'RESTA', 'GEOMETRIA', 'SUMA', 'MULTIPLICACION', 'MEDIDA', 'ECUACION', 'DIVISION', 'PORCENTAJE', 'TRIANGULO'] },
  { id: 806, theme: 'Historia', icon: '🏛️', rows: 10, cols: 11, words: ['TRATADO', 'IMPERIO', 'EJERCITO', 'FORTALEZA', 'REINA', 'PIRAMIDE', 'ESPADA', 'COLONIA', 'ARQUEOLOGIA', 'REVOLUCION', 'REY', 'CONQUISTA', 'CASTILLO', 'GUERRA', 'CORONA'] },
  { id: 807, theme: 'Literatura', icon: '📖', rows: 10, cols: 11, words: ['MANUSCRITO', 'LIBRO', 'PROSA', 'AUTOR', 'POEMA', 'TRAMA', 'LEYENDA', 'NARRADOR', 'EPILOGO', 'BIBLIOTECA', 'VERSO', 'NOVELA', 'CAPITULO', 'EDITORIAL', 'CUENTO', 'PERSONAJE'] },
  { id: 808, theme: 'Astronomia', icon: '🔭', rows: 10, cols: 11, words: ['CONSTELACION', 'GRAVEDAD', 'PLANETA', 'ESTRELLA', 'CRATER', 'UNIVERSO', 'ORBITA', 'ECLIPSE', 'TELESCOPIO', 'SUPERNOVA', 'OBSERVATORIO', 'NEBULOSA', 'ASTEROIDE'] },
  { id: 809, theme: 'Salud', icon: '🏥', rows: 10, cols: 11, words: ['QUIROFANO', 'TERMOMETRO', 'RADIOGRAFIA', 'CIRUGIA', 'ANESTESIA', 'JERINGA', 'DIAGNOSTICO', 'VENDAJE', 'CAMILLA', 'TERAPIA', 'MEDICO', 'PACIENTE', 'CONSULTORIO'] },
  { id: 810, theme: 'Videojuegos', icon: '🎮', rows: 10, cols: 11, words: ['PANTALLA', 'DERROTA', 'LOGRO', 'PIXEL', 'ESTRATEGIA', 'MISION', 'INVENTARIO', 'CONSOLA', 'ARCADE', 'VICTORIA', 'PUNTAJE', 'DESAFIO', 'MULTIJUGADOR', 'MAPA', 'AVENTURA'] },
  { id: 811, theme: 'Moda', icon: '👗', rows: 10, cols: 11, words: ['ESTILO', 'PASARELA', 'CREMALLERA', 'DESFILE', 'DISENADOR', 'BOLSO', 'JOYA', 'ETIQUETA', 'ACCESORIO', 'COSTURA', 'MAQUILLAJE', 'TEJIDO', 'TALLA', 'VITRINA', 'TENDENCIA'] },
  { id: 812, theme: 'Ecologia', icon: '🌍', rows: 10, cols: 11, words: ['BIODIVERSIDAD', 'CLIMA', 'SUSTENTABLE', 'RECICLAJE', 'RENOVABLE', 'ENERGIA', 'EXTINCION', 'DEFORESTACION', 'COMPOST', 'HABITAT', 'CONTAMINACION', 'RESIDUO'] },
  { id: 813, theme: 'Postres', icon: '🍰', rows: 10, cols: 11, words: ['VAINILLA', 'TARTA', 'BROWNIE', 'DULCE', 'ALFAJOR', 'MERENGUE', 'TORTA', 'GELATINA', 'MOUSSE', 'CARAMELO', 'GALLETA', 'BOMBON', 'CHOCOLATE', 'FRUTILLA', 'TIRAMISU', 'BUDIN'] },
  { id: 814, theme: 'Halloween', icon: '🎃', rows: 10, cols: 11, words: ['BRUJA', 'FANTASMA', 'CALABAZA', 'ARANA', 'MURCIELAGO', 'MOMIA', 'DISFRAZ', 'LUNA', 'VAMPIRO', 'ZOMBI', 'CADENA', 'ESQUELETO', 'POCION', 'CEMENTERIO', 'CALDERO', 'TELARANA'] },
  { id: 815, theme: 'Dinosaurios', icon: '🦕', rows: 10, cols: 11, words: ['EXTINCION', 'TRICERATOPS', 'REPTIL', 'GARRA', 'HERBIVORO', 'JURASICO', 'VELOCIRAPTOR', 'HUEVO', 'VOLCAN', 'ESCAMA', 'ESQUELETO', 'TIRANOSAURIO', 'FOSIL', 'PANTANO'] },
  { id: 816, theme: 'Cocina', icon: '🍳', rows: 10, cols: 11, words: ['CUCHARA', 'PAN', 'HARINA', 'MANTEL', 'MERMELADA', 'ESPECIA', 'TENEDOR', 'COLADOR', 'BATIDORA', 'REPOSTERIA', 'PLATO', 'OREGANO', 'SARTEN', 'CUCHILLO', 'ESPATULA', 'AZUCAR'] },
  { id: 817, theme: 'Oficina', icon: '🗂️', rows: 10, cols: 11, words: ['MESA', 'FOTOCOPIA', 'IMPRESORA', 'TIJERA', 'REUNION', 'CINTA', 'PRESUPUESTO', 'TECLADO', 'GRAPAS', 'FACTURA', 'CALENDARIO', 'MOUSE', 'PIZARRA', 'PAPEL', 'ASCENSOR', 'JEFE'] },
  { id: 818, theme: 'Espacio', icon: '🚀', rows: 11, cols: 11, words: ['VIA', 'NEBULOSA', 'MODULO', 'COMETA', 'ASTEROIDE', 'GALAXIA', 'SATELITE', 'METEORITO', 'URANO', 'TELESCOPIO', 'ASTRONAUTA', 'UNIVERSO', 'PLANETA', 'CONSTELACION', 'JUPITER', 'ORBITA'] },
  { id: 819, theme: 'Musica', icon: '🎵', rows: 11, cols: 11, words: ['TROMPETA', 'ESCENARIO', 'AMPLIFICADOR', 'ACUSTICA', 'MICROFONO', 'ORQUESTA', 'FESTIVAL', 'PIANO', 'CLARINETE', 'CANTO', 'BANDA', 'SINFONIA', 'CANCION', 'VIOLIN', 'PARTITURA', 'LETRA'] },
  { id: 820, theme: 'Cine y Arte', icon: '🎬', rows: 11, cols: 11, words: ['SUBTITULO', 'TALLER', 'GALERIA', 'LIENZO', 'PREMIERE', 'PROTAGONISTA', 'DIRECTOR', 'PALETA', 'PINTURA', 'MAQUILLAJE', 'PANTALLA', 'REPARTO', 'ILUMINACION', 'VESTUARIO', 'MONTAJE'] },
  { id: 821, theme: 'Tecnologia', icon: '💻', rows: 11, cols: 11, words: ['TECLADO', 'ANTIVIRUS', 'ACTUALIZACION', 'ARCHIVO', 'APLICACION', 'PROCESADOR', 'CONTRASENA', 'DATOS', 'CHIP', 'PLATAFORMA', 'VIRUS', 'DRON', 'PANTALLA', 'ALGORITMO', 'RED', 'MONITOR'] },
  { id: 822, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 11, words: ['FAROL', 'SEMAFORO', 'VECINO', 'ALCALDIA', 'PARQUE', 'ESQUINA', 'TRANSITO', 'ESTACIONAMIENTO', 'CALLE', 'VEREDA', 'SUBTERRANEO', 'MURO', 'CIUDADANO', 'BARRIO', 'TERMINAL', 'MUNICIPIO'] },
  { id: 823, theme: 'Profesiones', icon: '👷', rows: 11, cols: 11, words: ['MECANICO', 'PILOTO', 'ABOGADO', 'MEDICO', 'ENFERMERO', 'BOMBERO', 'PSICOLOGO', 'PANADERO', 'CONTADOR', 'COCINERO', 'PLOMERO', 'VETERINARIO', 'CARPINTERO', 'POLICIA', 'PERIODISTA'] },
  { id: 824, theme: 'Emociones', icon: '😊', rows: 11, cols: 11, words: ['SERENIDAD', 'EUFORIA', 'ESPERANZA', 'ENVIDIA', 'TERNURA', 'MIEDO', 'NOSTALGIA', 'GRATITUD', 'CULPA', 'CONFIANZA', 'ENTUSIASMO', 'VERGUENZA', 'ALEGRIA', 'CALMA', 'ORGULLO', 'SORPRESA'] },
  { id: 825, theme: 'Geografia', icon: '🗺️', rows: 11, cols: 11, words: ['OCEANO', 'VALLE', 'ESTRECHO', 'DESIERTO', 'ALTIPLANO', 'ARCHIPIELAGO', 'ECUADOR', 'CONTINENTE', 'MESETA', 'PENINSULA', 'LLANURA', 'MONTANA', 'GLACIAR', 'CORDILLERA', 'DELTA', 'BAHIA'] },
  { id: 826, theme: 'Insectos', icon: '🐝', rows: 11, cols: 11, words: ['HORMIGA', 'AVISPA', 'PULGON', 'GRILLO', 'LUCIERNAGA', 'POLILLA', 'CIEMPIES', 'ABEJA', 'SALTAMONTES', 'CUCARACHA', 'CIGARRA', 'LIBELULA', 'ESCARABAJO', 'TERMITA', 'MANTIS', 'MOSQUITO'] },
  { id: 827, theme: 'Fiesta', icon: '🎉', rows: 11, cols: 11, words: ['VELA', 'BANQUETE', 'INVITADO', 'GUIRNALDA', 'SORPRESA', 'TORTA', 'CANCION', 'ANFITRION', 'SERPENTINA', 'BRINDIS', 'BRINDIS2', 'CUMPLEANOS', 'DECORACION', 'REGALO', 'BAILE', 'DISFRAZ'] },
  { id: 828, theme: 'Matematica', icon: '🔢', rows: 11, cols: 11, words: ['GRAFICO', 'RESTA', 'GEOMETRIA', 'VARIABLE', 'SUMA', 'ANGULO', 'ECUACION', 'FRACCION', 'MEDIDA', 'CIRCULO', 'VOLUMEN', 'FORMULA', 'CUADRADO', 'MULTIPLICACION', 'PERIMETRO', 'DIVISION'] },
  { id: 829, theme: 'Historia', icon: '🏛️', rows: 11, cols: 11, words: ['IMPERIO', 'ESPADA', 'EJERCITO', 'CIVILIZACION', 'MONUMENTO', 'CASTILLO', 'REINA', 'TRONO', 'BATALLA', 'CORONA', 'DINASTIA', 'REVOLUCION', 'GUERRA', 'PIRAMIDE', 'COLONIA', 'FORTALEZA'] },
  { id: 830, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 11, words: ['ECLIPSE', 'CRATER', 'CONSTELACION', 'GRAVEDAD', 'NEBULOSA', 'ASTEROIDE', 'UNIVERSO', 'COMETA', 'SATELITE', 'GALAXIA', 'TRASLACION', 'PLANETA', 'ESTRELLA', 'METEORO', 'TELESCOPIO'] },
  { id: 831, theme: 'Salud', icon: '🏥', rows: 11, cols: 11, words: ['CONSULTORIO', 'PASTILLA', 'RECETA', 'JERINGA', 'TERAPIA', 'QUIROFANO', 'PACIENTE', 'ENFERMERA', 'VENDAJE', 'ANESTESIA', 'CAMILLA', 'DIAGNOSTICO', 'ANALISIS', 'HOSPITAL', 'MEDICO'] },
  { id: 832, theme: 'Videojuegos', icon: '🎮', rows: 11, cols: 11, words: ['ESTRATEGIA', 'JOYSTICK', 'DESAFIO', 'ARCADE', 'MANDO', 'CONSOLA', 'PUNTAJE', 'MULTIJUGADOR', 'AVENTURA', 'PANTALLA', 'PERSONAJE', 'INVENTARIO', 'MAPA', 'VICTORIA', 'DERROTA', 'NIVEL'] },
  { id: 833, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 11, words: ['HABITAT', 'RECICLAJE', 'AMBIENTE', 'CLIMA', 'DEFORESTACION', 'BIODIVERSIDAD', 'SUSTENTABLE', 'HUELLA', 'COMPOST', 'CONSERVACION', 'ENERGIA', 'EMISION', 'RESIDUO', 'EXTINCION'] },
  { id: 834, theme: 'Oficina', icon: '🗂️', rows: 11, cols: 11, words: ['INFORME', 'PRESUPUESTO', 'BOLIGRAFO', 'MARCADOR', 'AGENDA', 'CARPETA', 'ARCHIVO', 'PIZARRA', 'CLIENTE', 'CALENDARIO', 'IMPRESORA', 'TECLADO', 'ESCRITORIO', 'MESA', 'EMAIL', 'FACTURA'] },
  { id: 835, theme: 'Espacio', icon: '🚀', rows: 11, cols: 11, words: ['SUPERNOVA', 'ASTEROIDE', 'NAVE', 'COHETE', 'NEBULOSA', 'METEORITO', 'CONSTELACION', 'LUZ', 'PLANETA', 'UNIVERSO', 'MERCURIO', 'MARTE', 'ESTRELLA', 'SATELITE', 'TELESCOPIO', 'AGUJERO'] },
  { id: 836, theme: 'Musica', icon: '🎵', rows: 11, cols: 11, words: ['TAMBOR', 'BATERIA', 'MICROFONO', 'SINFONIA', 'ORQUESTA', 'ESCENARIO', 'CORO', 'OPERA', 'AMPLIFICADOR', 'TROMPETA', 'ACORDE', 'PARTITURA', 'GUITARRA', 'FESTIVAL', 'RITMO', 'CONCIERTO'] },
  { id: 837, theme: 'Cine y Arte', icon: '🎬', rows: 11, cols: 11, words: ['ACTRIZ', 'BOCETO', 'TRAMA', 'RETRATO', 'MONTAJE', 'ESTRENO', 'CAMARA', 'ESCULTURA', 'PROTAGONISTA', 'VESTUARIO', 'DECORADO', 'DIRECTOR', 'SUBTITULO', 'GALERIA', 'MAQUILLAJE', 'MUSEO'] },
  { id: 838, theme: 'Tecnologia', icon: '💻', rows: 11, cols: 11, words: ['BATERIA', 'DRON', 'PROCESADOR', 'RED', 'NAVEGADOR', 'INTERNET', 'CODIGO', 'PIXEL', 'PANTALLA', 'TECLADO', 'MONITOR', 'APLICACION', 'DESCARGA', 'IMPRESORA', 'PLATAFORMA', 'CONTRASENA'] },
  { id: 839, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 11, words: ['PLAZA', 'PARQUE', 'EDIFICIO', 'FAROL', 'SEMAFORO', 'VECINO', 'ESTACIONAMIENTO', 'SUBTERRANEO', 'PUENTE', 'CALLE', 'RASCACIELOS', 'ESTACION', 'TERMINAL', 'MURO', 'MERCADO', 'TRANSITO'] },
  { id: 840, theme: 'Profesiones', icon: '👷', rows: 11, cols: 11, words: ['ARQUITECTO', 'MECANICO', 'JARDINERO', 'ABOGADO', 'MAESTRO', 'INGENIERO', 'CARPINTERO', 'PINTOR', 'PANADERO', 'COCINERO', 'BOMBERO', 'ELECTRICISTA', 'CONTADOR', 'MEDICO', 'PILOTO'] },
  { id: 841, theme: 'Emociones', icon: '😊', rows: 11, cols: 11, words: ['MIEDO', 'ESPERANZA', 'ORGULLO', 'CULPA', 'CALMA', 'ANSIEDAD', 'ENOJO', 'TERNURA', 'ALEGRIA', 'SORPRESA', 'FRUSTRACION', 'CURIOSIDAD', 'ENVIDIA', 'CONFIANZA', 'GRATITUD', 'ENTUSIASMO'] },
  { id: 842, theme: 'Geografia', icon: '🗺️', rows: 11, cols: 11, words: ['LLANURA', 'ALTIPLANO', 'OCEANO', 'ECUADOR', 'ISLA', 'MONTANA', 'CORDILLERA', 'MESETA', 'CONTINENTE', 'COSTA', 'PENINSULA', 'ESTRECHO', 'GLACIAR', 'ARCHIPIELAGO', 'VOLCAN', 'DESIERTO'] },
  { id: 843, theme: 'Insectos', icon: '🐝', rows: 11, cols: 11, words: ['SALTAMONTES', 'ABEJA', 'MARIPOSA', 'CIEMPIES', 'LUCIERNAGA', 'MANTIS', 'GRILLO', 'PULGON', 'LIBELULA', 'HORMIGA', 'POLILLA', 'MOSQUITO', 'ORUGA', 'TERMITA', 'ESCARABAJO', 'CUCARACHA'] },
  { id: 844, theme: 'Fiesta', icon: '🎉', rows: 11, cols: 11, words: ['DISFRAZ', 'TORTA', 'GLOBO', 'SORPRESA', 'MUSICA', 'CUMPLEANOS', 'DECORACION', 'INVITADO', 'BANQUETE', 'CANCION', 'SERPENTINA', 'CONFETI', 'BRINDIS', 'BRINDIS2', 'PINATA', 'ANFITRION'] },
  { id: 845, theme: 'Matematica', icon: '🔢', rows: 11, cols: 11, words: ['NUMERO', 'PORCENTAJE', 'MULTIPLICACION', 'VARIABLE', 'DIVISION', 'FRACCION', 'CALCULO', 'GRAFICO', 'MEDIDA', 'CUADRADO', 'CIRCULO', 'ANGULO', 'FORMULA', 'ECUACION', 'VOLUMEN', 'SUMA'] },
  { id: 846, theme: 'Historia', icon: '🏛️', rows: 11, cols: 11, words: ['ARQUEOLOGIA', 'MONUMENTO', 'ESPADA', 'CONQUISTA', 'FORTALEZA', 'REINA', 'BATALLA', 'EJERCITO', 'REVOLUCION', 'CORONA', 'CIVILIZACION', 'DINASTIA', 'REY', 'GUERRA', 'TRONO', 'COLONIA'] },
  { id: 847, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 11, words: ['CONSTELACION', 'ORBITA', 'ECLIPSE', 'SATELITE', 'GALAXIA', 'OBSERVATORIO', 'COMETA', 'PLANETA', 'METEORO', 'SUPERNOVA', 'ESTRELLA', 'ROTACION', 'GRAVEDAD', 'CRATER', 'TRASLACION'] },
  { id: 848, theme: 'Salud', icon: '🏥', rows: 11, cols: 11, words: ['ENFERMERA', 'DIAGNOSTICO', 'CAMILLA', 'QUIROFANO', 'CONSULTORIO', 'PACIENTE', 'TERAPIA', 'MEDICO', 'VACUNA', 'VENDAJE', 'HOSPITAL', 'JERINGA', 'PASTILLA', 'RECETA', 'RADIOGRAFIA'] },
  { id: 849, theme: 'Videojuegos', icon: '🎮', rows: 11, cols: 11, words: ['JOYSTICK', 'INVENTARIO', 'DESAFIO', 'PANTALLA', 'AVENTURA', 'VICTORIA', 'CONSOLA', 'PIXEL', 'LOGRO', 'ARCADE', 'ESTRATEGIA', 'PERSONAJE', 'MISION', 'NIVEL', 'MULTIJUGADOR', 'PUNTAJE'] },
  { id: 850, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 11, words: ['EXTINCION', 'SUSTENTABLE', 'HABITAT', 'EMISION', 'HUELLA', 'ESPECIE', 'RECICLAJE', 'CLIMA', 'ECOSISTEMA', 'RENOVABLE', 'ENERGIA', 'COMPOST', 'AMBIENTE', 'RESIDUO', 'CONSERVACION'] },
  { id: 851, theme: 'Oficina', icon: '🗂️', rows: 11, cols: 11, words: ['PIZARRA', 'MARCADOR', 'CONTRATO', 'JEFE', 'REUNION', 'OFICINISTA', 'FOTOCOPIA', 'CARTELERA', 'FOLIO', 'SILLA', 'PRESUPUESTO', 'BOLIGRAFO', 'IMPRESORA', 'CLIENTE', 'PROYECTO', 'SELLO'] },
  { id: 852, theme: 'Espacio', icon: '🚀', rows: 11, cols: 11, words: ['TELESCOPIO', 'CRATER', 'MODULO', 'UNIVERSO', 'CONSTELACION', 'ROBOT', 'ASTRONAUTA', 'ESTRELLA', 'ORBITA', 'ASTEROIDE', 'SATURNO', 'NAVE', 'PLANETA', 'GALAXIA', 'METEORITO', 'JUPITER'] },
  { id: 853, theme: 'Musica', icon: '🎵', rows: 11, cols: 11, words: ['LETRA', 'AFINACION', 'ACUSTICA', 'ESCENARIO', 'COMPAS', 'RITMO', 'AMPLIFICADOR', 'BATERIA', 'SINFONIA', 'CONCIERTO', 'TAMBOR', 'OPERA', 'PARTITURA', 'GUITARRA', 'MICROFONO', 'VIOLIN'] },
  { id: 854, theme: 'Cine y Arte', icon: '🎬', rows: 11, cols: 11, words: ['REPARTO', 'PALETA', 'MAQUILLAJE', 'GALERIA', 'SUBTITULO', 'DIRECTOR', 'DECORADO', 'ACTOR', 'TALLER', 'PROTAGONISTA', 'RETRATO', 'ESCENA', 'PANTALLA', 'MONTAJE', 'PREMIERE', 'PINTURA'] },
  { id: 855, theme: 'Tecnologia', icon: '💻', rows: 11, cols: 11, words: ['ACTUALIZACION', 'VIRUS', 'USUARIO', 'CODIGO', 'TECLADO', 'SOFTWARE', 'CONTRASENA', 'PLATAFORMA', 'APLICACION', 'PANTALLA', 'ALGORITMO', 'MEMORIA', 'CABLE', 'ARCHIVO', 'ANTIVIRUS'] },
  { id: 856, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 11, words: ['TERMINAL', 'PARQUE', 'ALCALDIA', 'SEMAFORO', 'PLAZA', 'EDIFICIO', 'SUBTERRANEO', 'RASCACIELOS', 'BARRIO', 'MUNICIPIO', 'ESTACION', 'CALLE', 'ESTACIONAMIENTO', 'VEREDA', 'MERCADO'] },
  { id: 857, theme: 'Profesiones', icon: '👷', rows: 11, cols: 11, words: ['BOMBERO', 'PSICOLOGO', 'DENTISTA', 'PLOMERO', 'CONTADOR', 'ABOGADO', 'PERIODISTA', 'POLICIA', 'COCINERO', 'ENFERMERO', 'INGENIERO', 'MEDICO', 'PILOTO', 'ELECTRICISTA', 'PANADERO'] },
  { id: 858, theme: 'Emociones', icon: '😊', rows: 11, cols: 11, words: ['SERENIDAD', 'CULPA', 'ESPERANZA', 'FRUSTRACION', 'ENOJO', 'CURIOSIDAD', 'GRATITUD', 'SORPRESA', 'CONFIANZA', 'ORGULLO', 'NOSTALGIA', 'VERGUENZA', 'ANSIEDAD', 'EUFORIA', 'TERNURA'] },
  { id: 859, theme: 'Geografia', icon: '🗺️', rows: 11, cols: 11, words: ['PENINSULA', 'MONTANA', 'DESIERTO', 'VOLCAN', 'ARCHIPIELAGO', 'LLANURA', 'MESETA', 'ECUADOR', 'CORDILLERA', 'DELTA', 'ALTIPLANO', 'COSTA', 'ESTRECHO', 'CONTINENTE', 'VALLE', 'GLACIAR'] },
  { id: 860, theme: 'Insectos', icon: '🐝', rows: 11, cols: 11, words: ['PULGON', 'AVISPA', 'CIEMPIES', 'ORUGA', 'GRILLO', 'ESCARABAJO', 'MARIPOSA', 'TERMITA', 'CUCARACHA', 'SALTAMONTES', 'ABEJA', 'CIGARRA', 'LUCIERNAGA', 'HORMIGA', 'LIBELULA', 'MOSQUITO'] },
  { id: 861, theme: 'Fiesta', icon: '🎉', rows: 11, cols: 11, words: ['VELA', 'CUMPLEANOS', 'MUSICA', 'CANCION', 'TORTA', 'SERPENTINA', 'CONFETI', 'GUIRNALDA', 'BRINDIS', 'REGALO', 'INVITADO', 'SORPRESA', 'DECORACION', 'BANQUETE', 'DISFRAZ', 'ANFITRION'] },
  { id: 862, theme: 'Matematica', icon: '🔢', rows: 11, cols: 11, words: ['FRACCION', 'MEDIDA', 'GEOMETRIA', 'ECUACION', 'FORMULA', 'PERIMETRO', 'TRIANGULO', 'RESTA', 'CUADRADO', 'GRAFICO', 'MULTIPLICACION', 'PORCENTAJE', 'DIVISION', 'ANGULO', 'CALCULO'] },
  { id: 863, theme: 'Historia', icon: '🏛️', rows: 11, cols: 11, words: ['GUERRA', 'BATALLA', 'CASTILLO', 'DINASTIA', 'EJERCITO', 'TRONO', 'ARQUEOLOGIA', 'CORONA', 'FORTALEZA', 'REINA', 'REVOLUCION', 'TRATADO', 'ESPADA', 'MONUMENTO', 'CONQUISTA', 'IMPERIO'] },
  { id: 864, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 11, words: ['PLANETA', 'METEORO', 'OBSERVATORIO', 'NEBULOSA', 'GRAVEDAD', 'UNIVERSO', 'ROTACION', 'TELESCOPIO', 'COMETA', 'ESTRELLA', 'GALAXIA', 'ORBITA', 'CONSTELACION', 'CRATER', 'SATELITE'] },
  { id: 865, theme: 'Salud', icon: '🏥', rows: 11, cols: 11, words: ['QUIROFANO', 'DIAGNOSTICO', 'PASTILLA', 'VACUNA', 'HOSPITAL', 'RADIOGRAFIA', 'CAMILLA', 'TERAPIA', 'JERINGA', 'ANALISIS', 'RECETA', 'PACIENTE', 'MEDICO', 'ANESTESIA', 'TERMOMETRO'] },
  { id: 866, theme: 'Videojuegos', icon: '🎮', rows: 11, cols: 11, words: ['ESTRATEGIA', 'NIVEL', 'LOGRO', 'CONSOLA', 'PERSONAJE', 'MISION', 'JOYSTICK', 'DERROTA', 'VICTORIA', 'MULTIJUGADOR', 'ARCADE', 'PUNTAJE', 'MANDO', 'INVENTARIO', 'PANTALLA', 'AVENTURA'] },
  { id: 867, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 11, words: ['CLIMA', 'RENOVABLE', 'CONSERVACION', 'CONTAMINACION', 'ESPECIE', 'BIODIVERSIDAD', 'ENERGIA', 'EXTINCION', 'HABITAT', 'DEFORESTACION', 'ECOSISTEMA', 'EMISION', 'RECICLAJE'] },
  { id: 868, theme: 'Oficina', icon: '🗂️', rows: 11, cols: 11, words: ['CONTRATO', 'LAPIZ', 'ASCENSOR', 'CALENDARIO', 'BOLIGRAFO', 'MARCADOR', 'JEFE', 'CARTELERA', 'SILLA', 'IMPRESORA', 'CARPETA', 'PRESUPUESTO', 'FACTURA', 'ESCRITORIO', 'CLIENTE', 'MESA'] },
  { id: 869, theme: 'Espacio', icon: '🚀', rows: 11, cols: 11, words: ['METEORITO', 'SATELITE', 'ROBOT', 'ECLIPSE', 'MODULO', 'TELESCOPIO', 'GRAVEDAD', 'COHETE', 'ASTEROIDE', 'UNIVERSO', 'ESTRELLA', 'VIA', 'NEBULOSA', 'PLANETA', 'JUPITER', 'CONSTELACION'] },
  { id: 870, theme: 'Cine y Arte', icon: '🎬', rows: 11, cols: 11, words: ['PROTAGONISTA', 'MONTAJE', 'PREMIERE', 'REPARTO', 'DECORADO', 'RETRATO', 'ESTRENO', 'TALLER', 'ILUMINACION', 'ACTRIZ', 'CAMARA', 'PALETA', 'SUBTITULO', 'CINE', 'ESCULTURA', 'DIRECTOR'] },
  { id: 871, theme: 'Tecnologia', icon: '💻', rows: 11, cols: 11, words: ['NAVEGADOR', 'DRON', 'BATERIA', 'PROCESADOR', 'ROBOT', 'VIRUS', 'ALGORITMO', 'DATOS', 'SENSOR', 'ANTIVIRUS', 'PLATAFORMA', 'APLICACION', 'SERVIDOR', 'MONITOR', 'IMPRESORA', 'SOFTWARE'] },
  { id: 872, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 11, words: ['ESTACIONAMIENTO', 'SUBTERRANEO', 'PUENTE', 'RASCACIELOS', 'ALCALDIA', 'MURO', 'FAROL', 'PLAZA', 'TERMINAL', 'SEMAFORO', 'EDIFICIO', 'MERCADO', 'PARQUE', 'BARRIO', 'AVENIDA', 'VEREDA'] },
  { id: 873, theme: 'Profesiones', icon: '👷', rows: 11, cols: 11, words: ['JARDINERO', 'MECANICO', 'MEDICO', 'ABOGADO', 'POLICIA', 'PANADERO', 'MAESTRO', 'INGENIERO', 'DENTISTA', 'BOMBERO', 'ENFERMERO', 'CARPINTERO', 'PSICOLOGO', 'VETERINARIO', 'PILOTO'] },
  { id: 874, theme: 'Emociones', icon: '😊', rows: 11, cols: 11, words: ['VERGUENZA', 'EUFORIA', 'ESPERANZA', 'FRUSTRACION', 'ENVIDIA', 'ALEGRIA', 'NOSTALGIA', 'SERENIDAD', 'ORGULLO', 'TRISTEZA', 'GRATITUD', 'SORPRESA', 'MIEDO', 'ANSIEDAD', 'CONFIANZA'] },
  { id: 875, theme: 'Geografia', icon: '🗺️', rows: 11, cols: 11, words: ['BAHIA', 'ALTIPLANO', 'ESTRECHO', 'DESIERTO', 'LLANURA', 'ECUADOR', 'ARCHIPIELAGO', 'OCEANO', 'CORDILLERA', 'MESETA', 'COSTA', 'MONTANA', 'CONTINENTE', 'GLACIAR', 'PENINSULA', 'VALLE'] },
  { id: 876, theme: 'Insectos', icon: '🐝', rows: 11, cols: 11, words: ['LUCIERNAGA', 'MOSQUITO', 'CUCARACHA', 'MARIPOSA', 'AVISPA', 'LIBELULA', 'CIEMPIES', 'HORMIGA', 'SALTAMONTES', 'PULGON', 'MANTIS', 'ORUGA', 'MOSCA', 'ESCARABAJO', 'POLILLA', 'TERMITA'] },
  { id: 877, theme: 'Fiesta', icon: '🎉', rows: 11, cols: 11, words: ['BRINDIS2', 'GUIRNALDA', 'INVITADO', 'GLOBO', 'REGALO', 'MUSICA', 'PINATA', 'TORTA', 'CUMPLEANOS', 'SERPENTINA', 'DECORACION', 'ANFITRION', 'CONFETI', 'CANCION', 'BRINDIS', 'BANQUETE'] },
  { id: 878, theme: 'Matematica', icon: '🔢', rows: 11, cols: 11, words: ['PERIMETRO', 'RESTA', 'GRAFICO', 'VARIABLE', 'PORCENTAJE', 'MULTIPLICACION', 'VOLUMEN', 'TRIANGULO', 'FORMULA', 'CUADRADO', 'SUMA', 'CALCULO', 'ANGULO', 'DECIMAL', 'NUMERO', 'CIRCULO'] },
  { id: 879, theme: 'Historia', icon: '🏛️', rows: 11, cols: 11, words: ['REY', 'TRATADO', 'IMPERIO', 'PIRAMIDE', 'CASTILLO', 'CONQUISTA', 'ESPADA', 'COLONIA', 'CIVILIZACION', 'REINA', 'GUERRA', 'ARQUEOLOGIA', 'MONUMENTO', 'DINASTIA', 'EJERCITO', 'BATALLA'] },
  { id: 880, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 11, words: ['TELESCOPIO', 'ASTEROIDE', 'COMETA', 'ROTACION', 'OBSERVATORIO', 'ESTRELLA', 'SATELITE', 'NEBULOSA', 'PLANETA', 'GRAVEDAD', 'GALAXIA', 'CRATER', 'UNIVERSO', 'ECLIPSE', 'SUPERNOVA'] },
  { id: 881, theme: 'Salud', icon: '🏥', rows: 11, cols: 11, words: ['ANESTESIA', 'CIRUGIA', 'ENFERMERA', 'VACUNA', 'MEDICO', 'PACIENTE', 'CONSULTORIO', 'JERINGA', 'PASTILLA', 'QUIROFANO', 'VENDAJE', 'DIAGNOSTICO', 'CAMILLA', 'ANALISIS', 'HOSPITAL'] },
  { id: 882, theme: 'Videojuegos', icon: '🎮', rows: 11, cols: 11, words: ['DESAFIO', 'ARCADE', 'MULTIJUGADOR', 'CONSOLA', 'INVENTARIO', 'MANDO', 'DERROTA', 'PIXEL', 'PERSONAJE', 'JOYSTICK', 'LOGRO', 'VICTORIA', 'AVENTURA', 'PANTALLA', 'MISION', 'ESTRATEGIA'] },
  { id: 883, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 11, words: ['CONTAMINACION', 'ESPECIE', 'BIODIVERSIDAD', 'CONSERVACION', 'SUSTENTABLE', 'HABITAT', 'CLIMA', 'EXTINCION', 'RENOVABLE', 'COMPOST', 'HUELLA', 'RESIDUO', 'EMISION', 'AMBIENTE'] },
  { id: 884, theme: 'Oficina', icon: '🗂️', rows: 11, cols: 11, words: ['LAPIZ', 'PAPEL', 'PRESUPUESTO', 'IMPRESORA', 'CLIP', 'CLIENTE', 'REUNION', 'ASCENSOR', 'CARTELERA', 'CALENDARIO', 'BOLIGRAFO', 'FACTURA', 'INFORME', 'CINTA', 'ESCRITORIO', 'MARCADOR'] },
  { id: 885, theme: 'Espacio', icon: '🚀', rows: 11, cols: 11, words: ['TELESCOPIO', 'CONSTELACION', 'ORBITA', 'UNIVERSO', 'MARTE', 'MERCURIO', 'ASTRONAUTA', 'PLANETA', 'ASTEROIDE', 'AGUJERO', 'NEPTUNO', 'ECLIPSE', 'LUZ', 'GRAVEDAD', 'ESTRELLA', 'MODULO'] },
  { id: 886, theme: 'Musica', icon: '🎵', rows: 11, cols: 11, words: ['ESCENARIO', 'LETRA', 'FESTIVAL', 'DISCO', 'CLARINETE', 'SAXOFON', 'MICROFONO', 'AMPLIFICADOR', 'ORQUESTA', 'BANDA', 'CANCION', 'BALADA', 'BATERIA', 'SINFONIA', 'ACUSTICA', 'GUITARRA'] },
  { id: 887, theme: 'Cine y Arte', icon: '🎬', rows: 11, cols: 11, words: ['DECORADO', 'MONTAJE', 'ESCULTURA', 'ACTOR', 'EFECTO', 'PROTAGONISTA', 'PANTALLA', 'TALLER', 'PREMIERE', 'DIRECTOR', 'PINTURA', 'RETRATO', 'ESTRENO', 'MAQUILLAJE', 'ESCENA', 'REPARTO'] },
  { id: 888, theme: 'Tecnologia', icon: '💻', rows: 11, cols: 11, words: ['MEMORIA', 'PROCESADOR', 'DATOS', 'SOFTWARE', 'INTERNET', 'PIXEL', 'CONTRASENA', 'ALGORITMO', 'NUBE', 'ACTUALIZACION', 'CHIP', 'SENSOR', 'NAVEGADOR', 'TECLADO', 'ANTIVIRUS', 'BATERIA'] },
  { id: 889, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 11, words: ['MURO', 'CALLE', 'ALCALDIA', 'ESQUINA', 'AVENIDA', 'PARQUE', 'TERMINAL', 'ESTACION', 'EDIFICIO', 'PUENTE', 'SEMAFORO', 'ESTACIONAMIENTO', 'FAROL', 'MUNICIPIO', 'VEREDA', 'RASCACIELOS'] },
  { id: 890, theme: 'Profesiones', icon: '👷', rows: 11, cols: 11, words: ['ENFERMERO', 'VETERINARIO', 'PINTOR', 'INGENIERO', 'MECANICO', 'ARQUITECTO', 'COCINERO', 'POLICIA', 'MEDICO', 'PLOMERO', 'PSICOLOGO', 'DENTISTA', 'JARDINERO', 'MAESTRO', 'ABOGADO'] },
  { id: 891, theme: 'Emociones', icon: '😊', rows: 11, cols: 11, words: ['EUFORIA', 'ESPERANZA', 'GRATITUD', 'TRISTEZA', 'NOSTALGIA', 'CURIOSIDAD', 'SERENIDAD', 'TERNURA', 'CONFIANZA', 'ENTUSIASMO', 'ORGULLO', 'CALMA', 'ALEGRIA', 'ANSIEDAD', 'SORPRESA'] },
  { id: 892, theme: 'Insectos', icon: '🐝', rows: 11, cols: 11, words: ['TERMITA', 'PULGON', 'LIBELULA', 'CIEMPIES', 'CUCARACHA', 'MARIPOSA', 'POLILLA', 'AVISPA', 'CIGARRA', 'LUCIERNAGA', 'ORUGA', 'MOSQUITO', 'MANTIS', 'ESCARABAJO', 'SALTAMONTES', 'ABEJA'] },
  { id: 893, theme: 'Fiesta', icon: '🎉', rows: 11, cols: 11, words: ['MUSICA', 'BRINDIS', 'DISFRAZ', 'ANFITRION', 'CONFETI', 'BAILE', 'GUIRNALDA', 'VELA', 'REGALO', 'DECORACION', 'CUMPLEANOS', 'BANQUETE', 'SERPENTINA', 'SORPRESA', 'CANCION', 'INVITADO'] },
  { id: 894, theme: 'Matematica', icon: '🔢', rows: 11, cols: 11, words: ['NUMERO', 'GRAFICO', 'VOLUMEN', 'FORMULA', 'TRIANGULO', 'CUADRADO', 'DIVISION', 'DECIMAL', 'PROBLEMA', 'ECUACION', 'VARIABLE', 'GEOMETRIA', 'MEDIDA', 'MULTIPLICACION', 'SUMA', 'RESTA'] },
  { id: 895, theme: 'Historia', icon: '🏛️', rows: 11, cols: 11, words: ['ESPADA', 'PIRAMIDE', 'GUERRA', 'IMPERIO', 'TRATADO', 'COLONIA', 'CASTILLO', 'TRONO', 'ARQUEOLOGIA', 'CIVILIZACION', 'REINA', 'EJERCITO', 'BATALLA', 'CONQUISTA', 'FORTALEZA', 'CORONA'] },
  { id: 896, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 11, words: ['ECLIPSE', 'TELESCOPIO', 'CRATER', 'GALAXIA', 'UNIVERSO', 'ROTACION', 'ESTRELLA', 'METEORO', 'CONSTELACION', 'PLANETA', 'GRAVEDAD', 'TRASLACION', 'NEBULOSA', 'COMETA', 'ASTEROIDE'] },
  { id: 897, theme: 'Salud', icon: '🏥', rows: 11, cols: 11, words: ['VENDAJE', 'CAMILLA', 'JERINGA', 'TERAPIA', 'ANALISIS', 'MEDICO', 'CONSULTORIO', 'RADIOGRAFIA', 'HOSPITAL', 'QUIROFANO', 'RECETA', 'ANESTESIA', 'PACIENTE', 'ENFERMERA', 'PASTILLA'] },
  { id: 898, theme: 'Videojuegos', icon: '🎮', rows: 11, cols: 11, words: ['MANDO', 'PANTALLA', 'PUNTAJE', 'MULTIJUGADOR', 'LOGRO', 'ESTRATEGIA', 'DESAFIO', 'PERSONAJE', 'JOYSTICK', 'DERROTA', 'VICTORIA', 'NIVEL', 'AVENTURA', 'ARCADE', 'MISION', 'INVENTARIO'] },
  { id: 899, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 11, words: ['CONSERVACION', 'RESIDUO', 'EMISION', 'RECICLAJE', 'DEFORESTACION', 'BIODIVERSIDAD', 'CONTAMINACION', 'COMPOST', 'ENERGIA', 'ESPECIE', 'EXTINCION', 'RENOVABLE', 'AMBIENTE'] },
  { id: 900, theme: 'Oficina', icon: '🗂️', rows: 11, cols: 11, words: ['INFORME', 'ASCENSOR', 'FOLIO', 'LAPIZ', 'TECLADO', 'CLIENTE', 'BOLIGRAFO', 'IMPRESORA', 'AGENDA', 'EMAIL', 'CALENDARIO', 'MOUSE', 'FOTOCOPIA', 'PRESUPUESTO', 'MARCADOR', 'OFICINISTA'] },
  { id: 901, theme: 'Espacio', icon: '🚀', rows: 11, cols: 11, words: ['ASTRONAUTA', 'ROBOT', 'GALAXIA', 'ECLIPSE', 'SATELITE', 'ORBITA', 'TELESCOPIO', 'CONSTELACION', 'URANO', 'VENUS', 'COMETA', 'MERCURIO', 'ASTEROIDE', 'ASTRO', 'METEORITO', 'SUPERNOVA'] },
  { id: 902, theme: 'Musica', icon: '🎵', rows: 11, cols: 11, words: ['RITMO', 'CLARINETE', 'TROMPETA', 'AMPLIFICADOR', 'ORQUESTA', 'SAXOFON', 'VIOLIN', 'SINFONIA', 'ACUSTICA', 'MICROFONO', 'FESTIVAL', 'NOTA', 'BANDA', 'TAMBOR', 'CONCIERTO', 'PARTITURA'] },
  { id: 903, theme: 'Cine y Arte', icon: '🎬', rows: 11, cols: 11, words: ['ESTRENO', 'ILUMINACION', 'ACTRIZ', 'CAMARA', 'RETRATO', 'PANTALLA', 'SUBTITULO', 'ESCULTURA', 'ESCENA', 'PINTURA', 'DECORADO', 'GUION', 'MAQUILLAJE', 'PALETA', 'VESTUARIO', 'MONTAJE'] },
  { id: 904, theme: 'Tecnologia', icon: '💻', rows: 11, cols: 11, words: ['CONTRASENA', 'ACTUALIZACION', 'ALGORITMO', 'NAVEGADOR', 'PLATAFORMA', 'CABLE', 'RED', 'PROCESADOR', 'CHIP', 'SOFTWARE', 'APLICACION', 'PANTALLA', 'ROUTER', 'ANTIVIRUS', 'MONITOR'] },
  { id: 905, theme: 'Escuela', icon: '📚', rows: 11, cols: 11, words: ['LAPIZ', 'DIRECTOR', 'LIBRO', 'CUADERNO', 'PIZARRON', 'BIBLIOTECA', 'LECTURA', 'PUPITRE', 'CALCULADORA', 'MAESTRO', 'CAMPANA', 'UNIFORME', 'CARTUCHERA', 'EXAMEN', 'MOCHILA', 'DIPLOMA'] },
  { id: 906, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 11, words: ['PLAZA', 'CALLE', 'CIUDADANO', 'TRANSITO', 'TERMINAL', 'VEREDA', 'SEMAFORO', 'RASCACIELOS', 'ESTACIONAMIENTO', 'VECINO', 'PARQUE', 'SUBTERRANEO', 'ALCALDIA', 'MERCADO', 'EDIFICIO'] },
  { id: 907, theme: 'Profesiones', icon: '👷', rows: 11, cols: 11, words: ['BOMBERO', 'ABOGADO', 'MECANICO', 'JARDINERO', 'ARQUITECTO', 'INGENIERO', 'PLOMERO', 'ENFERMERO', 'CARPINTERO', 'PSICOLOGO', 'PERIODISTA', 'PINTOR', 'ELECTRICISTA', 'DENTISTA'] },
  { id: 908, theme: 'Emociones', icon: '😊', rows: 11, cols: 11, words: ['CONFIANZA', 'EUFORIA', 'ANSIEDAD', 'MIEDO', 'CULPA', 'GRATITUD', 'ESPERANZA', 'NOSTALGIA', 'ENTUSIASMO', 'ENVIDIA', 'ENOJO', 'CALMA', 'CURIOSIDAD', 'ORGULLO', 'TRISTEZA', 'SERENIDAD'] },
  { id: 909, theme: 'Geografia', icon: '🗺️', rows: 11, cols: 11, words: ['ALTIPLANO', 'MONTANA', 'ISLA', 'CORDILLERA', 'OCEANO', 'MESETA', 'ESTRECHO', 'ARCHIPIELAGO', 'ECUADOR', 'GLACIAR', 'VOLCAN', 'CONTINENTE', 'DESIERTO', 'VALLE', 'LLANURA', 'PENINSULA'] },
  { id: 910, theme: 'Insectos', icon: '🐝', rows: 11, cols: 11, words: ['MOSCA', 'LUCIERNAGA', 'POLILLA', 'PULGON', 'CIEMPIES', 'MOSQUITO', 'CUCARACHA', 'HORMIGA', 'ABEJA', 'MARIPOSA', 'ESCARABAJO', 'LIBELULA', 'AVISPA', 'GRILLO', 'TERMITA', 'SALTAMONTES'] },
  { id: 911, theme: 'Fiesta', icon: '🎉', rows: 11, cols: 11, words: ['INVITADO', 'VELA', 'PINATA', 'REGALO', 'GUIRNALDA', 'TORTA', 'CUMPLEANOS', 'DECORACION', 'SERPENTINA', 'ANFITRION', 'CANCION', 'CONFETI', 'BRINDIS', 'BANQUETE', 'BRINDIS2', 'DISFRAZ'] },
  { id: 912, theme: 'Matematica', icon: '🔢', rows: 11, cols: 11, words: ['DECIMAL', 'SUMA', 'NUMERO', 'GEOMETRIA', 'GRAFICO', 'MEDIDA', 'CALCULO', 'VOLUMEN', 'TRIANGULO', 'DIVISION', 'ANGULO', 'FORMULA', 'MULTIPLICACION', 'PERIMETRO', 'RESTA', 'PORCENTAJE'] },
  { id: 913, theme: 'Historia', icon: '🏛️', rows: 11, cols: 11, words: ['FORTALEZA', 'MONUMENTO', 'CONQUISTA', 'CORONA', 'ESPADA', 'TRONO', 'REY', 'PIRAMIDE', 'DINASTIA', 'CIVILIZACION', 'REVOLUCION', 'IMPERIO', 'BATALLA', 'COLONIA', 'EJERCITO', 'TRATADO'] },
  { id: 914, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 11, words: ['METEORO', 'ECLIPSE', 'ESTRELLA', 'UNIVERSO', 'TELESCOPIO', 'SUPERNOVA', 'GALAXIA', 'ASTEROIDE', 'COMETA', 'OBSERVATORIO', 'GRAVEDAD', 'TRASLACION', 'ROTACION', 'CONSTELACION'] },
  { id: 915, theme: 'Salud', icon: '🏥', rows: 11, cols: 11, words: ['QUIROFANO', 'ANALISIS', 'JERINGA', 'VENDAJE', 'PACIENTE', 'CONSULTORIO', 'MEDICO', 'PASTILLA', 'DIAGNOSTICO', 'TERAPIA', 'RECETA', 'HOSPITAL', 'TERMOMETRO', 'VACUNA', 'ENFERMERA'] },
  { id: 916, theme: 'Videojuegos', icon: '🎮', rows: 11, cols: 11, words: ['AVENTURA', 'PERSONAJE', 'MULTIJUGADOR', 'PUNTAJE', 'LOGRO', 'INVENTARIO', 'PIXEL', 'ESTRATEGIA', 'NIVEL', 'JOYSTICK', 'VICTORIA', 'PANTALLA', 'MISION', 'DERROTA', 'CONSOLA', 'ARCADE'] },
  { id: 917, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 11, words: ['SUSTENTABLE', 'CONSERVACION', 'BIODIVERSIDAD', 'ENERGIA', 'RENOVABLE', 'RESIDUO', 'AMBIENTE', 'RECICLAJE', 'HUELLA', 'ECOSISTEMA', 'COMPOST', 'EXTINCION', 'DEFORESTACION'] },
  { id: 918, theme: 'Oficina', icon: '🗂️', rows: 11, cols: 11, words: ['PROYECTO', 'ARCHIVO', 'ASCENSOR', 'MARCADOR', 'CLIP', 'CALENDARIO', 'OFICINISTA', 'ESCRITORIO', 'FOTOCOPIA', 'BOLIGRAFO', 'MOUSE', 'INFORME', 'TIJERA', 'JEFE', 'PRESUPUESTO', 'CINTA'] },
  { id: 919, theme: 'Espacio', icon: '🚀', rows: 11, cols: 11, words: ['SATURNO', 'PLANETA', 'ASTRO', 'ASTEROIDE', 'ASTRONAUTA', 'SATELITE', 'MERCURIO', 'UNIVERSO', 'MODULO', 'METEORITO', 'CONSTELACION', 'MARTE', 'COHETE', 'ROBOT', 'TELESCOPIO', 'MISION'] },
  { id: 920, theme: 'Cine y Arte', icon: '🎬', rows: 11, cols: 11, words: ['CINE', 'DIRECTOR', 'ESTRENO', 'LIENZO', 'VESTUARIO', 'EFECTO', 'ESCULTURA', 'MONTAJE', 'PREMIERE', 'PROTAGONISTA', 'SUBTITULO', 'RETRATO', 'BOCETO', 'GALERIA', 'ILUMINACION', 'ACTOR'] },
  { id: 921, theme: 'Tecnologia', icon: '💻', rows: 11, cols: 11, words: ['DESCARGA', 'PANTALLA', 'PROCESADOR', 'ANTIVIRUS', 'VIRUS', 'PLATAFORMA', 'MEMORIA', 'ACTUALIZACION', 'ROUTER', 'ALGORITMO', 'PIXEL', 'SOFTWARE', 'NAVEGADOR', 'CABLE', 'ROBOT', 'NUBE'] },
  { id: 922, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 11, words: ['SEMAFORO', 'AVENIDA', 'EDIFICIO', 'VEREDA', 'ESTACION', 'FAROL', 'ESTACIONAMIENTO', 'SUBTERRANEO', 'RASCACIELOS', 'ALCALDIA', 'MUNICIPIO', 'CIUDADANO', 'PLAZA', 'CALLE', 'BARRIO'] },
  { id: 923, theme: 'Profesiones', icon: '👷', rows: 11, cols: 11, words: ['DENTISTA', 'ELECTRICISTA', 'POLICIA', 'VETERINARIO', 'BOMBERO', 'CARPINTERO', 'MEDICO', 'MECANICO', 'ARQUITECTO', 'PANADERO', 'PERIODISTA', 'JARDINERO', 'MAESTRO', 'COCINERO'] },
  { id: 924, theme: 'Emociones', icon: '😊', rows: 11, cols: 11, words: ['MIEDO', 'ESPERANZA', 'FRUSTRACION', 'ORGULLO', 'ALEGRIA', 'ANSIEDAD', 'CULPA', 'ENOJO', 'TERNURA', 'GRATITUD', 'CALMA', 'ENVIDIA', 'SERENIDAD', 'CURIOSIDAD', 'VERGUENZA', 'NOSTALGIA'] },
  { id: 925, theme: 'Geografia', icon: '🗺️', rows: 11, cols: 11, words: ['CORDILLERA', 'OCEANO', 'ECUADOR', 'PENINSULA', 'COSTA', 'VOLCAN', 'MONTANA', 'ARCHIPIELAGO', 'GLACIAR', 'DESIERTO', 'VALLE', 'LLANURA', 'BAHIA', 'CONTINENTE', 'ALTIPLANO', 'ESTRECHO'] },
  { id: 926, theme: 'Insectos', icon: '🐝', rows: 11, cols: 11, words: ['ESCARABAJO', 'MOSQUITO', 'MARIPOSA', 'TERMITA', 'CIGARRA', 'CUCARACHA', 'ORUGA', 'LUCIERNAGA', 'ABEJA', 'MOSCA', 'SALTAMONTES', 'POLILLA', 'AVISPA', 'LIBELULA', 'CIEMPIES', 'HORMIGA'] },
  { id: 927, theme: 'Fiesta', icon: '🎉', rows: 11, cols: 11, words: ['SORPRESA', 'ANFITRION', 'PINATA', 'TORTA', 'GUIRNALDA', 'DECORACION', 'CANCION', 'CUMPLEANOS', 'CONFETI', 'SERPENTINA', 'BRINDIS', 'INVITADO', 'DISFRAZ', 'VELA', 'MUSICA', 'BANQUETE'] },
  { id: 928, theme: 'Matematica', icon: '🔢', rows: 11, cols: 11, words: ['GRAFICO', 'CIRCULO', 'VOLUMEN', 'ANGULO', 'GEOMETRIA', 'PORCENTAJE', 'SUMA', 'MULTIPLICACION', 'FRACCION', 'TRIANGULO', 'DIVISION', 'NUMERO', 'FORMULA', 'DECIMAL', 'RESTA', 'CALCULO'] },
  { id: 929, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['OBSERVATORIO', 'COMETA', 'PLANETA', 'METEORO', 'CRATER', 'UNIVERSO', 'ECLIPSE', 'TELESCOPIO', 'CONSTELACION', 'ORBITA', 'SUPERNOVA', 'GRAVEDAD', 'ESTRELLA', 'NEBULOSA', 'SATELITE', 'TRASLACION'] },
  { id: 930, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['ANALISIS', 'CAMILLA', 'JERINGA', 'ENFERMERA', 'CIRUGIA', 'MEDICO', 'ANESTESIA', 'RADIOGRAFIA', 'QUIROFANO', 'PASTILLA', 'PACIENTE', 'DIAGNOSTICO', 'TERAPIA', 'HOSPITAL', 'TERMOMETRO', 'VENDAJE'] },
  { id: 931, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['SUSTENTABLE', 'HUELLA', 'BIODIVERSIDAD', 'HABITAT', 'AMBIENTE', 'EXTINCION', 'CLIMA', 'CONTAMINACION', 'DEFORESTACION', 'ECOSISTEMA', 'ENERGIA', 'EMISION', 'RECICLAJE', 'ESPECIE', 'RESIDUO'] },
  { id: 932, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['BARRIO', 'EDIFICIO', 'RASCACIELOS', 'TRANSITO', 'MERCADO', 'SUBTERRANEO', 'ALCALDIA', 'CIUDADANO', 'TERMINAL', 'SEMAFORO', 'ESQUINA', 'AVENIDA', 'MUNICIPIO', 'ESTACIONAMIENTO', 'PARQUE', 'MURO'] },
  { id: 933, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['PINTOR', 'ENFERMERO', 'ABOGADO', 'PLOMERO', 'PANADERO', 'PERIODISTA', 'CARPINTERO', 'BOMBERO', 'DENTISTA', 'MAESTRO', 'CONTADOR', 'INGENIERO', 'PILOTO', 'ARQUITECTO', 'VETERINARIO', 'PSICOLOGO'] },
  { id: 934, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['VERGUENZA', 'GRATITUD', 'ALEGRIA', 'CULPA', 'ESPERANZA', 'CONFIANZA', 'ANSIEDAD', 'ENTUSIASMO', 'MIEDO', 'SORPRESA', 'TERNURA', 'CURIOSIDAD', 'NOSTALGIA', 'FRUSTRACION', 'TRISTEZA', 'SERENIDAD'] },
  { id: 935, theme: 'Matematica', icon: '🔢', rows: 11, cols: 12, words: ['PORCENTAJE', 'TRIANGULO', 'PERIMETRO', 'FRACCION', 'FORMULA', 'PROBLEMA', 'VARIABLE', 'ECUACION', 'GEOMETRIA', 'MULTIPLICACION', 'MEDIDA', 'CIRCULO', 'CUADRADO', 'VOLUMEN', 'NUMERO', 'DIVISION'] },
  { id: 936, theme: 'Historia', icon: '🏛️', rows: 11, cols: 12, words: ['CONQUISTA', 'ARQUEOLOGIA', 'CASTILLO', 'BATALLA', 'TRATADO', 'EJERCITO', 'GUERRA', 'REVOLUCION', 'MONUMENTO', 'PIRAMIDE', 'IMPERIO', 'COLONIA', 'DINASTIA', 'ESPADA', 'FORTALEZA', 'CIVILIZACION'] },
  { id: 937, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['METEORO', 'TELESCOPIO', 'ROTACION', 'ORBITA', 'SUPERNOVA', 'NEBULOSA', 'ESTRELLA', 'GALAXIA', 'PLANETA', 'CONSTELACION', 'COMETA', 'OBSERVATORIO', 'GRAVEDAD', 'SATELITE', 'ECLIPSE', 'ASTEROIDE'] },
  { id: 938, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['CIRUGIA', 'ENFERMERA', 'RECETA', 'CONSULTORIO', 'ANESTESIA', 'DIAGNOSTICO', 'VACUNA', 'HOSPITAL', 'QUIROFANO', 'TERMOMETRO', 'MEDICO', 'VENDAJE', 'JERINGA', 'PACIENTE', 'CAMILLA', 'RADIOGRAFIA'] },
  { id: 939, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['CLIMA', 'ENERGIA', 'ESPECIE', 'COMPOST', 'EMISION', 'HABITAT', 'RESIDUO', 'ECOSISTEMA', 'CONSERVACION', 'AMBIENTE', 'EXTINCION', 'BIODIVERSIDAD', 'RECICLAJE', 'DEFORESTACION', 'SUSTENTABLE'] },
  { id: 940, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['TRANSITO', 'ESQUINA', 'ALCALDIA', 'SUBTERRANEO', 'EDIFICIO', 'RASCACIELOS', 'ESTACIONAMIENTO', 'VEREDA', 'PARQUE', 'PUENTE', 'AVENIDA', 'SEMAFORO', 'ESTACION', 'BARRIO', 'MUNICIPIO', 'TERMINAL'] },
  { id: 941, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['MECANICO', 'JARDINERO', 'PILOTO', 'INGENIERO', 'ABOGADO', 'MAESTRO', 'PANADERO', 'ENFERMERO', 'ELECTRICISTA', 'VETERINARIO', 'DENTISTA', 'CONTADOR', 'PSICOLOGO', 'MEDICO', 'COCINERO', 'POLICIA'] },
  { id: 942, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['TRISTEZA', 'GRATITUD', 'ALEGRIA', 'TERNURA', 'ENOJO', 'ENTUSIASMO', 'NOSTALGIA', 'SERENIDAD', 'CURIOSIDAD', 'ESPERANZA', 'EUFORIA', 'ENVIDIA', 'SORPRESA', 'ANSIEDAD', 'FRUSTRACION', 'CONFIANZA'] },
  { id: 943, theme: 'Matematica', icon: '🔢', rows: 11, cols: 12, words: ['VOLUMEN', 'TRIANGULO', 'VARIABLE', 'PORCENTAJE', 'DIVISION', 'PROBLEMA', 'PERIMETRO', 'ECUACION', 'FRACCION', 'RESTA', 'DECIMAL', 'FORMULA', 'GEOMETRIA', 'MULTIPLICACION', 'CUADRADO', 'GRAFICO'] },
  { id: 944, theme: 'Historia', icon: '🏛️', rows: 11, cols: 12, words: ['IMPERIO', 'CORONA', 'PIRAMIDE', 'EJERCITO', 'TRATADO', 'CIVILIZACION', 'COLONIA', 'DINASTIA', 'FORTALEZA', 'ESPADA', 'MONUMENTO', 'CONQUISTA', 'CASTILLO', 'ARQUEOLOGIA', 'REVOLUCION', 'BATALLA'] },
  { id: 945, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['ORBITA', 'UNIVERSO', 'NEBULOSA', 'GRAVEDAD', 'METEORO', 'TELESCOPIO', 'SATELITE', 'ECLIPSE', 'CONSTELACION', 'SUPERNOVA', 'GALAXIA', 'PLANETA', 'ASTEROIDE', 'ESTRELLA', 'ROTACION', 'TRASLACION'] },
  { id: 946, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['PACIENTE', 'CONSULTORIO', 'VENDAJE', 'MEDICO', 'ANALISIS', 'CIRUGIA', 'RADIOGRAFIA', 'DIAGNOSTICO', 'JERINGA', 'ENFERMERA', 'PASTILLA', 'ANESTESIA', 'HOSPITAL', 'RECETA', 'TERAPIA', 'QUIROFANO'] },
  { id: 947, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['RECICLAJE', 'DEFORESTACION', 'ENERGIA', 'CONTAMINACION', 'AMBIENTE', 'HUELLA', 'HABITAT', 'CONSERVACION', 'ESPECIE', 'COMPOST', 'RESIDUO', 'RENOVABLE', 'EXTINCION', 'EMISION', 'SUSTENTABLE'] },
  { id: 948, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['RASCACIELOS', 'VECINO', 'SUBTERRANEO', 'TRANSITO', 'TERMINAL', 'ESTACION', 'MUNICIPIO', 'AVENIDA', 'EDIFICIO', 'ESTACIONAMIENTO', 'ALCALDIA', 'CIUDADANO', 'ESQUINA', 'FAROL', 'MERCADO', 'CALLE'] },
  { id: 949, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['CARPINTERO', 'PSICOLOGO', 'PLOMERO', 'COCINERO', 'BOMBERO', 'ARQUITECTO', 'VETERINARIO', 'CONTADOR', 'MEDICO', 'ELECTRICISTA', 'PERIODISTA', 'JARDINERO', 'POLICIA', 'INGENIERO', 'ENFERMERO'] },
  { id: 950, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['MIEDO', 'CONFIANZA', 'CURIOSIDAD', 'ORGULLO', 'TRISTEZA', 'ESPERANZA', 'ENTUSIASMO', 'GRATITUD', 'FRUSTRACION', 'NOSTALGIA', 'VERGUENZA', 'CALMA', 'SORPRESA', 'ANSIEDAD', 'SERENIDAD', 'ALEGRIA'] },
  { id: 951, theme: 'Historia', icon: '🏛️', rows: 11, cols: 12, words: ['EJERCITO', 'FORTALEZA', 'IMPERIO', 'DINASTIA', 'ARQUEOLOGIA', 'MONUMENTO', 'CASTILLO', 'PIRAMIDE', 'TRATADO', 'CIVILIZACION', 'CONQUISTA', 'GUERRA', 'REVOLUCION', 'COLONIA', 'CORONA', 'BATALLA'] },
  { id: 952, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['ORBITA', 'UNIVERSO', 'NEBULOSA', 'TELESCOPIO', 'SATELITE', 'GRAVEDAD', 'CONSTELACION', 'SUPERNOVA', 'METEORO', 'ASTEROIDE', 'OBSERVATORIO', 'ESTRELLA', 'GALAXIA', 'ECLIPSE', 'PLANETA', 'CRATER'] },
  { id: 953, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['ANESTESIA', 'MEDICO', 'PACIENTE', 'CONSULTORIO', 'ANALISIS', 'VENDAJE', 'CIRUGIA', 'JERINGA', 'VACUNA', 'PASTILLA', 'TERMOMETRO', 'ENFERMERA', 'RECETA', 'HOSPITAL', 'DIAGNOSTICO', 'RADIOGRAFIA'] },
  { id: 954, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['CONSERVACION', 'ENERGIA', 'DEFORESTACION', 'HABITAT', 'CONTAMINACION', 'ECOSISTEMA', 'COMPOST', 'ESPECIE', 'RESIDUO', 'EXTINCION', 'EMISION', 'BIODIVERSIDAD', 'SUSTENTABLE', 'RENOVABLE'] },
  { id: 955, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['CALLE', 'MERCADO', 'ESTACION', 'EDIFICIO', 'RASCACIELOS', 'SUBTERRANEO', 'ALCALDIA', 'PUENTE', 'ESTACIONAMIENTO', 'VEREDA', 'SEMAFORO', 'AVENIDA', 'PARQUE', 'MUNICIPIO', 'CIUDADANO', 'TRANSITO'] },
  { id: 956, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['MAESTRO', 'PILOTO', 'MEDICO', 'ABOGADO', 'CONTADOR', 'POLICIA', 'PERIODISTA', 'MECANICO', 'VETERINARIO', 'PSICOLOGO', 'PINTOR', 'COCINERO', 'DENTISTA', 'CARPINTERO', 'ENFERMERO', 'ELECTRICISTA'] },
  { id: 957, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['SORPRESA', 'ORGULLO', 'CONFIANZA', 'GRATITUD', 'MIEDO', 'EUFORIA', 'VERGUENZA', 'ALEGRIA', 'CURIOSIDAD', 'ESPERANZA', 'TRISTEZA', 'NOSTALGIA', 'ANSIEDAD', 'ENTUSIASMO', 'FRUSTRACION', 'ENVIDIA'] },
  { id: 958, theme: 'Matematica', icon: '🔢', rows: 11, cols: 12, words: ['PORCENTAJE', 'FRACCION', 'PERIMETRO', 'NUMERO', 'PROBLEMA', 'VOLUMEN', 'GEOMETRIA', 'TRIANGULO', 'GRAFICO', 'CIRCULO', 'MULTIPLICACION', 'VARIABLE', 'DIVISION', 'ECUACION', 'DECIMAL', 'FORMULA'] },
  { id: 959, theme: 'Historia', icon: '🏛️', rows: 11, cols: 12, words: ['EJERCITO', 'FORTALEZA', 'ARQUEOLOGIA', 'TRATADO', 'CASTILLO', 'CIVILIZACION', 'IMPERIO', 'BATALLA', 'REVOLUCION', 'MONUMENTO', 'CONQUISTA', 'ESPADA', 'GUERRA', 'DINASTIA', 'PIRAMIDE', 'COLONIA'] },
  { id: 960, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['ESTRELLA', 'OBSERVATORIO', 'NEBULOSA', 'UNIVERSO', 'GALAXIA', 'METEORO', 'PLANETA', 'CONSTELACION', 'ORBITA', 'ASTEROIDE', 'ECLIPSE', 'GRAVEDAD', 'ROTACION', 'CRATER', 'SUPERNOVA', 'TELESCOPIO'] },
  { id: 961, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['DIAGNOSTICO', 'PASTILLA', 'ENFERMERA', 'HOSPITAL', 'ANESTESIA', 'TERAPIA', 'CIRUGIA', 'JERINGA', 'CAMILLA', 'RECETA', 'TERMOMETRO', 'CONSULTORIO', 'QUIROFANO', 'VENDAJE', 'ANALISIS', 'PACIENTE'] },
  { id: 962, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['COMPOST', 'AMBIENTE', 'RESIDUO', 'CLIMA', 'EMISION', 'SUSTENTABLE', 'CONSERVACION', 'DEFORESTACION', 'BIODIVERSIDAD', 'EXTINCION', 'ESPECIE', 'ENERGIA', 'ECOSISTEMA', 'HABITAT', 'RENOVABLE'] },
  { id: 963, theme: 'Tecnologia', icon: '💻', rows: 11, cols: 12, words: ['PLATAFORMA', 'NAVEGADOR', 'CABLE', 'USUARIO', 'ARCHIVO', 'PROCESADOR', 'ANTIVIRUS', 'ROBOT', 'MEMORIA', 'BATERIA', 'SOFTWARE', 'ACTUALIZACION', 'CONTRASENA', 'APLICACION', 'CODIGO', 'ALGORITMO'] },
  { id: 964, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['EDIFICIO', 'TERMINAL', 'MUNICIPIO', 'AVENIDA', 'MERCADO', 'PLAZA', 'SUBTERRANEO', 'TRANSITO', 'ESTACIONAMIENTO', 'RASCACIELOS', 'CIUDADANO', 'PARQUE', 'ESTACION', 'BARRIO', 'ALCALDIA', 'VECINO'] },
  { id: 965, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['CARPINTERO', 'ABOGADO', 'INGENIERO', 'MEDICO', 'VETERINARIO', 'ELECTRICISTA', 'PINTOR', 'PSICOLOGO', 'ENFERMERO', 'BOMBERO', 'PLOMERO', 'MECANICO', 'PANADERO', 'COCINERO', 'CONTADOR', 'POLICIA'] },
  { id: 966, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['VERGUENZA', 'ORGULLO', 'CONFIANZA', 'EUFORIA', 'TERNURA', 'ALEGRIA', 'SERENIDAD', 'CURIOSIDAD', 'ENVIDIA', 'ANSIEDAD', 'FRUSTRACION', 'SORPRESA', 'NOSTALGIA', 'ENTUSIASMO', 'CALMA', 'ESPERANZA'] },
  { id: 967, theme: 'Matematica', icon: '🔢', rows: 11, cols: 12, words: ['PROBLEMA', 'DIVISION', 'DECIMAL', 'VARIABLE', 'TRIANGULO', 'ANGULO', 'PERIMETRO', 'FRACCION', 'MULTIPLICACION', 'ECUACION', 'VOLUMEN', 'MEDIDA', 'PORCENTAJE', 'CUADRADO', 'GEOMETRIA', 'GRAFICO'] },
  { id: 968, theme: 'Historia', icon: '🏛️', rows: 11, cols: 12, words: ['EJERCITO', 'ARQUEOLOGIA', 'MONUMENTO', 'CASTILLO', 'PIRAMIDE', 'ESPADA', 'DINASTIA', 'BATALLA', 'CONQUISTA', 'TRATADO', 'CORONA', 'CIVILIZACION', 'COLONIA', 'REVOLUCION', 'IMPERIO', 'FORTALEZA'] },
  { id: 969, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['TRASLACION', 'ESTRELLA', 'COMETA', 'ROTACION', 'ORBITA', 'PLANETA', 'OBSERVATORIO', 'METEORO', 'ASTEROIDE', 'GALAXIA', 'CONSTELACION', 'GRAVEDAD', 'SATELITE', 'TELESCOPIO', 'UNIVERSO', 'CRATER'] },
  { id: 970, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['QUIROFANO', 'PASTILLA', 'TERAPIA', 'ENFERMERA', 'PACIENTE', 'RADIOGRAFIA', 'DIAGNOSTICO', 'JERINGA', 'CONSULTORIO', 'CAMILLA', 'MEDICO', 'TERMOMETRO', 'ANALISIS', 'CIRUGIA', 'RECETA', 'VENDAJE'] },
  { id: 971, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['EXTINCION', 'ESPECIE', 'ECOSISTEMA', 'SUSTENTABLE', 'EMISION', 'DEFORESTACION', 'RECICLAJE', 'RENOVABLE', 'BIODIVERSIDAD', 'ENERGIA', 'RESIDUO', 'CONSERVACION', 'COMPOST', 'CLIMA', 'HUELLA'] },
  { id: 972, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['AVENIDA', 'ALCALDIA', 'SEMAFORO', 'BARRIO', 'MURO', 'SUBTERRANEO', 'ESTACION', 'MUNICIPIO', 'TRANSITO', 'TERMINAL', 'EDIFICIO', 'PUENTE', 'ESTACIONAMIENTO', 'CIUDADANO', 'VEREDA', 'RASCACIELOS'] },
  { id: 973, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['PILOTO', 'BOMBERO', 'ARQUITECTO', 'MEDICO', 'CARPINTERO', 'ABOGADO', 'PANADERO', 'COCINERO', 'POLICIA', 'MECANICO', 'PSICOLOGO', 'PERIODISTA', 'INGENIERO', 'JARDINERO', 'MAESTRO', 'VETERINARIO'] },
  { id: 974, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['ALEGRIA', 'EUFORIA', 'ENVIDIA', 'CONFIANZA', 'SORPRESA', 'CURIOSIDAD', 'ESPERANZA', 'CULPA', 'ANSIEDAD', 'NOSTALGIA', 'SERENIDAD', 'FRUSTRACION', 'GRATITUD', 'TERNURA', 'TRISTEZA', 'ENTUSIASMO'] },
  { id: 975, theme: 'Matematica', icon: '🔢', rows: 11, cols: 12, words: ['GRAFICO', 'DIVISION', 'PERIMETRO', 'PROBLEMA', 'CUADRADO', 'MEDIDA', 'TRIANGULO', 'CIRCULO', 'VARIABLE', 'FRACCION', 'MULTIPLICACION', 'VOLUMEN', 'PORCENTAJE', 'CALCULO', 'DECIMAL', 'GEOMETRIA'] },
  { id: 976, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['UNIVERSO', 'NEBULOSA', 'SATELITE', 'SUPERNOVA', 'ORBITA', 'TELESCOPIO', 'COMETA', 'TRASLACION', 'GALAXIA', 'CONSTELACION', 'ECLIPSE', 'ESTRELLA', 'GRAVEDAD', 'OBSERVATORIO', 'CRATER', 'PLANETA'] },
  { id: 977, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['QUIROFANO', 'ANESTESIA', 'ANALISIS', 'ENFERMERA', 'VACUNA', 'CONSULTORIO', 'RECETA', 'VENDAJE', 'DIAGNOSTICO', 'JERINGA', 'PASTILLA', 'TERAPIA', 'CIRUGIA', 'PACIENTE', 'HOSPITAL', 'RADIOGRAFIA'] },
  { id: 978, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['EMISION', 'DEFORESTACION', 'RESIDUO', 'BIODIVERSIDAD', 'ECOSISTEMA', 'RENOVABLE', 'ESPECIE', 'CLIMA', 'HUELLA', 'ENERGIA', 'RECICLAJE', 'COMPOST', 'AMBIENTE', 'CONTAMINACION', 'SUSTENTABLE'] },
  { id: 979, theme: 'Tecnologia', icon: '💻', rows: 11, cols: 12, words: ['APLICACION', 'RED', 'PLATAFORMA', 'NUBE', 'CONTRASENA', 'ACTUALIZACION', 'ARCHIVO', 'DESCARGA', 'SOFTWARE', 'PROCESADOR', 'PANTALLA', 'ANTIVIRUS', 'USUARIO', 'IMPRESORA', 'SERVIDOR', 'INTERNET'] },
  { id: 980, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['VEREDA', 'ESTACION', 'TERMINAL', 'PARQUE', 'EDIFICIO', 'TRANSITO', 'RASCACIELOS', 'PUENTE', 'ALCALDIA', 'SUBTERRANEO', 'MURO', 'CIUDADANO', 'SEMAFORO', 'AVENIDA', 'MUNICIPIO', 'ESTACIONAMIENTO'] },
  { id: 981, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['ELECTRICISTA', 'ENFERMERO', 'ARQUITECTO', 'JARDINERO', 'COCINERO', 'MAESTRO', 'POLICIA', 'PANADERO', 'PSICOLOGO', 'CARPINTERO', 'ABOGADO', 'PLOMERO', 'VETERINARIO', 'PERIODISTA', 'CONTADOR'] },
  { id: 982, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['ENTUSIASMO', 'ALEGRIA', 'NOSTALGIA', 'ANSIEDAD', 'GRATITUD', 'CURIOSIDAD', 'ENVIDIA', 'TRISTEZA', 'TERNURA', 'SORPRESA', 'FRUSTRACION', 'VERGUENZA', 'CULPA', 'CONFIANZA', 'SERENIDAD', 'ORGULLO'] },
  { id: 983, theme: 'Historia', icon: '🏛️', rows: 11, cols: 12, words: ['COLONIA', 'DINASTIA', 'EJERCITO', 'ESPADA', 'CORONA', 'CIVILIZACION', 'ARQUEOLOGIA', 'REVOLUCION', 'FORTALEZA', 'MONUMENTO', 'PIRAMIDE', 'IMPERIO', 'CASTILLO', 'BATALLA', 'TRATADO', 'CONQUISTA'] },
  { id: 984, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['SATELITE', 'METEORO', 'OBSERVATORIO', 'CRATER', 'TRASLACION', 'NEBULOSA', 'CONSTELACION', 'UNIVERSO', 'ASTEROIDE', 'ROTACION', 'ORBITA', 'ESTRELLA', 'SUPERNOVA', 'COMETA', 'PLANETA', 'GRAVEDAD'] },
  { id: 985, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['ANESTESIA', 'TERAPIA', 'PASTILLA', 'HOSPITAL', 'ENFERMERA', 'TERMOMETRO', 'VENDAJE', 'CAMILLA', 'JERINGA', 'PACIENTE', 'RADIOGRAFIA', 'ANALISIS', 'QUIROFANO', 'VACUNA', 'CIRUGIA', 'CONSULTORIO'] },
  { id: 986, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['CONSERVACION', 'DEFORESTACION', 'ECOSISTEMA', 'RENOVABLE', 'CLIMA', 'SUSTENTABLE', 'ESPECIE', 'EXTINCION', 'EMISION', 'BIODIVERSIDAD', 'RECICLAJE', 'HABITAT', 'RESIDUO', 'COMPOST', 'HUELLA'] },
  { id: 987, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['SUBTERRANEO', 'EDIFICIO', 'MUNICIPIO', 'AVENIDA', 'ESTACION', 'ALCALDIA', 'FAROL', 'PUENTE', 'MERCADO', 'ESTACIONAMIENTO', 'TERMINAL', 'CIUDADANO', 'RASCACIELOS', 'VEREDA', 'BARRIO', 'SEMAFORO'] },
  { id: 988, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['PLOMERO', 'MEDICO', 'ABOGADO', 'PSICOLOGO', 'ENFERMERO', 'COCINERO', 'VETERINARIO', 'PILOTO', 'DENTISTA', 'ARQUITECTO', 'INGENIERO', 'POLICIA', 'MECANICO', 'BOMBERO', 'ELECTRICISTA', 'CONTADOR'] },
  { id: 989, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['SERENIDAD', 'CONFIANZA', 'NOSTALGIA', 'SORPRESA', 'TERNURA', 'CALMA', 'VERGUENZA', 'CURIOSIDAD', 'ESPERANZA', 'ENVIDIA', 'TRISTEZA', 'EUFORIA', 'ENTUSIASMO', 'FRUSTRACION', 'ORGULLO', 'ALEGRIA'] },
  { id: 990, theme: 'Matematica', icon: '🔢', rows: 11, cols: 12, words: ['CUADRADO', 'CIRCULO', 'PERIMETRO', 'ECUACION', 'GEOMETRIA', 'FORMULA', 'TRIANGULO', 'VOLUMEN', 'PROBLEMA', 'MULTIPLICACION', 'PORCENTAJE', 'DIVISION', 'GRAFICO', 'CALCULO', 'NUMERO', 'FRACCION'] },
  { id: 991, theme: 'Historia', icon: '🏛️', rows: 11, cols: 12, words: ['ARQUEOLOGIA', 'DINASTIA', 'CIVILIZACION', 'BATALLA', 'FORTALEZA', 'CONQUISTA', 'MONUMENTO', 'TRATADO', 'IMPERIO', 'REVOLUCION', 'COLONIA', 'CORONA', 'EJERCITO', 'PIRAMIDE', 'ESPADA', 'CASTILLO'] },
  { id: 992, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['UNIVERSO', 'ECLIPSE', 'TELESCOPIO', 'CONSTELACION', 'OBSERVATORIO', 'PLANETA', 'ASTEROIDE', 'GALAXIA', 'COMETA', 'SUPERNOVA', 'ESTRELLA', 'CRATER', 'METEORO', 'ROTACION', 'SATELITE', 'NEBULOSA'] },
  { id: 993, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['CIRUGIA', 'ENFERMERA', 'TERMOMETRO', 'PACIENTE', 'MEDICO', 'RADIOGRAFIA', 'QUIROFANO', 'RECETA', 'VACUNA', 'JERINGA', 'CONSULTORIO', 'DIAGNOSTICO', 'HOSPITAL', 'CAMILLA', 'ANALISIS', 'PASTILLA'] },
  { id: 994, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['BIODIVERSIDAD', 'AMBIENTE', 'RECICLAJE', 'ESPECIE', 'HUELLA', 'CONSERVACION', 'DEFORESTACION', 'EXTINCION', 'CONTAMINACION', 'ECOSISTEMA', 'ENERGIA', 'SUSTENTABLE', 'HABITAT', 'RESIDUO'] },
  { id: 995, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['RASCACIELOS', 'CALLE', 'TERMINAL', 'TRANSITO', 'MUNICIPIO', 'ESTACION', 'PLAZA', 'ALCALDIA', 'AVENIDA', 'ESQUINA', 'SUBTERRANEO', 'ESTACIONAMIENTO', 'MERCADO', 'SEMAFORO', 'VEREDA', 'CIUDADANO'] },
  { id: 996, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['DENTISTA', 'VETERINARIO', 'PERIODISTA', 'MEDICO', 'ARQUITECTO', 'MECANICO', 'INGENIERO', 'PANADERO', 'PSICOLOGO', 'BOMBERO', 'CONTADOR', 'JARDINERO', 'COCINERO', 'ENFERMERO', 'ELECTRICISTA'] },
  { id: 997, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['EUFORIA', 'ENVIDIA', 'FRUSTRACION', 'SORPRESA', 'ENTUSIASMO', 'VERGUENZA', 'ESPERANZA', 'GRATITUD', 'CONFIANZA', 'TRISTEZA', 'CULPA', 'ANSIEDAD', 'MIEDO', 'CURIOSIDAD', 'SERENIDAD', 'NOSTALGIA'] },
  { id: 998, theme: 'Matematica', icon: '🔢', rows: 11, cols: 12, words: ['DECIMAL', 'CUADRADO', 'FORMULA', 'PERIMETRO', 'CIRCULO', 'NUMERO', 'TRIANGULO', 'GEOMETRIA', 'ECUACION', 'PROBLEMA', 'VARIABLE', 'PORCENTAJE', 'MULTIPLICACION', 'DIVISION', 'VOLUMEN', 'GRAFICO'] },
  { id: 999, theme: 'Historia', icon: '🏛️', rows: 11, cols: 12, words: ['CONQUISTA', 'EJERCITO', 'DINASTIA', 'MONUMENTO', 'CIVILIZACION', 'REVOLUCION', 'CORONA', 'PIRAMIDE', 'TRATADO', 'IMPERIO', 'CASTILLO', 'ARQUEOLOGIA', 'GUERRA', 'FORTALEZA', 'BATALLA', 'COLONIA'] },
  { id: 1000, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['NEBULOSA', 'GALAXIA', 'GRAVEDAD', 'OBSERVATORIO', 'METEORO', 'ROTACION', 'TELESCOPIO', 'UNIVERSO', 'CONSTELACION', 'PLANETA', 'COMETA', 'CRATER', 'SATELITE', 'TRASLACION', 'ESTRELLA', 'ECLIPSE'] },
  { id: 1001, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['CIRUGIA', 'DIAGNOSTICO', 'PACIENTE', 'PASTILLA', 'RECETA', 'CONSULTORIO', 'JERINGA', 'TERAPIA', 'VACUNA', 'HOSPITAL', 'ANESTESIA', 'QUIROFANO', 'ANALISIS', 'ENFERMERA', 'CAMILLA', 'RADIOGRAFIA'] },
  { id: 1002, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['RENOVABLE', 'BIODIVERSIDAD', 'COMPOST', 'RESIDUO', 'EMISION', 'CONTAMINACION', 'ENERGIA', 'DEFORESTACION', 'ECOSISTEMA', 'CONSERVACION', 'HABITAT', 'ESPECIE', 'RECICLAJE', 'SUSTENTABLE'] },
  { id: 1003, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['PUENTE', 'FAROL', 'TERMINAL', 'CIUDADANO', 'MUNICIPIO', 'VECINO', 'ALCALDIA', 'SUBTERRANEO', 'EDIFICIO', 'TRANSITO', 'ESTACIONAMIENTO', 'ESQUINA', 'CALLE', 'ESTACION', 'SEMAFORO', 'RASCACIELOS'] },
  { id: 1004, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['POLICIA', 'PERIODISTA', 'ENFERMERO', 'PANADERO', 'MAESTRO', 'DENTISTA', 'ABOGADO', 'ELECTRICISTA', 'COCINERO', 'PINTOR', 'INGENIERO', 'PLOMERO', 'MECANICO', 'JARDINERO', 'VETERINARIO', 'PILOTO'] },
  { id: 1005, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['SERENIDAD', 'ESPERANZA', 'SORPRESA', 'CURIOSIDAD', 'TRISTEZA', 'VERGUENZA', 'ENTUSIASMO', 'FRUSTRACION', 'ORGULLO', 'GRATITUD', 'MIEDO', 'CALMA', 'CONFIANZA', 'ANSIEDAD', 'NOSTALGIA', 'ENVIDIA'] },
  { id: 1006, theme: 'Matematica', icon: '🔢', rows: 11, cols: 12, words: ['CALCULO', 'PROBLEMA', 'GRAFICO', 'CUADRADO', 'FRACCION', 'DECIMAL', 'NUMERO', 'ECUACION', 'CIRCULO', 'PORCENTAJE', 'PERIMETRO', 'GEOMETRIA', 'VARIABLE', 'MULTIPLICACION', 'FORMULA', 'TRIANGULO'] },
  { id: 1007, theme: 'Historia', icon: '🏛️', rows: 11, cols: 12, words: ['PIRAMIDE', 'MONUMENTO', 'CONQUISTA', 'REVOLUCION', 'CORONA', 'EJERCITO', 'DINASTIA', 'BATALLA', 'FORTALEZA', 'CASTILLO', 'IMPERIO', 'CIVILIZACION', 'TRATADO', 'COLONIA', 'ESPADA', 'ARQUEOLOGIA'] },
  { id: 1008, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['UNIVERSO', 'COMETA', 'ECLIPSE', 'SUPERNOVA', 'ASTEROIDE', 'TELESCOPIO', 'CONSTELACION', 'ESTRELLA', 'ORBITA', 'OBSERVATORIO', 'GRAVEDAD', 'SATELITE', 'ROTACION', 'PLANETA', 'NEBULOSA', 'CRATER'] },
  { id: 1009, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['RADIOGRAFIA', 'QUIROFANO', 'JERINGA', 'TERMOMETRO', 'VACUNA', 'RECETA', 'CAMILLA', 'HOSPITAL', 'ANALISIS', 'VENDAJE', 'CONSULTORIO', 'DIAGNOSTICO', 'ANESTESIA', 'TERAPIA', 'ENFERMERA', 'MEDICO'] },
  { id: 1010, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['RENOVABLE', 'ESPECIE', 'EXTINCION', 'EMISION', 'ENERGIA', 'RECICLAJE', 'COMPOST', 'HUELLA', 'BIODIVERSIDAD', 'SUSTENTABLE', 'CONSERVACION', 'DEFORESTACION', 'RESIDUO', 'HABITAT', 'AMBIENTE'] },
  { id: 1011, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['EDIFICIO', 'SUBTERRANEO', 'ALCALDIA', 'PARQUE', 'MUNICIPIO', 'SEMAFORO', 'TERMINAL', 'ESTACIONAMIENTO', 'PUENTE', 'TRANSITO', 'AVENIDA', 'VEREDA', 'RASCACIELOS', 'ESQUINA', 'CALLE', 'CIUDADANO'] },
  { id: 1012, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['PANADERO', 'PSICOLOGO', 'MAESTRO', 'CARPINTERO', 'ENFERMERO', 'INGENIERO', 'PERIODISTA', 'ELECTRICISTA', 'MEDICO', 'POLICIA', 'JARDINERO', 'ABOGADO', 'DENTISTA', 'VETERINARIO', 'ARQUITECTO'] },
  { id: 1013, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['CULPA', 'MIEDO', 'CURIOSIDAD', 'SORPRESA', 'ANSIEDAD', 'ESPERANZA', 'ENTUSIASMO', 'EUFORIA', 'SERENIDAD', 'FRUSTRACION', 'CONFIANZA', 'TRISTEZA', 'GRATITUD', 'ORGULLO', 'VERGUENZA', 'NOSTALGIA'] },
  { id: 1014, theme: 'Matematica', icon: '🔢', rows: 11, cols: 12, words: ['VOLUMEN', 'GRAFICO', 'PROBLEMA', 'MULTIPLICACION', 'PORCENTAJE', 'ECUACION', 'CIRCULO', 'FORMULA', 'CALCULO', 'TRIANGULO', 'CUADRADO', 'DIVISION', 'FRACCION', 'DECIMAL', 'VARIABLE', 'GEOMETRIA'] },
  { id: 1015, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['PLANETA', 'ECLIPSE', 'GALAXIA', 'CRATER', 'ORBITA', 'ROTACION', 'METEORO', 'OBSERVATORIO', 'CONSTELACION', 'TRASLACION', 'ASTEROIDE', 'UNIVERSO', 'NEBULOSA', 'TELESCOPIO', 'COMETA', 'SUPERNOVA'] },
  { id: 1016, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['CIRUGIA', 'TERMOMETRO', 'CAMILLA', 'QUIROFANO', 'VACUNA', 'RECETA', 'DIAGNOSTICO', 'RADIOGRAFIA', 'ANALISIS', 'TERAPIA', 'VENDAJE', 'PACIENTE', 'ENFERMERA', 'MEDICO', 'CONSULTORIO', 'ANESTESIA'] },
  { id: 1017, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['HUELLA', 'EXTINCION', 'CLIMA', 'DEFORESTACION', 'ENERGIA', 'CONSERVACION', 'EMISION', 'ECOSISTEMA', 'BIODIVERSIDAD', 'COMPOST', 'HABITAT', 'SUSTENTABLE', 'RECICLAJE', 'RENOVABLE', 'RESIDUO'] },
  { id: 1018, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['VEREDA', 'PUENTE', 'SEMAFORO', 'TRANSITO', 'ESQUINA', 'CIUDADANO', 'TERMINAL', 'RASCACIELOS', 'PARQUE', 'MUNICIPIO', 'AVENIDA', 'ESTACIONAMIENTO', 'ALCALDIA', 'SUBTERRANEO', 'PLAZA', 'EDIFICIO'] },
  { id: 1019, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['BOMBERO', 'DENTISTA', 'POLICIA', 'PANADERO', 'MAESTRO', 'PSICOLOGO', 'COCINERO', 'VETERINARIO', 'ELECTRICISTA', 'PINTOR', 'ABOGADO', 'PILOTO', 'CARPINTERO', 'ENFERMERO', 'JARDINERO', 'CONTADOR'] },
  { id: 1020, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['ORGULLO', 'SORPRESA', 'ENTUSIASMO', 'CURIOSIDAD', 'ESPERANZA', 'ENVIDIA', 'FRUSTRACION', 'VERGUENZA', 'SERENIDAD', 'ALEGRIA', 'EUFORIA', 'GRATITUD', 'ANSIEDAD', 'CONFIANZA', 'CULPA', 'TRISTEZA'] },
  { id: 1021, theme: 'Matematica', icon: '🔢', rows: 11, cols: 12, words: ['VARIABLE', 'DIVISION', 'VOLUMEN', 'ECUACION', 'DECIMAL', 'GEOMETRIA', 'CUADRADO', 'PERIMETRO', 'PORCENTAJE', 'MEDIDA', 'NUMERO', 'FRACCION', 'MULTIPLICACION', 'CALCULO', 'PROBLEMA', 'TRIANGULO'] },
  { id: 1022, theme: 'Historia', icon: '🏛️', rows: 11, cols: 12, words: ['DINASTIA', 'MONUMENTO', 'FORTALEZA', 'ESPADA', 'CORONA', 'ARQUEOLOGIA', 'EJERCITO', 'CONQUISTA', 'IMPERIO', 'CASTILLO', 'BATALLA', 'TRATADO', 'CIVILIZACION', 'REVOLUCION', 'COLONIA', 'PIRAMIDE'] },
  { id: 1023, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['PLANETA', 'ORBITA', 'METEORO', 'ROTACION', 'SATELITE', 'GRAVEDAD', 'ESTRELLA', 'TRASLACION', 'ECLIPSE', 'NEBULOSA', 'SUPERNOVA', 'COMETA', 'ASTEROIDE', 'CONSTELACION', 'GALAXIA', 'OBSERVATORIO'] },
  { id: 1024, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['CAMILLA', 'DIAGNOSTICO', 'PACIENTE', 'VENDAJE', 'MEDICO', 'ENFERMERA', 'JERINGA', 'ANALISIS', 'RADIOGRAFIA', 'RECETA', 'CONSULTORIO', 'HOSPITAL', 'ANESTESIA', 'PASTILLA', 'QUIROFANO', 'TERAPIA'] },
  { id: 1025, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['COMPOST', 'HABITAT', 'CLIMA', 'ENERGIA', 'EMISION', 'ECOSISTEMA', 'DEFORESTACION', 'AMBIENTE', 'EXTINCION', 'RESIDUO', 'CONTAMINACION', 'CONSERVACION', 'SUSTENTABLE', 'ESPECIE', 'RECICLAJE'] },
  { id: 1026, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['VECINO', 'RASCACIELOS', 'SEMAFORO', 'ALCALDIA', 'ESTACIONAMIENTO', 'MERCADO', 'PUENTE', 'ESQUINA', 'CALLE', 'MUNICIPIO', 'SUBTERRANEO', 'TERMINAL', 'EDIFICIO', 'PARQUE', 'CIUDADANO', 'ESTACION'] },
  { id: 1027, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['CARPINTERO', 'ARQUITECTO', 'INGENIERO', 'JARDINERO', 'ELECTRICISTA', 'ABOGADO', 'PLOMERO', 'MECANICO', 'DENTISTA', 'PANADERO', 'CONTADOR', 'PSICOLOGO', 'ENFERMERO', 'POLICIA', 'VETERINARIO'] },
  { id: 1028, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['GRATITUD', 'ANSIEDAD', 'VERGUENZA', 'ENVIDIA', 'FRUSTRACION', 'ORGULLO', 'EUFORIA', 'ALEGRIA', 'CURIOSIDAD', 'CONFIANZA', 'TERNURA', 'CALMA', 'ENTUSIASMO', 'NOSTALGIA', 'SERENIDAD', 'ESPERANZA'] },
  { id: 1029, theme: 'Matematica', icon: '🔢', rows: 11, cols: 12, words: ['GEOMETRIA', 'DECIMAL', 'PROBLEMA', 'VARIABLE', 'DIVISION', 'VOLUMEN', 'ANGULO', 'TRIANGULO', 'MULTIPLICACION', 'PORCENTAJE', 'PERIMETRO', 'FRACCION', 'CUADRADO', 'ECUACION', 'NUMERO', 'GRAFICO'] },
  { id: 1030, theme: 'Historia', icon: '🏛️', rows: 11, cols: 12, words: ['MONUMENTO', 'DINASTIA', 'CIVILIZACION', 'ARQUEOLOGIA', 'PIRAMIDE', 'BATALLA', 'CORONA', 'EJERCITO', 'GUERRA', 'IMPERIO', 'COLONIA', 'FORTALEZA', 'CONQUISTA', 'REVOLUCION', 'TRATADO', 'CASTILLO'] },
  { id: 1031, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['ASTEROIDE', 'CONSTELACION', 'METEORO', 'ROTACION', 'SATELITE', 'TRASLACION', 'GALAXIA', 'COMETA', 'SUPERNOVA', 'GRAVEDAD', 'ECLIPSE', 'OBSERVATORIO', 'PLANETA', 'UNIVERSO', 'ESTRELLA', 'ORBITA'] },
  { id: 1032, theme: 'Salud', icon: '🏥', rows: 11, cols: 12, words: ['ENFERMERA', 'ANALISIS', 'DIAGNOSTICO', 'PASTILLA', 'RECETA', 'TERMOMETRO', 'VACUNA', 'HOSPITAL', 'PACIENTE', 'CIRUGIA', 'MEDICO', 'RADIOGRAFIA', 'ANESTESIA', 'VENDAJE', 'CONSULTORIO', 'TERAPIA'] },
  { id: 1033, theme: 'Ecologia', icon: '🌍', rows: 11, cols: 12, words: ['HUELLA', 'ENERGIA', 'ECOSISTEMA', 'EMISION', 'RECICLAJE', 'EXTINCION', 'DEFORESTACION', 'COMPOST', 'ESPECIE', 'CONTAMINACION', 'RENOVABLE', 'RESIDUO', 'BIODIVERSIDAD', 'AMBIENTE', 'HABITAT'] },
  { id: 1034, theme: 'Tecnologia', icon: '💻', rows: 11, cols: 12, words: ['PLATAFORMA', 'ACTUALIZACION', 'CONTRASENA', 'DATOS', 'ANTIVIRUS', 'INTERNET', 'SENSOR', 'MEMORIA', 'MONITOR', 'CODIGO', 'SOFTWARE', 'APLICACION', 'IMPRESORA', 'PROCESADOR', 'TECLADO', 'USUARIO'] },
  { id: 1035, theme: 'Ciudad', icon: '🏙️', rows: 11, cols: 12, words: ['EDIFICIO', 'SUBTERRANEO', 'MUNICIPIO', 'VEREDA', 'SEMAFORO', 'ESTACION', 'TERMINAL', 'ALCALDIA', 'CIUDADANO', 'CALLE', 'ESQUINA', 'RASCACIELOS', 'ESTACIONAMIENTO', 'PARQUE', 'BARRIO', 'AVENIDA'] },
  { id: 1036, theme: 'Profesiones', icon: '👷', rows: 11, cols: 12, words: ['ENFERMERO', 'CONTADOR', 'POLICIA', 'ABOGADO', 'PINTOR', 'MEDICO', 'PLOMERO', 'JARDINERO', 'INGENIERO', 'VETERINARIO', 'DENTISTA', 'MAESTRO', 'PANADERO', 'COCINERO', 'ELECTRICISTA', 'CARPINTERO'] },
  { id: 1037, theme: 'Emociones', icon: '😊', rows: 11, cols: 12, words: ['SORPRESA', 'VERGUENZA', 'EUFORIA', 'ENVIDIA', 'ESPERANZA', 'CULPA', 'FRUSTRACION', 'CONFIANZA', 'SERENIDAD', 'ALEGRIA', 'ANSIEDAD', 'CURIOSIDAD', 'TRISTEZA', 'GRATITUD', 'TERNURA', 'ENTUSIASMO'] },
  { id: 1038, theme: 'Matematica', icon: '🔢', rows: 11, cols: 12, words: ['PORCENTAJE', 'GRAFICO', 'PROBLEMA', 'GEOMETRIA', 'CUADRADO', 'PERIMETRO', 'DIVISION', 'VARIABLE', 'MULTIPLICACION', 'CALCULO', 'VOLUMEN', 'TRIANGULO', 'MEDIDA', 'CIRCULO', 'FORMULA', 'FRACCION'] },
  { id: 1039, theme: 'Astronomia', icon: '🔭', rows: 11, cols: 12, words: ['COMETA', 'UNIVERSO', 'SUPERNOVA', 'TELESCOPIO', 'ASTEROIDE', 'SATELITE', 'ROTACION', 'METEORO', 'CONSTELACION', 'GALAXIA', 'GRAVEDAD', 'PLANETA', 'NEBULOSA', 'TRASLACION', 'ECLIPSE', 'ESTRELLA'] },
  { id: 1040, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['DEFORESTACION', 'COMPOST', 'CONTAMINACION', 'ENERGIA', 'EMISION', 'HABITAT', 'BIODIVERSIDAD', 'RENOVABLE', 'CONSERVACION', 'CLIMA', 'EXTINCION', 'ESPECIE', 'RECICLAJE', 'RESIDUO', 'AMBIENTE', 'SUSTENTABLE'] },
  { id: 1041, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RESIDUO', 'BIODIVERSIDAD', 'RECICLAJE', 'AMBIENTE', 'RENOVABLE', 'DEFORESTACION', 'CLIMA', 'HUELLA', 'ECOSISTEMA', 'ENERGIA', 'ESPECIE', 'EMISION', 'CONTAMINACION', 'CONSERVACION', 'HABITAT', 'SUSTENTABLE'] },
  { id: 1042, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CLIMA', 'RESIDUO', 'DEFORESTACION', 'BIODIVERSIDAD', 'RENOVABLE', 'ECOSISTEMA', 'HUELLA', 'EXTINCION', 'ESPECIE', 'AMBIENTE', 'HABITAT', 'SUSTENTABLE', 'COMPOST', 'CONTAMINACION', 'EMISION', 'CONSERVACION'] },
  { id: 1043, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RESIDUO', 'CONSERVACION', 'CONTAMINACION', 'CLIMA', 'SUSTENTABLE', 'DEFORESTACION', 'ENERGIA', 'HABITAT', 'HUELLA', 'ECOSISTEMA', 'EMISION', 'RENOVABLE', 'BIODIVERSIDAD', 'AMBIENTE', 'ESPECIE', 'EXTINCION'] },
  { id: 1044, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['SUSTENTABLE', 'DEFORESTACION', 'ESPECIE', 'ECOSISTEMA', 'COMPOST', 'AMBIENTE', 'BIODIVERSIDAD', 'RESIDUO', 'CONSERVACION', 'HABITAT', 'HUELLA', 'ENERGIA', 'CLIMA', 'CONTAMINACION', 'RENOVABLE', 'EXTINCION'] },
  { id: 1045, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['AMBIENTE', 'ENERGIA', 'ECOSISTEMA', 'RECICLAJE', 'COMPOST', 'EMISION', 'BIODIVERSIDAD', 'HABITAT', 'RESIDUO', 'EXTINCION', 'ESPECIE', 'RENOVABLE', 'HUELLA', 'CONTAMINACION', 'CONSERVACION', 'DEFORESTACION'] },
  { id: 1046, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ECOSISTEMA', 'EMISION', 'CLIMA', 'AMBIENTE', 'HUELLA', 'RENOVABLE', 'EXTINCION', 'RESIDUO', 'CONTAMINACION', 'SUSTENTABLE', 'DEFORESTACION', 'ENERGIA', 'CONSERVACION', 'ESPECIE', 'COMPOST', 'BIODIVERSIDAD'] },
  { id: 1047, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RESIDUO', 'HUELLA', 'ENERGIA', 'CONSERVACION', 'ESPECIE', 'DEFORESTACION', 'CLIMA', 'BIODIVERSIDAD', 'RECICLAJE', 'COMPOST', 'SUSTENTABLE', 'ECOSISTEMA', 'RENOVABLE', 'AMBIENTE', 'EMISION', 'CONTAMINACION'] },
  { id: 1048, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['BIODIVERSIDAD', 'CLIMA', 'EXTINCION', 'ECOSISTEMA', 'SUSTENTABLE', 'RESIDUO', 'RECICLAJE', 'CONTAMINACION', 'HUELLA', 'CONSERVACION', 'AMBIENTE', 'EMISION', 'HABITAT', 'ENERGIA', 'DEFORESTACION', 'ESPECIE'] },
  { id: 1049, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CLIMA', 'CONSERVACION', 'DEFORESTACION', 'ENERGIA', 'CONTAMINACION', 'BIODIVERSIDAD', 'AMBIENTE', 'ECOSISTEMA', 'EMISION', 'HUELLA', 'RESIDUO', 'SUSTENTABLE', 'RENOVABLE', 'HABITAT', 'EXTINCION', 'COMPOST'] },
  { id: 1050, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONTAMINACION', 'CONSERVACION', 'DEFORESTACION', 'ESPECIE', 'ENERGIA', 'HABITAT', 'CLIMA', 'RESIDUO', 'SUSTENTABLE', 'RENOVABLE', 'ECOSISTEMA', 'COMPOST', 'AMBIENTE', 'RECICLAJE', 'HUELLA', 'BIODIVERSIDAD'] },
  { id: 1051, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONSERVACION', 'ECOSISTEMA', 'RESIDUO', 'ENERGIA', 'EXTINCION', 'SUSTENTABLE', 'HUELLA', 'CLIMA', 'DEFORESTACION', 'COMPOST', 'BIODIVERSIDAD', 'CONTAMINACION', 'RECICLAJE', 'HABITAT', 'ESPECIE', 'AMBIENTE'] },
  { id: 1052, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['SUSTENTABLE', 'CONTAMINACION', 'ENERGIA', 'CONSERVACION', 'RENOVABLE', 'HUELLA', 'CLIMA', 'DEFORESTACION', 'COMPOST', 'ESPECIE', 'EMISION', 'BIODIVERSIDAD', 'HABITAT', 'AMBIENTE', 'ECOSISTEMA', 'EXTINCION'] },
  { id: 1053, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['AMBIENTE', 'CLIMA', 'COMPOST', 'RECICLAJE', 'BIODIVERSIDAD', 'EXTINCION', 'CONTAMINACION', 'SUSTENTABLE', 'HABITAT', 'ENERGIA', 'DEFORESTACION', 'ESPECIE', 'CONSERVACION', 'ECOSISTEMA', 'HUELLA', 'EMISION'] },
  { id: 1054, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONSERVACION', 'SUSTENTABLE', 'RENOVABLE', 'HUELLA', 'AMBIENTE', 'CLIMA', 'BIODIVERSIDAD', 'EMISION', 'HABITAT', 'ECOSISTEMA', 'ESPECIE', 'COMPOST', 'RESIDUO', 'DEFORESTACION', 'RECICLAJE', 'CONTAMINACION'] },
  { id: 1055, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RECICLAJE', 'SUSTENTABLE', 'RESIDUO', 'BIODIVERSIDAD', 'RENOVABLE', 'CONSERVACION', 'AMBIENTE', 'EMISION', 'ENERGIA', 'ECOSISTEMA', 'DEFORESTACION', 'HABITAT', 'CLIMA', 'COMPOST', 'CONTAMINACION', 'HUELLA'] },
  { id: 1056, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RENOVABLE', 'EMISION', 'AMBIENTE', 'CONSERVACION', 'DEFORESTACION', 'CONTAMINACION', 'SUSTENTABLE', 'ESPECIE', 'ENERGIA', 'HABITAT', 'ECOSISTEMA', 'HUELLA', 'RECICLAJE', 'BIODIVERSIDAD', 'COMPOST', 'CLIMA'] },
  { id: 1057, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONTAMINACION', 'RECICLAJE', 'COMPOST', 'AMBIENTE', 'EXTINCION', 'HABITAT', 'ESPECIE', 'BIODIVERSIDAD', 'EMISION', 'ENERGIA', 'DEFORESTACION', 'HUELLA', 'ECOSISTEMA', 'CONSERVACION', 'RESIDUO', 'RENOVABLE'] },
  { id: 1058, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['DEFORESTACION', 'CONSERVACION', 'RECICLAJE', 'CLIMA', 'COMPOST', 'SUSTENTABLE', 'ECOSISTEMA', 'EMISION', 'HUELLA', 'EXTINCION', 'BIODIVERSIDAD', 'RESIDUO', 'AMBIENTE', 'ESPECIE', 'HABITAT', 'CONTAMINACION'] },
  { id: 1059, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['COMPOST', 'ECOSISTEMA', 'CONTAMINACION', 'RESIDUO', 'HUELLA', 'EXTINCION', 'ESPECIE', 'DEFORESTACION', 'RECICLAJE', 'BIODIVERSIDAD', 'EMISION', 'CLIMA', 'CONSERVACION', 'ENERGIA', 'SUSTENTABLE', 'AMBIENTE'] },
  { id: 1060, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ESPECIE', 'COMPOST', 'ECOSISTEMA', 'CONSERVACION', 'HABITAT', 'EMISION', 'CONTAMINACION', 'SUSTENTABLE', 'RENOVABLE', 'DEFORESTACION', 'AMBIENTE', 'RECICLAJE', 'RESIDUO', 'CLIMA', 'HUELLA', 'BIODIVERSIDAD'] },
  { id: 1061, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['EMISION', 'BIODIVERSIDAD', 'SUSTENTABLE', 'EXTINCION', 'CONTAMINACION', 'COMPOST', 'CLIMA', 'RECICLAJE', 'ECOSISTEMA', 'AMBIENTE', 'HUELLA', 'CONSERVACION', 'DEFORESTACION', 'RESIDUO', 'HABITAT', 'ENERGIA'] },
  { id: 1062, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['COMPOST', 'HUELLA', 'CONTAMINACION', 'SUSTENTABLE', 'DEFORESTACION', 'CONSERVACION', 'ENERGIA', 'ESPECIE', 'RECICLAJE', 'RESIDUO', 'BIODIVERSIDAD', 'CLIMA', 'EMISION', 'AMBIENTE', 'ECOSISTEMA', 'EXTINCION'] },
  { id: 1063, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ECOSISTEMA', 'EMISION', 'DEFORESTACION', 'BIODIVERSIDAD', 'RENOVABLE', 'HUELLA', 'HABITAT', 'SUSTENTABLE', 'ESPECIE', 'CONTAMINACION', 'CLIMA', 'AMBIENTE', 'EXTINCION', 'COMPOST', 'CONSERVACION', 'RESIDUO'] },
  { id: 1064, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['DEFORESTACION', 'ENERGIA', 'AMBIENTE', 'CONSERVACION', 'SUSTENTABLE', 'EMISION', 'RESIDUO', 'BIODIVERSIDAD', 'CONTAMINACION', 'CLIMA', 'RENOVABLE', 'RECICLAJE', 'HUELLA', 'ESPECIE', 'ECOSISTEMA', 'HABITAT'] },
  { id: 1065, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['EXTINCION', 'COMPOST', 'ECOSISTEMA', 'RENOVABLE', 'EMISION', 'AMBIENTE', 'RESIDUO', 'RECICLAJE', 'BIODIVERSIDAD', 'HABITAT', 'ESPECIE', 'ENERGIA', 'CONTAMINACION', 'CONSERVACION', 'HUELLA', 'DEFORESTACION'] },
  { id: 1066, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ENERGIA', 'SUSTENTABLE', 'AMBIENTE', 'HUELLA', 'BIODIVERSIDAD', 'DEFORESTACION', 'COMPOST', 'CLIMA', 'EMISION', 'CONSERVACION', 'RECICLAJE', 'RESIDUO', 'RENOVABLE', 'ECOSISTEMA', 'CONTAMINACION', 'HABITAT'] },
  { id: 1067, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONTAMINACION', 'RESIDUO', 'CLIMA', 'ENERGIA', 'EMISION', 'DEFORESTACION', 'ECOSISTEMA', 'CONSERVACION', 'AMBIENTE', 'EXTINCION', 'ESPECIE', 'SUSTENTABLE', 'COMPOST', 'HUELLA', 'RECICLAJE', 'BIODIVERSIDAD'] },
  { id: 1068, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['HABITAT', 'RESIDUO', 'BIODIVERSIDAD', 'RECICLAJE', 'DEFORESTACION', 'EMISION', 'EXTINCION', 'HUELLA', 'SUSTENTABLE', 'ECOSISTEMA', 'CONSERVACION', 'AMBIENTE', 'COMPOST', 'CONTAMINACION', 'ENERGIA', 'CLIMA'] },
  { id: 1069, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RECICLAJE', 'CONSERVACION', 'COMPOST', 'CONTAMINACION', 'RENOVABLE', 'BIODIVERSIDAD', 'RESIDUO', 'HABITAT', 'DEFORESTACION', 'CLIMA', 'ESPECIE', 'SUSTENTABLE', 'AMBIENTE', 'EMISION', 'ENERGIA', 'EXTINCION'] },
  { id: 1070, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['BIODIVERSIDAD', 'HABITAT', 'RECICLAJE', 'ENERGIA', 'RESIDUO', 'CONSERVACION', 'ESPECIE', 'DEFORESTACION', 'EXTINCION', 'COMPOST', 'HUELLA', 'RENOVABLE', 'CONTAMINACION', 'ECOSISTEMA', 'EMISION', 'AMBIENTE'] },
  { id: 1071, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RENOVABLE', 'BIODIVERSIDAD', 'ENERGIA', 'EXTINCION', 'ECOSISTEMA', 'AMBIENTE', 'SUSTENTABLE', 'RESIDUO', 'COMPOST', 'CONTAMINACION', 'DEFORESTACION', 'CLIMA', 'ESPECIE', 'CONSERVACION', 'EMISION', 'HUELLA'] },
  { id: 1072, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONSERVACION', 'CLIMA', 'DEFORESTACION', 'CONTAMINACION', 'BIODIVERSIDAD', 'COMPOST', 'HUELLA', 'RESIDUO', 'EXTINCION', 'ECOSISTEMA', 'ENERGIA', 'AMBIENTE', 'EMISION', 'SUSTENTABLE', 'ESPECIE', 'RENOVABLE'] },
  { id: 1073, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ENERGIA', 'CONSERVACION', 'HABITAT', 'DEFORESTACION', 'ESPECIE', 'BIODIVERSIDAD', 'RENOVABLE', 'RESIDUO', 'EXTINCION', 'COMPOST', 'CLIMA', 'HUELLA', 'CONTAMINACION', 'AMBIENTE', 'SUSTENTABLE', 'ECOSISTEMA'] },
  { id: 1074, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CLIMA', 'CONSERVACION', 'BIODIVERSIDAD', 'DEFORESTACION', 'EMISION', 'SUSTENTABLE', 'AMBIENTE', 'RESIDUO', 'ESPECIE', 'EXTINCION', 'HUELLA', 'ECOSISTEMA', 'RECICLAJE', 'HABITAT', 'CONTAMINACION', 'COMPOST'] },
  { id: 1075, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RESIDUO', 'CLIMA', 'BIODIVERSIDAD', 'ENERGIA', 'AMBIENTE', 'RENOVABLE', 'ESPECIE', 'RECICLAJE', 'COMPOST', 'ECOSISTEMA', 'SUSTENTABLE', 'EMISION', 'CONSERVACION', 'HUELLA', 'CONTAMINACION', 'DEFORESTACION'] },
  { id: 1076, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['DEFORESTACION', 'HUELLA', 'AMBIENTE', 'CLIMA', 'CONSERVACION', 'BIODIVERSIDAD', 'ECOSISTEMA', 'EMISION', 'RECICLAJE', 'CONTAMINACION', 'HABITAT', 'RESIDUO', 'EXTINCION', 'ESPECIE', 'SUSTENTABLE', 'ENERGIA'] },
  { id: 1077, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ECOSISTEMA', 'ESPECIE', 'COMPOST', 'HABITAT', 'EXTINCION', 'CONSERVACION', 'EMISION', 'DEFORESTACION', 'ENERGIA', 'CLIMA', 'AMBIENTE', 'CONTAMINACION', 'HUELLA', 'SUSTENTABLE', 'BIODIVERSIDAD', 'RECICLAJE'] },
  { id: 1078, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['EXTINCION', 'BIODIVERSIDAD', 'ENERGIA', 'CONTAMINACION', 'CONSERVACION', 'COMPOST', 'HABITAT', 'CLIMA', 'SUSTENTABLE', 'DEFORESTACION', 'RENOVABLE', 'AMBIENTE', 'EMISION', 'ESPECIE', 'RESIDUO', 'RECICLAJE'] },
  { id: 1079, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CLIMA', 'RECICLAJE', 'EXTINCION', 'DEFORESTACION', 'SUSTENTABLE', 'ENERGIA', 'ECOSISTEMA', 'BIODIVERSIDAD', 'ESPECIE', 'COMPOST', 'CONSERVACION', 'CONTAMINACION', 'AMBIENTE', 'RESIDUO', 'HUELLA', 'HABITAT'] },
  { id: 1080, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONTAMINACION', 'AMBIENTE', 'ECOSISTEMA', 'RECICLAJE', 'RESIDUO', 'HABITAT', 'HUELLA', 'EMISION', 'DEFORESTACION', 'SUSTENTABLE', 'EXTINCION', 'CLIMA', 'ENERGIA', 'BIODIVERSIDAD', 'COMPOST', 'CONSERVACION'] },
  { id: 1081, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['COMPOST', 'EMISION', 'EXTINCION', 'RENOVABLE', 'CLIMA', 'DEFORESTACION', 'AMBIENTE', 'HABITAT', 'CONTAMINACION', 'RESIDUO', 'BIODIVERSIDAD', 'ECOSISTEMA', 'HUELLA', 'ENERGIA', 'CONSERVACION', 'SUSTENTABLE'] },
  { id: 1082, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['HUELLA', 'DEFORESTACION', 'RENOVABLE', 'RESIDUO', 'SUSTENTABLE', 'CLIMA', 'COMPOST', 'ESPECIE', 'CONSERVACION', 'AMBIENTE', 'ENERGIA', 'ECOSISTEMA', 'CONTAMINACION', 'RECICLAJE', 'EMISION', 'BIODIVERSIDAD'] },
  { id: 1083, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CLIMA', 'RESIDUO', 'SUSTENTABLE', 'DEFORESTACION', 'EMISION', 'HABITAT', 'ENERGIA', 'ESPECIE', 'CONTAMINACION', 'AMBIENTE', 'BIODIVERSIDAD', 'RENOVABLE', 'RECICLAJE', 'EXTINCION', 'CONSERVACION', 'COMPOST'] },
  { id: 1084, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RENOVABLE', 'COMPOST', 'EMISION', 'CLIMA', 'CONTAMINACION', 'RESIDUO', 'ECOSISTEMA', 'BIODIVERSIDAD', 'SUSTENTABLE', 'CONSERVACION', 'HABITAT', 'HUELLA', 'EXTINCION', 'DEFORESTACION', 'AMBIENTE', 'ESPECIE'] },
  { id: 1085, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ENERGIA', 'RENOVABLE', 'COMPOST', 'ECOSISTEMA', 'DEFORESTACION', 'AMBIENTE', 'HABITAT', 'CONSERVACION', 'EMISION', 'RECICLAJE', 'HUELLA', 'RESIDUO', 'ESPECIE', 'CONTAMINACION', 'EXTINCION', 'BIODIVERSIDAD'] },
  { id: 1086, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ECOSISTEMA', 'CONSERVACION', 'ENERGIA', 'COMPOST', 'CLIMA', 'AMBIENTE', 'RESIDUO', 'EMISION', 'EXTINCION', 'BIODIVERSIDAD', 'RENOVABLE', 'DEFORESTACION', 'ESPECIE', 'HUELLA', 'SUSTENTABLE', 'CONTAMINACION'] },
  { id: 1087, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['AMBIENTE', 'ESPECIE', 'DEFORESTACION', 'CLIMA', 'ECOSISTEMA', 'BIODIVERSIDAD', 'EMISION', 'HUELLA', 'SUSTENTABLE', 'HABITAT', 'CONSERVACION', 'CONTAMINACION', 'ENERGIA', 'RESIDUO', 'RENOVABLE', 'RECICLAJE'] },
  { id: 1088, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ENERGIA', 'AMBIENTE', 'BIODIVERSIDAD', 'COMPOST', 'CONSERVACION', 'CONTAMINACION', 'ESPECIE', 'DEFORESTACION', 'CLIMA', 'RENOVABLE', 'RESIDUO', 'SUSTENTABLE', 'EXTINCION', 'EMISION', 'RECICLAJE', 'HABITAT'] },
  { id: 1089, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['SUSTENTABLE', 'ECOSISTEMA', 'CONSERVACION', 'CLIMA', 'HUELLA', 'COMPOST', 'EMISION', 'DEFORESTACION', 'HABITAT', 'AMBIENTE', 'BIODIVERSIDAD', 'EXTINCION', 'ENERGIA', 'CONTAMINACION', 'RECICLAJE', 'RESIDUO'] },
  { id: 1090, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONSERVACION', 'AMBIENTE', 'SUSTENTABLE', 'COMPOST', 'CONTAMINACION', 'RECICLAJE', 'EXTINCION', 'HABITAT', 'DEFORESTACION', 'RESIDUO', 'BIODIVERSIDAD', 'ENERGIA', 'ESPECIE', 'RENOVABLE', 'CLIMA', 'EMISION'] },
  { id: 1091, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['DEFORESTACION', 'ESPECIE', 'CLIMA', 'HUELLA', 'CONTAMINACION', 'COMPOST', 'SUSTENTABLE', 'BIODIVERSIDAD', 'EMISION', 'ECOSISTEMA', 'AMBIENTE', 'CONSERVACION', 'RECICLAJE', 'RESIDUO', 'ENERGIA', 'RENOVABLE'] },
  { id: 1092, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['HUELLA', 'CLIMA', 'RECICLAJE', 'AMBIENTE', 'RENOVABLE', 'ECOSISTEMA', 'RESIDUO', 'HABITAT', 'SUSTENTABLE', 'COMPOST', 'BIODIVERSIDAD', 'ENERGIA', 'CONTAMINACION', 'DEFORESTACION', 'EMISION', 'CONSERVACION'] },
  { id: 1093, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONTAMINACION', 'HUELLA', 'HABITAT', 'DEFORESTACION', 'BIODIVERSIDAD', 'CONSERVACION', 'ESPECIE', 'CLIMA', 'EXTINCION', 'COMPOST', 'ENERGIA', 'RECICLAJE', 'AMBIENTE', 'SUSTENTABLE', 'ECOSISTEMA', 'RESIDUO'] },
  { id: 1094, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ECOSISTEMA', 'BIODIVERSIDAD', 'AMBIENTE', 'ENERGIA', 'HUELLA', 'SUSTENTABLE', 'CONTAMINACION', 'HABITAT', 'ESPECIE', 'CONSERVACION', 'RECICLAJE', 'EXTINCION', 'DEFORESTACION', 'RESIDUO', 'CLIMA', 'EMISION'] },
  { id: 1095, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RECICLAJE', 'CONSERVACION', 'ENERGIA', 'CONTAMINACION', 'ECOSISTEMA', 'COMPOST', 'HABITAT', 'EXTINCION', 'HUELLA', 'SUSTENTABLE', 'ESPECIE', 'DEFORESTACION', 'AMBIENTE', 'BIODIVERSIDAD', 'CLIMA', 'EMISION'] },
  { id: 1096, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RESIDUO', 'BIODIVERSIDAD', 'ENERGIA', 'HABITAT', 'COMPOST', 'EMISION', 'AMBIENTE', 'CLIMA', 'DEFORESTACION', 'EXTINCION', 'HUELLA', 'CONTAMINACION', 'SUSTENTABLE', 'CONSERVACION', 'ECOSISTEMA', 'RENOVABLE'] },
  { id: 1097, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONTAMINACION', 'RENOVABLE', 'BIODIVERSIDAD', 'CONSERVACION', 'DEFORESTACION', 'CLIMA', 'EMISION', 'HABITAT', 'HUELLA', 'RESIDUO', 'ESPECIE', 'ECOSISTEMA', 'AMBIENTE', 'SUSTENTABLE', 'RECICLAJE', 'COMPOST'] },
  { id: 1098, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['EMISION', 'ENERGIA', 'CONTAMINACION', 'COMPOST', 'ECOSISTEMA', 'CLIMA', 'CONSERVACION', 'HUELLA', 'AMBIENTE', 'RESIDUO', 'RECICLAJE', 'BIODIVERSIDAD', 'ESPECIE', 'DEFORESTACION', 'SUSTENTABLE', 'RENOVABLE'] },
  { id: 1099, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ENERGIA', 'ECOSISTEMA', 'AMBIENTE', 'BIODIVERSIDAD', 'DEFORESTACION', 'CLIMA', 'COMPOST', 'CONSERVACION', 'ESPECIE', 'EMISION', 'RESIDUO', 'CONTAMINACION', 'SUSTENTABLE', 'EXTINCION', 'HUELLA', 'RENOVABLE'] },
  { id: 1100, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ECOSISTEMA', 'RENOVABLE', 'ESPECIE', 'HUELLA', 'CONTAMINACION', 'RESIDUO', 'EMISION', 'DEFORESTACION', 'SUSTENTABLE', 'BIODIVERSIDAD', 'AMBIENTE', 'CONSERVACION', 'EXTINCION', 'ENERGIA', 'HABITAT', 'CLIMA'] },
  { id: 1101, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['BIODIVERSIDAD', 'HUELLA', 'COMPOST', 'DEFORESTACION', 'HABITAT', 'RENOVABLE', 'RECICLAJE', 'CONSERVACION', 'EMISION', 'ESPECIE', 'AMBIENTE', 'EXTINCION', 'RESIDUO', 'ECOSISTEMA', 'CONTAMINACION', 'ENERGIA'] },
  { id: 1102, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['AMBIENTE', 'CONTAMINACION', 'BIODIVERSIDAD', 'HUELLA', 'COMPOST', 'RECICLAJE', 'CONSERVACION', 'RESIDUO', 'ENERGIA', 'DEFORESTACION', 'EMISION', 'RENOVABLE', 'CLIMA', 'ECOSISTEMA', 'ESPECIE', 'SUSTENTABLE'] },
  { id: 1103, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RENOVABLE', 'CONTAMINACION', 'ENERGIA', 'AMBIENTE', 'BIODIVERSIDAD', 'CLIMA', 'RECICLAJE', 'ESPECIE', 'ECOSISTEMA', 'SUSTENTABLE', 'DEFORESTACION', 'COMPOST', 'CONSERVACION', 'HUELLA', 'RESIDUO', 'EMISION'] },
  { id: 1104, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['AMBIENTE', 'HUELLA', 'ENERGIA', 'DEFORESTACION', 'SUSTENTABLE', 'EXTINCION', 'CONSERVACION', 'ECOSISTEMA', 'COMPOST', 'CLIMA', 'RESIDUO', 'HABITAT', 'EMISION', 'CONTAMINACION', 'RENOVABLE', 'BIODIVERSIDAD'] },
  { id: 1105, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONSERVACION', 'COMPOST', 'SUSTENTABLE', 'HUELLA', 'DEFORESTACION', 'EXTINCION', 'CONTAMINACION', 'BIODIVERSIDAD', 'RESIDUO', 'CLIMA', 'ECOSISTEMA', 'ENERGIA', 'AMBIENTE', 'ESPECIE', 'RECICLAJE', 'EMISION'] },
  { id: 1106, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['DEFORESTACION', 'CONSERVACION', 'AMBIENTE', 'CONTAMINACION', 'COMPOST', 'EMISION', 'ENERGIA', 'RECICLAJE', 'HABITAT', 'EXTINCION', 'SUSTENTABLE', 'RENOVABLE', 'ESPECIE', 'BIODIVERSIDAD', 'RESIDUO', 'CLIMA'] },
  { id: 1107, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RESIDUO', 'CLIMA', 'ENERGIA', 'HUELLA', 'SUSTENTABLE', 'RECICLAJE', 'HABITAT', 'COMPOST', 'DEFORESTACION', 'CONSERVACION', 'BIODIVERSIDAD', 'ECOSISTEMA', 'AMBIENTE', 'ESPECIE', 'CONTAMINACION', 'RENOVABLE'] },
  { id: 1108, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['EXTINCION', 'EMISION', 'SUSTENTABLE', 'ECOSISTEMA', 'CONSERVACION', 'AMBIENTE', 'ESPECIE', 'HUELLA', 'RESIDUO', 'COMPOST', 'CONTAMINACION', 'RECICLAJE', 'DEFORESTACION', 'CLIMA', 'ENERGIA', 'BIODIVERSIDAD'] },
  { id: 1109, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['EMISION', 'CLIMA', 'RECICLAJE', 'COMPOST', 'DEFORESTACION', 'HABITAT', 'RESIDUO', 'BIODIVERSIDAD', 'SUSTENTABLE', 'EXTINCION', 'CONSERVACION', 'ENERGIA', 'AMBIENTE', 'RENOVABLE', 'CONTAMINACION', 'ESPECIE'] },
  { id: 1110, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CLIMA', 'ENERGIA', 'CONTAMINACION', 'EXTINCION', 'RESIDUO', 'BIODIVERSIDAD', 'HABITAT', 'SUSTENTABLE', 'EMISION', 'RECICLAJE', 'COMPOST', 'AMBIENTE', 'CONSERVACION', 'HUELLA', 'ECOSISTEMA', 'DEFORESTACION'] },
  { id: 1111, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RECICLAJE', 'COMPOST', 'CLIMA', 'RENOVABLE', 'EXTINCION', 'CONTAMINACION', 'RESIDUO', 'HABITAT', 'EMISION', 'DEFORESTACION', 'ESPECIE', 'CONSERVACION', 'BIODIVERSIDAD', 'SUSTENTABLE', 'AMBIENTE', 'ENERGIA'] },
  { id: 1112, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONSERVACION', 'BIODIVERSIDAD', 'RESIDUO', 'RENOVABLE', 'ECOSISTEMA', 'EMISION', 'DEFORESTACION', 'HABITAT', 'HUELLA', 'SUSTENTABLE', 'EXTINCION', 'AMBIENTE', 'ESPECIE', 'CONTAMINACION', 'COMPOST', 'CLIMA'] },
  { id: 1113, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['AMBIENTE', 'HUELLA', 'SUSTENTABLE', 'EXTINCION', 'RESIDUO', 'EMISION', 'COMPOST', 'RENOVABLE', 'ECOSISTEMA', 'BIODIVERSIDAD', 'DEFORESTACION', 'CONTAMINACION', 'CONSERVACION', 'CLIMA', 'ESPECIE', 'HABITAT'] },
  { id: 1114, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['HABITAT', 'ESPECIE', 'COMPOST', 'RENOVABLE', 'RECICLAJE', 'HUELLA', 'ENERGIA', 'CONSERVACION', 'RESIDUO', 'DEFORESTACION', 'AMBIENTE', 'SUSTENTABLE', 'ECOSISTEMA', 'CLIMA', 'BIODIVERSIDAD', 'CONTAMINACION'] },
  { id: 1115, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ENERGIA', 'RESIDUO', 'CONTAMINACION', 'CONSERVACION', 'BIODIVERSIDAD', 'CLIMA', 'RECICLAJE', 'ESPECIE', 'HUELLA', 'DEFORESTACION', 'ECOSISTEMA', 'AMBIENTE', 'COMPOST', 'SUSTENTABLE', 'RENOVABLE', 'HABITAT'] },
  { id: 1116, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['DEFORESTACION', 'COMPOST', 'RESIDUO', 'CLIMA', 'EMISION', 'ENERGIA', 'ESPECIE', 'HUELLA', 'CONTAMINACION', 'BIODIVERSIDAD', 'SUSTENTABLE', 'ECOSISTEMA', 'EXTINCION', 'RENOVABLE', 'AMBIENTE', 'CONSERVACION'] },
  { id: 1117, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ECOSISTEMA', 'DEFORESTACION', 'ENERGIA', 'SUSTENTABLE', 'BIODIVERSIDAD', 'HUELLA', 'CLIMA', 'RENOVABLE', 'EMISION', 'EXTINCION', 'AMBIENTE', 'CONTAMINACION', 'CONSERVACION', 'ESPECIE', 'RESIDUO', 'HABITAT'] },
  { id: 1118, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['HABITAT', 'RECICLAJE', 'EXTINCION', 'ENERGIA', 'CLIMA', 'SUSTENTABLE', 'ECOSISTEMA', 'ESPECIE', 'CONTAMINACION', 'AMBIENTE', 'EMISION', 'DEFORESTACION', 'BIODIVERSIDAD', 'HUELLA', 'RESIDUO', 'CONSERVACION'] },
  { id: 1119, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONTAMINACION', 'CONSERVACION', 'DEFORESTACION', 'ECOSISTEMA', 'AMBIENTE', 'RECICLAJE', 'RENOVABLE', 'COMPOST', 'CLIMA', 'HABITAT', 'SUSTENTABLE', 'ENERGIA', 'RESIDUO', 'BIODIVERSIDAD', 'ESPECIE', 'HUELLA'] },
  { id: 1120, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['EXTINCION', 'DEFORESTACION', 'ESPECIE', 'BIODIVERSIDAD', 'RECICLAJE', 'CONSERVACION', 'HABITAT', 'AMBIENTE', 'COMPOST', 'CLIMA', 'SUSTENTABLE', 'RENOVABLE', 'RESIDUO', 'ENERGIA', 'CONTAMINACION', 'EMISION'] },
  { id: 1121, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ESPECIE', 'EXTINCION', 'RESIDUO', 'ECOSISTEMA', 'DEFORESTACION', 'HUELLA', 'RECICLAJE', 'AMBIENTE', 'CONSERVACION', 'HABITAT', 'BIODIVERSIDAD', 'COMPOST', 'SUSTENTABLE', 'EMISION', 'CONTAMINACION', 'CLIMA'] },
  { id: 1122, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['COMPOST', 'RESIDUO', 'AMBIENTE', 'ECOSISTEMA', 'CONSERVACION', 'BIODIVERSIDAD', 'SUSTENTABLE', 'ENERGIA', 'EMISION', 'CLIMA', 'DEFORESTACION', 'HABITAT', 'RECICLAJE', 'RENOVABLE', 'CONTAMINACION', 'HUELLA'] },
  { id: 1123, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['HABITAT', 'SUSTENTABLE', 'ENERGIA', 'BIODIVERSIDAD', 'CONTAMINACION', 'HUELLA', 'RESIDUO', 'RECICLAJE', 'AMBIENTE', 'DEFORESTACION', 'ESPECIE', 'ECOSISTEMA', 'EXTINCION', 'CONSERVACION', 'CLIMA', 'EMISION'] },
  { id: 1124, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['EMISION', 'BIODIVERSIDAD', 'COMPOST', 'CONSERVACION', 'HABITAT', 'ESPECIE', 'HUELLA', 'DEFORESTACION', 'ENERGIA', 'AMBIENTE', 'ECOSISTEMA', 'SUSTENTABLE', 'CONTAMINACION', 'CLIMA', 'EXTINCION', 'RECICLAJE'] },
  { id: 1125, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['HUELLA', 'CONTAMINACION', 'ENERGIA', 'HABITAT', 'AMBIENTE', 'RESIDUO', 'COMPOST', 'DEFORESTACION', 'BIODIVERSIDAD', 'ECOSISTEMA', 'EXTINCION', 'CONSERVACION', 'SUSTENTABLE', 'CLIMA', 'ESPECIE', 'RECICLAJE'] },
  { id: 1126, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CLIMA', 'EMISION', 'COMPOST', 'CONTAMINACION', 'ESPECIE', 'BIODIVERSIDAD', 'DEFORESTACION', 'ENERGIA', 'CONSERVACION', 'EXTINCION', 'RESIDUO', 'AMBIENTE', 'RECICLAJE', 'RENOVABLE', 'HABITAT', 'SUSTENTABLE'] },
  { id: 1127, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ENERGIA', 'EXTINCION', 'CONTAMINACION', 'RESIDUO', 'ESPECIE', 'DEFORESTACION', 'CONSERVACION', 'COMPOST', 'RENOVABLE', 'HUELLA', 'EMISION', 'AMBIENTE', 'CLIMA', 'BIODIVERSIDAD', 'SUSTENTABLE', 'ECOSISTEMA'] },
  { id: 1128, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RESIDUO', 'RENOVABLE', 'SUSTENTABLE', 'ENERGIA', 'CLIMA', 'COMPOST', 'HUELLA', 'AMBIENTE', 'EMISION', 'DEFORESTACION', 'RECICLAJE', 'CONTAMINACION', 'ESPECIE', 'BIODIVERSIDAD', 'CONSERVACION', 'ECOSISTEMA'] },
  { id: 1129, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['BIODIVERSIDAD', 'ECOSISTEMA', 'RESIDUO', 'RENOVABLE', 'COMPOST', 'DEFORESTACION', 'CONSERVACION', 'CONTAMINACION', 'RECICLAJE', 'ESPECIE', 'EXTINCION', 'HUELLA', 'HABITAT', 'EMISION', 'AMBIENTE', 'ENERGIA'] },
  { id: 1130, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['SUSTENTABLE', 'ENERGIA', 'BIODIVERSIDAD', 'EXTINCION', 'CLIMA', 'HABITAT', 'RENOVABLE', 'HUELLA', 'ECOSISTEMA', 'COMPOST', 'EMISION', 'AMBIENTE', 'RESIDUO', 'CONTAMINACION', 'CONSERVACION', 'DEFORESTACION'] },
  { id: 1131, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CLIMA', 'ENERGIA', 'AMBIENTE', 'BIODIVERSIDAD', 'HABITAT', 'ESPECIE', 'RESIDUO', 'CONTAMINACION', 'SUSTENTABLE', 'RENOVABLE', 'DEFORESTACION', 'CONSERVACION', 'HUELLA', 'ECOSISTEMA', 'EMISION', 'RECICLAJE'] },
  { id: 1132, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RENOVABLE', 'DEFORESTACION', 'SUSTENTABLE', 'RESIDUO', 'COMPOST', 'EXTINCION', 'EMISION', 'BIODIVERSIDAD', 'HABITAT', 'CONSERVACION', 'ECOSISTEMA', 'ENERGIA', 'CLIMA', 'AMBIENTE', 'HUELLA', 'CONTAMINACION'] },
  { id: 1133, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ESPECIE', 'ENERGIA', 'BIODIVERSIDAD', 'HUELLA', 'AMBIENTE', 'EMISION', 'RENOVABLE', 'EXTINCION', 'COMPOST', 'CONSERVACION', 'RESIDUO', 'DEFORESTACION', 'CLIMA', 'CONTAMINACION', 'ECOSISTEMA', 'SUSTENTABLE'] },
  { id: 1134, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['COMPOST', 'CONSERVACION', 'SUSTENTABLE', 'CLIMA', 'RECICLAJE', 'AMBIENTE', 'DEFORESTACION', 'HABITAT', 'EXTINCION', 'RESIDUO', 'CONTAMINACION', 'ECOSISTEMA', 'EMISION', 'ESPECIE', 'BIODIVERSIDAD', 'HUELLA'] },
  { id: 1135, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ENERGIA', 'EXTINCION', 'CONTAMINACION', 'ECOSISTEMA', 'SUSTENTABLE', 'HABITAT', 'AMBIENTE', 'BIODIVERSIDAD', 'HUELLA', 'COMPOST', 'CLIMA', 'CONSERVACION', 'RESIDUO', 'ESPECIE', 'RECICLAJE', 'DEFORESTACION'] },
  { id: 1136, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['COMPOST', 'SUSTENTABLE', 'RECICLAJE', 'EMISION', 'BIODIVERSIDAD', 'AMBIENTE', 'DEFORESTACION', 'ESPECIE', 'ECOSISTEMA', 'CONTAMINACION', 'HUELLA', 'CONSERVACION', 'ENERGIA', 'EXTINCION', 'HABITAT', 'CLIMA'] },
  { id: 1137, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RESIDUO', 'BIODIVERSIDAD', 'AMBIENTE', 'EXTINCION', 'CONTAMINACION', 'CONSERVACION', 'DEFORESTACION', 'EMISION', 'RENOVABLE', 'HABITAT', 'ESPECIE', 'RECICLAJE', 'ECOSISTEMA', 'ENERGIA', 'COMPOST', 'HUELLA'] },
  { id: 1138, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['DEFORESTACION', 'ECOSISTEMA', 'SUSTENTABLE', 'EXTINCION', 'CONSERVACION', 'HUELLA', 'BIODIVERSIDAD', 'ENERGIA', 'RENOVABLE', 'CLIMA', 'EMISION', 'ESPECIE', 'HABITAT', 'CONTAMINACION', 'AMBIENTE', 'COMPOST'] },
  { id: 1139, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CONSERVACION', 'HUELLA', 'CONTAMINACION', 'RESIDUO', 'EMISION', 'BIODIVERSIDAD', 'CLIMA', 'DEFORESTACION', 'RECICLAJE', 'SUSTENTABLE', 'RENOVABLE', 'HABITAT', 'COMPOST', 'ENERGIA', 'ECOSISTEMA', 'AMBIENTE'] },
  { id: 1140, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RESIDUO', 'CONTAMINACION', 'HABITAT', 'COMPOST', 'RENOVABLE', 'BIODIVERSIDAD', 'AMBIENTE', 'HUELLA', 'ECOSISTEMA', 'SUSTENTABLE', 'ESPECIE', 'CLIMA', 'EMISION', 'DEFORESTACION', 'EXTINCION', 'CONSERVACION'] },
  { id: 1141, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['RENOVABLE', 'ESPECIE', 'EXTINCION', 'CLIMA', 'CONSERVACION', 'HUELLA', 'SUSTENTABLE', 'EMISION', 'BIODIVERSIDAD', 'ENERGIA', 'ECOSISTEMA', 'CONTAMINACION', 'DEFORESTACION', 'HABITAT', 'COMPOST', 'AMBIENTE'] },
  { id: 1142, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['AMBIENTE', 'HABITAT', 'SUSTENTABLE', 'ECOSISTEMA', 'EXTINCION', 'COMPOST', 'EMISION', 'BIODIVERSIDAD', 'CONTAMINACION', 'CLIMA', 'CONSERVACION', 'DEFORESTACION', 'HUELLA', 'RESIDUO', 'RECICLAJE', 'ENERGIA'] },
  { id: 1143, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ENERGIA', 'CLIMA', 'HUELLA', 'AMBIENTE', 'EXTINCION', 'DEFORESTACION', 'CONSERVACION', 'COMPOST', 'RESIDUO', 'HABITAT', 'EMISION', 'CONTAMINACION', 'SUSTENTABLE', 'ECOSISTEMA', 'RENOVABLE', 'BIODIVERSIDAD'] },
  { id: 1144, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['DEFORESTACION', 'RENOVABLE', 'RECICLAJE', 'EMISION', 'RESIDUO', 'ENERGIA', 'CONTAMINACION', 'CLIMA', 'CONSERVACION', 'ESPECIE', 'HUELLA', 'AMBIENTE', 'ECOSISTEMA', 'HABITAT', 'SUSTENTABLE', 'BIODIVERSIDAD'] },
  { id: 1145, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ECOSISTEMA', 'COMPOST', 'AMBIENTE', 'ENERGIA', 'SUSTENTABLE', 'EMISION', 'HABITAT', 'RECICLAJE', 'CONSERVACION', 'CLIMA', 'DEFORESTACION', 'ESPECIE', 'HUELLA', 'EXTINCION', 'CONTAMINACION', 'BIODIVERSIDAD'] },
  { id: 1146, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['HABITAT', 'ECOSISTEMA', 'AMBIENTE', 'CONSERVACION', 'RENOVABLE', 'ENERGIA', 'EXTINCION', 'RECICLAJE', 'EMISION', 'ESPECIE', 'HUELLA', 'RESIDUO', 'CONTAMINACION', 'BIODIVERSIDAD', 'DEFORESTACION', 'COMPOST'] },
  { id: 1147, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['SUSTENTABLE', 'RENOVABLE', 'CLIMA', 'BIODIVERSIDAD', 'CONSERVACION', 'AMBIENTE', 'EMISION', 'COMPOST', 'ECOSISTEMA', 'CONTAMINACION', 'HUELLA', 'DEFORESTACION', 'RESIDUO', 'ESPECIE', 'ENERGIA', 'EXTINCION'] },
  { id: 1148, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['ECOSISTEMA', 'CONTAMINACION', 'AMBIENTE', 'COMPOST', 'EXTINCION', 'ESPECIE', 'RECICLAJE', 'ENERGIA', 'HUELLA', 'DEFORESTACION', 'EMISION', 'HABITAT', 'BIODIVERSIDAD', 'RENOVABLE', 'CONSERVACION', 'RESIDUO'] },
  { id: 1149, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['CLIMA', 'COMPOST', 'ECOSISTEMA', 'DEFORESTACION', 'RENOVABLE', 'CONSERVACION', 'HUELLA', 'RECICLAJE', 'SUSTENTABLE', 'ENERGIA', 'AMBIENTE', 'BIODIVERSIDAD', 'ESPECIE', 'CONTAMINACION', 'HABITAT', 'RESIDUO'] },
  { id: 1150, theme: 'Ecologia', icon: '🌍', rows: 12, cols: 12, words: ['SUSTENTABLE', 'RESIDUO', 'HABITAT', 'CLIMA', 'RECICLAJE', 'CONTAMINACION', 'ENERGIA', 'RENOVABLE', 'ECOSISTEMA', 'BIODIVERSIDAD', 'CONSERVACION', 'DEFORESTACION', 'EMISION', 'COMPOST', 'AMBIENTE', 'HUELLA'] },
];

/* Tramos ("mundos") usados para agrupar la pantalla de inicio */
const LEVEL_TIERS = [
  { label: 'Iniciación · 3×3 a 5×5',  from: 1,   to: 10  },
  { label: 'Intermedio · 6×6',        from: 11,  to: 40  },
  { label: 'Avanzado · 7×7',          from: 41,  to: 80  },
  { label: 'Experto · 8×8',           from: 81,  to: 120 },
  { label: 'Maestro · 9×9',           from: 121, to: 150 },
  { label: 'Mundo 6×7', from: 151, to: 262 },
  { label: 'Mundo 7×8', from: 263, to: 373 },
  { label: 'Mundo 8×9', from: 374, to: 484 },
  { label: 'Mundo 9×10', from: 485, to: 595 },
  { label: 'Mundo 10×10', from: 596, to: 706 },
  { label: 'Mundo 10×11', from: 707, to: 817 },
  { label: 'Mundo 11×11', from: 818, to: 928 },
  { label: 'Mundo 11×12', from: 929, to: 1039 },
  { label: 'Mundo 12×12', from: 1040, to: 1150 },
];

/* ---------------------------------------------------------
   2) GENERACIÓN DETERMINÍSTICA DE LA GRILLA Y EL CAMINO
   No hay generación aleatoria en tiempo real: el camino se
   arma con un recorrido "serpiente" (boustrophedon) que
   garantiza que cada celda es adyacente a la siguiente y que
   se cubre el 100% de la grilla, exactamente como un hilo
   que va y viene por la tela. Sobre ese camino fijo se
   vuelcan, en orden, las letras de las palabras del nivel.
   --------------------------------------------------------- */
function buildSnakePath(rows, cols) {
  const path = [];
  for (let r = 0; r < rows; r++) {
    if (r % 2 === 0) {
      for (let c = 0; c < cols; c++) path.push([r, c]);
    } else {
      for (let c = cols - 1; c >= 0; c--) path.push([r, c]);
    }
  }
  return path;
}

function buildLevel(raw) {
  const path = buildSnakePath(raw.rows, raw.cols);
  const letters = raw.words.join('');
  if (letters.length !== raw.rows * raw.cols) {
    console.error(`Nivel ${raw.id}: las palabras no completan la grilla (${letters.length} vs ${raw.rows * raw.cols})`);
  }
  const grid = Array.from({ length: raw.rows }, () => Array(raw.cols).fill(''));
  path.forEach(([r, c], i) => { grid[r][c] = letters[i] || ''; });

  let cursor = 0;
  const wordRanges = raw.words.map((w) => {
    const cells = path.slice(cursor, cursor + w.length);
    cursor += w.length;
    return { word: w, cells };
  });

  return { ...raw, grid, path, wordRanges };
}

const LEVELS = LEVELS_DATA.map(buildLevel);

/* ---------------------------------------------------------
   2b) RETO DIARIO
   Todos los jugadores ven el mismo nivel el mismo día porque
   se elige a partir de la fecha (día transcurrido desde epoch,
   en UTC), no de forma aleatoria. Reutiliza los 150 niveles ya
   armados, así no requiere contenido extra ni backend.
   --------------------------------------------------------- */
function getEpochDay(date = new Date()) {
  return Math.floor(date.getTime() / 86400000); // días desde 1/1/1970 UTC
}
function getDailyLevel() {
  const day = getEpochDay();
  const id = (day % LEVELS.length) + 1;
  return LEVELS.find((l) => l.id === id);
}

/* ---------------------------------------------------------
   3) PERSISTENCIA (créditos, niveles desbloqueados, estrellas)
   --------------------------------------------------------- */
const SAVE_KEY = 'hilados_save_v1';

function defaultSave() {
  return { credits: 50, unlocked: 1, stars: {}, daily: { lastDay: null, streak: 0 } };
}
function loadSave() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!raw) return defaultSave();
    return { ...defaultSave(), ...raw, daily: { ...defaultSave().daily, ...(raw.daily || {}) } };
  } catch (e) {
    return defaultSave();
  }
}
function persistSave() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

let save = loadSave();

/* ---------------------------------------------------------
   4) ESTADO DE PARTIDA EN CURSO
   --------------------------------------------------------- */
let game = null; // se arma al abrir un nivel

function newGameState(level, isDaily = false) {
  return {
    level,
    isDaily,
    foundWords: new Set(),      // palabras ya descubiertas
    usedCells: new Set(),       // "r,c" ya usadas por una palabra encontrada
    selection: [],              // celdas seleccionadas en el arrastre actual
    selecting: false,
    hintsUsed: 0,
    wordStatus: {},             // palabra -> 'found' | 'hint' | 'auto' (para el resumen compartible)
    lastStars: 0,
  };
}

/* ---------------------------------------------------------
   5) REFERENCIAS DOM
   --------------------------------------------------------- */
const screenHome = document.getElementById('screen-home');
const screenGame = document.getElementById('screen-game');
const levelGridEl = document.getElementById('level-grid');
const homeCreditsValue = document.getElementById('home-credits-value');
const gameCreditsValue = document.getElementById('game-credits-value');
const gameLevelTag = document.getElementById('game-level-tag');
const gameTheme = document.getElementById('game-theme');
const clueStrip = document.getElementById('clue-strip');
const boardEl = document.getElementById('board');
const gridEl = document.getElementById('grid');
const threadOverlay = document.getElementById('thread-overlay');
const btnBack = document.getElementById('btn-back');
const btnHint = document.getElementById('btn-hint');
const btnAd = document.getElementById('btn-ad');
const hintCostLabel = document.getElementById('hint-cost-label');
const modalAd = document.getElementById('modal-ad');
const modalNoCredits = document.getElementById('modal-no-credits');
const modalWin = document.getElementById('modal-win');
const dailyThemeEl = document.getElementById('daily-theme');
const dailyStreakEl = document.getElementById('daily-streak');
const dailyPlayBtn = document.getElementById('daily-play-btn');
const winShareBtn = document.getElementById('win-share');
const winDailyStreakEl = document.getElementById('win-daily-streak');
const toastEl = document.getElementById('toast');

const HINT_COST = 15;
const AUTO_HINT_MULT = 2; // si ya no quedan letras por revelar, autocompleta y cuesta el doble

/* ---------------------------------------------------------
   6) PANTALLA DE INICIO
   --------------------------------------------------------- */
function renderHome() {
  homeCreditsValue.textContent = save.credits;
  renderDailyCard();
  levelGridEl.innerHTML = '';

  LEVEL_TIERS.forEach((tier) => {
    const tierLevels = LEVELS.filter((l) => l.id >= tier.from && l.id <= tier.to);
    const tierDone = tierLevels.filter((l) => save.stars[l.id]).length;

    const details = document.createElement('details');
    details.className = 'tier';
    // el tramo que contiene el próximo nivel a jugar arranca abierto
    details.open = save.unlocked >= tier.from && save.unlocked <= tier.to;

    const summary = document.createElement('summary');
    summary.innerHTML = `
      <span class="tier-title">${tier.label}</span>
      <span class="tier-progress">${tierDone}/${tierLevels.length}</span>
    `;
    details.appendChild(summary);

    const grid = document.createElement('div');
    grid.className = 'level-grid';

    tierLevels.forEach((lvl) => {
      const locked = lvl.id > save.unlocked;
      const starCount = save.stars[lvl.id] || 0;
      const card = document.createElement('button');
      card.className = 'level-card' + (locked ? ' locked' : '');
      card.disabled = locked;
      card.innerHTML = `
        <span class="lc-num">Nivel ${lvl.id}</span>
        ${locked
          ? '<span class="lc-lock">🔒</span>'
          : `<span class="lc-icon">${lvl.icon}</span>`}
        <span class="lc-theme">${lvl.theme}</span>
        <span class="lc-stars">${locked ? '' : '★'.repeat(starCount) + '☆'.repeat(3 - starCount)}</span>
      `;
      if (!locked) card.addEventListener('click', () => openLevel(lvl.id));
      grid.appendChild(card);
    });

    details.appendChild(grid);
    levelGridEl.appendChild(details);
  });
}

document.getElementById('reset-progress').addEventListener('click', () => {
  if (confirm('¿Reiniciar todo el progreso y los créditos?')) {
    save = defaultSave();
    persistSave();
    renderHome();
  }
});

function renderDailyCard() {
  const lvl = getDailyLevel();
  const doneToday = save.daily.lastDay === getEpochDay();
  dailyThemeEl.textContent = `${lvl.icon} ${lvl.theme}`;
  const streak = save.daily.streak;
  dailyStreakEl.textContent = `🔥 Racha: ${streak} día${streak === 1 ? '' : 's'}`;
  dailyPlayBtn.textContent = doneToday ? 'Completado ✓' : 'Jugar';
  dailyPlayBtn.classList.toggle('done', doneToday);
}
dailyPlayBtn.addEventListener('click', () => openLevel(getDailyLevel().id, { isDaily: true }));

/* ---------------------------------------------------------
   7) ABRIR / CONSTRUIR LA PANTALLA DE JUEGO
   --------------------------------------------------------- */
function openLevel(id, opts = {}) {
  const level = LEVELS.find((l) => l.id === id);
  game = newGameState(level, !!opts.isDaily);
  screenHome.classList.add('hidden');
  screenGame.classList.remove('hidden');
  gameLevelTag.textContent = game.isDaily ? '🔥 Reto diario' : `Nivel ${level.id}`;
  gameTheme.textContent = `${level.icon} ${level.theme}`;
  updateCreditsUI();
  buildClueStrip();
  buildGridDOM();
  updateHintButtonUI();
}

btnBack.addEventListener('click', () => {
  screenGame.classList.add('hidden');
  screenHome.classList.remove('hidden');
  renderHome();
});

function updateCreditsUI() {
  homeCreditsValue.textContent = save.credits;
  gameCreditsValue.textContent = save.credits;
}

/* --- Tira de pistas (palabras objetivo con su longitud) --- */
function buildClueStrip() {
  clueStrip.innerHTML = '';
  game.level.wordRanges.forEach((wr, idx) => {
    const chip = document.createElement('div');
    chip.className = 'clue-chip';
    chip.dataset.wordIdx = idx;
    chip.textContent = blankFor(wr.word);
    clueStrip.appendChild(chip);
  });
}
function blankFor(word, revealFirst) {
  return word.split('').map((ch, i) => (i === 0 && revealFirst ? ch : '·')).join(' ');
}
function refreshClueStrip() {
  const chips = clueStrip.querySelectorAll('.clue-chip');
  game.level.wordRanges.forEach((wr, idx) => {
    const chip = chips[idx];
    const found = game.foundWords.has(wr.word);
    chip.classList.toggle('found', found);
    if (found) {
      chip.textContent = wr.word;
    } else if (wr.revealed) {
      chip.textContent = blankFor(wr.word, true);
    } else {
      chip.textContent = blankFor(wr.word, false);
    }
  });
}

/* --- Grilla de letras --- */
function buildGridDOM() {
  const { rows, cols, grid } = game.level;
  gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  gridEl.style.gap = cols >= 9 ? '3px' : cols >= 7 ? '4px' : cols >= 6 ? '5px' : '6px';
  gridEl.classList.toggle('grid-dense', cols >= 7);
  gridEl.innerHTML = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.textContent = grid[r][c];
      gridEl.appendChild(cell);
    }
  }
  threadOverlay.innerHTML = '';
  // Espera a que el layout se asiente para poder medir posiciones reales
  requestAnimationFrame(syncOverlaySize);
  window.addEventListener('resize', syncOverlaySize);
}

function syncOverlaySize() {
  if (!game) return;
  const rect = gridEl.getBoundingClientRect();
  threadOverlay.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
  threadOverlay.style.width = rect.width + 'px';
  threadOverlay.style.height = rect.height + 'px';
}

function cellEl(r, c) {
  return gridEl.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
}
function cellCenter(r, c) {
  const el = cellEl(r, c);
  const gridRect = gridEl.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - gridRect.left + elRect.width / 2,
    y: elRect.top - gridRect.top + elRect.height / 2,
  };
}

/* ---------------------------------------------------------
   8) INTERACCIÓN: ARRASTRAR PARA CONECTAR LETRAS
   Funciona igual con mouse y con dedo gracias a Pointer Events.
   --------------------------------------------------------- */
let liveLineEl = null;

gridEl.addEventListener('pointerdown', (e) => {
  const cell = e.target.closest('.cell');
  if (!cell) return;
  const r = +cell.dataset.r, c = +cell.dataset.c;
  if (isUsed(r, c)) return;
  game.selecting = true;
  game.selection = [[r, c]];
  paintSelection();
  e.preventDefault();
});

document.addEventListener('pointermove', (e) => {
  if (!game || !game.selecting) return;
  const target = document.elementFromPoint(e.clientX, e.clientY);
  const cell = target && target.closest && target.closest('.cell');
  if (!cell || cell.closest('#grid') !== gridEl) return;
  const r = +cell.dataset.r, c = +cell.dataset.c;
  handlePointerOverCell(r, c);
});

document.addEventListener('pointerup', () => {
  if (!game || !game.selecting) return;
  game.selecting = false;
  evaluateSelection();
});

function handlePointerOverCell(r, c) {
  const sel = game.selection;
  const last = sel[sel.length - 1];
  if (last[0] === r && last[1] === c) return; // misma celda

  // permitir "deshacer" arrastrando hacia atrás
  if (sel.length > 1) {
    const prev = sel[sel.length - 2];
    if (prev[0] === r && prev[1] === c) {
      sel.pop();
      paintSelection();
      return;
    }
  }

  if (isUsed(r, c)) return;
  if (sel.some(([sr, sc]) => sr === r && sc === c)) return; // ya elegida
  if (!areAdjacent(last, [r, c])) return;

  sel.push([r, c]);
  paintSelection();
}

function areAdjacent(a, b) {
  const dr = Math.abs(a[0] - b[0]);
  const dc = Math.abs(a[1] - b[1]);
  return dr <= 1 && dc <= 1 && !(dr === 0 && dc === 0);
}
function isUsed(r, c) {
  return game.usedCells.has(`${r},${c}`);
}

function paintSelection() {
  gridEl.querySelectorAll('.cell.selected').forEach((el) => el.classList.remove('selected'));
  game.selection.forEach(([r, c]) => cellEl(r, c).classList.add('selected'));
  drawLiveThread();
}

function drawLiveThread() {
  if (liveLineEl) liveLineEl.remove();
  if (game.selection.length < 2) { liveLineEl = null; return; }
  const points = game.selection.map(([r, c]) => cellCenter(r, c));
  liveLineEl = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  liveLineEl.setAttribute('points', points.map((p) => `${p.x},${p.y}`).join(' '));
  liveLineEl.setAttribute('class', 'thread-line live');
  threadOverlay.appendChild(liveLineEl);
}

/* ---------------------------------------------------------
   9) EVALUAR LA PALABRA ARMADA
   --------------------------------------------------------- */
function evaluateSelection() {
  const sel = game.selection;
  const word = sel.map(([r, c]) => game.level.grid[r][c]).join('');
  const reversed = word.split('').reverse().join('');

  const match = game.level.wordRanges.find(
    (wr) => !game.foundWords.has(wr.word) && (wr.word === word || wr.word === reversed)
  );

  if (match) {
    markWordFound(match, sel);
  } else if (sel.length > 0) {
    flashInvalid(sel);
  }

  game.selection = [];
  gridEl.querySelectorAll('.cell.selected').forEach((el) => el.classList.remove('selected'));
  if (liveLineEl) { liveLineEl.remove(); liveLineEl = null; }
}

function flashInvalid(sel) {
  sel.forEach(([r, c]) => {
    const el = cellEl(r, c);
    el.classList.add('invalid');
    setTimeout(() => el.classList.remove('invalid'), 350);
  });
}

function markWordFound(match, selectedCells, method = 'drag') {
  match.cells.forEach(([r, c]) => game.usedCells.add(`${r},${c}`));
  game.foundWords.add(match.word);
  game.wordStatus[match.word] = method === 'auto' ? 'auto' : (match.revealed ? 'hint' : 'found');

  // pintar celdas como encontradas (usamos el orden real del camino, no
  // el de la selección, para que el hilo quede prolijo)
  match.cells.forEach(([r, c]) => cellEl(r, c).classList.add('found'));

  drawPermanentThread(match.cells);
  refreshClueStrip();

  if (game.foundWords.size === game.level.wordRanges.length) {
    setTimeout(completeLevel, 350);
  }
}

function drawPermanentThread(cells) {
  const points = cells.map(([r, c]) => cellCenter(r, c));
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  line.setAttribute('points', points.map((p) => `${p.x},${p.y}`).join(' '));
  line.setAttribute('class', 'thread-line');
  threadOverlay.appendChild(line);
}

/* ---------------------------------------------------------
   10) PISTAS (créditos o "anuncio" simulado)
   --------------------------------------------------------- */
function nextUnfoundWord() {
  return game.level.wordRanges.find((wr) => !game.foundWords.has(wr.word));
}

function updateHintButtonUI() {
  hintCostLabel.textContent = `${HINT_COST} créditos`;
  btnHint.disabled = game.foundWords.size === game.level.wordRanges.length;
}

btnHint.addEventListener('click', () => {
  if (game.foundWords.size === game.level.wordRanges.length) return;
  if (save.credits < HINT_COST) {
    modalNoCredits.classList.remove('hidden');
    return;
  }
  save.credits -= HINT_COST;
  persistSave();
  updateCreditsUI();
  giveHint();
});

btnAd.addEventListener('click', () => {
  modalAd.classList.remove('hidden');
  setTimeout(() => {
    modalAd.classList.add('hidden');
    giveHint();
  }, 1800);
});

document.getElementById('nc-watch-ad').addEventListener('click', () => {
  modalNoCredits.classList.add('hidden');
  btnAd.click();
});
document.getElementById('nc-close').addEventListener('click', () => {
  modalNoCredits.classList.add('hidden');
});

// La pista revela la primera letra de la próxima palabra sin descubrir.
// Si esa palabra ya tiene su primera letra revelada, la pista la
// autocompleta directamente (para que la pista siempre sirva de algo).
function giveHint() {
  const target = nextUnfoundWord();
  if (!target) return;
  game.hintsUsed++;

  if (!target.revealed) {
    target.revealed = true;
    const [r, c] = target.cells[0];
    const el = cellEl(r, c);
    el.classList.add('hinted');
    setTimeout(() => el.classList.remove('hinted'), 2800);
    refreshClueStrip();
  } else {
    markWordFound(target, target.cells, 'auto');
  }
  updateHintButtonUI();
}

/* ---------------------------------------------------------
   11) COMPLETAR NIVEL
   --------------------------------------------------------- */
function updateDailyStreak() {
  const today = getEpochDay();
  if (save.daily.lastDay === today) {
    // ya se había completado hoy (re-jugado); la racha no cambia
  } else if (save.daily.lastDay === today - 1) {
    save.daily.streak += 1;
  } else {
    save.daily.streak = 1;
  }
  save.daily.lastDay = today;
}

function completeLevel() {
  const level = game.level;
  const hints = game.hintsUsed;
  const stars = hints === 0 ? 3 : hints <= 2 ? 2 : 1;
  const dailyBonus = game.isDaily ? 10 : 0;
  const earned = 15 + stars * 5 + dailyBonus;
  game.lastStars = stars;

  save.credits += earned;

  if (game.isDaily) {
    updateDailyStreak();
  } else {
    save.stars[level.id] = Math.max(save.stars[level.id] || 0, stars);
    if (level.id === save.unlocked && level.id < LEVELS.length) {
      save.unlocked = level.id + 1;
    }
  }
  persistSave();
  updateCreditsUI();

  document.getElementById('win-stars').textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
  document.getElementById('win-summary').textContent =
    hints === 0 ? 'Tejiste todas las palabras sin usar pistas.' : `Tejiste todas las palabras usando ${hints} pista(s).`;
  document.getElementById('win-credits-earned').textContent = `+${earned} créditos`;

  if (game.isDaily) {
    winDailyStreakEl.textContent = `🔥 Racha del reto diario: ${save.daily.streak} día${save.daily.streak === 1 ? '' : 's'}`;
    winDailyStreakEl.classList.remove('hidden');
  } else {
    winDailyStreakEl.classList.add('hidden');
  }

  const nextBtn = document.getElementById('win-next');
  const showNext = !game.isDaily && level.id < LEVELS.length;
  nextBtn.style.visibility = showNext ? 'visible' : 'hidden';

  modalWin.classList.remove('hidden');
}

/* --- Resumen compartible tipo "Wordle" --- */
function buildShareText() {
  const lvl = game.level;
  const squares = lvl.wordRanges
    .map((wr) => {
      const status = game.wordStatus[wr.word];
      if (status === 'auto') return '🟦';
      if (status === 'hint') return '🟨';
      return '🟩';
    })
    .join('');
  const starsStr = '★'.repeat(game.lastStars) + '☆'.repeat(3 - game.lastStars);
  const header = game.isDaily ? '🧵 Hilados — Reto diario' : `🧵 Hilados — Nivel ${lvl.id} · ${lvl.theme}`;
  const streakLine = game.isDaily ? `\n🔥 Racha: ${save.daily.streak} día${save.daily.streak === 1 ? '' : 's'}` : '';
  return `${header}\n${squares}  ${starsStr}${streakLine}\n¡Jugá vos también a Hilados! 🧵`;
}

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.remove('hidden');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toastEl.classList.add('hidden'), 2200);
}

winShareBtn.addEventListener('click', async () => {
  const text = buildShareText();
  if (navigator.share) {
    try {
      await navigator.share({ text });
    } catch (e) {
      // el usuario canceló el share sheet; no hacemos nada
    }
  } else if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      showToast('¡Resultado copiado! Pegalo donde quieras 🧵');
    } catch (e) {
      showToast('No se pudo copiar. Probá de nuevo.');
    }
  } else {
    showToast('Compartir no está disponible en este navegador.');
  }
});

document.getElementById('win-menu').addEventListener('click', () => {
  modalWin.classList.add('hidden');
  screenGame.classList.add('hidden');
  screenHome.classList.remove('hidden');
  renderHome();
});
document.getElementById('win-next').addEventListener('click', () => {
  modalWin.classList.add('hidden');
  const nextId = game.level.id + 1;
  if (nextId <= LEVELS.length) openLevel(nextId);
});

/* ---------------------------------------------------------
   12) ARRANQUE
   --------------------------------------------------------- */
renderHome();
