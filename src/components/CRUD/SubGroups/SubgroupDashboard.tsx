import Modal from "react-bootstrap/Modal";
import {getGroupById} from "../../../Data/groupManager.js";
import {adaptColorByHexColor, getValueById} from "../../../Utils/Utils.js";
import {useEffect, useState} from "react";
import useArray from "../../../hooks/useArray.js";
import HeaderSubgroupDashboard from "./HeaderSubgroupDashboard.js";
import BodySubgroupDashboard from "./BodySubgroupDashboard.js";
import FooterSubgroupDashboard from "./FooterSubgroupDashboard.js";

interface props {
	idGroup: number;
	openModal: boolean;
	onHide: () => void;
	globalUpdate: () => void;
}

export function SubgroupDashboard({idGroup, openModal, onHide, globalUpdate}: props) {

	const [numPageMaterias, setNumPageMaterias] = useState(0);
	const [numPageDescripciones, setNumPageDescripciones] = useState(1);

	//ToggleUpdate for if savechanges find any error
	const [toggleUpdate, setToggleUpdate] = useState(false);

	useEffect(() => {
		if(!toggleUpdate) return;
		setToggleUpdate(false);
	}, [toggleUpdate]);

	useEffect(() => {
		if(numPageMaterias === 0 && openModal)
			detectChanges();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [numPageMaterias]);

	const { array, set, push, remove, update } = useArray([]);

	useEffect(() => {
		if(!openModal || idGroup === -1) return;
		
		const element = document.getElementById("modifyButtonSave");

		if(!element) {
			console.error("Element with id modifyButtonSave not found");
			return;
		}

		element.setAttribute('disabled', 'true');
		const groupFilter = getGroupById(idGroup);

		if(!groupFilter) return;

		set(groupFilter.materias);
		if(groupFilter.materias.length > 0)
			setNumPageMaterias(1);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [openModal, idGroup]);

	useEffect(() => {
		if(!openModal || idGroup === -1 || array.length === 0) return;
		console.log("Array: ", array)
		detectChanges()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [array]);

	useEffect(() => {
		setNumPageMaterias(0);
		setNumPageDescripciones(1);
	}, []);

	if (idGroup === -1) return; // No group selected

	const groupListed = getGroupById(idGroup);

	if (!groupListed) return; // Group not found

	let hexColor = groupListed.color;

	const changeHexColor = (color: string) => {
		hexColor = color;
	}

	function modifyModal(){
		document.getElementsByClassName('modal-content')[0].setAttribute('style', `box-shadow: 0px 5px 15px ${hexColor}; border-color: ${hexColor}`);
		const buttonSave = document.getElementById("modifyButtonSave");

		if(!buttonSave) {
			console.error("Element with id modifyButtonSave not found");
			return
		}

		buttonSave.setAttribute('style', `background-color: ${hexColor}; border-color: ${hexColor}; color: ${adaptColorByHexColor(hexColor)}`);
	}

	function huboCambios(){
		const name = getValueById("groupName");

		if (!groupListed) {
			console.error("Group not found");
			return false;
		}

		return name !== groupListed.name || hexColor !== groupListed.color || array !== groupListed.materias;
	}

	function detectChanges(){
		const buttonSave = document.getElementById("modifyButtonSave");

		if(!buttonSave) {
			console.error("Element with id modifyButtonSave not found");
			return
		}

		if(huboCambios())
			buttonSave.removeAttribute('disabled');
		else
			buttonSave.setAttribute('disabled', 'true');
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
					// @ts-expect-error quiero moverme a Vue
					array={array}
					push={push}
					remove={remove}
					numPageMaterias={numPageMaterias}
					setNumPageMaterias={setNumPageMaterias}
					numPageDescripciones={numPageDescripciones}
					setNumPageDescripciones={setNumPageDescripciones}
					// @ts-expect-error quiero moverme a Vue
					update={update}
				/>
			</Modal.Body>

			<Modal.Footer>
				<FooterSubgroupDashboard
					setNumPageMaterias={setNumPageMaterias}
					setNumPageDescripciones={setNumPageDescripciones}
					// @ts-expect-error quiero moverme a Vue
					array={array}
					idGroup={idGroup}
					groupListed={groupListed}
					handleClose={handleClose}
					updateGlobal={setToggleUpdate}
					globalUpdate={globalUpdate}
				/>
			</Modal.Footer>

		</Modal>
	)
}