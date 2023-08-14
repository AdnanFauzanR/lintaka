import React, { useState } from 'react';
import "./DropdownWilayah.css";

const DropdownWilayah = ({ selectedWilayah, onWilayahChange}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    }

    const handleOptionSelect = (selectedValue) => {
        onWilayahChange(selectedValue);
        setIsOpen(false);
    }

    let options = [
        {
            value: 'Semua Kelurahan',
            label: 'Semua Kelurahan'
        },
        {
            value: 'Sungguminasa',
            label: 'Sungguminasa'
        },
        {
            value: 'Bonto-bontoa',
            label: 'Bonto-bontoa'
        },
        {
            value: 'Batangkaluku',
            label: 'Batangkaluku'
        },
        {
            value: 'Tompobalang',
            label: 'Tompobalang'
        },
        {
            value: 'Katangka',
            label: 'Katangka'
        },
        {
            value: 'Pandang-pandang',
            label: 'Pandang-pandang'
        },
        {
            value: 'Tombolo',
            label: 'Tombolo'
        },
        {
            value: 'Kalegowa',
            label: 'Kalegowa'
        },
        {
            value: 'Samata',
            label: 'Samata'
        },
        {
            value: 'Romang Polong',
            label: 'Romang Polong'
        },
        {
            value: 'Paccinongang',
            label: 'Paccinongang'
        },
        {
            value: 'Tamarunang',
            label: 'Tamarunang'
        },
        {
            value: 'Bontoramba',
            label: 'Bontoramba'
        },
        {
            value: 'Mawang',
            label: 'Mawang'
        },
    ];

    return (
        <div className="dropdown-wilayah-container">
            <div className="dropdown-wilayah">
                <button className="dropdown-wilayah-button" onClick={handleDropdownClick}>
                    <span className="dropdown-wilayah-button-label">
                        {selectedWilayah || "Tujuan Surat"}
                    </span>
                    <div>
                        <img className="dropdown-icon" src="assets/button-dropdown.svg"/>
                    </div>
                    <i className={isOpen ? "fa fa-caret-up" : "fa fa-caret-down"}></i>
                </button>
                {
                    isOpen &&
                    <div className="dropdown-wilayah-menu">

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

export default DropdownWilayah;