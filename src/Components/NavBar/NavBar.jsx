import {memo} from "react";
import {Container, Navbar} from "react-bootstrap";
import {ThemeButton} from "./themeButton.jsx";
import {RxCalendar} from "react-icons/rx";
import {LanguageBar} from "./Language.jsx";
import {FormattedMessage} from "react-intl";
import Info from "./Info.jsx";

function NavBar({currentTheme, updateTheme, currentLang, setLang}){

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
            &nbsp;
            <FormattedMessage id={"appName"} />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Info/>
            {/*<LanguageBar currentLang={currentLang} setLang={setLang} />
            */}<ThemeButton currentTheme={currentTheme} updateTheme={updateTheme} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export const NavBarMenu = memo(NavBar)
