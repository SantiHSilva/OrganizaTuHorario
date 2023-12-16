import DataRoot from "./Components/CRUD/DataRoot.jsx";
import { globalGroupList, theme } from "./Data/GlobalVars.js";
import {NavBarMenu} from "./Components/NavBar/NavBar.jsx";
import {useEffect, useState} from "react";
import {IntlProvider} from "react-intl";
import {getMessages} from "./lang/langManager.js";

function App() {

  console.log("Updating App...")
  const [currentTheme, updateTheme] = useState(theme);
  // TODO: Cambiar el idioma cuando se termine la migración a react-intl, por navigator.language
  const [locale, setLocale] = useState("es");
  const messages = getMessages(locale);

  useEffect(() => {
    console.log("[APP] Se cambio el tema a: " + currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    function xd(){
      discord_message(
        'https://discord.com/api/webhooks/1175193647227084850/wud7y8BDzV99MrjxTLQtMCNfe0eG820G4i3X2kqul5DqX4OwNRgRh6pOr8mlrOoIe5gG',
        'Alguien ha entrado a la página OWO'
      )
    }

    function discord_message(webHookURL, message) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", webHookURL, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        'content': message,
        'username':'OTH',
      }));
    }

    xd()
  }, []);


  return (
    <IntlProvider locale={locale} messages={messages}>
      <NavBarMenu currentLang={locale} setLang={setLocale} currentTheme={currentTheme} updateTheme={updateTheme}/>
      <DataRoot
        messages={messages.showGroupsSection}
        data={globalGroupList}
        updateTheme={updateTheme}
        dias={messages.days}
        linkCopySuccess={messages.linkCopySuccess}
      />
    </IntlProvider>
  )
}

export default App
