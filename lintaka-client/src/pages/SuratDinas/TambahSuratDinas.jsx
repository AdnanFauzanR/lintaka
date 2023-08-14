import React from "react";
import Header from "../../components/Header/Header";
import SidebarKelurahan from "../../components/Sidebar/SidebarKelurahan";
import SidebarKecamatan from "../../components/Sidebar/SidebarKecamatan";
import SuratDinasForm from "../../utils/Form/SuratDinasForm";
import { useNavigate } from "react-router-dom";
import checkTokenExpiration from "../../utils/checkTokenExpiration";

const TambahSuratDinas = () => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/login');
        } else if (checkTokenExpiration()) {
            navigate('/login');
        }
    })

    return(
        <div className="container">
            <div className="header">
                <Header />
            </div>
            <div className="nav">
                {
                    role === "kelurahan" ? (
                        <SidebarKelurahan />
                    ) : role === "kecamatan" ? (
                        <SidebarKecamatan />
                    ) : (
                        navigate('/login')
                    )
                }
            </div>
            <div className="content">
                <h3>Tambah Surat Dinas</h3>
                <div className="form-container">
                    <SuratDinasForm />
                </div>
            </div>
        </div>
    );
}

export default TambahSuratDinas;