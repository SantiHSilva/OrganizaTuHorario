import {BiBookAdd} from "react-icons/bi";
import {FaDeleteLeft} from "react-icons/fa6";
import {Tooltip} from "react-tooltip";
import { Materia } from "../../../../Data/groupManager";

interface props {
  array: Materia[];
  numPageMaterias: number;
  numPageDescripciones: number;
  update: (index: number, materia: Materia) => void;
}

export default function AjustacionesPorDia({array, numPageMaterias, numPageDescripciones, update}: props) {
  return(
    <div
      className='border rounded-md m-2 p-4 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700' // Reemplazo de 'border rounded m-2' y añade bg/dark-bg, padding y bordes.
    >
      <div className='flex items-center justify-between p-2'> {/* Reemplazo de 'd-flex p-1', añade justify-between */}
        <span
          className='mx-auto text-lg font-semibold text-gray-800 dark:text-gray-200' // Reemplazo de 'm-auto' y añade estilos de texto
        >
          Ajustes
        </span>
        <BiBookAdd
          className='text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-300 cursor-pointer' // Reemplazo de 'OTHSubGroupBtn' con estilos de Tailwind
          size={30}
          onClick={() => {
            if(typeof array[numPageMaterias - 1] === "undefined") return; // No materia selected
            if(typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined") return;
            const newData = {
              mostrar_en_tabla: true,
              titulo: "",
            }
            const materia = array[numPageMaterias - 1];
            // Se añade un chequeo opcional para 'ajustes' antes de hacer push
            if (!materia.descripciones_por_dia[numPageDescripciones - 1].ajustes) {
                materia.descripciones_por_dia[numPageDescripciones - 1].ajustes = [];
            }
            materia.descripciones_por_dia[numPageDescripciones - 1]?.ajustes?.push(newData);
            update(numPageMaterias - 1, materia);
          }}
        />
      </div>
      <hr
        className='my-2 border-gray-300 dark:border-gray-700' // Reemplazo de 'style={{margin: 5}}' y añade estilos de hr/dark-hr
      />

      <div
        className='p-2 grid grid-cols-1 sm:grid-cols-2 gap-4' // Reemplazo de 'container p-2' y 'row p-2' con un layout de grid responsive
      >
        {
          (typeof array[numPageMaterias - 1] === "undefined" || typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined" || array[numPageMaterias - 1]?.descripciones_por_dia[numPageDescripciones - 1]?.ajustes?.length === 0)
            ?
            <span className='col-span-full mx-auto text-center text-gray-600 dark:text-gray-400'>Crea un ajuste nuevo!</span>
            :
            array[numPageMaterias - 1]?.descripciones_por_dia[numPageDescripciones - 1]?.ajustes?.map((descripcion, index) => (
              <div className="flex items-center w-full" key={index} id={`ajuste-${index}`}> {/* Reemplazo de InputGroup, 'p-1 col-6' y 'style={{width: '50%'}}' */}
                {/* Reemplazo de InputGroup.Checkbox */}
                <input
                  type="checkbox"
                  aria-label="Añadir en tabla"
                  data-tooltip-id='tooltip-ajuste-mostrar-en-tabla'
                  checked={descripcion.mostrar_en_tabla}
                  onChange={() => {
                    const materia = array[numPageMaterias - 1];
                    // @ts-expect-error no lo se resolver ahora
                    materia.descripciones_por_dia[numPageDescripciones - 1].ajustes[index].mostrar_en_tabla = !materia.descripciones_por_dia[numPageDescripciones - 1].ajustes[index].mostrar_en_tabla;
                    update(numPageMaterias - 1, materia);
                  }}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer
                             dark:text-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
                />
                {/* Reemplazo de Form.Control */}
                <input
                  type="text"
                  aria-label="Valor a mostrar"
                  placeholder='Descripción'
                  value={descripcion.titulo}
                  onChange={(e) => {
                    const materia = array[numPageMaterias - 1];
                    // @ts-expect-error no lo se resolver ahora
                    materia.descripciones_por_dia[numPageDescripciones - 1].ajustes[index].titulo = e.target.value;
                    update(numPageMaterias - 1, materia);
                  }}
                  className="flex-1 block w-full px-3 py-2 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-none
                             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mx-2
                             dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-600
                             dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
                />
                {/* Reemplazo de InputGroup.Text */}
                <span
                  aria-label='Eliminar descripción de la lista'
                  className="inline-flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-200 border border-gray-300 rounded-r-md
                                  cursor-pointer hover:bg-gray-300
                                  dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                  onClick={() => {
                    console.log(`Eliminando descripción general ${index}...`)
                    const materia = array[numPageMaterias - 1];
                    // @ts-expect-error no lo se resolver ahora
                    materia.descripciones_por_dia[numPageDescripciones - 1].ajustes.splice(index, 1);
                    update(numPageMaterias - 1, materia);
                  }}
                >
                  <FaDeleteLeft
                    className='text-gray-600 dark:text-gray-300' // Estilos de Tailwind para el icono
                    size={20}
                  />
                </span>
              </div>
            ))
          }
        </div>

      <Tooltip
        id='tooltip-ajuste-mostrar-en-tabla'
        place='top'
        delayShow={700}
        className="!bg-gray-800 !text-white dark:!bg-gray-200 dark:!text-gray-900" // Clases para el tooltip
      >
        Elige si la descripción se mostrará en la tabla de horarios
      </Tooltip>

    </div>
  )
}