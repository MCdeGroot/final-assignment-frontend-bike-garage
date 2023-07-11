import React, {useContext, useEffect, useState} from "react";
import RideTile from "../../components/rideTile/RideTile";
import "./DashBoard.css"
import axios from "axios";
import {PlusCircle} from "@phosphor-icons/react";
import {AuthContext} from "../../context/AuthContext";
import RideReview from "../../components/review/RideReview";


function Dashboard() {

    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [ridesData, setRidesData] = useState([]);

    useEffect(() => {
        const controller = new AbortController;

        async function fetchRideData() {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(`http://localhost:8080/rides/${user.username}`, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                setRidesData(response.data);
                console.log(response.data); /// dit nog weghalen
            } catch (error) {
                console.error(error)
            }
        }

        fetchRideData();
    }, [])


    return (
        <>
            <main className='outer-container'>
                <div className='inner-container'>
                    <h1>Hier is het Dashboard</h1>
                    {ridesData.map((ride) => {
                        return (
                            <div key={ride.id} className="ride-tile-wrapper">
                                <RideTile
                                    titleRide={ride.titleRide}
                                    subTitleRide={ride.subTitleRide}
                                    distance={ride.distance}
                                    date={ride.date}
                                    averagePower={ride.averagePower}
                                    timeRide={ride.timeRide}
                                    bike={`${ride.bike.brand} ${ride.bike.model}`}
                                    user={`${ride.user.firstName} ${ride.user.lastName}`}
                                />
                                <RideReview review={ride.reviewRating}/>
                            </div>
                        )
                    })
                    }
                </div>
            </main>
        </>
    );
}

export default Dashboard;