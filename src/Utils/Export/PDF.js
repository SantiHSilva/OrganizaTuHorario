import jsPDF from 'jspdf'
import adjustPage from "./Utils.js";

export default function exportPDF(tableID, html2canvas){

  const table = document.getElementById(tableID)

  adjustPage();

  const w = table.offsetWidth
  const h = table.offsetHeight
  html2canvas(table, {
    dpi: 300,
    scale: 3,
  }).then(canvas => {
    var img = canvas.toDataURL("image/jpeg", 1);
    var doc = new jsPDF({
        orientation: "l",
        unit: "px",
        format: [w, h]
      });
    doc.addImage(img, 'JPEG', 0, 0, w, h);
    doc.save('horario.pdf');
  })
}
