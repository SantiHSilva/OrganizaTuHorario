import NavBarCreateDescripcionesPorDia from "./NavBarCreateDescripcionesPorDia.jsx";
import HorariosPorDia from "./HorariosPorDia.jsx";
import AjustacionesPorDia from "./AjustacionesPorDia.jsx";

export default function DescripcionesPorDia({numPageMaterias, numPageDescripciones, setNumPageDescripciones, array, update}){
  return(
      <div
        className='border rounded m-2'
      >

        <NavBarCreateDescripcionesPorDia
          array={array}
          update={update}
          numPageDescripciones={numPageDescripciones}
          setNumPageDescripciones={setNumPageDescripciones}
          numPageMaterias={numPageMaterias}
        />

        <HorariosPorDia
          numPageDescripciones={numPageDescripciones}
          numPageMaterias={numPageMaterias}
          array={array}
          update={update}
        />

        <AjustacionesPorDia
          numPageDescripciones={numPageDescripciones}
          numPageMaterias={numPageMaterias}
          array={array}
          update={update}
        />

      </div>
  )
}