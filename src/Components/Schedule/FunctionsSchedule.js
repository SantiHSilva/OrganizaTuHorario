function createCombinationsNoOverlap(newMaterias) {
  const combinations = [];

  function isTimeConflict(materia1, materia2) {
    for (const mt1 of materia1.descripciones_por_dia) {
      for (const mt2 of materia2.descripciones_por_dia) {
        if (mt1.dia === mt2.dia) {
          const mt1Inicio = parseInt(mt1.inicio.replace(":", ""), 10);
          const mt1Fin = parseInt(mt1.fin.replace(":", ""), 10);
          const mt2Inicio = parseInt(mt2.inicio.replace(":", ""), 10);
          const mt2Fin = parseInt(mt2.fin.replace(":", ""), 10);

          if ((mt1Inicio <= mt2Inicio && mt2Inicio < mt1Fin) || (mt2Inicio <= mt1Inicio && mt1Inicio < mt2Fin))
            return true; // Horarios se cruzan
        }
      }
    }
    return false;
  }

  function backtrack(index, currentCombination) {
    if (index === newMaterias.length) {
      combinations.push([...currentCombination]);
      return;
    }

    const materia = newMaterias[index];
    const materiasArray = materia.materias || [];

    for (let i = 0; i < materiasArray.length; i++) {
      const currentMateria = materiasArray[i];
      if (!currentCombination.some((m) => isTimeConflict(currentMateria, m))) {
        currentCombination.push(materia);
        backtrack(index + 1, currentCombination);
        currentCombination.pop();
      }
    }
  }

  if (newMaterias && newMaterias.length > 0) {
    backtrack(0, []);
  }

  return combinations;
}

function generateHours(singleCombination, mostrarPorHorario24Horas, currentPage){
  const hours = Array.from({length: 23}, (_, i) => (`${i+1}:00`.padStart(5, '0')));

  Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
  }

  if(typeof(singleCombination) !== "undefined"){
    singleCombination.map(materia => {
      const horario = materia.materias[currentPage].descripciones_por_dia
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

export { createCombinationsNoOverlap, generateHours, getArrayForTableCells }