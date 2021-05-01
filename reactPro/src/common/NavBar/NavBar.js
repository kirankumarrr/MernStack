import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { signOut, setCurrentUser } from 'store/auth/action';
import { useSelector, useDispatch } from 'react-redux';
import {
  HomeTwoTone,
  LoginOutlined,
  LogoutOutlined,
  IdcardOutlined,
  UsergroupDeleteOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';

import './NavBar.scss';

const NavBar = props => {
  const [mbNav, setmbNav] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useSelector(state => state.auth);
  const signOutBtn = () => {
    dispatch(signOut());
    history.push('/signIn');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        <span className="link-text logo-text">FlyHigh</span>
        {/* <HomeTwoTone /> */}
      </Link>
      <UnorderedListOutlined
        className="navbar-hamberge"
        onClick={() => setmbNav(r => !r)}
      />
      <ul className={`nav ${mbNav ? 'mb' : ''}`}>
        <li className="nav-item">
          <Link to="/signUp" className="nav-link">
            <UsergroupDeleteOutlined />
            <span className="link-text">Developers</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signUp" className="nav-link">
            <IdcardOutlined />
            <span className="link-text">Sign Up</span>
          </Link>
        </li>

        {isLoggedIn ? (
          <li className="nav-item">
            <div className="nav-link" onClick={signOutBtn}>
              <LogoutOutlined />
              <span className="link-text">Sign Out</span>
            </div>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/signIn" className="nav-link">
              <LoginOutlined />
              <span className="link-text">Sign In</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

NavBar.propTypes = {};

export default NavBar;
