

class langManager{
  constructor(currentLang) {
    this.lang = currentLang
    this.json = this.getJsonFile()
  }

  getJsonFile(){
    //import spanish from "spanish.json" assert {type: "json"};
    return import(`${this.lang}.json`);
  }

}

function getLang(){
  /*Return "spanish" if the lang is not set in session storage*/
  const lang = window.sessionStorage.getItem("lang");
  return lang === null ? "spanish" : lang;
}

let currentLang = getLang(); // TODO: Global Variable
const lang = langManager(currentLang)

function changeLang(newLang){
  if(newLang === currentLang)
    return;

}


/*
function toggleTheme(){
  theme = theme === "dark" ? "light" : "dark";
  window.sessionStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-bs-theme", theme);
}
*/

export { currentLang, changeLang, lang };