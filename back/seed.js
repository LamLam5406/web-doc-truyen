const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const dsTruyen = require('./data/truyen');
const Truyen = require('./models/truyen.model');

dotenv.config(); // Tải biến môi trường
connectDB();     // Kết nối DB

async function seedDB() {
  try {
    await Truyen.deleteMany({});
    await Truyen.insertMany(dsTruyen);
    console.log('✅ Dữ liệu đã được thêm thành công!');
  } catch (err) {
    console.error('❌ Lỗi khi thêm dữ liệu:', err);
  } finally {
    mongoose.connection.close();
  }
}

setTimeout(seedDB, 1000); // ⚠️ đợi connectDB() hoàn tất
