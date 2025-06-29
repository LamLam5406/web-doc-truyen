import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

function Read() {
  const { truyenId, chuongSo } = useParams();
  const [truyen, setTruyen] = useState(null);
  const [chuong, setChuong] = useState(null);
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    fetch(`https://web-doc-truyen.onrender.com/api/truyen/${truyenId}`)
      .then((res) => res.json())
      .then((data) => {
        setTruyen(data);
        const index = data.chuong.findIndex(c => c.so === Number(chuongSo));
        if (index !== -1) {
          const chuong = data.chuong[index];
          setChuong({ data: chuong, index });

          // ✅ Gửi lịch sử đọc
          fetch('https://web-doc-truyen.onrender.com/api/user/lichsu', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              truyenId,
              chuongSo: chuong.so
            })
          })
            .then(res => res.json())
            .then(data => console.log('📖 Lưu lịch sử:', data))
            .catch(err => console.error('❌ Không lưu được lịch sử:', err));
        } else {
          setChuong(null);
        }
      })
      .catch((err) => console.error('Lỗi khi lấy truyện:', err));
  }, [truyenId, chuongSo]);

  if (!truyen)  return <h2>🔄 Đang tải truyện...</h2>;
  if (!chuong)  return <h2>❌ Không tìm thấy chương</h2>;

  const { data: c, index } = chuong;
  const prev = truyen.chuong[index - 1];
  const next = truyen.chuong[index + 1];

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
      <Link to={`/truyen/${truyen._id}`}><h2>{truyen.tieuDe}</h2></Link>
      <h3>Chương {c.so}: {c.tieuDe}</h3>
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
        {c.noiDung}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {prev 
          ? <Link to={`/doc/${truyen._id}/${prev.so}`}>⬅️ Chương trước</Link>
          : <span/>
        }
        {next
          ? <Link to={`/doc/${truyen._id}/${next.so}`}>Chương sau ➡️</Link>
          : <span/>
        }
      </div>
    </div>
  );
}

export default Read;
