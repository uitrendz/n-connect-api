var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ObjectId = require('mongoose').Types.ObjectId;

var VerifyToken = require('../auth/verifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
var User = require('./user');

// CREATES A NEW USER
router.post('/', function (req, res) {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// // GETS A SINGLE USER FROM THE DATABASE
// router.get('/:id', function (req, res) {
//     User.findById(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
//         res.status(200).send(user);
//     });
// });

// GET : localhost:3000/todolist/userid
router.get('/:user', (req, res) => {
    console.log(req.params.user);
    User.findOne({ name: req.params.user }, (err, doc) => {
        if (!err) { 
            if(doc){
                res.send(doc.name);
            }
            else{
                res.send(doc);
            }
         }
        else {
            console.log('Error in Retrieving ToDo List  : ' + JSON.stringify(err, undefined, 2));
        }
    })
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + user.name + " was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;