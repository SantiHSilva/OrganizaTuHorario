import {deleteSpecifiedGroup} from "../../Data/groupManager.js";
import Swal from "sweetalert2";
import {memo, useEffect, useState} from "react";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {adaptColorByHexColor} from "../../../Utils/Utils.js";
import {SubgroupDashboard} from "../SubGroups/SubgroupDashboard.jsx";
import {toast} from "react-toastify";

function MostrarGrupos({toggleUpdate, data, theme}){

  const [key, setKey] = useState(-1)
  const [showModal, setShowModal] = useState(false)

  const openDashboard = (idGroup) => {
    console.log(`Abriendo dashboard del grupo ${idGroup}...`)
    setKey(idGroup)
    setShowModal(true)
  }

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
        deleteSpecifiedGroup(idGroupToErase);
        toggleUpdate();
        toast.info(`El grupo ${nameGroup} ha sido eliminado.`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: false,
            closeOnClick: true, draggable: true,
            theme: theme
          })
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

        <div className='flex-fill rounded text-center m-1 p-2'
             style={{
               backgroundColor: group.color,
             }}
        >
          <span
            className='d-inline-block text-truncate'
            style={{
              maxWidth: '20ch', // 20 caracteres por línea
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
            className='editarGrupo OTHGroupBtn'
            style={{
              transition: 'all 0.2s ease-in-out',
              cursor: 'pointer',
            }}
            onClick={() => {
              openDashboard(group.key)
            }}
          />
          <FaTrashAlt
            size={25}
            className='borrarGrupo OTHGroupBtn'
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
            }}
            onClick={() => {
              eliminarGrupo(group.key, group.name)
            }}
          />
        </div>
      </div>
  ));

  return(
    <aside>
      &nbsp;
      {groupCarts}
      <SubgroupDashboard idGroup={key} openModal={showModal} theme={theme} globalUpdate={toggleUpdate} onHide={() => {
        setShowModal(false)
        setKey(-1)
      }} />
    </aside>
  )
}

export const ListGroups =  memo(MostrarGrupos);