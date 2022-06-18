const { Schema, model } = require('mongoose');

const pointSchema = new Schema(
  {
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

const Point = model('Point', pointSchema);
module.exports = Point;