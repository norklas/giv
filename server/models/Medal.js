const { Schema, model } = require("mongoose");

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
});

const Medal = model("Medal", medalSchema);
module.exports = Medal;
