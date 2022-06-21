const { Schema } = require("mongoose");

const medalSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  pointMin: {
    type: Number,
    required: true,
  },
},
{
  toJSON: {
    getters: true
  }
});

module.exports = medalSchema;
