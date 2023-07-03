import React from "react";
import Button from "../button/Button";
import "./RideTile.css"
import {ChatText} from "@phosphor-icons/react";
import {DownloadSimple} from "@phosphor-icons/react";
import {Export} from "@phosphor-icons/react";
import {DotsThreeOutline} from "@phosphor-icons/react";


function RideTile() {
    return (
        <>
            <div className="ridetile-outer-wrapper">
                <section className="ridetile-top-styling">
                    <img src="../../assets/roadbike.svg" alt=""/>
                    <div>
                        <h5>Mathijs de Groot</h5>
                        <p>datum 01-05-2023</p>
                    </div>
                    <Button className='icon-button'>
                        <DotsThreeOutline color="#1989AC" width='2rem' height='2rem'/>
                    </Button>
                </section>
                <div className='separation-line-top'>
                    {/*    scheidingslijn*/}
                </div>
                <section className='ridetile-middle-styling'>
                    <div className='ride-data'>
                        <div>
                            {/*    Mathday*/}
                            <h4>Title</h4>
                            <p>eventjes vlammen!</p>
                        </div>
                        <div className='ride-data-items'>

                            <div>
                                <p>35,0km</p>
                                <h4>Afstand</h4>
                            </div>
                            <div className='separation-line-middle'></div>
                            <div>
                                <p>35,0km</p>
                                <h4>Tijd</h4>
                            </div>
                            <div className='separation-line-middle'></div>
                            <div>
                                <p>35,0km</p>
                                <h4>Gem. Vermogen</h4>
                            </div>
                        </div>
                    </div>
                    <img src="../../assets/foto-test.jpg" alt="foto" width="150px" heigth="150px"/>
                </section>
                <section className='ridetile-bottom-styling flex-row'>
                    <h2>BIKENAME</h2>
                    <div className='flex-row'>
                        <Button className='icon-button'><DownloadSimple width='2rem' height='2rem'/></Button>
                        <div className='separation-line-bottom'></div>
                        <Button className='icon-button'><Export width='2rem' height='2rem'/></Button>
                        <div className='separation-line-bottom'></div>
                        <Button className='icon-button'><ChatText width='2rem' height='2rem'/></Button>
                    </div>

                </section>

            </div>
        </>
    )
}

export default RideTile;