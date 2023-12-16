import {memo} from "react";
import {TiFolderDelete} from "react-icons/ti";
import Swal from "sweetalert2";
import {existGroups, globalDeleteGroups} from "../../../Data/groupManager.js";
import {Tooltip} from "react-tooltip";
import {toast} from "react-toastify";

function deleteAllGroups({theme, toggleUpdate, messages}){

  const handleShow = () => {

    if(!existGroups()) {
      toast.error(messages.noGroupsToEraseError,
        {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
          theme: theme
        });
      return;
    }

    Swal.fire(
      {
        title: messages.eraseAllGroupsModalTitle,
        text: messages.eraseAllGroupsModalText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: messages.eraseAllGroupsModalCancelButtonText,
        confirmButtonText: messages.eraseAllGroupsModalConfirmButtonText,
      }
    ).then((result) => {
      if (result.isConfirmed) {
        toast.info(messages.eraseAllGroupsModalConfirmDeleteMessage,
          {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: false,
            closeOnClick: true,
            draggable: true,
            theme: theme
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
        {messages.eraseAllGroupsTooltip}
      </Tooltip>

    </div>
  )
}

export const DeleteAllGroups = memo(deleteAllGroups);