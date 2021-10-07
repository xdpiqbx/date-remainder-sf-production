const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MainManagementSchema = new Schema({
  mmIdx: {
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

const MainManagement = model('main-management', MainManagementSchema);

module.exports = MainManagement;
