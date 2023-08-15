import moment from "moment";


export const updateTaskStatusById = (toDoLists, id, taskStatus) => {

  const updatedLists = toDoLists.map(toDoList => {

    const updatedTasks = toDoList.tasks.map(task => {
      if (task.id === id) {
        return { ...task, taskStatus: taskStatus };
      }
      return task;
    });

    return { ...toDoList, tasks: updatedTasks };
  });

  return updatedLists;
}

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
          }
        }
      })
    })

    if(isUpdated){
      return lists
    }else{
      return false;
    }

  }
