import axios from 'axios';
import { USER_AUTH, LOGOUT, AUTH_ERROR } from '../constants/actionTypes';

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
    dispatch ({ type: USER_AUTH, payload: response.data });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
  dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
}
}

export const doLogout = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT,
    payload: ''
  }
}
