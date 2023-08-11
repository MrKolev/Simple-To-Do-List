import { useState } from 'react';
import { FormTask } from './FormTask';
import { Task } from './Task';
import { v4 as uuidv4 } from 'uuid';
import classes from "./CardList.module.css"

export const CardList = ({ title, addList, close, listData }) => {

    let nameOfList = "";

    if (listData) {
        nameOfList = listData[0].name;
    }

    const [tasks, setTasks] = useState([]);
    const [listName, setListNameInput] = useState(nameOfList);
    const [error, setError] = useState(false);

    function createNewTask(task) {


        const newTask = {
            ...task,
            id: uuidv4(),
            taskStatus: "COMPLETED",
        }

        setTasks((prevTask) => [newTask, ...prevTask]);
        setError(false)
    }

    function createNewList() {

        if (listName.length <= 0 || tasks.length === 0) {
            return setError(true)
        }

        const list = {
            name: listName,
            id: uuidv4(),
            listStatus: "COMPLETED",
            tasks: tasks
        }

        addList(list);
        close();
    }

    return (

        <div className={classes.modal}>
            <div className={classes.modalContent}>
                <span className={classes.close} onClick={close}>
                    &times;
                </span>
                <div>
                    <h2>{title}</h2>
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

                    <div className={classes.div}>
                        <h3>Create new task</h3>
                        <FormTask onEnterTask={createNewTask} />
                    </div>
                    <button onClick={close}>Close</button>
                    <button disabled={error} onClick={createNewList}>Save</button>
                    <ul>
                        {tasks.map((task) => {
                            return <Task
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                deadline={task.deadline} />
                        })}
                    </ul>
                </div >
            </div>
        </div>
    );
}