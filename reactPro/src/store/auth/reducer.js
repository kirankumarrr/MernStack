import {
    SIGN_UP,
    LOGIN,
    LOGOUT,
    CHECKUSERLOGGEDIN,
    SET_CURRENT_USER,
    SIGN_UP_ERROR
} from 'store/types'
const initialState = {
    isLoggedIn : false,
    accessToken:null,
    isSignUpSuccess:false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, accessToken: action.payload.token };
        case SIGN_UP:
            debugger;
            console.log("action", action.payload)
            return { ...state,isSignUpSuccess:true };    
        case SIGN_UP_ERROR:
            debugger;
            console.log("action", action.payload)
            return { ...state};         
        case SET_CURRENT_USER:
            return { ...state, 
                isLoggedIn:true,
                user:action.payload };
        default:
            return state;
    }
}