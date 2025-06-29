const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Kết nối MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://web-doc-truyen-six.vercel.app'],
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

const userRoutes=require('./routes/user.routes');
app.use('/api/user',userRoutes);
const truyenRoutes = require('./routes/truyen.routes');
app.use('/api/truyen', truyenRoutes);
app.use('/uploads', express.static('uploads'));
const adminRoutes = require('./routes/admin.routes');
app.use('/api/admin', adminRoutes);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
