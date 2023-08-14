import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import PopupAdd from "../../components/Popup/PopupAdd";

const SuratDinasForm = () => {
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const [tujuan, setTujuan] = useState("");
    const [dokumen, setDokumen] = useState(null);
    const [showPopupAdd, setShowPopupAdd] = useState(false);
    const [validation, setValidation] = useState([]);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    const handleIsiChange = (event) => {
        setIsi(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowPopupAdd(true);
    }

    const handleDokumenChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setDokumen(file);
        }
        reader.readAsDataURL(file);
    }

    const handleConfirm = async () => {
        const formData = new FormData();
        formData.append('judul', judul);
        formData.append('tujuan', tujuan)
        formData.append('isi', isi);
        formData.append('dokumen', dokumen);

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.post(`${import.meta.env.VITE_API_URL}/Surat Dinas`, formData);
            console.log('Sukses mengirim surat');
            navigate('/BerandaSuratDinas');
        } catch(error) {
            setValidation(error.response.data.errors);
        }
        setShowPopupAdd(false);
    }

    const handleCancel = () => {
        console.log('Batal mengirim surat');
        setShowPopupAdd(false);
    }

    let options;
    if (role === 'kecamatan') {
        options = [
            'Semua Kelurahan',
            'Sungguminasa',
            'Bonto-bontoa',
            'Batangkaluku',
            'Tompobalang',
            'Katangka',
            'Pandang-pandang',
            'Tombolo',
            'Kalegowa',
            'Samata',
            'Romang Polong',
            'Paccinongang',
            'Tamarunang',
            'Bontoramba',
            'Mawang'
        ]
    } else {
        options = [
            'Semua Kelurahan',
            'Somba Opu',
            'Sungguminasa',
            'Bonto-bontoa',
            'Batangkaluku',
            'Tompobalang',
            'Katangka',
            'Pandang-pandang',
            'Tombolo',
            'Kalegowa',
            'Samata',
            'Romang Polong',
            'Paccinongang',
            'Tamarunang',
            'Bontoramba',
            'Mawang'
        ] 
    }

    return(
        <form onSubmit={handleSubmit} className="form-input">
            <div className='form-input-row'>
                <label htmlFor="judul">Judul</label>
                <input id="judul" type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required/>
                {
                    validation.judul && (
                        <div className="alert-danger">
                            {validation.judul[0]}
                        </div>
                    )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor="tujuan">Tujuan Surat</label>
                <select id="tujuan" value={tujuan} onChange={(e) => setTujuan(e.target.value)} required>
                    <option value="">Pilih Tujuan Surat</option>
                    {
                        options && options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))
                    }
                </select>
            </div>
            <div className="form-input-row">
                <label htmlFor='fileInput'>Dokumen</label>
                <input id='fileInput' type='file' onChange={handleDokumenChange}/>
                {
                    validation.dokumen && (
                        <div className="alert-danger">
                            {validation.dokumen[0]}

                        </div>
                        )
                }
            </div>
            <div className="form-input-row">
                <label htmlFor="isi">Isi</label>
                <textarea
                    id="isi"
                    value={isi}
                    onChange={handleIsiChange}
                    style={{
                        minHeight: '20px',
                        maxHeight: '2000px',
                        height: 'auto',
                        resize: 'vertical'
                    }}
                    rows={Math.min(20, isi?.split('\n').length)}
                />
                {
                    validation.isi && (
                        <div className="alert-danger">
                            {validation.isi[0]}
                            </div>
                    )
                }
            </div>
            <div className="submit-button-container">
                <Button type='submit' sentence={"Kirim Surat"}/>
                {
                    showPopupAdd && (
                        <PopupAdd
                            message="Apakah Anda yakin?"
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                    )
                }
            </div>
        </form>
    );
}

export default SuratDinasForm;