import {memo} from "react";
import {TiFolderDelete} from "react-icons/ti";
import Swal from "sweetalert2";
import {existGroups, globalDeleteGroups} from "../../../Data/groupManager.js";
import {Tooltip} from "react-tooltip";
import {toast} from "react-toastify";

function deleteAllGroups({toggleUpdate}: {toggleUpdate: (value?: boolean) => void;}) {

  const handleShow = () => {

    if(!existGroups()) {
      toast.error('No hay grupos para eliminar',
        {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
          theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
        });
      return;
    }

    Swal.fire(
      {
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }
    ).then((result) => {
      if (result.isConfirmed) {
        toast.info('Se han eliminado todos los grupos',
          {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: false,
            closeOnClick: true,
            draggable: true,
            theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
          }
          )
        globalDeleteGroups();
        toggleUpdate();
      }});
  }

  return(
    <div>

      <TiFolderDelete
        data-tooltip-id='borrarTodosLosGruposBtn'
        onClick={handleShow}
        size={30}
        className='OTHBtn'
      />

      <Tooltip
        id="borrarTodosLosGruposBtn"
        noArrow
        place={'bottom'}
        border={'1px solid #ffffff'}
        style={{
          userSelect: 'none',
          borderRadius: '20px',
        }}
      >
        Eliminar todos los grupos
      </Tooltip>

    </div>
  )
}

export const DeleteAllGroups = memo(deleteAllGroups);