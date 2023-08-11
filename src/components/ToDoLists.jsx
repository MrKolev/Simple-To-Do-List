import { Task } from "./Task"
import classes from "./ToDoLists.module.css"

export const ToDoLists = ({ tasks, status }) => {

    return (
        <div className={classes.div} >
            <p>List Status: {status}</p>
            <ul>
                {tasks.map((task) => {
                    return <Task
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        deadline={task.deadline} />
                })}
            </ul>
            <button>edit</button>
            <button>delete</button>
        </div>
    )
}