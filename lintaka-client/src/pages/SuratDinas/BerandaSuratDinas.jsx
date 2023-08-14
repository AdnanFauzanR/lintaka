import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import SidebarKelurahan from '../../components/Sidebar/SidebarKelurahan';
import SidebarKecamatan from '../../components/Sidebar/SidebarKecamatan';
import SuratDinasContainer from '../../utils/Container/SuratDinasContainer';
import checkTokenExpiration from '../../utils/checkTokenExpiration';


const BerandaSuratDinas = () => {
    const [dataSuratDinas, setDataSuratDinas] = useState([]);
    const wilayah = localStorage.getItem('wilayah');
    const role = localStorage.getItem('role');

    const navigate = useNavigate();

    const handlePageChange = () => {
        navigate('/TambahSurat');
    }

    useEffect(() => {
        async function fetchDataSuratDinas() {
            let data;
            let response;
            if(role === 'kecamatan') {
                response = await axios.get(`${import.meta.env.VITE_API_URL}/Surat Dinas`);
            } else {
                response = await axios.get(`${import.meta.env.VITE_API_URL}/Surat Dinas?wilayah=${wilayah}`);
            }
            data = response?.data;
            setDataSuratDinas(data);
        }
        fetchDataSuratDinas()
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
                <Header/>
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
                    <h3>Surat Dinas</h3>
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
                <SuratDinasContainer suratDinas={dataSuratDinas}/>
                <button onClick={handlePageChange} className="button-tambah">Tambah Surat</button>
            </div>
            
        </div>
    );
}

export default BerandaSuratDinas;