import { useState, useEffect } from "react";
import { getValueById, limpiarInputsById } from "../Utils.js";

export default function ToDo(){

    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        import ('../../Components/Styles/ToDo.css'); // importar estilos una vez que el componente se haya cargado
        console.log("Se ha cargado el componente!");
    }, []);

    useEffect(() => {
        console.log(tareas);
        updateTabla(tareas.at(-1));
    }, [tareas]);

    function holaMundo(e){
        e.preventDefault();
        const tarea = getValueById("nombre");
        setTareas([...tareas, tarea]);
        limpiarInputsById("nombre");
    }

    function updateTabla(tarea){
        if ((tarea === "") || (tarea === undefined)) return;
        console.log("Añadiendo: " + tarea)
        const ul = document.getElementById("listaTareas");
        const li = document.createElement("li");
        
        //create new li element with a button
        const button = document.createElement("button");
        button.appendChild(document.createTextNode("X"));
        button.onclick = function(){
            ul.removeChild(li);
        }
        li.appendChild(document.createTextNode(tarea));
        li.appendChild(button);
        ul.prepend(li);
    }

    return(
        <div>
            <div>
                <h1>ToDo</h1> ¿Qué vas a hacer hoy?
            </div>
            <form
                onSubmit={holaMundo}
            >
                <input type="text" id="nombre" name="nombre" placeholder="Ingresa una tarea" />
            </form>
        <ul id="listaTareas">
        </ul>
        </div>
    )
}