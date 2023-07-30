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

  function handleTaskText(value) {
    setTask(value);
  }

  async function addNewTask() {
    try {
      const res = await axios.post(
        "http://localhost:8000/task/create",
        { text: task },
        { headers: { Authorization: `Bearer ${token} ` } }
      );
      console.log(res);
      // Make another API call to get updated tasks list after adding the new task
      const updatedTasks = await axios.get(
        `http://localhost:8000/task/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks(updatedTasks.data);
      // Reset the task state to an empty string after adding the task
      setTask("");
    } catch (err) {
      console.log(err);
    }
  }

  // delete a specific task
  async function handleDelete(taskId) {
    try {
      if (window.confirm("You are going to delete the tasks, are you sure?")) {
        let res = await axios.delete(
          `http://localhost:8000/task/delete/${taskId}`
        );
        alert(res.data.msg);
        // Update tasks state locally by filtering out the deleted task
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  // update function
  async function handleEditTak(taskId) {
    try {
      let res = await axios.put(`http://localhost:8000/task/update/${taskId}`);
    } catch (error) {
      alert("Can not edit please try again ");
    }
  }

  return (
    <div className="taskComponent">
      <AddTask
        task={task}
        addNewTask={addNewTask}
        handleTaskText={handleTaskText}
      />
      <TasksContainer
        tasks={tasks}
        handleEditTak={handleEditTak}
        handleDelete={handleDelete}
      />
      <Footer />
    </div>
  );
};

export default Task;
