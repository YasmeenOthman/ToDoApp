import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import Footer from "../footer/Footer";

import "./task.css";
const Task = () => {
  let [tasks, setTasks] = useState([]);
  let token = localStorage.getItem("usertoken");
  let decodedToken = jwt_decode(token);
  let userId = decodedToken.userId;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/task/${userId}`)
      .then((res) => {
        setTasks([...res.data], { text: "A new Book" });
        console.log(tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="taskComponent">
      <AddTask />
      <TasksContainer tasks={tasks} />
      <Footer />
    </div>
  );
};

export default Task;
