const { Schema, model } = require('mongoose');

const pointSchema = new Schema(
  {
    pointBody: {
      type: String,
      length: 280
    }
  }  
);

const Point = model('Point', pointSchema);
module.exports = Point;