import { useState } from 'react'

export default function MyButton() {
    const [porcentaje, setPorcentaje] = useState("100");

    function alClickear() {
        if (porcentaje === "100")
            setPorcentaje("0");
        else setPorcentaje("100");
    }

    return (
        <div>
            Aquí habra un botón que al clickearlo
            <h1>
                veras como ira el rumbo de tu vida!!
            </h1>
            <button onClick={alClickear}>
                Tu felicidad está al {porcentaje}%!!
            </button>
        </div>

    )
}
