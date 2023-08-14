import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import PopupAdd from "../../components/Popup/PopupAdd";

const BeritaForm = ({editData}) => {
    const [judul, setJudul] = useState(editData?.judul || "");
    const [isi, setIsi] = useState(editData?.isi || "");
    const [foto, setFoto] = useState(null);
    const [showPopupAdd, setShowPopupAdd] = useState(false);
    const [validation, setValidation] = useState([]);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (editData) {
            setJudul(editData.judul || "");
            setIsi(editData.isi || "");
        }
    }, [editData]);

    const handleIsiChange = (event) => {
        setIsi(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowPopupAdd(true);
    }

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setFoto(file);
        }
        reader.readAsDataURL(file);
    }

    const handleConfirm = async () => {
        const formData = new FormData();
        formData.append('judul', judul);
        formData.append('isi', isi);
        formData.append('foto', foto);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const url = editData ? `${import.meta.env.VITE_API_URL}/Konten Informasi/${editData.id}` : `${import.meta.env.VITE_API_URL}/Konten Informasi`;

        try {
            if(editData) {
                await axios.post(url, formData);
                console.log('Sukses mengubah berita');
            } else {
                await axios.post(url, formData);
                console.log('Sukses menambahkan berita');
            }
            navigate('/BerandaBerita');
        } catch (error) {
            console.log(error)
            setValidation(error.response.data.errors);
        }
        setShowPopupAdd(false);
    }

    const handleCancel = () => {
        console.log('Batal menambahkan berita');
        setShowPopupAdd(false);
    }

    return(
        <form onSubmit={handleSubmit} className="form-input">
            <div className='form-input-row'>
                    <label htmlFor='judul'>Judul</label>
                    <input id='judul' type='text' value={judul} onChange={(e) => setJudul(e.target.value)} />
                    {
              validation.judul && (
                <div className="alert-danger">
                  {validation.judul[0]}
                </div>
              )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor='fileInput'>Pilih Foto</label>
                <input id='fileInput' type='file' onChange={handleFotoChange}/>
                {
              validation.foto && (
                <div className="alert-danger">
                  {validation.foto[0]}
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
                <Button type='submit' sentence={"Tambah Berita"}/>
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

export default BeritaForm;