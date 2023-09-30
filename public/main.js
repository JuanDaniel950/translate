fetch('https://translatedtl.onrender.com/traduccion.json')
.then(response => response.json())
.then(configuracion => {
    function traducirAEspanol() {
        configuracion.forEach(item => {
            // Busca todos los elementos en la página que contienen el texto original
            const elementos = [...document.querySelectorAll('*')].filter(elemento => elemento.textContent === item.texto_original);
            
            // Para cada elemento encontrado, actualiza su contenido con la traducción
            elementos.forEach(elemento => {
                elemento.textContent = item.traduccion;
            });
        });
    }

    
    function traducirAIngles() {
        configuracion.forEach(item => {
            // Busca todos los elementos en la página que contienen el texto original
            const elementos = [...document.querySelectorAll('*')].filter(elemento => elemento.textContent === item.texto_original);
            
            // Para cada elemento encontrado, actualiza su contenido con la traducción
            elementos.forEach(elemento => {
                elemento.textContent = item.traduccion;
            });
        });
    }

    setTimeout(function() {
        const deseaTraducir = window.confirm('¿Desea ver el contenido en español? (Aceptar para sí, Cancelar para inglés)');
        console.log("desea traducir",deseaTraducir);
        if (deseaTraducir) {
          // El usuario eligió español
          traducirAEspanol();
        } else {
          // El usuario eligió inglés (o canceló)
          traducirAIngles();
        }
      }, 5000); // 5000 milisegundos = 5 segundos
})
.catch(error => {
    console.error('Error al cargar la configuración de traducción:', error);
});
// Programa un cuadro de diálogo después de 5 segundos
