import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/tasksSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { tasks, status } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

  return (
    <div className="min-h-screen flex-center">
      <div className="w-4/5 max-w-4xl">
        <h1 className="text-4xl mb-8 text-center">Task Manager</h1>
        <div className="flex justify-center mb-8">
          <Link to="/add">
            <button>Add New Task</button>
          </Link>
        </div>
        <ul className="space-y-6">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li
                key={task.id}
                className="task-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center">
                  <span>
                    <strong>{task.title}</strong> -{" "}
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                  <Link to={`/edit/${task.id}`}>
                    <button>Edit</button>
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center">No tasks available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
