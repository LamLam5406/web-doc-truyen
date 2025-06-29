const Truyen = require('../models/truyen.model');
const User = require('../models/user.model');

// POST /admin/truyen
exports.themTruyen = async (req, res) => {
  try {
    const { tieuDe, moTa } = req.body;
    const anhBia = `/uploads/${req.file.filename}`;

    const newTruyen = new Truyen({ tieuDe, moTa, anhBia, chuong: [] });
    await newTruyen.save();

    res.json({ message: 'Tạo truyện mới thành công', truyen: newTruyen });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /admin/truyen/:id/chuong
exports.themChuong = async (req, res) => {
  try {
    const { id } = req.params;
    const { so, tieuDe, noiDung } = req.body;

    const truyen = await Truyen.findById(id);
    if (!truyen) return res.status(404).json({ error: 'Không tìm thấy truyện' });

    truyen.chuong.push({ so, tieuDe, noiDung });
    await truyen.save();

    res.json({ message: 'Thêm chương thành công', truyen });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};