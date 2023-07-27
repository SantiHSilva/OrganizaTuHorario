import {Form, InputGroup} from "react-bootstrap";

export default function HeaderSubgroupDashboard({groupListed, detectChanges, modifyModal, hexColor, setColor}){
  return(
    <>
      <InputGroup>
        <InputGroup.Text id="basic-addon1">Modificando...</InputGroup.Text>

        {/* Text form */}
        <Form.Control
          id="groupName"
          placeholder={groupListed.name}
          defaultValue={groupListed.name}
          type='text'
          onChange={detectChanges}
        />
      </InputGroup>

      {/* Color form */}

      <Form.Control
        type="color"
        defaultValue={hexColor}
        id='groupColor'
        onChange={ (e) => {
          setColor(e.target.value)
          modifyModal();
          detectChanges();
        }}
      />
    </>
  )
}