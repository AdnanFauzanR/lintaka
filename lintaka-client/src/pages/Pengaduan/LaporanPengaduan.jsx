import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import SidebarKelurahan from "../../components/Sidebar/SidebarKelurahan";
import SidebarKecamatan from "../../components/Sidebar/SidebarKecamatan";
import LaporanPengaduanContainer from "../../utils/Pengaduan/LaporanPengaduanContainer";
import checkTokenExpiration from "../../utils/checkTokenExpiration";

const LaporanPengaduan = () => {
  const [dataPengaduan, setDataPengaduan] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem('role');
  const navigate = useNavigate(); 

  async function fetchDataPengaduan() {
    const searcParams = new URLSearchParams(window.location.search);
    const pengaduanID = searcParams.get('id');
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/Pengaduan/${pengaduanID}`);
      setDataPengaduan(response?.data.pengaduan);
      setLoading(false); 
    } catch (error) {
      console.log(error.response.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDataPengaduan();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
        navigate('/login');
    } else if (checkTokenExpiration()) {
        navigate('/login');
    }
  })

  return (
    <div className="container">
      <div className="header">
        <Header />
      </div>
      <div className="nav">
                {
                    role === "kelurahan" ? (
                        <SidebarKelurahan />
                    ) : role === "kecamatan" ? (
                        <SidebarKecamatan />
                    ) : (
                      navigate('/login')
                    )
                }
      </div>
      <div className="content">
        <h3>Laporan Pengaduan</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <LaporanPengaduanContainer pengaduan={dataPengaduan} />
        )}
      </div>
    </div>
  );
};

export default LaporanPengaduan;
