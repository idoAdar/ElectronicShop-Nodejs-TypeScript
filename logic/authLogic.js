const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcryptjs.hash(password, 12);
    const user = await User({
      username,
      email,
      password: hashPassword,
    });
    await user.save();

    const payload = { id: user._id };
    jwt.sign(payload, process.env.DB_JWT, (error, token) =>
      res.status(200).json({ token, username })
    );
  } catch (error) {
    next(error);
  }
};

exports.signDetails = async (req, res, next) => {
  try {
    const user = req.currentUser;
    const { country, city, phone } = req.body;

    user.country = country;
    user.city = city;
    user.phone = phone;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User Not Found' });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    const payload = { id: user._id };
    jwt.sign(payload, process.env.DB_JWT, (error, token) =>
      res.status(200).json({ token, username: user.username })
    );
  } catch (error) {
    next(error);
  }
};
