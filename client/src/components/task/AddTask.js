import { updateNewTaskText, addTask, setTasks } from "../../slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AddTask = () => {
  const dispatch = useDispatch();
  const newTaskText = useSelector((state) => state.tasks.newTaskText);

  let token = localStorage.getItem("token");
  let decodedToken = jwt_decode(token);
  let userId = decodedToken.userId;

  function handleChange(e) {
    dispatch(updateNewTaskText(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/task/create",
        { text: newTaskText },
        { headers: { Authorization: `Bearer ${token} ` } }
      );

      // Make another API call to get updated tasks list after adding the new task
      const updatedTasks = await axios.get(
        `http://localhost:8000/task/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setTasks(updatedTasks.data));
      // Reset the task state to an empty string after adding the task
      dispatch(updateNewTaskText(""));
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <form className="form__input" onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          id="task"
          placeholder="What to do..."
          value={newTaskText}
          className="taskInput"
          required
          onChange={handleChange}
        />
        <button className="addTodoBtn" type="submit">
          +
        </button>
      </form>
    </>
  );
};

export default AddTask;
