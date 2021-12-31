const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hbrix.mongodb.net/${process.env.DB_NAME}`;

const authRoutes = require('./controller/authController');
const userRoutes = require('./controller/userController');
const adminRoutes = require('./controller/adminController');

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));

// Main Routes:
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Error Middleware:
app.use((error, req, res, next) => {
  throw new Error(
    `Error ${error.code || 500}: ${
      error.message || 'An unknown error occurred'
    }`
  );
});

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => console.log(error));
