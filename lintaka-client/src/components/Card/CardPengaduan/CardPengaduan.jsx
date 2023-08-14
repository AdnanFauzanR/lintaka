import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardPengaduan.css";
import subString from "../../../utils/subString";
import formatDate from "../../../utils/formatDate";
import timeFormat from "../../../utils/timeFormat";

const CardPengaduan = (props) => {
    const navigate = useNavigate();

    const pengaduanHandler = (navigate) => {
        const pengaduanId = props.pengaduan.id;
        navigate(`/LaporanPengaduan?id=${pengaduanId}`);
    }
    return(
        <div className="cardpengaduan" onClick={() => pengaduanHandler(navigate)}>
            <div className="cardpengaduan-container-header">
                <p>{props.pengaduan.tujuan}</p>
                <p>{props.pengaduan.wilayah}</p>
            </div>
            <div className="cardpengaduan-container-body">
                <p id="description">{subString(props.pengaduan.isi, 400)}</p>
                <p id="date">
                    {timeFormat(props.pengaduan.created_at)}
                    <br/>
                    {formatDate(props.pengaduan.created_at)}
                </p>
            </div>
        </div>
    );
}

export default CardPengaduan;