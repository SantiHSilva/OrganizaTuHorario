import {Container, Navbar} from "react-bootstrap";
import {memo} from "react";
import {CrearGrupoModal} from "./Groups/CrearGrupoModal.jsx";
import {DeleteAllGroups} from "./Groups/EliminarTodosLosGrupos.jsx";
import {ExportarGrupos} from "./Groups/ExportarGrupos.jsx";
import {BiSolidBookOpen} from "react-icons/bi";

function navBar({currentTheme, toggleUpdate}){
  return(
      <Navbar className="shadow-sm"
        style={{
          backgroundColor: currentTheme === 'dark' ? '#27374D' : '#FEFBF3',
          borderRadius : "0px 0px 10px 10px",
        }}
      >
        <Container fluid>
          <Navbar.Brand>

            <BiSolidBookOpen
              size={30}
            />

            <span className='p-2'>
              Asignaturas
            </span>

          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end p-2">

            <ExportarGrupos theme={currentTheme} />
            <CrearGrupoModal theme={currentTheme} toggleUpdate={toggleUpdate} />
            <DeleteAllGroups theme={currentTheme} toggleUpdate={toggleUpdate} />

          </Navbar.Collapse>

        </Container>
      </Navbar>
  )
}

export const GroupsNavBar = memo(navBar);