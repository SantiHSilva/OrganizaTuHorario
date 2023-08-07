import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Pagination, Form, Dropdown} from "react-bootstrap";
import {Ri24HoursLine} from "react-icons/ri";
import {HiEllipsisVertical} from "react-icons/hi2";
import {SiMicrosoftexcel} from "react-icons/si";
import {BsFiletypePng} from "react-icons/bs";
import {VscFilePdf} from "react-icons/vsc";

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

            <div
              className='fs-5'
              style={{
                color: theme === 'dark' ? '#ffffff' : '#000000',
              }}
            >
              Horarios
            </div>

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


            <div

              style={{
                /*Ocultar*/
                visibility: 'hidden',
              }}
            >
              1234
            </div>

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
                  <Ri24HoursLine
                    size={20}
                    className='me-2'
                  />
                  Cambiar formato de las horas a
                  <h className='fw-bold'>
                  {mostrarPorHorario24Horas ?
                    " 12 horas"
                    :
                    " 24 horas"}
                  </h>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => alert("Jaja cree que ya programe esto pero aún no capo")}
                >
                  <BsFiletypePng
                    size={20}
                    className='me-2'
                  />
                  Exportar por PNG
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => alert("Jaja cree que ya programe esto pero aún no capo")}
                >
                  <SiMicrosoftexcel
                    size={20}
                    className='me-2'
                  />
                  Exportar por Excel
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => alert("Jaja cree que ya programe esto pero aún no capo")}
                >
                  <VscFilePdf
                    size={20}
                    className='me-2'
                  />
                  Exportar por PDF
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