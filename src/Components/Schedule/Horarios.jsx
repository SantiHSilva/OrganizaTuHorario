import {useEffect, useState} from "react";
import {createCombinationsNoOverlap} from "./FunctionsSchedule.js";
import {TablaDeHorarios} from "./TablaDeHorarios.jsx";
import {NavBarHorarios} from "./NavBarHorarios.jsx";

export default function Horarios({data, update, theme}){

  const [combinaciones, setCombinaciones] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [mostrarPorHorario24Horas, setMostrarPorHorario24Horas] = useState(false);
  
  useEffect(() => {
    console.clear()
    console.log("Loading Horarios")
    console.log(data)
    if(typeof(data) === 'undefined') return;
    console.log("Creando combinaciones...")
    setCombinaciones(createCombinationsNoOverlap(data));
    setPagina(0);
    console.log(combinaciones)
  }, [data, update]);

  useEffect(() => {
    console.log("Cambiando pagina...")
  }, [pagina]);

  return(
    <>
      <NavBarHorarios combinaciones={combinaciones} pagina={pagina} setPagina={setPagina} setMostrarPorHorario24Horas={setMostrarPorHorario24Horas} mostrarPorHorario24Horas={mostrarPorHorario24Horas}/>
      <div className='p-1'/>
      <TablaDeHorarios combinaciones={combinaciones} numDeCombinacion={pagina} mostrarPorHorario24Horas={mostrarPorHorario24Horas} />
    </>
  )

}