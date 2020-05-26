import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitLogin } from "store/auth/action";
import Input from "common/Authentication/Form/Input/Input";
import "./Login.scss";
const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = () => {
    dispatch(submitLogin(formData, history));
  };

  const { errors } = useSelector((state) => state.auth);

  useEffect(() => {
    const updatebackEndErrors = { ...Object.assign({}, formErrors), ...errors };
    setFormErrors(updatebackEndErrors);
  }, [errors]);

  let formObject = [
    {
      id: 1,
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
      id: 2,
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

  return (
    <div className="signUp-container">
      <form className="sing-up" autoComplete="off">
        {formObject.map((item, id) => {
          const keyIn = `${id}-login`;
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
          Sign In
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {};

export default Login;
