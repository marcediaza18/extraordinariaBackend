const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Trafico = require('./models/Trafico');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    importarCSV();
  })
  .catch(err => {
    console.error('Error de conexión:', err);
  });

const archivoCSV = path.join(
  'C:/Users/marce/OneDrive - Universidad de Castilla-La Mancha/INGENIERÍA INFORMÁTICA 24-25/SISTEMAS DE INFORMACION UBICUOS/datos_hpe/datos_hpe/Ubicaciones',
  'Anthem_CTC_PuntoMedidaTrafico.csv'
);

function parsearFloat(valor) {
  if (!valor) return null;
  const limpio = valor.toString().replace(',', '.').trim();
  const num = parseFloat(limpio);
  return isNaN(num) ? null : num;
}

function importarCSV() {
  const registros = [];
  let total = 0;
  let mostrado = false;

  fs.createReadStream(archivoCSV)
    .pipe(csv({ separator: ';', mapHeaders: ({ header }) => header.trim() }))
    .on('data', (row) => {
      total++;

      if (!mostrado) {
        console.log('Primera fila:', row);
        mostrado = true;
      }

      const registro = {
        id: row.id,
        nombre: row.nombre,
        tipo: row.tipo_elem,
        distrito: row.distrito,
        latitud: parsearFloat(row.latitud),
        longitud: parsearFloat(row.longitud),
        intensidadMediaDiaria: null, // no disponible en este CSV
        velocidadMedia: null          // no disponible en este CSV
      };

      registros.push(registro);
    })
    .on('end', async () => {
      try {
        console.log(`Leídas ${total} filas. Insertando ${registros.length} registros válidos.`);
        await Trafico.insertMany(registros);
        console.log('Importación completa');
        mongoose.connection.close();
      } catch (err) {
        console.error('Error al guardar en MongoDB:', err);
      }
    });
}
