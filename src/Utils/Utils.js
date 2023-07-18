export function limpiarInputsById(...args){
    args.forEach((arg) => {
        document.getElementById(arg).value = "";
    });
}

export function adaptColorByBackground(elementId){
    const hexColor = getComputedStyle(document.getElementById(elementId)).backgroundColor;
    document.getElementById(elementId).style.color = adaptColorByHexColor(hexColor);
}

export function adaptColorByHexColor(hexColor){
    console.log(hexColor)
    const red = parseInt(hexColor.substring(1, 3), 16);
    const green = parseInt(hexColor.substring(3, 5), 16);
    const blue = parseInt(hexColor.substring(5, 7), 16);
    const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
    return luminance > 0.5 ? "black" : "white";
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
