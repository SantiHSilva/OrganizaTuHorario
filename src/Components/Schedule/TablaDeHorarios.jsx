import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
// TODO: Revisar tabla por qué parece muy lenta...

export const TablaDeHorarios = ({combinaciones, numDeCombinacion}) => {

  const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  const horas = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

  const maxAltura = 460;

  return(
    <Paper sx={{ width: `100%`, overflow: 'hidden'}}>
      <TableContainer sx={{ height: `${maxAltura}px`}}>

        <Table stickyHeader align='center'>
          <TableHead>
            <TableRow>
              <TableCell align='center'> # </TableCell>
              {
                dias.map((dia, index) => (
                  <TableCell key={index} align="center"> {dia} </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              horas.map((hora, index) => (
                <TableRow key={index}>
                  <TableCell align="center"> {hora} </TableCell>
                  {
                    /* Aquí deberian ir las combinaciones */
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