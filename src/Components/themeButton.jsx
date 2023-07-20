import {toggleTheme} from "./Data/themeManager.js";
import {memo, useMemo, useState} from "react";
import {HiSun, HiMoon} from "react-icons/hi2";

// TODO: Cambiar el tooltip por rendimiento
import {Tooltip} from 'react-tooltip';

function ComponentThemeButton({currentTheme}){

  const [theme, setTheme] = useState(currentTheme);

  const props = {
    onClick: changeThemeButton,
    'data-tooltip-id': "themeButton",
    className: 'icon-link iconChangeTheme',
    size: 30,
    style: {
      cursor: "pointer",
    }
  }

  const SetIcon = useMemo(
    () => {
      console.log("Updating ThemeButton...")
      console.log("Current theme: " + theme)
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
        place={'bottom'}
        border={'1px solid #ffffff'}
        style={{
          userSelect: 'none',
          borderRadius: '20px',
      }} // No seleccionar el texto del tooltip
      >
        Cambiar tema
      </Tooltip>
      {SetIcon}

    </div>
  )
}

export const ThemeButton = memo(ComponentThemeButton);