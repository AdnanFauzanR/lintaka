import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardPenyuratan.css";
import formatDate from "../../../utils/formatDate";
import subString from "../../../utils/subString";
import timeFormat from "../../../utils/timeFormat";

const CardPenyuratan = (props) => {
    const navigate = useNavigate();

    const penyuratanHandler = (navigate) => {
        const penyuratanId = props.penyuratan.id;
        navigate(`/LaporanPenyuratan?id=${penyuratanId}`);
    }
    return(
        <div className="cardpenyuratan" onClick={() => penyuratanHandler(navigate)}>
            <div className="cardpenyuratan-container-header">
                <p>{props.penyuratan.tujuan}</p>
                <p>{props.penyuratan.wilayah}</p>
            </div>
            <div className="cardpenyuratan-container-body">
                <p id="description">{subString(props.penyuratan.isi, 400)}</p>
                <p id="date">
                    {timeFormat(props.penyuratan.created_at)}
                    <br/>
                    {formatDate(props.penyuratan.created_at)}
                </p>
            </div>
        </div>
    );
}

export default CardPenyuratan;