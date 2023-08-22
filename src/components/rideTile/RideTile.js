import React, {useState} from "react";
import Button from "../button/Button";
import "./RideTile.css"
import {ChatText, UploadSimple} from "@phosphor-icons/react";
import {DownloadSimple} from "@phosphor-icons/react";
import {DotsThreeOutline} from "@phosphor-icons/react";
import {convertTimeCode} from "../../helper/convertTimeCode";
import {setBikeIcon} from "../../helper/setBikeIcon";
import UploadFile from "../uploadFile/UploadFile";


function RideTile({bikeType, selectedRide, image, onClickReview, onClickEditRide}) {
    const [uploadFile, setUploadFile] = useState(false);


    return (
        <>
            <div className="ridetile-outer-wrapper">
                <section className="ridetile-top-styling">
                    {setBikeIcon({bikeType})}
                    <div>
                        <h5>{`${selectedRide.user.firstName} ${selectedRide.user.lastName}`}</h5>
                        <p>Date {selectedRide.date.split("T")[0]}</p>
                    </div>
                    <Button className='icon-button' type="submit" onClick={onClickEditRide}>
                        <DotsThreeOutline color="#1989AC" width='2rem' height='2rem'/>
                    </Button>
                </section>
                <div className='ride-separation-line-top'>

                </div>
                <section className='ridetile-middle-styling'>
                    <div className='ride-data'>
                        <div>

                            <h4>{selectedRide.titleRide}</h4>
                            <p>{selectedRide.subTitleRide}</p>
                        </div>
                        <div className='ride-data-items'>

                            <div>
                                <p>{selectedRide.distance} km</p>
                                <h4>Afstand</h4>
                            </div>
                            <div className='ride-separation-line-middle'></div>
                            <div>
                                <p>{convertTimeCode(selectedRide.timeRide)}</p>
                                <h4>Tijd</h4>
                            </div>
                            <div className='ride-separation-line-middle'></div>
                            <div>
                                <p>{selectedRide.averagePower} Watt</p>
                                <h4>Gem. Vermogen</h4>
                            </div>
                        </div>
                    </div>
                    {image &&
                        <img src={image} alt="Chosen file" className="image-wrapper"/>
                    }
                </section>
                <section className='ridetile-bottom-styling flex-row'>
                    <h2>{`${selectedRide.bike.brand} ${selectedRide.bike.model}`}</h2>
                    <div className='flex-row'>
                        <Button className='icon-button'
                                onClick={() => {
                                    setUploadFile(!uploadFile)
                                    console.log(uploadFile)
                                }}
                        ><UploadSimple width='2rem' height='2rem'/></Button>
                        {uploadFile && <UploadFile openModalOnClick={true} changeUploadState={setUploadFile}
                                                   selectedItem={selectedRide}/>}
                        <div className='ride-separation-line-bottom'></div>
                        <Button className='icon-button'><DownloadSimple width='2rem' height='2rem'/></Button>
                        <div className='ride-separation-line-bottom'></div>
                        <Button className='icon-button' type="submit" onClick={onClickReview}><ChatText width='2rem'
                                                                                                        height='2rem'/></Button>
                    </div>

                </section>

            </div>
        </>
    )
}

export default RideTile;