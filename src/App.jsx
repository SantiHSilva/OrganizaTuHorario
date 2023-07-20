import DataRoot from "./Components/CRUD/DataRoot.jsx";
import { globalGroupList, theme } from "./Utils/GlobalVars.js";
import {NavBarMenu} from "./Components/NavBar.jsx";

function App() {

  console.log("Updating App...")

  return (
    <>
      <NavBarMenu currentTheme={theme} />
      <DataRoot data={globalGroupList} />
    </>
  )
}

export default App
