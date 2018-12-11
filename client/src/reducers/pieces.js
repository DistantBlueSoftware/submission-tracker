import { GET_PIECES, PIECE_ERROR } from '../constants/actionTypes';

const INITIAL_STATE = {
  all: [],
  current: {},
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PIECES:
      return {...state, all: [...action.payload]};
    case PIECE_ERROR:
      return {...state, errorMessage: action.payload};
    default:
      return state;
  }
}