import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import SidebarKelurahan from "../../components/Sidebar/SidebarKelurahan";
import SidebarKecamatan from "../../components/Sidebar/SidebarKecamatan";
import ContainerSuratDinas from "../../utils/SuratDinas/ContainerSuratDinas";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import checkTokenExpiration from "../../utils/checkTokenExpiration";

const LaporanSuratDinas = () => {
    const [dataSuratDinas, setDataSuratDinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem('role');
    const navigate = useNavigate()

    async function fetchDataSuratDinas() {
        const searchParams = new URLSearchParams(window.location.search);
        const suratDinasId = searchParams.get('id');
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/Surat Dinas/${suratDinasId}`);
            setDataSuratDinas(response?.data.surat_dinas);
            setLoading(false);
        } catch (error) {
            console.log(error.response.message);
            setLoading(false);
        }
    }

    useEffect (() => {
        fetchDataSuratDinas();
    }, [])

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
                <h3>Surat Dinas</h3>
                {
                    loading ? (
                        <div>Loading...</div>
                    ) : (
                        <ContainerSuratDinas suratDinas={dataSuratDinas}/>
                    )
                }
            </div>
            
        </div>
    );
}

export default LaporanSuratDinas;