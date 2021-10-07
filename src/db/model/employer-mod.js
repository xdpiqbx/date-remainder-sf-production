const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const EmployerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  birthsday: {
    type: Object,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  mon: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  phone: {
    type: String
  },
  tlg_chatId: {
    type: Number
  },
  status: {
    type: Number,
    required: true
  },
  gradeId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'grade'
  },
  depId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'department'
  },
  posId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'position'
  },
  mmId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'main-management'
  },
  managId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'management'
  }
});

const Employer = model('employer', EmployerSchema);

module.exports = Employer;
