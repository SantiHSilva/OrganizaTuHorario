import {memo} from "react";
import {Container, Navbar, NavLink} from "react-bootstrap";
import {ThemeButton} from "./themeButton.jsx";
import {RxCalendar} from "react-icons/rx";
import {AiOutlineGithub} from "react-icons/ai";
import {Tooltip} from "react-tooltip";

function NavBar({currentTheme}){
  return(
    <div>
      <Navbar className="bg-body-tertiary shadow-sm">
        <Container>
          <Navbar.Brand
            style={{
              userSelect: 'none',
            }}
          >
            < RxCalendar
              size={30}
            />
            &nbsp; Organiza Tu Horario
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NavLink href="https://github.com/MetTheCarrot/OrganizaTuHorario" className='m-2' data-tooltip-id={'srcCode'}>
              <AiOutlineGithub
                class='github-icon-link'
                size={30}
              />
            </NavLink>
            <ThemeButton currentTheme={currentTheme} />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Tooltip
        id="srcCode"
        noArrow
        place={'bottom'}
        border={'1px solid #ffffff'}
        style={{
          userSelect: 'none',
borderRadius: '20px',
        }
      } // No seleccionar el texto del tooltip
      >
        Código fuente
      </Tooltip>
    </div>
  )
}

export const NavBarMenu = memo(NavBar)
