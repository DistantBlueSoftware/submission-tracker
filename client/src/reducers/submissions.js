import { GET_SUBMISSIONS, OPEN_SUBMISSION, NEW_SUBMISSION, UPDATE_SUBMISSION, DELETE_SUBMISSION, SUBMISSION_ERROR } from '../constants/actionTypes';
import { findUpdatedItem } from '../lib';
const INITIAL_STATE = {
  all: [],
  current: {},
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SUBMISSIONS:
      return {...state, all: [...action.payload], errorMessage: ''};
    case OPEN_SUBMISSION:
      return {...state, current: action.payload, errorMessage: ''};
    case NEW_SUBMISSION:
      return {...state, all: [...state.all, action.payload], current: action.payload, errorMessage: ''};
    case UPDATE_SUBMISSION:
      return {...state, all: [...findUpdatedItem(state.all, action.payload, '_id')], current: action.payload, errorMessage: ''};
    case DELETE_SUBMISSION:
      return state;
    case SUBMISSION_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
