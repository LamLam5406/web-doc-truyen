import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function Login() {
  const { login } = useContext(UserContext);
  const [username, setTenDangNhap] = useState('');
  const [password, setMatKhau] = useState('');
  const [thongBao, setThongBao] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setThongBao('');

    try {
      const res = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        // Gọi API /me để lấy role
        const meRes = await fetch('http://localhost:5000/api/user/me', {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        });

        const meData = await meRes.json();
        if (meRes.ok) {
          login(meData.username, data.token, meData.role); // 👈 truyền cả role
          setThongBao('✅ Đăng nhập thành công');
          navigate('/');
        } else {
          setThongBao('❌ Không lấy được thông tin người dùng');
        }
      } else {
        setThongBao('❌ ' + data.message);
      }
    } catch (err) {
      setThongBao('Lỗi máy chủ');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Tên đăng nhập" value={username}
          onChange={(e) => setTenDangNhap(e.target.value)} required />
        <br />
        <input type="password" placeholder="Mật khẩu" value={password}
          onChange={(e) => setMatKhau(e.target.value)} required />
        <br />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>{thongBao}</p>
    </div>
  );
}

export default Login;
