const estaCruzandoElInicioConElFinal =  (inicio = "00:00", fin = "00:00") => {
  const [inicioHora, inicioMinutos] = inicio.split(":").map(Number);
  const [finHora, finMinutos] = fin.split(":").map(Number);

  if(inicio === fin)
    return true

  if(inicioHora > finHora){
    console.log("inicioHora > finHora")
    return true;
  }
  else if(inicioHora === finHora){
    console.log("inicioHora === finHora")
    return inicioMinutos > finMinutos;
  }
  return false;

}

const estaCruzandoLosTiemposConOtrosTiempos = (dia1 = "", inicio1 = "00:00", fin1 = "00:00", dia2 = "", inicio2 = "00:00", fin2 = "00:00") => {
  const [dia1InicioHora, dia1InicioMinutos] = inicio1.split(":").map(Number);
  const [dia1FinHora, dia1FinMinutos] = fin1.split(":").map(Number);
  const [dia2InicioHora, dia2InicioMinutos] = inicio2.split(":").map(Number);
  const [dia2FinHora, dia2FinMinutos] = fin2.split(":").map(Number);

  //console.log(`dia1: ${dia1}, inicio1: ${inicio1}, fin1: ${fin1}, dia2: ${dia2}, inicio2: ${inicio2}, fin2: ${fin2}`)

  if (dia1 === dia2) {
    if (dia1FinHora < dia2InicioHora || (dia1FinHora === dia2InicioHora && dia1FinMinutos <= dia2InicioMinutos)) {
      return false;
    }

    return !(dia2FinHora < dia1InicioHora || (dia2FinHora === dia1InicioHora && dia2FinMinutos <= dia1InicioMinutos));

  }

  return false;
};



const isInvalidStartHour = (startHour = "", endHour = "") => {
  return startHour === "" || estaCruzandoElInicioConElFinal(startHour, endHour) || (startHour === endHour);
}

export {estaCruzandoElInicioConElFinal, isInvalidStartHour, estaCruzandoLosTiemposConOtrosTiempos};