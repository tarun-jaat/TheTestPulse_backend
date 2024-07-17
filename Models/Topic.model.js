const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
    topicName: {
      type: String,
      required: true,
    },
    topicDescription: {
      type: String,
      required: true,
    },
    questions:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Question"
        }
    ] 
  });

  module.exports = mongoose.model("Topic", TopicSchema);