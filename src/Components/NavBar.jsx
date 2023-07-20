import {memo} from "react";
import {Container, Navbar, NavLink} from "react-bootstrap";
import {ThemeButton} from "./themeButton.jsx";
import {RxCalendar} from "react-icons/rx";
import {AiOutlineGithub} from "react-icons/ai";
import {Tooltip} from "react-tooltip";

function NavBar({currentTheme, updateTheme}){
  return(
    <div>
      <Navbar className="bg-body-tertiary shadow"
        style={{
          borderRadius : "0px 0px 30px 30px",
          transition: 'all 0.2s ease-in-out',
      }}
      >
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

              <button
                className='btn noClickBorder'
                color='transparent'
                data-tooltip-id = 'themeButton'
              >
                <AiOutlineGithub
                  className='github-icon-link'
                  size={30}
                />
              </button>

            </NavLink>
            <ThemeButton currentTheme={currentTheme} updateTheme={updateTheme} />
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
          transition: 'all 0.2s ease-in-out',
        }
      } // No seleccionar el texto del tooltip
      >
        Código fuente
      </Tooltip>
    </div>
  )
}

export const NavBarMenu = memo(NavBar)
