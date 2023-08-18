import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { taskId } = useParams();
  const [editedTask, setEditedTask] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    // Fetch task data based on taskId
    async function fetchTask() {
      try {
        const response = await axios.get(
          `http://localhost:8000/task/edit/${taskId}`
        );
        console.log("response", response);
        setEditedTask(response.data.text);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTask();
  }, [taskId]);

  async function handleSave() {
    try {
      await axios.put(`http://localhost:8000/task/update/${taskId}`, {
        text: editedTask,
      });
      navigate("/task");
    } catch (error) {
      alert("Failed to update the task. Please try again.");
    }
  }

  return (
    <div className="edit-task-form">
      <input
        type="text"
        value={editedTask}
        onChange={(e) => setEditedTask(e.target.value)}
      />

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditTask;
