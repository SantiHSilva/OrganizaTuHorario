import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {generateHours, getArrayForTableCells} from "./FunctionsSchedule.js";
import {useEffect, useState} from "react";
import {adaptColorByHexColor} from "../../Utils/Utils.js";
// TODO: Revisar tabla por qué parece muy lenta...

export const TablaDeHorarios = ({combinaciones, numDeCombinacion, mostrarPorHorario24Horas}) => {

  const [hours, setHours] = useState(generateHours(combinaciones[numDeCombinacion], mostrarPorHorario24Horas));

  useEffect(() => {
    console.log("Cambiando horas")
    setHours(generateHours(combinaciones[numDeCombinacion], mostrarPorHorario24Horas));
  }, [combinaciones, numDeCombinacion, mostrarPorHorario24Horas]);

  const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

  const maxAltura = 460;

  return(
    <Paper sx={{ maxWidth: `800PX`, overflow: 'hidden'}}>
      <TableContainer sx={{ maxHeight: `${maxAltura}px`}}>
        <Table stickyHeader align='center' padding={"none"}>
          <TableHead>
            <TableRow>
              <TableCell align='center' className='text-white'> ########### </TableCell>
              {
                dias.map((dia, index) => (
                  <TableCell key={index} align="center" className='p-2'> {dia} </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              hours.map((hora, index) => (
                <TableRow key={index}>
                  <TableCell align="center" className='p-2'>
                    {hora}
                  </TableCell>
                  {
                    dias.map((dias, index) => (
                      getArrayForTableCells(hora, (index + 1), combinaciones[numDeCombinacion]).map((cell, index) => (
                        <TableCell key={index} align="center" className='p-2' rowSpan={cell.rowSpan}
                          style={{
                            backgroundColor: cell.contenido.color,
                            border: '1px solid black',
                            /*border: `${cell.contenido.color ? '1px solid black' : "none"}`,*/
                          }}
                        >
                          {cell.contenido.name}
                        </TableCell>
                      ))
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>


      </TableContainer>
    </Paper>
  )
}