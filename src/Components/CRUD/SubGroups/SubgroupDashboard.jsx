import Modal from "react-bootstrap/Modal";
import {Form, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getGroupById, modifyColorName, modifyGroupName} from "../../Data/groupManager.js";
import {adaptColorByHexColor, getValueById} from "../../../Utils/Utils.js";

export function SubgroupDashboard({idGroup, openModal, onHide}) {

	if (idGroup === -1) return; // No group selected

	const groupListed = getGroupById(idGroup);
	console.log(groupListed)
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


	const handleOpen = () => {
		modifyModal();
		detectChanges();
	}

	function submitChanges(){

		// Valores base

		const name = getValueById("groupName");
		const color = getValueById("groupColor");
		if(name !== groupListed.name) modifyGroupName(idGroup, name);
		if(color !== groupListed.color) modifyColorName(idGroup, color);
		onHide();
	}

	return (
		<Modal
			show={openModal}
			onHide={onHide}
			onShow={handleOpen}
			size=''
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>

			<Modal.Header closeButton>
				<InputGroup>
					<InputGroup.Text id="basic-addon1">Modificando...</InputGroup.Text>

					{/* Text form */}
					<Form.Control
						id="groupName"
						placeholder={groupListed.name}
						defaultValue={groupListed.name}
						type='text'
						onChange={detectChanges}
					/>
				</InputGroup>

				{/* Color form */}

				<Form.Control
					type="color"
					defaultValue={hexColor}
					id='groupColor'
					onChange={ (e) => {
						hexColor = e.target.value;
						modifyModal();
						detectChanges();
					}}
				/>

			</Modal.Header>

			{/* Body */}
			<Modal.Body>

{/*				<Form
					onSubmit={onHide}
					onChange={detectChanges}
				>
					<Form.Group>
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
				</Form>*/}

			</Modal.Body>

			<Modal.Footer>
				<Button variant="danger"
								onClick={onHide}
				>
					❌ Cancelar cambios
				</Button>
				<Button onClick={submitChanges} id='modifyButtonSave'>
					💾 Guardar cambios
				</Button>
			</Modal.Footer>

		</Modal>
	)
}