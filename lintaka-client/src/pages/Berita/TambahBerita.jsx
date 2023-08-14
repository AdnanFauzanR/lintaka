import React, { useEffect, useState } from "react";
import Header from './../../components/Header/Header';
import SidebarKelurahan from './../../components/Sidebar/SidebarKelurahan';
import SidebarKecamatan from "../../components/Sidebar/SidebarKecamatan";
import BeritaForm from "../../utils/Form/BeritaForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import checkTokenExpiration from "../../utils/checkTokenExpiration";

const TambahBerita = () => {
    const [dataBerita, setDataBerita] = useState([]);
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();


    async function fetchDataBeritaById(id) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await axios.get(`${import.meta.env.VITE_API_URL}/Konten Informasi/${id}`)
        .then((response) => {
            setDataBerita(response.data.konten_informasi)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const dataId = searchParams.get('id');
        if(dataId) {
            fetchDataBeritaById(dataId);
            setLoading(false);
        } else {
            setDataBerita(false);
            setLoading(false);
        }
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
                    role === 'kelurahan' ? (
                        <SidebarKelurahan />
                    ) : role === 'kecamatan' ? (
                        <SidebarKecamatan />
                    ) : (
                        navigate('/login')
                    )
                }
            </div>
            <div className="content">
                <h3>Tambah Berita</h3>
                <div className="form-container">
                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            <BeritaForm editData={dataBerita}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default TambahBerita;
