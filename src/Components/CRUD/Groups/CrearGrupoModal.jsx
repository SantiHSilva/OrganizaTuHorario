import {useState, useEffect, memo} from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import {adaptColorByHexColor, getValueById, randomHexColor} from '../../../Utils/Utils.js'
import { saveValues, getGroupList } from "../../Data/groupManager.js";
import {toast, ToastContainer} from "react-toastify";
import {BiBookAdd} from "react-icons/bi";
import {Tooltip} from "react-tooltip";

function TestingModal({toggleUpdate, theme}){

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
    document.getElementsByClassName('modal-content')[0].setAttribute('style', `box-shadow: 0px 5px 15px  ${hexColor}; border-color: ${hexColor}`);
    document.getElementById("modifyButtonSave").setAttribute('style', `background-color: ${hexColor}; border-color: ${hexColor}; color: ${adaptColorByHexColor(hexColor)};`);
  }

  function huboCambios(){
    const name = getValueById("groupName");
    return name !== "";
  }

  function detectChanges(){
    if(huboCambios())
      document.getElementById("modifyButtonSave").removeAttribute('disabled');
    else
      document.getElementById("modifyButtonSave").setAttribute('disabled', 'true');
  }

  useEffect(() => {
    if(!show) return;
    modifyModal();
    console.log("Abriendo modal...")
    document.getElementById("groupColor").addEventListener('input', modifyModal);
    document.getElementById("modifyButtonSave").setAttribute('disabled', 'true');
  }, [show])

  function formSubmit(e){
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
        icon: '💾',
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
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
        className='crearGrupoBtn'
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
        Crear un nuevo grupo
      </Tooltip>

      <Modal
       show={show}
       onShow={createNewColor}
       onHide={() => {handleSave(); createNewColor();}}
       size=''
       aria-labelledby="contained-modal-title-vcenter"
       centered
      >
        
        {/* Header */}
        <Modal.Header closeButton>
          <Modal.Title>
          ✍️ Crear nuevo grupo 
          </Modal.Title>
        </Modal.Header>
        
        {/* Body */}
        <Modal.Body>

            <Form
             onSubmit={formSubmit}
            >
                <Form.Group>
                    <Form.Label>
                        Ingresa el nombre del grupo y escoge un color
                    </Form.Label>
                    <div className='d-flex flex-row bd-highlight'>
                      <Form.Control id="groupName" onChange={detectChanges} type="text" placeholder="Nombre del grupo" className='shadow-sm bg-body rounded' />
                      <Form.Control
                      type="color" 
                      defaultValue={hexColor}
                      title='Selecciona un color para el grupo'
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
          ❌ Cancelar
          </button>
          <button className='btn' onClick={saveChanges} id='modifyButtonSave'>
          💾 Crear 
          </button>
        </Modal.Footer>

      </Modal>
    </div>
  );
}

export const CrearGrupoModal = memo(TestingModal);