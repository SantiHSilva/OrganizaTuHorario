import { useState, useEffect } from "react";

export default function Test(){

    const { clases, setClases } = useState({});

    const horario = {

        /*
        Formato de llave: "Grupo,Num.Materia,Dia,Entrada,Salida"
        Ejemplo: "1,1,1,07:00,08:00"
        Traducción: "Grupo 1, Materia 1, Lunes, Entrada 07:00 o 7am, Salida 08:00 o 8am"
        Ejemplo 2: "3,4,6,15:00,18:00"
        Traducción: "Grupo 3, Materia 4, Sábado, Entrada 15:00 o 3pm, Salida 18:00 o 6pm"
        */

        1: [
            "1,1,1,07:00,08:00",
            "2,1,1,08:00,09:00",
            "3,1,1,08:00,09:00",
            "4,1,1,08:30,09:30",
            "5,1,1,15:00,16:00",
            "6,1,1,15:01,16:00",
        ]

    }

    function seCruzanHorarios(horarios){
        for (const horario in horarios) { // por cada horario

            // console.log("Horario: " + horario);
            for (const clase of horarios[horario]) { // por cada clase integrada
                // console.log("Clase: " + clase);
                let [grupo, materia, dia, entrada, salida] = clase.split(",");
                for (const comprobar of horarios[horario]){
                    let [grupo2, materia2, dia2, entrada2, salida2] = comprobar.split(",");

                    // Excluir diferente día
                    if (dia2 !== dia) continue;

                    // Excluir misma clase
                    if (clase == comprobar) continue;

                    // comprobar si la hora de entrada o salida interfiere con otra clase
                    /*
                    Si por ejemplo la clase inicia a las 3pm y en otra clase termina a las 3:30pm entonces se cruzan 
                    */
                    if (entrada2 === entrada || salida2 === salida){
                        console.log(`Se cruzan horarios los horarios ${clase} y ${comprobar}`);
                    }

                    // comprobar si la hora de entrada o salida está dentro de otra clase
                    /*
                    Si por ejemplo una clase inicia a las 13:30 y otra clase inicia a las 13:00 se cruzan
                    */
                    if (entrada2 < entrada && salida2 > entrada){
                        console.log(`Se cruzan horarios los horarios ${clase} y ${comprobar}`);
                    }
            }
        }
    }
}

    useEffect(() => {
        console.log("-------------")
        seCruzanHorarios(horario);
        console.log("-------------")
    }, []);

       
    function getTime(){
        let time = document.getElementById("inputTime").value;
        console.log(time);
        var [hours, minutes] = time.split(":");
        timeToTimestamp();
    }

    function xd(){
        const time = document.getElementById("inputTime").value;
        var [hours, minutes] = time.split(":");
        return hours, minutes;
    }

    return (
        <div>
            checka la consola
        </div>
    )
};