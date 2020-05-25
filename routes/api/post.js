const express = require('express')
const router = express.Router()
const mongoose= require('mongoose')
const passport= require('passport')


const postPostMethods = require('../postRoutes/POST/postPostsMethods')

/**
 * TEST ROUTER
 * @route GET  
 * @desc Test post route
 * @access Public
*/
router.get('/test',(req,res)=>{res.json({msg:'POST Works'})});

/**
 * @route POST  
 * @desc Create post route
 * @access Private
*/
router.post('/',passport.authenticate('jwt',{session:false}),postPostMethods.createPosts);


module.exports = router;