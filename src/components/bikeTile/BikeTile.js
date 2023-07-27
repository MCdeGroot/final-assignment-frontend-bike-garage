import React from "react";
import "./BikeTile.css"
import {DotsThreeOutline} from "@phosphor-icons/react";
import Button from "../button/Button";
import {ReactComponent as TimeTrialBike} from "../../assets/timetrial.svg"
import {ReactComponent as RoadBike} from "../../assets/roadbike.svg"
import {ReactComponent as MountainBike} from "../../assets/mtb.svg"
import {convertTimeCode} from "../../helper/convertTimeCode";


function BikeTile({bikeType, brand, model, name, totalDistanceDriven, totalHoursDriven, groupSet, gearData}) {


    let bikeIcon;
    switch (bikeType) {
        case "TIMETRIAL":
            bikeIcon = <TimeTrialBike width={50} height={50}/>;
            break;
        case "ROAD":
            bikeIcon = <RoadBike width={50} height={50}/>;
            break;
        case "MOUNTAIN":
            bikeIcon = <MountainBike width={50} height={50}/>;
            break;
    }

    gearData.sort((a, b) => {
        const partTypeOrder = [
            "CHAIN",
            "CASSETTE",
            "FRONTTIRE",
            "REARTIRE",
            "FRONTBRAKEPAD",
            "REARBRAKEPAD",
        ];
        return partTypeOrder.indexOf(a.partType) - partTypeOrder.indexOf(b.partType);
    });

    function bikePartOutput(bikePart) {
        switch (bikePart) {
            case "CHAIN":
                return "Chain";
            case "CASSETTE":
                return "Cassette";
            case "FRONTTIRE":
                return "Front Tire";
            case "REARTIRE":
                return "Rear Tire";
            case "FRONTBRAKEPAD":
                return "Brake Pad front";
            case "REARBRAKEPAD":
                return "Brake Pad rear";
            default:
                return "Unknown part";
        }
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
                        <p>Total distance driven : {Math.round(totalDistanceDriven)} km</p>
                        <p>Hours driven : {convertTimeCode(totalHoursDriven)}</p>
                    </div>
                </section>
                <section className='biketile-bottom-styling'>
                    <h2>Gear</h2>
                    <div className='separation-line-bottom'>
                        {/*    scheidingslijn*/}
                    </div>
                    <div className='gear-data'>
                        {groupSet &&
                        <p>Groupset : {groupSet} </p>
                        }
                        {gearData.map((bikePart) => {
                            return (<p key={bikePart.partType}>
                                    {bikePartOutput(bikePart.partType)} : {bikePart.currentDistanceDriven}/{bikePart.maxDistance} km
                                </p>
                            )
                        })}
                    </div>

                </section>

            </div>
        </>
    )
}

export default BikeTile;