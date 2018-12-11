import axios from 'axios';
import { NEW_PIECE, GET_PIECES, PIECE_ERROR } from '../constants/actionTypes';

export const getUserPieces = user => async dispatch => {
    try {
      const response = await axios.get(`/api/pieces/${user._id}`);
      const data = response.length ? response : response.data;
      dispatch ({ type: GET_PIECES, payload: data });
    } catch (e) {
      console.log(e)
      dispatch({ type: PIECE_ERROR, payload: 'Sorry, we couldn\t complete this request right now. Please try again.'});
    }
}

export const newPiece = (piece, callback) => async dispatch => {
  try {
    const response = await axios.post(`/api/pieces`, piece);
    const data = response.length ? response : response.data;
    dispatch ({ type: NEW_PIECE, payload: data });
    callback();
  } catch (e) {
    dispatch({ type: PIECE_ERROR, payload: 'Something went wrong and we couldn\'t create the piece. Please try again.'});
  }
}