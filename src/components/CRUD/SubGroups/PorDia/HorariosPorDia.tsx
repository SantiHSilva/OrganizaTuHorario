import React from "react"; // Added React import
import {estaCruzandoElInicioConElFinal, estaCruzandoLosTiemposConOtrosTiempos} from "../../../../Utils/TimeUtils.js";
import { Horario } from "../../../../Data/groupManager.js";

interface props {
  array: Horario["materias"];
  numPageMaterias: number;
  numPageDescripciones: number;
  update: (index: number, value: Horario["materias"][0]) => void;
}

export default function HorariosPorDia({array, numPageMaterias, numPageDescripciones, update}: props) {

  const obtenerDiaDeLaSemana = () => {
    if(typeof array[numPageMaterias - 1] === "undefined") return 1;
    if(typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined") return 1;
    return array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].dia;
  }

  const obtenerHoraInicio = () => {
    if(typeof array[numPageMaterias - 1] === "undefined") return "";
    if(typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined") return "";
    return array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].inicio;
  }

  const obtenerHoraMaxInicio = () => {
    const [hora, minuto] = obtenerHoraInicio().split(":").map(Number);
    const minutoRemovido = (minuto === 0) ? 59 : minuto - 1;
    const horaAjustada = (minuto === 0) ? hora - 1 : hora;
    return `${horaAjustada.toString().padStart(2, "0")}:${minutoRemovido.toString().padStart(2, "0")}`;
  }

  const obtenerHoraFin = () => {
    if(typeof array[numPageMaterias - 1] === "undefined") return "";
    if(typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined") return "";
    return array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].fin;
  }

  const obtenerHoraMaxFin = () => {
    const [hora, minuto] = obtenerHoraFin().split(":").map(Number);
    const minutoRemovido = (minuto === 0) ? 59 : minuto - 1;
    const horaAjustada = (minuto === 0) ? hora - 1 : hora;
    return `${horaAjustada.toString().padStart(2, "0")}:${minutoRemovido.toString().padStart(2, "0")}`;
  }

  const isNotUndefined = () => {
    return typeof array[numPageMaterias - 1] !== "undefined" && typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] !== "undefined"
  }

  const isValidDay = () => {
    // Curiosamente debe retornar false para que sea valido...
    return isNotUndefined() &&
      array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].dia === '';
  }

  const isNotEmptyStartHour = () => {
    return isNotUndefined() &&
      array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].inicio === '';
  }

  const isNotEmptyEndHour = () => {
    return isNotUndefined() &&
      array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].fin === '';
  }

  const SiNoEsMayorLaHoraDeInicioQueLaDeFin = () => {
    if(!isNotEmptyStartHour() && !isNotEmptyEndHour())
      return (estaCruzandoElInicioConElFinal(obtenerHoraInicio(), obtenerHoraFin()));
    return false;
    // Para que sea valido debe retornar false
  }

  const existeConflictoDeTiempoEntreOtrasDescripcionesPorDia = () => {
    if(typeof array[numPageMaterias - 1] === "undefined") return false;
    if(typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined") return false;
    const dia = array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].dia;
    const inicio = array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].inicio;
    const fin = array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].fin;
    const descripcionesPorDia = array[numPageMaterias - 1].descripciones_por_dia;
    console.log("descripcionesPorDia: ", descripcionesPorDia);
    return descripcionesPorDia.some((descripcionPorDia, index) => {
      if(index === numPageDescripciones - 1) return false; // No se compara con si mismo, solo con los demas
      return estaCruzandoLosTiemposConOtrosTiempos(dia, inicio, fin, descripcionPorDia.dia, descripcionPorDia.inicio, descripcionPorDia.fin)
    });
  }

  const needsToModifyStartHour = () => {
    return isNotEmptyStartHour() || SiNoEsMayorLaHoraDeInicioQueLaDeFin() || (obtenerHoraInicio() === obtenerHoraFin()) || existeConflictoDeTiempoEntreOtrasDescripcionesPorDia();
  }

  const invalidMessageStartHour = () => {
    if(isNotEmptyStartHour()){
      return "Debe ingresar una hora de inicio";
    }
    else if(SiNoEsMayorLaHoraDeInicioQueLaDeFin()){
      return "La hora no puede ser mayor a la hora final";
    }
    else if(obtenerHoraInicio() === obtenerHoraFin())
    {
      return "La hora de inicio no puede ser igual a la de fin";
    }
    else if(existeConflictoDeTiempoEntreOtrasDescripcionesPorDia()){
      return "Existe conflicto de tiempo entre descripciones por día";
    }
    else{
      return "Error desconocido";
    }
  }

  return(
    <div
      className='border rounded m-2 p-4 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700' // Reemplazo de 'border rounded m-2' y añade bg/dark-bg
    >
      <div
        className='flex justify-center mb-2' // Reemplazo de 'd-flex' y añade margen inferior
      >
            <span className='mx-auto text-gray-800 dark:text-gray-200 font-semibold text-lg'> {/* Reemplazo de 'mx-auto' y añade estilos de texto */}
              Horarios
            </span>
      </div>

      <hr
        className='my-2 border-gray-300 dark:border-gray-700' // Reemplazo de 'style={{margin: '3px'}}' y añade estilos de hr/dark-hr
      />

      <div
        className='flex flex-col' // Reemplazo de 'd-flex flex-column'
      >
        {/* Reemplazo de Form */}
        <div className="w-full"> {/* Wrapper for Form.Group */}
          {/* Reemplazo de Form.Group */}
          <div
            className='p-1 mx-auto w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3' // Adapta 'p-1 mx-auto' y 'width: '90%'' para ser responsive
          >
            {/* Reemplazo de Form.Label */}
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Día de la semana
            </label>
            {/* Reemplazo de Form.Control as="select" */}
            <select
              value={obtenerDiaDeLaSemana()}
              onChange={(e) => {
                const materia = array[numPageMaterias - 1];
                materia.descripciones_por_dia[numPageDescripciones - 1].dia = e.target.value;
                update(numPageMaterias - 1, materia);
              }}
              required
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                         bg-white text-gray-900 border-gray-300
                         dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400 dark:focus:border-indigo-400
                         ${isValidDay() ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`} // Conditional validation styling
            >
              <option value='' label={'Selecciona un día'}/>
              <option value='1' label={'Lunes'} />
              <option value='2' label={'Martes'} />
              <option value='3' label={'Miércoles'} />
              <option value='4' label={'Jueves'} />
              <option value='5' label={'Viernes'} />
              <option value='6' label={'Sábado'} />
              <option value='7' label={'Domingo'} />
            </select>
            {/* Reemplazo de Form.Control.Feedback */}
            {isValidDay() && ( // Show feedback only if invalid
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                Selecciona un día de la semana
              </p>
            )}
          </div>
        </div>

        <hr
          className='my-2 border-gray-300 dark:border-gray-700' // Reemplazo de 'style={{margin: '3px'}}' y añade estilos de hr/dark-hr
        />

        <section
          className='flex justify-center mx-auto w-full' // Reemplazo de 'd-flex mx-auto'
        >
          {/* Reemplazo de Form */}
          <div className="w-1/2 px-2"> {/* Wrapper for Form.Group, adjust width as needed */}
            {/* Reemplazo de Form.Group */}
            <div
              className='p-2'
            >
              {/* Reemplazo de Form.Label */}
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Hora inicio
              </label>
              {/* Reemplazo de Form.Control */}
              <input
                required
                type='time'
                value={obtenerHoraInicio()}
                onChange={(e) => {
                  const materia = array[numPageMaterias - 1];
                  materia.descripciones_por_dia[numPageDescripciones - 1].inicio = e.target.value;
                  update(numPageMaterias - 1, materia);
                }}
                max={obtenerHoraMaxInicio()}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                           bg-white text-gray-900 border-gray-300
                           dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400 dark:focus:border-indigo-400
                           ${needsToModifyStartHour() ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`} // Conditional validation styling
              />
              {/* Reemplazo de Form.Control.Feedback */}
              {needsToModifyStartHour() && ( // Show feedback only if invalid
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {invalidMessageStartHour()}
                </p>
              )}
            </div>
          </div>
          {/* Reemplazo de Form */}
          <div className="w-1/2 px-2"> {/* Wrapper for Form.Group, adjust width as needed */}
            {/* Reemplazo de Form.Group */}
            <div
              className='p-2'
            >
              {/* Reemplazo de Form.Label */}
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Hora Fin
              </label>
              {/* Reemplazo de Form.Control */}
              <input
                required
                type='time'
                value={obtenerHoraFin()}
                onChange={(e) => {
                  const materia = array[numPageMaterias - 1];
                  materia.descripciones_por_dia[numPageDescripciones - 1].fin = e.target.value;
                  update(numPageMaterias - 1, materia);
                }}
                min={obtenerHoraMaxFin()}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                           bg-white text-gray-900 border-gray-300
                           dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400 dark:focus:border-indigo-400
                           ${isNotEmptyEndHour() ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`} // Conditional validation styling
              />
              {/* Reemplazo de Form.Control.Feedback */}
              {isNotEmptyEndHour() && ( // Show feedback only if invalid
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  Ingresa una hora de fin
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}