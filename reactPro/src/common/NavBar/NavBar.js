import React from 'react'
import PropTypes from 'prop-types'
import {Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {signOut, setCurrentUser } from 'store/auth/action'
import { useSelector, useDispatch } from 'react-redux';
import { 
  HomeTwoTone,
  LoginOutlined,
  LogoutOutlined,
  DatabaseTwoTone

}  from '@ant-design/icons';

import './NavBar.scss'
const NavBar = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {  isLoggedIn } = useSelector(state=>state.auth);
    const signOutBtn = ()=>{
      dispatch(signOut())
      history.push('/signIn')
    }

    return (
        <nav className="navbar-container">
        <ul className="navbar-nav">
          <li className="logo">
            <Link to="/" className="nav-link" >
              <span className="link-text logo-text">FlyHigh</span>
              <HomeTwoTone />
            </Link>
          </li>
          <li className="nav-item last" id="sing-up">
            <Link to="/signUp" className="nav-link" >
             <DatabaseTwoTone />
              <span className="link-text">Sign Up</span>
            </Link>
          </li>
          <li className="nav-item last" id="sing-in">
             <Link to="/signIn" className="nav-link" >
            <LoginOutlined />
              <span className="link-text">Sign In</span>
              </Link>
          </li>
          {
            isLoggedIn &&  <li className="nav-item last" id="sing-out">
            <div  className="nav-link" onClick={signOutBtn} >
              <LogoutOutlined />
              <span className="link-text">Sign Out</span>
            </div>
          </li> 
          }
         
        </ul>
      </nav>
    )
}

NavBar.propTypes = {

}

export default NavBar
