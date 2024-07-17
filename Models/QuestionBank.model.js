
const mongoose = require('mongoose');

const questionBankSchema = new mongoose.Schema({
    Category:{
        type:String,
        required:true
    },
    subjects: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
  
});

module.exports = mongoose.model('QuestionBank', questionBankSchema);
