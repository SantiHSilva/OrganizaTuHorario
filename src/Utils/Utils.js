export function limpiarInputsById(...args){
    args.forEach((arg) => {
        document.getElementById(arg).value = "";
    });
}

export function getValueById(id){
    return document.getElementById(id).value;
}

export function randomHexColor(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

export function setCustomValidityById(id, message){
    document.getElementById(id).setCustomValidity(message);
}
