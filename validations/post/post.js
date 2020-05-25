const Validator = require('validator');
const checkIsEmpty =  require('../is-empty');

module.exports = function validatePostInput(data){
    let errors = {};

    data.text = !checkIsEmpty(data.text) ? data.text : '';

    if(!Validator.isLength(data.text,{min:10,max:300})){
        errors.text = 'Post must be between 10 and 300 characters';
    }

    //Check Text
    if(Validator.isEmpty(data.text)){
        errors.text = 'Text field is required';
    }
     

    return {
        errors,
        isValid : checkIsEmpty(errors)
    }
}