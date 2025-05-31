import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import TasksContainer from "./TasksContainer";
import AddTask from "./AddTask";

import "./task.css";
import { useDispatch } from "react-redux";
import { setTasks } from "../../slices/tasksSlice";

const Task = () => {
  const dispatch = useDispatch();

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

  return (
    <div className="taskComponent">
      <AddTask />
      <TasksContainer />
    </div>
  );
};

export default Task;
