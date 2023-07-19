import {deleteSpecifiedGroup} from "../../Data/groupManager.js";
import { EditGroupModal } from "./ModificarGrupoModal.jsx";
import Swal from "sweetalert2";
import {SubgroupDashboard} from "../SubGroups/SubgroupDashboard.jsx";
import {memo, useEffect} from "react";

function MostrarGrupos({toggleUpdate, data}){

  useEffect(() => {
    console.log("Creating MostrarGrupos...");
  }, []);

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

  let groupCarts = data.map((group) => (
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
            <EditGroupModal idGroup={group.key} onHide={() => toggleUpdate()} />
            <SubgroupDashboard idGroup={group.key} />
          </div>
        </div>
      </div>
    </div>
  ));

  return(
    <div>
      <div className="container">
        <div className="row">
          {groupCarts}
        </div>
      </div>
    </div>
  )
}

export const ListGroups =  memo(MostrarGrupos);