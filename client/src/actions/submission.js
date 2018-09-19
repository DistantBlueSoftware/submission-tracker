import axios from 'axios';
import { GET_SUBMISSIONS, OPEN_SUBMISSION, ERROR } from '../constants/actionTypes';

export const getSubmissions = () => async dispatch => {
    try {
      const response = await axios.get(`/api/submissions`);
      const data = response.length ? response : response.data;
      dispatch ({ type: GET_SUBMISSIONS, payload: data });
    } catch (e) {
      dispatch({ type: ERROR, payload: 'Sorry, we couldn\t complete this request right now. Please try again.'})
    }
}
