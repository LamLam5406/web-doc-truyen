const Truyen = require('../models/truyen.model');

// Lấy 5 truyện có nhiều lượt đọc nhất
exports.getTopLuotDoc = async (req, res) => {
  try {
    const topTruyen = await Truyen.find().sort({ luotDoc: -1 }).limit(6);
    res.json(topTruyen);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy top truyện đọc nhiều' });
  }
};

// Lấy 5 truyện cập nhật gần nhất
exports.getMoiCapNhat = async (req, res) => {
  try {
    const topMoiCapNhat = await Truyen.find().sort({ ngayCapNhat: -1 }).limit(6);
    res.json(topMoiCapNhat);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy truyện mới nhất' });
  }
};

// Lấy 1 truyện
exports.getOne = async (req, res) => {
  const truyen = await Truyen.findByIdAndUpdate(
      req.params.id,
      { $inc: { luotDoc: 1 } },
      { new: true }
    );
    res.json(truyen);
};

// Tạo truyện mới
exports.create = async (req, res) => {
  const newTruyen = new Truyen(req.body);
  await newTruyen.save();
  res.json({ message: 'Thêm truyện thành công' });
};
