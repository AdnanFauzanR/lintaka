import React from "react";
import CardPenyuratan from "../../components/Card/CardPenyuratan/CardPenyuratan";
import './Container.css';

const PenyuratanContainer = ({penyuratan}) => {
    return (
        <div className="card-container">
            {
                penyuratan && penyuratan.map(item => {
                    return(
                        <CardPenyuratan key={item.id} penyuratan={item} />
                    )
                })
            }

        </div>
    )
}

export default PenyuratanContainer;