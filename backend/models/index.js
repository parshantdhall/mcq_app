const mongoose = require('mongoose');
// Connectiong with mongo db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () =>
  console.log('Database Connected')
);
// Debugging mongo crud operations(ONly for dev purpose)
mongoose.set('debug', true);

// Require and exporting other models
module.exports.Question = require('./questionModel');
