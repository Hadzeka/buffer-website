const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

const generateToken = (adminId) => {
  return jwt.sign({ adminId, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await adminModel.findAdminByEmail(email);
    if (existing) return res.status(400).json({ message: 'Admin already exists' });
    const newAdmin = await adminModel.createAdmin(name, email, password);
    const token = generateToken(newAdmin.id);
    res.status(201).json({ admin: { id: newAdmin.id, name: newAdmin.name, email: newAdmin.email }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findAdminByEmail(email);
    if (!admin) return res.status(401).json({ message: 'Invalid email or password' });
    const isMatch = await adminModel.matchPassword(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
    const token = generateToken(admin.id);
    res.json({ admin: { id: admin.id, name: admin.name, email: admin.email }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const admin = await adminModel.findAdminById(req.admin.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerAdmin, loginAdmin, getAdminProfile };