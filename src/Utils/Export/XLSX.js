import adjustPage from "./Utils.js";
import {writeFile, utils} from "xlsx";

export default function ExportExcel(tableID, writeFile, table_to_book){
  const table = document.getElementById(tableID);

  adjustPage();

  const wb = table_to_book(table, {sheet: "Horario"});
  writeFile(wb, "horario.xlsx");
}