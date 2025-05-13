import {adjustPage} from "./Utils.js";
import canvas from "html2canvas";

export default function ExportPNG(tableID: string, html2canvas: typeof canvas) {

    const table = document.getElementById(tableID);

    if(!table) {
        console.error("No se encontró el elemento con id " + tableID);
        return;
    }

    adjustPage();

    html2canvas(table).then(canvas => {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const filename = `horario-${timestamp}.png`;
        const temp = document.createElement("a");
        temp.href = canvas.toDataURL("image/png");
        temp.download = filename;
        temp.click();
        temp.remove();
    });
}