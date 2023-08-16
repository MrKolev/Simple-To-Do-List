import { BsFillPencilFill, BsTrash3Fill } from "react-icons/bs";
import { TaskCard } from "../TaskCard";
import "./styles/ToDoLists.css"

const ToDoLists = ({ id, name, tasks, status, deleteList, editList,updateTaskStatus }) => {

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
                            isEdit={true}
                            updateTaskStatus={updateTaskStatus}                           
                        />
                    )
                })}
            </ul>
            <BsFillPencilFill className="edit-btn" onClick={() => editList(id)} >edit</BsFillPencilFill>
            <BsTrash3Fill className="delete-btn" onClick={() => deleteList(id)}>delete</BsTrash3Fill>
        </div>
    )
};

export default ToDoLists