// SCRIPT DE REPARACIÓN TEMPORAL
// Copia y pega este código en la consola del navegador

console.log('🔧 Aplicando parche temporal para navegación de retos...');

// Redefinir la función navegarReto con la URL correcta
window.navegarReto = async function(nuevoRetoId) {
  console.log('🚀 Iniciando navegación a reto:', nuevoRetoId);
  
  if (nuevoRetoId < 1 || nuevoRetoId > 68) {
    console.warn('❌ ID de reto fuera de rango:', nuevoRetoId);
    alert(`❌ ID de reto fuera de rango: ${nuevoRetoId}`);
    return;
  }
  
  try {
    // Cargar datos de retos si no están disponibles
    if (!window.retosData) {
      console.log('🔄 Cargando datos de retos desde API...');
      
      const response = await fetch('/api/retos.php?action=list');
      console.log('📡 Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('📊 Respuesta de la API:', result);
      
      if (result.success && result.data && Array.isArray(result.data)) {
        window.retosData = result.data;
        console.log('✅ Datos de retos cargados:', window.retosData.length, 'retos');
      } else {
        throw new Error('Error en respuesta API: ' + (result.message || 'Datos inválidos'));
      }
    } else {
      console.log('✅ Usando datos de retos ya cargados:', window.retosData.length, 'retos');
    }
    
    // Buscar el reto específico
    console.log('🔍 Buscando reto con ID:', nuevoRetoId);
    const nuevoReto = window.retosData.find(r => r.id == nuevoRetoId);
    
    console.log('🎯 Reto encontrado:', nuevoReto ? `ID: ${nuevoReto.id}, Título: ${nuevoReto.titulo}` : 'NO ENCONTRADO');
    
    if (!nuevoReto) {
      throw new Error(`Reto ${nuevoRetoId} no encontrado en los datos cargados`);
    }
    
    // Actualizar el reto actual en localStorage
    localStorage.setItem('retoActual', JSON.stringify(nuevoReto));
    
    // Actualizar la interfaz
    const retoInfoAnterior = document.getElementById('reto-info');
    if (retoInfoAnterior) {
      retoInfoAnterior.remove();
    }
    
    // Mostrar el nuevo reto
    const nuevoRetoInfo = mostrarRetoActual();
    if (nuevoRetoInfo) {
      const main = document.querySelector('main');
      main.insertBefore(nuevoRetoInfo, main.children[2]);
    }
    
    // Limpiar el textarea para el nuevo reto
    const sqlInput = document.getElementById('sqlInput');
    if (sqlInput) {
      sqlInput.value = '-- Escribe tu consulta aquí para el reto #' + nuevoRetoId;
    }
    
    console.log(`✅ Navegado al reto #${nuevoRetoId}: ${nuevoReto.titulo}`);
    
  } catch (error) {
    console.error('❌ Error navegando al reto:', error);
    alert('Error cargando el reto: ' + error.message);
  }
};

console.log('✅ Parche aplicado. Los botones de navegación ahora deberían funcionar.');
console.log('💡 Prueba hacer clic en "Reto Siguiente" o "Reto Anterior"');
