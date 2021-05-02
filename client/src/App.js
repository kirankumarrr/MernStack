import React from 'react';
import { getCookieValue } from 'utils/cookies';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signOut, setCurrentUser } from 'store/auth/action';
import { clearCurrentProfile } from 'store/profile/profile.action';
import jwt_decode from 'jwt-decode';
import setAuthToken from 'utils/setAuthToken';
import PrivateRoute from 'HOC/PrivateRoute';
import './App.scss';
import HomePage from 'container/HomePage/HomePage';
import Login from 'common/Authentication/Login';
import SingUp from 'common/Authentication/SignUp/SignUp';
import NavBar from 'common/NavBar/NavBar';
import DashBoard from 'container/DashBoard/DashBoard';
import AuthenticationPage from 'container/AuthenticationPage/AuthenticationPage';
import { Footer } from 'common/Footer/Footer';
const App = () => {
  const dispatch = useDispatch();
  //TODO : check for Cookies

  if (document.cookie.indexOf('jwtToken=') !== -1) {
    // if cookies exist set them to axios token
    setAuthToken(getCookieValue('jwtToken'));
    // decode token
    const decoded = jwt_decode(getCookieValue('jwtToken'));
    // dispatch action using decoded token
    dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      dispatch(signOut());
      //Clear Profile
      dispatch(clearCurrentProfile());
      // Redirect to login
      window.location.href = '/auth';
    }
  }

  return (
    <div className="app-container">
      <NavBar />
      <main>
        {/* <Route exact path="/"  component={HomePage} /> */}
        {/* 
          <Route exact path="/signup" component={SingUp} />
          <Route exact path="/signin" component={Login} /> */}
        <PrivateRoute exact path="/" component={DashBoard} />
        <Route exact path="/auth" component={AuthenticationPage} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
