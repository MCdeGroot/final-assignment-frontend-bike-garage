import React, {useEffect, useState} from "react";
import "./GearTile.css";

import Button from "../button/Button";
import {Icon} from '@iconify/react';
import {ReactComponent as BikeIcon} from "../../assets/roadbike.svg"

function GearItem() {
    const [iconChangeEdit, toggleIconChangeEdit] = useState(true);
    const [iconChangeDelete, toggleIconChangeDelete] = useState(true);
    const [iconChangeReset, toggleIconChangeReset] = useState(true);
    const [currentDistanceDriven, setCurrentDistanceDriven] = useState(0);
    const [hoveredDistance, setHoveredDistance] = useState(null);

    const maxDistance = 5000;

    //voor nu even wat defaultwaarden berekenen dit wordt straks uit de database gehaald
    function fetchData() {
        const randomDistance = Math.random() * maxDistance;
        setCurrentDistanceDriven(randomDistance);
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

    // function handleMouseEnterProgressBar() {
    //     setHoveredDistance(currentDistanceDriven);
    // }

    function handleMouseLeaveProgressBar() {
        setHoveredDistance(null);
    }

    return (
        <>
            <div className='gear-item-styling'>
                <div className='gear-item-icon'>
                    <BikeIcon/>
                    <h2>Chain</h2>
                </div>
                <div className='gear-item-separation-line'></div>
                <div
                    className='progress-bar'
                    // onMouseEnter={handleMouseEnterProgressBar}
                    onMouseEnter = {()=>{setHoveredDistance(currentDistanceDriven)}}
                    onMouseLeave={handleMouseLeaveProgressBar}
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