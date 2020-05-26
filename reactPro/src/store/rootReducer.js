import { combineReducers } from 'redux';
import auth from "store/auth/reducer";
import profile from 'store/profile/profile.reducer'
export default combineReducers({
    auth,
    profile
});