import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const clearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.done);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="app">
      <h1>Task Management App</h1>
      <nav>
        <Link to="/">Add Task</Link> | <Link to="/tasks">View Tasks</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TaskForm addTask={addTask} />} />
        <Route
          path="/tasks"
          element={
            <TaskList
              tasks={tasks}
              toggleTaskStatus={toggleTaskStatus}
              deleteTask={deleteTask}
              clearCompleted={clearCompleted}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
