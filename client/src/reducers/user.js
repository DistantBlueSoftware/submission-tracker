import { NEW_USER, USER_AUTH, LOGOUT, USER_FAVORITE_PUBLICATION, PROFILE_ERROR, AUTH_ERROR } from '../constants/actionTypes';

const INITIAL_STATE = {
  authenticated: '',
  favorites: [],
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEW_USER:
    case USER_AUTH:
      return { ...state, ...action.payload, authenticated: true, errorMessage: '' };
    case USER_FAVORITE_PUBLICATION:
      return { ...state, ...action.payload, errorMessage: '' };
    case LOGOUT:
      return {};
    case PROFILE_ERROR:
      return { ...state, errorMessage: action.payload };
    case AUTH_ERROR:
      return { ...state, authenticated: false, errorMessage: action.payload };
    default:
      return state;
  }
}
