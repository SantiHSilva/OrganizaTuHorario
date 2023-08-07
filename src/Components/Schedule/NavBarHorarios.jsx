import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Pagination, Form, Dropdown} from "react-bootstrap";
import {Ri24HoursLine} from "react-icons/ri";
import {Tooltip} from "react-tooltip";
import {HiEllipsisVertical} from "react-icons/hi2";

export const NavBarHorarios = ({combinaciones, pagina, setPagina, mostrarPorHorario24Horas, setMostrarPorHorario24Horas, theme}) => {

  function prevPageHorario(){
    if(pagina === 0) return;
    setPagina(pagina - 1);
  }

  function nextPageHorario(){
    if(pagina === combinaciones.length) return;
    setPagina(pagina + 1);
  }

  return (
    <>
      <Navbar className="shadow-sm rounded">
        <Container fluid>

            <h
              className='fs-5'
              style={{
                color: theme === 'dark' ? '#ffffff' : '#000000',
              }}
            >
              Horarios
            </h>

            <Pagination
              className='m-0'
            >
              <Pagination.Prev
                onClick={prevPageHorario}
                disabled={pagina === 0}
              />
              <Form.Select
                style={{
                  border: 'none',
                  borderRadius: '0px',

                }}
                onChange={(e) => setPagina(parseInt(e.target.value))}
                value={pagina}
              >
                {
                  combinaciones.length === 0 ?
                    <option value={0}> 0 </option>
                    :
                  combinaciones.map((combinacion, index) => (
                    <option key={index} value={index}
                    >
                      {index + 1}
                    </option>
                  ))
                }
              </Form.Select>
              <Pagination.Next
                onClick={nextPageHorario}
                disabled={pagina === (combinaciones.length - 1) || combinaciones.length === 0}
              />

            </Pagination>


          <div className='d-flex'>


            <h
              style={{
                /*Ocultar*/
                visibility: 'hidden',
              }}
            >
              1234
            </h>

            <Dropdown>
              <Dropdown.Toggle className={'p-0'}
                               style={{
                                 backgroundColor: 'transparent',
                                 border: 'none',
                               }}
              >

                <HiEllipsisVertical
                  size={20}
                  style={{
                    fill: theme === 'dark' ? '#ffffff' : '#000000',
                  }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => setMostrarPorHorario24Horas(!mostrarPorHorario24Horas)}
                >
                  Cambiar formato de las horas a {mostrarPorHorario24Horas ? "12 horas" : "24 horas"}
                </Dropdown.Item>

                {/* TODO: Exportación de imagenes  */}
              </Dropdown.Menu>
            </Dropdown>

          </div>

        </Container>
      </Navbar>
    </>
  )
}