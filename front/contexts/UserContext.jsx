// src/contexts/UserContext.jsx
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://web-doc-truyen.onrender.com/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.username && data.role) {
            setUser({ username: data.username, role: data.role });
          }
        })
        .catch((err) => {
          console.error('Không thể xác thực token:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('username');
        });
    }
  }, []);

  const login = (username, token, role) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    setUser({ username, role });
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
