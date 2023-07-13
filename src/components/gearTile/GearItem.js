import React, {useEffect, useState} from "react";
import "./GearTile.css";

import Button from "../button/Button";
import {Icon} from '@iconify/react';
import {ReactComponent as Chain} from "../../assets/chain.svg"
import {ReactComponent as Brake} from "../../assets/break.svg"
import {ReactComponent as Cassette} from "../../assets/cassette.svg"
import {ReactComponent as Tire} from "../../assets/cassette.svg";

function GearItem({partType, distanceDriven, maxDistance}) {
    const [iconChangeEdit, toggleIconChangeEdit] = useState(true);
    const [iconChangeDelete, toggleIconChangeDelete] = useState(true);
    const [iconChangeReset, toggleIconChangeReset] = useState(true);
    const [currentDistanceDriven, setCurrentDistanceDriven] = useState(0);
    const [partTypeString, setPartTypeString] = useState('');
    const [hoveredDistance, setHoveredDistance] = useState(null);

    //voor nu even wat defaultwaarden berekenen dit wordt straks uit de database gehaald
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
    }

    function handleMouseDownReset() {
        toggleIconChangeReset(false);
    }

    function handleMouseUpReset() {
        toggleIconChangeReset(true);
    }

    function setIcon(partType) {
        switch (partType) {
            case "CHAIN":
                return <Chain width='40'/>;
                break;
            case "FRONTBRAKEPAD":
                return <Brake width='40'/>;
                break;
            case "REARBRAKEPAD":
                return <Brake width='40'/>;
                break;
            case "CASSETTE":
                return <Cassette width='40'/>;
                break;
            case "FRONTTIRE":
                return <Tire width='40'/>;
                break;
            case "REARTIRE":
                return <Tire width='40'/>;
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

    return (
        <>
            <div className='gear-item-styling'>
                <div className='gear-item-icon flex-row'>
                    <div>
                        {setIcon(partType)}
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
                    <div className='progress' style={{width: `${progress}%`}}></div>
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