
const StatusDropdown = ({ id, updateTaskStatus, taskStatus }) => {

  const handleStatusChange = (event) => {
    updateTaskStatus(id, event.target.value);
  };

  return (
    <div>
      {(taskStatus === 'WAITING' || taskStatus === 'UNCOMPLETED') &&
        <><label>
          <input
            type="radio"
            value="COMPLETED"
            checked={taskStatus === 'COMPLETED'}
            onChange={handleStatusChange}
          />
          COMPLETED
        </label>
          </>}

      {taskStatus === 'WAITING' &&
        <label>
          <input
            type="radio"
            value="DISABLED"
            checked={taskStatus === 'DISABLED'}
            onChange={handleStatusChange}
          />
          DISABLED
        </label>}

      {taskStatus === 'DISABLED' &&
        <label>
          <input
            type="radio"
            value="DISABLED"
            checked={taskStatus === 'DISABLED'}
            onChange={handleStatusChange}
          />
          DISABLED
        </label>}

      {taskStatus === 'COMPLETED' &&
        <><label>
          <label>
            <input
              type="radio"
              value="COMPLETED"
              checked={taskStatus === 'COMPLETED'}
              onChange={handleStatusChange}
            />
            COMPLETED
          </label>
          <input
            type="radio"
            value="UNCOMPLETED"
            checked={taskStatus === 'UNCOMPLETED'}
            onChange={handleStatusChange}
          />
          UNCOMPLETED
        </label>
        </>}
    </div>
  );
}

export default StatusDropdown;
