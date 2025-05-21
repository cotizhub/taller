// Variables globales
let currentFolio = '';

// Función para inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Generar folio automáticamente
    generarFolio();
    
    // Establecer fecha actual en el campo de fecha de cotización
    const fechaActual = new Date();
    document.getElementById('fecha-cotizacion').value = formatDate(fechaActual);
    
    // Inicializar selectores de fecha
    flatpickr("#fecha-entrega", {
        dateFormat: "d/m/Y",
        minDate: "today",
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
            },
            months: {
                shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
            }
        }
    });
    
    // Configurar eventos para cálculos automáticos
    document.getElementById('importe-trabajo').addEventListener('input', calcularTotales);
    document.getElementById('importe-mano-obra').addEventListener('input', calcularTotales);
    document.getElementById('cantidad').addEventListener('input', calcularTotales);
    
    // Configurar evento para el botón de limpiar
    document.getElementById('btn-limpiar').addEventListener('click', limpiarFormulario);
    
    // Configurar evento para el botón de PDF
    document.getElementById('btn-pdf').addEventListener('click', generarPDF);
    
    // Configurar evento para el botón de WhatsApp
    document.getElementById('btn-whatsapp').addEventListener('click', enviarWhatsApp);
    
    // Configurar evento para envío del formulario
    document.getElementById('cotizacion-form').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarEnGoogleSheets();
    });
    
    // Configurar eventos para los botones de exportación
    document.getElementById('btn-csv').addEventListener('click', exportarCSVyEnviar);
    document.getElementById('btn-json').addEventListener('click', exportarJSONyEnviar);
});

// Función para generar un folio único basado en fecha y hora
function generarFolio() {
    const ahora = new Date();
    const año = ahora.getFullYear().toString().substr(-2);
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
    const dia = ahora.getDate().toString().padStart(2, '0');
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    
    currentFolio = `COT-${año}${mes}${dia}-${hora}${minutos}${segundos}`;
    document.getElementById('folio-display').textContent = currentFolio;
    return currentFolio;
}

// Función para formatear fecha
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Función para calcular totales
function calcularTotales() {
    const cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
    const importeTrabajo = parseFloat(document.getElementById('importe-trabajo').value) || 0;
    const importeManoObra = parseFloat(document.getElementById('importe-mano-obra').value) || 0;
    
    const subtotal = (importeTrabajo + importeManoObra) * cantidad;
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    
    document.getElementById('subtotal').value = subtotal.toFixed(2);
    document.getElementById('iva').value = iva.toFixed(2);
    document.getElementById('total').value = total.toFixed(2);
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById('cotizacion-form').reset();
    generarFolio();
    const fechaActual = new Date();
    document.getElementById('fecha-cotizacion').value = formatDate(fechaActual);
    document.getElementById('subtotal').value = '';
    document.getElementById('iva').value = '';
    document.getElementById('total').value = '';
}

// Función para guardar en Google Sheets
function guardarEnGoogleSheets() {
    // Verificar que el formulario esté completo
    if (!validarFormulario()) {
        alert('Por favor complete todos los campos requeridos antes de guardar.');
        return;
    }
    
    // URL fija de Google Apps Script
    const scriptURL = "https://script.google.com/macros/s/AKfycbwgvctREqGUExSel2_jd61xM41DQEVSJ5uRxAJDw8BFh1dnUxUOKDRfT7yYowAAcdu3pQ/exec";
    
    // Recopilar datos del formulario
    const formData = {
        folio: currentFolio,
        fecha: document.getElementById('fecha-cotizacion').value,
        empresa: document.getElementById('empresa').value,
        marcaAuto: document.getElementById('marca-auto').value,
        placas: document.getElementById('placas').value,
        tipoServicio: document.getElementById('tipo-servicio').value,
        fechaEntrega: document.getElementById('fecha-entrega').value,
        descripcion: document.getElementById('descripcion').value,
        cantidad: document.getElementById('cantidad').value,
        importeTrabajo: document.getElementById('importe-trabajo').value,
        importeManoObra: document.getElementById('importe-mano-obra').value,
        subtotal: document.getElementById('subtotal').value,
        iva: document.getElementById('iva').value,
        total: document.getElementById('total').value
    };
    
    // Mostrar mensaje de carga
    document.getElementById('success-message').textContent = 'Guardando datos en Google Sheets...';
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    
    // Enviar datos a Google Sheets
    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData)
    })
    .then(response => {
        document.getElementById('success-message').textContent = '¡Cotización guardada con éxito en Google Sheets!';
    })
    .catch(error => {
        document.getElementById('success-message').textContent = 'Error al guardar: ' + error.message;
    });
    
    // Guardar localmente para PDF y WhatsApp
    localStorage.setItem('ultimaCotizacion', JSON.stringify(formData));
}

// Función para validar el formulario
function validarFormulario() {
    const form = document.getElementById('cotizacion-form');
    return form.checkValidity();
}

// Función para enviar por WhatsApp
function enviarWhatsApp() {
    // Verificar que el formulario esté completo
    if (!validarFormulario()) {
        alert('Por favor complete todos los campos requeridos antes de enviar por WhatsApp.');
        return;
    }
    
    // Recopilar datos del formulario
    const empresa = document.getElementById('empresa').value;
    const marcaAuto = document.getElementById('marca-auto').value;
    const placas = document.getElementById('placas').value;
    const tipoServicio = document.getElementById('tipo-servicio').value;
    const fechaEntrega = document.getElementById('fecha-entrega').value;
    const descripcion = document.getElementById('descripcion').value;
    const total = document.getElementById('total').value;
    
    // Crear mensaje para WhatsApp
    const mensaje = encodeURIComponent(
        `*COTIZACIÓN: ${currentFolio}*\n\n` +
        `*Cliente:* ${empresa}\n` +
        `*Vehículo:* ${marcaAuto}\n` +
        `*Placas:* ${placas}\n` +
        `*Tipo de Servicio:* ${tipoServicio}\n` +
        `*Fecha de Entrega:* ${fechaEntrega}\n\n` +
        `*Descripción:* ${descripcion}\n\n` +
        `*Total:* $${total}\n\n` +
        `Para más detalles, por favor contáctenos.`
    );
    
    // Abrir WhatsApp Web con el mensaje predefinido
    window.open(`https://wa.me/?text=${mensaje}`, '_blank');
}
