import React, {useEffect, useState} from "react";
import "./GearTile.css";

import Button from "../button/Button";
import {Icon} from '@iconify/react';

function GearItem() {
    const [iconChangeEdit, toggleIconChangeEdit] = useState(true);
    const [iconChangeDelete, toggleIconChangeDelete] = useState(true);
    const [iconChangeReset, toggleIconChangeReset] = useState(true);
    //state voor de distance
    const [currentDistanceDriven, setCurrentDistanceDriven] = useState(0);

    //even een waarde instellen als test, dit moet later via de database.
    const maxDistance = 5000;

    //data ophalen dit moet straks via database
    function fetchData() {
        const randomDistance = Math.random() * maxDistance;
        setCurrentDistanceDriven(randomDistance);
    }

    useEffect(() => {
        fetchData();

    }, [])

    // bereken de progress balk
   const progress = (currentDistanceDriven/maxDistance)*100;


    console.log(iconChangeEdit);

    function handleMouseDownEdit() {
        toggleIconChangeEdit(false);
        console.log(iconChangeEdit);
    }

    function handleMouseUpEdit() {
        toggleIconChangeEdit(true);
        console.log(iconChangeEdit);
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


    return (
        <>
            <div className='gear-item-styling'>
                <div>

                </div>
                <div className='gear-item-separation-line'></div>
                <div className='progress-bar'>
                    <div className='progress' style={{width:`${progress}%`}}></div>
                </div>
                <div className='gear-item-separation-line'></div>
                <div>
                    <Button className='gear-icon-button' onMouseDown={handleMouseDownEdit}
                            onMouseUp={handleMouseUpEdit}>
                        {iconChangeEdit ? (
                            <Icon icon="ri:edit-circle-line" width="50"/>
                        ) : (
                            <Icon icon="ri:edit-circle-fill" width="50"/>
                        )
                        }
                    </Button>
                    <Button className='gear-icon-button-red' onMouseDown={handleMouseDownDelete}
                            onMouseUp={handleMouseUpDelete}>
                        {iconChangeDelete ? (
                            <Icon icon="ic:baseline-remove-circle-outline" width="50"/>
                        ) : (
                            <Icon icon="ic:baseline-remove-circle" width="50"/>
                        )
                        }
                    </Button>
                    <Button className='gear-icon-button' onMouseDown={handleMouseDownReset}
                            onMouseUp={handleMouseUpReset}>
                        {iconChangeReset ? (
                            <Icon icon="material-symbols:change-circle-outline-rounded" width="50"/>
                        ) : (
                            <Icon icon="material-symbols:change-circle-rounded" width="50"/>
                        )
                        }
                    </Button>
                </div>
            </div>
        </>
    )

}

export default GearItem;