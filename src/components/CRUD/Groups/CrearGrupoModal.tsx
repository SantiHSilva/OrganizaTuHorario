import {useState, useEffect, memo} from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { saveValues, getGroupList } from "../../../Data/groupManager.js";
import {toast, ToastContainer} from "react-toastify";
import {BiBookAdd} from "react-icons/bi";
import {Tooltip} from "react-tooltip";
import { adaptColorByHexColor, getValueById, randomHexColor } from '../../../Utils/Utils.js';

function CreateGroupModal({toggleUpdate}: {toggleUpdate: (value?: boolean) => void;}) {

  const [show, setShow] = useState(false);

  const [hexColor, setHexColor] = useState(randomHexColor());

  useEffect(() => {
    import ('react-toastify/dist/ReactToastify.css');

    console.log("Creating CrearGrupoModal...");
  }, []);

  const createNewColor = () => {
    setHexColor(randomHexColor());
  }

  function modifyModal(){
    const hexColor = getValueById("groupColor");

    if(!hexColor) {
      console.error("Element with id groupColor not found");
      return;
    }

    document.getElementsByClassName('modal-content')[0].setAttribute('style', `box-shadow: 0px 5px 15px  ${hexColor}; border-color: ${hexColor}`);

    const element = document.getElementById("modifyButtonSave");

    if(!element) {
      console.error("Element with id modifyButtonSave not found");
      return;
    }

    element.setAttribute('style', `background-color: ${hexColor}; border-color: ${hexColor}; color: ${adaptColorByHexColor(hexColor)};`);
  }

  function huboCambios(){
    const name = getValueById("groupName");
    return name !== "";
  }

  function detectChanges(){
    const element = document.getElementById("modifyButtonSave");

    if(!element) {
      console.error("Element with id modifyButtonSave not found");
      return;
    }

    if(huboCambios())
      element.removeAttribute('disabled');
    else
      element.setAttribute('disabled', 'true');
  }

  useEffect(() => {
    if(!show) return;
    const element = document.getElementById("modifyButtonSave");
    const groupColor = document.getElementById("groupColor");

    if(!element) {
      console.error("Element with id modifyButtonSave not found");
      return;
    }

    if(!groupColor) {
      console.error("Element with id groupColor not found");
      return;
    }

    modifyModal();
    console.log("Abriendo modal...")
    groupColor.addEventListener('input', modifyModal);
    element.setAttribute('disabled', 'true');
  }, [show])

  function formSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    saveChanges();
  }

  function saveChanges(){
    console.log("Guardando cambios...")
    const name = getValueById("groupName");
    const color = getValueById("groupColor");
    if (name){
      saveValues(name, color);
      toast.info(
        `Se ha creado el grupo "${name}"`,
        {
        // icon: '💾',
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
      });
    }
    setShow(false);
    console.log(getGroupList());
    toggleUpdate();
  }

  const handleSave = () => setShow(false);

  const handleShow = () => setShow(true);

  return (
    <div className='text-center'>

      <ToastContainer />

      <BiBookAdd
        data-tooltip-id='crearGrupoBtn'
        onClick={handleShow}
        className='OTHBtn'
        size={25}
      />

      <Tooltip
        id="crearGrupoBtn"
        noArrow
        place={'bottom'}
        border={'1px solid #ffffff'}
        style={{
          userSelect: 'none',
          borderRadius: '20px',
        }}
      >
        Crear nuevo grupo
      </Tooltip>

      <Modal
       show={show}
       onShow={createNewColor}
       onHide={() => {handleSave(); createNewColor();}}
       size='lg'
       aria-labelledby="contained-modal-title-vcenter"
       centered
      >
        
        {/* Header */}
        <Modal.Header closeButton>
          <Modal.Title>
            Crear nuevo grupo
          </Modal.Title>
        </Modal.Header>
        
        {/* Body */}
        <Modal.Body>

            <Form
             onSubmit={formSubmit}
            >
                <Form.Group>
                    <Form.Label>
                      Nombre del grupo
                    </Form.Label>
                    <div className='d-flex flex-row bd-highlight'>
                      <Form.Control id="groupName" onChange={detectChanges} type="text" placeholder='Matematica' className='shadow-sm bg-body rounded' />
                      <Form.Control
                        type="color" 
                        defaultValue={hexColor}
                        title='Color del grupo'
                        className='shadow-sm bg-body rounded'
                        id='groupColor'
                      />
                      </div>
                </Form.Group>
            </Form>

        </Modal.Body>

        {/* Footer */}
        <Modal.Footer>
          <button className='btn bg-danger' onClick={handleSave}>
            Cancelar
          </button>
          <button className='btn' onClick={saveChanges} id='modifyButtonSave'>
            Crear
          </button>
        </Modal.Footer>

      </Modal>
    </div>
  );
}

export const CrearGrupoModal = memo(CreateGroupModal);