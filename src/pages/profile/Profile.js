import React, {useContext, useEffect, useState} from "react";
import '../../App.css';
import './Profile.css';
import axios from "axios";
import Button from "../../components/button/Button";
import {AuthContext} from "../../context/AuthContext";
import FormInputField from "../../components/formInput/FormInputField";
import {useForm} from "react-hook-form";
import Modal from "react-modal";
import {X} from "@phosphor-icons/react";
import GearForm from "../../components/formInput/GearForm";
import FormInputSelect from "../../components/formInput/FormInputSelect";


function Profile() {
    const storedToken = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [usernames, setUsernames] = useState([]);
    const [editProfile, setEditProfile] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onTouched'});
    const {register: registerTrainer, handleSubmit : handleSubmitTrainer}=useForm({mode: 'onTouched'});


    useEffect(() => {
        const controller = new AbortController();


        async function fetchUserData() {
            setLoading(true)

            try {
                setError(false);
                const response = await axios.get(`http://localhost:8080/users/${user.username}`, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                setUserData(response.data);
                console.log(userData);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.error(error);
            }
        }

        fetchUserData();
    }, []) //TODO dit gaf Webstorm aan, maar in mijn geval hoeft dit toch helemaal niet?

    async function getUsernames() {
        const storedToken = localStorage.getItem('token');
        setLoading(true)
        try {
            setError(false);
            const response = await axios.get("http://localhost:8080/users/cyclists", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
                }
            })
            setUsernames(response.data);
            console.log(response.data) /// dit nog weghalen
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    async function assignTrainer(dataTrainer) {
        const storedToken = localStorage.getItem('token');
        setLoading(true)
        try {
            setError(false);
            const response = await axios.put(`http://localhost:8080/users/assign-trainer/${user.username}`, {
                trainerUsername: dataTrainer.trainerUsername
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
                }
            })
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
        closeModal();
    }

    async function handleFormSubmit(data) {
        setLoading(true)
        console.log(data);
        try {
            const response = await axios.put(`http://localhost:8080/users/${userData.username}`, {
                username: user.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                dateOfBirth: data.dateOfBirth
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
                }
            });
            console.log(response);
            setEditProfile(false);

        } catch (error) {
            setError(true);
            console.error(error);

        }
        setLoading(false);
    }



    function handleChange(e) {
        const {name, value} = e.target;
        setUserData((previousValue) => ({
            ...previousValue,
            [name]: value,
        }));
    };


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

    Modal.setAppElement('#root');

    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    function openModal() {
        setModalIsOpen(true);
        getUsernames();
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function generateOptions() {
        return usernames.filter(username => username !== user.username)
            .map((username) => ({
                label: username,
                value: username
            }));
    }

    const options = generateOptions();


    return (
        <>
            <main className='outer-container'>
                <div className='inner-container'>
                    <h1>My Profile:</h1>
                    <div>
                        <Modal
                            isOpen={modalIsOpen} //if modal is open
                            onRequestClose={closeModal} //what to do after modal close
                            style={customStyles}
                            contentLabel="Add bike part"
                        >
                            <Button
                                className="icon-button-modal"
                                onClick={closeModal}
                            ><X color="#1989AC" width='2rem' height='2rem'/>
                            </Button>
                            <form className='modal-wrapper' onSubmit={handleSubmitTrainer(assignTrainer)}>
                                <div>
                                    <FormInputSelect
                                        name="trainerUsername"
                                        label="Select trainer"
                                        options={options}
                                        register={registerTrainer}
                                    />
                                </div>
                                <Button type="submit"
                                        className='signin-button'>
                                    Add trainer!
                                </Button>
                            </form>


                        </Modal>
                    </div>
                    <div>

                        <form className='form-input-items' onSubmit={handleSubmit(handleFormSubmit)}>
                            {userData &&
                                <div>

                                    <FormInputField
                                        name="username"
                                        label="Username"
                                        type="text"
                                        placeholder="Username"
                                        validationRules={
                                            {
                                                disabled: true,
                                            }
                                        }
                                        register={register}
                                        errors={errors}
                                        value={userData.username}
                                    />
                                    <FormInputField
                                        name="email"
                                        label="E-mail"
                                        type="email"
                                        placeholder="email@bike-garage.com"
                                        validationRules={
                                            {
                                                disabled: !editProfile,
                                                required: {
                                                    value: true,
                                                    message: "email is required!"
                                                }
                                            }
                                        }
                                        register={register}
                                        errors={errors}
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                    <FormInputField
                                        name="firstName"
                                        label="First name"
                                        type="text"
                                        placeholder="Mathieu"
                                        validationRules={
                                            {
                                                disabled: !editProfile,
                                                required: {
                                                    value: true,
                                                    message: "First name is required!"
                                                }
                                            }
                                        }
                                        register={register}
                                        errors={errors}
                                        value={userData.firstName}
                                        onChange={handleChange}
                                    />
                                    <FormInputField
                                        name="lastName"
                                        label="Last name"
                                        type="text"
                                        placeholder="van der Poel"
                                        validationRules={
                                            {
                                                disabled: !editProfile,
                                                required: {
                                                    value: true,
                                                    message: "Last name is required!"
                                                }
                                            }
                                        }
                                        register={register}
                                        errors={errors}
                                        value={userData.lastName}
                                        onChange={handleChange}
                                    />
                                    <FormInputField
                                        name="dateOfBirth"
                                        label="Date of Birth"
                                        type="date"
                                        placeholder=""
                                        validationRules={
                                            {
                                                disabled: !editProfile,
                                            }
                                        }
                                        register={register}
                                        errors={errors}
                                        value={userData.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                    {userData.trainerUsername &&
                                        <FormInputField
                                            name="trainerUsername"
                                            label="Trainer"
                                            type="text"
                                            validationRules={
                                                {
                                                    disabled: !editProfile,
                                                }
                                            }
                                            register={register}
                                            errors={errors}
                                            value={userData.trainerUsername}
                                        />
                                    }
                                    <FormInputField
                                        name="numberOfRides"
                                        label="Number of rides"
                                        type="number"
                                        placeholder="0"
                                        validationRules={
                                            {
                                                disabled: true,
                                            }
                                        }
                                        register={register}
                                        errors={errors}
                                        value={userData.rides.length}
                                    />
                                    <FormInputField
                                        name="totalDistanceDriven"
                                        label="Total distance driven"
                                        type="text"
                                        placeholder="0 km"
                                        validationRules={
                                            {
                                                disabled: true,
                                            }
                                        }
                                        register={register}
                                        errors={errors}
                                        value={`${Math.round(userData.totalDistanceDriven)} km`}
                                    />
                                    <FormInputField
                                        name="numberOfBikes"
                                        label="Number of bikes"
                                        type="number"
                                        placeholder="0"
                                        validationRules={
                                            {
                                                disabled: true,
                                            }
                                        }
                                        register={register}
                                        errors={errors}
                                        value={userData.bikes.length}
                                    />


                                </div>
                            }
                            {editProfile && <Button className="signin-button" type="submit"> Save changes </Button>}
                            {error && <p>{error}</p>}
                        </form>
                    </div>
                    <div className="wrapper">
                        {!editProfile &&
                            <Button className="signin-button" onClick={() =>
                                setEditProfile(!editProfile)
                            }>
                                {loading ? "Loading" : "Edit profile!"}
                            </Button>
                        }
                        {/*{!userData.trainerUsername && !editProfile &&*/}
                        <Button className="signin-button" onClick={() =>
                            openModal()
                        }> Assign trainer!
                        </Button>
                        {/*}*/}
                    </div>

                </div>
            </main>
        </>
    )
        ;
}

export default Profile;
