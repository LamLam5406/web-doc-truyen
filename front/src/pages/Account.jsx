import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

function TaiKhoan() {
  const { user } = useContext(UserContext);
  const [lichSu, setLichSu] = useState([]);

  useEffect(() => {
    fetch('https://web-doc-truyen.onrender.com/api/user/lichsu', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => Array.isArray(data) ? setLichSu(data) : setLichSu([]))
        .catch((err) => {
        console.error('Lỗi lichsu:', err);
        setLichSu([]);
        });
    }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>👤 Tài khoản: {user?.username}</h2>

      <h1>📚 Lịch sử đọc</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {lichSu.map((ls) => (
          <div
            key={ls.truyen._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              width: '200px',
              borderRadius: '8px',
            }}
          >
            <Link to={`/doc/${ls.truyen._id}/${ls.chuongSo}`} style={{ textDecoration: 'none', color: 'black' }}>
              <img
                src={`http://localhost:5000${ls.truyen.anhBia}`}
                alt={ls.truyen.tieuDe}
                style={{
                  width: '200px',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
              <h3>{ls.truyen.tieuDe}</h3>
              <p>Chương {ls.chuongSo}</p>
              <p style={{ fontSize: '12px', color: '#555' }}>
                {new Date(ls.ngayXem).toLocaleString()}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaiKhoan;
