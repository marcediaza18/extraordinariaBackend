const axios = require('axios');
const { faker } = require('@faker-js/faker');
const yargs = require('yargs/yargs')(process.argv.slice(2));

// Lista de distritos de Madrid con su correspondiente nombre
const distritos = [
  'Centro', 'Chamartín', 'Fuencarral-El Pardo', 'Retiro', 'Argüelles',
  'Moncloa-Aravaca', 'Tetuán', 'Salamanca', 'Chamberí', 'Usera',
  'Latina', 'Carabanchel', 'Villaverde', 'Vicalvaro', 'Puente de Vallecas',
  'Moratalaz', 'San Blas-Canillejas', 'Hortaleza', 'Ciudad Lineal', 'Barajas', 'Vicálvaro'
];

// Lista de tipos de accidentes (tomado del CSV)
const tiposAccidente = [
  'Colisión fronto-lateral', 'Choque contra obstáculo fijo', 'Alcance', 'Colisión lateral', 'Solo salida de la vía', 'Colisión frontal', 'Caída', 'Vuelco', 'Atropello a persona', 'Colisión múltiple', 'Otro', 'Despeñamiento', 'Atropello a animal'
];

// Configuración de parámetros desde la consola
const argv = yargs
  .option('type', {
    alias: 't',
    description: 'Tipo de datos a enviar',
    choices: ['accidentes', 'bicicletas', 'acustica', 'trafico'],
    demandOption: true
  })
  .option('frequency', {
    alias: 'f',
    description: 'Frecuencia en milisegundos para la inserción de datos',
    default: 5000
  })
  .help()
  .argv;

// Generar una fecha aleatoria en el año 2052
function generarFechaAleatoria2052() {
  const año = 2052;
  const mes = faker.number.int({ min: 1, max: 12 });
  const dia = faker.number.int({ min: 1, max: 31 });

  if (mes === 2 && dia > 28) {
    return `${dia}/02/2052`; // Febrero tiene 28 días en 2052
  }

  if ([4, 6, 9, 11].includes(mes) && dia > 30) {
    return `${dia}/0${mes}/2052`; // Los meses con 30 días
  }

  return `${dia}/0${mes}/2052`; // Formato DD/MM/2052
}

// Generar una fecha aleatoria en el año 2052 (mes-año)
function generarFechaAleatoriames2052() {
  const año = 2052;
  const mes = faker.number.int({ min: 1, max: 12 });
  return `${mes.toString().padStart(2, '0')}-${año}`;
}

// Generar datos aleatorios para acústica
function generarDatosAcustica() {
  const ld = faker.number.int({ min: 40, max: 80 });
  const le = faker.number.int({ min: 40, max: 80 });
  const ln = faker.number.int({ min: 40, max: 80 });
  const laeq24 = (ld + le + ln) / 3; // Media de ld, le y ln

  // Generar la estación con el formato NMT-xx
  const estacion = `NMT-${faker.number.int({ min: 1, max: 86 }).toString().padStart(2, '0')}`;

  return {
    ld,
    le,
    ln,
    laeq24,
    estacion,
    fecha: generarFechaAleatoriames2052()
  };
}

// Generar hora aleatoria en formato HH:mm:ss
function generarHoraAleatoria() {
  const hora = faker.number.int({ min: 0, max: 23 });
  const minuto = faker.number.int({ min: 0, max: 59 });
  const segundo = faker.number.int({ min: 0, max: 59 });
  return `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}:${segundo.toString().padStart(2, '0')}`;
}

// Generar coordenadas dentro de Madrid
function generarCoordenadasMadrid() {
  const latitud = faker.number.float({ min: 40.3, max: 40.6 });  // Latitud dentro de Madrid
  const longitud = faker.number.float({ min: -3.9, max: -3.7 });  // Longitud dentro de Madrid
  return { latitud, longitud };
}

// Generar tipo de tráfico aleatorio (M30 o URB)
function generarTipo() {
  return faker.helpers.arrayElement(['M30', 'URB']);
}

// Generar distrito aleatorio (número entre 1 y 21) y nombre correspondiente
function generarDistrito() {
  const distritoNum = faker.number.int({ min: 1, max: 21 });
  const distritoNombre = distritos[distritoNum - 1]; // El nombre correspondiente al número
  return { distritoNum, distritoNombre };
}

// Generar datos aleatorios para los distintos tipos
function generarDatos(tipo) {
  const usosAnual = faker.number.int({ min: 0, max: 20000 });
  const usosOcasional = faker.number.int({ min: 0, max: 500 });
  const totalUsos = usosAnual + usosOcasional; // Sumar usosAnual y usosOcasional para obtener totalUsos

  const { latitud, longitud } = generarCoordenadasMadrid(); // Generar coordenadas dentro de Madrid
  const tipoTráfico = generarTipo(); // M30 o URB
  const { distritoNum, distritoNombre } = generarDistrito(); // Generar distrito y nombre correspondiente

  const data = {
    accidentes: {
      id: faker.string.uuid(), // ID aleatorio
      expediente: faker.string.uuid(), // Expediente aleatorio
      tipoAccidente: faker.helpers.arrayElement(tiposAccidente), // Tipo de accidente aleatorio
      distrito: faker.helpers.arrayElement(distritos), // Distrito aleatorio de Madrid
      fecha: generarFechaAleatoria2052(), // Fecha aleatoria en 2052
      hora: generarHoraAleatoria(), // Hora aleatoria
      gravedad: faker.helpers.arrayElement(['Leve', 'Grave', 'Muy grave']) // Gravedad aleatoria
    },
    bicicletas: {
      dia: generarFechaAleatoria2052(),
      totalUsos: totalUsos,
      mediaDisponibles: faker.number.int({ min: 50, max: 500 }),
      usosAnual: usosAnual,
      usosOcasional: usosOcasional
    },
    acustica: generarDatosAcustica(), // Llamada a la función que genera los datos de acústica
    trafico: {
      id: faker.string.uuid(),
      nombre: distritoNombre, // Nombre del distrito
      tipo: tipoTráfico, // M30 o URB
      distrito: distritoNum, // Número del distrito (1-21)
      latitud: latitud, // Latitud dentro de Madrid
      longitud: longitud, // Longitud dentro de Madrid
      intensidadMediaDiaria: faker.number.int({ min: 1000, max: 5000 }),
      velocidadMedia: faker.number.int({ min: 30, max: 80 })
    }
  };

  return data[tipo];
}

// Inyección de datos simulados cada `frequency` milisegundos
function inyectarDatos() {
  const datosSimulados = generarDatos(argv.type);
  axios.post(`http://localhost:4000/api/${argv.type}`, datosSimulados)
    .then(response => {
      console.log(`Datos de tipo ${argv.type} enviados:`, datosSimulados);
    })
    .catch(error => {
      console.error('Error al enviar los datos:', error);
    });
}

// Ejecutar la inyección periódica
setInterval(inyectarDatos, argv.frequency);
