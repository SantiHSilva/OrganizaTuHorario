import { Horario } from "../../Data/groupManager";
import useToggle from "../../hooks/useToggle";
import Horarios from "../Schedule/Horarios.tsx";
import { ListGroups } from "./Groups/MostrarGrupos.tsx";
import { GroupsNavBar } from "./NavBar.tsx";


export default function DataRoot({data}: {data: Horario[]}) {

  const [update, toggleUpdate] = useToggle(false);
  console.log("Updating DataRoot...");

  return (
    <div className='px-4 md:px-0 m-5 grow gap-4 md:gap-0 w-full max-w-screen-xl mx-auto grid md:grid-cols-12 items-center'>
      <div
        className="md:col-span-7 bg-white dark:bg-[#262c2c] rounded-lg md:rounded-l-lg md:rounded-r-none shadow-md "
        style={{
          transition: 'all 0.2s ease-in-out',
          }}
      >
        <Horarios update={update as boolean} data={data} />
      </div>
      <div className="md:col-span-5 bg-white dark:bg-[#2c3333] rounded-lg md:rounded-r-lg md:rounded-l-none shadow-md md:h-full"
        style={{
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <GroupsNavBar toggleUpdate={toggleUpdate as (value?: boolean | undefined) => void} />
        {/* Listar Grupos */}
        <ListGroups toggleUpdate={toggleUpdate as (value?: boolean | undefined) => void} data={data} />
      </div>
    </div>
  )
}