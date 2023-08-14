import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./styles/CardList.css"
import { FormTask } from '../FormTask';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";


const CardList = ({ listEdit, updateLists, close, addToLists, action }) => {

    const [list, setList] = useState(
        listEdit || {
            id: "",
            name: "",
            listStatus: false,
            tasks: []
        }
    );
    const [taskById, setTaskById] = useState();
    const [error, setError] = useState(false);
    const [edit, setEdit] = useState(false);

    const { id, name, listStatus, tasks } = list


    const onSubmit = () => {

        if (name.length <= 0 || tasks.length === 0) {
            return setError(true)
        };

        const newList = {
            name: name,
            id: id || uuidv4(),
            listStatus: listStatus,
            tasks: tasks
        };

        if (action === "edit") updateLists(newList);
        if (action === "create") addToLists(newList);

        close();
    }

    const deleteTask = (taskId) => {
        setList((prevList) => {
            const newTasks = prevList.tasks.filter((task) => taskId !== task.id);
            return { ...prevList, tasks: newTasks };
        });
    }

    const editTask = (taskId) => {
        setTaskById(tasks.filter((task) => taskId === task.id));
        setEdit(true);
    }

    const setNewTask = (newTask) => {
        setList((prevList) => {
            const newTasks = [newTask, ...prevList.tasks];
            return { ...prevList, tasks: newTasks };
        });
        setError(false);
    }

    const setEditTask = (editTask) => {
        setList((prevList) => {
            const newTasks = prevList.tasks.map((task) => editTask.id === task.id ? editTask : task);
            return { ...prevList, tasks: newTasks };
        });
        setEdit(false);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setList((prevList) => {
            return { ...prevList, name: e.target.value };
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
                        value={name}
                        onChange={handleChange}
                        placeholder={error ? "please fill in the field" : ""}
                    />
                </div>

                {!edit && <div className="form-wrapper">
                    <h3>Create new task</h3>
                    <FormTask
                        setNewTask={setNewTask}
                    />
                </div>}

                {edit && <div className="form-edit">
                    <h3>Edit task</h3>
                    <FormTask
                        setEditTask={setEditTask}
                        editTask={taskById[0]}
                        action={"edit"}
                    />
                </div>}
                <ul>
                    {tasks.map((task) => {
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

CardList.defaultProps = { action: "create" };

export default CardList;