const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Bicicleta = require('./models/BicicletaDisponibilidad');

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
  'Anthem_CTC_Bicicletas_Disponibilidad.csv'
);

function parsearFloat(valor) {
  const limpio = valor?.toString().replace(/\./g, '').replace(',', '.').trim();
  const numero = parseFloat(limpio);
  return isNaN(numero) ? null : numero;
}

function importarCSV() {
  const registros = [];
  let total = 0;
  let ignorados = 0;
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
        dia: row['DIA'],
        horasUso: parsearFloat(row['HORAS_TOTALES_USOS_BICICLETAS']),
        horasDisponibles: parsearFloat(row['HORAS_TOTALES_DISPONIBILIDAD_BICICLETAS_EN _ANCLAJES']),
        horasServicio: parsearFloat(row['TOTAL_HORAS_SERVICIO_BICICLETAS']),
        mediaDisponibles: parsearFloat(row['MEDIA_BICICLETAS_DISPONIBLES']),
        usosAnual: parsearFloat(row['USOS_ABONADO_ANUAL']),
        usosOcasional: parsearFloat(row['USOS_ABONADO_OCASIONAL']),
        totalUsos: parsearFloat(row['TOTAL_USOS'])
      };

      if (registro.dia && registro.totalUsos !== null) {
        registros.push(registro);
      } else {
        ignorados++;
      }
    })
    .on('end', async () => {
      try {
        console.log(`Leídas ${total} filas. Insertando ${registros.length} registros válidos. Ignorados: ${ignorados}`);
        await Bicicleta.insertMany(registros);
        console.log('Importación completa');
        mongoose.connection.close();
      } catch (err) {
        console.error('Error al guardar en MongoDB:', err);
      }
    });
}
