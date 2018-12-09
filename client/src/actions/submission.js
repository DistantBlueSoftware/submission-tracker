import axios from 'axios';
import { GET_SUBMISSIONS, NEW_SUBMISSION, UPDATE_SUBMISSION, OPEN_SUBMISSION, SUBMISSION_ERROR } from '../constants/actionTypes';

export const getSubmissions = () => async dispatch => {
    try {
      const response = await axios.get(`/api/submissions`);
      const data = response.length ? response : response.data;
      dispatch ({ type: GET_SUBMISSIONS, payload: data });
    } catch (e) {
      dispatch({ type: SUBMISSION_ERROR, payload: 'Sorry, we couldn\t complete this request right now. Please try again.'})
    }
}

export const openSubmission = (id, callback) => async dispatch => {
  try {
    const response = await axios.get(`/api/submissions/${id}`);
    const data = response.length ? response : response.data;
    dispatch({ type: OPEN_SUBMISSION, payload: data});
    callback(data);
  } catch (e) {
    dispatch({ type: SUBMISSION_ERROR, payload: 'something went wrong opening this submission.'})
  }
}

export const newSubmission = (sub, callback) => async dispatch => {
    try {
      const response = await axios.post(`/api/submissions`, sub);
      const data = response.length ? response : response.data;
      dispatch ({ type: NEW_SUBMISSION, payload: data });
      callback();
    } catch (e) {
      dispatch({ type: SUBMISSION_ERROR, payload: 'Sorry, we couldn\t complete this request right now. Please try again.'})
    }
}

export const updateSubmission = (sub, callback) => async dispatch => {
    try {
      const response = await axios.put(`/api/submissions/${sub._id}`, sub);
      const data = response.length ? response : response.data;
      dispatch ({ type: UPDATE_SUBMISSION, payload: data });
      callback();
    } catch (e) {
      dispatch({ type: SUBMISSION_ERROR, payload: 'Sorry, we couldn\t complete this request right now. Please try again.'})
    }
}
