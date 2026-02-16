const express = require('express');
const router = express.Router();
const userApi = require('./user.api');
const authApi = require('./auth.api');
const lectureApi = require('./lecture.api');

router.use('/user', userApi);
router.use('/auth', authApi);
router.use('/lecture', lectureApi);

module.exports = router;