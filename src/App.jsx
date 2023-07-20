import DataRoot from "./Components/CRUD/DataRoot.jsx";
import { globalGroupList, theme } from "./Utils/GlobalVars.js";
import {NavBarMenu} from "./Components/NavBar.jsx";
import {useEffect, useState} from "react";

function App() {

  console.log("Updating App...")
  const [currentTheme, updateTheme] = useState(theme);

  useEffect(() => {
    console.log("[APP] Se cambio el tema a: " + currentTheme);
  }, [currentTheme]);


  return (
    <>
      <NavBarMenu currentTheme={currentTheme} updateTheme={updateTheme}  />
      <DataRoot data={globalGroupList} updateTheme={updateTheme} />
    </>
  )
}

export default App
