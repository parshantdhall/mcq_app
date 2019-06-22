const router = require('express').Router();
const db = require('../models');
const validation = require('../middlewares/dataValidation');

// Getting all questions
router.get('/', async (req, res) => {
  try {
    const questions = await db.Question.find({});
    res.status(200).json(questions);
  } catch (err) {
    res.status(400).json({ message: "Errr There's some error" });
    console.error(err);
  }
});

// Posting a question
router.post('/', validation.questionValidation, async (req, res) => {
  try {
    const newques = await db.Question.create(req.body);
    res.status(201).json(newques);
  } catch (err) {
    res.status(400).json({ message: "Errr There's some error" });
    console.error(err);
  }
});

// Getting a particular question
router.get('/:id', async (req, res) => {
  try {
    const ques = await db.Question.findOne({ _id: req.params.id });
    res.status(200).json(ques);
  } catch (err) {
    res.status(400).json({ message: "Errr There's some error" });
    console.error(err);
  }
});

// Updating a Question
router.put('/:id', validation.questionValidation, async (req, res) => {
  try {
    const updatedQues = await db.Question.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedQues);
  } catch (err) {
    res.status(400).json({ message: "Errr There's some error" });
    console.error(err);
  }
});

// Delete a Question
router.delete('/:id', async (req, res) => {
  try {
    await db.Question.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: 'Deletion Successful!' });
  } catch (err) {
    res.status(400).json({ message: "Errr There's some error" });
    console.error(err);
  }
});

module.exports = router;
