const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

const keys = require('../../config/keys');

//Load User Model
const User = require('../../models/User');
const { protect } = require('../../middlewares/auth');
const {
  createCards,
  fetchCards,
  updateCards,
  dynamiCards,
  getDynamiCards,
  updateDynamicCards
} = require('../controllers/Reminders/Cards');
//Protecting all below routes
// router.use(protect);
router.route('/cards').post(createCards);
router.route('/cards').get(fetchCards);
router.route('/cards/:id').put(updateCards);
router.route('/dynamic').post(dynamiCards);
router.route('/dynamic/:year/:month').put(updateDynamicCards);
router.route('/dynamic/:year/:month').get(getDynamiCards);

module.exports = router;
