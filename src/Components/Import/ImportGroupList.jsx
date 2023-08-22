import {useSearchParams} from "react-router-dom";
import {replaceGroupList} from "../../Data/groupManager.js";
import JSONCrush from "jsoncrush";
import {decompressFromEncodedURIComponent} from "lz-string";

export default function ImportGroupList(){


  const [ params ] = useSearchParams();

  try{
    const groupList = JSON.parse((JSONCrush.uncrush(decompressFromEncodedURIComponent(params.get("groupList")))))
    console.log("Decodificada: ")
    console.log(groupList)
    replaceGroupList(groupList);
  } catch(e){
    alert("La lista de grupos no es válida.")
    console.log("Error: ")
    console.log(e)
    return;
  }

  window.location.href = getRedirectURL();



/*  console.log("Importing groupList: " + groupList)

  console.log("Decodificada: " + groupList)*/

  function getRedirectURL(){
    // Está función borra el enlace que se le pasa y lo convierte en el enlace de la página principal.
    // Por ejemplo: https://metthecarrot.github.io/OrganizaTuHorario/enlacequedeberiaborrarse
    // Se convierte en: https://metthecarrot.github.io/OrganizaTuHorario/
    const index = window.location.href.indexOf("OrganizaTuHorario");
    const url = window.location.href.substring(0, index + 17) + "/";
    /*console.log("Redirigiendo a: " + url)*/
    return url;
  }

/*  useEffect(() => {
    console.log("Importing groupList: " + groupList)

    try{
      const groupListDecoded = JSON.parse(decodeURIComponent(JSONCrush.uncrush(groupList)))
      console.log("Decodificada: ")
      console.log(groupListDecoded)
      replaceGroupList(groupListDecoded);
    } catch(e){
      alert("La lista de grupos no es válida.")
      console.log("Error: " + e)
      return;
    }

    window.location.href = getRedirectURL();

  }, [groupList])*/

  return(
    <>
      Hola querido usuario, estás importando una lista de grupos. Por favor, espera...
      Si no te redirecciona pulsa F5.

      o dirigete a <a href={getRedirectURL()}> {getRedirectURL()} </a>
    </>
  )
}