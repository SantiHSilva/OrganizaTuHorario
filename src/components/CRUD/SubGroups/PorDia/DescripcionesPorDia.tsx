import { Horario } from "../../../../Data/groupManager";
import NavBarCreateDescripcionesPorDia from "./NavBarCreateDescripcionesPorDia.tsx";
import HorariosPorDia from "./HorariosPorDia.tsx";
import AjustacionesPorDia from "./AjustacionesPorDia.tsx";

interface props {
  numPageMaterias: number;
  numPageDescripciones: number;
  setNumPageDescripciones: (numPage: number) => void;
  array: Horario["materias"];
  update: () => void;
}

export default function DescripcionesPorDia({numPageMaterias, numPageDescripciones, setNumPageDescripciones, array, update}: props) {
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