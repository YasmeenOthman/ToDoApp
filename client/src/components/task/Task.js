import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import TasksContainer from "./TasksContainer";
import AddTask from "./AddTask";
import Footer from "../Footer/Footer";
import "./task.css";
import EditTask from "./EditTask";
import { useSelector, useDispatch } from "react-redux";
import { setTasks } from "../../slices/tasksSlice";

const Task = () => {
  let tasks = useSelector((state) => state.tasks.tasks);

  const dispatch = useDispatch();
  const navigate = useNavigate("");

  const [showEditOverlay, setShowEditOverlay] = useState(false);
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
        dispatch(setTasks(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, userId]);

  // delete a specific task
 

  // update function
  async function handleEditTask(taskId) {
    // pass the task id to edit component
    navigate(`/edit/${taskId}`);
  }
  const closeEditOverlay = () => {
    setShowEditOverlay(!showEditOverlay);
  };
  return (
    <div className="taskComponent">
      <AddTask />
      <TasksContainer
        handleEditTask={handleEditTask}
      
      />
      {showEditOverlay && <EditTask closeEditOverlay={closeEditOverlay} />}
      <Footer />
    </div>
  );
};

export default Task;
