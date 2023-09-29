let data, lang
let fileContent = {};
const translate = (lang) => {
    fetch('./lang/' + lang + '.json').then((resp) => {
        return resp.json()
    }).then( (data) => {
        [...document.querySelectorAll('[data-block]')].forEach(block =>
            block.innerHTML = data[block.getAttribute('data-block')][block.getAttribute('data-txt')]
        )
    })
}

translate('hu')

document.querySelectorAll('.btn-lang').forEach(btn => {
    btn.addEventListener('click', (e) => {
        lang = e.target.getAttribute('data-lang')
        translate(lang)
    })
})


document.getElementById('uploadButton').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (file) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
          const fileContent = JSON.parse(event.target.result);
          const formData = {
              fileName: file.name,
              fileContent: fileContent,
          };

          fetch('/upload', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json', // Indica que estamos enviando datos JSON
              },
              body: JSON.stringify(formData), // Convierte el objeto a una cadena JSON
          })
          .then(response => response.text())
          .then(data => {
              console.log("guardado correctamente archivo",data); // Mensaje de confirmación del servidor

              fileInput.value = '';
          })
          .catch(error => {
              console.error('Error al cargar el archivo:', error);
          });
      };
      
      reader.readAsText(file); // Lee el contenido del archivo como texto JSON
  } else {
      alert('Selecciona un archivo JSON para cargar.');
  }
});
