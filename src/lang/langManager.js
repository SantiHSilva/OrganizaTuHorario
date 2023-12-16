import es from './spanish.js';
import en from './english.js';

const languages = [
  es,
  en,
  // Add more languages here
]

function getMessages(lang){

  // dividir después del guión
  lang = lang.split("-")[0];
  // Ej: es-419 -> es
  console.log(lang)

  // Buscar el idioma
  /* Si no encuentra el idioma, el defecto sera español*/;
  const langDict = languages.find(language => language.id === lang) || languages[0]

  // Cambiar el titulo de la pestaña
  document.title = langDict.appName;

  return langDict
}

export {
  getMessages,
  languages
};