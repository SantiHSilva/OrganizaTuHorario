import {BiBookAdd} from "react-icons/bi";

export default function NavCreateDescripcion({array, numPageMaterias, update}) {

  const createDescripcionGeneral = (array, numPageMaterias, update) => {
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
    <div className='d-flex  p-1'>
        <span className='m-auto'>
          Descripciones generales
        </span>
      <BiBookAdd
        size={30}
        onClick={() => createDescripcionGeneral(array, numPageMaterias, update)}
      />
    </div>
  )
}