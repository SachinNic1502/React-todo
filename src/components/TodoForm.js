import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/taskActions';
import { TextField, Button } from '@mui/material';

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <TextField
        variant="outlined"
        placeholder="Add Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        style={{ marginLeft: '10px' }}
      >
        Add Task
      </Button>
    </form>
  );
};

export default connect(null, { addTodo })(TodoForm);
