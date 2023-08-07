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

  const combinationsWithoutTimeOverlap = filterCombinations(combinations);

  console.log("Combinaciones")
  console.log(combinationsWithoutTimeOverlap)

  // remover arrays vacios por ejemplo [[]] -> []
  return combinationsWithoutTimeOverlap.filter(combination => combination.length > 0);
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

function reformat12HTo24h(dato){
  function formatNumber(number){
    return number.toString().padStart(2, "0")
  }

  // Detectar si tiene AM o PM

  if(dato.includes("AM") || dato.includes("PM")){
    const periodo = dato.slice(-2)
    dato = dato.slice(0, -3)
    const [horas, minutos] = dato.split(":").map(Number)
    if(periodo === "AM")
      return dato
    if(periodo === "AM" && horas === 12)
      return `00:${formatNumber(minutos)}`
    if(periodo === "PM" && horas === 12)
      return dato
    return(`${horas + 12}:${formatNumber(minutos)}`)
  }
  return dato

}

function getArrayForTableCells(currentHour, currentDay, singleCombination){
  if(currentHour === "") return {rowSpan: 0}
  currentHour = reformat12HTo24h(currentHour)
  const array = {
    rowSpan: 1
  }

  if(typeof(singleCombination) === "undefined")
    return array

  function verSiLaHoraEstaDentroDelRango(horaComprobacion = "00:00", horaInicio = "00:00", horaFin = "00:00"){
    const [horaComprobacionHoras, horaComprobacionMinutos] = horaComprobacion.split(":").map(Number)
    const [horaInicioHoras, horaInicioMinutos] = horaInicio.split(":").map(Number)
    const [horaFinHoras, horaFinMinutos] = horaFin.split(":").map(Number)

    if(horaComprobacionHoras >= horaInicioHoras && horaComprobacionHoras <= horaFinHoras){
      if(horaComprobacionHoras === horaInicioHoras && horaComprobacionMinutos < horaInicioMinutos){
        return false
      }
      return !(horaComprobacionHoras === horaFinHoras && horaComprobacionMinutos > horaFinMinutos);
    }
    return false
  }

  function detectarSiLaMateriaVaEnLaCelda(materia, currentDay, currentHour){
    // Si dentro de la materia, en las descripciones por día hay una que tenga el día actual
    // Y si el currentHour está entre el inicio y el fin de la descripción por día
    // Entonces la materia va en la celda

    // Retorna undefined si no hay descripciones por día que cuadren con día y hora
    // Retorna La materia base filtrando las descripciones por día que cuadren con día y hora
    const horario = materia.materias[0].descripciones_por_dia
    for(const revisar of horario){
      if(parseInt(revisar.dia) === currentDay){
        if(verSiLaHoraEstaDentroDelRango(currentHour, revisar.inicio, revisar.fin)){
          const copy = JSON.parse(JSON.stringify(materia))
          copy.materias[0].descripciones_por_dia = [revisar]
          return copy
        }
      }
    }

    return undefined // No va en la celda actual
  }

  function calculateRowSpan(horario){
    const horas = generateHours(singleCombination, true)

    const inicio = horas.indexOf(horario.inicio)
    const fin = horas.indexOf(horario.fin)

    return fin - inicio +1
  }

  for(const materia of singleCombination){
    const materiaBase = detectarSiLaMateriaVaEnLaCelda(materia, currentDay, currentHour)
    if(typeof(materiaBase) !== "undefined"){

      if(materiaBase.materias[0].descripciones_por_dia[0].inicio !== currentHour && verSiLaHoraEstaDentroDelRango(currentHour, materiaBase.materias[0].descripciones_por_dia[0].inicio, materiaBase.materias[0].descripciones_por_dia[0].fin))
        return({rowSpan: 0})

      return ({
        materiaBase,
        rowSpan: calculateRowSpan(materiaBase.materias[0].descripciones_por_dia[0])
      })
    }
  }

  return array
}

export { createCombinationsBacktracking, generateHours, getArrayForTableCells }