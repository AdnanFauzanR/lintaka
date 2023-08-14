import React from "react";
import './Popup.css';

const PopupAdd = ({message, onConfirm, onCancel}) => {
    return (
        <div className='popup-container'>
            <div className="popup">
                <h4 className="popup-message">
                    {message}
                </h4>
                <div className="button-container">
                    <button className="buttonkonfirmasi-no" onClick={onCancel}>
                        Tidak
                    </button>
                    <button className="buttonkonfirmasi-ya" onClick={onConfirm}>
                        Ya
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopupAdd;