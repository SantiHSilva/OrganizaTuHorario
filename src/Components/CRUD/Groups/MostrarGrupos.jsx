import {deleteSpecifiedGroup} from "../../Data/groupManager.js";
import Swal from "sweetalert2";
import {memo, useEffect} from "react";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {adaptColorByHexColor} from "../../../Utils/Utils.js";

function MostrarGrupos({toggleUpdate, data, theme}){

  useEffect(() => {
    console.log("Creating MostrarGrupos...");
    console.log(theme)
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
      <div className="d-flex mb-2 rounded p-1 shadow"
           key={group.key}
           style={{
             transition: 'all 0.2s ease-in-out',
             backgroundColor: theme === 'dark' ? '#3F4E4F' : '#F2EAD3',
           }}
      >
            <div className='flex-fill text-center rounded'
                 style={{
                   backgroundColor: group.color,
                 }}
            >
              <span
                className='d-inline-block m-2 text-truncate align-center'
                style={{
                  maxWidth: '25ch', // 20 caracteres por línea
                  color: adaptColorByHexColor(group.color),
                }}
              >
                {group.name}
              </span>
            </div>

            <div className= 'p-2 rounded m-1 shadow-lg'
              style={{
                transition: 'all 0.2s ease-in-out',
                backgroundColor: theme === 'dark' ? '#FEFBF3' : '#212121',
              }}
            >
              <FaEdit
                size={25}
                className='editarGrupo'
                style={{
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                  fill: theme === 'dark' ? '#212121' : '#FEFBF3',
                }}
              />
              <FaTrashAlt
                size={25}
                className='borrarGrupo'
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  fill: theme === 'dark' ? '#212121' : '#FEFBF3',
                }}
                onClick={() => {
                  eliminarGrupo(group.key, group.name)
                }}
              />
          </div>
{/*          <h5 className="card-title text-center">
          </h5>
          <p className="card-text">
          </p>
          <div className='d-block mb-2 align-items-left'>
            <EditGroupModal idGroup={group.key} onHide={() => toggleUpdate()} />
            <SubgroupDashboard idGroup={group.key} />
          </div>*/}
      </div>
  ));

  return(
    <aside>
      &nbsp;
      {groupCarts}
    </aside>
  )
}

export const ListGroups =  memo(MostrarGrupos);