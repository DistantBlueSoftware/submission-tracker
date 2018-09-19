import { GET_PUBLICATIONS, OPEN_PUBLICATION, NEW_PUBLICATION, UPDATE_PUBLICATION, DELETE_PUBLICATION, ERROR } from '../constants/actionTypes';

const INITIAL_STATE = {
  all: [],
  current: {},
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PUBLICATIONS:
      return {...state, all: [...action.payload]};
    case OPEN_PUBLICATION:
      return {...state, current: action.payload};
    case NEW_PUBLICATION:
      return {...state, all: [...state.all, action.payload]}
    case UPDATE_PUBLICATION:
    case DELETE_PUBLICATION:
      return [];
    case ERROR:
      return {...state, errorMessage: action.payload};
    default:
      return state;
  }
}
