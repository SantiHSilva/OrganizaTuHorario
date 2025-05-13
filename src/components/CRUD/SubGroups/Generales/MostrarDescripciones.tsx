import {Form, InputGroup} from "react-bootstrap";
import {FaDeleteLeft} from "react-icons/fa6";
import {Tooltip} from "react-tooltip";
import { Horario } from "../../../../Data/groupManager";

interface props {
  array: Horario['materias'];
  numPageMaterias: number;
  update: (index: number, value: unknown) => void;
}

export default function MostrarDescripciones({array, numPageMaterias, update}: props) {

  const toggleViewOnTable = (index:number) => {
    const materia = array[numPageMaterias - 1];
    materia.descripciones_generales[index].mostrar_en_tabla = !materia.descripciones_generales[index].mostrar_en_tabla;
    update(numPageMaterias - 1, materia);
  }

  const updateDescripcion = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
    const materia = array[numPageMaterias - 1];
    materia.descripciones_generales[index].titulo = e.target.value;
    update(numPageMaterias - 1, materia);
  }

  const eliminarDescripcion = (index : number) => {
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
                  data-tooltip-id='tooltip-mostrar-en-tabla'
                  aria-label="Añadir en tabla"
                  checked={descripcion.mostrar_en_tabla}
                  onChange={() => toggleViewOnTable(index)}
                />

                <Form.Control aria-label="Valor a mostrar"
                              placeholder='Descripción'
                              value={descripcion.titulo}
                              // @ts-expect-error yo que se
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

      <Tooltip
        id='tooltip-mostrar-en-tabla'
        place='top'
        delayShow={700}
      >
        Elige si la descripción se mostrará en la tabla de horarios
      </Tooltip>

    </div>
  )
}