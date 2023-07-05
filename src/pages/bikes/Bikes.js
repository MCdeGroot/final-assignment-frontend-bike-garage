import React, {useEffect, useState} from "react";
import BikeTile from "../../components/bikeTile/BikeTile";
import axios from "axios";
import Button from "../../components/button/Button";
import {NavLink} from "react-router-dom";
import {PlusCircle} from "@phosphor-icons/react";

function Bikes() {
    const [bikes, setBikes] = useState([]);

    //data ophalen van de bikes
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/bikes')
                setBikes(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])


    return (
        <>
            <main className='outer-container'>
                <div className='inner-container'>
                    <h1>Hier zijn de bikes</h1>
                    {bikes.map((bike) => {
                        return (
                            <BikeTile
                                key={bike.id}
                                brand={bike.brand}
                                model={bike.model}
                                name={bike.name}
                                totalDistanceDriven={bike.totalDistanceDriven}
                            ></BikeTile>
                        )
                    })
                    }
                    <NavLink to="/bikes/add">
                        <Button>
                            <PlusCircle size="2rem" color="#5f558c" />
                        </Button>
                    </NavLink>

                </div>
            </main>
        </>
    );
}

export default Bikes;