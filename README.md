# Sistema de Cotizaciones para Taller Automotriz

Esta es una aplicación web simple para generar cotizaciones de servicios automotrices, con capacidad para guardar datos en Google Sheets, generar PDFs y enviar cotizaciones por WhatsApp.

## Características

- Generación automática de folio con fecha y hora
- Formulario optimizado con campos esenciales
- Cálculo automático de subtotal, IVA y total
- Guardado de datos en Google Sheets
- Generación de cotizaciones en PDF
- Envío de cotizaciones por WhatsApp
- Diseño responsivo para dispositivos móviles y de escritorio

## Instrucciones de Uso

### Despliegue en GitHub Pages

1. Crea un nuevo repositorio en GitHub
2. Sube todos los archivos de este proyecto al repositorio
3. Activa GitHub Pages en la configuración del repositorio
4. Selecciona la rama principal como fuente para GitHub Pages
5. Espera unos minutos y tu aplicación estará disponible en la URL proporcionada

### Integración con Google Sheets

Para habilitar la integración con Google Sheets, sigue estos pasos:

1. Crea una nueva hoja de cálculo en Google Sheets
2. Haz clic en Extensiones > Apps Script
3. Copia y pega el siguiente código:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  // Añadir encabezados si la hoja está vacía
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Folio', 'Fecha', 'Empresa', 'Marca Auto', 'Placas', 
      'Tipo Servicio', 'Fecha Entrega', 'Descripción', 
      'Cantidad', 'Importe Trabajo', 'Importe Mano Obra',
      'Subtotal', 'IVA', 'Total'
    ]);
  }
  
  // Añadir nueva fila con los datos
  sheet.appendRow([
    data.folio,
    data.fecha,
    data.empresa,
    data.marcaAuto,
    data.placas,
    data.tipoServicio,
    data.fechaEntrega,
    data.descripcion,
    data.cantidad,
    data.importeTrabajo,
    data.importeManoObra,
    data.subtotal,
    data.iva,
    data.total
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success',
    'message': 'Datos guardados correctamente'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

4. Guarda el script y haz clic en Implementar > Nueva implementación
5. Selecciona "Aplicación web" como tipo
6. Configura el acceso como "Cualquier persona" y haz clic en Implementar
7. Copia la URL de la aplicación web que se genera
8. Abre el archivo `script.js` y reemplaza `SCRIPT_URL_PLACEHOLDER` con la URL copiada

## Personalización

### Cambiar el Logo

Para cambiar el logo, simplemente reemplaza el archivo `logo-placeholder.png` con tu propio logo, manteniendo el mismo nombre de archivo.

### Modificar Tipos de Servicio

Para modificar las opciones de tipo de servicio, edita el archivo `index.html` y busca la sección con el elemento `<select id="tipo-servicio">`. Añade, modifica o elimina las opciones según tus necesidades.

### Cambiar Colores y Estilos

Los estilos de la aplicación se encuentran en el archivo `styles.css`. Puedes modificar los colores, fuentes y otros estilos según tus preferencias.

## Archivos Incluidos

- `index.html`: Estructura principal del formulario
- `styles.css`: Estilos y diseño responsivo
- `script.js`: Funcionalidad JavaScript para cálculos, PDF y WhatsApp
- `logo-placeholder.png`: Logo de ejemplo (reemplazable)
- `README.md`: Este archivo de instrucciones

## Requisitos Técnicos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet para la integración con Google Sheets y WhatsApp
- Cuenta de Google para configurar Google Sheets y Apps Script

## Soporte

Si necesitas ayuda adicional o tienes preguntas sobre la implementación, no dudes en contactar al desarrollador.
