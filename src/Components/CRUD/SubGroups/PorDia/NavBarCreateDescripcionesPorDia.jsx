import {HiFolderAdd} from "react-icons/hi";
import {Pagination} from "react-bootstrap";
import {TbTrashXFilled} from "react-icons/tb";
import Separator from "../../../Utils/Separator.jsx";

export default function NavBarCreateDescripcionesPorDia({numPageDescripciones, array, numPageMaterias, update, setNumPageDescripciones}){

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
    <div className='border rounded p-1 d-flex flex-column'>

      <span className='text-center'>
        Descripciones por día
      </span>

      <Separator />

      <section
        className='d-flex'
      >
        <HiFolderAdd
          size={30}
          onClick={createOptionMateria}
        />
          <Pagination
            size='sm'
            className='m-auto'
          >

            <Pagination.Prev
              onClick={prevPageDescripciones}
              disabled={canMoveToBackPageOption()}
            />

            <Pagination.Item active>{numPageDescripciones}</Pagination.Item>

            <Pagination.Next
              onClick={nextPageDescripciones}
              disabled={canMoveToNextPageOption()}
            />

          </Pagination>

        <TbTrashXFilled
          size={30}
          onClick={deleteOptionMateria}
        />
      </section>
    </div>
  )
}