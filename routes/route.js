const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// @desc The api for user registration
// @route POST /api/signup
router.post('/signup',(req,res,next)=>{
    const name = req.body.username
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    User.getUserByUsername(name,(err,found)=>{
        if(found){
            return res.json({success: false, msg: 'Already used, Please choose another useraname'});
        }else{
            User.createNewUser(newUser,(err,user)=>{
                if(err){
                    return res.json({success: false, msg: 'Failed the registration'});
                }else{
                    const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
                        expiresIn: 604800 // one week
                    });
                    res.json({
                        success: true, token: 'JWT '+token,
                        user:{
                            id: user._id,
                            name: user.username
                        }
                    });
                }
            }) 
        }
    })
})

// @desc The api for user login
// @route POST /api/login
router.post('/login',(req,res,next)=>{
    const name = req.body.username
    const password = req.body.password
    User.getUserByUsername(name,(err,found)=>{
        if(!found){
            return res.json({success: false, msg: 'User not found'});
        }else{
            User.findOne({username:name,password:password},(err,user)=>{
                if(!user){
                    return res.json({success: false, msg: 'Login Failed'});
                }else{
                    const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
                        expiresIn: 604800 // one week
                    });
                    res.json({
                        success: true, token: 'JWT '+token,
                        user:{
                            id: user._id,
                            name: user.username
                        }
                    });
                }
            }) 
        }
    })
})
module.exports = router;