//TODO : Create methods for Auth
/**
 * SingUP
 * Login
 * Logout
*/

import {
    SIGNUP,
    LOGIN,
    LOGOUT
} from 'store/types'
import axios from "axios";

export const singUp = (data) => async dispatch => {
    // dispatch({
    //     type: SHOWSPINNER,
    //     payload: true
    // });
    // const res = await axios.post(
    //     `https://api.musement.com/api/v3/venues/164/activities`
    // ).then(response => {
    //     return response.data
    // }).catch(error => error)
    dispatch({
        type: SIGNUP,
        payload: {
            "user": "kiran"
        }
    });
    // dispatch({
    //     type: HIDESPINNER,
    //     payload: false
    // });
};

export const submitLogin = (user,history) => async dispatch => {
    const res = await axios.post(`api/users/login`, user
    ).then(response => {
        localStorage.setItem('reactProIsLoggedIn',response.data.token);
        debugger
        history.push('./')
        return response.data
    }).catch(error => error);
   
    dispatch({
        type: LOGIN,
        payload: res
    });
};

// export const logout = (product) => async dispatch => {
//     dispatch({
//         type: ADDTOWISHLIST,
//         payload: product
//     });
// };