import classes from "./ToDoLists.module.css"

export const ToDoLists = ({id, name, tasks, status, deleteList, editList}) => {

    return (
        <div className={classes.div} >
            <p>List Name: {name}</p>
            <p>List Status: {status}</p>
            <ul>
                {tasks.map((task) => {
                    return (
                        <li className={classes.task} >
                        <p>Title: {task.title}</p>
                        <p>Description: {task.description}</p>
                        <p>Deadline: {task.deadline}</p>
                        {task.taskStatus && <p>status: {task.taskStatus}</p>}
                    </li>
                    )
                })}
            </ul>
            <button onClick={()=>editList(id)} >edit</button>
            <button onClick={()=>deleteList(id)}>delete</button>
        </div>
    )
}