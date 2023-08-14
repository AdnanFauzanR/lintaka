import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import "./Beranda.css";
import BeritaContainer from "../../utils/Container/BeritaContainer";

const Beranda = () => {
    const [dataBerita, setDataBerita] = useState([]);

    useEffect(() => {
        async function fetchDataBerita() {
            let data;
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/Konten Informasi`);
            data = response?.data;
            console.log(data);
            setDataBerita(data);
        }
        fetchDataBerita();
    }, []);

    return(
        <div className="container">
            <div className="header">
                <Header />
            </div>
            <div className="nav">
                <Sidebar />
            </div>
            <div className="content">
                <h3>Informasi Terkini</h3>
                <BeritaContainer berita={dataBerita}/>
            </div>
        </div>
    );
}

export default Beranda;
