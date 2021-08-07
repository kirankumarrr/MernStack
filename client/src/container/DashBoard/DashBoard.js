import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentProfile,
  clearCurrentProfile
} from 'store/profile/profile.action';
import { fetchProfile } from 'API/Profile';
import './DashBoard.scss';

const DashBoard = props => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);
  // console.log('profile', profile);

  const getProfile = () => {
    // dispatch(setProfileLoading)
    fetchProfile()
      .then(res => {
        dispatch(getCurrentProfile(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    // dispatch(setProfileLoading)
  };

  useEffect(() => {
    // getProfile();
    return () => {
      dispatch(clearCurrentProfile());
    };
  }, []);

  if (profile) {
    if (Object.keys(profile).length) {
      return (
        <div className="jumbotron">
          <h1 className="display-4">DashBoard</h1>

          <p className="lead">Welcome {user.name}</p>
          <hr className="my-4" />
          <p>You have not created your profile yet, please add some info</p>
          <a className="btn btn-primary btn-lg" href="#" role="button">
            Learn more
          </a>
        </div>
      );
    }
  } else if (!(profile && loading)) {
    return (
      <div className="jumbotron">
        <h1 className="display-4">DashBoard</h1>

        <p className="lead">Welcome {user.name}</p>
        <hr className="my-4" />
        <p>You have not created your profile yet, please add some info</p>
        <a className="btn btn-primary btn-lg" href="#" role="button">
          Learn more
        </a>
      </div>
    );
  } else {
    return <div> Loading...</div>;
  }
};

DashBoard.propTypes = {};

export default DashBoard;
