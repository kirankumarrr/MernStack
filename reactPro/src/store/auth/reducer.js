import {
    SIGNUP,
    LOGIN,
    LOGOUT
} from 'store/types'
const initialState = {
    isLoggedIn : false,
    accessToken:null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, accessToken: action.payload.token };
        default:
            return state;
    }
}