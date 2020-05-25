const express = require('express')
const router = express.Router()
const mongoose= require('mongoose')
const passport= require('passport')


const postPostMethods = require('../postRoutes/POST/postPostsMethods')
const getPostMethods = require('../postRoutes/GET/getPostsMethods')
const deletePostMethods = require('../postRoutes/DELETE/deletePostsMethods')
/**
 * TEST ROUTER
 * @route GET  
 * @desc Test post route
 * @access Public
*/
router.get('/test',(req,res)=>{res.json({msg:'POST Works'})});

/**
 * @route GET  api/posts
 * @desc  GET route
 * @access Public
*/
router.get('/',getPostMethods.getPosts);


/**
 * @route GET  api/posts
 * @desc  GET route
 * @access Public
*/
router.get('/:id',getPostMethods.getPostsById);

/**
 * @route POST  
 * @desc Create post route
 * @access Private
*/
router.post('/',passport.authenticate('jwt',{session:false}),postPostMethods.createPosts);


/**
 * @route DELETE api/post/:id  
 * @desc Delete posts
 * @access Private
*/
router.delete('/:id',passport.authenticate('jwt',{session:false}),deletePostMethods.deletePostsById);


//Likes
/**
 * @route POST api/post/like/:id  
 * @desc Like post
 * @access Private
*/
router.post('/like/:id',passport.authenticate('jwt',{session:false}),postPostMethods.likePosts);


//UnLikes
/**
 * @route POST api/post/like/:id  
 * @desc Like post
 * @access Private
*/
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),postPostMethods.unLikePosts);

/**
 * @route POST api/post/comment/:id  
 * @desc Add comment to post
 * @access Private
*/
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),postPostMethods.comment);


/**
 * @route DELETE api/post/comment/:postId/:comment_id
 * @desc Remove comment from post
 * @access Private
*/
router.delete('/comment/:postId/:comment_id',passport.authenticate('jwt',{session:false}),deletePostMethods.deleteComment);



module.exports = router;