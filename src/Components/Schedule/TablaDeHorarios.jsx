import {generateHours, getArrayForTableCells} from "./FunctionsSchedule.js";
import {useEffect, useState} from "react";
import {adaptColorByHexColor} from "../../Utils/Utils.js";

export const TablaDeHorarios = ({combinaciones, numDeCombinacion, mostrarPorHorario24Horas}) => {

  const [hours, setHours] = useState(generateHours(combinaciones[numDeCombinacion], mostrarPorHorario24Horas));

  useEffect(() => {
    console.log("Cambiando horas")
    setHours(generateHours(combinaciones[numDeCombinacion], mostrarPorHorario24Horas));
  }, [combinaciones, numDeCombinacion, mostrarPorHorario24Horas]);

  const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

  const maxAltura = 460;

  function adaptTitle(title){
    const words = title.split(" ");
    let titleAdapted = [];
    let line = "";
    for(let i = 0; i < words.length; i++){
      if(line.length + words[i].length > 10){
        titleAdapted.push(line);
        line = "";
      }
      line += words[i] + " ";
    }
    titleAdapted.push(line);

    return titleAdapted;
  }

  function graficarCeldas(info){
    if(info.rowSpan === 0)
      return(
        <></>
      )
    if(info.rowSpan === 1)
      return (
      <td align="center" className='p-2'/>
      )

    return(
      <td align="center" className='p-2' rowSpan={info.rowSpan}
                 style={{
                   backgroundColor: info.materiaBase.color,
                   color: adaptColorByHexColor(info.materiaBase.color)
                 }}
      >
        <div
          className='row p-1 text-center'
        >
          <span
            className='fw-bold align-self-start col'
          >
            {
              adaptTitle(info.materiaBase.name).map(titulo => (
                <section key={titulo} className='fst-italic'> {titulo} </section>
              ))
            }
          </span>

          {/* Iterar descripciones generales */}

          <section className='p-1 text-center'>

            {
              info.materiaBase.materias[0].descripciones_generales.map((descripcion, index) => (
                descripcion.mostrar_en_tabla ?
                <section key={index} className='fst-italic'> {descripcion.titulo} </section> : <></>
              ))
            }

          </section>

          {/* Iterar ajustes */}

          <section className='p-1'>

            {
              info.materiaBase.materias[0].descripciones_por_dia[0].ajustes.map((ajuste, index) => (
                ajuste.mostrar_en_tabla ?
                <section key={index} className='fw-light'> {ajuste.titulo} </section> : <></>
              ))
            }

          </section>

          <br/>
        </div>
      </td>
    )
  }

  return(
    <section
      style={{
        maxHeight: `${maxAltura}px`, maxWidth: `800PX`, overflow: 'auto', color: "black"
      }}
      id={"scrollTableDiv"}
    >
      <table
        id={"exportScheduleClassTable"}
      >
        <thead>
        <tr>
          <th
            style={{
              backgroundColor: "#e0e0e0",
            }}
          >Hora/Día</th>
          {
            dias.map((dia, index) => (
              <th key={index} align="center" className='p-2'
                  style={{
                    backgroundColor: "#e0e0e0",
                  }}
              >
                {dia}
              </th>
            ))
          }
        </tr>
        </thead>
        <tbody>

        {
          hours.map((hora, index) => (
            <tr key={index}>
              <th align="center" className='p-2'
                style={{
                  backgroundColor: "#e0e0e0",
                }}
              >
                {hora}
              </th>
              {
                dias.map((dias, index) => (
                  graficarCeldas(getArrayForTableCells(hora, (index + 1), combinaciones[numDeCombinacion]))
                ))
              }
            </tr>
          ))
        }
        </tbody>
      </table>
    </section>
  )
}