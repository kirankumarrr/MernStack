import {
  GET_PROFILE,
  PROFILE_LOADING,
  PROFILE_NOT_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from 'store/profile/profile.types';
import axios from 'axios';
import setAuthToken from 'utils/setAuthToken';

export const getCurrentProfile = data => dispatch => {
  // dispatch(setProfileLoading)
  dispatch({
    type: GET_PROFILE,
    payload: data
  });
};
/**
 * Set Loading Profile
 */
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

/**
 * Clear Current Profile
 */
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
