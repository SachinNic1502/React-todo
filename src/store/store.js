import { createStore, applyMiddleware } from 'redux';
import todoReducer from '../reducers/taskReducer';

const saveToLocalStorage = store => next => action => {
  const result = next(action);
  localStorage.setItem('todos', JSON.stringify(store.getState()));
  return result;
};

const store = createStore(todoReducer, applyMiddleware(saveToLocalStorage));

export default store;
