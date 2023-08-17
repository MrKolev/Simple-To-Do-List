
const StatusTooltip = ({ id, updateTaskStatus, taskStatus }) => {

  const handleStatusChange = (event) => {
    updateTaskStatus(id, event.target.value);
  };

  return (
    <div>
     
      {taskStatus === 'WAITING' &&
        <><label>
          <input
            type="radio"
            value="DISABLED"
            checked={taskStatus === 'DISABLED'}
            onChange={handleStatusChange}
          />
          DISABLED
        </label>
          <label>
            <input
              type="radio"
              value="COMPLETED"
              onChange={handleStatusChange}
            />
            COMPLETED
          </label></>}

     
      {taskStatus === 'COMPLETED' &&
        <>
          <label>
            <input
              type="radio"
              value="COMPLETED"
              checked={taskStatus === 'COMPLETED'}
              onChange={handleStatusChange}
            />
            COMPLETED
          </label>
          <label>
            <input
              type="radio"
              value="UNCOMPLETED"
              onChange={handleStatusChange}
            />
            UNCOMPLETED
          </label>
        </>}

      
      {taskStatus === 'UNCOMPLETED' &&
        <>
          <label>
            <input
              type="radio"
              value="COMPLETED"
              onChange={handleStatusChange}
            />
            COMPLETED
          </label>
          <label>
            <input
              type="radio"
              value="UNCOMPLETED"
              checked={taskStatus === 'UNCOMPLETED'}
              onChange={handleStatusChange}
            />
            UNCOMPLETED
          </label>
        </>}


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


    </div>
  );
}

export default StatusTooltip;
