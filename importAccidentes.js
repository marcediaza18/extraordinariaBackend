const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Accidente = require('./models/Accidente');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    importarCSV();
  })
  .catch(err => {
    console.error('Error de conexión:', err);
  });

const archivoCSV = path.join(
  'C:/Users/marce/OneDrive - Universidad de Castilla-La Mancha/INGENIERÍA INFORMÁTICA 24-25/SISTEMAS DE INFORMACION UBICUOS/datos_hpe/datos_hpe',
  'Anthem_CTC_Accidentalidad.csv'
);

function limpiar(campo) {
  return campo?.toString().trim();
}

function importarCSV() {
  const registros = [];
  let total = 0;
  let ignorados = 0;
  let mostrado = false;

  fs.createReadStream(archivoCSV)
    .pipe(csv({ separator: ';', mapHeaders: ({ header }) => header.trim().toLowerCase().replace(/ /g, '_') }))
    .on('data', (row) => {
      total++;

      if (!mostrado) {
        console.log('Primera fila:', row);
        mostrado = true;
      }

      const registro = {
        expediente: limpiar(row['num_expediente']),
        fecha: limpiar(row['fecha']),
        hora: limpiar(row['hora']),
        calle: limpiar(row['localizacion']),
        numero: limpiar(row['numero']),
        distrito: limpiar(row['distrito']),
        tipoAccidente: limpiar(row['tipo_accidente']),
        estadoMeteorologico: limpiar(row['estado_meteorológico']),
        tipoVehiculo: limpiar(row['tipo_vehiculo']),
        tipoPersona: limpiar(row['tipo_persona']),
        tramoEdad: limpiar(row['rango_edad']),
        sexo: limpiar(row['sexo']),
        lesividad: limpiar(row['lesividad'])
      };

      if (registro.expediente && registro.fecha) {
        registros.push(registro);
      } else {
        ignorados++;
      }
    })
    .on('end', async () => {
      try {
        console.log(`Leídas ${total} filas. Insertando ${registros.length} registros válidos. Ignorados: ${ignorados}`);
        await Accidente.insertMany(registros);
        console.log('Importación completa');
        mongoose.connection.close();
      } catch (err) {
        console.error('Error al guardar en MongoDB:', err);
      }
    });
}
