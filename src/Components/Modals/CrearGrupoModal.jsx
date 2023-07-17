import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { getValueById, randomHexColor } from '../../Utils/Utils.js'
import { saveValues, getGroupList } from "../Data/groupManager.js";

export default function TestingModal(){
  const [show, setShow] = useState(false);

  const [hexColor, setHexColor] = useState(randomHexColor());

  const createNewColor = () => {
    setHexColor(randomHexColor());
  }

  function modifyModal(){
    const hexColor = getValueById("groupColor");
    document.getElementsByClassName('modal-content')[0].setAttribute('style', `box-shadow: 0px 5px 15px  ${hexColor}; border-color: ${hexColor}`);
    document.getElementById("modifyButtonSave").setAttribute('style', `background-color: ${hexColor}; border-color: ${hexColor}`);
  }

  useEffect(() => {
    if(!show) return;
    modifyModal();
    console.log("Abriendo modal...")
    document.getElementById("groupColor").addEventListener('input', modifyModal);
  }, [show])

  function formSubmit(e){
    e.preventDefault();
    saveChanges();
  }

  function saveChanges(){
    console.log("Guardando cambios...")
    saveValues();
    setShow(false);
    console.log(getGroupList());
  }

  const handleSave = () => setShow(false);

  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Crear nuevo grupo
      </Button>

      <Modal
       show={show}
       onShow={createNewColor}
       onHide={handleSave}
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
                      <Form.Control id="groupName" type="text" placeholder="Nombre del grupo" className='shadow-sm bg-body rounded' />
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
          <Button variant="danger" onClick={handleSave}>
          ❌ Cancelar
          </Button>
          <Button onClick={saveChanges} id='modifyButtonSave'>
          💾 Crear 
          </Button>
        </Modal.Footer>

      </Modal>  
    </>
  );
}