const taskListRoutes = require("express").Router();
const bodyParser = require("body-parser");
const taskList = require("../taskList.json");
const Validator = require("../helper/Validator");
const path = require("path");
const fs = require("fs");

taskListRoutes.use(bodyParser.urlencoded({ extended: false }));
taskListRoutes.use(bodyParser.json());

taskListRoutes.get("/", (req, res) => {
  res.status(200);
  res.send(taskList);
});

taskListRoutes.post("/", (req, res) => {
  const newTaskDetails = req.body;
  if (Validator.validateTaskInfo(newTaskDetails, taskList).status) {
    const writePath = path.join(__dirname, "..", "taskList.json");
    let taskListModified = taskList;
    taskListModified.tasks.push(newTaskDetails);
    fs.writeFileSync(writePath, JSON.stringify(taskListModified), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(201).send("New task has been added successfully");
  } else {
    res.status(400).json(Validator.validateTaskInfo(newTaskDetails, taskList));
  }
});

taskListRoutes.get("/:taskId", (req, res) => {
  const tasks = taskList.tasks;
  const taskIdPassed = req.params.taskId;
  const requestedTask = tasks.filter((task) => task.taskId == taskIdPassed);
  if (requestedTask.length) {
    res.status(200).send(requestedTask);
  } else {
    res.status(404).send("Requested task is not found");
  }
});

taskListRoutes.put("/:taskId", (req, res) => {
  const tasks = taskList.tasks;
  const taskIdPassed = req.params.taskId;
  const updatedTaskDetails = req.body;
  console.log(tasks);
  const requestedTaskIndex = tasks.findIndex((task) => task.taskId == taskIdPassed);
  
  if (requestedTaskIndex !== 1) {
    if (Validator.validateUpdateTaskData(updatedTaskDetails).status) {
      
      const writePath = path.join(__dirname, "..", "taskList.json");
      let taskListModified = taskList;
      taskListModified.tasks[requestedTaskIndex].title = updatedTaskDetails.title;
      taskListModified.tasks[requestedTaskIndex].description = updatedTaskDetails.description;
      taskListModified.tasks[requestedTaskIndex].completed = updatedTaskDetails.completed;
      taskListModified.tasks[requestedTaskIndex].priority = updatedTaskDetails.priority;
      fs.writeFileSync(writePath, JSON.stringify(taskListModified), {
        encoding: "utf-8",
        flag: "w",
      });
      res.status(201).send("Task has been updated successfully");
    } else {
      res.status(400).json(Validator.validateUpdateTaskData(updatedTaskDetails))
    }
    res.status(200);
  } else {
    res.status(404).send("Requested task is not found");
  }
});

taskListRoutes.delete("/:taskId", (req, res) => {
  const tasks = taskList.tasks;
  const taskIdPassed = req.params.taskId;
  const requestedTaskIndex = tasks.findIndex(
    (task) => task.taskId == taskIdPassed
  );
  console.log(requestedTaskIndex);
  if (requestedTaskIndex !== -1) {
    const writePath = path.join(__dirname, "..", "taskList.json");
    let taskListModified = taskList;
    taskListModified.tasks.splice(requestedTaskIndex, 1);
    console.log(taskListModified);
    fs.writeFileSync(writePath, JSON.stringify(taskListModified), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(200).send("Task has been removed successfully");
  } else {
    res.status(404).send("Requested task is not found");
  }
});

module.exports = taskListRoutes;
