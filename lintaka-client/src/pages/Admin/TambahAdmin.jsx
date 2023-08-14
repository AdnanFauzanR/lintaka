import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import SidebarKecamatan from "../../components/Sidebar/SidebarKecamatan";
import AdminForm from "../../utils/Form/AdminForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import checkTokenExpiration from "../../utils/checkTokenExpiration";

const TambahAdmin = () => {
    const [dataAdmin, setDataAdmin] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchDataAdminById(id) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.get(`${import.meta.env.VITE_API_URL}/Admin/${id}`)
                .then((response) => {
                    setDataAdmin(response.data.admin);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        const searchParams = new URLSearchParams(window.location.search);
        const dataId = searchParams.get('id');
        if(dataId) {
            fetchDataAdminById(dataId);
            setLoading(false);
        } else {
            setDataAdmin(false);
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
                <SidebarKecamatan />
            </div>
            <div className="content">
                <h3>Tambah Admin</h3>
                <div className="form-container">
                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            <AdminForm editData={dataAdmin}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default TambahAdmin;