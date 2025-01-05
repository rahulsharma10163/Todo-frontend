import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { getState }) => {
  const { tasks } = getState().tasks;
  if (tasks.length > 0) {
    console.log("Tasks already loaded, skipping fetch.");
    return tasks; // Skip fetch if tasks are already loaded
  }
  const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=50");
  return response.data;
});


// Add a new task
// tasksSlice.js
export const addTask = createAsyncThunk("tasks/addTask", async (newTask) => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/todos", newTask);
  return response.data; // Return the newly created task (including the new ID)
});


const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateTaskStatus: (state, action) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload; // Update the task in the Redux store
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      });
  },
});

export const { updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
