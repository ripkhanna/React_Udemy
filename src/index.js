import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/app';

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


const createStoreWithMiddleware = applyMiddleware(Async)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <App />
      
   </Router>
  </Provider>
  , document.querySelector('.container'));
