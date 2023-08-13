import { useState } from 'react';
import { NewFormTask } from './NewFormTask';
import classes from "./CardList.module.css"
import { EditFormTask } from './EditFormTask';

export const EditCardList = ({ list, updateLists, close }) => {

    const [tasks, setTasks] = useState(list.tasks);
    const [taskById, setTaskById] = useState([]);
    const [listName, setListNameInput] = useState(list.name);
    const [error, setError] = useState(false);
    const [edit, setEdit] = useState(false);


    function setNewTask(newTask) {
        setTasks((prevTask) => [newTask, ...prevTask]);
        setError(false)
    }

    function editList() {

        if (listName.length <= 0 || tasks.length === 0) {
            return setError(true)
        }

        const editList = {
            name: listName,
            id: list.id,
            listStatus: list.listStatus,
            tasks: tasks
        }

        updateLists(editList);
        close();
    }

    function deleteTask(taskId) {
        setTasks(tasks.filter((task) => taskId !== task.id));
    }

    function editTask(taskId) {
        setTaskById(tasks.filter((task) => taskId === task.id))
        setEdit(true);
    }

    function setEditTask(editTask) {
        setTasks(tasks.map((task) => editTask.id === task.id ? editTask : task));
        setEdit(false);
    }

    return (
        <div className={classes.modal}>
            <div className={classes.modalContent}>
                <span className={classes.close} onClick={close}>
                    &times;
                </span>
                <div>
                    <h2>Edit List</h2>

                    <div>
                        <label>List name:</label>
                        <input
                            type='text'
                            value={listName}
                            onChange={(e) => {
                                setListNameInput(e.target.value)
                                setError(false)
                            }}
                            placeholder={error ? "please fill in the field" : ""}
                        />
                    </div>

                    {!edit && <div className={classes.div}>
                        <h3>Create new task</h3>
                        <NewFormTask
                            setNewTask={setNewTask}
                        />
                    </div>}

                    {edit && <div className={classes.div}>
                        <h3>edit task</h3>
                        <EditFormTask
                            setEditTask={setEditTask}
                            task={taskById[0]}
                        />
                    </div>}
                    <button onClick={close}>Close</button>
                    <button disabled={error} onClick={editList}>edit</button>
                    <ul>
                        {tasks.map((task) => {
                            return (
                                <li className={classes.task} key={task.id} >
                                    <p>Title: {task.title}</p>
                                    <p>Description: {task.description}</p>
                                    <p>Deadline: {task.deadline}</p>
                                    {task.taskStatus && <p>status: {task.taskStatus}</p>}
                                    <button onClick={() => editTask(task.id)}>edit</button>
                                    <button onClick={() => deleteTask(task.id)} >delete</button>
                                </li>
                            )
                        })}
                    </ul>
                </div >
            </div>
        </div>

    );
}