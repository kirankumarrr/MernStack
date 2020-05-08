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
const User = require('../../models/User')

// @route GET api/users/test
// @desc Test users route
// @access Public 
router.get('/test',(req,res)=>{
    res.json({msg:"User Works"})
});


// @route POST api/users/register
// @desc Register user route
// @access Public 
router.post('/register',(req,res)=>{
    console.log("req.body",req.body)
    const {errors, isValid} = validateRegisterInput(req.body)
    console.log("Valid Register ? ",isValid)
    if(!isValid){
        return res.status(400).json(errors);
    }else{
        User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                errors.email = 'Email already exists'
                return res.status(400).json({email:'Email already Exists!!!'});
            }else{
                 // Read data from request User then pass into Schema
                 const avatar = gravatar.url(req.body.email,{
                    s:'200', // Size
                    r:'pg', // Reading 
                    d:'mm' // default
                })
                const {
                    name,
                    email,
                    password
                } = req.body;
                const newUser = new User({
                    name,
                    email,
                    avatar,
                    password
                });
                // why genSalt for ?
                bcrypt.genSalt(10,(err,salt)=>{
                    // Hashing the password using bcrypt
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(!err){
                            newUser.password = hash;
                            newUser.save()
                                    .then(user=>{
                                        return res.json(user);
                                    })
                                    .catch(err=>console.log(err))
                        }else{
                            throw err;
                        }
                    })
                })
            }
        })
    }
});


// @route POST api/users/login
// @desc Login User & Returing JWT Token
// @access Public 
router.post('/login',(req,res)=>{
    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    const {email,password} = req.body;
    User.findOne({email}).then(user=>{
            if(!user){
                errors.email = 'User not Found!!!';
                return res.status(404).json(errors);
            }
            console.log("Req password",password)
            console.log("User Response From MDB",user)
            bcrypt.compare(password,user.password)
                .then(isMatch=>{
                    if(isMatch){
                        const {id,name,avatar} = user;
                        //Create JWT Palyload
                        const payload ={id,name,avatar};
                        console.log("PAYLOAD",payload)
                        //SignIn Token
                        //expiresIn : Seconds
                        jwt.sign(payload, keys.secretKey, {expiresIn:3600}, (err,token)=>{
                            res.json({
                                success:true,
                                token: 'Bearer  ' + token
                            })
                        })
                    }else{
                        errors.password = "Password Incorrect";
                        return res.status(400).json(errors);
                    }
                })
        }).catch(err=>console.log("User Login Error",err));
    // res.json({msg:"User Works"}) // note: If you pass 2 responses it will take initial One
});


// @route GET api/users/current
// @desc Return current user
// @access Private

/**
 * jwt ; Strategy
*/
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log("res",res);
    const {id,name,email} = req.user;
    res.json({
        id,name,email
    })
});


module.exports = router;  