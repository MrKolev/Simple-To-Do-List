import { Task } from "./Task"
import classes from "./ToDoLists.module.css"

export const ToDoLists = ({id, name, tasks, status, deleteList }) => {

    return (
        <div className={classes.div} >
            <p>List Name: {name}</p>
            <p>List Status: {status}</p>
            <ul>
                {tasks.map((task) => {
                    return <Task
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        deadline={task.deadline}
                        taskStatus={task.taskStatus} />
                })}
            </ul>
            <button >edit</button>
            <button onClick={()=>deleteList(id)}>delete</button>
        </div>
    )
}