export function getBaseURL(){
  // con DOM
  const url = window.location.href;
  const baseURL = url.split("/").slice(0, 3).join("/");
  return baseURL;
}

export function getRedirectSharedURL(path: string){
  const baseURL = getBaseURL();  
  const redirectURL = `${baseURL}/view/${path}`
  return redirectURL;
}

export function isURL(texto: string){
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(texto);
}

export function parseStringTOHTML(text: string){
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  return doc.body;
}

export function getProfileIconGoogle(credentialJWT: string){
  try {
    const payload = JSON.parse(atob(credentialJWT.split('.')[1]));
    console.log("payload",payload)
    return payload.picture || '';
  } catch (error) {
    console.error('Error al obtener el icono del perfil de Google:', error);
    return '';
  }
}