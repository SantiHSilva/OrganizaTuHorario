import {Container, Navbar} from "react-bootstrap";
import {memo} from "react";
import {CrearGrupoModal} from "./Groups/CrearGrupoModal.jsx";
import {DeleteAllGroups} from "./Groups/EliminarTodosLosGrupos.jsx";
import {ExportarGrupos} from "./Groups/ExportarGrupos.jsx";
import {BiSolidBookOpen} from "react-icons/bi";
import {FormattedMessage} from "react-intl";

function navBar({currentTheme, toggleUpdate, linkCopySuccess, messages}){
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
              <FormattedMessage id={"titleGroupSection"} />
            </span>

          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end p-2">

            <ExportarGrupos linkCopySuccess={linkCopySuccess} theme={currentTheme} />
            <CrearGrupoModal messages={messages} theme={currentTheme} toggleUpdate={toggleUpdate} />
            <DeleteAllGroups theme={currentTheme} toggleUpdate={toggleUpdate} messages={messages}/>

          </Navbar.Collapse>

        </Container>
      </Navbar>
  )
}

export const GroupsNavBar = memo(navBar);