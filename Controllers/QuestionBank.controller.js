const QuestionBank = require("../Models/QuestionBank.model");
const Subject = require("../Models/Subject.model");
const Chapter = require("../Models/Chapter");
const Topic = require("../Models/Topic.model");
const Question = require("../Models/Question.model");

exports.CreateQuestionBank = async (req, res) => {
  try {
    const { Category } = req.body;
    if (!Category) {
      return res.status(400).json({
        success: false,
        message: "Please provide the Question Bank Name ",
      });
    }
    const existingQuestionBank = await QuestionBank.findOne({ Category });
    if (existingQuestionBank) {
      return res.status(400).json({
        success: false,
        message:
          "A question bank with this name already exists. Please choose a different name.",
      });
    }

    const questionBank = await QuestionBank.create({ Category });
    return res.status(200).json({
      success: true,
      message: "Question Bank Created Now you Can Move Further",
      data: questionBank,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "We are getting some internal server error please try again after some time",
      error: error.message,
    });
  }
};

exports.AddSubjectInQuestionBank = async (req, res) => {
  try {
    const { questionBankId, SubjectName } = req.body;
    if (!questionBankId || !SubjectName) {
      return res.status(400).json({
        success: false,
        message: "Please provide the Question Bank Name and Subject Name",
      });
    }
    const questionBank = await QuestionBank.findById(questionBankId);
    if (!questionBank) {
      return res.status(404).json({
        success: false,
        message: "Question Bank not found",
      });
    }
    const existingSubject = await Subject.findOne({ subjectName: SubjectName });
    if (existingSubject) {
      return res.status(400).json({
        success: false,
        message: "Subject already exists",
      });
    }
    const subject = await Subject.create({ subjectName: SubjectName });

    const updatedQuestionBank = await QuestionBank.findByIdAndUpdate(
      questionBankId,
      { $push: { subjects: subject._id } },
      { new: true }
    )
      .populate({
        path: "subjects",
        select: "name",
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "Subject created successfully",
      data: updatedQuestionBank,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is some error to creating Subject please tryagain",
      error: error.message,
    });
  }
};

exports.addChapter = async (req, res) => {
  try {
    const { subjectId, chapterName } = req.body;
    if (!subjectId || !chapterName) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(400).json({
        success: false,
        message: "Subject not found",
      });
    }
    const existingChapter = await Chapter.findOne({ subjectId, chapterName });
    if (existingChapter) {
      return res.status(400).json({
        success: false,
        message: "Chapter with the same name already exists",
      });
    }
    // Create the chapter using Chapter.create()
    const chapter = await Chapter.create({
      chapterName: chapterName,
    });

    // Push the chapter _id to the Subject's Chapter array
    subject.Chapter.push(chapter._id);

    // Save the updated Subject
    await subject.save();
    

    return res.status(200).json({
      success: true,
      message: "Chapter added successfully",
      data: chapter,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There was an error adding the chapter. Please try again.",
      error: error.message,
    });
  }
};

exports.addTopic = async (req, res) => {
  try {
    const { chapterId, topicName } = req.body;
    if (!chapterId || !topicName ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(400).json({
        success: false,
        message: "Chapter not found",
      });
    }
    const topicDescription="this is the description"
    const topic = new Topic({
      chapterId: chapterId,
      topicName: topicName,
      topicDescription: topicDescription,
    });
    await topic.save();
    chapter.topics.push(topic._id);
    await chapter.save();
    return res.status(200).json({
      success: true,
      message: "Topic added successfully",
      data: topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is some error to adding Topic please tryagain",

      error: error.message,
    });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const { topicId, questionText, options, correctAnswer } = req.body;
    // Check for required fields
    if (!topicId || !questionText || !options || !correctAnswer) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Find the quiz
    const quiz = await Topic.findById(topicId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "topic not found",
      });
    }

    // Create a new question
    const newQuestion = await Question.create({
      questionText:questionText,
      options:options,
      answer:correctAnswer,
    });

    // Add the question to the quiz
    await Topic.findByIdAndUpdate(topicId, {
      $push: { questions: newQuestion._id },
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: "Question added successfully",
      data: newQuestion,
    });
  } catch (error) {
    console.error("Error in addQuestion:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getQuestionBankData = async (req, res) => {
  try {
    const questionBankId = req.params.questionBankId;
    const questionBank = await QuestionBank.findById(questionBankId)
    .populate({
        path: 'subjects',
        populate: {
          path: 'Chapter',
          populate: {
            path: 'topics',
            populate: {
              path: 'questions'
            }
          }
        }
      })
      .exec();

    if (!questionBank) {
      return res.status(404).json({
        success: false,
        message: "question bank not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "question bank data found",
      data: questionBank,
    });
  } catch (error) {
    console.error("Error in getQuestionBankData:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


exports.getAllQuestionBanks = async (req, res) => {
  try {
    const questionBanks = await QuestionBank.find()
     .populate({
        path: 'subjects',
        populate: {
          path: 'Chapter',
          populate: {
            path: 'topics',
            populate: {
              path: 'questions'
            }
          }
        }
      })
     .exec();

    if (!questionBanks) {
      return res.status(404).json({
        success: false,
        message: "No question banks found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All question banks fetched successfully",
      data: questionBanks,
    });
  } catch (error) {
    console.error("Error in getAllQuestionBanks:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};