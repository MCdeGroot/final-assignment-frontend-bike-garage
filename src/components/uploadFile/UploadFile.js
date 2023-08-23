import React, {useContext, useState} from 'react';
import "./UploadFile.css"
import FormInputField from "../formInput/FormInputField";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button";
import Modal from "react-modal";
import {X} from "@phosphor-icons/react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function UploadFile({openModalOnClick, changeUploadState, selectedItem}) {


    const {user} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}, reset} = useForm({mode: 'onTouched'});
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    function handleImageChange(e) {
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    async function sendImage() {
        // data.preventDefault();
        const storedToken = localStorage.getItem('token');
        setLoading(true)
        const formData = new FormData();
        formData.append("file", file);
        // console.log(formData)
        try {
            const response = await axios.post(`http://localhost:8080/rides/${selectedItem.id}/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${storedToken}`
                }
            })
        } catch (error) {
            console.error(error)
        }
        navigate("/rides")
    }

    // ...................MODAL
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: "#FBF7F4FF",
            border: "solid 3px #1989AC",
            borderRadius: "10px",
        },
    }

    const [modalIsOpen, setModalIsOpen] = React.useState(openModalOnClick);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
        changeUploadState(false);
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen} //if modal is open
                onRequestClose={closeModal} //what to do after modal close
                style={customStyles}
                contentLabel="Add review"
            >
                <Button
                    className="icon-button-modal"
                    onClick={closeModal}><X color="#1989AC" width='2rem' height='2rem'/></Button>
                <form onSubmit={sendImage} className="modal-wrapper">
                    <FormInputField
                        name="file"
                        label="Add file"
                        type="file"
                        register={register}
                        errors={errors}
                        onChange={handleImageChange}
                    />
                    {previewUrl &&
                        <div className="flex-column">
                            Preview:
                            <img src={previewUrl} alt="Chosen file" className="image-preview"/>
                        </div>}
                    <Button type="submit" className='signin-button'>
                        Add File!
                    </Button>
                </form>
            </Modal>
            <Button onClick={openModal}>
                Add File!
            </Button>
        </div>
    )
}

export default UploadFile;