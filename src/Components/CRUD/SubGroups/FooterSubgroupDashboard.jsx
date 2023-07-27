import Button from "react-bootstrap/Button";

export default function FooterSubgroupDashboard({onHide, submitChanges}){
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