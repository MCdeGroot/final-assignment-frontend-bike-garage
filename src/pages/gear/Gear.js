import GearTile from "../../components/gearTile/GearTile";

import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {errorHandler} from "../../helper/errorHandler";

function Gear() {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
                setLoading(false);
            } catch (e) {
                setErrorMessage(errorHandler(e))
                setError(true)
                console.error(e)
            }
        }

        fetchBikeData();
    }, [])


    return (
        <>
            <main className='outer-container'>
                <div className='inner-container'>
                    {loading && <p>Loading page...</p>}
                    {error && errorMessage}
                    {bikeData.map((bike) => {
                        return (
                            <GearTile
                                key={bike.id}
                                bike={bike}
                            >
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