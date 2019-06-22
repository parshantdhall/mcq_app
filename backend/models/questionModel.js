const mongoose = require('mongoose');

const questionScehma = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [],
    required: true
  },
  rightOption: {
    type: String,
    required: true
  }
});

const Question = mongoose.model('Question', questionScehma);

module.exports = Question;
