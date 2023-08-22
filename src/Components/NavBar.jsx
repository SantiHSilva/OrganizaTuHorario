import {memo} from "react";
import {Container, Dropdown, Navbar} from "react-bootstrap";
import {ThemeButton} from "./themeButton.jsx";
import {RxCalendar} from "react-icons/rx";
import {Tooltip} from "react-tooltip";
import {MdLanguage} from "react-icons/md";

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

            <Dropdown>
              <Dropdown.Toggle className={'p-0'}
                               style={{
                                 backgroundColor: 'transparent',
                                 border: 'none',
                               }}
              >

                <MdLanguage
                  size={30}
                  className='OTHNavBarIcon m-2'
                  data-tooltip-id="selectLang"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  xd
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <ThemeButton currentTheme={currentTheme} updateTheme={updateTheme} />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Tooltip
        id="selectLang"
        noArrow
        place={'left'}
        border={'1px solid #ffffff'}
        style={{
          userSelect: 'none',
          borderRadius: '20px',
          transition: 'all 0.2s ease-in-out',
          zIndex: 1000,
        }}
      >
        Cambiar idioma
      </Tooltip>
    </div>
  )
}

export const NavBarMenu = memo(NavBar)
