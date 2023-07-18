import {deleteSpecifiedGroup, getGroupList} from "../../Data/groupManager.js";
import {ModificarGrupoModal} from "./ModificarGrupoModal.jsx";
import {useEffect, useState} from "react";
import {adaptColorByHexColor} from "../../../Utils/Utils.js";
import Swal from "sweetalert2";

export default function MostrarGrupos({toggleUpdate}){

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

  function eliminarGrupo(idGroupToErase, nameGroup) {
    Swal.fire({
      title: `¿Estás seguro de eliminar el grupo ${nameGroup}?`,
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Operación exitosa",
          `El grupo ${nameGroup} ha sido eliminado.`,
          "success");
        deleteSpecifiedGroup(idGroupToErase);
        toggleUpdate();
      }
    });
  }

  let groupCarts = groups.map((group) => (
    <div className="col-sm-4 p-3" key={group.key}>
      <div className="card">
        <div className="card-body">
          <div className='d-flex justify-content-between'>
            <span className="text-black fst-italic">ID: {group.key}</span>
            <p className='fw-semibold'>{group.name}</p>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => {
              eliminarGrupo(group.key, group.name)

            }}>

            </button>
          </div>
          <h5 className="card-title text-center">
          </h5>
          <p className="card-text">
          </p>
          <div className='d-block mb-2 align-items-left'>
            <button className="btn d-inline" style={{backgroundColor: group.color, borderColor: group.color, color: adaptColorByHexColor(group.color)}}
              onClick={() => clickEditEvent(group.key)}
            >
              Modificar grupo
            </button>
            <button className="btn bg-dark text-white m-2">
              Modificar clases
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  return(
    <div>
      <ModificarGrupoModal idGroup={key} openModal={showModal} onHide={
        () => setShowModal(false)
      } />
      <div className="container">
        <div className="row">
          {groupCarts}
        </div>
      </div>
    </div>
  )
}