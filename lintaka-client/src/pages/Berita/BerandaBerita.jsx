import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './../../components/Header/Header';
import SidebarKelurahan from './../../components/Sidebar/SidebarKelurahan';
import SidebarKecamatan from '../../components/Sidebar/SidebarKecamatan';
import DataTable from 'react-data-table-component';
import TableBerita from '../../utils/Table/TableBerita';
import { useNavigate } from 'react-router-dom';
import './../../utils/Table/Table.css';
import checkTokenExpiration from '../../utils/checkTokenExpiration';

const BerandaBerita = () => {
    const [dataBerita, setDataBerita] = useState([]);
    const role = localStorage.getItem('role');
    const wilayah = localStorage.getItem('wilayah');
    const navigate = useNavigate();

    const handlePageChange = () => {
        navigate('/TambahBerita');
    }

    useEffect(() => {
        async function fetchDataBerita() {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const url = `${import.meta.env.VITE_API_URL}/Konten Informasi?wilayah=${wilayah}`;
            try {
                const response = await axios.get(url);
                const data = response?.data;
                setDataBerita(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchDataBerita();
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
                <div className="sub-content">
                    <h3>Berita</h3>
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
                <div className="table-container">
                    <DataTable columns={TableBerita(navigate)} data={dataBerita} />
                    <button onClick={handlePageChange} className="button-tambah">Tambah Berita</button>
                </div>
            </div>
        </div>
    );
}

export default BerandaBerita;