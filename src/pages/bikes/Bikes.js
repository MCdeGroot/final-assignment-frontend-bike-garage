import React, {useEffect, useState} from "react";
import BikeTile from "../../components/bikeTile/BikeTile";
import axios from "axios";

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
                </div>
            </main>
        </>
    );
}

export default Bikes;