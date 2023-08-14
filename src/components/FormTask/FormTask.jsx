import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./styles/FormTask.css"
import classNames from 'classnames';

const FormTask = ({ setNewTask, editTask, setEditTask, action }) => {

    const [formState, setFormState] = useState(
        editTask || {
            id: "",
            title: "",
            description: "",
            deadline: "",
            taskStatus: false,
        }
    );

    const { id, title, description, deadline, taskStatus } = formState;

    const [error, setError] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        if (title === "" ||
            description === "" ||
            deadline === "") {
            return setError(true);
        }

        const newTask = {
            title: title,
            description: description,
            deadline: deadline,
            id: id || uuidv4(),
            taskStatus: taskStatus
        }

        if (action === "edit") {
            setEditTask(newTask)
        } else {
            setNewTask(newTask);
        }

        setFormState({
            title: "",
            description: "",
            deadline: "",
            status: false,
        })

        setError(false);

    };

    const handleChange = (e) => {
        e.preventDefault();
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <form
            className="form-task"
            onSubmit={submitHandler}>
            <div className="form-task-wrap-input">
                <label>TITLE :</label>
                <input
                    className={classNames(error && "input-error")}
                    type='text'
                    name="title"
                    value={title}
                    placeholder={error ? 'Please enter the field!': ""}
                    onChange={handleChange}
                />
            </div>
            <div className="form-task-wrap-input">
                <label>DESCRIPTION :</label>
                <textarea
                    className={classNames(error && "input-error")}
                    name="description"
                    value={description}
                    placeholder={error ? 'Please enter the field!': ""}
                    onChange={handleChange}
                />
            </div>
            <div className="form-task-wrap-input">
                <label>DEADLINE :</label>
                <input
                    className={classNames(error && "input-error")}
                    type='date'
                    name='deadline'
                    min={new Date().toISOString().split('T')[0]}
                    max={'2099-12-31'}
                    value={deadline}
                    onChange={handleChange}
                />
            </div>
            <button type='submit'>{action === "edit" ? "Save Task" : "Add Task"} </button>
        </form>
    );
};

FormTask.defaultProps = { action: "create" };
export default FormTask