import { Horario } from "../../Data/groupManager";
import useToggle from "../../hooks/useToggle";
import Horarios from "../Schedule/Horarios.tsx";
import { ListGroups } from "./Groups/MostrarGrupos.tsx";
import { GroupsNavBar } from "./NavBar.tsx";


export default function DataRoot({data}: {data: Horario[]}) {

  const [update, toggleUpdate] = useToggle(false);
  console.log("Updating DataRoot...");

  return (
    <div className='p-3'>
      <div className="container">
        <div className="row">
          <div
            className="col dark:bg-[#262c2c] bg-[#e5e5e5]"
            style={{
              transition: 'all 0.2s ease-in-out',
              }}
          >
            <Horarios update={update as boolean} data={data} />
          </div>
          <div className="col bg-[#EEEEEE] dark:bg-[#2C3333]"
            style={{
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <GroupsNavBar toggleUpdate={toggleUpdate as (value?: boolean | undefined) => void} />
            {/* Listar Grupos */}
            <ListGroups toggleUpdate={toggleUpdate as (value?: boolean | undefined) => void} data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}