const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    }
  }  
);

const Category = model('Category', categorySchema);
module.exports = Category;