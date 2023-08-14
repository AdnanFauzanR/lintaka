import React, { useState } from 'react';
import PopupAdd from '../../components/Popup/PopupAdd';
import axios from 'axios';

const TableAdmin = (navigateToEdit) => {
    const [showPopupDeleted, setShowPopupDeleted] = useState({});

    const deleteHandler = async (id) => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.delete(`${import.meta.env.VITE_API_URL}/Admin/${id}`)
            .then(() => {
                console.log('Sukses Menghapus Data Admin');
                window.location.reload(false);
            });
    };

    const handleConfirmEdit = (row) => {
        navigateToEdit(`/TambahAdmin?id=${row.id}`);
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
            name: "Nama Lengkap",
            selector: row => row.nama,
            sortable: true
        },
        {
            name: "Wilayah",
            selector: row => row.wilayah,
            sortable: true
        },
        {
            name: "Username",
            selector: row => row.username,
            sortable: true
        },
        {
            name: "",
            selector: row => (
                <div>
                    <button className="edit-button" onClick={() => handleConfirmEdit(row)}>
                        <img src="assets/edit-button.svg" alt="Edit" />
                    </button>
                    <button className="delete-button" onClick={() => handleButtonClick(row.id)}>
                        <img src="assets/delete-button.svg" alt="Delete" />
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
    ];
}

export default TableAdmin;
