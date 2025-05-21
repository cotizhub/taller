// Función para generar el contenido Markdown de la cotización
function generarMarkdownCotizacion() {
    // Verificar que el formulario esté completo
    if (!validarFormulario()) {
        alert('Por favor complete todos los campos requeridos antes de generar el PDF.');
        return null;
    }
    
    // Recopilar datos del formulario
    const folio = currentFolio;
    const fechaCotizacion = document.getElementById('fecha-cotizacion').value;
    const empresa = document.getElementById('empresa').value;
    const marcaAuto = document.getElementById('marca-auto').value;
    const placas = document.getElementById('placas').value;
    const tipoServicio = document.getElementById('tipo-servicio').value;
    const fechaEntrega = document.getElementById('fecha-entrega').value;
    const descripcion = document.getElementById('descripcion').value;
    const cantidad = document.getElementById('cantidad').value;
    const importeTrabajo = document.getElementById('importe-trabajo').value;
    const importeManoObra = document.getElementById('importe-mano-obra').value;
    const subtotal = document.getElementById('subtotal').value;
    const iva = document.getElementById('iva').value;
    const total = document.getElementById('total').value;
    
    // Crear contenido Markdown
    const markdown = `
# COTIZACIÓN: ${folio}

<div style="text-align: right; font-size: 12px;">
${new Date().toLocaleString('es-MX')}
</div>

---

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
<div style="width: 40%;">
<img src="logo-placeholder.png" alt="Logo Taller Félix" style="max-width: 150px;">
</div>
<div style="width: 30%; text-align: center;">
<div style="font-weight: bold; font-size: 14px;">FEMP920506-8N3</div>
<div style="font-size: 12px;">AV. PERIFERICO CARLOS PELLICER CAMARA 1409.</div>
<div style="font-size: 12px;">COL TAMULTE, C.P.: 86150 VILLAHERMOSA, CENTRO TABASCO</div>
</div>
<div style="width: 30%; text-align: right;">
<div style="margin-bottom: 10px;">
<span style="font-weight: bold; font-size: 14px;">Folio: </span>
<span style="border: 1px solid #ccc; padding: 5px 10px; display: inline-block;">${folio}</span>
</div>
<div style="font-size: 12px;">
<div><strong>Teléfono:</strong> 993 1098186</div>
<div><strong>Correo electrónico:</strong> contacto@tallerfelix.com</div>
</div>
</div>
</div>

<div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
<div style="width: 50%; text-align: left;">
<strong>Villahermosa Tabasco,</strong>
</div>
<div style="width: 50%; text-align: left;">
${fechaCotizacion}
</div>
</div>

<div style="margin-bottom: 20px;">
<div style="display: flex;">
<div style="width: 20%; font-weight: bold;">Atención:</div>
<div style="width: 80%; border-bottom: 1px solid #000;">${empresa}</div>
</div>
</div>

Por este conducto, **Taller Félix**, le agradecemos la oportunidad que nos brinda, por lo que nos permitimos someter a su amable consideración la siguiente cotización.

Esperando cumpla con sus requerimientos, se le presenta a continuación la descripción del trabajo y el costo de nuestros servicios:

| # | Automóvil | Placas | Cantidad | Descripción del trabajo | Fecha probable de entrega |
|:---:|:---|:---:|:---:|:---|:---:|
| 1 | ${marcaAuto} | ${placas} | ${cantidad} | ${descripcion} | ${fechaEntrega} |

<div style="display: flex; justify-content: flex-end; margin-top: 30px;">
<table style="width: 50%;">
<tr>
<td style="text-align: right; padding: 8px;"><strong>Importe del trabajo:</strong></td>
<td style="text-align: right; padding: 8px;">$${importeTrabajo}</td>
</tr>
<tr>
<td style="text-align: right; padding: 8px;"><strong>Importe mano de obra:</strong></td>
<td style="text-align: right; padding: 8px;">$${importeManoObra}</td>
</tr>
<tr>
<td style="text-align: right; padding: 8px;"><strong>Subtotal:</strong></td>
<td style="text-align: right; padding: 8px;">$${subtotal}</td>
</tr>
<tr>
<td style="text-align: right; padding: 8px;"><strong>IVA (16%):</strong></td>
<td style="text-align: right; padding: 8px;">$${iva}</td>
</tr>
<tr>
<td style="text-align: right; padding: 8px; font-weight: bold;">Total:</td>
<td style="text-align: right; padding: 8px; font-weight: bold;">$${total}</td>
</tr>
</table>
</div>

<div style="margin-top: 40px; text-align: center; font-size: 12px;">
¡Gracias por su preferencia!

Esta cotización tiene una vigencia de 15 días a partir de la fecha de emisión.
</div>
`;
    
    return markdown;
}

// Función para generar PDF a partir de Markdown
function generarPDF() {
    // Generar el contenido Markdown
    const markdownContent = generarMarkdownCotizacion();
    if (!markdownContent) return;
    
    // Crear un elemento temporal para convertir Markdown a HTML
    const tempDiv = document.createElement('div');
    tempDiv.style.width = '210mm'; // Ancho A4
    tempDiv.style.padding = '20mm'; // Márgenes
    tempDiv.style.backgroundColor = '#ffffff';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    
    // Convertir Markdown a HTML (usando una librería simple)
    // Como no tenemos una librería de Markdown cargada, usaremos un enfoque básico
    // En una implementación real, se usaría marked.js o similar
    const htmlContent = markdownToHTML(markdownContent);
    tempDiv.innerHTML = htmlContent;
    
    // Añadir estilos específicos para impresión
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            body { margin: 0; padding: 0; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #3498db; color: white; }
            h1 { font-size: 24px; margin-bottom: 20px; }
            img { max-width: 150px; }
        }
    `;
    tempDiv.appendChild(style);
    
    // Añadir al DOM temporalmente
    document.body.appendChild(tempDiv);
    
    // Usar html2canvas y jsPDF para generar el PDF
    html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;
        
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`Cotizacion_${currentFolio}.pdf`);
        
        // Eliminar el elemento temporal
        document.body.removeChild(tempDiv);
    });
}

// Función simple para convertir Markdown a HTML
function markdownToHTML(markdown) {
    let html = markdown;
    
    // Convertir encabezados
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Convertir énfasis
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convertir líneas horizontales
    html = html.replace(/^---$/gm, '<hr>');
    
    // Convertir párrafos (líneas que no son encabezados, listas, etc.)
    html = html.replace(/^(?!<h|<ul|<ol|<li|<table|<div|<p)([^\n]+)$/gm, '<p>$1</p>');
    
    // Preservar etiquetas HTML y estilos
    // No hacemos nada aquí, ya que queremos mantener las etiquetas HTML intactas
    
    return html;
}
