import { combineReducers } from 'redux';
import user from './user';
import submissions from './submissions';
import publications from './publications';

export default combineReducers({
  user,
  publications,
  submissions
});
