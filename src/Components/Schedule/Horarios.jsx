import {useEffect, useState} from "react";
import {createCombinationsNoOverlap} from "./FunctionsSchedule.js";
import {TablaDeHorarios} from "./TablaDeHorarios.jsx";
import {NavBarHorarios} from "./NavBarHorarios.jsx";

// TODO: Revisar tabla por qué parece muy lenta...

export default function Horarios({data, update, theme}){

  const [combinaciones, setCombinaciones] = useState(createCombinationsNoOverlap(data));
  const [pagina, setPagina] = useState(0);
  
  useEffect(() => {
    console.clear()
    console.log("Loading Horarios")
    console.log(data)
    if(typeof(data) === 'undefined') return;
    console.log("Creando combinaciones...")
    setCombinaciones(createCombinationsNoOverlap(data));
    console.log(combinaciones)
  }, [data, update]);

  return(
    <>
      <NavBarHorarios />
      <div className='p-1'/>
     <TablaDeHorarios />
    </>
  )

}