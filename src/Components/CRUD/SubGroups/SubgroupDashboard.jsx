import Modal from "react-bootstrap/Modal";
import {Form, InputGroup, Pagination} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getGroupById, modifyColorName, modifyGroupName} from "../../Data/groupManager.js";
import {adaptColorByHexColor, getValueById} from "../../../Utils/Utils.js";
import {HiFolderAdd} from "react-icons/hi";
import {TbTrashXFilled} from "react-icons/tb";
import {useEffect, useState} from "react";
import useArray from "../../CustomHooks/useArray.js";
import {BiBookAdd} from "react-icons/bi";
import {FaTrash} from "react-icons/fa";

export function SubgroupDashboard({idGroup, openModal, onHide}) {

	const [numPageMaterias, setNumPageMaterias] = useState(0);
	const { array, set, push, remove, update } = useArray([]);

	useEffect(() => {
		if(!openModal || idGroup === -1) return;
		const groupFilter = getGroupById(idGroup);
		set(groupFilter.materias);
		if(groupFilter.materias.length > 0)
			setNumPageMaterias(1);
	}, [openModal, idGroup]);

	useEffect(() => {
		if(!openModal || idGroup === -1 || array.length == 0) return;
		console.log("Array: ", array)
	}, [array]);


	// Cambiar página global cuando se cambia el array

	useEffect(() => {
		setNumPageMaterias(array.length);
	}, [array.length]);

	if (idGroup === -1) return; // No group selected

	const groupListed = getGroupById(idGroup);

	let hexColor = groupListed.color;

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
		remove(numPageMaterias - 1);
		setNumPageMaterias(numPageMaterias - 1)
	}

	const handleClose = () => {
		setNumPageMaterias(0);
		onHide();
	}

	return (
		<Modal
			show={openModal}
			onHide={handleClose}
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
					className='border rounded'
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
							<Pagination.Prev
								onClick={prevPageGlobal}
								disabled={numPageMaterias === 1 || array.length === 0}
							/>
							<Pagination.Item active>{numPageMaterias}</Pagination.Item>
							<Pagination.Next
								onClick={nextPageGlobal}
								disabled={numPageMaterias === array.length || array.length === 0}
							/>
						</Pagination>

						<TbTrashXFilled
							size={30}
							onClick={deleteCurrentMateria}
						/>

					</div>

					{/* End Create Materia Global */}

					{
						numPageMaterias === 0 ?
							<div
								className='d-flex p-3'
							>
														<span
															className='m-auto'
														>
															Crea una nueva materia para personalizar...
														</span>
							</div>
							:
							<>

								{/* Descripciones generales */}

								<div
									className='border rounded m-2'
								>
										<div className='d-flex  p-1'>
											<span
												className='m-auto'
											>
												Descripciones generales
											</span>
												<BiBookAdd
													size={30}
													onClick={() => {
														console.log("Creando descripción general...")
														const newData = {
															mostrar_en_tabla: true,
															titulo: "",
														}
														const materia = array[numPageMaterias - 1];
														materia.descripciones_generales.push(newData);
														update(numPageMaterias - 1, materia);
													}}
												/>

										</div>
									<hr
										style={{margin: 5}}
									/>

										<div
											className='container p-2'
										>
{/*													<div
														className='row p-2'
													>
														<InputGroup className="p-2 col-6" style={{width: '50%'}}>
															<InputGroup.Checkbox aria-label="Añadir en tabla" />
															<Form.Control aria-label="Valor a mostrar" placeholder='value' />
															<InputGroup.Text
																aria-label='Eliminar descripción de la lista'
															>
																<FaTrash
																	size={20}
																/>
															</InputGroup.Text>
														</InputGroup>
													</div>*/}
											<div
												className='row p-2'
											>
														{
															array[numPageMaterias - 1].descripciones_generales.map((descripcion, index) => (

																	<InputGroup className="p-2 col-6" style={{width: '50%'}} key={index} id={`${index}`}>
																		<InputGroup.Checkbox aria-label="Añadir en tabla" checked={descripcion.mostrar_en_tabla}
																			onChange={() => {
																				const materia = array[numPageMaterias - 1];
																				materia.descripciones_generales[index].mostrar_en_tabla = !materia.descripciones_generales[index].mostrar_en_tabla;
																				update(numPageMaterias - 1, materia);
																			}}
																		/>
																		<Form.Control aria-label="Valor a mostrar" placeholder='key' value={descripcion.titulo} onChange={
																			(e) => {
																				const materia = array[numPageMaterias - 1];
																				materia.descripciones_generales[index].titulo = e.target.value;
																				update(numPageMaterias - 1, materia);
																			}
																		} />
																		<InputGroup.Text
																			aria-label='Eliminar descripción de la lista'
																		>
																			<FaTrash
																				size={20}
																				onClick={() => {
																					console.log(`Eliminando descripción general ${index}...`)
																					const materia = array[numPageMaterias - 1];
																					materia.descripciones_generales.splice(index, 1);
																					update(numPageMaterias - 1, materia);
																				}}
																			/>
																		</InputGroup.Text>
																	</InputGroup>
															))

														}
											</div>

										</div>

								</div>

								{/* Descripciones por día */}

								<div
									className='border rounded m-2'
								>
									<div className='border rounded p-1 d-flex flex-column'>

										<span className='text-center'>
											Descripciones por día
										</span>

										<hr
											style={{margin: 5}}
										/>

										<section
											className='d-flex'
										>

											<HiFolderAdd
												size={30}
												onClick={createNewMateria}
											/>

											<Pagination
												size='sm'
												className='m-auto'
											>

												<Pagination.Prev
													onClick={prevPageGlobal}
													disabled={numPageMaterias === 1 || array.length === 0}
												/>
												<Pagination.Item active>{numPageMaterias}</Pagination.Item>
												<Pagination.Next
													onClick={nextPageGlobal}
													disabled={numPageMaterias === array.length || array.length === 0}
												/>
											</Pagination>

											<TbTrashXFilled
												size={30}
												onClick={deleteCurrentMateria}
											/>

										</section>
									</div>

									test

								</div>
						</>
}

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