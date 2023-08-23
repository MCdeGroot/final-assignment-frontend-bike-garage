import React, {useContext, useEffect, useState} from "react";
import "./GearTile.css";

import Button from "../button/Button";
import {Icon} from '@iconify/react';
import {ReactComponent as Chain} from "../../assets/chain.svg"
import {ReactComponent as Brake} from "../../assets/break.svg"
import {ReactComponent as Cassette} from "../../assets/cassette.svg"
import {ReactComponent as Tire} from "../../assets/cassette.svg";
import Modal from "react-modal";
import {X} from "@phosphor-icons/react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import FormInputField from "../formInput/FormInputField";

function GearItem({
                      distanceDriven,
                      maxDistance,
                      selected,
                      partType,
                      setRefresh,
                      setIsEditing,
                      setModalPartIsOpen,
                      setSelectedBikePart
                  }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [iconChangeEdit, toggleIconChangeEdit] = useState(true);
    const [iconChangeDelete, toggleIconChangeDelete] = useState(true);
    const [iconChangeReset, toggleIconChangeReset] = useState(true);
    const [currentDistanceDriven, setCurrentDistanceDriven] = useState(0);
    const [hoveredDistance, setHoveredDistance] = useState(null);
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onTouched'});

    function fetchData() {
        setCurrentDistanceDriven(distanceDriven);
    }

    useEffect(() => {
        fetchData();
    }, []);

//bereken de progress van je items
    const progress = (currentDistanceDriven / maxDistance) * 100;

    function handleMouseDownEdit() {
        toggleIconChangeEdit(false);
    }

    function handleMouseUpEdit() {
        toggleIconChangeEdit(true);
        setIsEditing(true);
        setModalPartIsOpen(true);
        setSelectedBikePart(selected);
    }

    function handleMouseDownDelete() {
        toggleIconChangeDelete(false);

    }

    function handleMouseUpDelete() {
        toggleIconChangeDelete(true);
        openModalDeleteRide();
    }

    function handleMouseDownReset() {
        toggleIconChangeReset(false);
    }

    function handleMouseUpReset() {
        toggleIconChangeReset(true);
        openModalResetPart();
    }

    function selectedIcon(input) {
        switch (input) {
            case "CHAIN":
                return <Chain width='40' height='40'/>;

            case "FRONTBRAKEPAD":
                return <Brake width='40' height='40'/>;

            case "REARBRAKEPAD":
                return <Brake width='40' height='40'/>;

            case "CASSETTE":
                return <Cassette width='40' height='40'/>;

            case "FRONTTIRE":
                return <Tire width='40' height='40'/>;

            case "REARTIRE":
                return <Tire width='40' height='40'/>;

            default:
                return null;
        }
    }

    function formatString(str) {
        // Converteer alle letters naar kleine letters, behalve de eerste letter van elk woord
        const formattedStr = str.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());

        // Standaard retourneer de geformatteerde string
        return formattedStr;
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

    const [modalRideDeleteIsOpen, setModalRideDeleteIsOpen] = React.useState(false);
    const [modalResetIsOpen, setModalResetIsOpen] = React.useState(false);
    const [modalInstallationDate, setModalInstallationDate] = React.useState(false);

    function openModalDeleteRide() {
        setModalRideDeleteIsOpen(true);
    }

    function openModalResetPart() {
        setModalResetIsOpen(true);
    }

    function closeDeleteModal() {
        setModalRideDeleteIsOpen(false);
    }

    function closeResetModal() {
        setModalResetIsOpen(false);
        setModalInstallationDate(false);
    }

    async function deletePart() {
        const storedToken = localStorage.getItem('token');
        setLoading(true)
        try {
            await axios.delete(`http://localhost:8080/bikeparts/${selected.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                });
            closeDeleteModal();
        } catch (error) {
            setError(true);
            console.error(error);
        }
        setLoading(false);
        setRefresh(true);
    }

    async function resetPart(data) {
        const storedToken = localStorage.getItem('token')
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8080/bikeparts/${selected.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
                }
            });
            console.log("succesfully deleted")
        } catch (error) {
            setError(true);
            console.error(error);
        }
        try {
            const response = await axios.post(`http://localhost:8080/bikeparts?bikeId=${selected.bike.id}`, {
                partType: selected.partType,
                maxDistance: selected.maxDistance,
                installationDate: data.installationDate
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
                }
            });
            closeResetModal();
        } catch (error) {
            setError(true);
            console.error(error);
        }
        setRefresh(true);
    }

    return (
        <>
            <Modal
                isOpen={modalRideDeleteIsOpen} //if modal is open
                onRequestClose={closeDeleteModal} //what to do after modal close
                style={customStyles}
                contentLabel=""
            >
                <Button
                    className="icon-button-modal"
                    onClick={closeDeleteModal}
                ><X color="#1989AC" width='2rem' height='2rem'/>
                </Button>
                <h4>You are sure you want to delete this part?</h4>
                <Button
                    className="signin-button"
                    onClick={deletePart}
                >
                    Yes
                </Button>
                <Button
                    className="signin-button"
                    onClick={closeDeleteModal}>
                    No
                </Button>
            </Modal>
            <Modal
                isOpen={modalResetIsOpen} //if modal is open
                onRequestClose={closeResetModal} //what to do after modal close
                style={customStyles}
                contentLabel="">
                <Button
                    className="icon-button-modal"
                    onClick={closeResetModal}
                ><X color="#1989AC" width='2rem' height='2rem'/>
                </Button>
                <h4>You are sure you want to reset this part?</h4>
                <Button
                    onClick={() => {
                        setModalInstallationDate(true)
                    }}
                >
                    Yes
                </Button>
                <Button
                    onClick={closeResetModal}>
                    No
                </Button>
            </Modal>
            <Modal
                isOpen={modalInstallationDate} //if modal is open
                onRequestClose={() => {
                    setModalInstallationDate(false)
                }} //what to do after modal close
                style={customStyles}
                contentLabel=""
            >
                <Button
                    className="icon-button-modal"
                    onClick={() => {
                        setModalInstallationDate(false)
                    }}
                ><X color="#1989AC" width='2rem' height='2rem'/>
                </Button>
                <h4>When did you put this bike part on your bike?</h4>
                <form className='modal-wrapper' onSubmit={handleSubmit(resetPart)}>
                    <FormInputField
                        name="installationDate"
                        label="Installation date"
                        type="datetime-local"
                        placeholder=""
                        register={register}
                        errors={errors}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Installation date is required!",
                            }
                        }}
                    />
                    <Button className="signin-button">
                        RESET!
                    </Button>
                </form>
            </Modal>
            <div className='gear-item-styling'>
                <div className='gear-item-icon flex-row'>
                    <div>
                        {selectedIcon(partType)}
                    </div>
                    <h2>{formatString(partType)}</h2>
                </div>
                <div className='gear-item-separation-line'></div>
                <div
                    className='progress-bar'
                    // onMouseEnter={handleMouseEnterProgressBar}
                    onMouseEnter={() => {
                        setHoveredDistance(currentDistanceDriven)
                    }}
                    onMouseLeave={() => {
                        setHoveredDistance(null)
                    }}
                >
                    <div className={`progress ${progress >= 80 ? 'red-progress' : ''}`}
                         style={{width: `${progress}%`}}></div>
                    {hoveredDistance !== null && (
                        <>
                            <div>{`${hoveredDistance.toFixed(
                                0
                            )} km`}</div>
                            <div> {`${maxDistance.toFixed(
                                0
                            )} km`}</div>
                        </>
                    )}
                </div>
                <div className='gear-item-separation-line'></div>
                <div>
                    <Button
                        className='gear-icon-button'
                        onMouseDown={handleMouseDownEdit}
                        onMouseUp={handleMouseUpEdit}
                    >
                        {iconChangeEdit ? (
                            <Icon icon='ri:edit-circle-line' width='50'/>
                        ) : (
                            <Icon icon='ri:edit-circle-fill' width='50'/>
                        )}
                    </Button>
                    <Button
                        type='button'
                        className='gear-icon-button-red'
                        onMouseDown={handleMouseDownDelete}
                        onMouseUp={handleMouseUpDelete}
                    >
                        {iconChangeDelete ? (
                            <Icon icon='ic:baseline-remove-circle-outline' width='50'/>
                        ) : (
                            <Icon icon='ic:baseline-remove-circle' width='50'/>
                        )}
                    </Button>
                    <Button
                        className='gear-icon-button'
                        onMouseDown={handleMouseDownReset}
                        onMouseUp={handleMouseUpReset}
                    >
                        {iconChangeReset ? (
                            <Icon
                                icon='material-symbols:change-circle-outline-rounded'
                                width='50'
                            />
                        ) : (
                            <Icon icon='material-symbols:change-circle-rounded' width='50'/>
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default GearItem;