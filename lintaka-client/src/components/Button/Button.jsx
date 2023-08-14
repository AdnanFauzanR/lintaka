import React from "react";
import "./Button.css";

const Button = ({sentence}) => {
    return (
        <div className="button-submit-container">
            <button className="button-submit">
                {sentence}
            </button>
        </div>
    );
}

export default Button;