import adjustPage from "./Utils.js";
import {writeFile, utils} from "xlsx";

function ExportExcel(tableId){
  const table = document.getElementById(tableId);

  adjustPage();

  const wb = utils.table_to_book(table, {sheet: "Horario"});
  writeFile(wb, "horario.xlsx");
}

async function exportCombinationsExcel(combinations, setPage){
  if(combinations.length === 0){
    ExportExcel("exportScheduleClassTable", writeFile, utils.table_to_book);
    return;
  }

  const workBook = utils.book_new();

  for(let numDeCombinacion = 0; numDeCombinacion < combinations.length; numDeCombinacion++){

    console.log(`Generando Excel de la combinación ${numDeCombinacion}`);

    await setPage(numDeCombinacion);
    const table = await document.getElementById("exportScheduleClassTable");
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