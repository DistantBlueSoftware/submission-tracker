import axios from 'axios';
import { USER_AUTH, LOGOUT, USER_FAVORITE_PUBLICATION, PROFILE_ERROR, AUTH_ERROR } from '../constants/actionTypes';

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
      `/api/${user.username}`,
      pub
    );
    dispatch({ type: USER_FAVORITE_PUBLICATION, payload: response.data });
  } catch (e) {
    dispatch({ type: PROFILE_ERROR, payload: 'Could not add publication to favorites at this time, sorry.'});
  }
}

export const doLogout = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT,
    payload: ''
  }
}
