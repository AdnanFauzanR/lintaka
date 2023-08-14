import React from "react";
import CardPengaduan from "../../components/Card/CardPengaduan/CardPengaduan";
import './Container.css';

const PengaduanContainer = ({pengaduan}) => {
    return (
        <div className="card-container">
            {
                pengaduan && pengaduan.map(item => {
                    return(
                        <CardPengaduan key={item.id} pengaduan={item} />
                    )
                })
            }

        </div>
    )
}

export default PengaduanContainer;
