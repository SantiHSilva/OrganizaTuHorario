import Modal from "react-bootstrap/Modal";
import {getGroupById} from "../../Data/groupManager.js";
import {adaptColorByHexColor, getValueById} from "../../../Utils/Utils.js";
import {useEffect, useState} from "react";
import useArray from "../../CustomHooks/useArray.js";
import BodySubgroupDashboard from "./BodySubgroupDashboard.jsx";
import HeaderSubgroupDashboard from "./HeaderSubgroupDashboard.jsx";
import FooterSubgroupDashboard from "./FooterSubgroupDashboard.jsx";

export function SubgroupDashboard({idGroup, openModal, onHide, theme}) {

	const [numPageMaterias, setNumPageMaterias] = useState(0);
	const [numPageDescripciones, setNumPageDescripciones] = useState(1);

	//ToggleUpdate for if savechanges find any error
	const [toggleUpdate, setToggleUpdate] = useState(false);

	useEffect(() => {
		if(!toggleUpdate) return;
		setToggleUpdate(false);
	}, [toggleUpdate]);

	const { array, set, push, remove, update } = useArray([]);

	useEffect(() => {
		if(!openModal || idGroup === -1) return;
		const groupFilter = getGroupById(idGroup);
		set(groupFilter.materias);
		if(groupFilter.materias.length > 0)
			setNumPageMaterias(1);
	}, [openModal, idGroup]);

	useEffect(() => {
		if(!openModal || idGroup === -1 || array.length === 0) return;
		console.log("Array: ", array)
		detectChanges()
	}, [array]);

	useEffect(() => {
		setNumPageMaterias(0);
		setNumPageDescripciones(1);
	}, []);

	if (idGroup === -1) return; // No group selected

	const groupListed = getGroupById(idGroup);
	let hexColor = groupListed.color;

	const changeHexColor = (color) => {
		hexColor = color;
	}

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

	const handleClose = () => {
		setNumPageMaterias(0);
		setNumPageDescripciones(1);
		onHide();
	}

	return (
		<Modal
			show={openModal}
			onHide={handleClose}
			onShow={handleOpen}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>

			<Modal.Header closeButton>
				<HeaderSubgroupDashboard
					groupListed={groupListed}
					detectChanges={detectChanges}
					modifyModal={modifyModal}
					hexColor={hexColor}
					setColor={changeHexColor}
				/>
			</Modal.Header>

			<Modal.Body>
				<BodySubgroupDashboard
					array={array}
					push={push}
					remove={remove}
					numPageMaterias={numPageMaterias}
					setNumPageMaterias={setNumPageMaterias}
					numPageDescripciones={numPageDescripciones}
					setNumPageDescripciones={setNumPageDescripciones}
					update={update}
				/>
			</Modal.Body>

			<Modal.Footer>
				<FooterSubgroupDashboard
					setNumPageMaterias={setNumPageMaterias}
					setNumPageDescripciones={setNumPageDescripciones}
					array={array}
					idGroup={idGroup}
					groupListed={groupListed}
					theme={theme}
					handleClose={handleClose}
					updateGlobal={setToggleUpdate}
				/>
			</Modal.Footer>

		</Modal>
	)
}