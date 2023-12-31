import jsPDF from 'jspdf'
import {adjustPage, waitForElm} from "./Utils.js";

function exportPDF(tableID, html2canvas){

  const table = document.getElementById(tableID)

  adjustPage();

  html2canvas(table, {
    dpi: 300,
    scale: 3,
  }).then(canvas => {
    var img = canvas.toDataURL("image/jpeg", 1);

    // Dimensiones de tabla
    const w = table.offsetWidth
    const h = table.offsetHeight

    const doc = new jsPDF({
      orientation: "l",
      unit: "px",
      format: [w, h]
    });

    // Dimensiones de la página actual
    let wPage = doc.internal.pageSize.getWidth()
    let hPage = doc.internal.pageSize.getHeight()

    console.log("Table size:", w,h)
    console.log("Page size:", wPage, hPage)

    if(wPage > w || hPage > h){
      console.log("La escala es diferente, reescalando el pdf")
      doc.deletePage(1)
      doc.addPage(
        [w,h],
        "l"
      );
      doc.internal.pageSize.height = h
      doc.internal.pageSize.width = w
      wPage = doc.internal.pageSize.getWidth()
      hPage = doc.internal.pageSize.getHeight()
      console.log("New Page size:", wPage, hPage)
    } else {
      console.log("No es necesario reescalar el pdf")
    }

    doc.addImage(img, 'JPEG', 0, 0, w, h);
    doc.save('horario.pdf');
  })
}

async function exportCombinationsPDF(combinations, html2canvas, setPage) {
  // Si no hay combinaciones, exportar el horario normal
  if (combinations.length === 0) {
    exportPDF("exportScheduleClassTable0", html2canvas);
    return;
  }

  // crear un html de tablas
  const pdf = new jsPDF({
    orientation: "l",
    unit: "px",
  });

  // remover la primera página
  pdf.deletePage(1);

  for (let numDeCombinacion = 0; numDeCombinacion < combinations.length; numDeCombinacion++) {
    console.log(`Generando PDF de la combinación ${numDeCombinacion + 1}`)

    await setPage(numDeCombinacion);

    let table = await waitForElm("#exportScheduleClassTable" + numDeCombinacion);

    await adjustPage();

    await html2canvas(table, {
      dpi: 300,
      scale: 3,
    }).then(canvas => {
      const img = canvas.toDataURL("image/jpeg", 0.6); // 0.6 es la calidad de la imagen

      const w = table.offsetWidth;
      const h = table.offsetHeight;

      pdf.addPage(
        [w,h],
        "l"
        );
      console.log("Table size:", w,h)
      let wPage = pdf.internal.pageSize.getWidth()
      let hPage = pdf.internal.pageSize.getHeight()
      console.log("Page size:", wPage, hPage)
      if(wPage > w || hPage > h){
        console.log("La escala es diferente, reescalando el pdf para la combinación " + (numDeCombinacion + 1))
        pdf.internal.pageSize.height = h
        pdf.internal.pageSize.width = w
        wPage = pdf.internal.pageSize.getWidth()
        hPage = pdf.internal.pageSize.getHeight()
        console.log("New Page size:", wPage, hPage)
      } else {
        console.log("No es necesario reescalar el pdf para la combinación " + (numDeCombinacion + 1))
      }
      pdf.addImage(img, 'jpeg', 0, 0, w, h);
    });
  }

  console.log("Guardando PDF");
  pdf.save('horarios.pdf');
}

export {exportPDF, exportCombinationsPDF}
