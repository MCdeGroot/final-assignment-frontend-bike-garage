import React from "react";
import "./BikeTile.css"
import {DotsThreeOutline} from "@phosphor-icons/react";
import Button from "../button/Button";
import {ReactComponent as TimeTrialBike} from "../../assets/timetrial.svg"
import {ReactComponent as RoadBike} from "../../assets/roadbike.svg"
import {ReactComponent as MountainBike} from "../../assets/mtb.svg"


function BikeTile({bikeType, brand, model, name, totalDistanceDriven, totalHoursDriven, groupSet, gearData}) {

    let bikeIcon;
    switch (bikeType) {
        case "TIMETRIAL":
            bikeIcon = <TimeTrialBike />;
            break;
        case "ROAD":
            bikeIcon = <RoadBike/>;
            break;
        case "MOUNTAIN":
            bikeIcon = <MountainBike />;
            break;
    }

    return (
        <>
            <div className="biketile-outer-wrapper">
                <section className="biketile-top-styling">
                    <div className='biketile-top-name'>
                        {bikeIcon}
                        <h2>{brand} {model}</h2>
                    <Button className='icon-button-bike'>
                        <DotsThreeOutline color="#1989AC" width='2rem' height='2rem'/>
                    </Button>
                    </div>
                    <div className='separation-line-top'>
                        {/*    scheidingslijn*/}
                    </div>
                    <div className='bike-data'>
                        <p>Brand : {brand}</p>
                        <p>Model : {model}</p>
                        <p>Nickname : {name}</p>
                        <p>Total distance driven : {totalDistanceDriven}</p>
                        <p>Hours driven : {totalHoursDriven}</p>
                    </div>
                </section>
                <section className='biketile-bottom-styling'>
                    <h2>Gear</h2>
                    <div className='separation-line-bottom'>
                        {/*    scheidingslijn*/}
                    </div>
                    <div className='gear-data'>
                        {/*TODO gearData toeveogen als props. evven kijken wat nu handig is. Kan ik pas testen als de kopeling er is.*/}
                        <p>Groupset : </p>
                        <p>Chain : </p>
                        <p>Cassette : </p>
                        <p>Front Tire : </p>
                        <p>Rear Tire : </p>
                        <p>Brakes : </p>
                    </div>

                </section>

            </div>
        </>
    )
}

export default BikeTile;