const Validator = require('validator');
const checkIsEmpty =  require('.././is-empty');

module.exports = function validateExperienceInput(data){
    let errors = {};

    data.title = !checkIsEmpty(data.title) ? data.title : '';
    data.company = !checkIsEmpty(data.company) ? data.company : '';
    data.from = !checkIsEmpty(data.from) ? data.from : '';

    
    if(Validator.isEmpty(data.title)){
        errors.title = 'Job title field is required';
    }
    if(Validator.isEmpty(data.company)){
        errors.company = 'Company field is required';
    }
    if(Validator.isEmpty(data.from)){
        errors.from = 'From date field is required';
    }

    return {
        errors,
        isValid : checkIsEmpty(errors)
    }
}