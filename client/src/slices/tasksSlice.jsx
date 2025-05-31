import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], newTaskText: "" },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    updateNewTaskText: (state, action) => {
      state.newTaskText = action.payload;
    },
    updateTask: (state, action) => {
      const { taskId, newValue } = action.payload;

      const updatedTasks = state.tasks.map((task) =>
        task._id === taskId
          ? { ...task, text: newValue.text, status: newValue.status }
          : task
      );

      state.tasks = updatedTasks;
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
});

export const { setTasks, updateTask, deleteTask, updateNewTaskText } =
  tasksSlice.actions;

export default tasksSlice.reducer;
