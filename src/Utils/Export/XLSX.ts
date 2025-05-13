import { Horario } from "../../Data/groupManager.js";
import {adjustPage, waitForElm} from "./Utils.js";
import {writeFile, utils} from "xlsx";

function ExportExcel(tableId: string, write: typeof writeFile, table_to_book: typeof utils.table_to_book) {
  const table = document.getElementById(tableId);

  adjustPage();

  const wb = table_to_book(table, {sheet: "Horario"});
  write(wb, "horario.xlsx");
}

async function exportCombinationsExcel(combinations: Horario[][], setPage: (numDeCombinacion: number) => Promise<void>) {
  if(combinations.length === 0){
    ExportExcel("exportScheduleClassTable0", writeFile, utils.table_to_book);
    return;
  }

  const workBook = utils.book_new();

  for(let numDeCombinacion = 0; numDeCombinacion < combinations.length; numDeCombinacion++){

    console.log(`Generando Excel de la combinación ${numDeCombinacion}`);

    await setPage(numDeCombinacion);
    const table = await waitForElm("#exportScheduleClassTable" + numDeCombinacion);
    await adjustPage();
    const tempTable =  await utils.table_to_sheet(table, {sheet: `Horario #${numDeCombinacion + 1}`});

    await utils.book_append_sheet(workBook, tempTable, `Horario #${numDeCombinacion + 1}`);
  }

  await writeFile(workBook, "horarios.xlsx");
}

export {
  ExportExcel,
  exportCombinationsExcel
}