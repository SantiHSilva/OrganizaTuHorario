import {Dropdown} from "react-bootstrap";
import {MdLanguage} from "react-icons/md";
import {languages} from "../../lang/langManager.js";
import {Tooltip} from "react-tooltip";
import {FormattedMessage} from "react-intl";

function LanguageBar({currentLang, setLang}){

  function changeLang(value){
    if(value === currentLang) return;
    setLang(value);
  }

  // Obtener el idioma sin el codigo de pais
  currentLang = currentLang.split("-")[0];

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
            className='OTHNavBarIcon icon-link m-2'
            data-tooltip-id="selectLang"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {languages.map((lang,key) => (
            <Dropdown.Item
              key={key}
              onClick={() => {changeLang(lang.id)}}
            >
              {lang.id === currentLang ? <b>{lang.displayName}</b> : lang.displayName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Tooltip
        id="selectLang"
        noArrow
        place={'left'}
        border={'1px solid #ffffff'}
        style={{
          userSelect: 'none',
          borderRadius: '20px',
          transition: 'all 0.2s ease-in-out',
          zIndex: 1000,
        }}
      >
        <FormattedMessage id={"tooltipChangeLang"} />
      </Tooltip>
    </>
  )
}

export { LanguageBar }