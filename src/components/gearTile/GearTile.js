import React, {useContext, useEffect, useState} from "react";
import "./GearTile.css"
import GearItem from "./GearItem";
import axios from "axios";
import Button from "../button/Button";
import {PlusCircle, X} from "@phosphor-icons/react";
import Modal from "react-modal";

import {useForm} from "react-hook-form";
import GearForm from "../formInput/GearForm";
import {errorHandler} from "../../helper/errorHandler";

function GearTile({bike}) {

    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onTouched'});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [icon, toggleIcon] = useState(false);
    const [gearData, setGearData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedBikePart, setSelectedBikePart] = useState('');
    const [refresh, setRefresh] = useState(false);


    //data ophalen van de bikes
    useEffect(() => {
        const controller = new AbortController();

        async function fetchGearData() {
            const storedToken = localStorage.getItem('token');
            setLoading(true)
            try {
                setError(false);
                const response = await axios.get(`http://localhost:8080/bikeparts?bikeId=${bike.id}`, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                setGearData(response.data);
            } catch (e) {
                setErrorMessage(errorHandler(e))
                setError(true)
                console.error(e)
            }
        }

        fetchGearData();
        setRefresh(false);
    }, [refresh])

    async function handleFormBikePartSubmit(data) {
        const storedToken = localStorage.getItem('token');
        setLoading(true)
        if (isEditing === false) {


            try {
                const response = await axios.post(`http://localhost:8080/bikeparts?bikeId=${bike.id}`, {
                    partType: data.partType,
                    maxDistance: data.maxDistance,
                    installationDate: data.installationDate
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                // console.log(response);
            } catch (e) {
                setErrorMessage(errorHandler(e))
                setError(true)
                console.error(e)
            }
            setRefresh(!refresh);
            closeModal();
        } else {
            try {
                const response = await axios.put(`http://localhost:8080/bikeparts/${selectedBikePart.id}`, {
                    partType: selectedBikePart.partType,
                    maxDistance: data.maxDistance,
                    installationDate: data.installationDate
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                // console.log(response);
            } catch (e) {
                setErrorMessage(errorHandler(e))
                setError(true)
                console.error(e)
            }
            setRefresh(!refresh);
            closeModal();
        }
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
        },
    };

    Modal.setAppElement('#root');


    const [modalPartIsOpen, setModalPartIsOpen] = React.useState(false);

    function openModalPart() {
        setModalPartIsOpen(true);
        toggleIcon(false);
    }

    function closeModal() {
        setModalPartIsOpen(false);
        setIsEditing(false);
        toggleIcon(false);
    }


    return (
        <>
            <div className="geartile-outer-wrapper">
                <div>
                    <Modal
                        isOpen={modalPartIsOpen} //if modal is open
                        onRequestClose={closeModal} //what to do after modal close
                        style={customStyles}
                        contentLabel="Add bike part"
                    >
                        <Button
                            className="icon-button-modal"
                            onClick={closeModal}
                        ><X color="#1989AC" width='2rem' height='2rem'/>
                        </Button>
                        <GearForm onSubmit={handleSubmit(handleFormBikePartSubmit)}
                                  register={register}
                                  errors={errors}
                                  onClick={closeModal}
                                  initialValue={selectedBikePart}
                                  isEditing={isEditing}
                                  setRefresh={setRefresh}
                        >
                        </GearForm>
                    </Modal>
                </div>
                <section className="geartile-top-styling">
                    <h2>{bike.brand} {bike.model}</h2>
                </section>
                <section className='geartile-middle-styling'>
                    <h2>Bike parts</h2>
                    <div className='gear-separation-line-middle'></div>
                    <h2>Distance driven</h2>
                    <div className='gear-separation-line-middle'></div>
                </section>
                <section className='geartile-bottom-styling'>
                    {error && errorMessage}
                    {gearData.map((bikePart) => {
                        return (
                            <GearItem
                                key={bikePart.id}
                                distanceDriven={bikePart.currentDistanceDriven}
                                maxDistance={bikePart.maxDistance}
                                selected={bikePart}
                                partType={bikePart.partType}
                                setIsEditing={setIsEditing}
                                setModalPartIsOpen={setModalPartIsOpen}
                                setSelectedBikePart={setSelectedBikePart}
                                setRefresh={setRefresh}
                            >
                            </GearItem>
                        )
                    })
                    }
                    <div className='icon-button-add'>
                        <Button
                            type="button"
                            className='icon-button-add'>
                            <PlusCircle size="2rem" weight={icon ? "fill" : "regular"} onClick={() => {
                                openModalPart();
                                toggleIcon(!icon);
                            }}/>
                        </Button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default GearTile;