import React from "react";
import "./BikeTile.css"
import {DotsThreeOutline} from "@phosphor-icons/react";
import Button from "../button/Button";


function BikeTile() {
    return (
        <>
            <div className="biketile-outer-wrapper">
                <section className="biketile-top-styling">
                    <div className='biketile-top-name'>
                        <img src="../../assets/roadbike.svg" alt=""/>
                        <h2>BIKENAME</h2>
                    <Button className='icon-button-bike'>
                        <DotsThreeOutline color="#1989AC" width='2rem' height='2rem'/>
                    </Button>
                    </div>
                    <div className='separation-line-top'>
                        {/*    scheidingslijn*/}
                    </div>
                    <div className='bike-data'>
                        <p>Brand : </p>
                        <p>Model : </p>
                        <p>Nickname : </p>
                        <p>Total distance driven : </p>
                        <p>Hours driven : </p>
                    </div>
                </section>
                <section className='biketile-bottom-styling'>
                    <h2>Gear</h2>
                    <div className='separation-line-bottom'>
                        {/*    scheidingslijn*/}
                    </div>
                    <div className='gear-data'>
                        <p>Brand</p>
                        <p>Model</p>
                        <p>Model</p>
                        <p>Model</p>
                        <p>Model</p>
                    </div>

                </section>

            </div>
        </>
    )
}

export default BikeTile;