// express : Route Library - router
// mogoose : DB Library
// passport : Authentication Library
/**
 *  Validation Function FOR BELOW SECTIONS:
 *  1) PROFILE
 *  2) EXPERIENCE
 *  3) EDUCATION
*/
// Profile Model for verification object strucutre
// User Model fro user object reponse structure

/**
 * //TODO : API's to Create
 * GET CURRENT USER PROFILE
 * GET ALL PROFILE : ADD user Collection details along with that
 * GET HANDLE by HANDEL :?
 * GET PROFILE by USER/:userID
 * POST PROFILE
 * POST EXPERIENCE FOR PROFILE
 * POST EDUCATION FOR PROFILE
 * DELETE EXPERICE FOR PROFILE
 * DELETE EDUCATION FOR PROFILE
 * DELTE USER AND PROFILE
 * 
*/
/**
 * Loading Dependecy Libraries
*/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');


/**
 * Loading Models
*/
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/**
 * Loading route Functions 
*/
const getProfileMethods = require('../profileRoutes/GET/getProfileMethods')
const postProfileMethods = require('../profileRoutes/POST/postProfileMethods');
const deleteProfileMethods= require('../profileRoutes/DELETE/deleteProfileMethods');
// const deleteProfileMethods = require('../profileRoutes/DELETE/deleteProfileMethods')

/**
 * TEST ROUTER
 * @route GET  
 * @desc Test profile route
 * @access Public
*/
router.get('/test',(req,res)=>{res.json({msg:'Profile Works'})});

/**
 * @route GET  
 * @desc GET CURRENT PROFILE route
 * @access Private
*/
router.get('/',passport.authenticate('jwt',{session:false}),getProfileMethods.currentProfile);


/**
 * @route GET api/profile/handle/:handle
 * @desc GET PROFILE by handle
 * @access Public
*/
router.get('/handle/:handle',getProfileMethods.currentHandle);

/**
 * @route GET api/profile/user/:user
 * @desc GET PROFILE by user
 * @access Public
*/
router.get('/user/:user_id',getProfileMethods.currentUser);


/**
 * @route GET api/profile/all
 * @desc GET all profiles
 * @access Public
*/
router.get('/all',getProfileMethods.currentProfiles);


/**
 * @route POST  
 * @desc Create User Profile
 * @access Private
*/
router.post('/',passport.authenticate('jwt',{session:false}),postProfileMethods.createUserProfile);

/**
 * @route POST api/profile/experience
 * @desc  ADD experience to profile
 * @access Private
*/
router.post('/experience',passport.authenticate('jwt',{session:false}),postProfileMethods.createExpericenProfile);

/**
 * @route POST api/profile/education
 * @desc  ADD education to profile
 * @access Private
*/
router.post('/education',passport.authenticate('jwt',{session:false}),postProfileMethods.createEducationProfile);


/**
 * @route DELETE api/profile/experience/:exp_id
 * @desc  delete experience from profile
 * @access Private
*/
router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),deleteProfileMethods.deleteExperienceProfile);

/**
 * @route DELETE api/profile/education/:edu_id
 * @desc  delete education from profile
 * @access Private
*/
router.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),deleteProfileMethods.deleteEducationProfile);

/**
 * @route DELETE api/profile
 * @desc  delete user and profile
 * @access Private
*/
router.delete('/',passport.authenticate('jwt',{session:false}),deleteProfileMethods.deleteUserAndProfile);


module.exports = router;
