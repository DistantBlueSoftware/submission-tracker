import axios from 'axios';
import { PROCESS_PAYMENT, USER_AUTH, LOGOUT, USER_FAVORITE_PUBLICATION, PROFILE_ERROR, AUTH_ERROR } from '../constants/actionTypes';

export const processPayment = (token, user, amount, callback) => async dispatch => {
  try {
    const response = await axios.post(
      `/api/save-stripe-token`, {
      token,
      amount,
      user: user.username
    }
    );
    dispatch({ type: PROCESS_PAYMENT, payload: response.data });
    callback();
  } catch (e) {
    const error = e.response && e.response.data ? e.response.data.error : 'Sorry, an error occurred and your payment could not be processed.';
    alert(error);
    dispatch({ type: PROFILE_ERROR, payload: error});
  }
}

export const doRegister = (user, callback) => async dispatch => {
  try {
  const response = await axios.post(
    `/api/register`,
    user
  );
  dispatch({ type: USER_AUTH, payload: response.data });
  localStorage.setItem('token', response.data.token);
  callback();
} catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
}


export const doLogin = (user, callback) => async dispatch => {
  try {
    const response = await axios.post(
      `/api/login`,
      user
    );
    dispatch({ type: USER_AUTH, payload: response.data });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
  dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials.' });
}
}

export const addToUserPubs = (user, pub) => async dispatch => {
  try {
    const response = await axios.put(
      `/api/${user.username}/favorites`,
      pub
    );
    dispatch({ type: USER_FAVORITE_PUBLICATION, payload: response.data });
  } catch (e) {
    dispatch({ type: PROFILE_ERROR, payload: 'Could not add publication to favorites at this time, sorry.'});
  }
}

export const doLogout = callback => {
  localStorage.removeItem('token');
  callback();
  return {
    type: LOGOUT,
    payload: ''
  }
}
