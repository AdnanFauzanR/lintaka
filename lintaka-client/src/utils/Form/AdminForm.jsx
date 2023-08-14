import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button/Button';
import PopupAdd from '../../components/Popup/PopupAdd';

const AdminForm =({editData}) => {
    const [nama, setNama] = useState(editData?.nama || "");
    const [username, setUsername] = useState(editData?.username || "");
    const [wilayah, setWilayah] = useState(editData?.wilayah || "");
    const [password, setPassword] = useState("");
    const [pass_confirm, setPassConfirm] = useState("");
    const [showPopupAdd, setShowPopupAdd] = useState(false);
    const [validation, setValidation] = useState([]);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (editData) {
            setNama(editData.nama || "");
            setUsername(editData.username || "");
            setWilayah(editData.wilayah || "")
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowPopupAdd(true);
    }

    const handleConfirm = async () => {
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('wilayah', wilayah);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('password_confirmation', pass_confirm);

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const url = editData ? `${import.meta.env.VITE_API_URL}/Admin/${editData.id}` : `${import.meta.env.VITE_API_URL}/register`;
        
        try {
            if(editData) {
                await axios.post(url, formData);
                console.log('Sukses mengubah admin');
            } else {
                await axios.post(url, formData);
                console.log('Sukses menambah admin');
            }
            navigate('/BerandaAdmin')
        } catch (error) {
            setValidation(error.response.data.errors)
        }
        setShowPopupAdd(false);
    }

    const handleCancel = () => {
        console.log('Batal menambahkan admin');
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
                    <label htmlFor='nama'>Nama</label>
                    <input id='nama' type='text' value={nama} onChange={(e) => setNama(e.target.value)} />
                    {
              validation.nama && (
                <div className="alert-danger">
                  {validation.nama[0]}
                </div>
              )
                }
            </div>
            <div className='form-input-row'>
                    <label htmlFor='username'>Username</label>
                    <input id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                    {
              validation.username && (
                <div className="alert-danger">
                  {validation.username[0]}
                </div>
              )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor="wilayah">Wilayah</label>
                <select id="wilayah" value={wilayah} onChange={(e) => setWilayah(e.target.value)} required>
                    <option value="">
                        {
                            editData.wilayah ? wilayah : "Pilih Wilayah"
                        }
                    </option>
                    {
                        options && options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))
                    }
                </select>
            </div>
            <div className='form-input-row'>
                <label htmlFor='password'>Password</label>
                <input id='password' type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                {
              validation.password && (
                <div className="alert-danger">
                  {validation.password[0]}
                </div>
              )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor='pass_confirm'>Konfirmasi Password</label>
                <input id='pass_confirm' type='text' value={pass_confirm} onChange={(e) => setPassConfirm(e.target.value)} />
            </div>
            <div className="submit-button-container">
                <Button type='submit' sentence={"Tambah Admin"}/>
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

export default AdminForm;