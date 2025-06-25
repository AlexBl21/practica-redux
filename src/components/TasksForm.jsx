import { useState } from "react";
import { useDispatch } from "react-redux";
import {addTasks} from "../features/tasks/tasksSlice";
import { v4 as uuid } from "uuid";

function TasksForm(){

    const [tarea, setTarea] = useState({
        title: '',
        description: '',
    });

    const dispatch = useDispatch();
    
    const handleChange = (e) => {
       setTarea({
            ...tarea,//si hay algun dato previo, lo mantengo
            [e.target.name]: e.target.value //actualizo el valor del campo que se esta modificando
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //evita que se recargue la pagina al enviar el formulario
        dispatch(addTasks({
            ...tarea,
            id: uuid(), // Genera un ID único para la tarea
        })); 
    }

    return(
        <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input name="title" type="text" placeholder="titulo" className="border" onChange={handleChange}/>

            <textarea name="description" placeholder="decsripción" onChange={handleChange}></textarea>

            <button className="bg-blue-300" >Guardar</button>
        </form>
    )
}

export default TasksForm;