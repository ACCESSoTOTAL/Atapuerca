// Archivo de debug temporal
console.log('Debug test: archivo cargado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Debug: DOM loaded');
    
    // Simular que hay un reto cargado
    const testReto = {
        id: 1,
        titulo: "Test Reto",
        descripcion: "Reto de prueba",
        nivel: "Básico",
        puntos: 10,
        fase: 1,
        videoUrl: "https://www.youtube.com/watch?v=test",
        pista: "Esta es una pista de prueba"
    };
    
    localStorage.setItem('retoActual', JSON.stringify(testReto));
    console.log('Debug: reto guardado en localStorage');
    
    // Crear elemento de navegación directamente
    const navDiv = document.createElement('div');
    navDiv.innerHTML = `
        <div style="background: red; padding: 20px; margin: 20px; border: 2px solid yellow;">
            <h3>BOTONES DE NAVEGACIÓN DE PRUEBA</h3>
            <button onclick="alert('Anterior')" style="background: blue; color: white; padding: 10px;">Anterior</button>
            <span style="margin: 0 20px;">Reto 1 de 68</span>
            <button onclick="alert('Siguiente')" style="background: green; color: white; padding: 10px;">Siguiente</button>
        </div>
    `;
    
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(navDiv, main.firstChild);
        console.log('Debug: navegación insertada');
    } else {
        console.log('Debug: no se encontró main');
        document.body.insertBefore(navDiv, document.body.firstChild);
    }
});
