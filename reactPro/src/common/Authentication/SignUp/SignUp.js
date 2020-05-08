import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitLogin } from "store/auth/action";
// import "./SingUp.scss";

import Input from 'common/Authentication/Form/Input/Input'

const SingUp = (props) => {
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

  const [formData, setFormData] = useState({})

  let formObject = [
      {
        type:'text',
        name:'name',
        placeholder:'Enter name',
        label:'Name',
        regex:'',
       required:true
      },
      {
        type:'text',
        name:'email',
        placeholder:'Enter Email',
        label:'Email',
        regex:'',
        required:true
      },
      {
        type:'password',
        name:'password',
        placeholder:'Enter password',
        label:'password',
        regex:'',
        required:true
      },
      {
        type:'password2',
        name:'email',
        placeholder:'Enter Confirm password',
        label:'Confirm Password',
        regex:'',
        required:true
      }
  ]

  const onChange =(value,field)=>{
        const existingForm = Object.assign({},formData);
        if(value && field){
            existingForm[field] = value;
        }
        setFormData(existingForm)
    }

  return (
    <div className="login-container login">
      {
          formObject.map((item,id)=>{
              const keyIn = `${id}-form`
              return (
                <Input 
                    key={keyIn}
                    onChange={onChange}
                    item={item}
                    formData={formData}
                   
              />
              )
          })
      }
      <div className="submit-btn" onClick={handleSubmit}>
        SingUp
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

SingUp.propTypes = {};

export default SingUp;
