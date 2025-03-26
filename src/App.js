import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from local storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  // Toggle task completion
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="task-container">
      <h2>Lazy Task Manager</h2>
      <input
        type="text"
        className="task-input"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button className="task-button" onClick={addTask}>
        Add Task
      </button>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
              onClick={() => toggleTask(index)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
