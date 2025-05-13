import { DescripcionesGenerales, Horario } from "../../Data/groupManager";
import { adaptColorByHexColor } from "../../Utils/Utils";
import { getArrayForTableCells } from "./FunctionsSchedule";

interface props {
  combinaciones: Horario[][];
  numDeCombinacion: number;
  hours: string[];
}

export const TablaDeHorarios = ({combinaciones, numDeCombinacion, hours}: props) => {

  const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

  const maxAltura = 460;
  const styleScheduleTop = {backgroundColor: "#e0e0e0"}

  function adaptTitle(title: string){
    const words = title.split(" ");
    const titleAdapted = [];
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function graficarCeldas(info: any){
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
              info.materiaBase.materias[0].descripciones_generales.map((descripcion: DescripcionesGenerales, index: number) => (
                descripcion.mostrar_en_tabla ?
                <section key={index} className='fst-italic'> {descripcion.titulo} </section> : <></>
              ))
            }

          </section>

          {/* Iterar ajustes */}

          <section className='p-1'>

            {
              info.materiaBase.materias[0].descripciones_por_dia[0].ajustes.map((ajuste: DescripcionesGenerales, index: number) => (
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
        className={"exportScheduleClassTable" + numDeCombinacion}
        id={"exportScheduleClassTable" + numDeCombinacion}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <thead>
        <tr>
          <th style={styleScheduleTop}>
            Hora/Día
          </th>
          {
            dias.map((dia, index) => (
              <th key={index} align="center" className='p-2'
                  style={styleScheduleTop}
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
                dias.map((_, index) => (
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