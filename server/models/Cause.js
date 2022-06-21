const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment')
const medalSchema = require('./Medal')

const causeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    url: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category'
    },
    medals: [medalSchema],
    comments: [commentSchema],
    location: {
      type: String,
      minlength: 1,
      maxlength: 400
    }
  }  
);

const Cause = model('Cause', causeSchema);
module.exports = Cause;