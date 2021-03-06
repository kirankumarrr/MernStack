import React from 'react';
import { UsergroupDeleteOutlined, FacebookOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Input from 'common/FormFields/Input/Input';
const SignIn = ({ loginFormValues, handleLoginSubmit, handleOnchange }) => {
  return (
    <form action="" className="signing-form sign-in-form">
      <h2 className="signin-title">Sign in</h2>
      <Input
        placeholder="Email"
        setIconClassName={'input-field-icon'}
        isIconRequired
        field={'email'}
        inputSetClassName="input-field-element"
        onChange={handleOnchange}
        type={'text'}
        iconName={'email'}
        value={('email' in loginFormValues && loginFormValues['email']) || ''}
      />
      <Input
        placeholder="Password"
        setIconClassName={'input-field-icon'}
        isIconRequired
        field={'password'}
        inputSetClassName="input-field-element"
        onChange={handleOnchange}
        type={'password'}
        iconName={'password'}
        value={
          ('password' in loginFormValues && loginFormValues['password']) || ''
        }
      />
      <input
        type="submit"
        onClick={handleLoginSubmit}
        value="Login"
        className="input-field-btn solid"
      />
      <p className="social-text">Or Sign with social platforms</p>
      <div className="social-media">
        <a href="#" className="social-icon">
          <FacebookOutlined className="social-icon-fb" />
        </a>
      </div>
    </form>
  );
};

export default SignIn;
