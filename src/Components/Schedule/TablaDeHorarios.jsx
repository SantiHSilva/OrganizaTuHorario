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

  function graficarCeldas(info){
    if(info.rowSpan === 0)
      return(
        <></>
      )
    if(info.rowSpan === 1)
      return (
      <TableCell align="center" className='p-2' />
      )

    return(
      <TableCell align="center" className='p-2' rowSpan={info.rowSpan}
                 style={{
                   border: "none",
                   backgroundColor: info.materiaBase.color,
                   color: adaptColorByHexColor(info.materiaBase.color)
                 }}
      >
        <div
          className='container text-center'
        >
          <span
            className='fw-bold'
          >
            {info.materiaBase.name}
          </span>

          {/* Iterar descripciones generales */}

          <section className='p-1 text-center'>

            {
              info.materiaBase.materias[0].descripciones_generales.map((descripcion, index) => (
                descripcion.mostrar_en_tabla ?
                <span key={index} className='fst-italic'> {descripcion.titulo} </span> : <></>
              ))
            }

          </section>

          {/* Iterar ajustes */}

          <section className='p-1'>

            {
              info.materiaBase.materias[0].descripciones_por_dia[0].ajustes.map((ajuste, index) => (
                ajuste.mostrar_en_tabla ?
                <span key={index} className='fw-light'> {ajuste.titulo} </span> : <></>
              ))
            }

          </section>

          <br/>
        </div>
      </TableCell>
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
                  <TableCell key={index} align="center" className='p-2'
                  >
                    {dia}
                  </TableCell>
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
                      graficarCeldas(getArrayForTableCells(hora, (index + 1), combinaciones[numDeCombinacion]))
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