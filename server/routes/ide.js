const express = require('express');
const router = express.Router();
var request = require('request');
require('dotenv/config');

const { body, validationResult } = require('express-validator');

router.post('/',async(req,res)=>{
    const { code,input,language} = req.body
    console.log("hello");
    console.log(code);
    console.log("language " , language);
    var program = {
        script : code,
        stdin:input ,
        language: language,
        versionIndex: "0",
        clientId: "fdbb6defaf49675623f3d03f21025904",
        clientSecret:"bcb138a77f1e208b1c93bb631e1107a414692cbb1e18cf8218cfb0f4d14d459b"
    };
    await request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: "POST",
        json: program
    },
    function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        res.send(body);
    });
   
});
module.exports = router
