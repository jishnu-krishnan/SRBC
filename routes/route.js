const express = require('express');
const router = express.Router();

// @desc The api for user login
// @route POST /api/login
router.post('/login',(req,res,next)=>{
    const mail = req.body.mail;
     User.find(mail,(err,user)=>{
        if(!user){
            return res.json({success: true, msg: 'Mail id not registered'});
        }else{
            return res.json({success: false, msg: 'Already registered user'});
        }
    }) 
})

module.exports = router;