import {toggleTheme} from "./Data/themeManager.js";
import {memo, useMemo, useState} from "react";
import {HiSun, HiMoon} from "react-icons/hi2";

function ComponentThemeButton({currentTheme}){

  const [theme, setTheme] = useState(currentTheme);

  const setIcon = useMemo(
    () => {
      console.log("Updating ThemeButton...")
      console.log("Current theme: " + theme)
      return getIcon();
    }, [theme]);

  function getIcon(){
    const id = "themeButton";
    return theme === "dark" ?
      <HiMoon
        id={id}
        onClick={changeThemeButton}
        className={'shadow-lg icon-link'}
        size={50}
        aria-hidden = "true"
        style={
          {
            fill: "#f7e100",
            cursor: "pointer",
            borderRadius: "50%",
          }
        }

      /> :
      <HiSun
        id={id}
        onClick={changeThemeButton}
        className={'shadow-lg icon-link'}
        size={50}
        aria-hidden = "true"
        style={
          {
            fill: "#f7e100",
            cursor: "pointer",
            borderRadius: "50%",
          }
        }
      />;
  }

  function changeThemeButton(){
    toggleTheme();
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return(
    <div>
      {setIcon}
    </div>
  )
}

export const ThemeButton = memo(ComponentThemeButton);