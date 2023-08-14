import React, { useState } from 'react';
import "./DropdownJenis.css";

const DropdownJenis = ({selectedJenis, onJenisChange}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    }

    const handleOptionSelect = (selectedValue) => {
        onJenisChange(selectedValue);
        setIsOpen(false);
    }

    let options = [
        {
            value: "Publik",
            label: "Publik"
        },
        {
            value: "Rahasia",
            label: "Rahasia"
        }
    ];

    return(
        <div className="dropdown-jenis-container">
            <div className="dropdown-jenis">
                <button className="dropdown-jenis-button" onClick={handleDropdownClick}>
                    <span className="dropdown-jenis-button-label">{selectedJenis || "Jenis Pengaduan"}</span>
                    <div>
                        <img className="dropdown-icon" src="assets/button-dropdown.svg"/>
                    </div>
                    <i className={isOpen ? "fa fa-caret-up" : "fa fa-caret-down"}></i>
                </button>
                {
                   isOpen &&
                   <div className="dropdown-jenis-menu">

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

export default DropdownJenis;