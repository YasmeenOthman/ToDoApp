import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], newTaskText: "" },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },

    // updateTask: (state, action) => {
    //   const updatedTask = action.payload;
    //   const index = state.tasks.findIndex(
    //     (task) => task._id === updatedTask._id
    //   );
    //   if (index !== -1) {
    //     state.tasks[index] = updatedTask;
    //   }
    // },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    updateNewTaskText: (state, action) => {
      state.newTaskText = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTasks, addTask, updateTask, deleteTask, updateNewTaskText } =
  tasksSlice.actions;

export default tasksSlice.reducer;
