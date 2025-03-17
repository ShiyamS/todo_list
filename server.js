//server.js

const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: 'http://localhost:4200', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));



// handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  cors
  next();
});

// Routes
app.get('/api/message', (req, res) => {
  res.json({
    message:
      'Hello from the Express server!'
  });
});


app.use('/api', todoRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
