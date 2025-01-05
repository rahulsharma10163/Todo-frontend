import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";
import { useNavigate } from "react-router-dom";

const AddTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTask = async () => {
    if (!title || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const newTask = {
      title,
      description,
      completed: false,
    };

    try {
      await dispatch(addTask(newTask));
      alert("Task added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task.");
    }
  };

  return (
    <div className="min-h-screen flex-center">
      <div className="form-card w-4/5 max-w-md">
        <h2 className="text-2xl mb-4">Add New Task</h2>
        <input
  type="text"
  placeholder="Task Title"
  value={title} // Display the current state in the input
  onChange={(e) => setTitle(e.target.value)} // Update state when user types
  className="w-full p-2 mb-4 rounded"
/>

       <textarea
  placeholder="Task Description"
  value={description} // Display the current state in the textarea
  onChange={(e) => setDescription(e.target.value)} // Update state when user types
  className="w-full p-2 mb-4 rounded"
/>

        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default AddTaskPage;
