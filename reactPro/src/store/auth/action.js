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
    SIGN_UP_ERROR
} from 'store/types'
import axios from "axios";
import setAuthToken from 'utils/setAuthToken';

import jwt_decode from 'jwt-decode';

export const submitLogin = (user,history) => async dispatch => {
    const res = await axios.post(`api/users/login`, user
    ).then(response => {
        // debugger;
        var dt = new Date()
        var setTime = dt.setSeconds( dt.getSeconds() + 1000 );
        //dt.setSeconds( dt.getSeconds() + 10 );
        console.log('TIME',new Date(setTime).toUTCString())
        document.cookie =`jwtToken=${response.data.token}; expires= ${new Date(setTime).toUTCString()}`
        localStorage.setItem('reactProIsLoggedIn',response.data.token);
      
        //Set token to header
        setAuthToken(response.data.token);
        // Decode token to get user
        const decode= jwt_decode(response.data.token);
        console.log('decode',decode)
        dispatch(setCurrentUser(decode));
        history.push('./');
        return response.data
    }).catch(error => error);
   
    dispatch({
        type: LOGIN,
        payload: res
    });
};

export const setCurrentUser = (decoded) => async dispatch => {
    // debugger
    dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
    });
};

export const signUp = (data) => async dispatch => {
    const res = await axios.post(`api/users/register`, data)
        .then(response =>{
            dispatch({
                type: SIGN_UP,
                payload:response
            });
        })
        .catch(error => {
            dispatch({
                type: SIGN_UP_ERROR,
                payload: error
            });
        });
};