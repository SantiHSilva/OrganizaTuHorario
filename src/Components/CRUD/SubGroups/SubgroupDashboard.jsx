import Modal from "react-bootstrap/Modal";
import {Form, InputGroup, Pagination} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getGroupById, modifyColorName, modifyGroupName} from "../../Data/groupManager.js";
import {adaptColorByHexColor, getValueById} from "../../../Utils/Utils.js";
import {HiFolderAdd} from "react-icons/hi";
import {TbTrashXFilled} from "react-icons/tb";
import {useEffect, useState} from "react";
import useArray from "../../CustomHooks/useArray.js";

export function SubgroupDashboard({idGroup, openModal, onHide}) {

	const [numPageMaterias, setNumPageMaterias] = useState(0);
	const { array, set, push, remove, update, clear } = useArray([]);

	useEffect(() => {
		if(!openModal || idGroup === -1) return;
		set(getGroupById(idGroup).materias);
	}, [openModal, idGroup]);

	// Cambiar página global cuando se

	useEffect(() => {
		setNumPageMaterias(array.length);
	}, [array.length]);

	if (idGroup === -1) return; // No group selected

	const groupListed = getGroupById(idGroup);

	let hexColor = groupListed.color;

	// Pagination globalmaterias

	console.log(groupListed)
	console.log(array) // materias

	function modifyModal(){
		document.getElementsByClassName('modal-content')[0].setAttribute('style', `box-shadow: 0px 5px 15px ${hexColor}; border-color: ${hexColor}`);
		const buttonSave = document.getElementById("modifyButtonSave");
		buttonSave.setAttribute('style', `background-color: ${hexColor}; border-color: ${hexColor}; color: ${adaptColorByHexColor(hexColor)}`);
	}

	function huboCambios(){
		const name = getValueById("groupName");
		return name !== groupListed.name || hexColor !== groupListed.color || array !== groupListed.materias;
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

	const prevPageGlobal = () => {
		if (numPageMaterias > 1) setNumPageMaterias(numPageMaterias - 1);
	}

	const nextPageGlobal = () => {
		if (numPageMaterias < array.length) setNumPageMaterias(numPageMaterias + 1);
	}

	const createNewMateria = () => {
		console.log("Creando nueva materia...")
		const newData = {
			descripciones_generales: [],
			descripciones_por_dia : [
				{
					dia: "",
					inicio: "",
					fin: "",
					ajustes: [],
				}
			],
		}
		push(newData);
	}

	const deleteCurrentMateria = () => {
		console.log(`Eliminando materia ${numPageMaterias}...`)

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

				<div
					className=''
				>


					<div
						className='d-flex border rounded p-1'
					>

						<HiFolderAdd
							size={30}
							onClick={createNewMateria}
						/>

						<Pagination
							size='sm'
							className='m-auto'
						>
							<Pagination.Prev onClick={prevPageGlobal}/>
							<Pagination.Item active>{numPageMaterias}</Pagination.Item>
							<Pagination.Next onClick={nextPageGlobal} />
						</Pagination>

						<TbTrashXFilled
							size={30}
							onClick={deleteCurrentMateria}
						/>

					</div>

				</div>
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