const { Schema, model } = require("mongoose");
const Comment = require("./Comment");
const medalSchema = require("./Medal");

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
  medals: [medalSchema],
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
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
});

const Cause = model("Cause", causeSchema);
module.exports = Cause;
