const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Question } = require('../models/question');

// GET : localhost:3000/questions/
router.get('/', (req, res) => {
    Question.find((err, docs) => {
        if (!err) { res.send(docs); }
        else {
            console.log('Error in Retrieving  : ' + JSON.stringify(err, undefined, 2));
        }
    });
});


// POST : localhost:3000/questions/
router.post('/', (req, res) => {
    var question = new Question({
        title: req.body.title,
        createdOn: req.body.createdOn,
        updatedOn: req.body.updatedOn,
        type: req.body.type,
        categoryId: req.body.categoryId,
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy
    });
    question.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Employee Save  : ' + JSON.stringify(err, undefined, 2));
        }

    });
});


//  PUT : localhost:3000/questions/_id
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var question = {
        title: req.body.title,
        createdOn: req.body.createdOn,
        updatedOn: req.body.updatedOn,
        type: req.body.type,
        categoryId: req.body.categoryId,
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy
    };

    Question.findByIdAndUpdate(req.params.id, { $set: question }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else {
            console.log('Error in Employee Update  : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//  DELETE : localhost:3000/questions/_id
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Question.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else {
            console.log('Error in Employee Delete  : ' + JSON.stringify(err, undefined, 2));
        }
    });

});




module.exports = router;