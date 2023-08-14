import React, { useState } from "react";
import "./DropdownTujuan.css";

const DropdownTujuan = ({ selectedTujuan, onTujuanChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    }

    const handleOptionSelect = (selectedValue) => {
        onTujuanChange(selectedValue);
        setIsOpen(false);
    }

    let options = [
        {
            value: "Keamanan dan Ketertiban",
            label: "Keamanan dan Ketertiban"
        },
        {
            value: "Pemerintahan",
            label: "Pemerintahan"
        },
        {
            value: "Pemberdayaan",
            label: "Pemberdayaan"
        },
        {
            value: "Masyarakat",
            label: "Masyarakat"
        },
        {
            value: "Lainnya",
            label: "Lainnya"
        },
    ];

    return(
        <div className="dropdown-tujuan-container">
            <div className="dropdown-tujuan">
                <button className="dropdown-tujuan-button" onClick={handleDropdownClick}>
                    <span className="dropdown-tujuan-button-label">{selectedTujuan || "Tujuan Pengaduan"}</span>
                    <div>
                        <img className="dropdown-icon" src="assets/button-dropdown.svg"/>
                    </div>
                    <i className={isOpen ? "fa fa-caret-up" : "fa fa-caret-down"}></i>
                </button>
                {
                    isOpen &&
                    <div className="dropdown-tujuan-menu">

                    {options.map(option => (
                      <div key={option.value} onClick={() => handleOptionSelect(option.value)}>
                        {option.label}
                      </div>
                    ))}
                  </div>
                }
            </div>
        </div>
    );
}

export default DropdownTujuan;
