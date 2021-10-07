const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const GradeSchema = new Schema({
  gradeIdx: {
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

const Grade = model('grade', GradeSchema);

module.exports = Grade;
