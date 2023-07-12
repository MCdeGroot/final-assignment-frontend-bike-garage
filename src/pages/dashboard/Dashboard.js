import React, {useContext, useEffect, useState} from "react";
import RideTile from "../../components/rideTile/RideTile";
import "./DashBoard.css"
import axios from "axios";
import {PlusCircle} from "@phosphor-icons/react";
import {AuthContext} from "../../context/AuthContext";
import RideReview from "../../components/review/RideReview";
import Modal from "react-modal";
import Button from "../../components/button/Button";
import FormInputField from "../../components/formInput/FormInputField";
import {useForm} from "react-hook-form";


function Dashboard() {

    const {user} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onTouched'});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [ridesData, setRidesData] = useState([]);

    // ...................MODAL
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    //TODO below seems to be unneccesary?
    Modal.setAppElement('#root');


    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [selectedRide, setSelectedRide] = useState(null);

    function openModal(ride) {
        setIsOpen(true);
        setSelectedRide(ride);
    }

    function afterOpenModal() {

    }

    function closeModal() {
        setIsOpen(false);
    }

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
                console.log(response.data); /// dit nog weghalen
            } catch (error) {
                console.error(error)
            }
        }

        fetchRideData();
    }, [handleFormSubmit])

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
    }

    return (
        <>
            <main className='outer-container'>
                <div className='inner-container'>
                    {user.authorities.includes('ROLE_TRAINER') &&
                        <Modal
                            isOpen={modalIsOpen} //if modal is open
                            onAfterOpen={afterOpenModal} //what to do after modal open
                            onRequestClose={closeModal} //what to do after modal close
                            style={customStyles}
                            contentLabel="Add review"
                        >

                            <Button onClick={closeModal}>close</Button>
                            <div>
                                <h4>Add review</h4>
                            </div>
                            <form className='form' onSubmit={handleSubmit(handleFormSubmit)}>
                                <article className='form-wrapper'>
                                    <div className='form-input-items'>
                                        <FormInputField
                                            name="rating"
                                            label="Rating"
                                            type="number"
                                            placeholder="0.0"
                                            register={register}
                                            errors = {errors}
                                        />

                                        <FormInputField
                                            name="commentDecription"
                                            label="Comment"
                                            type="text"
                                            placeholder="Type a comment"
                                            register={register}
                                            errors = {errors}
                                        />
                                    </div>
                                </article>
                                <Button type="submit"
                                        className='signin-button'>
                                    Add review!
                                </Button>
                            </form>
                        </Modal>}

                    <h1>Hier is het Dashboard</h1>
                    {ridesData.map((ride) => {
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
                                    user={`${ride.user.firstName} ${ride.user.lastName}`}
                                    onClick={() => {
                                        if (ride.reviewRating === null) {
                                            openModal(ride);
                                        }
                                    }}

                                /> {ride.reviewRating &&

                                <RideReview review={ride.reviewRating}/>
                            }
                            </div>
                        )
                    })
                    }
                </div>
            </main>
        </>
    );
}

export default Dashboard;