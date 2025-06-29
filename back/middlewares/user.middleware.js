const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization; // ✅ Thêm dòng này
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Không có token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token không hợp lệ' });
  }
}

function isAdmin(req, res, next) {
  if (req.userRole === 'admin') return next();
  return res.status(403).json({ error: 'Không có quyền truy cập (admin only)' });
}

module.exports = { verifyToken, isAdmin };
