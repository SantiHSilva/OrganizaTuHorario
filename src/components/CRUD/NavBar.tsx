import {Container, Navbar} from "react-bootstrap";
import {memo} from "react";
import {BiSolidBookOpen} from "react-icons/bi";
import { CrearGrupoModal } from "./Groups/CrearGrupoModal";
import { DeleteAllGroups } from "./Groups/EliminarTodosLosGrupos";

function navBar({toggleUpdate}: {toggleUpdate: (value?: boolean) => void;}) {
  return(
      <Navbar className="shadow-sm dark:bg-[#27374D] bg-[#FEFBF3]"
        style={{
          borderRadius : "0px 0px 10px 10px",
        }}
      >
        <Container fluid>
          <Navbar.Brand>

            <BiSolidBookOpen
              size={30}
            />

            <span className='p-2'>
              Grupos
            </span>

          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end p-2">

            <CrearGrupoModal toggleUpdate={toggleUpdate} />
            <DeleteAllGroups toggleUpdate={toggleUpdate} />

          </Navbar.Collapse>

        </Container>
      </Navbar>
  )
}

export const GroupsNavBar = memo(navBar);