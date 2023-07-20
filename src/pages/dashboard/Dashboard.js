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
    const [isEditing, setIsEditing] = useState(false);

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
            borderRadius: "10px",
        },
    };

    //TODO below seems to be unneccesary?
    Modal.setAppElement('#root');


    const [modalReviewIsOpen, setModalReviewIsOpen] = React.useState(false);
    const [modalRideIsOpen, setModalRideIsOpen] = React.useState(false);
    const [modalRideEditIsOpen, setModalRideEditIsOpen] = React.useState(false);
    const [modalRideDeleteIsOpen, setModalRideDeleteIsOpen] = React.useState(false);
    const [selectedRide, setSelectedRide] = useState([]);

    function openModalReview(ride) {
        setModalReviewIsOpen(true);
        setSelectedRide(ride);
    }

    function openModalRide() {
        setModalRideIsOpen(true);
    }

    function openModalRideEdit(ride) {
        setModalRideEditIsOpen(true);
        setSelectedRide(ride);
    }

    function openModalDeleteRide() {
        setModalRideDeleteIsOpen(true);
    }

    function closeModal() {
        setModalReviewIsOpen(false);
        setModalRideIsOpen(false);
        setModalRideEditIsOpen(false);
        toggleIcon(false);
        setSelectedRide([]);
        setIsEditing(false);
        closeDeleteModal();
    }

    function closeDeleteModal() {
        setModalRideDeleteIsOpen(false);
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

    async function getBikesData() {
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


    async function handleFormRideSubmit(data) {
        const urlData = data.bikeId;
        const storedToken = localStorage.getItem('token');
        setLoading(true)
        try {
            if (isEditing) {
                const response = await axios.put(`http://localhost:8080/rides/${selectedRide.id}`, {
                    titleRide: data.titleRide,
                    subTitleRide: data.subTitleRide,
                    distance: data.distance,
                    timeRide: convertTimeToString(data.timeRide),
                    date: data.date,
                    averagePower: data.averagePower,
                    normalizedPower: data.normalizedPower,
                    username: user.username
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                console.log(response);
            } else {
                const response = await axios.post(`http://localhost:8080/rides?bikeId=${urlData}`, {
                    titleRide: data.titleRide,
                    subTitleRide: data.subTitleRide,
                    distance: data.distance,
                    timeRide: convertTimeToString(data.timeRide),
                    date: data.date,
                    averagePower: data.averagePower,
                    normalizedPower: data.normalizedPower,
                    username: user.username
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                console.log(response);
            }
        } catch (error) {
            setError(true);
            console.error(error);
        }

        setLoading(false);
        setRefresh(!refresh);
        closeModal();
    }

    async function deleteRide() {
        const storedToken = localStorage.getItem('token');
        setLoading(true)
        try {
            await axios.delete(`http://localhost:8080/rides/${selectedRide.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                });
            setRefresh(!refresh);
            closeModal();
        } catch (error) {
            setError(true);
            console.error(error);
        }
        setLoading(false);

    }

    // TODO opschonen deze pagina en kijken of we bepaalde zaken niet beter als component kunnen doorgeven etc. Nu erg onoverzichtelijk geworden door alle modals.
    // TODO putmapping ride toevoegen
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

                    <Modal
                        isOpen={modalRideEditIsOpen} //if modal is open
                        onRequestClose={closeModal} //what to do after modal close
                        style={customStyles}
                        contentLabel=""
                    >

                            <Button
                                className="icon-button-modal"
                                onClick={closeModal}
                            ><X color="#1989AC" width='2rem' height='2rem'/></Button>
                        <div className='form-wrapper-modal flex-row'>
                            <Button
                                type="submit"
                                className='signin-button'
                                onClick={() => {
                                    console.log(selectedRide);
                                    setModalRideDeleteIsOpen(true);
                                }
                                }
                            >
                                Delete Ride!
                            </Button>
                            <Button
                                type="submit"
                                className='signin-button'
                                onClick={() => {
                                    console.log(selectedRide);
                                    setIsEditing(true);
                                    openModalRide();
                                }}
                            >
                                Edit Ride!
                            </Button>
                        </div>
                    </Modal>
                    <Modal
                        isOpen={modalRideDeleteIsOpen} //if modal is open
                        onRequestClose={closeDeleteModal} //what to do after modal close
                        style={customStyles}
                        contentLabel=""
                    >
                        <Button
                            className="icon-button-modal"
                            onClick={closeDeleteModal}
                        ><X color="#1989AC" width='2rem' height='2rem'/>
                        </Button>
                        <div className='form-wrapper-modal flex-row'>

                        <h4>You are sure you want to delete this ride?</h4>
                        <Button className="signin-button"
                            onClick={deleteRide}>
                            Yes
                        </Button>
                        <Button className="signin-button"
                            onClick={closeDeleteModal}>
                            No
                        </Button>
                        </div>

                    </Modal>
                    <h1>Hier is het Dashboard</h1>
                    {ridesData
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((ride) => {
                            return (
                                <div key={ride.id} className="ride-tile-wrapper">
                                    {/*TODO hier nog gewwon aalleen de selectedride doorgeven. Overige waarde pas in tile benoemen*/}
                                    <RideTile
                                        selectedRide={ride}
                                        bikeType={ride.bike.bikeType}
                                        image={ride.url}
                                        onClickReview={() => {
                                            if (ride.reviewRating === null && ride.user.username != user.username) {
                                                openModalReview(ride);
                                            }
                                        }}
                                        onClickEditRide={() => {
                                            if (ride.user.username === user.username) {
                                                openModalRideEdit(ride);
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
                                     initialValue={selectedRide}
                                     isEditing={isEditing}
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
                            }}/>
                        </Button>
                    </div>
                </div>

            </main>
        </>
    );
}

export default Dashboard;