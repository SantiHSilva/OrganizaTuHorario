import useToggle from "../CustomHooks/useToggle.js";
import {CrearGrupoModal} from "./Groups/CrearGrupoModal.jsx";
import {ListGroups} from "./Groups/MostrarGrupos.jsx";
import {theme} from "../../Utils/GlobalVars.js";

export default function DataRoot({data}){
  const [, toggleUpdate] = useToggle(false);
  console.log("Updating DataRoot...");

  return (
    <div className='p-3'>
      <div className="container text-white">
        <div className="row">
          <div className="col bg-warning">
            {/* Horarios */}
            Tabla de horarios
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
          <div className="col-md-auto"
            style={{
              backgroundColor: theme === 'dark' ? '#2C3333' : '#EEEEEE',
              transition: 'all 0.2s ease-in-out',
              borderRadius: '0px 10px 10px 00px '
            }}
          >
            {/* Listar Grupos */}
            <CrearGrupoModal toggleUpdate={toggleUpdate} />
            <ListGroups toggleUpdate={toggleUpdate} data={data} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  )
}