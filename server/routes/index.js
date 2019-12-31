// API 루트라우터

import express from 'express';
import account from './account';
import memo from './memo';
import notice from './notice';


const router = express.Router();
router.use('/account', account);
router.use('/memo', memo);
router.use('/notice', notice);

export default router;