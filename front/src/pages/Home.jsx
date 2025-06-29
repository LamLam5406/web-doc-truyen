import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
    const [topLuotDoc, setTopLuotDoc] = useState([]);
    const [moiCapNhat, setMoiCapNhat] = useState([]);

    // Gọi API khi load trang
    useEffect(() => {
      // Truyện đọc nhiều
      fetch('https://web-doc-truyen.onrender.com/api/truyen/top-luot-doc')
        .then((res) => res.json())
        .then((data) => setTopLuotDoc(data))
        .catch((err) => console.error('Lỗi top-luot-doc:', err));

      // Truyện mới cập nhật
      fetch('https://web-doc-truyen.onrender.com/api/truyen/moi-cap-nhat')
        .then((res) => res.json())
        .then((data) => setMoiCapNhat(data))
        .catch((err) => console.error('Lỗi moi-cap-nhat:', err));
    }, []);

    return (
      <div style={{ padding: '20px' }}>
      <h1>📈 Top Lượt Đọc</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {topLuotDoc.map((truyen) => (
          <div
            key={truyen._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              width: '200px',
              borderRadius: '8px',
            }}
          >
            <Link to={`/truyen/${truyen._id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <img src={`https://web-doc-truyen.onrender.com${truyen.anhBia}`} alt={truyen.tieuDe} style={{ width: '200px', height: '300px', objectFit: 'cover', borderRadius: '4px' }} />
              <h3>{truyen.tieuDe}</h3>
            </Link>
          </div>
        ))}
      </div>
      <h1>🆕 Mới Cập Nhật</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {moiCapNhat.map((truyen) => (
          <div
            key={truyen._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              width: '200px',
              borderRadius: '8px',
            }}
          >
            <Link to={`/truyen/${truyen._id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <img src={`https://web-doc-truyen.onrender.com${truyen.anhBia}`} alt={truyen.tieuDe} style={{ width: '200px', height: '300px', objectFit: 'cover', borderRadius: '4px' }} />
              <h3>{truyen.tieuDe}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
    );
}
export default Home;