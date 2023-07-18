import {getGroupList} from "../Data/groupManager.js";
import {ModificarGrupoModal} from "./ModificarGrupoModal.jsx";
import {useEffect, useState} from "react";

export default function MostrarGrupos(update, toggleUpdate){

  let groups = getGroupList();
  let [key, setKey] = useState(NaN);
  const [showModal, setShowModal] = useState(false);

  console.log("Updating MostrarGrupos...");

  function clickEditEvent(groupKey){
    console.log("Click en editar grupo con id: " + groupKey);
    setKey(groupKey);
    setShowModal(true);
  }

  useEffect(() => {
    if (isNaN(key)) return;
    console.log("Abriendo modal de modificación...")
    //Detectar cuando se cierra el modal
  },[key])

  let groupCarts = groups.map((group) => (
    <div className="col-sm-4" key={group.key}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{group.name}</h5>
          <p className="card-text">{group.color}</p>
          <a href="#" className="btn btn-primary"
            onClick={() => clickEditEvent(group.key)}
          >
            Ver grupo</a>
        </div>
      </div>
    </div>
  ));

  return(
    <div>
      <ModificarGrupoModal idGroup={key} openModal={showModal} onHide={
        () => setShowModal(false)
      } />
      <h1>Grupos</h1>
      <p>Esta es la página de grupos.</p>

      <div className="container">
        <div className="row">
          {groupCarts}
        </div>
      </div>
    </div>
  )
}