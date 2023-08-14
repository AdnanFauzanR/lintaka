import React from "react";
import CardSuratDinas from "../../components/Card/CardSuratDinas/CardSuratDinas";
import './Container.css';

const SuratDinasContainer = ({suratDinas}) => {
    return (
        <div className="card-container">
            {
                suratDinas && suratDinas.map(item => {
                    return(
                        <CardSuratDinas key={item.id} suratDinas={item} />
                    )
                })
            }
        </div>
    )
}

export default SuratDinasContainer;