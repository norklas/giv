const { Schema, model } = require('mongoose');

const pointSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    toJSON: {
      getters: true
    }
  } 
);

const Point = model('Point', pointSchema);
module.exports = Point;