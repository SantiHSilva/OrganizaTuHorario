import useToggle from "../CustomHooks/useToggle.js";
import {ListGroups} from "./Groups/MostrarGrupos.jsx";
import {theme} from "../../Data/GlobalVars.js";
import {GroupsNavBar} from "./NavBar.jsx";
import Horarios from "../Schedule/Horarios.jsx";

export default function DataRoot({data}){
  const [update, toggleUpdate] = useToggle(false);
  console.log("Updating DataRoot...");

  return (
    <div className='p-3'>
      <div className="container">
        <div className="row">
          <div
            className="col"
            style={{
              backgroundColor: theme === 'dark' ? '#262c2c' : '#e5e5e5',
              transition: 'all 0.2s ease-in-out',
              }}
          >
            <Horarios  update={update} data={data} theme={theme} />
          </div>
          <div className="col"
            style={{
              backgroundColor: theme === 'dark' ? '#2C3333' : '#EEEEEE',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <GroupsNavBar currentTheme={theme} data={data} toggleUpdate={toggleUpdate} />
            {/* Listar Grupos */}
            <ListGroups toggleUpdate={toggleUpdate} data={data} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  )
}