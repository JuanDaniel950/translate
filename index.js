const express = require('express');
const fs = require('fs-extra');
const cors = require('cors');
const axios = require('axios'); // Importa Axios
const app = express();
const port = 4000;

app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

app.use(express.json());
// Configura el middleware cors
app.use(cors());

// Configura un endpoint para servir el archivo JSON
app.get('/traduccion', async (req, res) => {
  try {
    // Realiza una solicitud GET con Axios para obtener el archivo JSON remoto
    const response = await axios.get('https://dtl360.com/prueba_concepto/traduccion.json');

    // Devuelve el contenido del archivo JSON como respuesta
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener el archivo JSON remoto:', error);
    res.status(500).json({ error: 'Error al obtener el archivo JSON remoto' });
  }
});

app.post('/upload', (req, res) => {
  if (!req.body || !req.body.fileName || !req.body.fileContent) {
    return res.status(400).send('Falta información');
  }

  const fileName = req.body.fileName;
  const fileContent = req.body.fileContent;

  // Guardar el archivo JSON en la carpeta 'lang'
  const filePath = `public/lang/${fileName}`;

  fs.writeFile(filePath, JSON.stringify(fileContent), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al guardar el archivo');
    }
    res.status(200).send('Archivo guardado correctamente');
  });
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
