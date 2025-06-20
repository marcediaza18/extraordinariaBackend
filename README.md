
# Smart City Dashboard - Backend

Este es el backend para la plataforma de monitorización y análisis de datos urbanos de una ciudad inteligente. Utiliza Node.js, Express y MongoDB para gestionar los datos y servir la API REST.

## Características

- API REST para acceder a los datos de **Accidentes**, **Bicicletas**, **Contaminación Acústica** y **Tráfico**.
- Conexión a una base de datos **MongoDB** para almacenar y consultar los datos.
- Importación de datos desde archivos CSV a la base de datos utilizando scripts.

## Requisitos

- Node.js >= 14
- npm >= 6.14
- MongoDB (en local o servicio de base de datos en la nube)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/marcediaza18/extraordinariaBackend.git
   ```

2. Navega a la carpeta del proyecto:

   ```bash
   cd extraordinariaBackend
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Crea un archivo `.env` con la URL de tu base de datos MongoDB:

   ```
   MONGO_URI=mongodb://localhost:27017/smartcity
   ```

5. Inicia el servidor:

   ```bash
   node server.js
   ```

El servidor estará disponible en `http://localhost:4000`.

## Estructura del Proyecto

- **/models**: Modelos de Mongoose para interactuar con MongoDB (por ejemplo, Trafico, Bicicletas).
- **/controllers**: Lógica para manejar las solicitudes de la API.
- **/routes**: Definición de las rutas para cada API endpoint.
- **/scripts**: Scripts para importar los datos a la base de datos.
- **server.js**: Punto de entrada para iniciar el servidor Express.

## Tecnologías Usadas

- **Node.js**: Entorno de ejecución para JavaScript en el backend.
- **Express**: Framework para facilitar la creación de la API REST.
- **MongoDB**: Base de datos NoSQL para almacenar los datos urbanos.
- **Mongoose**: Librería de modelado de datos para MongoDB.
- **csv-parser**: Librería para procesar archivos CSV y cargarlos en la base de datos.

## Autor

Marcelino Díaz
