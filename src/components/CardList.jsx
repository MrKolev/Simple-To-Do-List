import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from "./FormTask.module.css"
import { FormTask } from './FormTask';


export const CardList = ({ listEdit, updateLists, close, addToLists }) => {

    const [list, setlist] = useState(
        listEdit || {
            id: null,
            name: '',
            listStatus: false,
            tasks: []
        }
    );
    const [taskById, setTaskById] = useState([]);
    const [error, setError] = useState(false);
    const [edit, setEdit] = useState(false);


    function onSubmit() {

        if (list.name.length <= 0 || list.tasks.length === 0) {
            return setError(true)
        }

        const newList = {
            name: list.name,
            id: listEdit ? list.id : uuidv4(),
            listStatus: listEdit ? true : false,
            tasks: list.tasks
        }

        debugger

        if (listEdit) {
            updateLists(newList);
        } else {
            addToLists(newList);
            
        }


        close();
    }

    function deleteTask(taskId) {

        setlist((prevList) => {
            const newTasks = prevList.tasks.filter((task) => taskId !== task.id)
            return { ...prevList, tasks: newTasks }
        });
    }

    function editTask(taskId) {
        setTaskById(list.tasks.filter((task) => taskId === task.id))
        setEdit(true);
    }

    function setNewTask(newTask) {
        setlist((prevList) => {
            const newTasks = [newTask, ...prevList.tasks]
            return { ...prevList, tasks: newTasks }
        });
        setError(false)
    }

    function setEditTask(editTask) {
        setlist((prevList) => {
            const newTasks = prevList.tasks.map((task) => editTask.id === task.id ? editTask : task)
            return { ...prevList, tasks: newTasks }
        });
        setEdit(false);
    }

    function handleChange(e) {
        e.preventDefault();
        setlist((prevList) => {
            return { ...prevList, name: e.target.value }
        });
        // setlist({ ...list, [e.target.name]: e.target.value });
    };

    return (
        <div className={classes.modal}>
            <div className={classes.modalContent}>
                <span className={classes.close} onClick={close}>
                    &times;
                </span>
                <div className={classes.list}>
                    <h2>{listEdit ? "Edit List" : "New List"}</h2>

                    <div className={classes.form} >
                        <label>List name:</label>
                        <input
                            type='text'
                            value={list.name}
                            onChange={handleChange}
                            placeholder={error ? "please fill in the field" : ""}
                        />
                    </div>

                    {!edit && <div className={classes.form}>
                        <h3>Create new task</h3>
                        <FormTask
                            setNewTask={setNewTask}
                            defaultValue={null}
                        />
                    </div>}

                    {edit && <div className={classes.form}>
                        <h3>Edit task</h3>
                        <FormTask
                            setEditTask={setEditTask}
                            editTask={taskById[0]}
                        />
                    </div>}
                    <ul>
                        {list.tasks.map((task) => {
                            return (
                                <li className={classes.task} key={task.id} >
                                    <p>Title: {task.title}</p>
                                    <p>Description: {task.description}</p>
                                    <p>Deadline: {task.deadline}</p>
                                    {task.taskStatus && <input type="radio" name="taskStatus" />}
                                    {!edit && <>
                                        <button onClick={() => editTask(task.id)}>Edit</button>
                                        <button onClick={() => deleteTask(task.id)} >Delete</button></>}
                                </li>
                            )
                        })}
                    </ul>
                    <button onClick={close}>Close</button>
                    <button disabled={error} onClick={onSubmit}>Save</button>
                </div >
            </div>
        </div>
    );
}