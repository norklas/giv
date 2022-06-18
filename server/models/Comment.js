const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      minlength: 1,
      maxlength: 280,
      required: true
    },
    causeId: {
      type: Schema.Types.ObjectId,
      ref: 'Cause'
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }  
);

const Comment = model('Comment', commentSchema);
module.exports = Comment;