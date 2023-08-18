import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTask.css";

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

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <button> Add CheckList</button>
        <button> Add Attachment</button>
      </div>
      <div className="task-description">
        <textarea input="text" placeholder="Add task description ..." />
      </div>
      <div>
        <h3>Start date</h3>
        <input type="date" placeholder="Due Date" />
        <h3>Due Date</h3>
        <input type="date" placeholder="Due Date" />
      </div>

      <button onClick={handleSave} className="save-button">
        Save
      </button>
    </div>
  );
};

export default EditTask;
