import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {generateHours} from "./FunctionsSchedule.js";
// TODO: Revisar tabla por qué parece muy lenta...

export const TablaDeHorarios = ({combinaciones, numDeCombinacion, mostrarPorHorario24Horas}) => {

  const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
/*
  const horas = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
*/

  const maxAltura = 460;

  function TablaPorHoras(numDeCombinacion, hora){
/*    console.log("Creando tabla por horas...")
    console.log("Combinaciones:", combinaciones)*/
    return(
      <></>
    )
  }

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
              generateHours(combinaciones[numDeCombinacion], mostrarPorHorario24Horas).map((hora, index) => (
                <>
                  <TableRow key={index}>
                    <TableCell align="center" className='p-2' style={{
                      width: "2px"
                    }}>
                      {hora}
                    </TableCell>
                    {
                      /* Aquí deberia ir las combinaciones por DÍA y hora con su rowspawn correspondiente
                        */
                    }
                    <TableCell align="center" className='p-2' rowSpan={2}> test </TableCell>
                  </TableRow>
                </>
              ))
            }
          </TableBody>
        </Table>


      </TableContainer>
    </Paper>
  )
}