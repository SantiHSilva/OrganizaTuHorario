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
        currentCombination.push(currentMateria);
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

export { createCombinationsNoOverlap }