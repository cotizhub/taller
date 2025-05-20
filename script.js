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
    
    // URL del script de Google Apps Script que procesará los datos
    const scriptURL = 'SCRIPT_URL_PLACEHOLDER';
    
    // Mostrar mensaje de carga
    document.getElementById('success-message').textContent = 'Guardando datos...';
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    
    // Enviar datos a Google Sheets (simulado)
    console.log('Datos a enviar:', formData);
    
    // En una implementación real, aquí se enviarían los datos al script de Google Apps Script
    // fetch(scriptURL, {
    //     method: 'POST',
    //     body: JSON.stringify(formData)
    // })
    // .then(response => {
    //     document.getElementById('success-message').textContent = '¡Cotización guardada con éxito!';
    // })
    // .catch(error => {
    //     document.getElementById('success-message').textContent = 'Error al guardar: ' + error.message;
    // });
    
    // Simulación de éxito (para demostración)
    setTimeout(() => {
        document.getElementById('success-message').textContent = '¡Cotización guardada con éxito!';
    }, 1000);
    
    // Guardar localmente para PDF y WhatsApp
    localStorage.setItem('ultimaCotizacion', JSON.stringify(formData));
}

// Función para generar PDF
function generarPDF() {
    // Verificar que el formulario esté completo
    if (!validarFormulario()) {
        alert('Por favor complete todos los campos requeridos antes de generar el PDF.');
        return;
    }
    
    // Recopilar datos del formulario
    const empresa = document.getElementById('empresa').value;
    const marcaAuto = document.getElementById('marca-auto').value;
    const placas = document.getElementById('placas').value;
    const descripcion = document.getElementById('descripcion').value;
    const total = document.getElementById('total').value;
    
    // Crear un elemento temporal para el PDF
    const pdfContent = document.createElement('div');
    pdfContent.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h2>COTIZACIÓN</h2>
                <p>Folio: ${currentFolio}</p>
                <p>Fecha: ${document.getElementById('fecha-cotizacion').value}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <p><strong>Cliente:</strong> ${empresa}</p>
                <p><strong>Vehículo:</strong> ${marcaAuto}</p>
                <p><strong>Placas:</strong> ${placas}</p>
                <p><strong>Tipo de Servicio:</strong> ${document.getElementById('tipo-servicio').value}</p>
                <p><strong>Fecha de Entrega:</strong> ${document.getElementById('fecha-entrega').value}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h4>Descripción del Trabajo</h4>
                <p>${descripcion}</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr style="background-color: #f2f2f2;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Concepto</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Cantidad</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Importe</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">Trabajo</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${document.getElementById('cantidad').value}</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${document.getElementById('importe-trabajo').value}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">Mano de Obra</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${document.getElementById('cantidad').value}</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${document.getElementById('importe-mano-obra').value}</td>
                </tr>
                <tr>
                    <td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>Subtotal:</strong></td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${document.getElementById('subtotal').value}</td>
                </tr>
                <tr>
                    <td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>IVA (16%):</strong></td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${document.getElementById('iva').value}</td>
                </tr>
                <tr>
                    <td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>Total:</strong></td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>$${total}</strong></td>
                </tr>
            </table>
            
            <div style="margin-top: 40px; text-align: center;">
                <p>¡Gracias por su preferencia!</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(pdfContent);
    
    // Usar html2canvas y jsPDF para generar el PDF
    html2canvas(pdfContent, {scale: 2}).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Cotizacion_${currentFolio}.pdf`);
        
        // Eliminar el elemento temporal
        document.body.removeChild(pdfContent);
    });
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

// Función para validar el formulario
function validarFormulario() {
    const form = document.getElementById('cotizacion-form');
    return form.checkValidity();
}
