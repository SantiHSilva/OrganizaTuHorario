import {HiFolderAdd} from "react-icons/hi";
import {Pagination} from "react-bootstrap";
import {AiFillDelete} from "react-icons/ai";
import { Horario, Materia } from "../../../Data/groupManager";

interface props {
  array: Horario["materias"];
  push: (materia: Horario["materias"][0]) => void;
  numPageMaterias: number;
  remove: (index: number) => void;
  setNumPageDescripciones: (num: number) => void;
  setNumPageMaterias: (num: number) => void;
}

export default function NavBarCRUDMateria({array, push, numPageMaterias, remove, setNumPageDescripciones, setNumPageMaterias}: props) {
  const createNewMateria = () => {
    console.log("Creando nueva materia...")
    const newData: Materia = {
      descripciones_generales: [],
      descripciones_por_dia: [
        {
          dia: "",
          inicio: "",
          fin: "",
          ajustes: [],
        }
      ],
    }
    push(newData);

    // After Create Materia
//    setNumPageMaterias(numPageMaterias + 1);
    setNumPageMaterias(array.length + 1);
    setNumPageDescripciones(1)

  }

  const deleteCurrentMateria = () => {
    if(numPageMaterias === 0) return;
    console.log(`Eliminando materia ${numPageMaterias}...`)
    remove(numPageMaterias - 1);

    // After Delete Materia

    if(numPageMaterias !== 1)
      setNumPageMaterias(numPageMaterias - 1);

    if(array.length === 1)
      setNumPageMaterias(0);

    setNumPageDescripciones(1);
  }

  const prevPageGlobal = () => {
    if (numPageMaterias > 1) setNumPageMaterias(numPageMaterias - 1);
    setNumPageDescripciones(1)
  }

  const nextPageGlobal = () => {
    if (numPageMaterias < array.length) setNumPageMaterias(numPageMaterias + 1);
    setNumPageDescripciones(1)
  }


  return(
    <div className='flex flex-row justify-between items-center border border-b-white p-2'>
      <HiFolderAdd
        className='text-gray-400'
        size={30}
        onClick={createNewMateria}
      />

      <section className="flex">
        <button 
          onClick={prevPageGlobal}
          disabled={numPageMaterias === 1 || array.length === 0}
          className="h-full p-[0.48rem] border-1 border-gray-500 disabled:border-gray-600 cursor-pointer disabled:cursor-not-allowed hover:border-gray-500 bg-[#212529] disabled:bg-[#343a40] rounded-l-lg text-white disabled:text-gray-500">
          &lt;
        </button>
        <p className="bg-[#212529] text-white text-lg font-medium px-4 flex items-center">
          {numPageMaterias}
        </p>
        <button 
          onClick={nextPageGlobal}
          disabled={numPageMaterias === array.length || array.length === 0}
          className="h-full p-[0.48rem] border-1 border-gray-500 disabled:border-gray-600 cursor-pointer disabled:cursor-not-allowed hover:border-gray-500 bg-[#212529] disabled:bg-[#343a40] rounded-r-lg text-white disabled:text-gray-500">
          &gt;
        </button>
      </section>

      <AiFillDelete
        className='text-gray-400'
        size={30}
        onClick={deleteCurrentMateria}
      />
    </div>
  )
}