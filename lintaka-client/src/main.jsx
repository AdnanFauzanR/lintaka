import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Beranda from './pages/Beranda/Beranda';
import KontenInformasi from './pages/KontenInformasi/KontenInformasi';
import Pengaduan from './pages/Pengaduan/Pengaduan';
import Penyuratan from './pages/Penyuratan/Penyuratan';
import Login from './pages/Login/Login';
import BerandaPengaduan from './pages/Pengaduan/BerandaPengaduan';
import BerandaPenyuratan from './pages/Penyuratan/BerandaPenyuratan';
import BerandaSuratDinas from './pages/SuratDinas/BerandaSuratDinas';
import LaporanPengaduan from './pages/Pengaduan/LaporanPengaduan';
import LaporanPenyuratan from './pages/Penyuratan/LaporanPenyuratan';
import LaporanSuratDinas from './pages/SuratDinas/LaporanSuratDinas';
import TambahSuratDinas from './pages/SuratDinas/TambahSuratDinas';
import TambahBerita from './pages/Berita/TambahBerita';
import TambahAdmin from './pages/Admin/TambahAdmin';
import BerandaAdmin from './pages/Admin/BerandaAdmin';
import BerandaBerita from './pages/Berita/BerandaBerita';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Beranda />
  },
  {
    path: "/KontenInformasi",
    element: <KontenInformasi />
  },
  {
    path: "/Pengaduan",
    element: <Pengaduan />
  },
  {
    path: "/Penyuratan",
    element: <Penyuratan />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/BerandaPengaduan",
    element: <BerandaPengaduan/>
  },
  {
    path: "/BerandaPenyuratan",
    element: <BerandaPenyuratan />
  },
  {
    path: "/BerandaSuratDinas",
    element: <BerandaSuratDinas />
  },
  {
    path: "/LaporanPengaduan",
    element: <LaporanPengaduan />
  },
  {
    path: "/LaporanPenyuratan",
    element: <LaporanPenyuratan />
  },
  {
    path: "/LaporanSuratDinas",
    element: <LaporanSuratDinas />
  },
  {
    path: "/TambahSurat",
    element: <TambahSuratDinas />
  },
  {
    path: "/BerandaBerita",
    element: <BerandaBerita />
  },
  {
    path: "/TambahBerita",
    element: <TambahBerita />
  },
  {
    path: "/BerandaAdmin",
    element: <BerandaAdmin />
  },
  {
    path: "/TambahAdmin",
    element: <TambahAdmin />
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// ReactDOM.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById('root')
// );

