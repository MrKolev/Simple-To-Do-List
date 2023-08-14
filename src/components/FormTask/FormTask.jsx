import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./styles/FormTask.css"

const FormTask = ({ setNewTask, editTask, setEditTask }) => {

    const [formState, setFormState] = useState(
        editTask || {
            title: "",
            description: "",
            deadline: "",
            status: false,
        }
    );

    const [error, setError] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        if (
            !formState.title.trim().length > 0 &&
            !formState.description.trim().length > 0 &&
            !formState.deadline.trim().length > 0
        ) { return setError(true); }

        const newTask = {
            title: formState.title,
            description: formState.description,
            deadline: formState.deadline,
            id: editTask ? editTask.id : uuidv4(),
            taskStatus: editTask ? editTask.taskStatus : false,
        }

        if (editTask) {
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
                <label>TITLE:</label>
                <input
                    type='text'
                    name="title"
                    value={formState.title}
                    placeholder={error ? 'Please enter the field!' : ""}
                    onChange={handleChange}
                />
            </div>
            <div className="form-task-wrap-input">
                <label>DESCRIPTION :</label>
                <textarea
                    name="description"
                    value={formState.description}
                    placeholder={error ? 'Please enter the field!' : ""}
                    onChange={handleChange}
                />
            </div>
            <div className="form-task-wrap-input">
                <label>DEADLINE :</label>
                <input
                    type='date'
                    name='deadline'
                    min={new Date().toISOString().split('T')[0]}
                    max={'2099-12-31'}
                    value={formState.deadline}
                    onChange={handleChange}
                />
            </div>
            <button type='submit'>{editTask ? "Save Task" : "Add Task"} </button>
        </form>
    );
};

export default FormTask