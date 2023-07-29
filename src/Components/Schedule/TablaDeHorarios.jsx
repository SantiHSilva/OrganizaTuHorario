import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
// TODO: Revisar tabla por qué parece muy lenta...

export const TablaDeHorarios = ({combinaciones, numDeCombinacion, mostrarPorHorario24Horas}) => {

  const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
/*
  const horas = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
*/

  const maxAltura = 460;

  function getHours(){
    if(mostrarPorHorario24Horas)
      return ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00","16:00", "17:00", "18:00", "19:00", "20:00", "21:00","22:00", "23:00"];
    else
      return ["01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM","03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM","09:00 PM", "10:00 PM", "11:00 PM"];
  }

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
              getHours().map((hora, index) => (
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