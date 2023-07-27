import NavCreateDescripcion from "./NavCreateDescripcion.jsx";
import MostrarDescripciones from "./MostrarDescripciones.jsx";

export default function DescripcionesGenerales({numPageMaterias, array, update}) {
  return(
    <div className='border rounded m-2'>

      <NavCreateDescripcion numPageMaterias={numPageMaterias} array={array} update={update} />

      <hr style={{margin: 5}} />

      <MostrarDescripciones numPageMaterias={numPageMaterias} array={array} update={update} />

    </div>
  )
}