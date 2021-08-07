const Validator = require('validator');
const checkIsEmpty = require('../is-empty');

module.exports = function validateCardsInput(data) {
  let errors = {};

  data.name = !checkIsEmpty(data.name) ? data.name : '';
  // data.amount = !checkIsEmpty(data.amount) ? data.amount : '';
  data.date = !checkIsEmpty(data.date) ? data.date : '';

  /**
   * Mandatory Validations START
   */
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (checkIsEmpty(data.amount)) {
    errors.amount = 'amount field is required';
  }
  if (checkIsEmpty(data.avaiable)) {
    errors.avaiable = 'avaiable field is required';
  }
  if (Validator.isEmpty(data.date)) {
    errors.date = 'date field is required';
  }
  /**
   * Mandatory Validations END
   */

  var isoDateStringConverted = new Date(data.date);
  if (!Validator.isDate(isoDateStringConverted)) {
    errors.date = 'Date is invalid';
  }

  return {
    errors,
    isValid: checkIsEmpty(errors),
  };
};
