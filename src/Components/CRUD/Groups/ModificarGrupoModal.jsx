import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import {getGroupById, modifyColorName, modifyGroupName} from "../../Data/groupManager.js";
import {adaptColorByHexColor, getValueById} from "../../../Utils/Utils.js";
import Swal from 'sweetalert2';
import useToggle from "../../CustomHooks/useToggle.js";

export function ModificarGrupoModal({idGroup, onHide}) {

  console.log("Updating ModificarGrupoModal...");

	const [show, setShow] = useToggle(false);
  const groupListed = getGroupById(idGroup);
  let hexColor = groupListed.color;

	function modifyModal(){
		document.getElementsByClassName('modal-content')[0].setAttribute('style', `box-shadow: 0px 5px 15px ${hexColor}; border-color: ${hexColor}`);
		const buttonSave = document.getElementById("modifyButtonSave");
		buttonSave.setAttribute('style', `background-color: ${hexColor}; border-color: ${hexColor}; color: ${adaptColorByHexColor(hexColor)}`);
	}

	function huboCambios(){
		const name = getValueById("groupName");
		const color = getValueById("groupColor");
		return name !== groupListed.name || color !== groupListed.color;
	}

	function detectChanges(){
		if(huboCambios())
			document.getElementById("modifyButtonSave").removeAttribute('disabled');
		else
			document.getElementById("modifyButtonSave").setAttribute('disabled', 'true');
	}

	function handleClose(){
		setShow(false);
	}

	function submitChanges(){
		const name = getValueById("groupName");
		const color = getValueById("groupColor");
		if(name !== groupListed.name) modifyGroupName(idGroup, name);
		if(color !== groupListed.color) modifyColorName(idGroup, color);
		setShow(false);
		Swal.fire({
			icon: 'success',
			title: 'Cambios guardados',
			showConfirmButton: false,
			timer: 1500
		});
		onHide();
	}

	return (
		<>
			<button
        className="btn d-inline"
        style={{backgroundColor: hexColor, borderColor: hexColor, color: adaptColorByHexColor(hexColor)}}
        onClick={() => setShow(true)}
      >
        Modificar grupo
			</button>
			
			<Modal
				show={show}
				onHide={handleClose}
        onShow={() => {detectChanges(); modifyModal();}}
				size=''
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>

				{/* Header */}
				<Modal.Header closeButton>
					<Modal.Title>
						✍️ Modificando {groupListed.name}...
					</Modal.Title>
				</Modal.Header>

				{/* Body */}
				<Modal.Body>

					<Form
						onSubmit={handleClose}
						onChange={detectChanges}
					>
						<Form.Group>
							<Form.Label>
								Ingresa el nombre del grupo y escoge un color
							</Form.Label>
							<div className='d-flex flex-row bd-highlight'>
                <Form.Control
                  defaultValue={groupListed.name}
                  id="groupName" type="text"
                  placeholder="Nombre del grupo"
                  className='shadow-sm bg-body rounded'
                  onChange={detectChanges}
                />

                <Form.Control
									type="color"
									defaultValue={hexColor}
									title='Selecciona un color para el grupo'
									className='shadow-sm bg-body rounded'
									id='groupColor'
									onChange={ (e) =>
                  {
                    hexColor = e.target.value;
                    modifyModal();
                    detectChanges();
                  }
                }
								/>

							</div>
						</Form.Group>
					</Form>

				</Modal.Body>

				<Modal.Footer>
					<Button variant="danger"
									onClick={handleClose}
					>
						❌ Cancelar cambios
					</Button>
					<Button onClick={submitChanges} id='modifyButtonSave'>
						💾 Guardar cambios
					</Button>
				</Modal.Footer>

			</Modal>

		</>
	)
}