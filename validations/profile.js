const Validator = require('validator');
const isEmpty = require('./is-empty');


const isURLValid = function(value,msg,field,errorsObject){
  if(!Validator.isURL(value)) errorsObject[field]= msg;
}

module.exports = function validateProfileInput(data) {
  let errors = {};

/**
 * When reading it from request when failed to provide
 * values for mandatory fields then we get 'null' as value
 * but when we pass that it into Validator.isEmpty()
 * It takes strings as argument
 *  */ 
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';


  /**
     * Mandatory Validations START
  */
  if(Validator.isEmpty(data.handle)){
    errors.handle = 'handle field is required';
  }
  if(Validator.isEmpty(data.status)){
    errors.status = 'status field is required';
  }
  if(Validator.isEmpty(data.skills)){
    errors.skills = 'skills field is required';
  }

  /**
     * Mandatory Validations END
  */

  /**
     * Field Validations Lengths START
  */
  if(!Validator.isLength(data.handle,{min:2,max:40})){
    errors.handle = 'handle must be between 2 to 30 characters';
  }
  /**
     * Field Validations Lengths END
  */

  /**
     * Field Validations URL START
  */
    if(!isEmpty(data.website)) isURLValid(data.website,'Not a valid URL','website',errors)
    if(!isEmpty(data.youtube)) isURLValid(data.youtube,'Not a valid URL','youtube',errors)
    if(!isEmpty(data.twitter)) isURLValid(data.twitter,'Not a valid URL','twitter',errors)
    if(!isEmpty(data.facebook)) isURLValid(data.facebook,'Not a valid URL','facebook',errors)
    if(!isEmpty(data.linkedin)) isURLValid(data.linkedin,'Not a valid URL','linkedin',errors)
    if(!isEmpty(data.instagram)) isURLValid(data.instagram,'Not a valid URL','instagram',errors)
 /**
     * Field Validations URL END
  */
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
