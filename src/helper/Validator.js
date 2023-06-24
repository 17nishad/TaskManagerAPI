class Validator {
  static validateTaskInfo(taskInfo, taskData) {
    if (
      taskInfo.hasOwnProperty("taskId") &&
      taskInfo.hasOwnProperty("title") &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.hasOwnProperty("completed") &&
      taskInfo.hasOwnProperty("priority") &&
      this.validateUniqueTaskId(taskInfo, taskData)
    ) {
      return {
        status: true,
        message: "Task has been added",
      };
    }
    if (!this.validateUniqueTaskId(taskInfo, taskData)) {
      return {
        status: false,
        message: "Task id has to be unique",
      };
    }

    return {
      status: false,
      message: "Please provide the all properties",
    };
  }

  static validateUniqueTaskId(taskInfo, taskData) {
    const taskIdFound = taskData.tasks.some(
      (task) => task.taskId == taskInfo.taskId
    );
    if (taskIdFound) return false;
    return true;
  }
}

module.exports = Validator;
