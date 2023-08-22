import {Form} from "react-bootstrap";

function PDFSelect() {
  return (
    <>
      <Form.Select>
        <option value="0">Selecciona un modo</option>

        <option value="1"
          onSelect={() => {
            alert('hola')
          }}
        >
          Indivualmente
        </option>

        <option value="2"
          onSelect={() => {
            alert('hola')
          }}
        >
          Grupalmente
        </option>
      </Form.Select>
    </>
  )
}

export {
  PDFSelect
}