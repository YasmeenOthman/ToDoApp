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

  // Add a useEffect hook to fetch tasks once the component mounts or whenever the token or userId changes

  let decodedToken = jwt_decode(token);
  let userId = decodedToken.userId;

  useEffect(() => {
    if (!token) {
      alert("Token error");
      return;
    }
    axios
      .get(`http://localhost:8000/task/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, userId]);
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
        // console.log("task added successfully");
        axios
          .get(`http://localhost:8000/task/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setTasks((prevTasks) => [...prevTasks, res.data]);
          })
          .catch((err) => {
            console.log(err);
          });

        setTask("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
