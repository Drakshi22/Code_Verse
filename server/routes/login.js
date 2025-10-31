const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth : {     
        user:'codeverse50@gmail.com',
        pass:'nwbvqophxczquesw'
    }
});

router.post("/",(req,res)=>{
    const { email , password } =req.body
    
    User.findOne({email:email},(err,user) => {
        if(user){
            if (password == user.password){
                var mailOptions = {
                from : 'codeverse50@gmail.com',
                to : email ,
                subject : 'CodeVerse - Login Successfully ✔' ,
                html : `<p><span style="font-size:18px">Dear User&nbsp;</span></p>&nbsp;<h1><span style="color:green">You have successfully logged in using email `+email+`<span></h1><br /><span style="font-size:18px"><strong>Note :If you did not logged in, please connect with us immediately at codeverse50@gmail.com&nbsp;
                </strong><br /><br /><br />Thanks,<br/>Team CodeVerse</span>`
            }
            
            transporter.sendMail(mailOptions,function(err,info){
                if(err){
                    console.log(err);
                }else{
                    console.log("Email sent: " + info.response );
                }
                 })
                res.send({message:"Login Sucessfull",user:user})
            }else
            {
                res.send({message:"password didn't match "})
            }

        }
        else if (err)
        {
            res.send(err)
        }
        else{
            res.send( {message : "User not registered"})
        }
    })
    console.log(req.body);
})


module.exports = router