import React, { useState, useEffect } from "react";
import "./KontenInformasi.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import KontenInformasiContainer from "../../utils/KontenInformasi/KontenInformasiContainer";
import axios from "axios";


const KontenInformasi = () => {
    const [dataBerita, setDataBerita] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchDataBeritabyId() {
            const seacrhParams = new URLSearchParams(window.location.search);
            const beritaId = seacrhParams.get('id');
            let data;
            await axios.get(`${import.meta.env.VITE_API_URL}/Konten Informasi/${beritaId}`)
            .then((response) => {
                data = response?.data.konten_informasi;
            })
            .catch((error) => {
                console.log(error.response.message);
            })
            setDataBerita(data);
            setLoading(false);
        }
        fetchDataBeritabyId();
    }, []);

    return(
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="nav">
                <Sidebar/>
            </div>
            <div className="content">
                <h3>Konten Informasi</h3>
                {
                    loading ? (
                        <div>Loading...</div>
                    ) : (
                        <KontenInformasiContainer berita={dataBerita}/>
                    )
                }
            </div>
        </div>
    ); 
}

export default KontenInformasi;