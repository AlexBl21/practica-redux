import{useSelector} from 'react-redux';


function TasksList(){
    const tareas= useSelector(state => state.tasks); // Selecciona el estado de las tareas desde el store
    console.log(tareas);
    return(
        <div>
            {tareas.map((tarea) => (
                <div key={tarea.id} className="bg-gray-100 p-4 mb-2 rounded">
                    <h2 className="text-xl font-bold">{tarea.title}</h2>
                    <p>{tarea.description}</p>
                    <p className="text-sm text-gray-500">Completed: {tarea.complete ? "Yes" : "No"}</p>
                </div>
            ))}
        </div>
    )
}

export default TasksList;