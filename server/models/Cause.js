const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const causeSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  url: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  medals:  [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  category:{
    type: String
  },
  location: {
    type: String,
    minlength: 1,
    maxlength: 400,
  },
  points: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  }
});

const Cause = model("Cause", causeSchema);
module.exports = Cause;
