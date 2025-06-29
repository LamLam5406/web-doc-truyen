import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

function Layout({ children }) {
    const { user, logout } = useContext(UserContext);
    const username = user?.username;

    return (
        <>
            <header
                style={{
                    padding: '12px 24px',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <img
                        src="data:image/jpeg;base64,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"
                        alt="MyTruyen"
                        style={{ height: '36px', marginRight: '8px' }}
                    />
                    <h2 style={{ color: '#333', margin: 0 }}>MyTruyen</h2>
                </Link>

                <div>
                    {username ? (
                        <>
                            <Link
                                to="/taikhoan"
                                style={{ color: '#555', textDecoration: 'none', marginRight: '12px' }}
                            >
                                👤 {username}
                            </Link>
                            {user?.role === 'admin' && <Link to="/admin">🛠️ Quản trị</Link>}
                            <button
                                onClick={logout}
                                style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#555' }}
                            >
                                🚪 Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/dangnhap" style={{ marginRight: '12px' }}>Đăng nhập</Link>
                            <Link to="/dangky">Đăng ký</Link>
                        </>
                    )}
                </div>
            </header>

            <main>{children}</main>

            <footer
                style={{
                    backgroundColor: '#f0f0f0',
                    padding: '10px 50px',
                    borderTop: '1px solid #ccc',
                    fontSize: '14px',
                    color: '#444',
                }}
            >
                <h4>LIÊN HỆ</h4>
                <p>📞 Số điện thoại: <strong>0123 456 789</strong></p>
                <p>📧 : <strong>mytruyen@gmail.com</strong></p>
                <p>📘 Fanpage: <a href="https://facebook.com/mytruyen" target="_blank" rel="noopener noreferrer">facebook.com/mytruyen</a></p>
            </footer>
        </>
    );
}

export default Layout;
