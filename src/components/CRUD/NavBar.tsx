import {memo} from "react";
import {BiSolidBookOpen} from "react-icons/bi";
import { CrearGrupoModal } from "./Groups/CrearGrupoModal";
import { DeleteAllGroups } from "./Groups/EliminarTodosLosGrupos";

function navBar({toggleUpdate}: {toggleUpdate: (value?: boolean) => void;}) {
  return(
      <section className="mx-4 px-4 py-2 shadow-sm dark:bg-[#27374D] bg-[#FEFBF3] flex flex-row justify-between items-center"
        style={{
          borderRadius : "0px 0px 10px 10px",
        }}
      >
        <div className="flex flex-row items-center gap-1">
 
          <BiSolidBookOpen
            className="text-[#27374D] dark:text-[#FEFBF3]"
            size={30}
          />

          <span className='p-2 text-white text-xl'>
            Asignaturas
          </span>

        </div>

        <div className="flex flex-row items-center gap-3">
          <CrearGrupoModal toggleUpdate={toggleUpdate} />
          <DeleteAllGroups toggleUpdate={toggleUpdate} />
        </div>
      </section>
  )
}

export const GroupsNavBar = memo(navBar);