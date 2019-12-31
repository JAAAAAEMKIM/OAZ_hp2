'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _notice = require('../models/notice');

var _notice2 = _interopRequireDefault(_notice);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* 
    WRITE MEMO: POST /api/notice
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY CONTENTS
*/
router.post('/', function (req, res) {
    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if (typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CREATE NEW MEMO
    var notice = new _notice2.default({
        writer: req.session.loginInfo.username,
        contents: req.body.contents
    });

    // SAVE IN DATABASE
    notice.save(function (err) {
        if (err) throw err;
        return res.json({ success: true });
    });
});

/*
    READ MEMO: GET /api/notice
*/
router.get('/', function (req, res) {
    _notice2.default.find().sort({ "_id": -1 }).limit(6).exec(function (err, notices) {
        if (err) throw err;
        res.json(notices);
    });
});

/*
    MODIFY MEMO: PUT /api/notice/:id
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: INVALID ID,
        2: EMPTY CONTENTS
        3: NOT LOGGED IN
        4: NO RESOURCE
        5: PERMISSION FAILURE
*/
router.put('/:id', function (req, res) {

    // CHECK MEMO ID VALIDITY
    if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if (typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 3
        });
    }

    // FIND MEMO
    _notice2.default.findById(req.params.id, function (err, notice) {
        if (err) throw err;

        // IF MEMO DOES NOT EXIST
        if (!notice) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        // IF EXISTS, CHECK WRITER
        if (notice.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 5
            });
        }

        // MODIFY AND SAVE IN DATABASE
        notice.contents = req.body.contents;
        notice.date.edited = new Date();
        notice.is_edited = true;

        notice.save(function (err, notice) {
            if (err) throw err;
            return res.json({
                success: true,
                notice: notice
            });
        });
    });
});

/*
    DELETE MEMO: DELETE /api/notice/:id
    ERROR CODES
        1: INVALID ID
        2: NOT LOGGED IN
        3: NO RESOURCE
        4: PERMISSION FAILURE
*/
router.delete('/:id', function (req, res) {

    // CHECK MEMO ID VALIDITY
    if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND MEMO AND CHECK FOR WRITER
    _notice2.default.findById(req.params.id, function (err, notice) {
        if (err) throw err;

        if (!notice) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }
        if (notice.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 4
            });
        }

        // REMOVE THE MEMO
        _notice2.default.remove({ _id: req.params.id }, function (err) {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

// GET MEMO LIST
router.get('/', function (req, res) {});

exports.default = router;