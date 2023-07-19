import './Components/Styles/App.css';
import DataRoot from "./Components/CRUD/DataRoot.jsx";
import { globalGroupList } from "./Utils/GlobalVars.js";

function App() {

  console.log("Updating App...")

  return (
    <>
      < DataRoot data={globalGroupList} />
    </>
  )
}

export default App
