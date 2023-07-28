import {
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";

// TODO: Revisar tabla por qué parece muy lenta...

export default function Horarios(){

  const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  const horas = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

  const maxAltura = 500;

  return(
    <Paper sx={{ width: `100%`, overflow: 'hidden'}}>
      <TableContainer sx={{ height: `${maxAltura}px`}}>

        <Table stickyHeader align='center'>
          <TableHead>
            <TableRow>
              <TableCell align='center'
                         style={{
                           //backgroundColor: 'green'
                         }}
              > # </TableCell>
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
                    dias.map((dia, index) => (
                      <TableCell
                        key={index}
                        align="center"
                        style={{
                          // backgroundColor: 'red'
                        }}
                      > A
                      </TableCell>
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