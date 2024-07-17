const mongoose = require('mongoose');

// Define schema for the Question model
const questionSchema =  new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [{ type: String }],
    required: true,
    max:4,
  },
  answer: {
    type: String,
    required: true,
  },
  

});

// Compile schema into a model and export it
module.exports = mongoose.model('Question', questionSchema);
