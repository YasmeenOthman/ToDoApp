import axios from "axios";
import React, { useEffect, useState } from "react";

import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import Footer from "../footer/footer";

import "./task.css";
const Task = () => {
  let [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/task/")
      .then((res) => {
        setTasks([...res.data], { description: "A new Book", id: "..." });
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
      {/* <Footer /> */}
    </div>
  );
};

export default Task;
