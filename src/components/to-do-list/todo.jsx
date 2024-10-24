import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './todo.css'

function Todo() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === '') return; 
    setTasks([...tasks, task]);
    setTask('');
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    const editedTask = prompt('Edit the task:', tasks[index]);
    if (editedTask) {
      const newTasks = tasks.map((t, i) => (i === index ? editedTask : t));
      setTasks(newTasks);
    }
  };

  return (
    <div className="app-container d-flex align-items-center justify-content-center py-5">
      <div className="card p-4 shadow-lg py-5 px-5">
        <h3 className="text-center mb-4">
           To-Do List 
        </h3>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addTask}>
            Add
          </button>
        </div>

        <ul className="list-group">
          {tasks.map((t, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {t}
              <div>
                <button className="btn btn-warning btn-sm mx-2" onClick={() => editTask(index)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;