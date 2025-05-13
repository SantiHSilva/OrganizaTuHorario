import { Horario } from "../../../../Data/groupManager";
import NavCreateDescripcion from "./NavCreateDescripcion.tsx";
import MostrarDescripciones from "./MostrarDescripciones.tsx";

interface props {
  numPageMaterias: number;
  array: Horario["materias"];
  update: () => void;
}

export default function DescripcionesGenerales({numPageMaterias, array, update}: props) {
  return(
    <div className='border dark:border-white rounded m-2'>

      <NavCreateDescripcion numPageMaterias={numPageMaterias} array={array} update={update} />

      <MostrarDescripciones numPageMaterias={numPageMaterias} array={array} update={update} />

    </div>
  )
}