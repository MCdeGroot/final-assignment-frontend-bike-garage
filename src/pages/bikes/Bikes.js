import React, {useContext, useEffect, useState} from "react";
import BikeTile from "../../components/bikeTile/BikeTile";
import "./Bikes.css"
import axios from "axios";
import Button from "../../components/button/Button";
import {NavLink} from "react-router-dom";
import {PlusCircle} from "@phosphor-icons/react";
import {AuthContext} from "../../context/AuthContext";

function Bikes() {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [bikes, setBikes] = useState([]);

    //data ophalen van de bikes
    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
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
                setBikes(response.data);
                console.log(response.data) /// dit nog weghalen
            } catch (error) {
                console.error(error)
            }
        }

        fetchData();
    }, [])


    return (
        <>
            <main className='outer-container'>
                <div className='inner-container bike-main-styling'>
                    {bikes.map((bike) => {
                        return (
                            <BikeTile
                                key={bike.id}
                                bikeType={bike.bikeType}
                                brand={bike.brand}
                                model={bike.model}
                                name={bike.name}
                                totalDistanceDriven={bike.totalDistanceDriven}
                                totalHoursDriven={bike.totalHoursDriven}
                                groupSet={bike.groupSet}
                                gearData={bike.bikeParts}
                            ></BikeTile>
                        )
                    })
                    }
                    <NavLink to="/bikes/add">
                        <Button>
                            <PlusCircle size="2rem" color="#5f558c"/>
                        </Button>
                    </NavLink>
                </div>
            </main>
        </>
    );
}

export default Bikes;