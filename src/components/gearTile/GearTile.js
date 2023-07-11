import React from "react";
import "./GearTile.css"
import GearItem from "./GearItem";

/*TODO mijn plaatjes laden niet*/

function GearTile( {children} ) {
    return (
        <>
            <div className="geartile-outer-wrapper">
                <section className="geartile-top-styling">
                    <h2>BIKENAME</h2>
                    <img src="../../assets/roadbike.svg" alt=""/>
                </section>
                <section className='geartile-middle-styling'>
                    <h2>Bike parts</h2>
                    <div className='gear-separation-line-middle'></div>
                    <h2>Distance driven</h2>
                    <div className='gear-separation-line-middle'></div>
                </section>
                <section className='geartile-bottom-styling'>
                    {children}
                </section>
            </div>
        </>
    )
}

export default GearTile;