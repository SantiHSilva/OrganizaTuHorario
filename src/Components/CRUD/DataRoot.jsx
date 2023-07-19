import useToggle from "../CustomHooks/useToggle.js";
import {CrearGrupoModal} from "./Groups/CrearGrupoModal.jsx";
import {ListGroups} from "./Groups/MostrarGrupos.jsx";

export default function DataRoot({data}){
  const [, toggleUpdate] = useToggle(false);
  console.log("Updating DataRoot...");

  return (
    <div className='container'>
      <CrearGrupoModal toggleUpdate={toggleUpdate} />
      <ListGroups toggleUpdate={toggleUpdate} data={data} />
    </div>
  )
}