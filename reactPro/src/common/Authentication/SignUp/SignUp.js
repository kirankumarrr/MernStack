import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "store/auth/action";
import Input from 'common/Authentication/Form/Input/Input'
import "./SignUp.scss";

const SingUp = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({})

  const handleSubmit = () => {
    debugger;
    dispatch(signUp(formData));
  };

  const { isSignUpSuccess } = useSelector(state=>state.auth);

  useEffect(() => {
    console.log("isSignUpSuccess",isSignUpSuccess)
  }, [isSignUpSuccess])

  let formObject = [
      {
        type:'text',
        name:'name',
        placeholder:'Enter name',
        label:'Name',
        regex:'',
        validations:[{
          task:"required",
          errorMessage:"Name field is required",  
        }],
        errors:[]
      },
      {
        type:'text',
        name:'email',
        placeholder:'Enter Email',
        label:'Email',
        regex:'',
        validations:[
          {
            task:"email",
            errorMessage:"email is invalid",
          },
          {
          task:"required",
          errorMessage:"Email field is required" 
        }
        ],
        errors:[]
      },
      {
        type:'password',
        name:'password',
        placeholder:'Enter password',
        label:'Password',
        regex:'',
        validations:[{
          task:"required",
          errorMessage:"Password field is required",
        }],
        errors:[]
      },
      {
        type:'password',
        name:'password2',
        placeholder:'Enter Confirm password',
        label:'Confirm Password',
        regex:'',
        validations:[{
          task:"required",
          errorMessage:"Confirm Password field is required",
        }]
      }
  ]

  const onChange =({value,field,errorMessage})=>{
        const existingForm = Object.assign({},formData);
        const existingErrors = Object.assign({},formErrors);
        existingForm[field] = value;
        existingErrors[field]= errorMessage
        console.log("existingErrors",existingErrors)
        setFormErrors(existingErrors)
        setFormData(existingForm)
    }
    console.log("Object.values(formErrors)",Object.values(formErrors))
    const isFormValid = (Object.values(formErrors).length>0 
                        && Object.values(formErrors).filter(err=>{
                          console.log("isFormValid err",!!err,"0>",err)
                            return !!err
                        })) || null;
                        console.log("isFormValid",isFormValid)             
                        
  return (
    <div className="signUp-container">
      <form className="sing-up" autocomplete="off">
        {
            formObject.map((item,id)=>{
                const keyIn = `${id}-form`
                return (
                  <Input 
                      key={keyIn}
                      onChange={onChange}
                      item={item}
                      formData={formData}
                      formError={formErrors[item.name]}
                />
                )
            })
        }
        <div className={`submit-btn ${isFormValid===null || isFormValid.length!==0  ? 'disabled': ''}`}
           onClick={ isFormValid!==null && isFormValid.length===0 ? handleSubmit: null}>
          Sign Up
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </form>
    </div>
    
  );
};

SingUp.propTypes = {};

export default SingUp;
