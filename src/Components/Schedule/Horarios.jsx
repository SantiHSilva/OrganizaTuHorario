import {useEffect, useState} from "react";
import {createCombinationsBacktracking, generateHours} from "./FunctionsSchedule.js";
import {TablaDeHorarios} from "./TablaDeHorarios.jsx";
import {NavBarHorarios} from "./NavBarHorarios.jsx";

export default function Horarios({data, update, theme, dias}){

  const [combinaciones, setCombinaciones] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [mostrarPorHorario24Horas, setMostrarPorHorario24Horas] = useState(false);
  
  useEffect(() => {
    if(typeof(data) === 'undefined') return;
    setCombinaciones(createCombinationsBacktracking(data));
    setPagina(0);
  }, [data, update]);

  return(
    <>
      <NavBarHorarios combinaciones={combinaciones} pagina={pagina} setPagina={setPagina} setMostrarPorHorario24Horas={setMostrarPorHorario24Horas} mostrarPorHorario24Horas={mostrarPorHorario24Horas} theme={theme}/>
      <div className='p-1'/>
      <TablaDeHorarios
        dias={dias}
        combinaciones={combinaciones}
        numDeCombinacion={pagina}
        hours={generateHours(combinaciones[pagina], mostrarPorHorario24Horas)}
      />
    </>
  )

}