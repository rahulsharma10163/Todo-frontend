import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchTasks, updateTaskStatus } from '../store/tasksSlice';

const Edepag = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch task data on mount
  useEffect(() => {
    const fetchTask = async () => {
      // Check for task in Redux store first
      const existingTask = tasks.find((t) => t.id === parseInt(taskId, 10));
      if (existingTask) {
        setTask(existingTask);
      } else {
        // Fallback to API fetch
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/todos/${taskId}`
          );
          setTask(response.data);
        } catch (error) {
          alert('Task not found!');
          navigate('/');
        }
      }
    };

    fetchTask();
  }, [taskId, tasks, navigate]);

  // Handle status change
  const handleStatusChange = async () => {
    if (task) {
      setLoading(true);
      const updatedTask = { ...task, completed: !task.completed };

      try {
        // API update
        await axios.patch(
          `https://jsonplaceholder.typicode.com/todos/${taskId}`,
          updatedTask
        );

        // Update Redux store
        dispatch(updateTaskStatus(updatedTask));

        // Update local task state
        setTask(updatedTask);
        alert('Task status updated!');
      } catch (error) {
        console.error('Error updating task status:', error);
        alert('Failed to update task status.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Reload task from Redux if Redux updates after status change
  useEffect(() => {
    const updatedTask = tasks.find((t) => t.id === parseInt(taskId, 10));
    if (updatedTask) {
      setTask(updatedTask);
    }
  }, [tasks, taskId]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded shadow-md w-96"> 
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Edit Task</h2> 
        <p className="text-lg mb-2 text-center">
          <strong>Title:</strong> {task.title}
        </p>
        <p className="text-lg mb-4 text-center">
          <strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}
        </p>
        <button
          onClick={handleStatusChange}
          disabled={loading}
          className={`
            ${loading ? 'bg-gray-300' : 'bg-green-500'} 
            text-white px-4 py-2 rounded mb-4 w-full 
          `}
        >
          {loading
            ? 'Updating...'
            : `Mark as ${task.completed ? 'Pending' : 'Completed'}`}
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Edepag;