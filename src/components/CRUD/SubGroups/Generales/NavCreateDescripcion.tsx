import {BiBookAdd} from "react-icons/bi";
import { Materia } from "../../../../Data/groupManager";

interface props {
  array: Materia[];
  numPageMaterias: number;
  update: (index: number, materia: Materia) => void;
}

export default function NavCreateDescripcion({array, numPageMaterias, update}: props) {

  const createDescripcionGeneral = (array: Materia[], numPageMaterias: number, update: (index: number, materia: Materia) => void) => {
    if(typeof array[numPageMaterias - 1] === "undefined") return; // No materia selected
    const newData = {
      mostrar_en_tabla: true,
      titulo: "",
    }
    const materia = array[numPageMaterias - 1];
    materia.descripciones_generales.push(newData);
    update(numPageMaterias - 1, materia);
  }

  return(
    <div className='flex p-1 border rounded dark:border-b-white'>
      <span className='m-auto dark:text-white'>
        Descripciones generales
      </span>
      <BiBookAdd
        className='dark:text-white cursor-pointer'
        size={30}
        onClick={() => createDescripcionGeneral(array, numPageMaterias, update)}
      />
    </div>
  )
}