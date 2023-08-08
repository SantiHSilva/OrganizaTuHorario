import html2canvas from "html2canvas";

export default function ExportPNG(tableID) {
    html2canvas(document.querySelector(`#${tableID}`)).then(canvas => {
        let temp = document.createElement("a");
        temp.href = canvas.toDataURL("image/png");
        temp.download = "horario.jpg";
        temp.click();
    });
}