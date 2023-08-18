import { BsCheckCircle, BsClock, BsFillPencilFill, BsTrash3Fill } from "react-icons/bs";
import { TaskCard } from "../TaskCard";
import "./styles/ToDoLists.css"

const ToDoLists = ({ id, name, tasks, status, deleteList, editList, updateTaskStatus }) => {

    return (
        <div className="list-wrapper" >
            <div className="list-name-wrap">
                <div className="list-name">List Name: {name}</div>
                <div className="list-status-text">
                    List Status:

                    {status === "WAITING" &&
                        <> <BsClock color="#2196F3" />
                            <div className="list-status">
                                {status.toLowerCase()}
                            </div>
                        </>}

                    {status === "COMPLETED" &&
                        <> <BsCheckCircle color="#4CAF50" />
                            <div className="list-status list-status-comp">
                                {status.toLowerCase()}
                            </div>
                        </>}
                </div>
            </div>

            <ul className="list-tasks-wrap">
                {tasks.map((task) => {
                    return (
                        <TaskCard
                            key={task.id}
                            task={task}
                            hideButtons={true}
                            showStatusTooltip={status === "COMPLETED" ? false : true}
                            updateTaskStatus={updateTaskStatus}

                        />
                    )
                })}
            </ul>
            <div className="list-tasks-button-wrap">
            {status !== "COMPLETED" && <button className="edit-btn" onClick={() => editList(id)}> <BsFillPencilFill />EDIT</button>}
            <button className="delete-btn" onClick={() => deleteList(id)}><BsTrash3Fill /> DELETE</button>
            </div>
            
        </div >
    )
};

export default ToDoLists