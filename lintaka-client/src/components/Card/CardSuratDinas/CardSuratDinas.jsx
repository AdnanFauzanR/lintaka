import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardSuratDinas.css";
import formatDate from "../../../utils/formatDate";
import subString from "../../../utils/subString";
import timeFormat from "../../../utils/timeFormat";

const CardSuratDinas = (props) => {
    const navigate = useNavigate();
    const suratDinasHandler = (navigate) => {
        const suratDinasId = props.suratDinas.id;
        navigate(`/LaporanSuratDinas?id=${suratDinasId}`);
    }
    return(
        <div className="cardsuratdinas" onClick={() => suratDinasHandler(navigate)}>
            <div className="cardsuratdinas-container-header">
                <p>{props.suratDinas.judul}</p>
                <p>{props.suratDinas.tujuan}</p>
            </div>
            <div className="cardsuratdinas-container-body">
                <p id="description">{subString(props.suratDinas.isi, 400)}</p>
                <p id="date">
                    {timeFormat(props.suratDinas.created_at)}
                    <br/>
                    {formatDate(props.suratDinas.created_at)}
                </p>
            </div>
        </div>
    );
}

export default CardSuratDinas;