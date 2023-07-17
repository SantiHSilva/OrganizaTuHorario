import { getValueById, limpiarInputsById } from '../../Utils/Utils.js'

import { useEffect } from 'react';

export default function datos(){

    const datos = window.sessionStorage.getItem("value") || "No hay datos";
    console.log(datos);

    useEffect(() => {
        document.getElementById("modificar").innerHTML = datos;
    }, [])

    function handleSubmit(e){
        e.preventDefault();
        const value = getValueById("submitValue");
        limpiarInputsById("submitValue");

        window.sessionStorage.setItem("value", value);

        document.getElementById("modificar").innerHTML = window.sessionStorage.getItem("value");
    }

    return(
        <div>
            <form
            onSubmit={handleSubmit}
            >
                <input type="text" name="" id="submitValue"/>
            </form>
            <h1 id='modificar'></h1>
        </div>
    )
}