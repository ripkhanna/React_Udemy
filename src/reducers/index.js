import { combineReducers } from 'redux';
import commentsReducer from './comments';
import authenticatedReducer from './authentication';
import usersReducer from './users';
import {reducer as form} from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  comments: commentsReducer,
  authenticatedReducer: authenticatedReducer,
  users: usersReducer,
  form: form,
  auth: authReducer

});

export default rootReducer;
