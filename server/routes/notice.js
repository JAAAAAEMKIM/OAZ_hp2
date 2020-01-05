import express from 'express';
import Notice from '../models/notice';
import mongoose from 'mongoose';

const router = express.Router();

/* 
    WRITE MEMO: POST /api/notice
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY CONTENTS
*/
router.post('/', (req, res) => {
    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }
    
    // CHECK CONTENTS VALID
    if(typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });   
    }

    // CREATE NEW MEMO
    let notice = new Notice({
        writer: req.session.loginInfo.username,
        contents: req.body.contents,
        title: req.body.title
    });

    // SAVE IN DATABASE
    notice.save( err => {
        if(err) throw err;
        return res.json({ success: true });
    });
});

/*
    READ MEMO: GET /api/notice
*/
router.get('/', (req, res) => {
    Notice.find()
    .sort({"_id": -1})
    .limit(6)
    .exec((err, notices) => {
        if(err) throw err;
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
router.put('/:id', (req, res) => {

    console.log("hi");

    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if(typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 3
        });
    }

    // FIND MEMO
    Notice.findById(req.params.id, (err, notice) => {
        if(err) throw err;

        // IF MEMO DOES NOT EXIST
        if(!notice) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        // IF EXISTS, CHECK WRITER
        if(notice.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 5
            });
        }
        // MODIFY AND SAVE IN DATABASE
        notice.title = req.body.title;
        notice.contents = req.body.contents;
        notice.date.edited = new Date();
        notice.is_edited = true;

        notice.save((err, notice) => {
            if(err) throw err;
            return res.json({
                success: true,
                notice
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
router.delete('/:id', (req, res) => {

    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND MEMO AND CHECK FOR WRITER
    Notice.findById(req.params.id, (err, notice) => {
        if(err) throw err;

        if(!notice) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }
        if(notice.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 4
            });
        }

        // REMOVE THE MEMO
        Notice.remove({ _id: req.params.id }, err => {
            if(err) throw err;
            res.json({ success: true });
        });
    });

});

// GET MEMO LIST
router.get('/', (req, res) => {

});

/*
    READ ADDITIONAL (OLD/NEW) MEMO: GET /api/notice/:listType/:id
*/
router.get('/:listType/:id', (req, res) => {
    let listType = req.params.listType;
    let id = req.params.id;

    // CHECK LIST TYPE VALIDITY
    if(listType !== 'old' && listType !== 'new') {
        return res.status(400).json({
            error: "INVALID LISTTYPE",
            code: 1
        });
    }
    
    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }
    
    let objId = new mongoose.Types.ObjectId(req.params.id);
    
    if(listType === 'new') {
        // GET NEWER MEMO
        Notice.find({ _id: { $gt: objId }})
        .sort({_id: -1})
        .limit(6)
        .exec((err, notices) => {
            if(err) throw err;
            return res.json(notices);
        });
    } else {
        // GET OLDER MEMO
        Notice.find({ _id: { $lt: objId }})
        .sort({_id: -1})
        .limit(6)
        .exec((err, notices) => {
            if(err) throw err;
            return res.json(notices);
        });
    }
});

/*
    TOGGLES STAR OF MEMO: POST /api/notice/star/:id
    ERROR CODES
        1: INVALID ID
        2: NOT LOGGED IN
        3: NO RESOURCE
*/

router.post('/star/:id', (req, res) => {
    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND MEMO
    Notice.findById(req.params.id, (err, notice) => {
        if(err) throw err;

        // MEMO DOES NOT EXIST
        if(!notice) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        // GET INDEX OF USERNAME IN THE ARRAY
        let index = notice.starred.indexOf(req.session.loginInfo.username);

        // CHECK WHETHER THE USER ALREADY HAS GIVEN A STAR
        let hasStarred = (index === -1) ? false : true;

        if(!hasStarred) {
            // IF IT DOES NOT EXIST
            notice.starred.push(req.session.loginInfo.username);
        } else {
            // ALREADY starred
            notice.starred.splice(index, 1);
        }

        // SAVE THE MEMO
        notice.save((err, notice) => {
            if(err) throw err;
            res.json({
                success: true,
                'has_starred': !hasStarred,
                notice
            });
        });
    });
});

export default router;