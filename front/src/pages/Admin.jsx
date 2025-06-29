// src/pages/Admin.jsx
import { useState, useEffect } from 'react';

function Admin() {
  const [tieuDe, setTieuDe] = useState('');
  const [moTa, setMoTa] = useState('');
  const [anhBia, setAnhBia] = useState(null);
  const [chuongDau, setChuongDau] = useState('');
  const [tieuDeChuong, setTieuDeChuong] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('tieuDe', tieuDe);
    formData.append('moTa', moTa);
    formData.append('anhBia', anhBia);
    formData.append('chuongDau', chuongDau);
    formData.append('tieuDeChuong', tieuDeChuong);

    const res = await fetch('https://web-doc-truyen.onrender.com/api/admin/truyen', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const json = await res.json();
    alert(json.message);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>🛠️ Trang Quản Trị</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiêu đề truyện:</label>
          <input type="text" value={tieuDe} onChange={e => setTieuDe(e.target.value)} required />
        </div>
        <div>
          <label>Mô tả:</label>
          <textarea value={moTa} onChange={e => setMoTa(e.target.value)} required />
        </div>
        <div>
          <label>Ảnh bìa:</label>
          <input type="file" accept="image/*" onChange={e => setAnhBia(e.target.files[0])} required />
        </div>
        <div>
          <label>Chương đầu tiên:</label>
          <input type="text" placeholder="Tiêu đề chương" value={tieuDeChuong} onChange={e => setTieuDeChuong(e.target.value)} required />
          <textarea placeholder="Nội dung chương" value={chuongDau} onChange={e => setChuongDau(e.target.value)} required />
        </div>
        <button type="submit">📤 Tải truyện</button>
      </form>
    </div>
  );
}

export default Admin;
