import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { UsergroupDeleteOutlined, FacebookOutlined } from '@ant-design/icons';

// import Input from 'common/FormFields/Input/Input';
import { submitLogin, signUp } from 'store/auth/action';

import './AuthenticationPage.scss';
import './CSSMedia/AuthMedia470PX.scss';
import './CSSMedia/AuthMedia570PX.scss';
import './CSSMedia/AuthMedia870PX.scss';
import SignIn from 'container/AuthenticationPage/SignIn/SignIn';
import SignUp from 'container/AuthenticationPage/SignUp/SignUp';

class AuthenticationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUpMode: false,
      loginFormValues: {}
    };
    // this.singInRef = this.singInRef.bind(this);
  }

  handleOnchange = e => {
    const loginFormValues = Object.assign({}, this.state.loginFormValues);
    loginFormValues[e.target.name] = e.target.value;
    this.setState({
      loginFormValues
    });
  };

  handleLoginSubmit = e => {
    e.preventDefault();
    const { submitLogin, history } = this.props;
    const { loginFormValues } = this.state;
    submitLogin(loginFormValues, history);
  };

  handleSingUpSubmit = e => {
    e.preventDefault();
    const { signUp, history } = this.props;
    const { loginFormValues } = this.state;
    signUp(loginFormValues, history);
    this.setState({
      isSignUpMode: false
    });
  };

  render() {
    const { isSignUpMode, loginFormValues } = this.state;
    return (
      <div
        className={`authentication-container ${
          isSignUpMode ? 'sign-up-mode' : ''
        }`}
      >
        <div className="forms-container">
          <div className="signin-signup">
            <SignIn
              loginFormValues={loginFormValues}
              handleLoginSubmit={this.handleLoginSubmit}
              handleOnchange={this.handleOnchange}
              // signInRef={this.signInRef}
            />
            <SignUp
              loginFormValues={loginFormValues}
              handleOnchange={this.handleOnchange}
              handleSingUpSubmit={this.handleSingUpSubmit}
            />
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New Here ? </h3>
              <p className="panel-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                nisl eros,
              </p>
              <button
                className="btn transparent"
                onClick={() => {
                  this.setState({
                    isSignUpMode: true,
                    loginFormValues: {}
                  });
                }}
                id="sign-up-btn"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us? </h3>
              <p className="panel-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                nisl eros,
              </p>
              <button
                className="btn transparent"
                onClick={() => {
                  this.setState({
                    isSignUpMode: false,
                    loginFormValues: {}
                  });
                }}
                id="sign-in-btn"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  contacts: state
});

export default connect(mapStateToProps, { submitLogin, signUp })(
  AuthenticationPage
);
