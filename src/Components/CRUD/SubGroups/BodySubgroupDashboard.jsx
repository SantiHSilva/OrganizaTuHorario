import NavBarCRUDMateria from "./NavBarCRUDMateria.jsx";
import DescripcionesGenerales from "./Generales/DescripcionesGenerales.jsx";
import DescripcionesPorDia from "./PorDia/DescripcionesPorDia.jsx";

export default function BodySubgroupDashboard({array, push, remove ,numPageMaterias, setNumPageMaterias, numPageDescripciones, setNumPageDescripciones, update}){
  return(
    <div
      className='border rounded'
    >

      <NavBarCRUDMateria
        array={array}
        push={push}
        remove={remove}
        numPageMaterias={numPageMaterias}
        setNumPageMaterias={setNumPageMaterias}
        setNumPageDescripciones={setNumPageDescripciones}
      />

      {/* End Create Materia Global */}

      {
        numPageMaterias === 0 ?
          <div className='d-flex p-3' >
								<span	className='m-auto'>
									Crea una nueva materia para personalizar...
								</span>
          </div>
          :
          <>
            <DescripcionesGenerales numPageMaterias={numPageMaterias} array={array} update={update} />
            <DescripcionesPorDia
              numPageMaterias={numPageMaterias}
              numPageDescripciones={numPageDescripciones}
              setNumPageDescripciones={setNumPageDescripciones}
              array={array}
              update={update}
            />
          </>
      }

    </div>
  )
}