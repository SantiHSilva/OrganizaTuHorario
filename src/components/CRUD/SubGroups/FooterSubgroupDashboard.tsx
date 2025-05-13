import {getValueById} from "../../../Utils/Utils.js";
import {Horario, modifyColorName, modifyGroupName, modifyMaterias} from "../../../Data/groupManager.js";
import {estaCruzandoLosTiemposConOtrosTiempos, isInvalidStartHour} from "../../../Utils/TimeUtils.js";
import {toast} from "react-toastify";

interface props {
  handleClose: () => void;
  globalUpdate: () => void;
  array: Horario["materias"];
  idGroup: number;
  groupListed: Horario;
  setNumPageMaterias: (numPage: number) => void;
  setNumPageDescripciones: (numPage: number) => void;
  updateGlobal: (update: boolean) => void;
  theme: string;
}

export default function FooterSubgroupDashboard({handleClose, globalUpdate, array, idGroup, groupListed, setNumPageMaterias, setNumPageDescripciones, updateGlobal, theme}: props) {

  function submitChanges(){
    console.log("Guardando cambios...")

    let guardar = false;
    let hayProblemas = false;

    // Si los cambios actuales no tienen nada, es decir que no hay materias.
    if(array.length === 0) {
      console.log("No hay materias, guardando...")
      guardar = true;
    }

    if(array !== groupListed.materias) {
      console.log("Verificando datos de las materias...")

      array.map((informacion, numMateria) => {
        console.log("Materia: " + numMateria)

        // Detectar descripciones generales vacias, si los detecta lo borra...

        informacion.descripciones_generales.map((descripcion, index) => {
          if(descripcion.titulo === "") {

            // TODO: Notificación de que se borró una descripción general vacía...
            informacion.descripciones_generales.splice(index, 1);
            updateGlobal(true);
          }
        })

        // Detectar ajustes por día vacias, si los detecta lo borra...

        informacion.descripciones_por_dia.map((descripcion, index) => {
          // @ts-expect-error yo que se
          descripcion.ajustes.map((ajuste, indexAjuste) => {
            if(ajuste.titulo === "") {
          // @ts-expect-error yo que se
              informacion.descripciones_por_dia[index].ajustes.splice(indexAjuste, 1);
              updateGlobal(true);
            }
          })
        })

        // Detectar si el día no esta seleccionado y marcarlo...

        informacion.descripciones_por_dia.map((descripcion, index) => {
          if(descripcion.dia === ""){
            console.log(`La descripcion ${index + 1} de la materia ${index} no tiene dia, marcando...`)
            setNumPageMaterias(numMateria + 1);
            setNumPageDescripciones(index + 1);
            hayProblemas = true;
          }
        })

        // Detectar si la hora inicial es invalida y marcarla...

        informacion.descripciones_por_dia.map((descripcion, index) => {
          if(isInvalidStartHour(descripcion.inicio, descripcion.fin)){
            console.log(`La descripcion ${index + 1} de la materia ${index} tiene una hora inicial invalida, marcando...`)
            setNumPageMaterias(numMateria + 1);
            setNumPageDescripciones(index + 1);
            hayProblemas = true;
          }
        })

        // Detectar si hay cruces de tiempo entre descripciones por día y marcarlas pasandoles dia1, inicio1, fin1, dia2, inicio2, fin2...

        informacion.descripciones_por_dia.map((descripcion, index) => {
          informacion.descripciones_por_dia.map((descripcion2, index2) => {
            if(index !== index2){
              if(estaCruzandoLosTiemposConOtrosTiempos(descripcion.dia, descripcion.inicio, descripcion.fin, descripcion2.dia, descripcion2.inicio, descripcion2.fin)){
                console.log(`La descripcion ${index + 1} de la materia ${index} tiene una cruze de tiempo con la descripcion ${index2 + 1} de la materia ${index2}, marcando...`)
                setNumPageMaterias(numMateria + 1);
                setNumPageDescripciones(index + 1);
                hayProblemas = true;
              }
            }
          })
        })

        console.log(`Hay problemas: ${hayProblemas}`)
        console.log(`Guardar: ${guardar}`)

        if(!hayProblemas) // Si NO hay problemas, guardar...
          guardar = true;

      })

      if(guardar){
        console.log("Guardando materias...")
        modifyMaterias(idGroup, array);
      } else {
        toast.info("No se puede guardar porque hay problemas con las materias",
          {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: theme
          })
        console.log("No se guardaron los cambios...")
        return;
      }
    }

    const name = getValueById("groupName");
    const hexColor = getValueById("groupColor");
    if(name !== groupListed.name) modifyGroupName(idGroup, name);
    if(hexColor !== groupListed.color) modifyColorName(idGroup, hexColor);

    handleClose();
    globalUpdate();
    setNumPageDescripciones(1);
    setNumPageMaterias(0);

    toast.info("Se guardaron los cambios correctamente",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: theme
      })
  }

  return(
    <div className="mt-5 flex flex-row gap-4 justify-end">
      <button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white p-2 px-4 rounded-lg"
              onClick={handleClose}
      >
        ❌ Cancelar cambios
      </button>
      <button onClick={submitChanges} id='modifyButtonSave'
      className="cursor-pointer text-white p-2 px-4 rounded-lg disabled:grayscale"
      >
        💾 Guardar cambios
      </button>
    </div>
  )
}