import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./styles/CardList.css"
import { FormTask } from '../FormTask';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";


const CardList = ({ listEdit, updateLists, close, addToLists }) => {

    const [list, setList] = useState(
        listEdit || {
            id: null,
            name: '',
            listStatus: false,
            tasks: []
        }
    );
    const [taskById, setTaskById] = useState();
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

        if (listEdit) {
            updateLists(newList);
        } else {
            addToLists(newList);
        }

        close();
    }

    function deleteTask(taskId) {
        setList((prevList) => {
            const newTasks = prevList.tasks.filter((task) => taskId !== task.id)
            return { ...prevList, tasks: newTasks }
        });
    }

    function editTask(taskId) {
        setTaskById(list.tasks.filter((task) => taskId === task.id))
        setEdit(true);
    }

    function setNewTask(newTask) {
        setList((prevList) => {
            const newTasks = [newTask, ...prevList.tasks]
            return { ...prevList, tasks: newTasks }
        });
        setError(false)
    }

    function setEditTask(editTask) {
        setList((prevList) => {
            const newTasks = prevList.tasks.map((task) => editTask.id === task.id ? editTask : task)
            return { ...prevList, tasks: newTasks }
        });
        setEdit(false);
    }

    function handleChange(e) {
        e.preventDefault();
        setList((prevList) => {
            return { ...prevList, name: e.target.value }
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={close}>
                    &times;
                </span>

                <h2>{listEdit ? "Edit List" : "New List"}</h2>

                <div className="input-name-wrapper" >
                    <label>Name:</label>
                    <input
                        type='text'
                        value={list.name}
                        onChange={handleChange}
                        placeholder={error ? "please fill in the field" : ""}
                    />
                </div>

                {!edit && <div className="form-wrapper">
                    <h3>Create new task</h3>
                    <FormTask
                        setNewTask={setNewTask}
                        defaultValue={null}
                    />
                </div>}

                {edit && <div className="form-edit">
                    <h3>Edit task</h3>
                    <FormTask
                        setEditTask={setEditTask}
                        editTask={taskById[0]}
                    />
                </div>}
                <ul>
                    {list.tasks.map((task) => {
                        return (
                            <li className="task-list" key={task.id} >
                                {!edit && <BsFillTrashFill
                                    onClick={() => deleteTask(task.id)}
                                    className="delete-btn"
                                >Delete</BsFillTrashFill>}
                                <p>Title: {task.title}</p>
                                <p>Description: {task.description}</p>
                                <p>Deadline: {task.deadline}</p>
                                {task.taskStatus && <input type="radio" name="taskStatus" />}
                                {!edit && <BsFillPencilFill
                                    className="edit-btn"
                                    onClick={() => editTask(task.id)}
                                >Edit</BsFillPencilFill>}
                            </li>
                        )
                    })}
                </ul>
                <button onClick={close}>Close</button>
                <button disabled={error} onClick={onSubmit}>Save</button>
            </div>
        </div>
    );
}

export default CardList;