import {useEffect, useState} from "react";
import {createCombinationsBacktracking, generateHours} from "./FunctionsSchedule.js";
import {TablaDeHorarios} from "./TablaDeHorarios.js";
import { Horario } from "../../Data/groupManager.js";
import { NavBarHorarios } from "./NavBarHorarios.js";

interface props{
  data: Horario[];
  update: boolean;
}

export default function Horarios({data, update}: props) {

  const [combinaciones, setCombinaciones] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [mostrarPorHorario24Horas, setMostrarPorHorario24Horas] = useState(false);
  
  useEffect(() => {
    if(typeof(data) === 'undefined') return;
    // @ts-expect-error quien sabe 
    setCombinaciones(createCombinationsBacktracking(data));
    setPagina(0);
  }, [data, update]);

  return(
    <>
      <NavBarHorarios combinaciones={combinaciones} pagina={pagina} setPagina={setPagina} setMostrarPorHorario24Horas={setMostrarPorHorario24Horas} mostrarPorHorario24Horas={mostrarPorHorario24Horas}/>
      <div className='p-1'/>
      <TablaDeHorarios
        combinaciones={combinaciones}
        numDeCombinacion={pagina}
        hours={generateHours(combinaciones[pagina], mostrarPorHorario24Horas)}
      />
    </>
  )

}