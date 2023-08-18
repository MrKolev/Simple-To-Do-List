import moment from "moment";

export const updateTaskStatusById = (toDoLists, id, taskStatus) => {

  const updatedLists = toDoLists.map(toDoList => {
    const updatedTasks = toDoList.tasks.map(task => {
      if (task.id === id) {
        return { ...task, taskStatus: taskStatus };
      };

      return task;
    });

    return { ...toDoList, tasks: updatedTasks };
  });

  return updatedLists;
};

export const checkTaskExpired = (lists) => {

  let isUpdated = false;

  lists.forEach((list) => {
    list.tasks.forEach((task) => {
      if (task.taskStatus !== "DISABLED") {
        const today = moment();
        const expirationDate = moment(task.deadline);
        if (expirationDate.isBefore(today)) {
          task.taskStatus = "DISABLED";
          isUpdated = true;
        };
      };
    });
  });

  if (isUpdated) {
    return lists;
  } else {
    return false;
  };
};

export const getTaskById = (taskId, tasks) => {
  return tasks.filter((task) => taskId === task.id)[0];
};

export const checkListStatus = (toDoList) => {
  toDoList.forEach((list) => {
    const allTasksCompleted = list.tasks.every((task) => task.taskStatus === "COMPLETED" || task.taskStatus === "DISABLED");

    if (allTasksCompleted) {
      list.listStatus = "COMPLETED";
    } else {
      list.listStatus = "WAITING";
    }
  });

  return toDoList;
};





