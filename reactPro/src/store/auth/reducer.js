import {
    SIGNUP,
    LOGIN,
    LOGOUT,
    CHECKUSERLOGGEDIN,
    SET_CURRENT_USER
} from 'store/types'
const initialState = {
    isLoggedIn : false,
    accessToken:null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, accessToken: action.payload.token };
        case SET_CURRENT_USER:
            return { ...state, 
                isLoggedIn:true,
                user:action.payload };
        default:
            return state;
    }
}