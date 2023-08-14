import React from "react";
import './Penyuratan.css';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import PenyuratanForm from "../../utils/Form/PenyuratanForm";

const Penyuratan = () => {
    return(
        <div className="container">
            <div className="header">
                <Header />
            </div>
            <div className="nav">
                <Sidebar />
            </div>
            <div className="content">
                <h3>Penyuratan</h3>
                <div className="form-container">
                    <PenyuratanForm />
                </div>
            </div>
        </div>
    );
}

export default Penyuratan;