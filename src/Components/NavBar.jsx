import {memo} from "react";
import {Container, Navbar} from "react-bootstrap";
import {ThemeButton} from "./themeButton.jsx";
import {RxCalendar} from "react-icons/rx";
import {Tooltip} from "react-tooltip";
import {LanguageBar} from "./Lang/Language.jsx";

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

            <LanguageBar />

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
