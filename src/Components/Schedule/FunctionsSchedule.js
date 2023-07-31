import {estaCruzandoLosTiemposConOtrosTiempos} from "../../Utils/TimeUtils.js";

function createCombinationsBacktracking(newMaterias) {
  const combinations = [];
  const currentCombination = [];

  function backtrack(index) {
    if (index === newMaterias.length) {
      combinations.push([...currentCombination]);
      return;
    }

    const materia = newMaterias[index];
    const materiasArray = materia.materias || [];

    if (materiasArray.length > 0) {
      for (let i = 0; i < materiasArray.length; i++) {
        const descripciones_por_dia = materiasArray[i].descripciones_por_dia || [];
        if (descripciones_por_dia.length > 0) {
          const copyMateria = { ...materia };
          copyMateria.materias = [materiasArray[i]];
          currentCombination.push(copyMateria);
          backtrack(index + 1);
          currentCombination.pop();
        }
      }
    } else {
      backtrack(index + 1); // Omitir el grupo sin opciones y continuar con el siguiente
    }
  }

  backtrack(0);

  function filterCombinations(combinations) {
    function doTimeRangesOverlap(range1, range2) {
      return estaCruzandoLosTiemposConOtrosTiempos(range1.dia, range1.inicio, range1.fin, range2.dia, range2.inicio, range2.fin)
    }

    function combinationHasTimeOverlap(combination) {
      for (let i = 0; i < combination.length - 1; i++) {
        for (let j = i + 1; j < combination.length; j++) {
          const materia1 = combination[i];
          const materia2 = combination[j];
          for (const desc1 of materia1.materias[0].descripciones_por_dia) {
            for (const desc2 of materia2.materias[0].descripciones_por_dia) {
              if (doTimeRangesOverlap(desc1, desc2)) {
                return true;
              }
            }
          }
        }
      }
      return false;
    }

    return combinations.filter(combination => !combinationHasTimeOverlap(combination));
  }

  return filterCombinations(combinations);
}

function generateHours(singleCombination, mostrarPorHorario24Horas){
  const hours = Array.from({length: 23}, (_, i) => (`${i+1}:00`.padStart(5, '0')));

  Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
  }

  if(typeof(singleCombination) !== "undefined"){
    singleCombination.map(materia => {
      const horario = materia.materias[0].descripciones_por_dia
      for(const revisar of horario){
        if(!hours.includes(revisar.inicio)){
          const [horaInicio, minInicio] = revisar.inicio.split(':')
          const indexHoraInicio = hours.indexOf(`${horaInicio}:00`)
          hours.insert(indexHoraInicio+1, `${horaInicio}:${minInicio}`)
        }
        if(!hours.includes(revisar.fin)){
          const [horaFin, minFin] = revisar.fin.split(':')
          const indexHoraFin = hours.indexOf(`${horaFin}:00`)
          hours.insert(indexHoraFin+1, `${horaFin}:${minFin}`)
        }
      }
    })
  }

  // Función de comparación personalizada para ordenar las horas
  function compararHoras(hora1, hora2) {
    // Dividimos las horas y minutos y los convertimos a números enteros
    const [h1, m1] = hora1.split(':').map(Number);
    const [h2, m2] = hora2.split(':').map(Number);

    // Comparamos las horas primero
    if (h1 < h2) return -1;
    if (h1 > h2) return 1;

    // Si las horas son iguales, comparamos los minutos
    if (m1 < m2) return -1;
    if (m1 > m2) return 1;

    // Si las horas y minutos son iguales
    return 0;
  }

  hours.sort(compararHoras);

  if(mostrarPorHorario24Horas)
    return hours
  else
    return hoursTo12HFormat(hours)

}

function formatNumber(number){
  //return 0{number}
  return number.toString().padStart(2, '0')
}

function hoursTo12HFormat(hours){
  return hours.map(hour => {
    const [h, m] = hour.split(':')
    return `${h%12 === 0 ? 12 : formatNumber(h%12)}:${m} ${h < 12 ? 'AM' : 'PM'}`
  })
}

function getArrayForTableCells(currentHour, singleCombination, hours){
  // Del currentHour solo obtener las 5 primeras letras
  currentHour = currentHour.slice(0, 5)
  const array = []

  if(typeof(singleCombination) === "undefined")
    return array
  else
    return array

  function getRowSpanForTableCells(currentMateriaDescriptionPorDia, hours){
    const [horaInicio, minInicio] = currentMateriaDescriptionPorDia.inicio.split(':')
    const [horaFin, minFin] = currentMateriaDescriptionPorDia.fin.split(':')
    const indexHoraInicio = hours.indexOf(`${horaInicio}:${minInicio}`)
    const indexHoraFin = hours.indexOf(`${horaFin}:${minFin}`)
    return indexHoraFin - indexHoraInicio
  }

  for (let i = 0; i < 7; i++) {

    const day = i+1 // 1 = Lunes, 2 = Martes, etc

    // Buscar si hay una materia que tenga el dia actual

    for(const materia of singleCombination){
      for(const currentMateriaDescriptionPorDia of materia.descripciones_por_dia){
        if(currentMateriaDescriptionPorDia.dia === day){
          const rowSpan = getRowSpanForTableCells(currentMateriaDescriptionPorDia, hours)
          if(currentMateriaDescriptionPorDia.inicio === currentHour){
            array.push({
              materia: materia,
              rowSpan: rowSpan
            })
          }
        }
      }
    }

  }

  return array
}

export { createCombinationsBacktracking, generateHours, getArrayForTableCells }