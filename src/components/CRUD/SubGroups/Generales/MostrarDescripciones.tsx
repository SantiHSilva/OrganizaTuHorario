import React from "react"; // Es buena práctica importar React si usas JSX
import { FaDeleteLeft } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import { Horario } from "../../../../Data/groupManager";

interface props {
  array: Horario['materias'];
  numPageMaterias: number;
  update: (index: number, value: unknown) => void;
}

export default function MostrarDescripciones({array, numPageMaterias, update}: props) {

  const toggleViewOnTable = (index: number) => {
    const materia = array[numPageMaterias - 1];
    materia.descripciones_generales[index].mostrar_en_tabla = !materia.descripciones_generales[index].mostrar_en_tabla;
    update(numPageMaterias - 1, materia);
  }

  const updateDescripcion = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const materia = array[numPageMaterias - 1];
    materia.descripciones_generales[index].titulo = e.target.value;
    update(numPageMaterias - 1, materia);
  }

  const eliminarDescripcion = (index: number) => {
    const materia = array[numPageMaterias - 1];
    materia.descripciones_generales.splice(index, 1);
    update(numPageMaterias - 1, materia);
  }

  return(
    <div
      className='p-4 rounded-lg shadow-md bg-white dark:bg-gray-900' // Reemplazo de 'container p-2'
    >
      <div
        className='grid grid-cols-1 sm:grid-cols-2 gap-4' // Reemplazo de 'row p-2'
      >
        {
          (typeof array[numPageMaterias - 1] === "undefined" || array[numPageMaterias - 1].descripciones_generales.length === 0)
            ?
            <span className='col-span-full mx-auto text-center text-gray-600 dark:text-gray-400'>
              Crea una descripción nueva!
            </span>
            :
            array[numPageMaterias - 1].descripciones_generales.map((descripcion, index) => (
              <div className="flex items-center w-full" key={index} id={`${index}`}> {/* Reemplazo de InputGroup, 'p-1 col-6' y 'style={{width: '50%'}}' */}

                {/* Reemplazo de InputGroup.Checkbox */}
                <input
                  type="checkbox"
                  data-tooltip-id='tooltip-mostrar-en-tabla'
                  aria-label="Añadir en tabla"
                  checked={descripcion.mostrar_en_tabla}
                  onChange={() => toggleViewOnTable(index)}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer
                             dark:text-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
                />

                {/* Reemplazo de Form.Control */}
                <input
                  aria-label="Valor a mostrar"
                  placeholder='Descripción'
                  value={descripcion.titulo}
                  onChange={(e) => updateDescripcion(e,index)}
                  className="flex-1 block w-full px-3 py-2 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-none
                             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mx-2
                             dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-600
                             dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
                />

                {/* Reemplazo de InputGroup.Text */}
                <span className="inline-flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-200 border border-gray-300 rounded-r-md
                                  cursor-pointer hover:bg-gray-300
                                  dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                      aria-label='Eliminar descripción de la lista'
                      onClick={() => eliminarDescripcion(index)}
                >
                  <FaDeleteLeft
                    size={20}
                    className='text-gray-600 dark:text-gray-300' // Clase para el icono
                  />
                </span>
              </div>
            ))
        }
      </div>

      <Tooltip
        id='tooltip-mostrar-en-tabla'
        place='top'
        delayShow={700}
        className="!bg-gray-800 !text-white dark:!bg-gray-200 dark:!text-gray-900" // Clases para el tooltip
      >
        Elige si la descripción se mostrará en la tabla de horarios
      </Tooltip>

    </div>
  )
}