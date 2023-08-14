import React from "react";
import "./KontenInformasiContainer.css";
import formatDate from './../formatDate';

const KontenInformasiContainer = (props) => {
    return(
        <div className="konteninformasicontainer">
            <div className="konteninformasicontainer-header">
                <p id="location">{props.berita.user.nama}<br/>Kel. {props.berita.user.wilayah}</p>
                <p id="date">Terakhir diubah<br/> {formatDate(props.berita.updated_at)}</p>
            </div>
            <div className="konteninformasicontainer-judul">{props.berita.judul}</div>
            <div className="konteninformasicontainer-foto">
                <img src={props.berita.foto}/>
            </div>
            <div className="konteninformasicontainer-content">
                <p>{props.berita.isi}</p>
            </div>

        </div>
    );
}

export default KontenInformasiContainer;
