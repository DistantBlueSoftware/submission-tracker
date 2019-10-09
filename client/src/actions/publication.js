import axios from 'axios';
import { GET_PUBLICATIONS, NEW_PUBLICATION, UPDATE_PUBLICATION, OPEN_PUBLICATION, PUBLICATION_ERROR } from '../constants/actionTypes';
import { push } from 'connected-react-router';

export const getPublications = () => async dispatch => {
    try {
      const response = await axios.get(`/api/publications`);
      const data = response.length ? response : response.data;
      dispatch ({ type: GET_PUBLICATIONS, payload: data });
    } catch (e) {
      console.log(e)
      dispatch({ type: PUBLICATION_ERROR, payload: 'Sorry, we couldn\t complete this request right now. Please try again.'});
    }
}

export const findPublication = (slug, callback) => async dispatch => {
    try {
      const response = await axios.get(`/api/publications/${slug}`);
      const data = response.length ? response : response.data;
      dispatch ({ type: OPEN_PUBLICATION, payload: data });
      callback && callback();
    } catch (e) {
      console.log(e)
      dispatch({ type: PUBLICATION_ERROR, payload: 'Sorry, we couldn\t complete this request right now. Please try again.'});
    }
}

export const openPublication = pub => async dispatch => {
  try {
    const param = pub._id ? pub._id : pub.slug;
    const response = await axios.get(`/api/publications/${param}`);
    const data = response.length ? response : response.data;
    dispatch ({ type: OPEN_PUBLICATION, payload: data });
    dispatch(push(`/publications/${pub.slug}`))
  } catch (e) {
    dispatch({ type: PUBLICATION_ERROR, payload: 'Something went wrong and we couldn\'t open the publication. Please try again.'});
  }
}

export const newPublication = (pub, callback) => async dispatch => {
  try {
    const response = await axios.post(`/api/publications`, pub);
    const data = response.length ? response : response.data;
    dispatch ({ type: NEW_PUBLICATION, payload: data });
    dispatch(push(`/publications/${data.slug}`));
    callback();
  } catch (e) {
    dispatch({ type: PUBLICATION_ERROR, payload: 'Something went wrong and we couldn\'t create the publication. Please try again.'});
  }
}

export const updatePublication = (pub, callback) => async dispatch => {
  try {
    const id = pub._id || pub.slug;
    const response = await axios.put(`/api/publications/${id}`, pub);
    const data = response.length ? response : response.data;
    dispatch ({ type: UPDATE_PUBLICATION, payload: data });
    callback();
  } catch (e) {
    dispatch({ type: PUBLICATION_ERROR, payload: 'Something went wrong and we couldn\'t update the publication. Please try again.'});
  }
}
