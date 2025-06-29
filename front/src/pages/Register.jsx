import { useState } from 'react';

function Register() {
  const [username, setTenDangNhap] = useState('');
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [thongBao, setThongBao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setThongBao('');
    
    try {
      const res = await fetch('https://web-doc-truyen.onrender.com/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, adminPassword })
      });

      const data = await res.json();
      if (res.ok) {
        setThongBao('🎉 Đăng ký thành công! Bạn có thể đăng nhập.');
      } else {
        setThongBao('❌ ' + data.message);
      }
    } catch (err) {
      setThongBao('Lỗi kết nối server');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Tên đăng nhập" value={username}
          onChange={(e) => setTenDangNhap(e.target.value)} required />
        <br />
        <input type="password" placeholder="Mật khẩu" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <input
          type="password"
          placeholder="Mật khẩu admin (nếu có)"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
        <br />
        <button type="submit">Đăng ký</button>
      </form>
      <p>{thongBao}</p>
    </div>
  );
}

export default Register;
