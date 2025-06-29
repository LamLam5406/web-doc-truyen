import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Detail() {
    const { id } = useParams();
    const [truyen, setTruyen] = useState(null);

    useEffect(() => {
      fetch(`http://localhost:5000/api/truyen/${id}`)
        .then((res) => res.json())
        .then((data) => setTruyen(data))
        .catch((err) => console.error('Lỗi khi lấy truyện:', err));
    }, [id]);

    if (!truyen) { return <h2>Không tìm thấy truyện</h2>; }

    return (
      <div style={{ padding: '20px' }}>
        <h1>{truyen.tieuDe}</h1>
        <img src={`http://localhost:5000${truyen.anhBia}`} alt={truyen.tieuDe} width="150" />
        <p>{truyen.moTa}</p>

        <h3>📖 Danh sách chương:</h3>
        <ul>
          {truyen.chuong.map((chuong) => (
            <li key={chuong.so}>
              <Link to={`/doc/${truyen._id}/${chuong.so}`}>{chuong.tieuDe}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Detail;