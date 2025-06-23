const axios = require('axios');
const { faker } = require('@faker-js/faker');
const yargs = require('yargs/yargs')(process.argv.slice(2));

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
  // Año fijo 2052
  const año = 2052;
  
  // Mes aleatorio entre 1 y 12
  const mes = faker.number.int({ min: 1, max: 12 });

  // Día aleatorio dependiendo del mes
  const dia = faker.number.int({ min: 1, max: 31 });
  
  // Corregir los días para evitar fechas inválidas (febrero, meses con 30 días)
  if (mes === 2 && dia > 28) {
    return `${dia}/02/2052`; // Febrero tiene 28 días en 2052
  }
  
  if ([4, 6, 9, 11].includes(mes) && dia > 30) {
    return `${dia}/0${mes}/2052`; // Los meses con 30 días
  }

  return `${dia}/0${mes}/2052`; // Formato DD/MM/2052
}

// Generar datos aleatorios
function generarDatos(tipo) {
  const usosAnual = faker.number.int({ min: 0, max: 20000 });
  const usosOcasional = faker.number.int({ min: 0, max: 500 });
  const totalUsos = usosAnual + usosOcasional; // Sumar usosAnual y usosOcasional para obtener totalUsos

  const data = {
    accidentes: {
      id: faker.string.uuid(),
      tipo_accidente: faker.word.noun(),
      localizacion: faker.location.city(),
      fecha: generarFechaAleatoria2052(), // Usamos la nueva función
      gravedad: faker.helpers.arrayElement(['Leve', 'Grave', 'Muy grave'])
    },
    bicicletas: {
      dia: generarFechaAleatoria2052(), // Usamos la nueva función
      totalUsos: totalUsos, // Usamos la suma de usosAnual + usosOcasional
      mediaDisponibles: faker.number.int({ min: 50, max: 500 }),
      usosAnual: usosAnual,
      usosOcasional: usosOcasional
    },
    acustica: {
      estacion: faker.word.noun(),
      laeq24: faker.number.int({ min: 45, max: 90 })
    },
    trafico: {
      id: faker.string.uuid(),
      nombre: faker.location.city(),
      tipo: faker.word.noun(),
      latitud: faker.location.latitude(),
      longitud: faker.location.longitude()
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
