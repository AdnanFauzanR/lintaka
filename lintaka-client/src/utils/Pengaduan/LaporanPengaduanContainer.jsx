import React from "react";
import "./LaporanPengaduanContainer.css";
import formatDate from "../formatDate";
import axios from "axios";
import { saveAs } from 'file-saver';
import timeFormat from "../timeFormat";

const LaporanPengaduanContainer = (props) => {
    const isImage = /\.(jpg|jpeg|png|gif|bmp)$/i.test(props.pengaduan.bukti);
    const isFile = /\.(pdf|doc|docx)$/i.test(props.pengaduan.bukti);
    const jenisStyle = {
        color: props.pengaduan.jenis === "Publik" ? "blue" : "red",
    };

    const handleDownload = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/DownloadPengaduan/${props.pengaduan.id}`,
            {
              responseType: "blob",
            }
          );
          saveAs(response.data, `${props.pengaduan.bukti.split("/").pop()}`)
        } catch (error) {
          console.error("File download error:", error);
        }
      };
       
    return(
        <div className="laporan-pengaduan-container">
        <div className="laporan-pengaduan-header">
            <div className="tujuan-container">
                {props.pengaduan.tujuan}
            </div>
            <div className="jenis-container" style={jenisStyle}>
                {props.pengaduan.jenis}
            </div>
        </div>
        <div className="profil-container">
            <div className="profil-header">
                <p>Kel. {props.pengaduan.wilayah}</p>
                <p>
                  {timeFormat(props.pengaduan.created_at)}
                  <br/>
                  {formatDate(props.pengaduan.created_at)}
                </p>
            </div>
            <p>Nama: {props.pengaduan.nama}</p>
            <p>Alamat: {props.pengaduan.alamat}</p>
            <p>No. Hp/WA: {props.pengaduan.nomor_hp}</p>
        </div>
        <p id="header-isi">Isi</p>
        <div className="isi-container">
            <p>{props.pengaduan.isi}</p>
        </div>
        <p id="header-bukti">Bukti/Dokumen</p>
        <div className="bukti-container">
        {isImage ? (
          <img src={props.pengaduan.bukti} alt="Bukti/Dokumen" style={{ width: "100px", height: "auto" }}/>
        ) : isFile ? (
          <button className="button-download" onClick={handleDownload}>
            {props.pengaduan.bukti.split("/").pop()}
          </button>
        ) : (
          "Tidak ada dokumen"
        )}
      </div>
    </div>
    );
    
}

export default LaporanPengaduanContainer;