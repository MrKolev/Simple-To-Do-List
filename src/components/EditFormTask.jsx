import React, { useState } from 'react';
import classes from './FormTask.module.css';

export const EditFormTask = ({task, setEditTask }) => {

    console.log(task);

    const [titleInput, setTitleInput] = useState(task.title);
    const [descriptionInput, setDescriptionInput] = useState(task.description);
    const [deadlineInput, setDeadlineInput] = useState(task.deadline);
    const [error, setError] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        if (
            titleInput.trim().length > 0 &&
            descriptionInput.trim().length > 0 &&
            deadlineInput.trim().length > 0
        ) {

            const editTask = {
                title: titleInput,
                description: descriptionInput,
                deadline: deadlineInput,
                id: task.id,
                taskStatus: task.taskStatus,
            }

            setEditTask(editTask);
            setError(false);

        } else {
            setError(true);
        }
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            {error && <p className={classes.error}>Please fill in all fields!</p>}
            <div>
                <label>TITLE:</label>
                <input
                    type='text'
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                />
            </div>
            <div>
                <label>DESCRIPTION :</label>
                <input
                    type='text'
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                />
            </div>
            <div>
                <label>DEADLINE :</label>
                <input
                    type='date'
                    min={new Date().toISOString().split('T')[0]}
                    max={'2099-12-31'}
                    value={deadlineInput}
                    onChange={(e) => setDeadlineInput(e.target.value)}
                />
            </div>
            <button type='submit'>Edit Task</button>
        </form>
    );
};
