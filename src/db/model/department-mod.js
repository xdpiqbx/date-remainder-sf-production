const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const DepartmetSchema = new Schema({
  depIdx: {
    type: Number,
    required: true
  },
  long: {
    type: String,
    required: true
  },
  longFrom: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  },
  shortFrom: {
    type: String,
    required: true
  }
});

const Departmet = model('department', DepartmetSchema);

module.exports = Departmet;
