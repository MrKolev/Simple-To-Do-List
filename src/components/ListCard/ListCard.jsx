import "./styles/ListCard.css"
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormTask } from './FormTask';
import { getTaskById } from '../../utils/utils';
import { TaskCard } from "../TaskCard";

const ListCard = ({ isEditMode, listData, addEditedList, close, addNewList }) => {

    document.body.classList.add('modal-open');

    const [{ id, name, listStatus, tasks }, setList] = useState(
        listData || {
            id: "",
            name: "",
            listStatus: "WAITING",
            tasks: []
        }
    );
    const [taskForEdit, setTaskForEdit] = useState({});
    const [errorName, setErrorName] = useState(false);
    const [errorTasks, setErrorTasks] = useState(false);
    const [isEditTaskMode, setIsEditTaskMode] = useState(false);

    // seva new/edit list card
    const onSubmit = () => {
        if (name.length <= 0 || tasks.length === 0) {
            if (name.length <= 0) setErrorName(true);
            if (tasks.length === 0) setErrorTasks(true);
            return
        };

        const newList = {
            name: name,
            id: id || uuidv4(),
            listStatus: listStatus,
            tasks: tasks
        };

        if (isEditMode) {
            addEditedList(newList);
        } else {
            addNewList(newList);
        };
        close();
    }

    // delite task by id
    const deleteTaskById = (taskId) => {
        setList((prevList) => {
            const newTasks = prevList.tasks.filter((task) => taskId !== task.id);
            return { ...prevList, tasks: newTasks };
        });
    };

    // open task from edit by id 
    const openEtitTaskCard = (taskId) => {
        setTaskForEdit(getTaskById(taskId, tasks));
        setIsEditTaskMode(true);

    };

    // add new task to list
    const addNewTask = (newTask) => {
        setList((prevList) => {
            const newTasks = [newTask, ...prevList.tasks];
            return { ...prevList, tasks: newTasks };
        });
       
        setErrorTasks(false);
    };

    // save edit task to list by id
    const setEditTask = (editTask) => {
        setList((prevList) => {
            const newTasks = prevList.tasks.map((task) => editTask.id === task.id ? editTask : task);
            return { ...prevList, tasks: newTasks };
        });
        setIsEditTaskMode(false);
        setErrorTasks(false);
    };

    // add name of list
    const addNameOfList = (e) => {
        e.preventDefault();

        setErrorName(false);

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

                <h2>{listData ? "Edit List" : "New List"}</h2>

                <div className="form-wrapper input-name-wrapper" >
                    <label>Name:</label>
                    <input
                        type='text'
                        className={errorName ? "name-input error" : "name-input"}
                        value={name}
                        onChange={addNameOfList}
                        placeholder={errorName ? "please fill in the field" : ""}
                    />
                </div>

                <div className={errorTasks ? "form-wrapper error" : "form-wrapper"}>
                    {!isEditTaskMode && <>
                        <h3>Create new task</h3>
                        <FormTask
                            addNewTask={addNewTask}
                            isEditList={false}
                        />
                    </>}

                    {isEditTaskMode && <>
                        <h3>Edit task</h3>
                        <FormTask
                            setEditTask={setEditTask}
                            task={taskForEdit}
                            isEditTaskMode={isEditTaskMode}
                            close={() => setIsEditTaskMode(false)}
                        />
                    </>}
                </div>
                <ul className="list-tasks-wrap">
                    {errorTasks && <p>Empty list of tasks cannot by created...</p>}
                    {tasks.map((task) => {
                        return (
                            <TaskCard
                                key={task.id}
                                hideButtons={isEditTaskMode}
                                task={task}
                                onClickEditBtn={openEtitTaskCard}
                                deleteTaskById={deleteTaskById}
                            />
                        )
                    })}
                </ul>
                <div>
                    <button className={errorName || errorTasks ? "save-btn error-button" : "save-btn"} onClick={onSubmit}>Save</button>
                    <button className="close-btn" onClick={close}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ListCard;
