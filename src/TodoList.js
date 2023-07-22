
// my future ref for bash commands
// npx create-react-app test
// cd test
// npm install @mui/material @emotion/react @emotion/styled


import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const TodoList = () => {
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleAddTask = () => {
    if (input.trim() !== '') {
      setPendingTasks([...pendingTasks, input]);
      setInput('');
    }
  };

  const handleTaskComplete = (task) => {
    setPendingTasks(pendingTasks.filter((item) => item !== task));
    setCompletedTasks([...completedTasks, task]);
  };

  const handleDeleteTask = (task, isCompletedTask) => {
    if (isCompletedTask) {
      setCompletedTasks(completedTasks.filter((item) => item !== task));
    } else {
      setPendingTasks(pendingTasks.filter((item) => item !== task));
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPendingTasks = pendingTasks.filter((task) =>
    task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompletedTasks = completedTasks.filter((task) =>
    task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Todo List</h1>
      <TextField
        label="Add Task"
        variant="outlined"
        value={input}
        onChange={handleInputChange}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        Add
      </Button>

      <div>
        <TextField
          label="Search Tasks"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
        />
      </div>

      <div>
        <h2>Pending Tasks</h2>
        <List>
          {filteredPendingTasks.map((task, index) => (
            <ListItem key={index}>
              <ListItemText primary={task} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleTaskComplete(task)}
              >
                Mark Complete
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteTask(task, false)}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </div>

      <Divider />

      <div>
        <h2>Completed Tasks</h2>
        <List>
          {filteredCompletedTasks.map((task, index) => (
            <ListItem key={index}>
              <ListItemText primary={task} />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteTask(task, true)}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default TodoList;
