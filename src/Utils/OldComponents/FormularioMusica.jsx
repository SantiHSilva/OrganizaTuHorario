import { useState, useEffect } from 'react'
import { limpiarInputsById, getValueById, setCustomValidityById } from '../Utils.js'

export default function FormMusica() {
	useEffect(() => {
		console.log("Se ha cargado el componente!")
		setCustomValidityById("nombre", "Necesito un nombre!")
		setCustomValidityById("rating", "Eyeyey necesito un número no una jodida letra")
	}, []);

	const [informacion, setInformacion] = useState({});

	useEffect(() => {
		console.log("Se ha actualizado la información!")
		console.log(informacion);
		limpiarInputsById("nombre", "rating");
	}, [informacion]);	

	function agregarInfo(nombre, rating){
		setInformacion({ ...informacion,
			nombre: nombre,
			rating: rating,
		});
	};

	function obtenerDatos(e) {
		e.preventDefault(); // Evita que se recargue la página
		const nombre = getValueById("nombre");
		const rating = getValueById("rating");
		console.log(`La canción "${nombre}" tiene un rating de ${rating}/10!`)
		agregarInfo(
			nombre,
			rating
		);
	};

	return (
	<div>
	  <h1>Formulario de música!!</h1>
		<p>En este formulario podrás poner tu canción favorita y un rating de 1/10 a ver cuanto te gusta!!</p>
			<form>
				<pre>
					<label htmlFor="nombre">Nombre de la canción: </label>
					<input type="text" id="nombre" name="nombre" />
				</pre>
				<pre>
					<label htmlFor="rating">Rating de la canción: </label>
					<input type="number" id="rating" name="rating" min="1" max="10" />
				</pre>
				<button 
				onClick={obtenerDatos}
				>
					Enviar
				</button>
			</form>
	</div>
	)
}