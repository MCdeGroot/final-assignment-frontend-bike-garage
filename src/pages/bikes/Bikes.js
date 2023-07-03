import React from "react";
import BikeTile from "../../components/bikeTile/BikeTile";

function Bikes() {
    return (
        <>
            <main className='outer-container'>
                <div className='inner-container'>
                    <h1>Hier zijn de bikes</h1>
                    <BikeTile></BikeTile>
                </div>
            </main>
        </>
    );
}

export default Bikes;