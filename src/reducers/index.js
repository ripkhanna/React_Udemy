import { combineReducers } from 'redux';
import commentsReducer from './comments';
import authenticatedReducer from './authentication';
import usersReducer from './users';

const rootReducer = combineReducers({
  comments: commentsReducer,
  authenticated: authenticatedReducer,
  users:usersReducer

});

export default rootReducer;
