import { TaskCard } from "../TaskCard";
import "./styles/ToDoLists.css"

const ToDoLists = ({ id, name, tasks, status, deleteList, editList }) => {

    return (
        <div className="list-wrapper" >
            <p>List Name: {name}</p>
            <p>List Status: {status}</p>
            <ul>
                {tasks.map((task) => {
                    return (
                        <TaskCard
                            key={task.id}
                            task={task}                           
                        />
                    )
                })}
            </ul>
            <button onClick={() => editList(id)} >edit</button>
            <button onClick={() => deleteList(id)}>delete</button>
        </div>
    )
};

export default ToDoLists