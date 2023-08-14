import React, { useState } from "react";
import Header from './../../components/Header/Header';
import Sidebar from "../../components/Sidebar/Sidebar";
import DropdownTujuan from "../../components/Dropdown/DropdownTujuan/DropdownTujuan";
import DropdownJenis from "../../components/Dropdown/DropdownJenis/DropdownJenis";
import "./Pengaduan.css";
import PengaduanForm from "../../utils/Form/PengaduanForm";

const Pengaduan = () => {
    const [selectedTujuan, setSelectedTujuan] = useState("");
    const [selectedJenis, setSelectedJenis] = useState("");

    const handleTujuanChange = (value) => {
        setSelectedTujuan(value);
    }

    const handleJenisChange = (value) => {
        setSelectedJenis(value);
    }

    return(
        <div className="container">
            <div className="header">
                <Header />
            </div>
            <div className="nav">
                <Sidebar />
            </div>
            <div className="content">
                <h3>Pengaduan</h3>
                <div className="pengaduan-dropdown-container">
                    <DropdownTujuan selectedTujuan={selectedTujuan} onTujuanChange={handleTujuanChange}/>
                    <DropdownJenis selectedJenis={selectedJenis} onJenisChange={handleJenisChange} />
                </div>
                <div className="form-container">
                    <PengaduanForm tujuan_pengaduan={selectedTujuan} jenis_pengaduan={selectedJenis}/>
                </div>
            </div>
        </div>
    );
}

export default Pengaduan;