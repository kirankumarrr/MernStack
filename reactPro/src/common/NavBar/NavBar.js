import React from 'react'
import PropTypes from 'prop-types'
import {Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { 
  HomeTwoTone,
  LoginOutlined,
  LogoutOutlined,
  DatabaseTwoTone

}  from '@ant-design/icons';

import './NavBar.scss'
const NavBar = props => {
  const history = useHistory();
    const signOut = ()=>{
      document.cookie =`jwtToken=; expires= ${new Date().toUTCString()}`
      history.push('/signIn')
    }

    return (
        <nav class="navbar-container">
        <ul class="navbar-nav">
          <li class="logo">
            <Link to="/" class="nav-link" >
              <span class="link-text logo-text">FlyHigh</span>
              <HomeTwoTone />
            </Link>
          </li>
          <li class="nav-item last" id="sing-up">
            <Link to="/signUp" class="nav-link" >
             <DatabaseTwoTone />
              <span class="link-text">Sign Up</span>
            </Link>
          </li>
          <li class="nav-item last" id="sing-in">
             <Link to="/signIn" class="nav-link" >
            <LoginOutlined />
              <span class="link-text">Sign In</span>
              </Link>
          </li>
          <li class="nav-item last" id="sing-out">
            <div  class="nav-link" onClick={signOut} >
              <LogoutOutlined />
              <span class="link-text">Sign Out</span>
            </div>
          </li>
        </ul>
      </nav>
    )
}

NavBar.propTypes = {

}

export default NavBar
