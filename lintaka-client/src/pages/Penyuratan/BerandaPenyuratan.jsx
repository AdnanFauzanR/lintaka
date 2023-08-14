import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import SidebarKelurahan from '../../components/Sidebar/SidebarKelurahan';
import SidebarKecamatan from '../../components/Sidebar/SidebarKecamatan';
import PenyuratanContainer from '../../utils/Container/PenyuratanContainer';
import { useNavigate } from 'react-router-dom';
import checkTokenExpiration from '../../utils/checkTokenExpiration';

const BerandaPenyuratan = () => {
    const [dataPenyuratan, setDataPenyuratan] = useState([]);
    const wilayah = localStorage.getItem('wilayah');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDataPenyuratan() {
            let data;
            let response;
            if (role === 'kecamatan') {
                response = await axios.get(`${import.meta.env.VITE_API_URL}/Penyuratan`);
            } else {
                response = await axios.get(`${import.meta.env.VITE_API_URL}/Penyuratan?wilayah=${wilayah}`);
            }
            data = response?.data;
            console.log(response.data);
            setDataPenyuratan(data);
        }
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
                    <h3>Penyuratan</h3>
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
                <PenyuratanContainer penyuratan={dataPenyuratan}/>
            </div>
        </div>
    );
}

export default BerandaPenyuratan;