import React, {useContext, useEffect, useState} from "react";
import "./GearTile.css"
import GearItem from "./GearItem";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import BikeTile from "../bikeTile/BikeTile";

/*TODO mijn plaatjes laden niet*/
function GearTile({bike}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [gearData, setGearData] = useState([]);



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
                console.log(response.data) /// dit nog weghalen
            } catch (error) {
                console.error(error)
            }
        }

        fetchGearData();
    }, [])



    return (
        <>

            <div className="geartile-outer-wrapper">
                <section className="geartile-top-styling">
                    <h2>{bike.brand}</h2>
                    <img src="../../assets/roadbike.svg" alt=""/>
                </section>
                <section className='geartile-middle-styling'>
                    <h2>Bike parts</h2>
                    <div className='gear-separation-line-middle'></div>
                    <h2>Distance driven</h2>
                    <div className='gear-separation-line-middle'></div>
                </section>
                <section className='geartile-bottom-styling'>
                    {gearData.map((bikePart) => {
                        return (
                            <GearItem
                                key={bikePart.id}
                                distanceDriven={bikePart.currentDistanceDriven}
                                maxDistance={bikePart.maxDistance}
                                selected={bikePart}
                            >
                            </GearItem>
                        )
                    })
                    }

                </section>
            </div>
        </>
    )
}

export default GearTile;