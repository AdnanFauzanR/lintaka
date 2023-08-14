import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import SidebarKelurahan from "../../components/Sidebar/SidebarKelurahan";
import SidebarKecamatan from "../../components/Sidebar/SidebarKecamatan";
import SuratContainer from "../../utils/Surat/SuratContainer";
import { useNavigate } from "react-router-dom";
import checkTokenExpiration from "../../utils/checkTokenExpiration";

const LaporanPenyuratan = () => {
    const [dataPenyuratan, setDataPenyuratan] = useState([]);
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    async function fetchDataPenyuratan() {
        const searchParams = new URLSearchParams(window.location.search);
        const penyuratanID = searchParams.get('id');
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/Penyuratan/${penyuratanID}`);
            setDataPenyuratan(response?.data.penyuratan);
            setLoading(false);           
        } catch(error) {
            console.log(error.response.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDataPenyuratan();
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
            <div className="sidebar">
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
                <h3>Surat</h3>
                {
                    loading ? (
                        <div>Loading...</div>
                    ) : (
                        <SuratContainer penyuratan={dataPenyuratan}/>
                    )
                }
            </div>
        </div>
    );
}

export default LaporanPenyuratan;