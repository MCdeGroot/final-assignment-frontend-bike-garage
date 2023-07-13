import React from "react";
import Button from "../button/Button";
import "./RideTile.css"
import {ChatText} from "@phosphor-icons/react";
import {DownloadSimple} from "@phosphor-icons/react";
import {Export} from "@phosphor-icons/react";
import {DotsThreeOutline} from "@phosphor-icons/react";
import {convertTimeCode} from "../../helper/convertTimeCode";
import {setBikeIcon} from "../../helper/setBikeIcon";

function RideTile({titleRide, subTitleRide, distance, date, averagePower, timeRide, bike, bikeType, user, onClick}) {
    return (
        <>
            <div className="ridetile-outer-wrapper">
                <section className="ridetile-top-styling">
                    {setBikeIcon({bikeType})}
                    <div>
                        <h5>{user} </h5>
                        <p>Date {date}</p>
                    </div>
                    <Button className='icon-button'>
                        <DotsThreeOutline color="#1989AC" width='2rem' height='2rem'/>
                    </Button>
                </section>
                <div className='ride-separation-line-top'>

                </div>
                <section className='ridetile-middle-styling'>
                    <div className='ride-data'>
                        <div>

                            <h4>{titleRide}</h4>
                            <p>{subTitleRide}</p>
                        </div>
                        <div className='ride-data-items'>

                            <div>
                                <p>{distance} km</p>
                                <h4>Afstand</h4>
                            </div>
                            <div className='ride-separation-line-middle'></div>
                            <div>
                                <p>{convertTimeCode({timeRide})}</p>
                                <h4>Tijd</h4>
                            </div>
                            <div className='ride-separation-line-middle'></div>
                            <div>
                                <p>{averagePower} Watt</p>
                                <h4>Gem. Vermogen</h4>
                            </div>
                        </div>
                    </div>
                    <img src="../../assets/foto-test.jpg" alt="foto" width="150px" heigth="150px"/>
                </section>
                <section className='ridetile-bottom-styling flex-row'>
                    <h2>{bike}</h2>
                    <div className='flex-row'>
                        <Button className='icon-button'><DownloadSimple width='2rem' height='2rem'/></Button>
                        <div className='ride-separation-line-bottom'></div>
                        <Button className='icon-button'><Export width='2rem' height='2rem'/></Button>
                        <div className='ride-separation-line-bottom'></div>
                        <Button className='icon-button' type="submit" onClick={onClick}><ChatText width='2rem' height='2rem'/></Button>
                    </div>

                </section>

            </div>
        </>
    )
}

export default RideTile;