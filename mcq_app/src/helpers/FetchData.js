import axios from 'axios';

// Getting all questions..
export const getAllQues = async () => {
  try {
    const res = await axios.get('/api/questions');
    return res;
  } catch (err) {
    return err;
  }
};

// Get single Question
export const getSingleQues = async quesId => {
  try {
    const res = await axios.get(`/api/questions/${quesId}`);
    return res;
  } catch (err) {
    return err;
  }
};

// Deleting a question
export const delQues = async quesId => {
  try {
    await axios.delete(`/api/questions/${quesId}`);
    return 'Deletion sucessful';
  } catch (err) {
    return err;
  }
};

// Update a ques
export const updateQues = async (quesId, data) => {
  try {
    const res = await axios.put(`/api/questions/${quesId}`, data);
    return res;
  } catch (err) {
    return err;
  }
};

// Creating a new Question
export const createQues = async data => {
  try {
    const newques = await axios.post('/api/questions', data);
    return newques;
  } catch (err) {
    return err;
  }
};
