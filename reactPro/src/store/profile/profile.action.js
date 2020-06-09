import {
    GET_PROFILE,
    PROFILE_LOADING,
    PROFILE_NOT_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS
    } from "store/profile/profile.types";
import axios from "axios";
import setAuthToken from 'utils/setAuthToken';


export const getCurrentProfile = () => dispatch =>{
    dispatch(setProfileLoading)
    try{
        axios.get('/api/profile')
        .then(res=>{
            dispatch({
                type:  GET_PROFILE,
                payload: res.data
            });
        }).
        catch(error=>
            dispatch({
                type: PROFILE_LOADING,
                payload: {}
            }))
    }catch{ 

    }
    finally{

    }
}
/**
 * Set Loading Profile
*/
export const setProfileLoading = ()=>{
    return{
        type:PROFILE_LOADING
    }
}

/**
 * Clear Current Profile
*/
export const clearCurrentProfile = ()=>{
    return{
        type:CLEAR_CURRENT_PROFILE
    }
}