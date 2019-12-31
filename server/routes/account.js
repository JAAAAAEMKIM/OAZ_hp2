import express from 'express';
import Account from '../models/account' //만들어준 모델 가져옴

const router = express.Router();

/*
    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAM EXISTS
*/

router.post('/signup', (req, res) => {
    console.log("request:", req.body)

    // CHECK USERNAME FORMAT
    let usernameRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    let stdnoRegex = /^[0-9]*$/;

    if(!usernameRegex.test(req.body.id)) {
        return res.status(400).json({
            error: "BAD ID",
            code: 1
        });
    }

    // CHECK PASS LENGTH
    if(req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    // CHECK USER EXISTANCE
    Account.findOne({ id: req.body.id }, (err, exists) => {
        if (err) throw err;

        if(exists){
            return res.status(409).json({
                error: "ID EXISTS",
                code: 3
            });
        }
    
    if(req.body.username.length == 0 ) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 4
        });
    }

    if(req.body.stdno.length != 10 || !stdnoRegex.test(req.body.stdno)) {
        return res.status(400).json({
            error: "BAD STDNO",
            code: 5
        });
    }
            
    // CREATE ACCOUNT
    let account = new Account({
        username: req.body.username,
        stdno: req.body.stdno,
        id: req.body.id,
        password: req.body.password
    });

    account.password = account.generateHash(account.password);

    // SAVE IN THE DATABASE
    account.save( err => {
        if(err) throw err;
        return res.json({ success: true });
    });

        
    });
});

/*
    ACCOUNT SIGNIN: POST /api/account/signin
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: LOGIN FAILED
*/
router.post('/signin', (req, res) => {
    if(typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // FIND THE USER BY USERNAME
    Account.findOne({ id: req.body.id}, (err, account) => {
        if(err) throw err;

        // CHECK ACCOUNT EXISTANCY
        if(!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // CHECK WHETHER THE PASSWORD IS VALID
        if(!account.validateHash(req.body.password)) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // ALTER SESSION
        let session = req.session;
        session.loginInfo = {
            _id: account._id,
            id: account.id
        };

        // RETURN SUCCESS
        return res.json({
            success: true
        });
    });
});

/*
    GET CURRENT USER INFO GET /api/account/getInfo
    로그인 데이터를 쿠키에 담고 사용을 하고 있다가,
    만약에 새로고침을 해서 어플리케이션을 처음부터 다시 렌더링 하게 될 때,
    지금 갖고 있는 쿠키가 유효한건지 체크를 해야 하기 때문
*/

/*  router.get은 첫번째 인자로 string, 두번째 인자로 함수를 받는다.
    여기서 두번째 인자는 req, res를 매개변수로 하는 익명함수가 들어가서
    실행결과를 리턴해준다. 익명함수는 router.get 내부에서 실행된다.
    어떻게 실행되는지는 몰라도됨. 이렇게 해주면 됨. 
*/
router.get('/getinfo', (req, res) => {
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session.loginInfo });
});

/*
    LOGOUT: POST /api/account/logout
*/
router.post('/logout', (req, res) => {
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ success: true });
});

export default router;