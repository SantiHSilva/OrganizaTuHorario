import * as XLSX from "xlsx";

export default function ExportExcel(tableID){
  const table = document.getElementById(tableID);
  const wb = XLSX.utils.table_to_book(table, {sheet: "Horario"});
  XLSX.writeFile(wb, "horario.xlsx");
}