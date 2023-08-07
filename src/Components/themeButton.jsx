import {toggleTheme} from "./Data/themeManager.js";
import {memo, useMemo, useState} from "react";
import {HiSun, HiMoon} from "react-icons/hi2";

// TODO: Cambiar el tooltip por rendimiento
import {Tooltip} from 'react-tooltip';

function ComponentThemeButton({currentTheme, updateTheme}){

  const [theme, setTheme] = useState(currentTheme);

  const props = {
    className: 'icon-link OTHNavBarIcon',
    size: 30,
    style: {
    }
  }

  const SetIcon = useMemo(
    () => {
      console.log("Updating ThemeButton...")
      console.log("Current theme: " + theme)
      updateTheme(theme);
      return (getIcon(props));
    }, [theme]);

  function getIcon(props){
    return theme === "dark" ? <HiMoon {...props}/> : <HiSun {...props}/>;
  }

  function changeThemeButton(){
    toggleTheme();
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return(
    <div>
      <Tooltip
        id="themeButton"
        noArrow
        place={'top'}
        border={'1px solid #ffffff'}
        style={{
          userSelect: 'none',
          borderRadius: '20px',
          zIndex: 1000,
      }} // No seleccionar el texto del tooltip
      >
        Cambiar tema
      </Tooltip>
      <button
        onClick={changeThemeButton}
        className='btn noClickBorder'
        color='transparent'
        data-tooltip-id = 'themeButton'
      >
        {SetIcon}
      </button>

    </div>
  )
}

export const ThemeButton = memo(ComponentThemeButton);