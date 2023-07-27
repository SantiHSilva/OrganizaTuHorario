import {HiFolderAdd} from "react-icons/hi";
import {Pagination} from "react-bootstrap";
import {TbTrashXFilled} from "react-icons/tb";

export default function NavBarCRUDMateria({array, push, numPageMaterias, remove, setNumPageDescripciones, setNumPageMaterias}){
  const createNewMateria = () => {
    console.log("Creando nueva materia...")
    const newData = {
      descripciones_generales: [],
      descripciones_por_dia : [
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

    setNumPageMaterias(numPageMaterias + 1);
    setNumPageDescripciones(1)

  }

  const deleteCurrentMateria = () => {
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
    <div className='d-flex border rounded p-1'>
      <HiFolderAdd
        size={30}
        onClick={createNewMateria}
      />

      <Pagination
        size='sm'
        className='m-auto'
      >
        <Pagination.Prev
          onClick={prevPageGlobal}
          disabled={numPageMaterias === 1 || array.length === 0}
        />
        <Pagination.Item active>{numPageMaterias}</Pagination.Item>
        <Pagination.Next
          onClick={nextPageGlobal}
          disabled={numPageMaterias === array.length || array.length === 0}
        />
      </Pagination>

      <TbTrashXFilled
        size={30}
        onClick={deleteCurrentMateria}
      />
    </div>
  )
}