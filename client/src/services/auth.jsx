import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import Api from './api';

import { call } from '../helpers';

import { GET_ERRORS, SET_CURRENT_USER } from '../helpers/constant/types';

export const login = (userData, onSuccess) => (dispatch) => {
  Api.post('auth/login', userData)
    .then((user) => {
      if (user.body.success) {
        const { token } = user.body.data;
        Cookies.set('chat-token', token);
        const object = { token: token, timestamp: new Date().getTime() };
        localStorage.setItem('chat-token', JSON.stringify(object));
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded));
        call(onSuccess);
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { message: user.body.error.message, isError: true },
        });
        throw new Error(JSON.stringify(user.body.error));
      }
    })
    .catch((error) => {
      console.trace(error.message);
      const message = error.message;
      dispatch({
        type: GET_ERRORS,
        payload: { message, isError: true },
      });
    });
};

export const setLoginError = () => (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: { isError: false },
  });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logout = (callback) => async (dispatch) => {
  await localStorage.removeItem('chat-token');
  await Cookies.remove('token');

  dispatch(setCurrentUser({}));

  callback();
};
