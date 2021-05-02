//TODO : Create methods for Auth
/**
 * SingUP
 * Login
 * Logout
 */

import {
  SIGN_UP,
  LOGIN,
  LOGOUT,
  CURRENTUSER,
  SET_CURRENT_USER,
  SIGN_UP_ERROR,
  GET_FORM_ERRORS
} from 'store/types';
import axios from 'axios';
import setAuthToken from 'utils/setAuthToken';

import jwt_decode from 'jwt-decode';

export const submitLogin = (user, history) => async dispatch => {
  await axios
    .post(`api/users/login`, user)
    .then(response => {
      var dt = new Date();
      var setTime = dt.setSeconds(dt.getSeconds() + 1000);
      //dt.setSeconds( dt.getSeconds() + 10 );
      // console.log('TIME',new Date(setTime).toUTCString())
      document.cookie = `jwtToken=${response.data.token}; expires= ${new Date(
        setTime
      ).toUTCString()}`;
      localStorage.setItem('reactProIsLoggedIn', response.data.token);

      //Set token to header
      setAuthToken(response.data.token);
      // Decode token to get user
      const decode = jwt_decode(response.data.token);
      // console.log('decode',decode)
      dispatch(setCurrentUser(decode));
      history.push('./');
      dispatch({
        type: LOGIN,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_FORM_ERRORS,
        payload: error && error.response && error.response.data
      });
    });
};

export const setCurrentUser = decoded => async dispatch => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
};

export const signUp = (data, history) => async dispatch => {
  await axios
    .post(`api/users/register`, data)
    .then(response => {
      // history.push('./signin');
      dispatch({
        type: GET_FORM_ERRORS,
        payload: {}
      });
    })
    .catch(error => {
      dispatch({
        type: GET_FORM_ERRORS,
        payload: error && error.response && error.response.data
      });
    });
};

export const signOut = () => dispatch => {
  /**
   * TODO
   * 1) Clean cookies
   * 2) delete token from axois header : call setAuthToken
   * 3) clear redux current user data
   */
  document.cookie = `jwtToken=; expires= ${new Date().toUTCString()}`;
  setAuthToken(null);
  dispatch(setCurrentUser({}));
};
