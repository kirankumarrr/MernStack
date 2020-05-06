import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitLogin } from "store/auth/action";
import "./Login.scss";
const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const {a} =useSelector(state=>state.dashboard)
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = () => {
    dispatch(submitLogin(user, history));
  };
  const setField = (e) => {
    const currentUser = Object.assign({}, user);
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser);
  };

  return (
    <div className="login-container login">
      <div className="input-item">
        <input
          type="text"
          name="email"
          onChange={(e) => setField(e)}
          placeholder="Enter your email"
          value={user.email}
        />
        <label htmlFor="email">Email: </label>
      </div>
      <div className="input-item">
        <input
          type="text"
          name="password"
          onChange={(e) => setField(e)}
          value={user.password}
          placeholder="Enter your poassword"
        />
        <label htmlFor="password">Password:</label>
      </div>
      <div className="submit-btn" onClick={handleSubmit}>
        SingIn
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
