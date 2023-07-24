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

function GearItem({distanceDriven, maxDistance, selected, changeRefreshState}) {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [iconChangeEdit, toggleIconChangeEdit] = useState(true);
    const [iconChangeDelete, toggleIconChangeDelete] = useState(true);
    const [removedPart, setRemovedPart] = useState(false);
    const [iconChangeReset, toggleIconChangeReset] = useState(true);
    const [currentDistanceDriven, setCurrentDistanceDriven] = useState(0);
    const [hoveredDistance, setHoveredDistance] = useState(null);
    const [refresh, setRefresh] = useState(false)

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
    }

    function handleMouseDownDelete() {
        toggleIconChangeDelete(false);

    }

    function handleMouseUpDelete() {
        toggleIconChangeDelete(true);
        console.log("klik");
        openModalDeleteRide();
    }

    function handleMouseDownReset() {
        toggleIconChangeReset(false);
    }

    function handleMouseUpReset() {
        toggleIconChangeReset(true);
        console.log("klik");
        openModalResetPart();
    }

    function setIcon(partType) {
        switch (partType) {
            case "CHAIN":
                return <Chain width='40' height='40'/>;
                break;
            case "FRONTBRAKEPAD":
                return <Brake width='40' height='40'/>;
                break;
            case "REARBRAKEPAD":
                return <Brake width='40' height='40'/>;
                break;
            case "CASSETTE":
                return <Cassette width='40' height='40'/>;
                break;
            case "FRONTTIRE":
                return <Tire width='40' height='40'/>;
                break;
            case "REARTIRE":
                return <Tire width='40' height='40'/>;
                break;
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

    //TODO below seems to be unneccesary?
    Modal.setAppElement('#root');

    const [modalRideDeleteIsOpen, setModalRideDeleteIsOpen] = React.useState(false);
    const [modalResetIsOpen, setModalResetIsOpen] = React.useState(false);
    function openModalDeleteRide(){
        setModalRideDeleteIsOpen(true);
    }

    function openModalResetPart(){
        setModalResetIsOpen(true);
    }

    function closeDeleteModal(){
        setModalRideDeleteIsOpen(false);
    }
    function closeResetModal(){
        setModalResetIsOpen(false);
    }

    // TODO de state moet nog gerefresehd worden en helemaal terug gegeven worden om useeffect te triggerren
    async function deletePart(){
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
        }catch (error) {
            setError(true);
            console.error(error);
        }
        setLoading(false);
        setRefresh(!refresh)
        changeRefreshState(refresh);
    }

    async function resetPart(){
        const storedToken = localStorage.getItem('token')
        setLoading(true);

        try {
            await axios.delete(`http://localhost:8080/bikeparts/${selected.id}`,{
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
        try{
            const today = new Date();
            const response = await axios.post(`http://localhost:8080/bikeparts?bikeId=${selected.bike.id}`, {
                partType: selected.partType,
                maxDistance: selected.maxDistance,
                installationDate: today.toISOString()
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
                }
            });
            setRemovedPart(true);
            console.log(response);
        } catch (error) {
            setError(true);
            console.error(error);
        }
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
                    onClick={deletePart}
                >
                    Yes
                </Button>
                <Button
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
                    onClick={resetPart}
                >
                    Yes
                </Button>
                <Button
                    onClick={closeResetModal}>
                    No
                </Button>

            </Modal>

            {/*TODO check of dit goed gaat met selected. Dat ik het Part gewoon doorgeef aan deze component*/}

            <div className='gear-item-styling'>
                <div className='gear-item-icon flex-row'>
                    <div>
                        {setIcon(selected.partType)}
                    </div>
                    <h2>{formatString(selected.partType)}</h2>
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
                    <div className={`progress ${progress >= 80 ? 'red-progress' : ''}`} style={{width: `${progress}%`}}></div>
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
                        type = 'button'
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