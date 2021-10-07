const config = require('../config');

const mongoose = require('mongoose');

mongoose
  .connect(config.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Mongo Atlas connected ...');
  })
  .catch(e => console.log(e));

require('../db/model/employer-mod');
require('../db/model/grade-mod');
require('../db/model/position-mod');
require('../db/model/department-mod');
require('../db/model/management-mod');
require('../db/model/mainManagement-mod');

module.exports = mongoose;
