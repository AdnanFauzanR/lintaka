import React, { useState } from 'react';
import axios from 'axios';
import './SidebarAdmin.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SidebarKecamatan = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const [showSubnav, setShowSubnav] = useState(false);

  const logoutHandler = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post(`${import.meta.env.VITE_API_URL}/logout`)
        .then(() => {
            localStorage.removeItem('token');
            localStorage.clear();
            navigate('/login');
            setShowPopupLogout(false);
        })
  }

  const toggleSubnav = () => {
    setShowSubnav(!showSubnav);
  }

  const checkPath = () => {
    if((location.pathname === '/BerandaPenyuratan') || location.pathname === '/BerandaSuratDinas') {
        return true;
    }
  }

  return (
    <div className="sidebar">
      <nav className="navbar">
        <b>MENU</b>
        <ul>
          <li>
            <Link to="/BerandaPengaduan" className={location.pathname === '/BerandaPengaduan' ? 'active' : ''}>
              Pengaduan
            </Link>
          </li>
          <li className={(showSubnav || checkPath()) ? "dropdown-active" : "dropdown"} onClick={toggleSubnav}>
              <div id="dropdown-surat-button">Surat</div>
              {
                (showSubnav || checkPath()) && (
                    <ul className='dropdown-subnav'>
                        <li>
                            <Link to="/BerandaPenyuratan" className={location.pathname === '/BerandaPenyuratan' ? 'active' : ''}>
                            Penyuratan
                            </Link>
                        </li>
                        <li>
                            <Link to="/BerandaSuratDinas" className={location.pathname === '/BerandaSuratDinas' ? 'active' : ''}>
                                Surat Dinas
                            </Link>
                        </li>
                    </ul>
                )
              }
          </li>
          <li>
            <Link to="/BerandaAdmin" className={location.pathname === '/BerandaAdmin' ? 'active' : ''}>
              Admin
            </Link>
          </li>
          <li>
            <Link to="/BerandaBerita" className={location.pathname === '/BerandaBerita' ? 'active' : ''}>
              Berita
            </Link>
          </li>
          <li id="logout-button">
            <a href="#" onClick={logoutHandler}>
                Keluar
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarKecamatan;