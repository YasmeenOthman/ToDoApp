import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import TasksContainer from "./TasksContainer";
import AddTask from "./AddTask";
import Footer from "../footer/Footer";
import "./task.css";

const Task = () => {
  let [task, setTask] = useState("");
  let [tasks, setTasks] = useState([]);
  let token = localStorage.getItem("token");

  if (!token) {
    alert("Token error");
  }
  let decodedToken = jwt_decode(token);
  let userId = decodedToken.userId;

  function handleTaskText(text) {
    setTask(text);
  }
  function addNewTask() {
    axios
      .post(
        "http://localhost:8000/task/create",
        { text: task },
        { headers: { Authorization: `Bearer ${token} ` } }
      )
      .then((res) => {
        console.log(res);
        setTask("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/task/${userId}`)
      .then((res) => {
        setTasks([...res.data]);
        console.log(tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="taskComponent">
      <AddTask
        task={task}
        addNewTask={addNewTask}
        handleTaskText={handleTaskText}
      />
      <TasksContainer tasks={tasks} />
      <Footer />
    </div>
  );
};

export default Task;
