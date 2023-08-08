import html2canvas from "html2canvas";
import adjustPage from "./Utils.js";

export default function ExportPNG(tableID, html2canvas) {

    const table = document.getElementById(tableID);

    adjustPage();

    html2canvas(table).then(canvas => {
        let temp = document.createElement("a");
        temp.href = canvas.toDataURL("image/png");
        temp.download = "horario.jpg";
        temp.click();
    });
}