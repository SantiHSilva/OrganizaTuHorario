import {MdAutoDelete} from "react-icons/md";
import {AiOutlineFileAdd} from "react-icons/ai";
import { Materia } from "../../../../Data/groupManager";

interface props {
  numPageDescripciones: number;
  array: Materia[];
  numPageMaterias: number;
  update: (index: number, value: Materia) => void;
  setNumPageDescripciones: (value: number) => void;
}

export default function NavBarCreateDescripcionesPorDia({numPageDescripciones, array, numPageMaterias, update, setNumPageDescripciones}: props) {

  const createOptionMateria = () => {
    console.log("Creando nueva submateria...")
    if(typeof array[numPageMaterias - 1] === "undefined") return; // No materia selected
    const newData =
      {
        dia: "",
        inicio: "",
        fin: "",
        ajustes: [],
      }
    const materia = array[numPageMaterias - 1];
    materia.descripciones_por_dia.push(newData);
    update(numPageMaterias - 1, materia);

    setNumPageDescripciones(numPageDescripciones + 1)
  }

  const deleteOptionMateria = () => {
    console.log("Eliminando submateria...")
    if(typeof array[numPageMaterias - 1] === "undefined") return; // No materia selected

    const materia = array[numPageMaterias - 1];
    // TODO: si estaba en el primer elemento crea uno nuevo
    if(materia.descripciones_por_dia.length === 1){
      materia.descripciones_por_dia = [
        {
          dia: "",
          inicio: "",
          fin: "",
          ajustes: [],
        }
      ]
      update(numPageMaterias - 1, materia);
    } else {
      materia.descripciones_por_dia.splice(numPageDescripciones - 1, 1);
      update(numPageMaterias - 1, materia);
    }
    if(numPageDescripciones !== 1)
      setNumPageDescripciones(numPageDescripciones - 1);
  }

  const canMoveToBackPageOption = () => {
    if (typeof array[numPageMaterias - 1] === "undefined") return false;
    return numPageDescripciones === 1 || array[numPageMaterias - 1].descripciones_por_dia.length === 0;
  }

  const canMoveToNextPageOption = () => {
    if (typeof array[numPageMaterias - 1] === "undefined") return false;
    return numPageDescripciones === array[numPageMaterias - 1].descripciones_por_dia.length || array[numPageMaterias - 1].descripciones_por_dia.length === 0;
  }

  const nextPageDescripciones = () => {
    if (numPageDescripciones < array[numPageMaterias - 1].descripciones_por_dia.length) setNumPageDescripciones(numPageDescripciones + 1);
  }

  const prevPageDescripciones = () => {
    if (numPageDescripciones > 1) setNumPageDescripciones(numPageDescripciones - 1);
  }

  return(
    <div className='border border-white rounded p-1 flex flex-col'>

      <span className='text-center dark:text-white w-full'>
        Descripciones por día
      </span>

      <section
        className='flex flex-row justify-between'
      >
        <AiOutlineFileAdd
          size={30}
          className='text-gray-400'
          onClick={createOptionMateria}
        />

        <section className="flex">
          <button 
            onClick={prevPageDescripciones}
            disabled={canMoveToBackPageOption()}
            className="h-full p-[0.48rem] border-1 border-gray-500 disabled:border-gray-600 cursor-pointer disabled:cursor-not-allowed hover:border-gray-500 bg-[#212529] disabled:bg-[#343a40] rounded-l-lg text-white disabled:text-gray-500">
            &lt;
          </button>
          <p className="bg-[#212529] text-white text-lg font-medium px-4 flex items-center">
            {numPageDescripciones}
          </p>
          <button 
            onClick={nextPageDescripciones}
            disabled={canMoveToNextPageOption()}
            className="h-full p-[0.48rem] border-1 border-gray-500 disabled:border-gray-600 cursor-pointer disabled:cursor-not-allowed hover:border-gray-500 bg-[#212529] disabled:bg-[#343a40] rounded-r-lg text-white disabled:text-gray-500">
            &gt;
          </button>
        </section>

        <MdAutoDelete
          size={30}
          className='text-gray-400'
          onClick={deleteOptionMateria}
        />
      </section>
    </div>
  )
}