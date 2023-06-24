const express = require("express");
const cors = require("cors");
const routes = require("express").Router();
const taskList = require("./routes/taskList");

const app = express();
app.use(cors());
app.use(routes);
app.use(express.json());

const PORT = 3000;

routes.get("/", (req, res) => {
  res.status(200).send("Welcome to Task Manager");
});

routes.use("/tasks", taskList);

app.listen(PORT, (err) => {
  if (!err) {
    console.log("server successfully started");
  } else {
    console.log("Something went wrong");
  }
});
