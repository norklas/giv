const { Schema, model } = require('mongoose');

const shareSchema = new Schema(
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
    }
  }  
);

const Share = model('Share', shareSchema);
module.exports = Share;