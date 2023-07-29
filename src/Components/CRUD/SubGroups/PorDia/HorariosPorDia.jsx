import {Form} from "react-bootstrap";
import {estaCruzandoElInicioConElFinal, estaCruzandoLosTiemposConOtrosTiempos} from "../../../../Utils/TimeUtils.js";

export default function HorariosPorDia({array, numPageMaterias, numPageDescripciones, update}){

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
      className='border rounded m-2'
    >
      <div
        className='d-flex'
      >
            <span className='mx-auto'>
              Horarios
            </span>
      </div>

      <hr
        style={{margin: '3px'}}
      />

      <div
        className='d-flex flex-column'
      >
        <Form
          validated={isValidDay()}
        >
          <Form.Group
            className='p-1 mx-auto'
            style={{
              width: '90%',
            }}
          >
            <Form.Label>
              Día de la semana
            </Form.Label>
            <Form.Control
              as="select"
              value={obtenerDiaDeLaSemana()}
              onChange={(e) => {
                const materia = array[numPageMaterias - 1];
                materia.descripciones_por_dia[numPageDescripciones - 1].dia = e.target.value;
                update(numPageMaterias - 1, materia);
              }}
              required
            >
              <option	value='' label={'Selecciona un día'}/>
              <option value='1' label={'Lunes'} />
              <option value='2' label={'Martes'} />
              <option value='3' label={'Miércoles'} />
              <option value='4' label={'Jueves'} />
              <option value='5' label={'Viernes'} />
              <option value='6' label={'Sábado'} />
              <option value='7' label={'Domingo'} />
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Selecciona un día de la semana
            </Form.Control.Feedback>
          </Form.Group>
        </Form>

        <hr
          style={{margin: '3px'}}
        />

        <section
          className='d-flex mx-auto'
        >
          <Form
            validated={ needsToModifyStartHour() }
          >
            <Form.Group
              className='p-2'
            >
              <Form.Label>
                Hora inicio
              </Form.Label>
              <Form.Control
                required
                type='time'
                value={obtenerHoraInicio()}
                onChange={(e) => {
                  const materia = array[numPageMaterias - 1];
                  materia.descripciones_por_dia[numPageDescripciones - 1].inicio = e.target.value;
                  update(numPageMaterias - 1, materia);
                }
                }
                max={obtenerHoraMaxInicio()}
              />
              <Form.Control.Feedback type="invalid">
                {
                  invalidMessageStartHour()
                }
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Form
            validated={isNotEmptyEndHour()}
          >
            <Form.Group
              className='p-2'
            >
              <Form.Label>
                Hora Fin
              </Form.Label>
              <Form.Control
                required
                type='time'
                value={obtenerHoraFin()}
                onChange={(e) => {
                  const materia = array[numPageMaterias - 1];
                  materia.descripciones_por_dia[numPageDescripciones - 1].fin = e.target.value;
                  update(numPageMaterias - 1, materia);
                }
                }
                min={obtenerHoraMaxFin()}
              />
              <Form.Control.Feedback type="invalid">
                Ingresa una hora de fin
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </section>
      </div>

    </div>
  )
}