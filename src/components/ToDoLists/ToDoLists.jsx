import "./styles/ToDoLists.css"

const ToDoLists = ({ id, name, tasks, status, deleteList, editList }) => {

    return (
        <div className="list-wrapper" >
            <p>List Name: {name}</p>
            <p>List Status: {status}</p>
            <ul>
                {tasks.map((task) => {
                    return (
                        <li
                            key={task.id}
                            className="task" >
                            <p>Title: {task.title}</p>
                            <p>Description: {task.description}</p>
                            <p>Deadline: {task.deadline}</p>
                            <button>complete</button>
                                                        {task.taskStatus && <p>status: {task.taskStatus}</p>}
                        </li>
                    )
                })}
            </ul>
            <button onClick={() => editList(id)} >edit</button>
            <button onClick={() => deleteList(id)}>delete</button>
        </div>
    )
};

export default ToDoLists