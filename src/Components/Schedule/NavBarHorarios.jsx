import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown, Pagination} from "react-bootstrap";
import {TbTableExport} from "react-icons/tb";

export const NavBarHorarios = ({combinaciones, pagina, setPagina}) => {

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

            <Pagination
              className='m-0 '
            >
              <Pagination.Prev
                onClick={prevPageHorario}
                disabled={pagina === 0}
              />
              <Pagination.Item active>{pagina + 1}</Pagination.Item>
              <Pagination.Next
                onClick={nextPageHorario}
                disabled={pagina === (combinaciones.length - 1)}
              />

            </Pagination>

          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  )
}