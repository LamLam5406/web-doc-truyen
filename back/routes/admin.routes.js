// routes/admin.routes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Truyen = require('../models/truyen.model');
const {verifyToken} = require('../middlewares/user.middleware');
const {isAdmin} = require('../middlewares/user.middleware');

// multer để lưu ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// API thêm truyện mới
router.post('/truyen', verifyToken, isAdmin, upload.single('anhBia'), async (req, res) => {
  try {
    const { tieuDe, moTa, chuongDau, tieuDeChuong } = req.body;

    const newTruyen = new Truyen({
      tieuDe,
      moTa,
      anhBia: `/uploads/${req.file.filename}`,
      chuong: [{
        so: 1,
        tieuDe: tieuDeChuong,
        noiDung: chuongDau
      }]
    });

    await newTruyen.save();
    res.json({ message: '✅ Tải truyện thành công', truyen: newTruyen });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
  }
});

module.exports = router;
