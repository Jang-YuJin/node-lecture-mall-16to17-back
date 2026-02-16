const Lecture = require('../models/Lecture');
const generateLectureSno = require('../utils/generateLectureSno');
const PAGE_SIZE = 5;
const lectureController = {};

lectureController.getLectureSno = async(req, res) => {
    try {
        const sno = await generateLectureSno();

        return res.status(200).json({status: 'success', sno});
    } catch (error) {
        return res.status(400).json({status: 'fail', message: error.message})
    }
};

lectureController.createLecture = async(req, res) => {
    try {
        const {sno, name, img, ctgry, desc, price, txtbkStck, fileTxtbk, status, items, dscnt, dscntRt} = req.body;
        const {userId} = req;
        const lecture = new Lecture({sno, name, userId, img, ctgry, desc, price, txtbkStck, fileTxtbk, status, items, dscnt, dscntRt});

        await lecture.save();
        res.status(200).json({status: 'success', lecture});
    } catch (error) {
        return res.status(400).json({status: 'fail', message: error.message})
    }
};

lectureController.getLectures = async(req, res) => {
    try {
        const {page, userId, name} = req.query;
        const condition = {};
        if(userId){
            condition.userId = userId;
        }
        if(name){
            condition.name = {$regex: name, $options: 'i'};
        }
        let query = Lecture.find(condition);
        let response = {status: 'success'};
        if(page){
            query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
            const totalItemNum = await Lecture.countDocuments(condition);
            const totalPageNum = Math.ceil(totalItemNum/PAGE_SIZE);
            response.totalPageNum = totalPageNum;
        }
        const lectures = await query.exec();
        response.data = lectures;

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({status: 'fail', message: error.message});
    }
};

module.exports = lectureController;