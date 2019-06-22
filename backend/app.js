const express = require('express'),
  app = express(),
  dotEnv = require('dotenv');

// configuing dot env
dotEnv.config();
// Configuring req body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Require Routes
const questionRoutes = require('./routes/questionRoute');
// Use Routes
app.use('/api/questions', questionRoutes);

app.get('/', (req, res) => res.send('Nothing to see here!'));
// Listening the app
app.listen(process.env.PORT, () =>
  console.log(`Server Started at http://localhost:${process.env.PORT}`)
);
