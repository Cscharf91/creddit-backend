import User from '../models/User';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  [
    body('username').trim().isLength({ min: 4 }).escape(),
    body('email').trim().isLength({ min: 6 }).isEmail().escape(),
    body('password').isLength({ min: 6 }).escape()
  ]
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ messages: errors.array() });
  }

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).json({ messages: "Email already exists" });

  const hashedPass = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    ...req.body,
    password: hashedPass
  });

  try {
    const savedUser = await user.save();
    res.json({ user: savedUser });
  } catch(err) {
    res.status(400).json(err);
  }
}

const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ messages: "Email doesn't exist" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ messages: "Invalid Password" });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).json({ token, user });
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.json(user);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

export default {
  register, login, getUser
}