import React, { useState } from 'react';
import PopupAdd from '../../components/Popup/PopupAdd';
import axios from 'axios';
import subString from '../subString';

const TableBerita = (navigateToEdit) => {
    const [showPopupDeleted, setShowPopupDeleted] = useState({});

    const deleteHandler = async (id) => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.delete(`${import.meta.env.VITE_API_URL}/Konten Informasi/${id}`)
        .then(() => {
            console.log('Sukses Menghapus Data Admin');
            window.location.reload(false);
        })
    }

    const handleConfirmEdit = (row) => {
        navigateToEdit(`/TambahBerita?id=${row.id}`);
    };

    const handleConfirm = (id) => {
        deleteHandler(id);
        console.log("Data telah dihapus.");
        const updatedShowPopupDeleted = { ...showPopupDeleted };
        delete updatedShowPopupDeleted[id];
        setShowPopupDeleted(updatedShowPopupDeleted);
    };

    const handleCancel = () => {
        console.log("Batal menambahkan data.");
        setShowPopupDeleted({});
    };

    const handleButtonClick = (rowId) => {
        setShowPopupDeleted(prevState => ({
            ...prevState,
            [rowId]: true
        }));
    };

    return [
        {
            name: "No",
            cell: (row, index) => <div>{index + 1}</div>,
            sortable: true
        },
        {
            name: "Judul Berita",
            selector: row => row.judul,
            sortable: true
        },
        {
            name: "Foto",
            cell: (row) => (
                <img src={row.foto} alt="Gambar Berita" style={{ width: "100px", height: "auto" }} />
              ),
            sortable: true
        },
        {
            name: "Isi",
            selector: row => subString(row.isi, 30),
            sortable: true
        },
        {
            name: "",
            selector: row => (
                <div>
                    <button className="edit-button" onClick={() => handleConfirmEdit(row)}>
                        <img src="assets/edit-button.svg"/>
                    </button>
                    <button className="delete-button" onClick={() => handleButtonClick(row.id)}><img src="assets/delete-button.svg"/>
                    </button>
                    {
                        showPopupDeleted[row.id] && (
                            <PopupAdd
                            message={"Apakah Anda yakin ingin menghapus data?"}
                            onConfirm={() => handleConfirm(row.id)}
                            onCancel={handleCancel} 
                            />
                        )
                    }
                </div>
            ),
            sortable: true
        }
    ]
}

export default TableBerita;