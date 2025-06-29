const express = require('express');
const router = express.Router();
const truyenController = require('../controllers/truyen.controller');

router.get('/top-luot-doc', truyenController.getTopLuotDoc);
router.get('/moi-cap-nhat', truyenController.getMoiCapNhat);
router.get('/:id', truyenController.getOne);


const multer = require('multer');
const path = require('path');
// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
// Route thêm truyện kèm ảnh bìa
router.post('/upload', upload.single('anhBia'), async (req, res) => {
  try {
    const { tieuDe, moTa } = req.body;
    const newTruyen = new Truyen({
      tieuDe,
      moTa,
      anhBia: `/uploads/${req.file.filename}`,
      chuong: []
    });
    await newTruyen.save();
    res.json({ message: 'Thêm truyện thành công', truyen: newTruyen });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
  }
});


module.exports = router;
