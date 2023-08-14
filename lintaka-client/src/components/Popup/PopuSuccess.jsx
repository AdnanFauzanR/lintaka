import React from "react";
import './Popup.css';

const PopupSuccess = ({message, onConfirm}) => {
    <div className="popup-container">
        <div className="popup">
            <h4 className="popup-message">
                {message}
            </h4>
        </div>
        <div className="button-container">
            <button className="buttonkonfirmasi-ya" onClick={onConfirm}>
                Kembali
            </button>
        </div>
    </div>
}

export default PopupSuccess;