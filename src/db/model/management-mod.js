const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ManagementSchema = new Schema({
  mgtIdx: {
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
  },
  mainMngId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'mainManagement'
  }
});

const Management = model('management', ManagementSchema);

module.exports = Management;
