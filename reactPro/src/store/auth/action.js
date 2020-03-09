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

// export const login = (product, productPrice) => async dispatch => {
//     dispatch({
//         type: ADDTOCART,
//         payload: {
//             product,
//             productPrice
//         }
//     });
// };

// export const logout = (product) => async dispatch => {
//     dispatch({
//         type: ADDTOWISHLIST,
//         payload: product
//     });
// };