import React from "react";
import "./Header.css";

const Header = () => {
    return(
        <div className="header">
            <div className="image-container">
                <img src="assets/logo-gowa.svg"></img>
            </div>
            <div className="image-container">
                <img src="assets/logo-lintaka.svg"></img>
            </div>
            <div className="image-container">
                <img src="assets/logo-metro.svg"></img>
            </div>
            
        </div>
    )
}

export default Header;