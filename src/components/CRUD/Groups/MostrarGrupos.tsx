import {deleteSpecifiedGroup, duplicateGroup, Horario} from "../../../Data/groupManager.js";
import Swal from "sweetalert2";
import {memo, useEffect, useState} from "react";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi";
import {adaptColorByHexColor} from "../../../Utils/Utils.js";
import {toast} from "react-toastify";
import { SubgroupDashboard } from "../SubGroups/SubgroupDashboard.js";

function MostrarGrupos({toggleUpdate, data}: {toggleUpdate: () => void, data: Horario[]}) {

  const [key, setKey] = useState(-1)
  const [showModal, setShowModal] = useState(false)

  const openDashboard = (idGroup : number) => {
    console.log(`Abriendo dashboard del grupo ${idGroup}...`)
    setKey(idGroup)
    setShowModal(true)
  }

  useEffect(() => {
    console.log("Creating MostrarGrupos...");
  }, []);

  function eliminarGrupo(idGroupToErase: number, nameGroup: string) {
    Swal.fire({
      title: `¿Deseas eliminar el grupo ${nameGroup}?`,
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSpecifiedGroup(idGroupToErase);
        toggleUpdate();
        toast.info(
          `Grupo ${nameGroup} eliminado correctamente`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: false,
            closeOnClick: true, draggable: true,
            theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
          })
      }
    });
  }

  function handleDuplicationGroup(idGroupToDuplicate: number){
    duplicateGroup(idGroupToDuplicate);
    toggleUpdate();
    toast.info(
      `Grupo duplicado correctamente`,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: true, draggable: true,
        theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
      })

  }

  const groupCarts = data.map((group) => (
      <div className="d-flex mb-2 rounded p-1 shadow dark:bg-[#3F4E4F] bg-[#F2EAD3]"
           key={group.key}
           style={{
             transition: 'all 0.2s ease-in-out',
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
        <div className= 'p-2 rounded m-1 shadow-lg bg-[#FEFBF3] dark:bg-[#212121]'
             style={{
               transition: 'all 0.2s ease-in-out',
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
          <HiDocumentDuplicate 
            size={25}
            className='borrarGrupo OTHGroupBtn'
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
            }}
            onClick={() => {
              handleDuplicationGroup(group.key)
            }}
          />
        </div>
      </div>
  ));

  return(
    <aside>
      &nbsp;
      {groupCarts}
      <SubgroupDashboard idGroup={key} openModal={showModal} globalUpdate={toggleUpdate} onHide={() => {
        setShowModal(false)
        setKey(-1)
      }} />
    </aside>
  )
}

export const ListGroups =  memo(MostrarGrupos);