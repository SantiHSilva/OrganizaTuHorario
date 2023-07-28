import {Form, InputGroup} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";
import {FaDeleteLeft} from "react-icons/fa6";

export default function MostrarDescripciones({array, numPageMaterias, update}) {

  const toggleViewOnTable = (index) => {
    const materia = array[numPageMaterias - 1];
    materia.descripciones_generales[index].mostrar_en_tabla = !materia.descripciones_generales[index].mostrar_en_tabla;
    update(numPageMaterias - 1, materia);
  }

  const updateDescripcion = (e, index) => {
    const materia = array[numPageMaterias - 1];
    materia.descripciones_generales[index].titulo = e.target.value;
    update(numPageMaterias - 1, materia);
  }

  const eliminarDescripcion = (index) => {
    const materia = array[numPageMaterias - 1];
    materia.descripciones_generales.splice(index, 1);
    update(numPageMaterias - 1, materia);
  }

  return(
    <div
      className='container p-2'
    >
      <div
        className='row p-2'
      >
        {
          (typeof array[numPageMaterias - 1] === "undefined" || array[numPageMaterias - 1].descripciones_generales.length === 0)
            ?
            <span className='mx-auto text-center'>Crea una descripción nueva!</span>
            :
            array[numPageMaterias - 1].descripciones_generales.map((descripcion, index) => (
              <InputGroup className="p-1 col-6" style={{width: '50%'}} key={index} id={`${index}`}>

                <InputGroup.Checkbox
                  aria-label="Añadir en tabla"
                  checked={descripcion.mostrar_en_tabla}
                  onChange={() => toggleViewOnTable(index)}
                />

                <Form.Control aria-label="Valor a mostrar"
                              placeholder='key'
                              value={descripcion.titulo}
                              onChange={(e) => updateDescripcion(e,index)}
                />

                <InputGroup.Text aria-label='Eliminar descripción de la lista'>
                  <FaDeleteLeft
                    size={20}
                    onClick={() => eliminarDescripcion(index)}
                    className='OTHSubGroupBtn'
                  />
                </InputGroup.Text>
              </InputGroup>
            ))
        }
      </div>

    </div>
  )
}