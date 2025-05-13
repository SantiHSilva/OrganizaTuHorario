import { Horario } from "../../../Data/groupManager";
import DescripcionesGenerales from "./Generales/DescripcionesGenerales";
import NavBarCRUDMateria from "./NavBarCRUDMateria";
import DescripcionesPorDia from "./PorDia/DescripcionesPorDia";

interface props {
  array: Horario["materias"];
  push: (materia: Horario["materias"][0]) => void;
  remove: (index: number) => void;
  numPageMaterias: number;
  setNumPageMaterias: (numPage: number) => void;
  numPageDescripciones: number;
  setNumPageDescripciones: (numPage: number) => void;
  update: () => void;
}

export default function BodySubgroupDashboard({array, push, remove ,numPageMaterias, setNumPageMaterias, numPageDescripciones, setNumPageDescripciones, update}: props) {
  return(
    <div
      className='border-2 border-gray-400 rounded'
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
          <div className='flex p-3' >
								<span	className='dark:text-white'>
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