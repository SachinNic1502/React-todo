import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editTodo, updateTodo, toggleTodo, deleteTodo } from '../actions/taskActions';
import { ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const TodoItem = ({ todo, editTodo, updateTodo, toggleTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleToggle = () => {
    if (!isEditing) {
      toggleTodo(todo.id);
    }
  };

  const handleEdit = () => {
    if (!todo.completed) {
      setIsEditing(true);
    }
  };

  const handleUpdate = () => {
    if (!text.trim()) return;
    updateTodo(todo.id, text);
    setIsEditing(false);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const getStatus = () => {
    return todo.completed ? 'Completed' : 'Incomplete';
  };

  return (
    <ListItem
      dense
      button={!isEditing && !todo.completed}
      disabled={isEditing || todo.completed}
      onClick={handleToggle}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          edge="start"
          checked={todo.completed}
          tabIndex={-1}
          disableRipple
          disabled={isEditing || todo.completed}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {isEditing ? (
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <>
          <ListItemText primary={todo.text} />
          <ListItemText primary={getStatus()} />
          {!todo.completed && (
            <ListItemSecondaryAction style={{marginRight:'50px'}}>
              <IconButton aria-label="edit" onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </>
      )}
      <ListItemSecondaryAction>
        {isEditing ? (
          <>
            <IconButton aria-label="update" onClick={handleUpdate}>
              <CheckIcon />
            </IconButton>
            <IconButton aria-label="cancel" onClick={handleCancelEditing}>
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <>
            {!todo.completed && <span style={{ width: '16px', display: 'inline-block' }} />}
            <IconButton aria-label="delete" onClick={handleDelete} disabled={isEditing}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default connect(null, { editTodo, updateTodo, toggleTodo, deleteTodo })(TodoItem);
