import React from 'react';
import './CardBerita.css';
import { useNavigate } from 'react-router-dom';
import subString from './../../../utils/subString';
import formatDate from '../../../utils/formatDate';

const CardBerita = (props) => {
    const navigate = useNavigate();

    function formatJudul(judul) {
        console.log(judul.length);
        let newJudul = "";
        for(let i = 0; i <judul.length; i++) {
            if(judul[i] === " "){
                newJudul += "-";
            }else {
                newJudul += judul[i];
            }
        }
        return newJudul;
    }

    function kontenInformasiHandler(navigate) {
        const beritaID = props.berita.id;
        const judulBerita = formatJudul(props.berita.judul);
        navigate(`/KontenInformasi?id=${beritaID}?judul=${judulBerita}`); 
    }
    return(
        <div className="cardberita">
            <div className="cardberita-container-header">
                <p id="berita">{props.berita.wilayah}</p>
                <p id="date">{formatDate(props.berita.updated_at)}</p>
            </div>
            <div className="cardberita-container-image">
                <img src={props.berita.foto}/>
            </div>
            <div className="cardberita-container-content">
                <div className="cardberita-description">
                    {subString(props.berita.isi, 40)}
                </div>
                <div className="cardberita-button">
                    <button onClick={() => kontenInformasiHandler(navigate)}>
                        <img src="assets/button.svg"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardBerita;