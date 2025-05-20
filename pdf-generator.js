// Función para generar PDF
function generarPDF() {
    // Verificar que el formulario esté completo
    if (!validarFormulario()) {
        alert('Por favor complete todos los campos requeridos antes de generar el PDF.');
        return;
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
    
    // Crear un elemento temporal para el PDF
    const pdfContent = document.createElement('div');
    pdfContent.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5; width: 100%;">
            <!-- Encabezado con fecha y hora -->
            <div style="text-align: right; margin-bottom: 10px; font-size: 12px;">
                ${new Date().toLocaleString('es-MX')}
            </div>
            
            <!-- Línea separadora -->
            <div style="border-bottom: 1px solid #ccc; margin-bottom: 20px;"></div>
            
            <!-- Logo y datos de la empresa -->
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <div style="width: 40%;">
                    <img src="${document.getElementById('logo').src}" style="max-width: 150px; height: auto;" />
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
            
            <!-- Ubicación y fecha -->
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <div style="width: 50%; text-align: left;">
                    <strong>Villahermosa Tabasco,</strong>
                </div>
                <div style="width: 50%; text-align: left;">
                    ${fechaCotizacion}
                </div>
            </div>
            
            <!-- Atención a -->
            <div style="margin-bottom: 20px;">
                <div style="display: flex;">
                    <div style="width: 20%; font-weight: bold;">Atención:</div>
                    <div style="width: 80%; border-bottom: 1px solid #000;">${empresa}</div>
                </div>
            </div>
            
            <!-- Texto introductorio -->
            <div style="margin-bottom: 20px; text-align: justify;">
                <p>Por este conducto, <strong>Taller Félix</strong>, le agradecemos la oportunidad que nos brinda, por lo que nos permitimos someter a su amable consideración la siguiente cotización.</p>
                <p>Esperando cumpla con sus requerimientos, se le presenta a continuación la descripción del trabajo y el costo de nuestros servicios:</p>
            </div>
            
            <!-- Tabla de servicios -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background-color: #3498db; color: white;">
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: center; width: 5%;">#</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 20%;">Automóvil</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: center; width: 10%;">Placas</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: center; width: 5%;">Cantidad</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 40%;">Descripción del trabajo</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: center; width: 20%;">Fecha probable de entrega</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${marcaAuto}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${placas}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${cantidad}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${descripcion}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${fechaEntrega}</td>
                    </tr>
                </tbody>
            </table>
            
            <!-- Tabla de costos -->
            <div style="display: flex; justify-content: flex-end;">
                <table style="width: 50%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <td style="padding: 8px; text-align: right; width: 60%;"><strong>Importe del trabajo:</strong></td>
                        <td style="padding: 8px; text-align: right; width: 40%;">$${importeTrabajo}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; text-align: right;"><strong>Importe mano de obra:</strong></td>
                        <td style="padding: 8px; text-align: right;">$${importeManoObra}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; text-align: right;"><strong>Subtotal:</strong></td>
                        <td style="padding: 8px; text-align: right;">$${subtotal}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; text-align: right;"><strong>IVA (16%):</strong></td>
                        <td style="padding: 8px; text-align: right;">$${iva}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; text-align: right; font-weight: bold;">Total:</td>
                        <td style="padding: 8px; text-align: right; font-weight: bold;">$${total}</td>
                    </tr>
                </table>
            </div>
            
            <!-- Pie de página -->
            <div style="margin-top: 40px; text-align: center; font-size: 12px;">
                <p>¡Gracias por su preferencia!</p>
                <p>Esta cotización tiene una vigencia de 15 días a partir de la fecha de emisión.</p>
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
        pdf.save(`Cotizacion_${folio}.pdf`);
        
        // Eliminar el elemento temporal
        document.body.removeChild(pdfContent);
    });
}
