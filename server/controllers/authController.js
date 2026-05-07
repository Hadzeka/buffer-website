const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const generateToken = (userId, isAdmin) => {
  return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { name, email, password, isAdmin = false } = req.body;
  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Пользователь уже существует' });
    const newUser = await userModel.createUser(name, email, password, isAdmin);
    const token = generateToken(newUser.id, newUser.isAdmin);
    res.status(201).json({ ...newUser, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Неверный email или пароль' });
    const isMatch = await userModel.matchPassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Неверный email или пароль' });
    const token = generateToken(user.id, user.isAdmin);
    res.json({ id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };