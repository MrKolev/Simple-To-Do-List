import moment from "moment";

export const updateTasksStatus = ({tasks}) => {
    tasks.forEach(({taskStatus,deadline}) => {
        if (taskStatus !== "DISABLED") {
          const today = moment();
          const expirationDate = moment(deadline);
          if (expirationDate.isBefore(today)) {
            taskStatus = "DISABLED";
          }
        }
      })
}