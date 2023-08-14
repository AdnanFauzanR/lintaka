import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <nav className="navbar">
        <b>MENU</b>
        <ul>
          <li>
            <Link to="/" className={(location.pathname === '/' || location.pathname === "/KontenInformasi") ? 'active' : ''}>
              Beranda
            </Link>
          </li>
          <li>
            <Link to="/Pengaduan" className={location.pathname === '/Pengaduan' ? 'active' : ''}>
              Pengaduan
            </Link>
          </li>
          <li>
            <Link to="/Penyuratan" className={location.pathname === '/Penyuratan' ? 'active' : ''}>
              Penyuratan
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
