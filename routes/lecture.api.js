const express = require('express');
const lectureController = require('../controllers/lecture.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

//강의 시퀀스
router.get('/sno',lectureController.getLectureSno);
router.post('/', authController.authenticate, authController.checkSellerPermission, lectureController.createLecture);
router.get('/', lectureController.getLectures);

module.exports = router;