import React from 'react';
import { UsergroupDeleteOutlined, FacebookOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Input from 'common/FormFields/Input/Input';

const SignUp = ({ loginFormValues, handleOnchange, handleSingUpSubmit }) => {
  return (
    <form action="" className="signing-form sign-up-form">
      <h2 className="signin-title">Sing Up</h2>
      <Input
        placeholder="Username"
        setIconClassName={'input-field-icon'}
        isIconRequired
        field={'username'}
        inputSetClassName="input-field-element"
        onChange={handleOnchange}
        type={'text'}
        value={('username' in loginFormValues && loginFormValues['username']) || ''}
      />
      <Input
        placeholder="Name"
        setIconClassName={'input-field-icon'}
        isIconRequired
        field={'name'}
        inputSetClassName="input-field-element"
        onChange={handleOnchange}
        type={'text'}
        value={('name' in loginFormValues && loginFormValues['name']) || ''}
      />
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
      <Input
        placeholder="Confirm Password"
        setIconClassName={'input-field-icon'}
        isIconRequired
        field={'password2'}
        inputSetClassName="input-field-element"
        onChange={handleOnchange}
        type={'password'}
        iconName={'password'}
        value={
          ('password2' in loginFormValues && loginFormValues['password2']) || ''
        }
      />
      <input
        type="submit"
        value="Login"
        className="input-field-btn solid"
        onClick={handleSingUpSubmit}
      />
      {/* <p className="social-text">Or Sign with social platforms</p>
      <div className="social-media">
        <a href="#" className="social-icon">
          <FacebookOutlined className="social-icon-fb" />
        </a>
      </div> */}
    </form>
  );
};

export default SignUp;
