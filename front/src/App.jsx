import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Read from './pages/Read';
import Account from './pages/Account';
import Layout from './components/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/truyen/:id" element={<Detail />} />
        <Route path="/doc/:truyenId/:chuongSo" element={<Read />} />
        <Route path="/taikhoan" element={<Account />} />
        <Route path="/dangky" element={<Register />} />
        <Route path="/dangnhap" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
