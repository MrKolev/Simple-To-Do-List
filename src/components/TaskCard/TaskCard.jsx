import { BsFillTrashFill, BsFillPencilFill, BsCheckCircle, BsXCircle, BsClock } from "react-icons/bs";
import "./styles/TaskCard.css"
import StatusDropdown from "./Status";



const TaskCard = ({
    task,
    hideButtons,
    showStatusDropdown,
    onClickEditBtn,
    deleteTaskById,
    updateTaskStatus }) => {

    const { id, title, description, deadline, taskStatus } = task;

    return (
        <li className="task-card" >
            <div className="task-card-tools-wrap" >
                {!hideButtons &&
                    <BsFillTrashFill
                        onClick={() => deleteTaskById(id)}
                        className="delete-btn" />}

                {!hideButtons &&
                    <BsFillPencilFill
                        onClick={() => onClickEditBtn(id)}
                        className="edit-btn" />}

                <div className="tooltip">


                    {showStatusDropdown && <span className="tooltiptext">
                        <StatusDropdown
                            id={id}
                            updateTaskStatus={updateTaskStatus}
                            taskStatus={taskStatus}
                        />
                    </span>}
                    <span className="task-status">
                        {taskStatus === 'COMPLETED' && <BsCheckCircle color="#4CAF50" />}
                        {taskStatus === 'DISABLED' && <BsXCircle color="#9E9E9E" />}
                        {taskStatus === 'UNCOMPLETED' && <BsXCircle color="#FF9800" />}
                        {taskStatus === 'WAITING' && <BsClock color="#2196F3" />}
                    </span>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{title}</td>
                        <td>{description}</td>
                        <td>{deadline}</td>
                    </tr>
                </tbody>
            </table>
        </li>
    )
}

TaskCard.defaultProps = { hideStatusDropdown: true };

export default TaskCard;