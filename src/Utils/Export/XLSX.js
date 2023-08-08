import * as XLSX from "xlsx";
import adjustPage from "./Utils.js";

export default function ExportExcel(tableID){
  const table = document.getElementById(tableID);

  adjustPage();

  const wb = XLSX.utils.table_to_book(table, {sheet: "Horario"});
  XLSX.writeFile(wb, "horario.xlsx");
}