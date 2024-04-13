import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoReducer from './reducers/taskReducer';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const store = createStore(todoReducer);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Todo App</h1>
        <TodoForm />
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
