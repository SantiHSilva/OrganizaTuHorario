import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import {getGroupById, modifyColorName, modifyGroupName} from "../Data/groupManager.js";
import {getValueById} from "../../Utils/Utils.js";
import Swal from 'sweetalert2';

export function ModificarGrupoModal({idGroup, openModal, ...props}) {

	function modifyModal(){
		// Borde modal
		document.getElementsByClassName('modal-content')[0].setAttribute('style', `box-shadow: 0px 5px 15px  ${hexColor}; border-color: ${hexColor}`);
		// Boton guardar
		document.getElementById("modifyButtonSave").setAttribute('style', `background-color: ${hexColor}; border-color: ${hexColor}`);
		document.getElementById("modifyButtonSave").setAttribute('disabled', 'true');
	}

	console.log("Updating ModificarGrupoModal...");

	// Evitar que se muestre el modal si no se ha seleccionado un grupo
	if(isNaN(idGroup)) return (<></>);

	const groupListed = getGroupById(idGroup);

	let hexColor = groupListed.color;

	function onOpenModal(){
		modifyModal();
		document.getElementById("groupColor").addEventListener('input', modifyModal);
		document.getElementById("modifyButtonSave").addEventListener('change', detectChanges);
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

	function submitChanges(){
		const name = getValueById("groupName");
		const color = getValueById("groupColor");
		if(name !== groupListed.name) modifyGroupName(idGroup, name);
		if(color !== groupListed.color) modifyColorName(idGroup, color);
		props.onHide();
		Swal.fire({
			icon: 'success',
			title: 'Cambios guardados',
			showConfirmButton: false,
			timer: 1500
		});
	}

	return (
		<>
			<Modal
				{...props}
				show={openModal}
				onShow={onOpenModal}
				onHide={props.onHide}
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
						onSubmit={
							(e) => {
								e.preventDefault();
								huboCambios() ? submitChanges() : props.onHide();
							}
						}
						onChange={detectChanges}
					>
						<Form.Group>
							<Form.Label>
								Ingresa el nombre del grupo y escoge un color
							</Form.Label>
							<div className='d-flex flex-row bd-highlight'>
								<Form.Control defaultValue={groupListed.name} id="groupName" type="text" placeholder="Nombre del grupo" className='shadow-sm bg-body rounded' />
								<Form.Control
									type="color"
									defaultValue={hexColor}
									title='Selecciona un color para el grupo'
									className='shadow-sm bg-body rounded'
									id='groupColor'
									onChange={ (e) => {hexColor = e.target.value} }
								/>
							</div>
						</Form.Group>
					</Form>

				</Modal.Body>

				{/* Footer */}
				<Modal.Footer>
					<Button variant="danger"
									onClick={
										props.onHide
									}
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