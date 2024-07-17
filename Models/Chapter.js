const mongoose = require("mongoose");


const ChapterSchema = new mongoose.Schema({
    chapterName: {
      type: String,
      required: true,
    },
    chapterDescription: {
      type: String, 
    //   required: true,
    },
    topics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic"
        }
    ],
 
  
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model("Chapter", ChapterSchema );