const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Acustica = require('./models/Acustica');

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    importarCSV();
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
  });

const archivoCSV = path.join(
  'C:/Users/marce/OneDrive - Universidad de Castilla-La Mancha/INGENIERÍA INFORMÁTICA 24-25/SISTEMAS DE INFORMACION UBICUOS/datos_hpe/datos_hpe',
  'Anthem_CTC_ContaminacionAcustica.csv'
);

function parsearFloat(valor) {
  const limpio = valor?.toString().replace(',', '.').trim();
  const numero = parseFloat(limpio);
  return isNaN(numero) ? null : numero;
}

function importarCSV() {
  const registros = [];
  let total = 0;
  let ignorados = 0;

  fs.createReadStream(archivoCSV)
    .pipe(csv({ separator: ';', mapHeaders: ({ header }) => header.trim() }))
    .on('data', (row) => {
      total++;

      const ld = parsearFloat(row.Ld);
      const le = parsearFloat(row.Le);
      const ln = parsearFloat(row.Ln);
      const laeq24 = parsearFloat(row.LAeq24);

      // Solo guardar si los 4 valores son válidos
      if (row.Fecha && row.NMT && row.Nombre && ld !== null && le !== null && ln !== null && laeq24 !== null) {
        registros.push({
          fecha: row.Fecha,
          estacion: row.NMT,
          nombre: row.Nombre,
          ld,
          le,
          ln,
          laeq24
        });
      } else {
        ignorados++;
      }
    })
    .on('end', async () => {
      try {
        console.log(`Leídas ${total} filas. Insertando ${registros.length} registros válidos. Ignorados: ${ignorados}`);
        await Acustica.insertMany(registros);
        console.log(`Importación completa`);
        mongoose.connection.close();
      } catch (err) {
        console.error('Error al guardar los datos en MongoDB:', err);
      }
    });
}
