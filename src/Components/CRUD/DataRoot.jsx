import useToggle from "../CustomHooks/useToggle.js";
import CrearGrupoModal from "./CrearGrupoModal.jsx";
import MostrarGrupos from "./MostrarGrupos.jsx";

export default function DataRoot(){
  const [update, toggleUpdate] = useToggle(false);

  return (
    <>
      <CrearGrupoModal update={update} toggleUpdate={toggleUpdate} />
      <MostrarGrupos update={update} toggleUpdate={toggleUpdate} />
    </>
  )
}