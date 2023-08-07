import {BiBookAdd} from "react-icons/bi";
import {Form, InputGroup} from "react-bootstrap";
import {FaDeleteLeft} from "react-icons/fa6";
import {Tooltip} from "react-tooltip";

export default function AjustacionesPorDia({array, numPageMaterias, numPageDescripciones, update}){
  return(
    <div
      className='border rounded m-2'
    >
      <div className='d-flex  p-1'>
                          <span
                            className='m-auto'
                          >
                            Ajustes
                          </span>
        <BiBookAdd
          className='OTHSubGroupBtn'
          size={30}
          onClick={() => {
            if(typeof array[numPageMaterias - 1] === "undefined") return; // No materia selected
            if(typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined") return;
            const newData = {
              mostrar_en_tabla: true,
              titulo: "",
            }
            const materia = array[numPageMaterias - 1];
            materia.descripciones_por_dia[numPageDescripciones - 1].ajustes.push(newData);
            update(numPageMaterias - 1, materia);
          }}
        />

      </div>
      <hr
        style={{margin: 5}}
      />

      <div
        className='container p-2'
      >
        <div
          className='row p-2'
        >
          {
            (typeof array[numPageMaterias - 1] === "undefined" || typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined" || array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].ajustes.length === 0)
              ?
              <span className='mx-auto text-center'>Crea un ajuste nuevo!</span>
              :
              array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].ajustes.map((descripcion, index) => (
                <InputGroup className="p-1 col-6" style={{width: '50%'}} key={index} id={`${index}`}>
                  <InputGroup.Checkbox
                    aria-label="Añadir en tabla"
                    data-tooltip-id='tooltip-ajuste-mostrar-en-tabla'
                    checked={descripcion.mostrar_en_tabla}
                    onChange={() => {
                      const materia = array[numPageMaterias - 1];
                      materia.descripciones_por_dia[numPageDescripciones - 1].ajustes[index].mostrar_en_tabla = !materia.descripciones_por_dia[numPageDescripciones - 1].ajustes[index].mostrar_en_tabla;
                      update(numPageMaterias - 1, materia);
                    }}
                  />
                  <Form.Control aria-label="Valor a mostrar" placeholder='Descripción' value={descripcion.titulo} onChange={
                    (e) => {
                      const materia = array[numPageMaterias - 1];
                      materia.descripciones_por_dia[numPageDescripciones - 1].ajustes[index].titulo = e.target.value;
                      update(numPageMaterias - 1, materia);
                    }
                  } />
                  <InputGroup.Text
                    aria-label='Eliminar descripción de la lista'
                  >
                    <FaDeleteLeft
                      className='OTHSubGroupBtn'
                      size={20}
                      onClick={() => {
                        console.log(`Eliminando descripción general ${index}...`)
                        const materia = array[numPageMaterias - 1];
                        materia.descripciones_por_dia[numPageDescripciones - 1].ajustes.splice(index, 1);
                        update(numPageMaterias - 1, materia);
                      }}
                    />
                  </InputGroup.Text>
                </InputGroup>
              ))

          }
        </div>

      </div>

      <Tooltip
        id='tooltip-ajuste-mostrar-en-tabla'
        place='top'
        effect='solid'
        delayShow={700}
      >
        Elige si la descripción se mostrará en la tabla de horarios
      </Tooltip>

    </div>
  )
}