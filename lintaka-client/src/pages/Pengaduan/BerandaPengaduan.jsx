import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import SidebarKelurahan from "../../components/Sidebar/SidebarKelurahan";
import SidebarKecamatan from "../../components/Sidebar/SidebarKecamatan";
import PengaduanContainer from '../../utils/Container/PengaduanContainer';
import { useNavigate } from "react-router-dom";
import checkTokenExpiration from "../../utils/checkTokenExpiration";

const BerandaPengaduan = () => {
    const [dataPengaduan, setDataPengaduan] = useState([]);
    const wilayah = localStorage.getItem('wilayah');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDataPengaduan() {
            let data;
            let response
            if(role === 'kecamatan') {
                response = await axios.get(`${import.meta.env.VITE_API_URL}/Pengaduan`);
            } else {
                response = await axios.get(`${import.meta.env.VITE_API_URL}/Pengaduan?wilayah=${wilayah}`);
            }
            data = response?.data;
            setDataPengaduan(data);
        }
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

    return(
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
                <div className="sub-content">
                    <h3>Pengaduan</h3>
                    <div>
                        {
                            role === "kecamatan" ? (
                                "Kecamatan"
                            ) : (
                                "Kelurahan"
                            )
                        }
                        <br/>
                        {wilayah}
                    </div>
                </div>
                <PengaduanContainer pengaduan={dataPengaduan}/>
            </div>
        </div>
    );
}

export default BerandaPengaduan;