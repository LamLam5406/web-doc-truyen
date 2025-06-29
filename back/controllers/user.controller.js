const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'xuanthedo2507';

// Đăng ký
exports.register = async (req, res) => {
  const { username, password, adminPassword} = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: 'Tài khoản đã tồn tại' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const isAdmin = adminPassword === ADMIN_SECRET;
  const newUser = new User({
    username,
    password: hashedPassword,
    role: isAdmin ? 'admin' : 'user', });

  await newUser.save();
  res.json({ message: 'Đăng ký thành công' });

};

// Đăng nhập
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Tài khoản không tồn tại' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu' });

  // Tạo JWT token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET || 'secret_key',
    { expiresIn: '1d' }
  );

  res.json({ message: 'Đăng nhập thành công', token, username: user.username, role: user.role });
};


exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: 'Không xác thực' });
  }
};