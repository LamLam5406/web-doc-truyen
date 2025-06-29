const mongoose = require('mongoose');

const TruyenSchema = new mongoose.Schema({
  tieuDe: String,
  moTa: String,
  anhBia: String,
  chuong: [{
    so: Number,
    tieuDe: String,
    noiDung: String
  }],
  luotDoc: {
    type: Number,
    default: 0
  },
  ngayCapNhat: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Truyen', TruyenSchema);
