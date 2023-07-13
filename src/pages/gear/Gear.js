import GearTile from "../../components/gearTile/GearTile";

import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import GearItem from "../../components/gearTile/GearItem";


function Gear() {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [bikeData, setBikeData] = useState([]);

    //data ophalen van de bikes
    useEffect(() => {
        const controller = new AbortController();
        async function fetchBikeData() {
            const storedToken = localStorage.getItem('token');
            setLoading(true)
            try {
                setError(false);
                const response = await axios.get(`http://localhost:8080/bikes/${user.username}`, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                setBikeData(response.data);
                console.log(response.data) /// dit nog weghalen
            } catch (error) {
                console.error(error)
            }
        }

        fetchBikeData();
    }, [])


    return (
        <>
            <main className='outer-container'>
                <div className='inner-container'>
                    <h1>GEAR</h1>
                    {bikeData.map((bike) => {
                        return (
                            <GearTile bike={bike}>
                            </GearTile>
                        )
                    })
                    }
                </div>
            </main>


        </>
    );
}

export default Gear;