import {Tooltip} from "react-tooltip";
import {BiExport} from "react-icons/bi";
import {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {getGroupList} from "../../../Data/groupManager.js";
import {Form, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {IoIosCopy} from "react-icons/io";
import confetti from 'canvas-confetti'
import JSONCrush from "jsoncrush";
import {toast} from "react-toastify";
import {compressToEncodedURIComponent} from "lz-string";

export const ExportarGrupos = ({theme}) => {

  const [openModal, setOpenModal] = useState(false);
  const [copyLink, setCopyLink] = useState("");

  useEffect(() => {
    if(!openModal) return;
    setCopyLink(generateLink());
    console.log("Nuevo link: " + copyLink);
  }, [openModal, copyLink]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyLink).then(() => {
      toast.info(
        `Se ha copiado en enlace correctamente`,
        {
          icon: '💾',
          position: "top-left",
          autoClose: 750,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: theme
        });
      confetti()
    });
  }

  const generateLink = () => {
    const groupList = JSON.stringify(getGroupList());
    const groupListToJSONCrush = compressToEncodedURIComponent(JSONCrush.crush((groupList)));
    return window.location.href + "#/import/?groupList=" + groupListToJSONCrush;
  }

  return (
    <>

      <Modal
        show={openModal}
        onHide={() => {setOpenModal(false)}}
        size=''
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title>
            📡 ¡Copia el enlace y compartelo!
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <InputGroup className="">
            <Button variant="outline-secondary" id="button-addon1"
                    onClick={()=>copyToClipboard()}
            >
              <IoIosCopy size={20} className='mx-auto text-center'/>
              <span className='mx-auto text-center text-body p-2'>Copiar</span>
            </Button>
            <Form.Control
              readOnly
              value={copyLink}
              onClick={()=>copyToClipboard()}
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

        </Modal.Body>

        {/* Footer */}
        <Modal.Footer>
          <button className='btn bg-danger text-white' onClick={()=>setOpenModal(false)}>
            Cerrar
          </button>
        </Modal.Footer>

      </Modal>


      <BiExport
        data-tooltip-id='copiarTodosLosGruposBtn'
        onClick={()=>setOpenModal(true)}
        size={30}
        className='OTHBtn'
      />

      <Tooltip
        id="copiarTodosLosGruposBtn"
        noArrow
        place={'bottom'}
        border={'1px solid #ffffff'}
        style={{
          userSelect: 'none',
          borderRadius: '20px',
        }}
      >
        Exporta los grupos a un enlace...
      </Tooltip>

    </>
  )
}