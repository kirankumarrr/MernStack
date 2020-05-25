import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "store/auth/action";
import Input from "common/Authentication/Form/Input/Input";
import "./SignUp.scss";

const SingUp = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = () => {
    dispatch(signUp(formData, history));
  };

  const { errors } = useSelector((state) => state.auth);

  useEffect(() => {
    const updatebackEndErrors = { ...Object.assign({}, formErrors), ...errors };
    setFormErrors(updatebackEndErrors);
  }, [errors]);

  let formObject = [
    {
      type: "text",
      name: "name",
      placeholder: "Enter name",
      label: "Name",
      regex: "",
      validations: [
        {
          task: "required",
          errorMessage: "Name field is required",
        },
      ],
      errors: [],
    },
    {
      type: "text",
      name: "email",
      placeholder: "Enter Email",
      label: "Email",
      regex: "",
      validations: [
        {
          task: "email",
          errorMessage: "email is invalid",
        },
        {
          task: "required",
          errorMessage: "Email field is required",
        },
      ],
      errors: [],
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter password",
      label: "Password",
      regex: "",
      validations: [
        {
          task: "required",
          errorMessage: "Password field is required",
        },
      ],
      errors: [],
    },
    {
      type: "password",
      name: "password2",
      placeholder: "Enter Confirm password",
      label: "Confirm Password",
      regex: "",
      validations: [
        {
          task: "required",
          errorMessage: "Confirm Password field is required",
        },
      ],
    },
  ];

  const onChange = ({ value, field, errorMessage }) => {
    const existingForm = Object.assign({}, formData);
    const existingErrors = Object.assign({}, formErrors);
    existingForm[field] = value;
    existingErrors[field] = errorMessage;
    setFormErrors(existingErrors);
    setFormData(existingForm);
  };
  const isFormValid =
    (Object.values(formErrors).length > 0 &&
      Object.values(formErrors).filter((err) => {
        return !!err;
      })) ||
    null;
    const responseGoogle = (response) => {
      var res = response.profileObj;
    }
  return (
    <div className="signUp-container">
        <GoogleLogin
        clientId="626280353795-e1oaum5mquenergt2llme8pv2r70popk.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle} >

        </GoogleLogin>
      <form className="sing-up" autoComplete="off">
        {formObject.map((item, id) => {
          const keyIn = `${id}-form`;
          return (
            <Input
              key={keyIn}
              onChange={onChange}
              item={item}
              formData={formData}
              formError={formErrors[item.name]}
            />
          );
        })}
        <div
          className={`submit-btn ${
            isFormValid === null || isFormValid.length !== 0 ? "disabled" : ""
          }`}
          onClick={
            isFormValid !== null && isFormValid.length === 0
              ? handleSubmit
              : null
          }
        >
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
