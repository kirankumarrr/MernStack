import React, { Component } from 'react'
import './AuthenticationPage.scss'
import {
  UsergroupDeleteOutlined,
  FacebookOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import Input from 'common/FormFields/Input/Input'
import { submitLogin } from "store/auth/action";
class AuthenticationPage extends Component {
  constructor(props){
    super(props)
    this.state={
      isSignUpMode:false,
      loginFormValues:{}
    }
  }

  handleOnchange=(e)=>{
    const loginFormValues = Object.assign({},this.state.loginFormValues)
    loginFormValues[e.target.name]=e.target.value
    this.setState({
      loginFormValues
    })
  }

  handleLoginSubmit=(e)=>{
    debugger
    e.preventDefault()
    const { submitLogin,history } = this.props;
    const { loginFormValues } =this.state;
    submitLogin(loginFormValues,history)
  }
  render() {
    const { isSignUpMode,loginFormValues }= this.state;
    return (
      <div className={`authentication-container ${isSignUpMode? 'sign-up-mode' : ''}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action='' className="signing-form sign-in-form">
              <h2 className="signin-title">Sing in</h2>
              <Input placeholder="Email"  
                setIconClassName={'input-field-icon'}
                isIconRequired
                field={'email'}                           inputSetClassName="input-field-element"
                onChange={this.handleOnchange}
                type={'text'}
                value={('email' in loginFormValues && loginFormValues['email']) || ''}
              />
              <Input placeholder="Password"  
                setIconClassName={'input-field-icon'}
                isIconRequired
                field={'password'}                           inputSetClassName="input-field-element"
                onChange={this.handleOnchange}
                type={'password'}
                value={('password' in loginFormValues && loginFormValues['password']) || ''}
              />
              <input type='submit' 
                onClick={this.handleLoginSubmit}
                value='Login' 
                className="input-field-btn solid"
              />
              <p className="social-text">
                Or Sign with social platforms
            </p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <FacebookOutlined className="social-icon-fb" />

                </a>
              </div>
            </form>
            <form action='' className="signing-form sign-up-form">
              <h2 className="signin-title">Sing Up</h2>
              <div className="input-field">
                <UsergroupDeleteOutlined className="input-field-icon" />
                <input type='text' placeholder="Username" className="input-field-element" />
              </div>
              <input type='submit' value='Login' 
                  className="input-field-btn solid" 
                 
              />
              <p className="social-text">
                Or Sign with social platforms
            </p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <FacebookOutlined className="social-icon-fb" />

                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="panels-container">
           <div className="panel left-panel">
              <div className="content">
                <h3>New Here ? </h3>
                <p className="panel-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
              </p>
              <button className="btn transparent" 
               onClick={()=>{
                this.setState({
                  isSignUpMode:true
                })
              }}
              id="sign-up-btn">Sign Up</button>
              </div>
            </div>
           <div className="panel right-panel">
              <div className="content">
                <h3>One of us? </h3>
                <p className="panel-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
              </p>
              <button className="btn transparent" 
               onClick={()=>{
                this.setState({
                  isSignUpMode: false
                })
              }}
              id="sign-in-btn">Sign In</button>
              </div>
            </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  contacts: state
});

export default connect(
  mapStateToProps,
  { submitLogin }
)(AuthenticationPage);