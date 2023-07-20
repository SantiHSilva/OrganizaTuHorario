import './Components/Styles/App.css';
import DataRoot from "./Components/CRUD/DataRoot.jsx";
import { globalGroupList, theme } from "./Utils/GlobalVars.js";
import {ThemeButton} from "./Components/themeButton.jsx";

function App() {

  console.log("Updating App...")

  return (
    <>
      <ThemeButton currentTheme={theme} />
      <DataRoot data={globalGroupList} />
    </>
  )
}

export default App
