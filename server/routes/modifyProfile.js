const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const { body, validationResult } = require('express-validator');
const Profile = require('../models/Profile');

var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var Image = require('../models/Image');

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

router.post('uploadimage/', upload.single('image'), (req, res, next) => {
    console.log("UPLOADIMAGE");
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    console.log(obj);
    Image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});
router.get('getimage/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

router.put("/", (req, res) => {
    const { userId, fName, lName, companyName, collegeName, dateOfBirth, gender, contactNumber, address ,imageUrl } = req.body
    console.log(req.body);
    Profile.updateOne(
        { userId: new mongodb.ObjectId(userId) },
        {
            $set: {
                userId: userId, fName: fName, lName: lName, companyName: companyName, collegeName: collegeName, dateOfBirth: dateOfBirth, gender: gender, contactNumber: contactNumber, address: address , imageUrl:imageUrl
            }
        }
    ).then(res.send({ message: "Profile Updated successfully." })).catch((err)=>console.log(err));
})
router.get("/:id", async (req, res) => {
    let profile = await Profile.findOne({ userId: req.params.id.toString() });
    if (profile) {
        // console.log(question);
        res.json(profile);
    }
    else {
        res.json("error in fatching user data")
    }
})
module.exports=router;