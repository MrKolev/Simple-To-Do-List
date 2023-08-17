import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./styles/CardList.css"
import { FormTask } from '../FormTask';
import { TaskCard } from '../TaskCard';
import { getTaskById } from '../../utils/utils';

const ListCard = ({ isEditMode, listData, addEditedList, close, addNewList }) => {

    const [{ id, name, listStatus, tasks }, setList] = useState(
        listData || {
            id: "",
            name: "",
            listStatus: "WAITING",
            tasks: []
        }
    );
    const [taskForEdit, setTaskForEdit] = useState({});
    const [error, setError] = useState(false);
    const [isEditTaskMode, setIsEditTaskMode] = useState(false)

    // const { id, name, listStatus, tasks } = list

    // seva new/edit list card
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

        if (isEditMode) {
            addEditedList(newList);
        } else {
            addNewList(newList);
        }

        close();
    }
    // delite task by id
    const deleteTaskById = (taskId) => {
        setList((prevList) => {
            const newTasks = prevList.tasks.filter((task) => taskId !== task.id);
            return { ...prevList, tasks: newTasks };
        });
    }

    // open task from edit by id 
    const openEtitTaskCard = (taskId) => {
        debugger
        setTaskForEdit(getTaskById(taskId, tasks));
        setIsEditTaskMode(true)

    }
    // add new task to list
    const addNewTask = (newTask) => {
        setList((prevList) => {
            const newTasks = [newTask, ...prevList.tasks];
            return { ...prevList, tasks: newTasks };
        });
        setError(false);
    }

    // save edit task to list by id
    const setEditTask = (editTask) => {
        setList((prevList) => {
            const newTasks = prevList.tasks.map((task) => editTask.id === task.id ? editTask : task);
            return { ...prevList, tasks: newTasks };
        });
        setIsEditTaskMode(false);

    }

    // add name of list
    const addNameOfList = (e) => {
        e.preventDefault();
        setList((prevList) => {
            return { ...prevList, name: e.target.value };
        });
        setError(false);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={close}>
                    &times;
                </span>

                <h2>{listData ? "Edit List" : "New List"}</h2>

                <div className="input-name-wrapper" >
                    <label>Name:</label>
                    <input
                        type='text'
                        value={name}
                        onChange={addNameOfList}
                        placeholder={error ? "please fill in the field" : ""}
                    />
                </div>

                {!isEditTaskMode && <div className="form-wrapper">
                    <h3>Create new task</h3>
                    <FormTask
                        addNewTask={addNewTask}
                        isEditList={false}
                    />
                </div>}

                {isEditTaskMode && <div className="form-wrapper-edit">
                    <h3>Edit task</h3>
                    <FormTask
                        setEditTask={setEditTask}
                        task={taskForEdit}
                        isEditTaskMode={isEditTaskMode}
                        close={() => setIsEditTaskMode(false)}
                    />
                </div>}
                <ul>
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
                <button onClick={close}>Close</button>
                <button disabled={error} onClick={onSubmit}>Save</button>
            </div>
        </div>
    );
}

ListCard.defaultProps = { action: "create" };

export default ListCard;


