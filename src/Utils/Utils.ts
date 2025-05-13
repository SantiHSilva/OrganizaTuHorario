export function limpiarInputsById(...args: string[]){
    args.forEach((arg) => {
        const element = document.getElementById(arg);
        if (!element) {
            console.error(`Element with id ${arg} not found`);
            return;
        }
        (element as HTMLInputElement).value = "";
    });
}

export function adaptColorByBackground(elementId: string){
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }
    const hexColor = getComputedStyle(element).backgroundColor;
    element.style.color = adaptColorByHexColor(hexColor);
}

export function adaptColorByHexColor(hexColor: string){
    const red = parseInt(hexColor.substring(1, 3), 16);
    const green = parseInt(hexColor.substring(3, 5), 16);
    const blue = parseInt(hexColor.substring(5, 7), 16);
    const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
    return luminance > 0.5 ? "black" : "white";
}

export function getValueById(id: string){
    const element = document.getElementById(id);
    if (!element) {
        console.error(`Element with id ${id} not found`);
        return;
    }
    return (element as HTMLInputElement).value;
}

export function randomHexColor(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

export function setCustomValidityById(id: string, message: string){
    const element = document.getElementById(id);
    if (!element) {
        console.error(`Element with id ${id} not found`);
        return;
    }
    (element as HTMLInputElement).setCustomValidity(message);
}
