// Función para exportar a CSV y enviar por correo
function exportarCSVyEnviar() {
    // Verificar que el formulario esté completo
    if (!validarFormulario()) {
        alert('Por favor complete todos los campos requeridos antes de exportar los datos.');
        return;
    }
    
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
    
    // Crear contenido CSV
    const headers = Object.keys(formData).join(',');
    const values = Object.values(formData).map(value => `"${value}"`).join(',');
    const csvContent = `${headers}\n${values}`;
    
    // Crear blob y descargar archivo CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const csvFileName = `Cotizacion_${currentFolio}.csv`;
    
    // Crear link para descargar
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', csvFileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Preparar correo electrónico con el archivo adjunto
    const emailSubject = `Cotización: ${formData.fecha}-${formData.empresa}`;
    const emailBody = `Adjunto encontrará la cotización con folio ${currentFolio} para ${formData.empresa}.

Detalles:
- Marca del Automóvil: ${formData.marcaAuto}
- Placas: ${formData.placas}
- Tipo de Servicio: ${formData.tipoServicio}
- Fecha de Entrega: ${formData.fechaEntrega}
- Total: $${formData.total}

Saludos cordiales,
Taller Félix`;
    
    // Abrir cliente de correo con los datos prellenados
    // Nota: No podemos adjuntar archivos directamente, pero podemos precargar el asunto y cuerpo
    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
    
    // Mostrar mensaje de éxito
    document.getElementById('success-message').textContent = 'Archivo CSV generado. Por favor adjunte manualmente el archivo descargado al correo electrónico que se ha abierto.';
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
}
