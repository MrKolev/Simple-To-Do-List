import classes from './Task.module.css';

export const Task = ({id, title, description, deadline, taskStatus }) => {


    return (
        <li className={classes.task} >
            <p>Title: {title}</p>
            <p>Description: {description}</p>
            <p>Deadline: {deadline}</p>
            {taskStatus && <p>status: {taskStatus}</p>}
        </li>
    )
}