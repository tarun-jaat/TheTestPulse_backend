const express=require('express');
const { CreateQuestionBank, AddSubjectInQuestionBank, addChapter, addTopic, addQuestion, getQuestionBankData, getAllQuestionBanks } = require('../Controllers/QuestionBank.controller');
const router = express.Router()



router.post('/createQuestionBank',CreateQuestionBank)
router.post('/addsubjectIntoQuestionBank',AddSubjectInQuestionBank)
router.post('/addChapterIntoSubject',addChapter)
router.post('/addTopicIntoChapter',addTopic)
router.post('/addQuestion',addQuestion)
router.get('/getQuestionBankData/:questionBankId',getQuestionBankData)
router.get('/getAllQuestionBankData',getAllQuestionBanks)
module.exports = router;