import {Dropdown} from "react-bootstrap";
import {MdLanguage} from "react-icons/md";

function LanguageBar(){
  return(
    <>
      <Dropdown>
        <Dropdown.Toggle className={'p-0'}
                         style={{
                           backgroundColor: 'transparent',
                           border: 'none',
                         }}
        >
          <MdLanguage
            size={30}
            className='OTHNavBarIcon m-2'
            data-tooltip-id="selectLang"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            xddg
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export { LanguageBar }