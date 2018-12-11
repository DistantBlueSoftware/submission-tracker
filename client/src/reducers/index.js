import { combineReducers } from 'redux';
import user from './user';
import submissions from './submissions';
import publications from './publications';
import pieces from './pieces';

export default combineReducers({
  user,
  publications,
  submissions,
  pieces
});
