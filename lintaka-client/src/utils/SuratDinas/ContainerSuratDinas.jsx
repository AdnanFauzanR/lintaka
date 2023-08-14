import React from "react";
import axios from "axios";
import './ContainerSuratDinas.css';
import formatDate from './../formatDate';
import { saveAs } from 'file-saver';
import timeFormat from "../timeFormat";

const ContainerSuratDinas = (props) => {
    const handleDownload = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/Download Surat Dinas/${props.suratDinas.id}`,
                {
                    responseType: "blob",
                }
            );
            saveAs(response.data, `${props.suratDinas.dokumen.split("/").pop()}`);
        } catch (error) {
            console.log('File download error:', error);
        }
    }

    return(
        <div className="laporan-pengaduan-container">
            <div className="laporan-surat-dinas-header">
                <div className="tujuan-surat-dinas-container">
                    {props.suratDinas.tujuan}
                </div>
                <div className="tujuan-surat-dinas-container">
                    {timeFormat(props.suratDinas.created_at)}
                    <br/>
                    {formatDate(props.suratDinas.created_at)}
                </div>
            </div>
            <div className="judul-container">
                {props.suratDinas.judul}
            </div>
            <p id="header-isi">Isi</p>
            <div className="isi-container">
                <p>{props.suratDinas.isi}</p>
            </div>
            <p id="header-bukti">Dokumen</p>
            <div className="bukti-container">
                <button className="button-download" onClick={handleDownload}>
                    {props.suratDinas.dokumen.split("/").pop()}
                </button>
            </div>
        </div>
    );
}

export default ContainerSuratDinas;