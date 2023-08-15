import { BsFillTrashFill, BsFillPencilFill, BsCheckCircle, BsXCircle, BsClock } from "react-icons/bs";
import "./styles/TaskCard.css"



const TaskCard = ({ task, isEdit, onClickEditBtn, deleteTaskById}) => {

    const { id, title, description, deadline, taskStatus } = task;

    return (
        <li className="task-card" >
            {isEdit && <BsFillTrashFill
                onClick={() => deleteTaskById(id)}
                className="delete-btn"
            >Delete</BsFillTrashFill>}
            {isEdit && <BsFillPencilFill
                onClick={() => onClickEditBtn(id)}
                className="edit-btn"
            >Delete</BsFillPencilFill>}
            <span>
                {taskStatus === 'COMPLETED' && <BsCheckCircle color="#4CAF50" />}
                {taskStatus === 'DISABLED' && <BsXCircle color="#9E9E9E" />}
                {taskStatus === 'UNCOMPLETED' && <BsXCircle color="#FF9800" />}
                {taskStatus === 'WAITING' && <BsClock color="#2196F3" />}
            </span>
            
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

TaskCard.defaultProps = { isEdit: false };

export default TaskCard;