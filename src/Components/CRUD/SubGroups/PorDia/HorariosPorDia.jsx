import {Form} from "react-bootstrap";

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

  const obtenerHoraFin = () => {
    if(typeof array[numPageMaterias - 1] === "undefined") return "";
    if(typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined") return "";
    return array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].fin;
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
          validated={
            typeof array[numPageMaterias - 1] !== "undefined" &&
            typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] !== "undefined" &&
            array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].dia === ''
          }
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
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

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
            validated={
              /* Salta el mensaje de error si esto es verdadero*/
              typeof array[numPageMaterias - 1] !== "undefined" &&
              typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] !== "undefined" &&
              array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].inicio === ''
              /* TODO: Checkear que la hora de inicio NO sea mayor a la de Fin */
            }
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
                max={obtenerHoraInicio()}
              />
              <Form.Control.Feedback type="invalid">
                {
                  typeof array[numPageMaterias - 1] !== "undefined" &&
                  typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] !== "undefined" &&
                  array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].inicio === ''
                    ?
                    "Selecciona una hora de inicio"
                    :
                    "La hora de inicio debe ser menor a la hora de fin"
                }
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Form.Group
            className='p-2'
          >
            <Form.Label>
              Hora Fin
            </Form.Label>
            <Form.Control
              type='time'
              value={obtenerHoraFin()}
              onChange={(e) => {
                const materia = array[numPageMaterias - 1];
                materia.descripciones_por_dia[numPageDescripciones - 1].fin = e.target.value;
                update(numPageMaterias - 1, materia);
              }
              }
              min={obtenerHoraInicio()}
            />
          </Form.Group>
        </section>
      </div>

    </div>
  )
}