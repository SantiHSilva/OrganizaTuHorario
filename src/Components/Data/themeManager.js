function getTheme(){
  /*Return "dark" if theme is not set in session storage*/
  const theme = window.sessionStorage.getItem("theme");
  return theme === null ? "dark" : theme;
}

let theme = getTheme(); // TODO: Global Variable

function toggleTheme(){
  theme = theme === "dark" ? "light" : "dark";
  window.sessionStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-bs-theme", theme);
}

export { theme, toggleTheme };