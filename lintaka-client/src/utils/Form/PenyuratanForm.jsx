import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from "../../components/Button/Button";
import PopupAdd from "../../components/Popup/PopupAdd";

const PenyuratanForm = () => {
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [nomor_hp, setNomor_hp] = useState("");
    const [wilayah, setWilayah] = useState("");
    const [tujuan, setTujuan] = useState("");
    const [isi, setIsi] = useState("");
    const [dokumen, setDokumen] = useState(null);
    const [showPopupAdd, setShowPopupAdd] = useState(false);
    const [validation, setValidation] = useState([]);

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
        console.log('Hey')
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('alamat', alamat);
        formData.append('nomor_hp', nomor_hp);
        formData.append('wilayah', wilayah);
        formData.append('tujuan', tujuan);
        formData.append('isi', isi);
        formData.append('dokumen', dokumen);

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/Penyuratan`, formData);
            console.log('Sukses mengirim surat');
            navigate('/');
        } catch (error) {
            setValidation(error.response.data.errors);
        }
        setShowPopupAdd(false);
    }

    const handleCancel = () => {
        console.log('Batal mengirim surat');
        setShowPopupAdd(false);
    }

    const options = [
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

    return(
        <form onSubmit={handleSubmit} className="form-input">
            <div className='form-input-row'>
                <label htmlFor="nama">Nama</label>
                <input id="nama" type="text" value={nama} onChange={(e) => setNama(e.target.value)} required/>
                {
                    validation.nama && (
                        <div className="alert-danger">
                            {validation.nama[0]}
                        </div>
                    )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor="alamat">Alamat</label>
                <input id="alamat" type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} required/>
                {
                    validation.alamat && (
                        <div className="alert-danger">
                            {validation.alamat[0]}
                        </div>
                    )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor="nomor_hp">No. Hp/WA</label>
                <input id="alamat" type="tel" pattern="[0-9]{10, 14}" value={nomor_hp} onChange={(e) => setNomor_hp(e.target.value)} required/>
                {
                    validation.nomor_hp && (
                        <div className="alert-danger">
                            {validation.nomor_hp[0]}
                        </div>
                    )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor="tujuan">Tujuan</label>
                <input id="tujuan" type="text" value={tujuan} onChange={(e) => setTujuan(e.target.value)} required/>
                {
                    validation.tujuan && (
                        <div className="alert-danger">
                            {validation.tujuan[0]}
                        </div>
                    )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor="wilayah">Wilayah</label>
                <select id="wilayah" value={wilayah} onChange={(e) => setWilayah(e.target.value)} required>
                    <option value="">Pilih wilayah</option>
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

export default PenyuratanForm;