import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown, Pagination} from "react-bootstrap";
import {TbTableExport} from "react-icons/tb";
import {Ri24HoursLine} from "react-icons/ri";
import {BiBookAdd} from "react-icons/bi";
import {Tooltip} from "react-tooltip";

export const NavBarHorarios = ({combinaciones, pagina, setPagina, mostrarPorHorario24Horas, setMostrarPorHorario24Horas}) => {

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
      <Navbar className="shadow-sm">
        <Container fluid>
          <Navbar.Brand>
            <section className='d-flex'>
            <TbTableExport size={30}/>
              &nbsp;
            <NavDropdown title={"Exportar"} id="collasible-nav-dropdown"
            >
              <NavDropdown.Item>
                Esto
              </NavDropdown.Item>
              <NavDropdown.Item>
                No
              </NavDropdown.Item>
              <NavDropdown.Item>Esta</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                PROGRAMADO
              </NavDropdown.Item>
            </NavDropdown>
            </section>
          </Navbar.Brand>

          <Navbar.Toggle />


          <Navbar.Collapse className="justify-content-end">

            <Ri24HoursLine
              data-tooltip-id='toggle24Format'
              size={35}
              className={`OTH24Hrs${mostrarPorHorario24Horas ? "Active" : "Disable"}`}
              style={{
                cursor: "pointer",
              }}
              onClick={() => setMostrarPorHorario24Horas(!mostrarPorHorario24Horas)}
            />

            <Tooltip
              id="toggle24Format"
              noArrow
              place={'top'}
              border={'1px solid #ffffff'}
              style={{
                userSelect: 'none',
                borderRadius: '20px',
              }}
            >
              {
                mostrarPorHorario24Horas ?
                  "Cambiar a formato de 12 horas"
                  :
                  "Cambiar a formato de 24 horas"
              }
            </Tooltip>

            &nbsp;&nbsp;&nbsp;

            <Pagination
              className='m-0 '
            >
              <Pagination.Prev
                onClick={prevPageHorario}
                disabled={pagina === 0}
              />
              <Pagination.Item active>{combinaciones.length === 0 ? 0 : pagina + 1}</Pagination.Item>
              <Pagination.Next
                onClick={nextPageHorario}
                disabled={pagina === (combinaciones.length - 1) || combinaciones.length === 0}
              />

            </Pagination>



          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  )
}