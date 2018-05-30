import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/app';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import Resources from './components/resources';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
   
} from 'react-router-dom';
import Home from './components/home';
import requireAuthor from './components/require_authentication';
import Async from './middlewares/async';
import { AUTH_USER } from './actions/types';


const createStoreWithMiddleware = applyMiddleware(Async,reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if(token) {
  store.dispatch({ type: AUTH_USER });
}



ReactDOM.render(
  //<Provider store={createStoreWithMiddleware(reducers)}>
  <Provider store={ store}>
    <Router>
      <App />
      
   </Router>
  </Provider>
  , document.querySelector('.container'));
