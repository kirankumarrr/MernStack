const Validator = require('validator');
const checkIsEmpty =  require('.././is-empty');

module.exports = function validateEducationInput(data){
    let errors = {};

    data.school = !checkIsEmpty(data.school) ? data.school : '';
    data.degree = !checkIsEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !checkIsEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !checkIsEmpty(data.from) ? data.from : '';
    
    if(Validator.isEmpty(data.school)){
        errors.school = 'School field is required';
    }
    if(Validator.isEmpty(data.degree)){
        errors.degree = 'Degree field is required';
    }
    if(Validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy = 'Fieldofstudy  field is required';
    }
    if(Validator.isEmpty(data.from)){
        errors.from = 'From date field is required';
    }
    return {
        errors,
        isValid : checkIsEmpty(errors)
    }
}