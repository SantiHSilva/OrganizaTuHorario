import {Container, Form, Navbar} from "react-bootstrap";
import {memo} from "react";
import {CrearGrupoModal} from "./Groups/CrearGrupoModal.jsx";
import {DeleteAllGroups} from "./Groups/EliminarTodosLosGrupos.jsx";
import {ExportarGrupos} from "./Groups/ExportarGrupos.jsx";

function navBar({currentTheme, toggleUpdate}){
  return(
    <div>
      <Navbar className="shadow-sm"
        style={{
          backgroundColor: currentTheme === 'dark' ? '#27374D' : '#FEFBF3',
          borderRadius : "0px 0px 10px 10px",
        }}
      >
        <Container fluid>
          <Navbar.Brand>

            <Form className="d-flex ">
              <Form.Control
                type="search"
                placeholder="Buscar grupo"
                className="mr-2"
                aria-label="Search"
              />
            </Form>

          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">

            <ExportarGrupos theme={currentTheme} />
            <CrearGrupoModal theme={currentTheme} toggleUpdate={toggleUpdate} />
            <DeleteAllGroups theme={currentTheme} toggleUpdate={toggleUpdate} />

          </Navbar.Collapse>

        </Container>
      </Navbar>
    </div>
  )
}

export const GroupsNavBar = memo(navBar);