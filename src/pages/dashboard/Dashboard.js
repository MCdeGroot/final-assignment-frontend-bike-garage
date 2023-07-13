import React, {useContext, useEffect, useState} from "react";
import RideTile from "../../components/rideTile/RideTile";
import "./DashBoard.css"
import axios from "axios";
import {PlusCircle, X} from "@phosphor-icons/react";
import {AuthContext} from "../../context/AuthContext";
import RideReview from "../../components/review/RideReview";
import Modal from "react-modal";
import Button from "../../components/button/Button";
import FormInputField from "../../components/formInput/FormInputField";
import {useForm} from "react-hook-form";
import AddRide from "../../components/formInput/AddRide";
import {convertTimeToString} from "../../helper/convertTimeCode";


function Dashboard() {

    const {user} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}, reset} = useForm({mode: 'onTouched'});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [ridesData, setRidesData] = useState([]);
    const [userBikesData, setUserBikesData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [icon, toggleIcon] = useState(false);

    // ...................MODAL
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: "#FBF7F4FF",
            border: "solid 3px #1989AC",
        },
    };

    //TODO below seems to be unneccesary?
    Modal.setAppElement('#root');


    const [modalReviewIsOpen, setModalReviewIsOpen] = React.useState(false);
    const [modalRideIsOpen, setModalRideIsOpen] = React.useState(false);
    const [selectedRide, setSelectedRide] = useState(null);

    function openModalReview(ride) {
        setModalReviewIsOpen(true);
        setSelectedRide(ride);
    }

    function openModalRide() {
        setModalRideIsOpen(true);
    }

    function closeModal() {
        setModalReviewIsOpen(false);
        setModalRideIsOpen(false);
        toggleIcon(false);
    }

    //TODO deze handlesubmit nog goed zetten, want nu doet ie niet updateen na een review

    useEffect(() => {
        const controller = new AbortController;

        async function fetchRideData() {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(`http://localhost:8080/rides/${user.username}`, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                setRidesData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchRideData();
    }, [refresh])

    async function getBikesData(){
        const storedToken = localStorage.getItem('token');
        setLoading(true);
        try {
            setError(false);
            const response = await axios.get(`http://localhost:8080/bikes/${user.username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
                }
            })
            setUserBikesData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error)
        }
    }




    async function handleFormSubmit(data) {
        const storedToken = localStorage.getItem('token');
        setLoading(true)
        try {
            const response = await axios.post(`http://localhost:8080/${selectedRide.id}/review`, {
                rating: data.rating,
                commentDescription: data.commentDescription
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
                }
            });
            console.log(response);

        } catch (error) {
            setError(true);
            console.error(error);

        }
        setLoading(false);
        setRefresh(!refresh);
        closeModal();
    }

    async function handleFormRideSubmit(data){
        const urlData = data.bikeId;
        const storedToken = localStorage.getItem('token');
        setLoading(true)
        try {
            const response = await axios.post(`http://localhost:8080/rides?bikeId=${urlData}`, {
                titleRide : data.titleRide,
                subTitleRide : data.subTitleRide,
                distance : data.distance,
                timeRide : convertTimeToString(data.timeRide),
                date : data.date,
                averagePower : data.averagePower,
                normalizedPower : data.normalizedPower,
                username : user.username
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
                }
            });
            console.log(response);

        } catch (error) {
            setError(true);
            console.error(error);

        }
        setLoading(false);
        setRefresh(!refresh);
        closeModal();
    }

    return (
        <>
            <main className='outer-container'>
                <div className='inner-container'>
                    {user.authorities.includes('ROLE_TRAINER') &&
                        <div>

                            <Modal
                                isOpen={modalReviewIsOpen} //if modal is open
                                onRequestClose={closeModal} //what to do after modal close
                                style={customStyles}
                                contentLabel="Add review"
                            >

                                <Button
                                    className="icon-button-modal"
                                    onClick={closeModal}><X color="#1989AC" width='2rem' height='2rem'/></Button>
                                <form className='modal-wrapper' onSubmit={handleSubmit(handleFormSubmit)}>
                                    <article className='form-wrapper-modal'>
                                        <div>
                                            <FormInputField
                                                name="rating"
                                                label="Rating"
                                                type="number"
                                                placeholder="0.0"
                                                register={register}
                                                errors={errors}
                                            />

                                            <FormInputField
                                                name="commentDecription"
                                                label="Comment"
                                                type="text"
                                                placeholder="Type a comment"
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>
                                    </article>
                                    <Button type="submit"
                                            className='signin-button'>
                                        Add review!
                                    </Button>
                                </form>
                            </Modal>
                        </div>}

                    <h1>Hier is het Dashboard</h1>
                    {ridesData
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((ride) => {
                            return (
                                <div key={ride.id} className="ride-tile-wrapper">

                                    <RideTile

                                        titleRide={ride.titleRide}
                                        subTitleRide={ride.subTitleRide}
                                        distance={ride.distance}
                                        date={ride.date}
                                        averagePower={ride.averagePower}
                                        timeRide={ride.timeRide}
                                        bike={`${ride.bike.brand} ${ride.bike.model}`}
                                        bikeType={ride.bike.bikeType}
                                        user={`${ride.user.firstName} ${ride.user.lastName}`}
                                        onClick={() => {
                                            if (ride.reviewRating === null) {
                                                openModalReview(ride);
                                            }
                                        }}

                                    /> {ride.reviewRating &&

                                    <RideReview review={ride.reviewRating}/>
                                }
                                </div>
                            )
                        })
                    }
                    <div>
                        <Modal
                            isOpen={modalRideIsOpen} //if modal is open
                            onRequestClose={closeModal} //what to do after modal close
                            style={customStyles}
                            contentLabel="Add ride"
                        ><Button
                            className="icon-button-modal"
                            onClick={closeModal}
                        ><X color="#1989AC" width='2rem' height='2rem'/></Button>
                            <AddRide onSubmit={handleSubmit(handleFormRideSubmit)}
                                     register={register}
                                     errors={errors}
                                     onClick={closeModal}
                                     userBikesData={userBikesData}
                            >
                            </AddRide>
                        </Modal>
                    </div>
                    <div className='icon-button-add'>
                        <Button
                            type="button"
                            className='icon-button-add'>
                            <PlusCircle size="4rem" weight={icon ? "fill" : "regular"} onClick={() => {
                                openModalRide();
                                getBikesData();
                                toggleIcon(!icon);
                                console.log(icon);
                            }}/>
                        </Button>
                    </div>
                </div>

            </main>
        </>
    );
}

export default Dashboard;