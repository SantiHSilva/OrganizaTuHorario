import Button from "react-bootstrap/Button";
import {getValueById} from "../../../Utils/Utils.js";
import {modifyColorName, modifyGroupName, modifyMaterias} from "../../Data/groupManager.js";
import {isInvalidStartHour} from "../../../Utils/TimeUtils.js";

export default function FooterSubgroupDashboard({onHide, array, hexColor, idGroup, groupListed, setNumPageMaterias, setNumPageDescripciones, updateGlobal}) {

  function submitChanges(){
    console.log("Guardando cambios...")
    const name = getValueById("groupName");
    if(name !== groupListed.name) modifyGroupName(idGroup, name);
    if(hexColor !== groupListed.color) modifyColorName(idGroup, hexColor);

    if(array !== groupListed.materias) {
      console.log("Verificando datos de las materias...")

      let guardar = false;

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
          descripcion.ajustes.map((ajuste, indexAjuste) => {
            if(ajuste.titulo === "") {
              informacion.descripciones_por_dia[index].ajustes.splice(indexAjuste, 1);
              updateGlobal(true);
            }
          })
        })

        let hayProblemas = false;

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

        if(!hayProblemas) guardar = true;

      })

      if(guardar){
        modifyMaterias(idGroup, array);
      } else {
        return;
      }

    }
    onHide();
    setNumPageDescripciones(1);
    setNumPageMaterias(0);
  }

  return(
    <>
      <Button variant="danger"
              onClick={onHide}
      >
        ❌ Cancelar cambios
      </Button>
      <Button onClick={submitChanges} id='modifyButtonSave'>
        💾 Guardar cambios
      </Button>
    </>
  )
}