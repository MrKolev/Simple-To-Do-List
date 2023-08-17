import { BsFillPencilFill, BsTrash3Fill } from "react-icons/bs";
import { TaskCard } from "../TaskCard";
import "./styles/ToDoLists.css"

const ToDoLists = ({ id, name, tasks, status, deleteList, editList, updateTaskStatus }) => {

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
                            hideButtons={true}
                            showStatusDropdown={true}
                            updateTaskStatus={updateTaskStatus}
                        />
                    )
                })}
            </ul>
            <button className="edit-btn" onClick={() => editList(id)}> <BsFillPencilFill />EDIT</button>
            <button className="delete-btn" onClick={() => deleteList(id)}><BsTrash3Fill/> DELETE</button>
        </div>
    )
};

export default ToDoLists