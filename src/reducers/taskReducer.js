import { ADD_TODO, EDIT_TODO, UPDATE_TODO, TOGGLE_TODO, DELETE_TODO } from '../actions/taskActions';

// Load initial state from local storage if available
const initialState = JSON.parse(localStorage.getItem('todos')) || { todos: [] };

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodo = { id: Date.now(), text: action.payload.text, completed: false };
      const updatedTodos = [...state.todos, newTodo];
      localStorage.setItem('todos', JSON.stringify({ todos: updatedTodos }));
      return { todos: updatedTodos };

    case EDIT_TODO:
    case UPDATE_TODO:
      const updatedText = action.payload.newText;
      const updatedId = action.payload.id;
      const updatedTodoList = state.todos.map(todo =>
        todo.id === updatedId ? { ...todo, text: updatedText } : todo
      );
      localStorage.setItem('todos', JSON.stringify({ todos: updatedTodoList }));
      return { todos: updatedTodoList };

    case TOGGLE_TODO:
      const toggledId = action.payload.id;
      const toggledTodoList = state.todos.map(todo =>
        todo.id === toggledId ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem('todos', JSON.stringify({ todos: toggledTodoList }));
      return { todos: toggledTodoList };

    case DELETE_TODO:
      const deletedId = action.payload.id;
      const filteredTodoList = state.todos.filter(todo => todo.id !== deletedId);
      localStorage.setItem('todos', JSON.stringify({ todos: filteredTodoList }));
      return { todos: filteredTodoList };

    default:
      return state;
  }
};

export default todoReducer;
