import useToggle from "../CustomHooks/useToggle.js";
import CrearGrupoModal from "./Groups/CrearGrupoModal.jsx";
import MostrarGrupos from "./Groups/MostrarGrupos.jsx";

export default function DataRoot(){
  const [, toggleUpdate] = useToggle(false);

  return (
    <div className='container'>
      <CrearGrupoModal toggleUpdate={toggleUpdate} />
      <MostrarGrupos toggleUpdate={toggleUpdate} />
    </div>
  )
}