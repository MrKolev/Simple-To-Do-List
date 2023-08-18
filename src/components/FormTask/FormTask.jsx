import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./styles/FormTask.css"
import moment from 'moment/moment';

const FormTask = ({
    task,
    addNewTask,
    setEditTask,
    isEditTaskMode,
    close }) => {

    const [formState, setFormState] = useState(
        task || {
            id: "",
            title: "",
            description: "",
            deadline: "",
            taskStatus: "WAITING",
        }
    );

    const { id, title, description, deadline, taskStatus } = formState;

    const [error, setError] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();

        if (title === "" || description === "" || deadline === "") {
            setError(true);
            return;
        }

        const newTask = {
            title: title,
            description: description,
            deadline: deadline,
            id: id || uuidv4(),
            taskStatus: taskStatus || "WAITING"
        };

        if (isEditTaskMode) {
            setEditTask(newTask);
        } else {
            addNewTask(newTask);
        };

        setFormState({
            title: "",
            description: "",
            deadline: "",
            status: false,
        });

        setError(false);
    };

    const handleChange = (e) => {
        e.preventDefault();
        setError(true);
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <form
            className="form-task"
            onSubmit={submitHandler}>
            <div className="form-task-wrap-input">
                <label>TITLE :</label>
                <input
                    className={error ? "input-error" : "form-input"}
                    type='text'
                    name="title"
                    value={title}
                    placeholder={error ? 'Please enter the field!' : ""}
                    onChange={handleChange}
                />
            </div>
            <div className="form-task-wrap-input">
                <label>DESCRIPTION :</label>
                <textarea
                    className={error ? "input-error" : "form-input"}
                    name="description"
                    value={description}
                    placeholder={error ? 'Please enter the field!' : ""}
                    onChange={handleChange}
                />
            </div>
            <div className="form-task-wrap-input">
                <label>DEADLINE :</label>
                <input
                    className={error ? "input-error" : "form-input"}
                    type='date'
                    name='deadline'
                    min={moment().format("YYYY-MM-DD")}
                    max={'2099-12-31'}
                    value={deadline}
                    onChange={handleChange}
                />
            </div>
            <div className="form-task-wrap-btn">
                <button className='edit-btn' type='submit'>{isEditTaskMode ? "Save Task" : "Add Task"} </button>
                {isEditTaskMode && <button className='delete-btn' onClick={close}>close</button>}
            </div>
        </form>
    );
};

export default FormTask