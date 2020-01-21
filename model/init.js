const mongoose = require('mongoose');
const config = require('../config');

exports.init = async function init() {
  // Mongodb Connection
  mongoose.Promise = global.Promise;
  return mongoose
    .connect(config.db.uri, { useNewUrlParser: true })
    .then(() => {
      console.info('Connected to database');
      return Promise.resolve(undefined);
    }) // eslint-disable-line no-console
    .catch(err => console.error(err)); // eslint-disable-line no-console
};
