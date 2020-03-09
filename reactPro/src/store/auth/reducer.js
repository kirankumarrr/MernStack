import {
    SIGNUP,
    LOGIN,
    LOGOUT
} from 'store/types'
const initialState = {
    isLoggedIn : false
};

export default function (state = initialState, action) {
    switch (action.type) {
        // case CATALOGFETCHPRODUCTS:
        //     return { ...state, catalogPoducts: action.payload };
        default:
            return state;
    }
}