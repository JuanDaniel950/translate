const express = require('express');
const fs = require('fs-extra');
const cors = require('cors'); // Importa el middleware cors
const app = express();
const port = 4000;

app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

app.use(express.json());
// Configura el middleware cors
app.use(cors());
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
