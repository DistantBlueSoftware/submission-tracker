import { GET_SUBMISSIONS, OPEN_SUBMISSION, NEW_SUBMISSION, UPDATE_SUBMISSION, DELETE_SUBMISSION, ERROR } from '../constants/actionTypes';

const INITIAL_STATE = {
  all: [],
  current: {},
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SUBMISSIONS:
      return {...state, all: [...action.payload]};
    case OPEN_SUBMISSION:
      return {...state, current: action.payload};
    case NEW_SUBMISSION:
    case UPDATE_SUBMISSION:
    case DELETE_SUBMISSION:
      return state;
    case ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
