const estaCruzandoElInicioConElFinal =  (inicio = "00:00", fin = "00:00") => {
  const [inicioHora, inicioMinutos] = inicio.split(":").map(Number);
  const [finHora, finMinutos] = fin.split(":").map(Number);

  if(inicioHora > finHora){
    return true;
  }
  else if(inicioHora === finHora){
    return inicioMinutos > finMinutos;
  }
  return false;

}

const isInvalidStartHour = (startHour = "", endHour = "") => {
  return startHour === "" || estaCruzandoElInicioConElFinal(startHour, endHour) || (startHour === endHour);
}

export {estaCruzandoElInicioConElFinal, isInvalidStartHour};