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