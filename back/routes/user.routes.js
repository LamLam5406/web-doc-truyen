const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {verifyToken} = require('../middlewares/user.middleware');
const User = require('../models/user.model');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', verifyToken, userController.me)

router.get('/lichsu', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('lichSu.truyen');
    res.json(user.lichSu);
  } catch (err) {
    console.error('Lỗi khi lấy lịch sử:', err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});
router.post('/lichsu', verifyToken, async (req, res) => {
  const { truyenId, chuongSo } = req.body;

  if (!truyenId || chuongSo == null)
    return res.status(400).json({ message: 'Thiếu thông tin' });

  const user = await User.findById(req.userId);

  const existing = user.lichSu.find(entry => entry.truyen.equals(truyenId));
  if (existing) {
    existing.chuongSo = chuongSo;
    existing.ngayXem = new Date();
  } else {
    user.lichSu.push({ truyen: truyenId, chuongSo });
  }

  await user.save();
  res.json({ message: 'Đã lưu lịch sử' });
});

module.exports = router;
