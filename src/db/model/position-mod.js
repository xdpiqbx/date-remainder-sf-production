const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PositionSchema = new Schema({
  depIdx: {
    type: Number,
    required: true
  },
  long: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  }
});

const Position = model('position', PositionSchema);

module.exports = Position;
