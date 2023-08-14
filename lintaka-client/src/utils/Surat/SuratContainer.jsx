import React from "react";
import axios from "axios";
import "./SuratContainer.css";
import formatDate from "../formatDate";
import { saveAs } from 'file-saver';
import timeFormat from "../timeFormat";

const SuratContainer = (props) => {
    const handleDownload = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/DownloadPenyuratan/${props.penyuratan.id}`,
                {
                    responseType: 'blob',
                }
            );
            const filename = `${props.penyuratan.dokumen.split("/").pop()}`;
            console.log(filename); 
            saveAs(response.data, filename)
        } catch (error) {
            console.log('File download error:', error);
        }
    };

    return(
        <div className="laporan-penyuratan-container">
            <div className="tujuan-penyuratan-container">{props.penyuratan.tujuan}</div>
            <div className="profil-surat-container">
                <div className="profil-header">
                    <p>{props.penyuratan.wilayah}</p>
                    <p>
                        {timeFormat(props.penyuratan.created_at)}
                        <br/>
                        {formatDate(props.penyuratan.created_at)}
                    </p>
                </div>
                <p>Nama: {props.penyuratan.nama}</p>
                <p>Alamat: {props.penyuratan.alamat}</p>
                <p>No. Hp/WA: {props.penyuratan.nomor_hp}</p>
            </div>
            <p id="header-isi">Isi</p>
            <div className="isi-surat-container">
                <p>{props.penyuratan.isi}</p>
            </div>
            <p id="header-bukti">Dokumen</p>
            <div className="bukti-container">
                <button className="button-download" onClick={handleDownload}>
                {props.penyuratan.dokumen.split("/").pop()}
                </button>
            </div>
        </div>
    );
}

export default SuratContainer;