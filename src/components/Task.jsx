import classes from './Task.module.css';

export const Task = ({ title, description, deadline, taskStatus }) => {


    return (
        <li className={classes.task} >
            <p>Title: {title}</p>
            <p>Description: {description}</p>
            <p>Deadline: {deadline}</p>
            <p>status {title}: {taskStatus}</p>
        </li>
    )
}