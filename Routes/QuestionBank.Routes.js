const express=require('express');
const { CreateQuestionBank, AddSubjectInQuestionBank, addChapter, addTopic, addQuestion, getQuestionBankData, getAllQuestionBanks, addQuestionASPicture } = require('../Controllers/QuestionBank.controller');
const uploadMiddleWare = require('../Config/FileUpload')
const router = express.Router()



router.post('/createQuestionBank',CreateQuestionBank)
router.post('/addsubjectIntoQuestionBank',AddSubjectInQuestionBank)
router.post('/addChapterIntoSubject',addChapter)
router.post('/addTopicIntoChapter',addTopic)
router.post('/addQuestion',addQuestion)
router.get('/getQuestionBankData/:questionBankId',getQuestionBankData)
router.get('/getAllQuestionBankData',getAllQuestionBanks)
router.post('/addQuestioAsPicture',uploadMiddleWare.single('file'),addQuestionASPicture)

module.exports = router;