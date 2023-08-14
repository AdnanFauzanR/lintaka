import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './../../components/Header/Header';
import SidebarKecamatan from '../../components/Sidebar/SidebarKecamatan';
import TableAdmin from './../../utils/Table/TableAdmin';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import './../../utils/Table/Table.css';
import checkTokenExpiration from '../../utils/checkTokenExpiration';

const BerandaAdmin = () => {
    const [dataAdmin, setDataAdmin] = useState([]);
    const navigate = useNavigate();
    const wilayah = localStorage.getItem('wilayah')

    const handlePageChange = () => {
        navigate('/TambahAdmin');
    }

    useEffect(() => {
        async function fetchDataAdmin() {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/Admin`);
                const data = response?.data;
                setDataAdmin(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchDataAdmin();
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
                <SidebarKecamatan />
            </div>
            <div className="content">
                <div className="sub-content">
                    <h3>Admin</h3>
                    <div>
                        Kecamatan
                        <br/>
                        {wilayah}
                    </div>
                </div>
                <div className="table-container">
                    <DataTable columns={TableAdmin(navigate)} data={dataAdmin} />
                </div>
                <button onClick={handlePageChange} className="button-tambah">Tambah Admin</button>
            </div>
        </div>
    );
}

export default BerandaAdmin;
